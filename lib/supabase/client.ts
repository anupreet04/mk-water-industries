import { createBrowserClient } from '@supabase/ssr';

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qjaoaccecurgodhkjcki.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqYW9hY2NlY3VyZ29kaGtqY2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODkzMjIsImV4cCI6MjEwMTg2NTMyMn0.vtHCT0Jf4QWcAO9eAK92a0t2ER3AWGRyKWHtP68o6RM'
  );
}
