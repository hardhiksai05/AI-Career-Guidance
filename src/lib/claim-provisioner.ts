import { User } from "firebase/auth";

/**
 * Ensures the authenticated Firebase user has the 'role: authenticated' claim
 * required by Supabase RLS policies.
 *
 * Checks current claims; if missing, calls the secure server-side endpoint
 * /api/auth/claim-role and refreshes the token on the client.
 */
export const ensureSupabaseRoleClaim = async (user: User | null): Promise<boolean> => {
  if (!user) return false;

  try {
    // 1. Inspect existing token claims (without force refresh first)
    const tokenResult = await user.getIdTokenResult(false);
    if (tokenResult.claims.role === "authenticated") {
      return true;
    }

    // 2. Claim is missing. Request the server API to provision it
    const res = await fetch("/api/auth/claim-role", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenResult.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.warn("[ClaimProvisioner] Server claim request failed with status:", res.status);
      return false;
    }

    const data = await res.json();

    if (data.code === "ADMIN_NOT_CONFIGURED") {
      console.info(
        "[ClaimProvisioner] Note: Firebase Admin SDK is pending server configuration in .env.local. " +
          "See SUPABASE_SETUP_GUIDE.md for instructions."
      );
      return false;
    }

    if (data.status === "provisioned" || data.status === "already_provisioned") {
      // 3. Force-refresh client Firebase ID token so the fresh claim is available to Supabase
      await user.getIdToken(true);
      return true;
    }

    return false;
  } catch (err) {
    console.warn("[ClaimProvisioner] Error checking or provisioning custom claim:", err);
    return false;
  }
};

