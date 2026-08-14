import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://usjijpwcubtxofjqgiii.supabase.co';

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzamlqcHdjdWJ0eG9manFnaWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NjIxMzMsImV4cCI6MjA5NTEzODEzM30.vuT7cOpMq9504WUdPD-pje5HkaeyK-DDXIPNelmqWSY';

export const getSupabaseServer = () => {
  // Try to use service role key for admin privileges, fallback to public anon key for local development
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || supabaseAnonKey;
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
