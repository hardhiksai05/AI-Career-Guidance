import crypto from "crypto";
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
  profileVersion?: string;
  inventoryVersion?: number;
  isBookmarked?: boolean;
}

const STORAGE_BUCKET = "student-resumes";
const SYNC_COOLDOWN_MS = 25 * 60 * 1000; // 25 minutes strict shared cooldown
const MAX_RECOMMENDED_JOBS = 20; // Hard limit: max 20 jobs
const MAX_AI_JOBS_PER_SYNC = 8; // Max 8 jobs parsed with Gemini per sync to stay within 15 RPM

// In-memory concurrency mutex to coordinate requests across threads in the Node.js process
let isProcessSyncRunning = false;
let processSyncStartedAt = 0;

/**
 * Computes a deterministic SHA-256 fingerprint for a student's relevant profile fields.
 * Any change to degree, branch, university, skills, projects, locations, or experience
 * alters this fingerprint, immediately triggering recommendation recalculation.
 * Changes to unrelated fields (profile picture, phone, bio) do NOT alter this fingerprint.
 */
export function calculateStudentProfileFingerprint(candidate: CandidateProfileContext): string {
  const normalized = {
    degree: (candidate.degree || "").trim().toLowerCase(),
    branch: (candidate.branch || "").trim().toLowerCase(),
    university: (candidate.university || "").trim().toLowerCase(),
    skills: Array.from(new Set((candidate.skills || []).map((s) => s.trim().toLowerCase()))).sort(),
    projects: (candidate.projects || []).map((p) => p.trim().toLowerCase()).sort(),
    locations: (candidate.preferredLocations || []).map((l) => l.trim().toLowerCase()).sort(),
    experience: (candidate.experienceLevel || "").trim().toLowerCase(),
  };

  return crypto
    .createHash("sha256")
    .update(JSON.stringify(normalized))
    .digest("hex")
    .slice(0, 16);
}

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
    let cvProjects: string[] = [];
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
          if (Array.isArray(parsed?.projects)) {
            cvProjects = parsed.projects.map((p: any) => typeof p === "string" ? p : p.name || p.title || "").filter(Boolean);
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
      projects: cvProjects.length > 0 ? cvProjects : defaultContext.projects,
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
 * Obtains an atomic synchronization lock across concurrent backend requests.
 * Tier A: PostgreSQL RPC acquire_job_sync_lock() (atomic FOR UPDATE row lock)
 * Tier B: Supabase job_sync_logs lease + process-level mutex
 */
async function acquireSharedInventoryLock(): Promise<{
  acquired: boolean;
  inventoryVersion: number;
  lastSyncedAt: string;
  isExpired: boolean;
}> {
  const now = Date.now();
  const supabaseAdmin = isSupabaseAdminConfigured() ? getSupabaseAdminClient() : null;

  if (!supabaseAdmin) {
    const expired = now - processSyncStartedAt > SYNC_COOLDOWN_MS;
    if (expired && !isProcessSyncRunning) {
      isProcessSyncRunning = true;
      processSyncStartedAt = now;
      return { acquired: true, inventoryVersion: 1, lastSyncedAt: new Date(processSyncStartedAt).toISOString(), isExpired: true };
    }
    return { acquired: false, inventoryVersion: 1, lastSyncedAt: new Date(processSyncStartedAt).toISOString(), isExpired: false };
  }

  // 1. Try Tier A: PostgreSQL RPC atomic lock
  try {
    const { data: rpcResult, error: rpcErr } = await supabaseAdmin.rpc("acquire_job_sync_lock", {
      cooldown_seconds: 1500, // 25 minutes
      lock_timeout_seconds: 180, // 3 minutes timeout
    });

    if (!rpcErr && rpcResult && typeof rpcResult === "object") {
      return {
        acquired: Boolean(rpcResult.acquired),
        inventoryVersion: Number(rpcResult.inventory_version) || 1,
        lastSyncedAt: rpcResult.last_synced_at || new Date().toISOString(),
        isExpired: Boolean(rpcResult.is_expired),
      };
    }
  } catch {
    // RPC not yet deployed or table not present, proceed to Tier B
  }

  // 2. Tier B: Atomic log-based lease check
  try {
    const { data: latestLogs } = await supabaseAdmin
      .from("job_sync_logs")
      .select("id, status, sync_started_at, sync_completed_at, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    const latest = latestLogs?.[0];
    const latestCompleted = latestLogs?.find((l) => l.status === "completed" && l.sync_completed_at);

    const lastCompletedAt = latestCompleted?.sync_completed_at
      ? new Date(latestCompleted.sync_completed_at).getTime()
      : 0;

    const isExpired = now - lastCompletedAt >= SYNC_COOLDOWN_MS;

    // Check if an in_progress sync is currently running within the last 3.5 minutes
    const isDbSyncRunning = latest?.status === "in_progress" && now - new Date(latest.sync_started_at).getTime() < 3.5 * 60 * 1000;
    const isLocalRunning = isProcessSyncRunning && now - processSyncStartedAt < 3.5 * 60 * 1000;

    if (!isExpired || isDbSyncRunning || isLocalRunning) {
      // Cooldown is active or another process holds the sync lease
      const derivedVersion = latestLogs?.filter((l) => l.status === "completed").length || 1;
      return {
        acquired: false,
        inventoryVersion: Math.max(1, derivedVersion),
        lastSyncedAt: latestCompleted?.sync_completed_at || new Date().toISOString(),
        isExpired,
      };
    }

    // Acquire lease: mark local mutex and record in-progress log
    isProcessSyncRunning = true;
    processSyncStartedAt = now;

    await supabaseAdmin.from("job_sync_logs").insert({
      provider: "adzuna",
      sync_started_at: new Date(now).toISOString(),
      jobs_fetched: 0,
      status: "in_progress",
    });

    const derivedVersion = (latestLogs?.filter((l) => l.status === "completed").length || 0) + 1;
    return {
      acquired: true,
      inventoryVersion: derivedVersion,
      lastSyncedAt: latestCompleted?.sync_completed_at || new Date(now).toISOString(),
      isExpired: true,
    };
  } catch (err) {
    console.warn("[JobRecService] Lease check warning:", err);
    return { acquired: false, inventoryVersion: 1, lastSyncedAt: new Date().toISOString(), isExpired: false };
  }
}

/**
 * Releases the atomic synchronization lock.
 */
async function releaseSharedInventoryLock(
  newVersion: number,
  totalJobs: number,
  wasSuccess: boolean
): Promise<void> {
  isProcessSyncRunning = false;
  const supabaseAdmin = isSupabaseAdminConfigured() ? getSupabaseAdminClient() : null;
  if (!supabaseAdmin) return;

  // 1. Try Tier A: Release RPC
  try {
    await supabaseAdmin.rpc("release_job_sync_lock", {
      new_inventory_version: newVersion,
      new_total_jobs: totalJobs,
      was_success: wasSuccess,
    });
  } catch {}
}

/**
 * Synchronizes the shared job inventory from Adzuna API.
 * Follows Safe Database Replacement:
 * 1. Fetches from Adzuna API.
 * 2. Validates API response.
 * 3. Normalizes and extracts structured details (capped AI + deterministic heuristics).
 * 4. Upserts fresh jobs into 'jobs' with is_active = true and new inventory_version.
 * 5. Soft-deactivates obsolete jobs (is_active = false) to preserve saved bookmarks and FKs.
 * 6. Never deletes records if Adzuna fails, preserves previous valid inventory.
 */
export async function syncSharedJobInventory(
  targetVersion: number = 1
): Promise<{ success: boolean; jobsCount: number; version: number; error?: string }> {
  const syncStartedAtIso = new Date().toISOString();
  const supabaseAdmin = isSupabaseAdminConfigured() ? getSupabaseAdminClient() : null;

  try {
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

    if (!rawJobs || rawJobs.length === 0) {
      throw new Error(adzunaErr || "No jobs returned from Adzuna API");
    }

    // Deduplicate fetched jobs by normalized key (provider + providerJobId)
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
    let jobsFailed = 0;
    const activeProviderJobIds = new Set<string>();

    for (const rawJob of uniqueRawJobs) {
      try {
        let details: ProcessedJobDetails | null = null;
        let isExistingInDb = false;
        activeProviderJobIds.add(rawJob.providerJobId);

        // Check if job is already in Supabase with matching content_hash
        if (supabaseAdmin) {
          const { data: existing } = await supabaseAdmin
            .from("jobs")
            .select("*")
            .eq("provider", rawJob.provider)
            .eq("provider_job_id", rawJob.providerJobId)
            .maybeSingle();

          if (existing) {
            isExistingInDb = true;
            if (existing.content_hash === rawJob.contentHash && existing.required_skills?.length > 0) {
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
              raw_provider_data: {
                ...(rawJob.rawProviderData || {}),
                inventoryVersion: targetVersion,
              },
              updated_at: new Date().toISOString(),
            },
            { onConflict: "provider,provider_job_id" }
          );

          if (!upsertErr) {
            if (isExistingInDb) {
              jobsUpdated++;
            } else {
              jobsInserted++;
            }
          } else {
            console.error(`[JobRecService] Failed to upsert job ${rawJob.providerJobId}:`, upsertErr);
            jobsFailed++;
          }
        }
      } catch (jobErr) {
        console.warn(`[JobRecService] Job processing note for ${rawJob.providerJobId}:`, jobErr);
        jobsFailed++;
      }
    }

    // Safe Soft-Deactivation: Mark older jobs not in the current batch as inactive
    // Crucial: We NEVER hard delete jobs to ensure student bookmarks & applied records never break!
    if (supabaseAdmin && activeProviderJobIds.size > 0) {
      try {
        const { data: oldJobs } = await supabaseAdmin
          .from("jobs")
          .select("id, provider_job_id, created_at")
          .eq("is_active", true);

        if (Array.isArray(oldJobs)) {
          const obsoleteIds = oldJobs
            .filter((j) => !activeProviderJobIds.has(j.provider_job_id))
            .map((j) => j.id);

          if (obsoleteIds.length > 0) {
            await supabaseAdmin
              .from("jobs")
              .update({ is_active: false, updated_at: new Date().toISOString() })
              .in("id", obsoleteIds);
          }
        }
      } catch (deactErr) {
        console.warn("[JobRecService] Soft-deactivation note:", deactErr);
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
          jobs_failed: jobsFailed,
          status: "completed",
        });
      } catch {}
    }

    await releaseSharedInventoryLock(targetVersion, uniqueRawJobs.length, true);
    return { success: true, jobsCount: uniqueRawJobs.length, version: targetVersion };
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
    await releaseSharedInventoryLock(targetVersion, 0, false);
    return { success: false, jobsCount: 0, version: targetVersion, error: syncErr?.message };
  }
}

/**
 * Recalculates personalized job recommendations for a specific student
 * using the existing shared inventory in Supabase without calling Adzuna.
 * Called immediately when student changes skills, education, or preferences.
 */
export async function recalculateStudentJobRecommendations(
  firebaseUid: string
): Promise<{ recommendations: StudentJobRecommendationView[]; version: number; profileVersion: string }> {
  const modelName = getJobProcessingModelName();
  const candidate = await getCandidateContext(firebaseUid);
  const profileFingerprint = calculateStudentProfileFingerprint(candidate);
  const supabaseAdmin = isSupabaseAdminConfigured() ? getSupabaseAdminClient() : null;

  // 1. Fetch active shared inventory from Supabase
  let activeJobs: any[] = [];
  let currentInventoryVersion = 1;

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
        currentInventoryVersion = dbJobs[0]?.raw_provider_data?.inventoryVersion || 1;
      }
    } catch (err) {
      console.warn("[JobRecService] DB jobs fetch note:", err);
    }
  }

  // Fallback to deterministic jobs if DB is completely unpopulated
  if (activeJobs.length === 0) {
    const fallbackSync = await syncSharedJobInventory(1);
    if (fallbackSync.success && supabaseAdmin) {
      const { data: freshJobs } = await supabaseAdmin.from("jobs").select("*").eq("is_active", true).limit(60);
      if (freshJobs) activeJobs = freshJobs;
    }
  }

  // 2. Format jobs for deterministic matching engine
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

  // 3. Run Deterministic Matching Engine
  const ranked = rankAndFilterJobs(formattedForMatching, candidate, MAX_RECOMMENDED_JOBS);

  // 4. Map to view list
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
    matchExplanation: `${r.matchExplanation} | [v:${currentInventoryVersion}:fp:${profileFingerprint}]`,
    profileVersion: profileFingerprint,
    inventoryVersion: currentInventoryVersion,
    isBookmarked: false,
  }));

  // 5. Save updated recommendations to Supabase
  if (supabaseAdmin && finalViewList.length > 0) {
    try {
      const recPayloads = ranked
        .filter((r) => r.job.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(r.job.id))
        .slice(0, MAX_RECOMMENDED_JOBS)
        .map((r) => ({
          firebase_uid: firebaseUid,
          job_id: r.job.id!,
          match_score: r.matchScore,
          matched_skills: r.matchedSkills,
          missing_skills: r.missingSkills,
          qualification_compatibility: r.qualificationCompatibility,
          experience_compatibility: r.experienceCompatibility,
          match_explanation: `${r.matchExplanation} | [v:${currentInventoryVersion}:fp:${profileFingerprint}]`,
          updated_at: new Date().toISOString(),
        }));

      if (recPayloads.length > 0) {
        await supabaseAdmin
          .from("student_job_recommendations")
          .upsert(recPayloads, { onConflict: "firebase_uid,job_id" });
      }
    } catch (saveErr) {
      console.warn("[JobRecService] Recommendations save note:", saveErr);
    }
  }

  return {
    recommendations: finalViewList,
    version: currentInventoryVersion,
    profileVersion: profileFingerprint,
  };
}

/**
 * Retrieves student job recommendations capped strictly at MAX_RECOMMENDED_JOBS (20 jobs).
 * Follows the Page-Visit Trigger & 25-minute shared inventory lifecycle:
 * 1. Checks 25-minute shared inventory expiration.
 * 2. If expired, acquires atomic lock and performs Adzuna refresh.
 * 3. Retrieves student profile and computes current profile fingerprint.
 * 4. Compares profile fingerprint & inventory version with stored recommendations.
 * 5. Reuses valid recommendations if both versions match (0 recalculation).
 * 6. Recalculates immediately if either version differs.
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
  inventoryVersion: number;
  profileVersion: string;
}> {
  const modelName = getJobProcessingModelName();
  const candidate = await getCandidateContext(firebaseUid);
  const currentProfileFingerprint = calculateStudentProfileFingerprint(candidate);
  const supabaseAdmin = isSupabaseAdminConfigured() ? getSupabaseAdminClient() : null;

  // 1. Check shared inventory lock & expiration state
  const lockState = await acquireSharedInventoryLock();
  let currentInventoryVersion = lockState.inventoryVersion;

  if (options?.forceSync || (lockState.isExpired && lockState.acquired)) {
    console.log(`[JobRecService] Cache expired or forceSync requested. Executing Adzuna refresh...`);
    const nextVersion = lockState.inventoryVersion + 1;
    const syncRes = await syncSharedJobInventory(nextVersion);
    if (syncRes.success) {
      currentInventoryVersion = nextVersion;
    }
  } else if (lockState.isExpired && !lockState.acquired) {
    console.log(`[JobRecService] Cache expired but sync is already in progress by another request. Serving existing inventory.`);
  }

  // 2. Recommendation Verification: Check if student already has valid recommendations for current versions
  if (supabaseAdmin && !options?.forceSync) {
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
          updated_at,
          jobs (*)
        `)
        .eq("firebase_uid", firebaseUid)
        .order("match_score", { ascending: false })
        .limit(MAX_RECOMMENDED_JOBS);

      if (!error && Array.isArray(storedRecs) && storedRecs.length >= 10) {
        // Inspect version tags embedded in match_explanation or stored columns
        const sampleExplanation = storedRecs[0]?.match_explanation || "";
        const versionMatch = sampleExplanation.match(/\[v:(\d+):fp:([a-f0-9]+)\]/);

        const storedInventoryVersion = versionMatch ? parseInt(versionMatch[1], 10) : null;
        const storedProfileFingerprint = versionMatch ? versionMatch[2] : null;

        // Check whether both inventory version and profile fingerprint are identical to current values
        const isInventoryCurrent = storedInventoryVersion === null || storedInventoryVersion === currentInventoryVersion;
        const isProfileCurrent = storedProfileFingerprint === null || storedProfileFingerprint === currentProfileFingerprint;

        if (isInventoryCurrent && isProfileCurrent) {
          const mapped = storedRecs
            .filter((r) => r.jobs && (r.jobs as any).is_active)
            .map((r) => mapDatabaseRecordToView(r, r.jobs as any, currentProfileFingerprint, currentInventoryVersion))
            .slice(0, MAX_RECOMMENDED_JOBS);

          if (mapped.length > 0) {
            return {
              recommendations: mapped,
              totalAvailable: mapped.length,
              cached: true,
              modelUsed: modelName,
              source: "supabase_cache_hit",
              lastUpdated: storedRecs[0].updated_at || storedRecs[0].created_at,
              inventoryVersion: currentInventoryVersion,
              profileVersion: currentProfileFingerprint,
            };
          }
        }
      }
    } catch (dbErr) {
      console.warn("[JobRecService] Stored recommendations query fallback:", dbErr);
    }
  }

  // 3. Version mismatch or fresh sync: Recalculate personalized recommendations
  const recalcResult = await recalculateStudentJobRecommendations(firebaseUid);

  return {
    recommendations: recalcResult.recommendations,
    totalAvailable: recalcResult.recommendations.length,
    cached: false,
    modelUsed: modelName,
    source: "personalized_recalculated",
    lastUpdated: lockState.lastSyncedAt || new Date().toISOString(),
    inventoryVersion: recalcResult.version,
    profileVersion: recalcResult.profileVersion,
  };
}

function mapDatabaseRecordToView(
  r: any,
  j: any,
  profileVersion: string,
  inventoryVersion: number
): StudentJobRecommendationView {
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
    experienceCompatibility: r.experience_compatibility || "Strong Qualification Fit",
    matchExplanation: r.match_explanation?.replace(/\s*\|?\s*\[v:\d+:fp:[a-f0-9]+\]/, "") || "High-compatibility match based on verified skills and coursework.",
    profileVersion,
    inventoryVersion,
    isBookmarked: false,
  };
}
