import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import {
  getFirebaseAdminApp,
  isFirebaseAdminConfigured,
  provisionUserAuthenticatedRole,
} from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: Missing Bearer token in Authorization header" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1]?.trim();
    if (!idToken) {
      return NextResponse.json(
        { error: "Unauthorized: Empty ID token" },
        { status: 401 }
      );
    }

    // Check if Firebase Admin SDK is configured
    if (!isFirebaseAdminConfigured()) {
      return NextResponse.json(
        {
          success: false,
          code: "ADMIN_NOT_CONFIGURED",
          message:
            "Firebase Admin SDK is not configured in server environment variables. Please provide FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY in .env.local to enable server-side custom claim provisioning.",
        },
        { status: 200 }
      );
    }

    const adminApp = getFirebaseAdminApp();
    if (!adminApp) {
      return NextResponse.json(
        {
          success: false,
          code: "ADMIN_INIT_FAILED",
          message: "Failed to initialize Firebase Admin SDK",
        },
        { status: 500 }
      );
    }

    // Verify the caller's Firebase ID token
    const decodedToken = await getAuth(adminApp).verifyIdToken(idToken);
    const uid = decodedToken.uid;

    if (!uid) {
      return NextResponse.json(
        { error: "Invalid token: Missing UID" },
        { status: 400 }
      );
    }

    // Ensure user profile exists in Supabase profiles table
    try {
      const { isSupabaseAdminConfigured, getSupabaseAdminClient } = await import("@/lib/supabase-server");
      if (isSupabaseAdminConfigured()) {
        const supabaseAdmin = getSupabaseAdminClient();
        const { data: existingProfile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("firebase_uid", uid)
          .maybeSingle();

        if (!existingProfile) {
          await supabaseAdmin.from("profiles").upsert(
            {
              firebase_uid: uid,
              email: decodedToken.email || "",
              full_name: decodedToken.name || null,
              profile_picture_url: decodedToken.picture || null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "firebase_uid" }
          );
        }
      }
    } catch (profileErr) {
      console.warn("[API claim-role] Note: Profile sync warning:", profileErr);
    }

    // Check if the role claim is already present in the token
    if (decodedToken.role === "authenticated") {
      return NextResponse.json({
        success: true,
        status: "already_provisioned",
        uid,
        role: "authenticated",
      });
    }

    // Provision the role: 'authenticated' claim idempotently
    const result = await provisionUserAuthenticatedRole(uid);

    return NextResponse.json({
      success: true,
      status: result.status,
      uid,
      role: result.role,
    });
  } catch (error: any) {
    console.error("[API claim-role] Error processing claim assignment:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message || "Failed to provision custom claims",
      },
      { status: 500 }
    );
  }
}
