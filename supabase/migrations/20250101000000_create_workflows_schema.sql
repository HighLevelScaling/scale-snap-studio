-- Create workflows table
CREATE TABLE IF NOT EXISTS public.workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'paused', 'draft')),
  trigger TEXT NOT NULL,
  actions INTEGER NOT NULL DEFAULT 0,
  contacts INTEGER NOT NULL DEFAULT 0,
  last_run TIMESTAMP WITH TIME ZONE,
  performance JSONB DEFAULT '{"opens": 0, "clicks": 0, "conversions": 0}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_log table
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('message', 'call', 'meeting', 'opportunity', 'contact', 'workflow', 'review')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contact_name TEXT,
  contact_initials TEXT,
  status TEXT CHECK (status IN ('success', 'pending', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name TEXT NOT NULL,
  contact_initials TEXT NOT NULL,
  contact_avatar TEXT,
  last_message_content TEXT NOT NULL,
  last_message_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_message_channel TEXT NOT NULL CHECK (last_message_channel IN ('email', 'sms', 'phone', 'chat')),
  unread_count INTEGER DEFAULT 0,
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_workflows_status ON public.workflows(status);
CREATE INDEX IF NOT EXISTS idx_workflows_last_run ON public.workflows(last_run DESC);
CREATE INDEX IF NOT EXISTS idx_activity_log_timestamp ON public.activity_log(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message ON public.conversations(last_message_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_unread ON public.conversations(unread_count) WHERE unread_count > 0;

-- Enable Row Level Security
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Create policies (for now, allow all operations - adjust based on auth requirements)
CREATE POLICY "Allow all operations on workflows" ON public.workflows FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on activity_log" ON public.activity_log FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on conversations" ON public.conversations FOR ALL USING (true) WITH CHECK (true);

-- Insert sample data for workflows
INSERT INTO public.workflows (name, status, trigger, actions, contacts, last_run, performance) VALUES
  ('Lead Nurture Sequence', 'active', 'Form Submission', 7, 142, NOW() - INTERVAL '2 minutes', '{"opens": 89, "clicks": 34, "conversions": 12}'::jsonb),
  ('Appointment Reminder', 'active', 'Booking Confirmed', 3, 28, NOW() - INTERVAL '15 minutes', '{"opens": 95, "clicks": 23, "conversions": 28}'::jsonb),
  ('Re-engagement Campaign', 'paused', '30 Days Inactive', 5, 89, NOW() - INTERVAL '1 hour', '{"opens": 67, "clicks": 18, "conversions": 7}'::jsonb);

-- Insert sample data for activity_log
INSERT INTO public.activity_log (type, title, description, timestamp, contact_name, contact_initials, status) VALUES
  ('message', 'Email sent to lead', 'Welcome sequence email delivered to Sarah Johnson', NOW() - INTERVAL '2 minutes', 'Sarah Johnson', 'SJ', 'success'),
  ('workflow', 'Automation triggered', 'Lead nurture workflow started for new form submission', NOW() - INTERVAL '5 minutes', NULL, NULL, 'success'),
  ('meeting', 'Appointment booked', 'Mike Chen scheduled a consultation for tomorrow', NOW() - INTERVAL '15 minutes', 'Mike Chen', 'MC', 'success'),
  ('opportunity', 'Deal moved to proposal', 'Marketing services opportunity advanced in pipeline', NOW() - INTERVAL '1 hour', NULL, NULL, 'success'),
  ('review', 'New 5-star review', 'Emily Rodriguez left a positive review on Google', NOW() - INTERVAL '2 hours', 'Emily Rodriguez', 'ER', 'success');

-- Insert sample data for conversations
INSERT INTO public.conversations (contact_name, contact_initials, last_message_content, last_message_timestamp, last_message_channel, unread_count, priority, tags) VALUES
  ('Sarah Johnson', 'SJ', 'I''m interested in your marketing services. Can we schedule a call?', NOW() - INTERVAL '2 minutes', 'email', 2, 'high', ARRAY['Hot Lead', 'Services']),
  ('Mike Chen', 'MC', 'Thanks for the quick response!', NOW() - INTERVAL '1 hour', 'sms', 0, 'medium', ARRAY['Customer']),
  ('Emily Rodriguez', 'ER', 'Missed call - Left voicemail', NOW() - INTERVAL '3 hours', 'phone', 1, 'high', ARRAY['Follow-up']);
