import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export interface ResumeDocument {
  id: string;
  firebase_uid: string;
  original_filename: string;
  storage_path: string;
  file_type: string;
  file_size: number;
  upload_status: string;
  created_at: string;
  updated_at: string;
}

const BUCKET_NAME = "student-resumes";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * Uploads a resume document into private Supabase Storage and records metadata in PostgreSQL.
 */
export async function uploadResume(
  file: File,
  firebaseUid: string
): Promise<ResumeDocument> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Please supply NEXT_PUBLIC_SUPABASE_* variables.");
  }

  // 1. Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 10 MB limit.`);
  }

  // 2. Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error("Unsupported file format. Please upload a PDF, DOC, or DOCX document.");
  }

  const supabase = getSupabaseClient();

  // 3. Generate sanitized unique storage path: {firebase_uid}/{timestamp}_{safe_filename}
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const uniqueStoragePath = `${firebaseUid}/${Date.now()}_${sanitizedName}`;

  // 4. Upload file into private bucket
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(uniqueStoragePath, file, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    console.error("[ResumeService] Storage upload error:", uploadError);
    throw new Error(uploadError.message || "Failed to upload file to storage.");
  }

  // 5. Insert document metadata record into 'resumes' table
  const { data: resumeRecord, error: dbError } = await supabase
    .from("resumes")
    .insert({
      firebase_uid: firebaseUid,
      original_filename: file.name,
      storage_path: uniqueStoragePath,
      file_type: file.type,
      file_size: file.size,
      upload_status: "ready",
    })
    .select()
    .single();

  if (dbError) {
    console.error("[ResumeService] Database insert error:", dbError);
    // Cleanup orphaned storage file on database failure
    await supabase.storage.from(BUCKET_NAME).remove([uniqueStoragePath]);
    throw new Error(dbError.message || "Failed to save resume metadata.");
  }

  return resumeRecord;
}

/**
 * List all resumes belonging to the authenticated Firebase user.
 */
export async function getResumes(firebaseUid: string): Promise<ResumeDocument[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("firebase_uid", firebaseUid)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[ResumeService] Error fetching resumes:", error);
    throw error;
  }

  return data || [];
}

/**
 * Generates a temporary signed download URL for private resume access.
 * Expire time: 60 seconds (prevents public link leakage).
 */
export async function getResumeDownloadUrl(storagePath: string): Promise<string> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(storagePath, 60);

  if (error || !data?.signedUrl) {
    console.error("[ResumeService] Signed URL creation error:", error);
    throw new Error(error?.message || "Failed to generate secure download link.");
  }

  return data.signedUrl;
}

/**
 * Deletes a resume document from both Supabase Storage and PostgreSQL.
 */
export async function deleteResume(
  resumeId: string,
  storagePath: string,
  firebaseUid: string
): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const supabase = getSupabaseClient();

  // 1. Delete from storage bucket
  const { error: storageError } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([storagePath]);

  if (storageError) {
    console.warn("[ResumeService] Warning deleting file from storage:", storageError);
  }

  // 2. Delete metadata from 'resumes' table
  const { error: dbError } = await supabase
    .from("resumes")
    .delete()
    .eq("id", resumeId)
    .eq("firebase_uid", firebaseUid);

  if (dbError) {
    console.error("[ResumeService] Error deleting resume from database:", dbError);
    throw dbError;
  }
}

