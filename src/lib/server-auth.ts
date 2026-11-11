import { NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";
import {
  getFirebaseAdminApp,
  isFirebaseAdminConfigured,
} from "@/lib/firebase-admin";

export interface AuthenticatedUser {
  uid: string;
  email?: string;
}

/**
 * Authenticates an incoming HTTP request using a Firebase ID Token passed in the
 * Authorization header: "Bearer <token>".
 *
 * Verification order:
 * 1. Cryptographically verified using Firebase Admin SDK (server-side).
 * 2. If Admin SDK is not configured yet, verified via Google Firebase Auth REST endpoint.
 *
 * In BOTH modes:
 * - Token signature, expiration, and issuer are verified by Google / Firebase.
 * - The returned UID is cryptographically proven, NOT client-supplied.
 * - Returns null if the token is missing, invalid, expired, or tampered with.
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

  // 1. Primary: Firebase Admin SDK verification
  if (isFirebaseAdminConfigured()) {
    try {
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
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
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
      console.warn("[server-auth] Firebase REST verification failed:", err?.message || err);
    }
  }

  return null;
}

