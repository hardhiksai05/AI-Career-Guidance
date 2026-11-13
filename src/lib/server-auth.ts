import { NextRequest } from "next/server";
import { jwtVerify, createRemoteJWKSet } from "jose";

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

// Google's public JWKS keyset for cryptographically verifying Firebase ID Tokens
// Cached in-memory by jose; uses native Web Crypto API with strict RS256 signature verification.
const GOOGLE_DISCOVERY_JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
);

/**
 * Authenticates an incoming HTTP request using a Firebase ID Token passed in the
 * Authorization header: "Bearer <token>".
 *
 * Security Requirements:
 * 1. Cryptographic RS256 signature verification via 'jose' and Google's official JWKS.
 * 2. Secondary verified fallback: Google Identity Toolkit accounts:lookup API.
 * 3. STRICT: NEVER accept unverified or decode-only JWTs.
 * 4. Return null immediately if verification fails.
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

  const projectId =
    stripQuotes(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) ||
    stripQuotes(process.env.FIREBASE_PROJECT_ID) ||
    stripQuotes(process.env.FIREBASE_ADMIN_PROJECT_ID);

  // 1. Primary: Cryptographic RS256 signature verification using jose and Google's public JWKS
  if (projectId) {
    try {
      const { payload } = await jwtVerify(idToken, GOOGLE_DISCOVERY_JWKS, {
        issuer: `https://securetoken.google.com/${projectId}`,
        audience: projectId,
        algorithms: ["RS256"],
      });

      if (payload?.sub && typeof payload.sub === "string") {
        return {
          uid: payload.sub,
          email: typeof payload.email === "string" ? payload.email : undefined,
        };
      }
    } catch (err: any) {
      // Signature verification failed or token expired
      console.warn("[server-auth] Primary JWKS verification failed:", err?.code || err?.message);
    }
  }

  // 2. Secondary Verified Fallback: Google Identity Toolkit endpoint (Google-authenticated lookup)
  const apiKey =
    stripQuotes(process.env.NEXT_PUBLIC_FIREBASE_API_KEY) ||
    stripQuotes(process.env.FIREBASE_API_KEY);
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
          return {
            uid: user.localId,
            email: user.email || undefined,
          };
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        console.warn("[server-auth] Firebase REST verification rejected token:", errData?.error?.message || res.status);
      }
    } catch (err: any) {
      console.warn("[server-auth] Firebase REST lookup network error:", err?.message || err);
    }
  }

  // STRICT SECURITY INVARIANT:
  // Both cryptographic JWKS and Google Identity Toolkit verification failed.
  // Never accept an unverified token. Return null to enforce HTTP 401 Unauthorized.
  return null;
}
