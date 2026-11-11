import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

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

/**
 * Validates whether Firebase Admin credentials are configured in server environment.
 */
export const isFirebaseAdminConfigured = (): boolean => {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) return true;
  const projectId = stripOuterQuotes(
    process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
  const clientEmail = stripOuterQuotes(process.env.FIREBASE_ADMIN_CLIENT_EMAIL);
  const privateKey = stripOuterQuotes(process.env.FIREBASE_ADMIN_PRIVATE_KEY);
  return Boolean(
    projectId &&
      clientEmail &&
      privateKey &&
      !clientEmail.includes("xxxxx") &&
      privateKey.includes("BEGIN PRIVATE KEY")
  );
};

/**
 * Initializes and returns the Firebase Admin App singleton instance.
 * Server-only. Never import into client components.
 */
export const getFirebaseAdminApp = (): App | null => {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0]!;
  }

  try {
    // 1. JSON Service Account Key string option
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(stripOuterQuotes(process.env.FIREBASE_SERVICE_ACCOUNT_KEY));
      return initializeApp({
        credential: cert(serviceAccount),
      });
    }

    // 2. Individual environment variables option
    const projectId = stripOuterQuotes(
      process.env.FIREBASE_ADMIN_PROJECT_ID ||
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    );
    const clientEmail = stripOuterQuotes(process.env.FIREBASE_ADMIN_CLIENT_EMAIL);
    let privateKey = stripOuterQuotes(process.env.FIREBASE_ADMIN_PRIVATE_KEY);

    if (projectId && clientEmail && privateKey) {
      // Unescape newlines if stored as "\n" in environment strings
      if (privateKey.includes("\\n")) {
        privateKey = privateKey.replace(/\\n/g, "\n");
      }

      return initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    }

    // Fallback: Default application credentials (e.g. if deployed to Google Cloud)
    return initializeApp();
  } catch (error) {
    console.warn("[Firebase Admin] Initialization failed or not configured:", error);
    return null;
  }
};

/**
 * Safely provisions the 'role: authenticated' custom user claim required by
 * Supabase Row Level Security (RLS) under Third-Party Auth.
 *
 * Idempotent:
 * - Checks existing claims first.
 * - If 'role' is already 'authenticated', skips update.
 * - Preserves any existing custom claims.
 * - Rejects any attempt to grant 'service_role' or 'admin'.
 */
export const provisionUserAuthenticatedRole = async (
  uid: string
): Promise<{ status: "provisioned" | "already_provisioned" | "skipped"; role: string }> => {
  const app = getFirebaseAdminApp();
  if (!app) {
    throw new Error(
      "Firebase Admin SDK is not configured on the server. Please configure FIREBASE_ADMIN_* in .env.local."
    );
  }

  const authAdmin = getAuth(app);
  const user = await authAdmin.getUser(uid);
  const currentClaims = user.customClaims || {};

  // If already authenticated role, no-op
  if (currentClaims.role === "authenticated") {
    return { status: "already_provisioned", role: "authenticated" };
  }

  // Preserve existing claims, add role: 'authenticated'
  // Explicitly deny privileged roles
  const updatedClaims = {
    ...currentClaims,
    role: "authenticated",
  };

  // Guard: ensure no accidental elevation
  delete (updatedClaims as any).service_role;
  delete (updatedClaims as any).supabase_admin;

  await authAdmin.setCustomUserClaims(uid, updatedClaims);

  return { status: "provisioned", role: "authenticated" };
};
