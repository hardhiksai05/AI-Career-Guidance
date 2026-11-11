import { getSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase-server";
import { fetchAdzunaJobs, RawJobListing } from "./adzuna-service";
import { processJobDescriptionWithGemini, ProcessedJobDetails, getJobProcessingModelName } from "./gemini-job-processor";
import { calculateJobMatch, rankAndFilterJobs, CandidateProfileContext, JobMatchResult } from "./job-matching-engine";
import { getLatestStudentCv } from "./recommendation-snapshot-service";

export interface StudentJobRecommendationView {
  id: string; // job id
  recommendationId?: string;
  provider: string;
  providerJobId: string;
  title: string;
  company: string;
  location: string;
  description: string;
  descriptionSummary: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryIsPredicted: boolean;
  contractType: string | null;
  experienceLevel: string | null;
  category: string;
  requiredSkills: string[];
  responsibilities: string[];
  qualifications: string[];
  applicationUrl: string;
  postedAt: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  qualificationCompatibility: string;
  experienceCompatibility: string;
  matchExplanation: string;
  isBookmarked?: boolean;
}

const STORAGE_BUCKET = "student-resumes";

/**
 * Retrieves the student's candidate profile context from Supabase (profile, preferences, resume)
 */
export async function getCandidateContext(firebaseUid: string): Promise<CandidateProfileContext> {
  const defaultContext: CandidateProfileContext = {
    fullName: "Student",
    degree: "B.Tech",
    branch: "Computer Science",
    university: "University",
    skills: ["Python", "JavaScript", "SQL", "Git", "Problem Solving"],
    projects: [],
    preferredLocations: ["India"],
    experienceLevel: "Entry-Level / Fresher",
  };

  if (!isSupabaseAdminConfigured()) return defaultContext;

  try {
    const supabaseAdmin = getSupabaseAdminClient();
    const [profileRes, prefsRes, latestCv] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("full_name, degree, branch, university, bio")
        .eq("firebase_uid", firebaseUid)
        .maybeSingle(),
      supabaseAdmin
        .from("career_preferences")
        .select("target_skills, preferred_locations, experience_level, preferred_domains, career_goals")
        .eq("firebase_uid", firebaseUid)
        .maybeSingle(),
      getLatestStudentCv(firebaseUid),
    ]);

    const profile = profileRes?.data;
    const prefs = prefsRes?.data;

    let cvSkills: string[] = [];
    if (latestCv) {
      // Check cached extraction
      const extractedPath = `${latestCv.storage_path}.extracted.json`;
      const { data: blob } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .download(extractedPath);
      if (blob) {
        try {
          const json = JSON.parse(await blob.text());
          if (Array.isArray(json.technicalSkills)) cvSkills = json.technicalSkills;
        } catch {}
      }
    }

    const mergedSkills = Array.from(
      new Set([
        ...(prefs?.target_skills || []),
        ...cvSkills,
        "Git",
        "Problem Solving",
      ])
    );

    return {
      fullName: profile?.full_name || "Student",
      degree: profile?.degree || "B.Tech",
      branch: profile?.branch || "Computer Science",
      university: profile?.university || "University",
      skills: mergedSkills.length > 0 ? mergedSkills : defaultContext.skills,
      projects: prefs?.career_goals ? [prefs.career_goals] : [],
      preferredLocations: prefs?.preferred_locations?.length ? prefs.preferred_locations : ["India"],
      experienceLevel: prefs?.experience_level || "Entry-Level / Fresher",
    };
  } catch (err) {
    console.warn("[JobRecService] Profile context retrieval warning:", err);
    return defaultContext;
  }
}

/**
 * High-level coordinator that returns up to 50 personalized job recommendations.
 * Reuses saved recommendations whenever available (ZERO Gemini & Adzuna calls).
 * Automatically caches newly processed jobs and student recommendations.
 */
export async function getStudentJobRecommendations(
  firebaseUid: string,
  options: { forceSync?: boolean } = {}
): Promise<{
  recommendations: StudentJobRecommendationView[];
  totalAvailable: number;
  cached: boolean;
  modelUsed: string;
  source: string;
  lastUpdated: string;
}> {
  const modelName = getJobProcessingModelName();
  const forceSync = Boolean(options.forceSync);

  // 1. If not forcing sync, check for existing stored recommendations
  if (!forceSync && isSupabaseAdminConfigured()) {
    try {
      const supabaseAdmin = getSupabaseAdminClient();
      const { data: storedRecs, error } = await supabaseAdmin
        .from("student_job_recommendations")
        .select(`
          id,
          match_score,
          matched_skills,
          missing_skills,
          qualification_compatibility,
          experience_compatibility,
          match_explanation,
          created_at,
          jobs (*)
        `)
        .eq("firebase_uid", firebaseUid)
        .order("match_score", { ascending: false })
        .limit(50);

      if (!error && Array.isArray(storedRecs) && storedRecs.length > 0) {
        console.log(`[JobRecService] Cache HIT for student ${firebaseUid}. Loaded ${storedRecs.length} saved recommendations.`);
        const mapped = storedRecs
          .filter((r) => r.jobs && (r.jobs as any).is_active)
          .map((r) => mapDatabaseRecordToView(r, r.jobs as any));

        if (mapped.length > 0) {
          return {
            recommendations: mapped,
            totalAvailable: mapped.length,
            cached: true,
            modelUsed: modelName,
            source: "supabase_cache",
            lastUpdated: storedRecs[0].created_at,
          };
        }
      }
    } catch (dbErr) {
      console.warn("[JobRecService] Stored recommendations query fallback:", dbErr);
    }

    // Storage fallback check
    try {
      const supabaseAdmin = getSupabaseAdminClient();
      const { data: blob } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .download(`${firebaseUid}/job_recommendations_snapshot.json`);

      if (blob) {
        const parsed = JSON.parse(await blob.text());
        if (Array.isArray(parsed?.recommendations) && parsed.recommendations.length > 0) {
          return {
            recommendations: parsed.recommendations,
            totalAvailable: parsed.recommendations.length,
            cached: true,
            modelUsed: modelName,
            source: "storage_cache",
            lastUpdated: parsed.lastUpdated || new Date().toISOString(),
          };
        }
      }
    } catch {}
  }

  // 2. Fetch fresh listings from Adzuna
  console.log(`[JobRecService] Fetching fresh listings for student ${firebaseUid} (forceSync: ${forceSync})`);
  const candidate = await getCandidateContext(firebaseUid);

  // Generate intelligent search queries based on candidate profile
  const queries: string[] = [];
  if (candidate.branch) {
    queries.push(`${candidate.branch} Engineer`);
  }
  if (candidate.skills && candidate.skills.length > 0) {
    queries.push(`${candidate.skills[0]} Developer`);
    if (candidate.skills.length > 1) {
      queries.push(`${candidate.skills[1]} Engineer`);
    }
  }
  queries.push("Software Engineer Graduate");

  const syncStartedAt = new Date().toISOString();
  const { jobs: rawJobs, source: adzunaSource, error: adzunaErr } = await fetchAdzunaJobs(
    queries,
    candidate.preferredLocations,
    50
  );

  let jobsInserted = 0;
  let jobsUpdated = 0;
  let jobsFailed = 0;

  // 3. Process jobs with Gemini 2.5 Flash-Lite (with content-hash caching)
  const processedWithDetails: (RawJobListing & ProcessedJobDetails & { id?: string })[] = [];

  const supabaseAdmin = isSupabaseAdminConfigured() ? getSupabaseAdminClient() : null;

  for (const rawJob of rawJobs) {
    try {
      let details: ProcessedJobDetails | null = null;
      let existingJobId: string | undefined = undefined;

      // Check if job is already in database with matching content_hash
      if (supabaseAdmin) {
        try {
          const { data: existing } = await supabaseAdmin
            .from("jobs")
            .select("*")
            .eq("provider", rawJob.provider)
            .eq("provider_job_id", rawJob.providerJobId)
            .maybeSingle();

          if (existing && existing.content_hash === rawJob.contentHash && existing.required_skills?.length > 0) {
            // CACHE HIT on job description! Zero Gemini calls!
            existingJobId = existing.id;
            details = {
              requiredSkills: existing.required_skills || [],
              qualifications: existing.qualifications || [],
              experienceLevel: existing.experience_level || null,
              descriptionSummary: existing.description_summary || rawJob.description.slice(0, 200),
              responsibilities: existing.responsibilities || [],
              category: existing.category || rawJob.category,
              usedAi: false,
            };
          }
        } catch {}
      }

      // If not cached, process with Gemini 2.5 Flash-Lite
      if (!details) {
        details = await processJobDescriptionWithGemini(rawJob);
      }

      // Upsert into Supabase 'jobs' table
      if (supabaseAdmin) {
        try {
          const { data: savedJob, error: upsertErr } = await supabaseAdmin
            .from("jobs")
            .upsert(
              {
                provider: rawJob.provider,
                provider_job_id: rawJob.providerJobId,
                title: rawJob.title,
                company: rawJob.company,
                location: rawJob.location,
                description: rawJob.description,
                description_summary: details.descriptionSummary,
                salary_min: rawJob.salaryMin,
                salary_max: rawJob.salaryMax,
                salary_is_predicted: rawJob.salaryIsPredicted,
                contract_type: rawJob.contractType,
                experience_level: details.experienceLevel,
                category: details.category,
                required_skills: details.requiredSkills,
                responsibilities: details.responsibilities,
                qualifications: details.qualifications,
                application_url: rawJob.applicationUrl,
                posted_at: rawJob.postedAt,
                last_verified_at: new Date().toISOString(),
                fetched_at: new Date().toISOString(),
                is_active: true,
                raw_provider_data: rawJob.rawProviderData,
                content_hash: rawJob.contentHash,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "provider,provider_job_id" }
            )
            .select("id")
            .single();

          if (!upsertErr && savedJob) {
            existingJobId = savedJob.id;
            jobsInserted++;
          } else {
            jobsUpdated++;
          }
        } catch (dbSaveErr) {
          console.warn("[JobRecService] Job upsert warning:", dbSaveErr);
        }
      }

      processedWithDetails.push({
        ...rawJob,
        ...details,
        id: existingJobId,
      });
    } catch (processErr) {
      console.warn(`[JobRecService] Failed to process job ${rawJob.providerJobId}:`, processErr);
      jobsFailed++;
    }
  }

  // 4. Run Deterministic Matching Engine
  const ranked = rankAndFilterJobs(processedWithDetails, candidate, 50);

  // 5. Save Recommendations to 'student_job_recommendations' table
  if (supabaseAdmin) {
    try {
      const recPayloads = ranked
        .filter((r) => r.job.id)
        .map((r) => ({
          firebase_uid: firebaseUid,
          job_id: r.job.id!,
          match_score: r.matchScore,
          matched_skills: r.matchedSkills,
          missing_skills: r.missingSkills,
          qualification_compatibility: r.qualificationCompatibility,
          experience_compatibility: r.experienceCompatibility,
          match_explanation: r.matchExplanation,
          updated_at: new Date().toISOString(),
        }));

      if (recPayloads.length > 0) {
        await supabaseAdmin
          .from("student_job_recommendations")
          .upsert(recPayloads, { onConflict: "firebase_uid,job_id" });
      }

      // Log sync outcome to job_sync_logs
      await supabaseAdmin.from("job_sync_logs").insert({
        provider: "adzuna",
        sync_started_at: syncStartedAt,
        sync_completed_at: new Date().toISOString(),
        jobs_fetched: rawJobs.length,
        jobs_inserted: jobsInserted,
        jobs_updated: jobsUpdated,
        jobs_failed: jobsFailed,
        status: adzunaErr ? "partial_fallback" : "completed",
        error_message: adzunaErr || null,
      });
    } catch (syncLogErr) {
      console.warn("[JobRecService] Recommendations / Sync log database notice:", syncLogErr);
    }
  }

  // Map to client view
  const finalViewList: StudentJobRecommendationView[] = ranked.map((r) => ({
    id: r.job.id || r.job.providerJobId,
    provider: r.job.provider,
    providerJobId: r.job.providerJobId,
    title: r.job.title,
    company: r.job.company,
    location: r.job.location,
    description: r.job.description,
    descriptionSummary: r.job.descriptionSummary,
    salaryMin: r.job.salaryMin,
    salaryMax: r.job.salaryMax,
    salaryIsPredicted: r.job.salaryIsPredicted,
    contractType: r.job.contractType,
    experienceLevel: r.job.experienceLevel,
    category: r.job.category,
    requiredSkills: r.job.requiredSkills,
    responsibilities: r.job.responsibilities,
    qualifications: r.job.qualifications,
    applicationUrl: r.job.applicationUrl,
    postedAt: r.job.postedAt,
    matchScore: r.matchScore,
    matchedSkills: r.matchedSkills,
    missingSkills: r.missingSkills,
    qualificationCompatibility: r.qualificationCompatibility,
    experienceCompatibility: r.experienceCompatibility,
    matchExplanation: r.matchExplanation,
    isBookmarked: false,
  }));

  // Dual-layer storage persistence fallback
  if (supabaseAdmin) {
    try {
      const snapshotBuffer = Buffer.from(
        JSON.stringify(
          {
            recommendations: finalViewList,
            lastUpdated: new Date().toISOString(),
            source: adzunaSource,
          },
          null,
          2
        ),
        "utf8"
      );
      await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .upload(`${firebaseUid}/job_recommendations_snapshot.json`, snapshotBuffer, {
          contentType: "application/json",
          upsert: true,
        });
    } catch {}
  }

  return {
    recommendations: finalViewList,
    totalAvailable: finalViewList.length,
    cached: false,
    modelUsed: modelName,
    source: adzunaSource,
    lastUpdated: new Date().toISOString(),
  };
}

function mapDatabaseRecordToView(r: any, j: any): StudentJobRecommendationView {
  return {
    id: j.id,
    recommendationId: r.id,
    provider: j.provider,
    providerJobId: j.provider_job_id,
    title: j.title,
    company: j.company,
    location: j.location || "India",
    description: j.description || "",
    descriptionSummary: j.description_summary || j.description?.slice(0, 200) || "",
    salaryMin: j.salary_min ? Number(j.salary_min) : null,
    salaryMax: j.salary_max ? Number(j.salary_max) : null,
    salaryIsPredicted: Boolean(j.salary_is_predicted),
    contractType: j.contract_type || "full_time",
    experienceLevel: j.experience_level || "Entry-Level",
    category: j.category || "Engineering",
    requiredSkills: Array.isArray(j.required_skills) ? j.required_skills : [],
    responsibilities: Array.isArray(j.responsibilities) ? j.responsibilities : [],
    qualifications: Array.isArray(j.qualifications) ? j.qualifications : [],
    applicationUrl: j.application_url,
    postedAt: j.posted_at || j.created_at,
    matchScore: Number(r.match_score),
    matchedSkills: Array.isArray(r.matched_skills) ? r.matched_skills : [],
    missingSkills: Array.isArray(r.missing_skills) ? r.missing_skills : [],
    qualificationCompatibility: r.qualification_compatibility || "Direct Academic Major Alignment",
    experienceCompatibility: r.experience_compatibility || "Early Career Growth Opportunity",
    matchExplanation: r.match_explanation || "",
    isBookmarked: false,
  };
}
