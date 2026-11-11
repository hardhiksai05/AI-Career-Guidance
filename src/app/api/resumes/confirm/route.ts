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
        { error: "Unauthorized: Invalid or missing token" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => null);
    const { resumeId, confirmedData } = body || {};

    if (!resumeId || !confirmedData) {
      return NextResponse.json(
        { error: "Bad Request: resumeId and confirmedData are required" },
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

    // 1. Verify resume document ownership
    const { data: resume, error: fetchErr } = await supabaseAdmin
      .from("resumes")
      .select("*")
      .eq("id", resumeId)
      .maybeSingle();

    if (fetchErr || !resume) {
      return NextResponse.json(
        { error: "Not Found: Resume document not found" },
        { status: 404 }
      );
    }

    if (resume.firebase_uid !== user.uid) {
      return NextResponse.json(
        { error: "Forbidden: Access denied" },
        { status: 403 }
      );
    }

    // 2. Update Student Profile with confirmed details
    const profileUpdatePayload = {
      firebase_uid: user.uid,
      email: confirmedData.email?.trim() || user.email || "",
      full_name: confirmedData.fullName?.trim() || null,
      phone: confirmedData.phone?.trim() || null,
      university: confirmedData.university?.trim() || null,
      degree: confirmedData.degree?.trim() || null,
      branch: confirmedData.branch?.trim() || null,
      graduation_year: confirmedData.graduationYear?.trim() || null,
      gpa: confirmedData.gpa?.trim() || null,
      bio: confirmedData.bio?.trim() || null,
      updated_at: new Date().toISOString(),
    };

    const { data: updatedProfile, error: profileErr } = await supabaseAdmin
      .from("profiles")
      .upsert(profileUpdatePayload, { onConflict: "firebase_uid" })
      .select()
      .single();

    if (profileErr) {
      console.error("[Resume Confirm API] Profile update error:", profileErr);
      return NextResponse.json(
        { error: "Database Error: Failed to update student profile" },
        { status: 500 }
      );
    }

    // 3. Update Career Preferences with technical skills
    const newSkills = Array.isArray(confirmedData.technicalSkills)
      ? confirmedData.technicalSkills
      : [];

    const { data: existingPrefs } = await supabaseAdmin
      .from("career_preferences")
      .select("target_skills")
      .eq("firebase_uid", user.uid)
      .maybeSingle();

    const mergedSkills = Array.from(
      new Set([...(existingPrefs?.target_skills || []), ...newSkills])
    );

    const { data: updatedPrefs } = await supabaseAdmin
      .from("career_preferences")
      .upsert(
        {
          firebase_uid: user.uid,
          target_skills: mergedSkills,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "firebase_uid" }
      )
      .select()
      .single();

    // 4. Update Resume Status to 'verified'
    await supabaseAdmin
      .from("resumes")
      .update({
        upload_status: "verified",
        updated_at: new Date().toISOString(),
      })
      .eq("id", resumeId);

    // 5. Unlock 'resume_verified' achievement via secure RPC if available
    try {
      await supabaseAdmin.rpc("verify_and_unlock_achievement", {
        p_achievement_code: "resume_verified",
        p_firebase_uid: user.uid,
      });
    } catch (achErr) {
      console.warn("[Resume Confirm API] Achievement unlock note:", achErr);
    }

    return NextResponse.json({
      success: true,
      message: "Profile and career preferences successfully updated from verified CV.",
      profile: updatedProfile,
      preferences: updatedPrefs,
      resumeId: resume.id,
      status: "verified",
    });
  } catch (error: any) {
    console.error("[Resume Confirm API] Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error?.message },
      { status: 500 }
    );
  }
}

