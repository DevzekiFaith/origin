-- Migration: Fix course_purchases RLS delete policy and add preferences column to profiles

-- 1. Ensure preferences column exists on profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb;

-- 2. Ensure RLS is enabled on profiles and update policy is present
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- 3. Add DELETE & UPDATE RLS policies on course_purchases
ALTER TABLE course_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can delete their own course purchases" ON course_purchases;
CREATE POLICY "Users can delete their own course purchases"
  ON course_purchases FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own course purchases" ON course_purchases;
CREATE POLICY "Users can update their own course purchases"
  ON course_purchases FOR UPDATE
  USING (auth.uid() = user_id);
