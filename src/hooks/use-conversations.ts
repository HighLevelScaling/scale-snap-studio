import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Conversation {
  id: string;
  contact_name: string;
  contact_initials: string;
  contact_avatar?: string | null;
  last_message_content: string;
  last_message_timestamp: string;
  last_message_channel: 'email' | 'sms' | 'phone' | 'chat';
  unread_count: number;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  created_at: string;
  updated_at: string;
}

export function useConversations(limit: number = 10) {
  const queryClient = useQueryClient();
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fetch conversations
  const { data: conversations, isLoading, error } = useQuery({
    queryKey: ['conversations', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('last_message_timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Conversation[];
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    if (isSubscribed) return;

    const channel = supabase
      .channel('conversations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
        },
        (payload) => {
          console.log('Conversation change detected:', payload);
          // Invalidate and refetch conversations
          queryClient.invalidateQueries({ queryKey: ['conversations'] });
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
    conversations: conversations || [],
    isLoading,
    error,
  };
}
