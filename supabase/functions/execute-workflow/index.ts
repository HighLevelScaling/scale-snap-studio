import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { workflowId } = await req.json()

    if (!workflowId) {
      throw new Error('workflowId is required')
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch workflow details
    const { data: workflow, error: fetchError } = await supabaseClient
      .from('workflows')
      .select('*')
      .eq('id', workflowId)
      .single()

    if (fetchError) {
      throw new Error(`Failed to fetch workflow: ${fetchError.message}`)
    }

    if (workflow.status !== 'active') {
      throw new Error('Workflow is not active')
    }

    // Execute workflow logic (simplified example)
    console.log(`Executing workflow: ${workflow.name}`)
    
    // Update workflow last_run timestamp
    const { error: updateError } = await supabaseClient
      .from('workflows')
      .update({ 
        last_run: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', workflowId)

    if (updateError) {
      throw new Error(`Failed to update workflow: ${updateError.message}`)
    }

    // Log activity
    await supabaseClient
      .from('activity_log')
      .insert({
        type: 'workflow',
        title: 'Workflow executed',
        description: `${workflow.name} completed successfully`,
        status: 'success'
      })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Workflow executed successfully',
        workflow: workflow.name
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
