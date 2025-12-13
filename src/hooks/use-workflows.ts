import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Workflow {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  trigger: string;
  actions: number;
  contacts: number;
  last_run: string | null;
  performance: {
    opens: number;
    clicks: number;
    conversions: number;
  };
  created_at: string;
  updated_at: string;
}

export function useWorkflows() {
  const queryClient = useQueryClient();
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fetch workflows
  const { data: workflows, isLoading, error } = useQuery({
    queryKey: ['workflows'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .order('last_run', { ascending: false, nullsFirst: false });

      if (error) throw error;
      return data as Workflow[];
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    if (isSubscribed) return;

    const channel = supabase
      .channel('workflows-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workflows',
        },
        (payload) => {
          console.log('Workflow change detected:', payload);
          // Invalidate and refetch workflows
          queryClient.invalidateQueries({ queryKey: ['workflows'] });
        }
      )
      .subscribe();

    setIsSubscribed(true);

    return () => {
      supabase.removeChannel(channel);
      setIsSubscribed(false);
    };
  }, [queryClient, isSubscribed]);

  // Execute workflow mutation
  const executeWorkflow = useMutation({
    mutationFn: async (workflowId: string) => {
      const { data, error } = await supabase.functions.invoke('execute-workflow', {
        body: { workflowId },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });

  // Trigger workflow mutation
  const triggerWorkflow = useMutation({
    mutationFn: async (params: { trigger: string; contactId?: string; metadata?: any }) => {
      const { data, error } = await supabase.functions.invoke('trigger-workflow', {
        body: params,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });

  return {
    workflows: workflows || [],
    isLoading,
    error,
    executeWorkflow: executeWorkflow.mutate,
    triggerWorkflow: triggerWorkflow.mutate,
    isExecuting: executeWorkflow.isPending,
    isTriggering: triggerWorkflow.isPending,
  };
}
