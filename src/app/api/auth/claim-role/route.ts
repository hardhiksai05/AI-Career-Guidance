import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateFirebaseUser(req);
    if (!user || !user.uid) {
      return NextResponse.json(
        { error: "Unauthorized: Missing, invalid, or expired Firebase token" },
        { status: 401 }
      );
    }

    const uid = user.uid;

    const {
      getFirebaseAdminApp,
      isFirebaseAdminConfigured,
      provisionUserAuthenticatedRole,
    } = await import("@/lib/firebase-admin");

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
              email: user.email || "",
              updated_at: new Date().toISOString(),
            },
            { onConflict: "firebase_uid" }
          );
        }
      }
    } catch (profileErr) {
      console.warn("[API claim-role] Note: Profile sync warning:", profileErr);
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
