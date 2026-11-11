import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate Firebase user from Authorization Bearer token
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid, missing, or expired Firebase authentication token" },
        { status: 401 }
      );
    }

    // 2. Parse and validate payload
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Bad Request: Missing request JSON payload" },
        { status: 400 }
      );
    }

    const { achievementCode, careerId } = body;

    if (!achievementCode || typeof achievementCode !== "string") {
      return NextResponse.json(
        { error: "Bad Request: achievementCode is required and must be a string" },
        { status: 400 }
      );
    }

    // 3. Ensure server-side Supabase admin client is configured
    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json(
        {
          error: "Service Unavailable",
          code: "SERVICE_ROLE_NOT_CONFIGURED",
          message:
            "SUPABASE_SERVICE_ROLE_KEY is not configured in server environment variables. Please add your service_role secret from Supabase Dashboard -> Project Settings -> API to .env.local",
        },
        { status: 503 }
      );
    }

    const supabaseAdmin = getSupabaseAdminClient();

    // 4. Execute privileged RPC function with cryptographically verified Firebase UID
    // The RPC verifies genuine mission or progress completion before inserting
    const { data: unlocked, error: rpcError } = await supabaseAdmin.rpc(
      "verify_and_unlock_achievement",
      {
        p_achievement_code: achievementCode.trim(),
        p_career_id: careerId && typeof careerId === "string" ? careerId : null,
        p_firebase_uid: user.uid,
      }
    );

    if (rpcError) {
      console.error("[API achievements/unlock] RPC execution error:", rpcError);
      return NextResponse.json(
        { error: "Internal Server Error", message: rpcError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      unlocked: Boolean(unlocked),
      achievementCode,
    });
  } catch (error: any) {
    console.error("[API achievements/unlock] Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error?.message || "Unexpected error" },
      { status: 500 }
    );
  }
}

