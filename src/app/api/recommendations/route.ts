import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";
import { StudentCareerContext } from "@/lib/gemini";
import { generateRecommendationsWithGemini } from "@/lib/recommendations";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return handleRecommendations(req);
}

export async function POST(req: NextRequest) {
  return handleRecommendations(req);
}

async function handleRecommendations(req: NextRequest) {
  try {
    // 1. Authenticate Firebase user from Authorization Bearer token
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing Firebase authentication token" },
        { status: 401 }
      );
    }

    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json(
        {
          error: "Service Unavailable",
          code: "SUPABASE_ADMIN_NOT_CONFIGURED",
          message: "SUPABASE_SERVICE_ROLE_KEY is not configured on the server.",
        },
        { status: 503 }
      );
    }

    const supabaseAdmin = getSupabaseAdminClient();

    // 2. Fetch authenticated student profile and career preferences
    const [profileResult, prefsResult, savedTracksResult] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("full_name, email, university, degree, branch, graduation_year, gpa, bio")
        .eq("firebase_uid", user.uid)
        .maybeSingle(),
      supabaseAdmin
        .from("career_preferences")
        .select("preferred_domains, career_goals, target_skills, preferred_learning_style, preferred_locations, experience_level")
        .eq("firebase_uid", user.uid)
        .maybeSingle(),
      supabaseAdmin
        .from("roadmap_progress")
        .select("career_id, career_title, completed_missions")
        .eq("firebase_uid", user.uid),
    ]);

    const studentProfile = profileResult.data;
    const careerPrefs = prefsResult.data;
    const savedTracks = savedTracksResult.data || [];

    const savedCareerIds = new Set(
      savedTracks
        .filter((t) => t.completed_missions?.includes("saved_recommendation") || t.career_id)
        .map((t) => t.career_id.toLowerCase())
    );

    const studentContext: StudentCareerContext = {
      fullName: studentProfile?.full_name || null,
      email: studentProfile?.email || user.email || null,
      university: studentProfile?.university || null,
      degree: studentProfile?.degree || null,
      branch: studentProfile?.branch || null,
      graduationYear: studentProfile?.graduation_year || null,
      gpa: studentProfile?.gpa || null,
      bio: studentProfile?.bio || null,
      preferredDomains: careerPrefs?.preferred_domains || [],
      careerGoals: careerPrefs?.career_goals || null,
      targetSkills: careerPrefs?.target_skills || [],
      preferredLearningStyle: careerPrefs?.preferred_learning_style || null,
      preferredLocations: careerPrefs?.preferred_locations || [],
      experienceLevel: careerPrefs?.experience_level || null,
    };

    // 3. Generate intelligent recommendations with Gemini AI
    const recommendations = await generateRecommendationsWithGemini(studentContext);

    // 4. Mark saved status on recommendations
    const enriched = recommendations.map((rec) => ({
      ...rec,
      saved:
        savedCareerIds.has(rec.id.toLowerCase()) ||
        savedCareerIds.has(rec.roadmapId.toLowerCase()) ||
        savedCareerIds.has(rec.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
    }));

    return NextResponse.json({
      success: true,
      studentSummary: {
        name: studentContext.fullName,
        degree: studentContext.degree,
        branch: studentContext.branch,
        university: studentContext.university,
        domains: studentContext.preferredDomains,
        experienceLevel: studentContext.experienceLevel,
      },
      recommendations: enriched,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[API Recommendations] Unhandled error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message || "Failed to generate intelligent career recommendations",
      },
      { status: 500 }
    );
  }
}

