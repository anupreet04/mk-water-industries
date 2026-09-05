import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qjaoaccecurgodhkjcki.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqYW9hY2NlY3VyZ29kaGtqY2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODkzMjIsImV4cCI6MjEwMTg2NTMyMn0.vtHCT0Jf4QWcAO9eAK92a0t2ER3AWGRyKWHtP68o6RM',
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: Record<string, unknown>) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // set can fail in Server Components (read-only context)
          }
        },
        remove(name: string, options: Record<string, unknown>) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // remove can fail in Server Components (read-only context)
          }
        },
      },
    }
  );
}
