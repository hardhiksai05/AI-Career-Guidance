import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";
import { StudentCareerContext } from "@/lib/gemini";
import { generateRecommendationsWithGemini } from "@/lib/recommendations";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

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

    let studentProfile: any = null;
    let careerPrefs: any = null;
    let savedTracks: any[] = [];

    if (isSupabaseAdminConfigured()) {
      try {
        const supabaseAdmin = getSupabaseAdminClient();
        const [profileResult, prefsResult, savedTracksResult] = await Promise.all([
          Promise.resolve(
            supabaseAdmin
              .from("profiles")
              .select("full_name, email, university, degree, branch, graduation_year, gpa, bio")
              .eq("firebase_uid", user.uid)
              .maybeSingle()
          ).catch((err: any) => {
            console.warn("[API Recommendations] Profile fetch warning:", err);
            return { data: null };
          }),
          Promise.resolve(
            supabaseAdmin
              .from("career_preferences")
              .select("preferred_domains, career_goals, target_skills, preferred_learning_style, preferred_locations, experience_level")
              .eq("firebase_uid", user.uid)
              .maybeSingle()
          ).catch((err: any) => {
            console.warn("[API Recommendations] Prefs fetch warning:", err);
            return { data: null };
          }),
          Promise.resolve(
            supabaseAdmin
              .from("roadmap_progress")
              .select("career_id, career_title, completed_missions")
              .eq("firebase_uid", user.uid)
          ).catch((err: any) => {
            console.warn("[API Recommendations] Saved tracks fetch warning:", err);
            return { data: [] };
          }),
        ]);

        studentProfile = profileResult?.data || null;
        careerPrefs = prefsResult?.data || null;
        savedTracks = (savedTracksResult as any)?.data || [];
      } catch (dbErr) {
        console.warn("[API Recommendations] Supabase fetch non-fatal warning:", dbErr);
      }
    }

    const savedCareerIds = new Set<string>();
    if (Array.isArray(savedTracks)) {
      for (const t of savedTracks) {
        if (t && typeof t.career_id === "string" && t.career_id.trim()) {
          savedCareerIds.add(t.career_id.trim().toLowerCase());
        }
      }
    }

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

    // 3. Generate intelligent recommendations with Gemini AI (with built-in deterministic fallback)
    const recommendations = await generateRecommendationsWithGemini(studentContext);

    // 4. Mark saved status safely without throwing on null or undefined fields
    const enriched = (recommendations || []).map((rec) => {
      const recId = rec?.id ? String(rec.id).toLowerCase() : "";
      const recRoadmapId = rec?.roadmapId ? String(rec.roadmapId).toLowerCase() : "";
      const recTitleSlug = rec?.title ? String(rec.title).toLowerCase().replace(/[^a-z0-9]+/g, "-") : "";

      return {
        ...rec,
        saved: Boolean(
          (recId && savedCareerIds.has(recId)) ||
          (recRoadmapId && savedCareerIds.has(recRoadmapId)) ||
          (recTitleSlug && savedCareerIds.has(recTitleSlug))
        ),
      };
    });

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

