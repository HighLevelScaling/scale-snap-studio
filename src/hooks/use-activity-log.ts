import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Activity {
  id: string;
  type: 'message' | 'call' | 'meeting' | 'opportunity' | 'contact' | 'workflow' | 'review';
  title: string;
  description: string;
  timestamp: string;
  contact_name?: string | null;
  contact_initials?: string | null;
  status?: 'success' | 'pending' | 'failed' | null;
  created_at: string;
}

export function useActivityLog(limit: number = 10) {
  const queryClient = useQueryClient();
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fetch activity log
  const { data: activities, isLoading, error } = useQuery({
    queryKey: ['activity-log', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Activity[];
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    if (isSubscribed) return;

    const channel = supabase
      .channel('activity-log-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_log',
        },
        (payload) => {
          console.log('New activity detected:', payload);
          // Invalidate and refetch activity log
          queryClient.invalidateQueries({ queryKey: ['activity-log'] });
        }
      )
      .subscribe();

    setIsSubscribed(true);

    return () => {
      supabase.removeChannel(channel);
      setIsSubscribed(false);
    };
  }, [queryClient, isSubscribed]);

  return {
    activities: activities || [],
    isLoading,
    error,
  };
}
