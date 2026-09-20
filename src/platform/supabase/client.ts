import { createBrowserClient } from "@supabase/ssr";
import { publicEnv } from "@/platform/env/public";

export function createBrowserSupabaseClient() {
  return createBrowserClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
