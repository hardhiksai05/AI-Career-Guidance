import { createClient, SupabaseClient } from "@supabase/supabase-js";

function stripOuterQuotes(str?: string): string {
  if (!str) return "";
  const trimmed = str.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

// Server-only Supabase service-role client singleton
let supabaseAdminInstance: SupabaseClient | null = null;

/**
 * Checks whether the server environment has configured the Supabase service role key.
 */
export function isSupabaseAdminConfigured(): boolean {
  const serviceRoleKey = stripOuterQuotes(process.env.SUPABASE_SERVICE_ROLE_KEY);
  return Boolean(
    serviceRoleKey &&
      !serviceRoleKey.includes("your_supabase") &&
      serviceRoleKey.length > 20
  );
}

/**
 * Returns a privileged Supabase client configured with the server-side
 * service_role secret.
 *
 * SECURITY INVARIANT:
 * - NEVER import or execute this module in client components or browser bundles.
 * - This client bypasses RLS and can execute restricted RPC functions
 *   (insert_verified_assistant_reply, verify_and_unlock_achievement).
 */
export function getSupabaseAdminClient(): SupabaseClient {
  if (supabaseAdminInstance) {
    return supabaseAdminInstance;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = stripOuterQuotes(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured on the server. Please add your service_role secret from Supabase Dashboard -> Project Settings -> API to .env.local"
    );
  }

  supabaseAdminInstance = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        "x-application-name": "ai-career-guidance-server",
      },
    },
  });

  return supabaseAdminInstance;
}
