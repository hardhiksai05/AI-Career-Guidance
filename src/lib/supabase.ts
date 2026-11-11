import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { auth } from "@/lib/firebase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

/**
 * Validates whether real Supabase credentials are provided in the environment.
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
      supabasePublishableKey &&
      !supabaseUrl.includes("your-project-id") &&
      !supabaseUrl.includes("your_supabase") &&
      !supabasePublishableKey.includes("your_supabase") &&
      supabaseUrl.startsWith("https://")
  );
};

// Singleton instance to prevent multiple client instances across hot reloads
let supabaseClientInstance: SupabaseClient | null = null;

/**
 * Returns a configured Supabase client that dynamically injects the
 * current Firebase user's ID token into every database and storage request.
 *
 * Adheres to Supabase official Firebase Third-Party Authentication:
 * https://supabase.com/docs/guides/auth/third-party/firebase-auth
 */
export const getSupabaseClient = (): SupabaseClient => {
  if (supabaseClientInstance) {
    return supabaseClientInstance;
  }

  // Safe fallback dummy URL and key for build time or before credentials are provided
  const targetUrl = supabaseUrl || "https://placeholder-project.supabase.co";
  const targetKey = supabasePublishableKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder";

  supabaseClientInstance = createClient(targetUrl, targetKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        "x-application-name": "ai-career-guidance",
      },
    },
    accessToken: async () => {
      // Third-party auth: Supply the Firebase ID token for RLS verification
      if (typeof window === "undefined") {
        return null;
      }
      try {
        if (!auth || typeof auth.currentUser === "undefined" || !auth.currentUser) {
          return null;
        }
        // Force refresh false unless expired; Firebase SDK manages refresh cache automatically
        const token = await auth.currentUser.getIdToken(false);
        return token || null;
      } catch (err) {
        console.warn("[Supabase] Failed to obtain Firebase ID token:", err);
        return null;
      }
    },
  });

  return supabaseClientInstance;
};

export const supabase = getSupabaseClient();

