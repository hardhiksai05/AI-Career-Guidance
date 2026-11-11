import crypto from "crypto";
import { getSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase-server";
import { ResumeDocument } from "./resume-service";
import { CareerRecommendation } from "@/lib/recommendations";

export interface RecommendationSnapshot {
  id: string;
  firebase_uid: string;
  resume_id: string | null;
  cv_hash: string;
  cv_filename: string | null;
  recommendation_data: CareerRecommendation[];
  student_summary: any;
  model_name: string;
  generation_version: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const STORAGE_BUCKET = "student-resumes";

// Server-side in-memory concurrency mutex to prevent duplicate simultaneous Gemini calls
const inFlightGenerations = new Map<string, Promise<any>>();

/**
 * Acquires a per-user execution lock for AI generation to prevent duplicate concurrent Gemini requests.
 */
export async function withGenerationLock<T>(
  userUid: string,
  key: string,
  generator: () => Promise<T>
): Promise<T> {
  const lockKey = `${userUid}:${key}`;
  const existing = inFlightGenerations.get(lockKey);
  if (existing) {
    console.log(`[SnapshotService] Awaiting in-flight generation lock for ${lockKey}`);
    return existing as Promise<T>;
  }

  const promise = (async () => {
    try {
      return await generator();
    } finally {
      inFlightGenerations.delete(lockKey);
    }
  })();

  inFlightGenerations.set(lockKey, promise);
  return promise;
}

/**
 * Retrieve the most recent confirmed/verified CV document for a student.
 */
export async function getLatestStudentCv(firebaseUid: string): Promise<ResumeDocument | null> {
  if (!isSupabaseAdminConfigured()) return null;
  const supabaseAdmin = getSupabaseAdminClient();

  const { data, error } = await supabaseAdmin
    .from("resumes")
    .select("*")
    .eq("firebase_uid", firebaseUid)
    .in("upload_status", ["verified", "extracted", "ready"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return null;
  }
  return data as ResumeDocument;
}

/**
 * Computes or retrieves the authoritative SHA-256 hash of a CV's binary file content.
 */
export async function getCvContentHash(resume: ResumeDocument): Promise<string | null> {
  if (!isSupabaseAdminConfigured()) return null;
  const supabaseAdmin = getSupabaseAdminClient();

  // 1. First check if cached extraction has contentHash in metadata
  const extractedStoragePath = `${resume.storage_path}.extracted.json`;
  const { data: cachedBlob } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .download(extractedStoragePath);

  if (cachedBlob) {
    try {
      const cachedJson = JSON.parse(await cachedBlob.text());
      const hash = cachedJson?._preprocessingMetrics?.contentHash;
      if (typeof hash === "string" && hash.length === 64) {
        return hash;
      }
    } catch {
      // Fall through to file hashing
    }
  }

  // 2. Download original binary file from storage and hash directly
  const { data: fileBlob, error: downloadErr } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .download(resume.storage_path);

  if (downloadErr || !fileBlob) {
    console.error("[SnapshotService] Failed to download resume file to compute hash:", downloadErr);
    return null;
  }

  const arrayBuffer = await fileBlob.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);
  return crypto.createHash("sha256").update(fileBuffer).digest("hex");
}

/**
 * Retrieve the active recommendation snapshot for a student.
 * Checks PostgreSQL table first, with graceful Storage fallback.
 */
export async function getActiveRecommendationSnapshot(
  firebaseUid: string
): Promise<RecommendationSnapshot | null> {
  if (!isSupabaseAdminConfigured()) return null;
  const supabaseAdmin = getSupabaseAdminClient();

  try {
    const { data, error } = await supabaseAdmin
      .from("career_recommendation_snapshots")
      .select("*")
      .eq("firebase_uid", firebaseUid)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return data as RecommendationSnapshot;
    }
  } catch (err) {
    console.warn("[SnapshotService] Database table query fallback to storage:", err);
  }

  // Fallback: Check private storage for cached active snapshot
  try {
    const storagePath = `${firebaseUid}/recommendation_snapshot_active.json`;
    const { data: blob } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .download(storagePath);

    if (blob) {
      const parsed = JSON.parse(await blob.text());
      if (parsed && Array.isArray(parsed.recommendation_data)) {
        return parsed as RecommendationSnapshot;
      }
    }
  } catch {
    // Storage fallback not found
  }

  return null;
}

/**
 * Check if a recommendation snapshot already exists for a specific CV hash.
 */
export async function findSnapshotByCvHash(
  firebaseUid: string,
  cvHash: string
): Promise<RecommendationSnapshot | null> {
  if (!isSupabaseAdminConfigured() || !cvHash) return null;
  const supabaseAdmin = getSupabaseAdminClient();

  try {
    const { data, error } = await supabaseAdmin
      .from("career_recommendation_snapshots")
      .select("*")
      .eq("firebase_uid", firebaseUid)
      .eq("cv_hash", cvHash)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return data as RecommendationSnapshot;
    }
  } catch (err) {
    console.warn("[SnapshotService] Hash lookup table fallback to storage:", err);
  }

  // Storage fallback
  try {
    const storagePath = `${firebaseUid}/snapshot_hash_${cvHash}.json`;
    const { data: blob } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .download(storagePath);

    if (blob) {
      const parsed = JSON.parse(await blob.text());
      if (parsed && Array.isArray(parsed.recommendation_data)) {
        return parsed as RecommendationSnapshot;
      }
    }
  } catch {
    // Not found in storage
  }

  return null;
}

/**
 * Reactivate an existing historical snapshot as the student's active recommendation set.
 */
export async function reactivateSnapshot(
  snapshotId: string,
  firebaseUid: string
): Promise<void> {
  if (!isSupabaseAdminConfigured()) return;
  const supabaseAdmin = getSupabaseAdminClient();

  try {
    // Deactivate others
    await supabaseAdmin
      .from("career_recommendation_snapshots")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("firebase_uid", firebaseUid);

    // Activate target
    await supabaseAdmin
      .from("career_recommendation_snapshots")
      .update({ is_active: true, updated_at: new Date().toISOString() })
      .eq("id", snapshotId)
      .eq("firebase_uid", firebaseUid);
  } catch (err) {
    console.warn("[SnapshotService] Failed to reactivate snapshot in DB:", err);
  }
}

/**
 * Persist a newly generated recommendation snapshot to Supabase with dual-layer fallback.
 */
export async function saveRecommendationSnapshot(params: {
  firebaseUid: string;
  resumeId: string | null;
  cvHash: string;
  cvFilename: string | null;
  recommendations: CareerRecommendation[];
  studentSummary: any;
  modelName?: string;
  version?: number;
}): Promise<RecommendationSnapshot> {
  const {
    firebaseUid,
    resumeId,
    cvHash,
    cvFilename,
    recommendations,
    studentSummary,
    modelName = "gemini-3.1-flash-lite",
    version = 1,
  } = params;

  const now = new Date().toISOString();
  const snapshot: RecommendationSnapshot = {
    id: crypto.randomUUID(),
    firebase_uid: firebaseUid,
    resume_id: resumeId,
    cv_hash: cvHash,
    cv_filename: cvFilename,
    recommendation_data: recommendations,
    student_summary: studentSummary,
    model_name: modelName,
    generation_version: version,
    is_active: true,
    created_at: now,
    updated_at: now,
  };

  if (!isSupabaseAdminConfigured()) {
    return snapshot;
  }

  const supabaseAdmin = getSupabaseAdminClient();

  // 1. Deactivate existing active snapshots in database
  try {
    await supabaseAdmin
      .from("career_recommendation_snapshots")
      .update({ is_active: false, updated_at: now })
      .eq("firebase_uid", firebaseUid)
      .eq("is_active", true);

    // 2. Insert new active snapshot
    const { data, error } = await supabaseAdmin
      .from("career_recommendation_snapshots")
      .insert({
        id: snapshot.id,
        firebase_uid: firebaseUid,
        resume_id: resumeId,
        cv_hash: cvHash,
        cv_filename: cvFilename,
        recommendation_data: recommendations,
        student_summary: studentSummary,
        model_name: modelName,
        generation_version: version,
        is_active: true,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (!error && data) {
      snapshot.id = data.id;
    }
  } catch (dbErr) {
    console.warn("[SnapshotService] Database insert warning (proceeding with storage fallback):", dbErr);
  }

  // 3. Dual-layer storage persistence in private bucket
  try {
    const snapshotBuffer = Buffer.from(JSON.stringify(snapshot, null, 2), "utf8");

    // Save as active snapshot
    await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(`${firebaseUid}/recommendation_snapshot_active.json`, snapshotBuffer, {
        contentType: "application/json",
        upsert: true,
      });

    // Save as hash-indexed version for instant CV re-upload cache hit
    if (cvHash) {
      await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .upload(`${firebaseUid}/snapshot_hash_${cvHash}.json`, snapshotBuffer, {
          contentType: "application/json",
          upsert: true,
        });
    }
  } catch (storageErr) {
    console.warn("[SnapshotService] Storage persistence warning:", storageErr);
  }

  return snapshot;
}
