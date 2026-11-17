import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://usjijpwcubtxofjqgiii.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzamlqcHdjdWJ0eG9manFnaWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NjIxMzMsImV4cCI6MjA5NTEzODEzM30.vuT7cOpMq9504WUdPD-pje5HkaeyK-DDXIPNelmqWSY';

const resilientServerFetch: typeof fetch = async (input, init) => {
  try {
    return await fetch(input, init);
  } catch (err: any) {
    console.warn('[Supabase Server offline] Remote endpoint unreachable:', err?.message || err);
    const urlStr = String(input);
    if (urlStr.includes('/auth/v1/token')) {
      return new Response(
        JSON.stringify({ error: 'invalid_grant', error_description: 'Session offline' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (urlStr.includes('/auth/v1/user') || urlStr.includes('/auth/v1/session')) {
      return new Response(
        JSON.stringify({ user: null, session: null }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (urlStr.includes('/auth/v1/')) {
      return new Response(
        JSON.stringify({ message: 'Authentication offline', code: 'OFFLINE' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const getSupabaseServer = () => {
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || supabaseAnonKey;
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: resilientServerFetch,
    },
  });
};
