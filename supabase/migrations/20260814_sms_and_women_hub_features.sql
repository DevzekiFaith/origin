-- Migration: SMS and Women Hub Features
-- Add missing columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS learning_goal TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS time_available TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS interests TEXT;

-- 1. SMS Logs Table
CREATE TABLE IF NOT EXISTS sms_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- 'sent' or 'received'
  status TEXT DEFAULT 'pending', -- 'pending', 'delivered', 'failed'
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE sms_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own SMS logs" ON sms_logs;
CREATE POLICY "Users can view own SMS logs" ON sms_logs
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own SMS logs" ON sms_logs;
CREATE POLICY "Users can insert own SMS logs" ON sms_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 2. USSD Logs Table
CREATE TABLE IF NOT EXISTS ussd_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  menu_id TEXT NOT NULL,
  option_id TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE ussd_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own USSD logs" ON ussd_logs;
CREATE POLICY "Users can view own USSD logs" ON ussd_logs
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own USSD logs" ON ussd_logs;
CREATE POLICY "Users can insert own USSD logs" ON ussd_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 3. Women Study Groups Table
CREATE TABLE IF NOT EXISTS women_study_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  topic TEXT,
  is_private BOOLEAN DEFAULT false,
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE women_study_groups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view women study groups" ON women_study_groups;
CREATE POLICY "Anyone can view women study groups" ON women_study_groups
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert women study groups" ON women_study_groups;
CREATE POLICY "Users can insert women study groups" ON women_study_groups
  FOR INSERT WITH CHECK (auth.uid() = creator_id);


-- 4. Women Study Group Members Table
CREATE TABLE IF NOT EXISTS women_study_group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  study_group_id UUID REFERENCES women_study_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'creator', 'member'
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(study_group_id, user_id)
);

ALTER TABLE women_study_group_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view women study group memberships" ON women_study_group_members;
CREATE POLICY "Anyone can view women study group memberships" ON women_study_group_members
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can join women study groups" ON women_study_group_members;
CREATE POLICY "Users can join women study groups" ON women_study_group_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can leave women study groups" ON women_study_group_members;
CREATE POLICY "Users can leave women study groups" ON women_study_group_members
  FOR DELETE USING (auth.uid() = user_id);


-- 5. Women Resources Table
CREATE TABLE IF NOT EXISTS women_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'article', 'video', 'pdf', 'link'
  url TEXT,
  category TEXT,
  added_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE women_resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view women resources" ON women_resources;
CREATE POLICY "Anyone can view women resources" ON women_resources
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can add women resources" ON women_resources;
CREATE POLICY "Users can add women resources" ON women_resources
  FOR INSERT WITH CHECK (auth.uid() = added_by);
