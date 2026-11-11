import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";
import { StudentCareerContext } from "@/lib/gemini";
import { generateRecommendationsWithGemini, CareerRecommendation } from "@/lib/recommendations";
import {
  getLatestStudentCv,
  getCvContentHash,
  getActiveRecommendationSnapshot,
  findSnapshotByCvHash,
  reactivateSnapshot,
  saveRecommendationSnapshot,
  withGenerationLock,
} from "@/lib/services/recommendation-snapshot-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  return handleRecommendations(req, false);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const forceRegenerate = Boolean(body?.forceRegenerate);
  return handleRecommendations(req, forceRegenerate);
}

async function handleRecommendations(req: NextRequest, forceRegenerate: boolean) {
  try {
    // 1. Authenticate Firebase user from Authorization Bearer token
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing Firebase authentication token" },
        { status: 401 }
      );
    }

    // 2. Retrieve user's saved career bookmarks for enrichment
    let savedTracks: any[] = [];
    if (isSupabaseAdminConfigured()) {
      try {
        const supabaseAdmin = getSupabaseAdminClient();
        const savedTracksResult = await supabaseAdmin
          .from("roadmap_progress")
          .select("career_id, career_title, completed_missions")
          .eq("firebase_uid", user.uid);
        savedTracks = savedTracksResult?.data || [];
      } catch (dbErr) {
        console.warn("[API Recommendations] Saved tracks fetch warning:", dbErr);
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

    // 3. Check if user has uploaded a CV/Resume
    const latestCv = await getLatestStudentCv(user.uid);
    if (!latestCv) {
      return NextResponse.json({
        success: true,
        hasCv: false,
        cached: false,
        recommendations: [],
        snapshot: null,
        message: "No CV uploaded yet. Upload your CV to receive personalized AI recommendations.",
        timestamp: new Date().toISOString(),
      });
    }

    // 4. Derive SHA-256 hash of the CV binary content
    const cvHash = (await getCvContentHash(latestCv)) || latestCv.id;

    // 5. CACHING LOGIC: If not an explicit regeneration, check for existing snapshots
    if (!forceRegenerate) {
      const activeSnapshot = await getActiveRecommendationSnapshot(user.uid);

      // Check if current active snapshot matches current CV hash
      if (activeSnapshot && activeSnapshot.cv_hash === cvHash) {
        console.log(`[API Recommendations] Cache HIT for user ${user.uid} (CV Hash: ${cvHash.slice(0, 8)}). Reusing saved recommendations.`);
        const enriched = enrichRecommendationsWithSavedStatus(
          activeSnapshot.recommendation_data || [],
          savedCareerIds
        );

        return NextResponse.json({
          success: true,
          hasCv: true,
          cached: true,
          statusMessage: "Recommendations saved – No new AI analysis required.",
          studentSummary: activeSnapshot.student_summary || null,
          recommendations: enriched,
          snapshot: {
            id: activeSnapshot.id,
            cvHash: activeSnapshot.cv_hash,
            cvFilename: activeSnapshot.cv_filename || latestCv.original_filename,
            lastAnalyzedAt: activeSnapshot.created_at,
            modelName: activeSnapshot.model_name,
            version: activeSnapshot.generation_version,
            isActive: true,
          },
          timestamp: activeSnapshot.updated_at,
        });
      }

      // Check if an older historical snapshot matches this CV hash (re-uploaded previously analyzed CV)
      const historicalSnapshot = await findSnapshotByCvHash(user.uid, cvHash);
      if (historicalSnapshot) {
        console.log(`[API Recommendations] Historical match found for CV hash ${cvHash.slice(0, 8)}. Reactivating snapshot.`);
        await reactivateSnapshot(historicalSnapshot.id, user.uid);

        const enriched = enrichRecommendationsWithSavedStatus(
          historicalSnapshot.recommendation_data || [],
          savedCareerIds
        );

        return NextResponse.json({
          success: true,
          hasCv: true,
          cached: true,
          statusMessage: "Recommendations restored from previous analysis – No new AI analysis required.",
          studentSummary: historicalSnapshot.student_summary || null,
          recommendations: enriched,
          snapshot: {
            id: historicalSnapshot.id,
            cvHash: historicalSnapshot.cv_hash,
            cvFilename: historicalSnapshot.cv_filename || latestCv.original_filename,
            lastAnalyzedAt: historicalSnapshot.created_at,
            modelName: historicalSnapshot.model_name,
            version: historicalSnapshot.generation_version,
            isActive: true,
          },
          timestamp: new Date().toISOString(),
        });
      }
    }

    // 6. GENERATION: New CV or explicit user regeneration
    // Acquire per-user concurrency lock to prevent duplicate Gemini calls
    console.log(`[API Recommendations] Generating recommendations with Gemini for user ${user.uid} (CV: ${latestCv.original_filename}, Hash: ${cvHash.slice(0, 8)})`);

    return await withGenerationLock(user.uid, cvHash, async () => {
      // Load student profile & career preferences
      let studentProfile: any = null;
      let careerPrefs: any = null;

      if (isSupabaseAdminConfigured()) {
        try {
          const supabaseAdmin = getSupabaseAdminClient();
          const [profileResult, prefsResult] = await Promise.all([
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
          ]);

          studentProfile = profileResult?.data || null;
          careerPrefs = prefsResult?.data || null;
        } catch (dbErr) {
          console.warn("[API Recommendations] Profile/Prefs fetch warning:", dbErr);
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

      // 7. Invoke Gemini AI (with deterministic fallback safety)
      const recommendations = await generateRecommendationsWithGemini(studentContext);

      // Determine version number
      const prevSnapshot = await getActiveRecommendationSnapshot(user.uid);
      const nextVersion = (prevSnapshot?.generation_version || 0) + 1;

      // 8. Save generated snapshot in Supabase
      const studentSummary = {
        name: studentContext.fullName,
        degree: studentContext.degree,
        branch: studentContext.branch,
        university: studentContext.university,
        domains: studentContext.preferredDomains,
        experienceLevel: studentContext.experienceLevel,
      };

      const savedSnapshot = await saveRecommendationSnapshot({
        firebaseUid: user.uid,
        resumeId: latestCv.id,
        cvHash,
        cvFilename: latestCv.original_filename,
        recommendations,
        studentSummary,
        modelName: "gemini-3.1-flash-lite",
        version: nextVersion,
      });

      const enriched = enrichRecommendationsWithSavedStatus(recommendations, savedCareerIds);

      return NextResponse.json({
        success: true,
        hasCv: true,
        cached: false,
        statusMessage: forceRegenerate
          ? "Fresh recommendations generated and saved."
          : "New CV analyzed and recommendations saved.",
        studentSummary,
        recommendations: enriched,
        snapshot: {
          id: savedSnapshot.id,
          cvHash: savedSnapshot.cv_hash,
          cvFilename: savedSnapshot.cv_filename,
          lastAnalyzedAt: savedSnapshot.created_at,
          modelName: savedSnapshot.model_name,
          version: savedSnapshot.generation_version,
          isActive: true,
        },
        timestamp: savedSnapshot.updated_at,
      });
    });
  } catch (error: any) {
    console.error("[API Recommendations] Unhandled error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message || "Failed to process career recommendations",
      },
      { status: 500 }
    );
  }
}

/**
 * Enriches recommendations with saved bookmark status from user's roadmap_progress.
 */
function enrichRecommendationsWithSavedStatus(
  recommendations: CareerRecommendation[],
  savedCareerIds: Set<string>
): CareerRecommendation[] {
  return (recommendations || []).map((rec) => {
    const recId = rec?.id ? String(rec.id).toLowerCase() : "";
    const recRoadmapId = rec?.roadmapId ? String(rec.roadmapId).toLowerCase() : "";
    const recTitleSlug = rec?.title
      ? String(rec.title).toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : "";

    return {
      ...rec,
      saved: Boolean(
        (recId && savedCareerIds.has(recId)) ||
        (recRoadmapId && savedCareerIds.has(recRoadmapId)) ||
        (recTitleSlug && savedCareerIds.has(recTitleSlug))
      ),
    };
  });
}
