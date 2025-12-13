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
    const { trigger, contactId, metadata } = await req.json()

    if (!trigger) {
      throw new Error('trigger is required')
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Find workflows matching the trigger
    const { data: workflows, error: fetchError } = await supabaseClient
      .from('workflows')
      .select('*')
      .eq('status', 'active')
      .eq('trigger', trigger)

    if (fetchError) {
      throw new Error(`Failed to fetch workflows: ${fetchError.message}`)
    }

    if (!workflows || workflows.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No active workflows found for this trigger',
          triggered: 0
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    // Trigger each matching workflow
    const triggeredWorkflows = []
    for (const workflow of workflows) {
      console.log(`Triggering workflow: ${workflow.name}`)
      
      // Update workflow metrics
      await supabaseClient
        .from('workflows')
        .update({ 
          contacts: workflow.contacts + 1,
          last_run: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', workflow.id)

      // Log activity
      await supabaseClient
        .from('activity_log')
        .insert({
          type: 'workflow',
          title: 'Automation triggered',
          description: `${workflow.name} started for ${trigger}`,
          status: 'success',
          contact_name: metadata?.contactName || null,
          contact_initials: metadata?.contactInitials || null
        })

      triggeredWorkflows.push(workflow.name)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Workflows triggered successfully',
        triggered: triggeredWorkflows.length,
        workflows: triggeredWorkflows
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
