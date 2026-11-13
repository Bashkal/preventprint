import { createClient } from "@supabase/supabase-js";

/**
 * Read-only Supabase client for public pages.
 * Uses the publishable key, so Row Level Security decides what it can see.
 * No session or cookies, which keeps it usable inside "use cache" functions.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
