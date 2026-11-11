import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing Firebase token" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Bad Request: Missing request payload" },
        { status: 400 }
      );
    }

    const { careerId, careerTitle, action = "save" } = body;
    if (!careerId || typeof careerId !== "string") {
      return NextResponse.json(
        { error: "Bad Request: careerId is required and must be a string" },
        { status: 400 }
      );
    }

    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json(
        { error: "Service Unavailable: Supabase Admin not configured" },
        { status: 503 }
      );
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const normalizedCareerId = careerId.trim().toLowerCase();
    const title = careerTitle?.trim() || careerId;

    if (action === "save") {
      // Check if existing progress record exists
      const { data: existing } = await supabaseAdmin
        .from("roadmap_progress")
        .select("id, completed_missions")
        .eq("firebase_uid", user.uid)
        .eq("career_id", normalizedCareerId)
        .maybeSingle();

      const missions = new Set(existing?.completed_missions || []);
      missions.add("saved_recommendation");

      const { error: upsertErr } = await supabaseAdmin
        .from("roadmap_progress")
        .upsert(
          {
            firebase_uid: user.uid,
            career_id: normalizedCareerId,
            career_title: title,
            completed_missions: Array.from(missions),
            last_accessed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "firebase_uid,career_id" }
        );

      if (upsertErr) {
        console.error("[API Recommendations Save] Upsert error:", upsertErr);
        return NextResponse.json(
          { error: "Database Error: Could not save recommendation" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        saved: true,
        careerId: normalizedCareerId,
        careerTitle: title,
      });
    } else {
      // Unsave: remove 'saved_recommendation' tag from completed_missions
      const { data: existing } = await supabaseAdmin
        .from("roadmap_progress")
        .select("id, completed_missions, total_xp")
        .eq("firebase_uid", user.uid)
        .eq("career_id", normalizedCareerId)
        .maybeSingle();

      if (existing) {
        const missions = (existing.completed_missions || []).filter(
          (m: string) => m !== "saved_recommendation"
        );

        // If no progress earned and no other missions, can delete; otherwise update
        if (missions.length === 0 && (existing.total_xp || 0) === 0) {
          await supabaseAdmin
            .from("roadmap_progress")
            .delete()
            .eq("id", existing.id);
        } else {
          await supabaseAdmin
            .from("roadmap_progress")
            .update({
              completed_missions: missions,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existing.id);
        }
      }

      return NextResponse.json({
        success: true,
        saved: false,
        careerId: normalizedCareerId,
      });
    }
  } catch (error: any) {
    console.error("[API Recommendations Save] Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error?.message },
      { status: 500 }
    );
  }
}

