import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export interface RoadmapProgressData {
  id?: string;
  firebase_uid: string;
  career_id: string; // Course ID or Career ID
  career_title: string;
  current_level: number; // Current Learning Phase (1 to 7)
  completed_missions: string[]; // Completed Topic IDs
  completed_subtopics: string[]; // Completed Subtopic / Checkpoint IDs
  total_xp?: number; // Maintained as optional/0 for database column backwards-compatibility
  progress_percentage: number;
  last_accessed_at?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Fetch saved roadmap progress for a specific course or career track.
 */
export async function getRoadmapProgress(
  firebaseUid: string,
  careerId: string
): Promise<RoadmapProgressData | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("roadmap_progress")
    .select("*")
    .eq("firebase_uid", firebaseUid)
    .eq("career_id", careerId)
    .maybeSingle();

  if (error) {
    console.error("[RoadmapService] Error fetching progress:", error);
    throw error;
  }

  return data;
}

/**
 * Fetch all roadmap progress tracks for the authenticated user.
 */
export async function getAllRoadmapProgress(
  firebaseUid: string
): Promise<RoadmapProgressData[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("roadmap_progress")
    .select("*")
    .eq("firebase_uid", firebaseUid)
    .order("last_accessed_at", { ascending: false });

  if (error) {
    console.error("[RoadmapService] Error fetching all progress tracks:", error);
    throw error;
  }

  return data || [];
}

/**
 * Upsert roadmap progress (saves completed topic IDs, active phase, and percentage).
 * All gamification/XP calculations have been completely removed.
 */
export async function saveRoadmapProgress(
  progress: RoadmapProgressData
): Promise<RoadmapProgressData> {
  if (!isSupabaseConfigured()) {
    return progress;
  }
  const supabase = getSupabaseClient();

  const payload = {
    firebase_uid: progress.firebase_uid,
    career_id: progress.career_id,
    career_title: progress.career_title,
    current_level: progress.current_level,
    completed_missions: progress.completed_missions,
    completed_subtopics: progress.completed_subtopics,
    total_xp: 0,
    progress_percentage: progress.progress_percentage,
    last_accessed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("roadmap_progress")
    .upsert(payload, { onConflict: "firebase_uid,career_id" })
    .select()
    .single();

  if (error) {
    console.error("[RoadmapService] Error saving progress:", error);
    throw error;
  }

  return data;
}
