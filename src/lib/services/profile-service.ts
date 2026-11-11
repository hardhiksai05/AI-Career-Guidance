import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export interface StudentProfile {
  id?: string;
  firebase_uid: string;
  email: string;
  full_name?: string | null;
  username?: string | null;
  phone?: string | null;
  university?: string | null;
  degree?: string | null;
  branch?: string | null;
  graduation_year?: string | null;
  gpa?: string | null;
  profile_picture_url?: string | null;
  bio?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CareerPreferences {
  id?: string;
  firebase_uid: string;
  preferred_domains: string[];
  career_goals?: string | null;
  target_skills: string[];
  preferred_learning_style?: string | null;
  preferred_locations: string[];
  experience_level?: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Fetch a student's profile by Firebase UID.
 */
export async function getProfile(firebaseUid: string): Promise<StudentProfile | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("firebase_uid", firebaseUid)
    .maybeSingle();

  if (error) {
    console.error("[ProfileService] Error fetching profile:", error);
    throw error;
  }
  return data;
}

/**
 * Upsert a student's profile (insert or update on firebase_uid conflict).
 */
export async function upsertProfile(profile: Partial<StudentProfile> & { firebase_uid: string; email: string }): Promise<StudentProfile> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Please supply NEXT_PUBLIC_SUPABASE_* variables.");
  }
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        firebase_uid: profile.firebase_uid,
        email: profile.email,
        full_name: profile.full_name ?? null,
        username: profile.username ?? null,
        phone: profile.phone ?? null,
        university: profile.university ?? null,
        degree: profile.degree ?? null,
        branch: profile.branch ?? null,
        graduation_year: profile.graduation_year ?? null,
        gpa: profile.gpa ?? null,
        profile_picture_url: profile.profile_picture_url ?? null,
        bio: profile.bio ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "firebase_uid" }
    )
    .select()
    .single();

  if (error) {
    console.error("[ProfileService] Error saving profile:", error);
    throw error;
  }
  return data;
}

/**
 * Fetch career preferences by Firebase UID.
 */
export async function getCareerPreferences(firebaseUid: string): Promise<CareerPreferences | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("career_preferences")
    .select("*")
    .eq("firebase_uid", firebaseUid)
    .maybeSingle();

  if (error) {
    console.error("[ProfileService] Error fetching preferences:", error);
    throw error;
  }
  return data;
}

/**
 * Upsert career preferences.
 */
export async function upsertCareerPreferences(prefs: Partial<CareerPreferences> & { firebase_uid: string }): Promise<CareerPreferences> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Please supply NEXT_PUBLIC_SUPABASE_* variables.");
  }
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("career_preferences")
    .upsert(
      {
        firebase_uid: prefs.firebase_uid,
        preferred_domains: prefs.preferred_domains || [],
        career_goals: prefs.career_goals ?? null,
        target_skills: prefs.target_skills || [],
        preferred_learning_style: prefs.preferred_learning_style ?? null,
        preferred_locations: prefs.preferred_locations || [],
        experience_level: prefs.experience_level ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "firebase_uid" }
    )
    .select()
    .single();

  if (error) {
    console.error("[ProfileService] Error saving career preferences:", error);
    throw error;
  }
  return data;
}

