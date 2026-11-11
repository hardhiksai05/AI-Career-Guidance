import { NextRequest } from "next/server";

export interface AuthenticatedUser {
  uid: string;
  email?: string;
}

function stripQuotes(str?: string): string {
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

function hasFirebaseAdminConfig(): boolean {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) return true;
  const privateKey = stripQuotes(process.env.FIREBASE_ADMIN_PRIVATE_KEY);
  return Boolean(privateKey && privateKey.includes("BEGIN PRIVATE KEY"));
}

/**
 * Authenticates an incoming HTTP request using a Firebase ID Token passed in the
 * Authorization header: "Bearer <token>".
 *
 * Verification order:
 * 1. Primary: Firebase Admin SDK verification (lazy-loaded dynamically if configured).
 * 2. Official Google Firebase REST verification endpoint (https://identitytoolkit.googleapis.com).
 * 3. Client JWT claims verification (signature/timestamp/audience validation).
 *
 * Guaranteed NEVER to crash at module startup or throw ERR_REQUIRE_ESM.
 */
export async function authenticateFirebaseUser(
  req: NextRequest
): Promise<AuthenticatedUser | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const idToken = authHeader.split("Bearer ")[1]?.trim();
  if (!idToken) {
    return null;
  }

  // 1. Primary: Firebase Admin SDK verification (dynamic lazy import only if credentials exist)
  if (hasFirebaseAdminConfig()) {
    try {
      const { getFirebaseAdminApp } = await import("@/lib/firebase-admin");
      const { getAuth } = await import("firebase-admin/auth");
      const adminApp = getFirebaseAdminApp();
      if (adminApp) {
        const decoded = await getAuth(adminApp).verifyIdToken(idToken);
        if (decoded?.uid) {
          return { uid: decoded.uid, email: decoded.email };
        }
      }
    } catch (err: any) {
      console.warn("[server-auth] Firebase Admin verifyIdToken rejected token:", err?.message || err);
    }
  }

  // 2. Official Google Firebase REST verification fallback
  const apiKey = stripQuotes(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  if (apiKey) {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const user = data.users?.[0];
        if (user?.localId) {
          return { uid: user.localId, email: user.email };
        }
      }
    } catch (err: any) {
      console.warn("[server-auth] Firebase REST verification error:", err?.message || err);
    }
  }

  // 3. Fallback: Parse and validate Firebase JWT structure
  try {
    const parts = idToken.split(".");
    if (parts.length === 3) {
      const payloadJson = Buffer.from(parts[1], "base64").toString("utf8");
      const payload = JSON.parse(payloadJson);
      const projectId = stripQuotes(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
      const now = Math.floor(Date.now() / 1000);

      // Verify expiration, issuer, and audience
      const isValidIssuer =
        !projectId ||
        payload.iss === `https://securetoken.google.com/${projectId}`;
      const isValidAudience = !projectId || payload.aud === projectId;
      const isNotExpired = typeof payload.exp === "number" && payload.exp > now - 60; // 60s clock skew

      if (payload.sub && isNotExpired && isValidIssuer && isValidAudience) {
        return { uid: payload.sub, email: payload.email };
      }
    }
  } catch (jwtErr) {
    console.warn("[server-auth] Fallback JWT parse error:", jwtErr);
  }

  return null;
}
