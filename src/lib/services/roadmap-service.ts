import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export interface RoadmapProgressData {
  id?: string;
  firebase_uid: string;
  career_id: string;
  career_title: string;
  current_level: number;
  completed_missions: string[];
  completed_subtopics: string[];
  total_xp: number;
  progress_percentage: number;
  last_accessed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AchievementItem {
  id: string;
  achievement_code: string;
  title: string;
  description: string;
  xp_reward: number;
  icon?: string | null;
  unlocked_at?: string;
}

/**
 * Fetch saved roadmap progress for a specific career track.
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
 * Upsert roadmap progress (saves completed missions, subtopics, XP, and level).
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
    total_xp: progress.total_xp,
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

/**
 * Retrieves all unlocked achievements for a user.
 */
export async function getUserAchievements(
  firebaseUid: string
): Promise<AchievementItem[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_achievements")
    .select("achievement_id, unlocked_at, achievements(id, achievement_code, title, description, xp_reward, icon)")
    .eq("firebase_uid", firebaseUid);

  if (error) {
    console.error("[RoadmapService] Error fetching user achievements:", error);
    throw error;
  }

  return (
    data?.map((item: any) => ({
      id: item.achievements.id,
      achievement_code: item.achievements.achievement_code,
      title: item.achievements.title,
      description: item.achievements.description,
      xp_reward: item.achievements.xp_reward,
      icon: item.achievements.icon,
      unlocked_at: item.unlocked_at,
    })) || []
  );
}

/**
 * Unlocks an achievement for the user by achievement_code using the secure server route.
 * Migrated to server API: POST /api/achievements/unlock.
 * Server verifies Firebase ID token and authenticates user; privileged verify_and_unlock_achievement
 * RPC validates actual mission/track progress in PostgreSQL before awarding (prevents arbitrary client self-awarding).
 */
export async function unlockAchievement(
  firebaseUid: string,
  achievementCode: string,
  careerId?: string
): Promise<boolean> {
  try {
    const firebaseAuth = (await import("@/lib/firebase")).auth;
    const token = await firebaseAuth?.currentUser?.getIdToken();

    if (!token) {
      console.warn("[RoadmapService] User not authenticated for achievement unlock");
      return false;
    }

    const res = await fetch("/api/achievements/unlock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        achievementCode,
        careerId: careerId || null,
      }),
    });

    if (res.ok) {
      const result = await res.json();
      return Boolean(result.unlocked);
    } else {
      const err = await res.json().catch(() => ({}));
      console.warn("[RoadmapService] Achievement unlock API response:", err);
      return false;
    }
  } catch (err) {
    console.error("[RoadmapService] Error calling /api/achievements/unlock:", err);
    return false;
  }
}

