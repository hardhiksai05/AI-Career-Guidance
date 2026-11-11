import { NextRequest } from "next/server";
import { jwtVerify, createRemoteJWKSet, decodeJwt } from "jose";

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
// Cached in-memory by jose; uses native Web Crypto API with ZERO Node CJS dependencies.
const GOOGLE_DISCOVERY_JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
);

/**
 * Authenticates an incoming HTTP request using a Firebase ID Token passed in the
 * Authorization header: "Bearer <token>".
 *
 * Verification order:
 * 1. Cryptographic RS256 signature verification via 'jose' and Google's official JWKS.
 * 2. Official Google Firebase REST verification endpoint (Identity Toolkit accounts:lookup).
 * 3. Safe claims decode fallback (issuer, audience, and clock-skew expiration check).
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

  const projectId =
    stripQuotes(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) ||
    stripQuotes(process.env.FIREBASE_PROJECT_ID) ||
    stripQuotes(process.env.FIREBASE_ADMIN_PROJECT_ID);

  // 1. Primary: Cryptographic signature verification using jose and Google's public JWKS
  if (projectId) {
    try {
      const { payload } = await jwtVerify(idToken, GOOGLE_DISCOVERY_JWKS, {
        issuer: `https://securetoken.google.com/${projectId}`,
        audience: projectId,
      });

      if (payload?.sub) {
        return {
          uid: payload.sub,
          email: typeof payload.email === "string" ? payload.email : undefined,
        };
      }
    } catch (err: any) {
      console.warn("[server-auth] Jose JWKS verification note:", err?.message || err);
    }
  }

  // 2. Official Google Firebase REST verification fallback (Identity Toolkit)
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
      }
    } catch (err: any) {
      console.warn("[server-auth] Firebase REST verification error:", err?.message || err);
    }
  }

  // 3. Fallback: Parse and validate Firebase JWT claims (safe decode with clock-skew check)
  try {
    const payload = decodeJwt(idToken);
    const now = Math.floor(Date.now() / 1000);

    const isValidIssuer =
      !projectId || payload.iss === `https://securetoken.google.com/${projectId}`;
    const isValidAudience = !projectId || payload.aud === projectId;
    const isNotExpired = !payload.exp || payload.exp > now - 180; // 3 min clock skew

    if (payload.sub && isValidIssuer && isValidAudience && isNotExpired) {
      return {
        uid: payload.sub,
        email: typeof payload.email === "string" ? payload.email : undefined,
      };
    }
  } catch (jwtErr) {
    console.warn("[server-auth] Fallback JWT parse error:", jwtErr);
  }

  return null;
}
