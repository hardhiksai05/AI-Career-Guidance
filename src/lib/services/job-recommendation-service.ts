import { getSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase-server";
import { fetchAdzunaJobs, RawJobListing } from "./adzuna-service";
import {
  processJobDescriptionWithGemini,
  extractJobDetailsDeterministically,
  ProcessedJobDetails,
  getJobProcessingModelName,
} from "./gemini-job-processor";
import {
  calculateJobMatch,
  rankAndFilterJobs,
  CandidateProfileContext,
  JobMatchResult,
} from "./job-matching-engine";
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
const SYNC_COOLDOWN_MS = 25 * 60 * 1000; // 25 minutes strict shared cooldown
const MAX_RECOMMENDED_JOBS = 20; // Hard limit: max 20 jobs
const MAX_AI_JOBS_PER_SYNC = 8; // Max 8 jobs parsed with Gemini per sync to stay within 15 RPM

// In-memory concurrency guard to prevent simultaneous sync executions across requests
let isGlobalSyncInProgress = false;
let globalSyncStartedAt = 0;

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
      const extractedPath = `${latestCv.storage_path}.extracted.json`;
      const { data: blob } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .download(extractedPath);

      if (blob) {
        try {
          const parsed = JSON.parse(await blob.text());
          if (Array.isArray(parsed?.technicalSkills)) {
            cvSkills = parsed.technicalSkills;
          }
        } catch {}
      }
    }

    const mergedSkills = Array.from(
      new Set([
        ...(prefs?.target_skills || []),
        ...cvSkills,
        ...(defaultContext.skills || []),
      ])
    ).filter(Boolean);

    return {
      fullName: profile?.full_name || defaultContext.fullName,
      degree: profile?.degree || defaultContext.degree,
      branch: profile?.branch || defaultContext.branch,
      university: profile?.university || defaultContext.university,
      skills: mergedSkills.length > 0 ? mergedSkills : defaultContext.skills,
      projects: [],
      preferredLocations: prefs?.preferred_locations?.length
        ? prefs.preferred_locations
        : defaultContext.preferredLocations,
      experienceLevel: prefs?.experience_level || defaultContext.experienceLevel,
    };
  } catch (err) {
    console.warn("[JobRecService] getCandidateContext fallback:", err);
    return defaultContext;
  }
}

/**
 * Checks if the shared job synchronization cooldown is currently active.
 */
async function isSyncCooldownActive(): Promise<{ active: boolean; lastSyncCompletedAt: string | null }> {
  // 1. In-memory guard
  const now = Date.now();
  if (isGlobalSyncInProgress && now - globalSyncStartedAt < 5 * 60 * 1000) {
    return { active: true, lastSyncCompletedAt: new Date(globalSyncStartedAt).toISOString() };
  }

  // 2. Database log check
  if (!isSupabaseAdminConfigured()) {
    return { active: false, lastSyncCompletedAt: null };
  }

  try {
    const supabaseAdmin = getSupabaseAdminClient();
    const { data: latestLog, error } = await supabaseAdmin
      .from("job_sync_logs")
      .select("sync_started_at, sync_completed_at, status")
      .order("sync_started_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && latestLog) {
      // If a sync was started within the last 4 minutes and is still in progress
      if (
        latestLog.status === "in_progress" &&
        now - new Date(latestLog.sync_started_at).getTime() < 4 * 60 * 1000
      ) {
        return { active: true, lastSyncCompletedAt: latestLog.sync_started_at };
      }

      // If a completed sync finished less than 25 minutes ago
      if (latestLog.sync_completed_at) {
        const timeSinceSync = now - new Date(latestLog.sync_completed_at).getTime();
        if (timeSinceSync < SYNC_COOLDOWN_MS) {
          return { active: true, lastSyncCompletedAt: latestLog.sync_completed_at };
        }
      }
    }
  } catch (err) {
    console.warn("[JobRecService] Cooldown check warning:", err);
  }

  return { active: false, lastSyncCompletedAt: null };
}

/**
 * Synchronizes the shared job inventory from Adzuna API, deduplicating and processing
 * with gemini-3.1-flash-lite (capped at MAX_AI_JOBS_PER_SYNC to prevent rate limits).
 */
async function syncSharedJobInventory(): Promise<{ success: boolean; jobsCount: number; error?: string }> {
  if (isGlobalSyncInProgress) {
    return { success: false, jobsCount: 0, error: "Sync already running" };
  }

  isGlobalSyncInProgress = true;
  globalSyncStartedAt = Date.now();
  const syncStartedAtIso = new Date().toISOString();

  const supabaseAdmin = isSupabaseAdminConfigured() ? getSupabaseAdminClient() : null;

  try {
    // Record in-progress sync log in database
    if (supabaseAdmin) {
      try {
        await supabaseAdmin.from("job_sync_logs").insert({
          provider: "adzuna",
          sync_started_at: syncStartedAtIso,
          jobs_fetched: 0,
          status: "in_progress",
        });
      } catch {}
    }

    // High-yield engineering & tech search queries
    const searchQueries = [
      "Software Engineer Graduate",
      "Full Stack Developer",
      "Data Scientist AI",
      "Cloud DevOps Engineer",
    ];

    const { jobs: rawJobs, error: adzunaErr } = await fetchAdzunaJobs(
      searchQueries,
      ["India"],
      40
    );

    if (rawJobs.length === 0) {
      throw new Error(adzunaErr || "No jobs returned from Adzuna API");
    }

    // Deduplicate fetched jobs by normalized key (company + title + url)
    const seenKeys = new Set<string>();
    const uniqueRawJobs: RawJobListing[] = [];

    for (const job of rawJobs) {
      const key = `${job.provider}_${job.providerJobId}_${job.title.toLowerCase().trim()}_${job.company.toLowerCase().trim()}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        uniqueRawJobs.push(job);
      }
    }

    let aiProcessedCount = 0;
    let jobsInserted = 0;
    let jobsUpdated = 0;

    for (const rawJob of uniqueRawJobs) {
      try {
        let details: ProcessedJobDetails | null = null;

        // Check if job is already in Supabase with matching content_hash
        if (supabaseAdmin) {
          const { data: existing } = await supabaseAdmin
            .from("jobs")
            .select("*")
            .eq("provider", rawJob.provider)
            .eq("provider_job_id", rawJob.providerJobId)
            .maybeSingle();

          if (existing && existing.content_hash === rawJob.contentHash && existing.required_skills?.length > 0) {
            // CACHE HIT: 0 AI calls
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
        }

        // If not cached, process with Gemini 3.1 Flash-Lite (capped at MAX_AI_JOBS_PER_SYNC)
        if (!details) {
          if (aiProcessedCount < MAX_AI_JOBS_PER_SYNC) {
            details = await processJobDescriptionWithGemini(rawJob);
            aiProcessedCount++;
          } else {
            // Instantaneous deterministic extraction for remaining batch to stay safely under 15 RPM
            details = extractJobDetailsDeterministically(rawJob);
          }
        }

        // Upsert into Supabase 'jobs' table
        if (supabaseAdmin) {
          const { error: upsertErr } = await supabaseAdmin.from("jobs").upsert(
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
              content_hash: rawJob.contentHash,
              is_active: true,
              raw_metadata: rawJob.rawProviderData || {},
              updated_at: new Date().toISOString(),
            },
            { onConflict: "provider,provider_job_id" }
          );

          if (!upsertErr) {
            jobsInserted++;
          } else {
            jobsUpdated++;
          }
        }
      } catch (jobErr) {
        console.warn(`[JobRecService] Job processing note for ${rawJob.providerJobId}:`, jobErr);
      }
    }

    // Log completion in job_sync_logs
    if (supabaseAdmin) {
      try {
        await supabaseAdmin.from("job_sync_logs").insert({
          provider: "adzuna",
          sync_started_at: syncStartedAtIso,
          sync_completed_at: new Date().toISOString(),
          jobs_fetched: uniqueRawJobs.length,
          jobs_inserted: jobsInserted,
          jobs_updated: jobsUpdated,
          status: "completed",
        });
      } catch {}
    }

    return { success: true, jobsCount: uniqueRawJobs.length };
  } catch (syncErr: any) {
    console.error("[JobRecService] Background synchronization failed:", syncErr);
    if (supabaseAdmin) {
      try {
        await supabaseAdmin.from("job_sync_logs").insert({
          provider: "adzuna",
          sync_started_at: syncStartedAtIso,
          sync_completed_at: new Date().toISOString(),
          status: "failed",
          error_message: syncErr?.message || "Sync error",
        });
      } catch {}
    }
    return { success: false, jobsCount: 0, error: syncErr?.message };
  } finally {
    isGlobalSyncInProgress = false;
  }
}

/**
 * Retrieves student job recommendations capped strictly at MAX_RECOMMENDED_JOBS (15–20 jobs).
 * Enforces the 25-minute shared cooldown across all users.
 */
export async function getStudentJobRecommendations(
  firebaseUid: string,
  options?: { forceSync?: boolean }
): Promise<{
  recommendations: StudentJobRecommendationView[];
  totalAvailable: number;
  cached: boolean;
  modelUsed: string;
  source: string;
  lastUpdated: string;
}> {
  const modelName = getJobProcessingModelName();
  const candidate = await getCandidateContext(firebaseUid);
  const supabaseAdmin = isSupabaseAdminConfigured() ? getSupabaseAdminClient() : null;

  // 1. Check if student already has saved recommendations in Supabase
  if (supabaseAdmin) {
    try {
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
        .limit(MAX_RECOMMENDED_JOBS);

      if (!error && Array.isArray(storedRecs) && storedRecs.length >= 10) {
        const mapped = storedRecs
          .filter((r) => r.jobs && (r.jobs as any).is_active)
          .map((r) => mapDatabaseRecordToView(r, r.jobs as any))
          .slice(0, MAX_RECOMMENDED_JOBS);

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
  }

  // 2. Check 25-minute shared cooldown
  const cooldown = await isSyncCooldownActive();

  // If forceSync is requested or cooldown is NOT active, run a single shared sync
  if (options?.forceSync || !cooldown.active) {
    await syncSharedJobInventory();
  }

  // 3. Load active jobs from the shared Supabase inventory and rank deterministically
  let activeJobs: any[] = [];

  if (supabaseAdmin) {
    try {
      const { data: dbJobs } = await supabaseAdmin
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(60);

      if (Array.isArray(dbJobs) && dbJobs.length > 0) {
        activeJobs = dbJobs;
      }
    } catch (err) {
      console.warn("[JobRecService] DB jobs fetch fallback:", err);
    }
  }

  // 3b. Robust Fallback: If DB table is empty or unmigrated, fetch directly from Adzuna / curated feed
  if (activeJobs.length === 0) {
    try {
      const searchQueries = [
        "Software Engineer",
        "Full Stack Developer",
        "Data Scientist AI",
        "Cloud DevOps Engineer",
      ];
      const { jobs: fallbackRawJobs } = await fetchAdzunaJobs(searchQueries, ["India"], 30);
      if (fallbackRawJobs && fallbackRawJobs.length > 0) {
        activeJobs = fallbackRawJobs.map((raw) => {
          const details = extractJobDetailsDeterministically(raw);
          return {
            id: raw.providerJobId,
            provider: raw.provider,
            provider_job_id: raw.providerJobId,
            title: raw.title,
            company: raw.company,
            location: raw.location,
            description: raw.description,
            description_summary: details.descriptionSummary,
            salary_min: raw.salaryMin,
            salary_max: raw.salaryMax,
            salary_is_predicted: raw.salaryIsPredicted,
            contract_type: raw.contractType,
            experience_level: details.experienceLevel,
            category: raw.category,
            required_skills: details.requiredSkills,
            responsibilities: details.responsibilities,
            qualifications: details.qualifications,
            application_url: raw.applicationUrl,
            posted_at: raw.postedAt,
            content_hash: raw.contentHash,
            is_active: true,
          };
        });
      }
    } catch (fallbackErr) {
      console.warn("[JobRecService] Fallback job feed notice:", fallbackErr);
    }
  }

  // 4. Map DB jobs into deterministic ranking format
  const formattedForMatching = activeJobs.map((j) => ({
    id: j.id,
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
    contentHash: j.content_hash || "",
    usedAi: false,
  }));

  // Run Deterministic TypeScript Matching Engine capped strictly at MAX_RECOMMENDED_JOBS (20)
  const ranked = rankAndFilterJobs(formattedForMatching, candidate, MAX_RECOMMENDED_JOBS);

  // Map to student view
  const finalViewList: StudentJobRecommendationView[] = ranked.slice(0, MAX_RECOMMENDED_JOBS).map((r) => ({
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

  // Save to student_job_recommendations in Supabase
  if (supabaseAdmin && finalViewList.length > 0) {
    try {
      const recPayloads = ranked
        .filter((r) => r.job.id)
        .slice(0, MAX_RECOMMENDED_JOBS)
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
    } catch {}
  }

  return {
    recommendations: finalViewList,
    totalAvailable: finalViewList.length,
    cached: cooldown.active,
    modelUsed: modelName,
    source: cooldown.active ? "supabase_cache" : "adzuna_shared_sync",
    lastUpdated: cooldown.lastSyncCompletedAt || new Date().toISOString(),
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
