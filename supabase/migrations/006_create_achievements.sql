-- ==============================================================================
-- MIGRATION 006: ACHIEVEMENTS & USER ACHIEVEMENTS TABLES
-- Description: Stores RPG badge achievements and student unlocked milestones.
-- ==============================================================================

-- 1. Achievements Catalog Table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  achievement_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  xp_reward INT NOT NULL DEFAULT 100,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. User Achievements Join Table
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT NOT NULL REFERENCES public.profiles(firebase_uid) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_user_achievement UNIQUE (firebase_uid, achievement_id)
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_user_achievements_uid ON public.user_achievements (firebase_uid);
CREATE INDEX IF NOT EXISTS idx_achievements_code ON public.achievements (achievement_code);

-- Seed Initial System Achievements (Idempotent ON CONFLICT DO NOTHING)
INSERT INTO public.achievements (achievement_code, title, description, xp_reward, icon)
VALUES
  ('first_mission', 'First Mission Complete', 'Completed your first career learning node in the Anime Skill Tree', 150, 'Sparkles'),
  ('stage_ascension', 'Stage Ascension', 'Ascended to Level 2 in your career discipline', 250, 'Award'),
  ('resume_verified', 'Document Master', 'Uploaded and verified your academic CV in private storage', 200, 'FileText'),
  ('roadmap_zen_master', 'Zen Mode Achieved', 'Entered Focus Canvas mode to study with zero distractions', 100, 'Focus'),
  ('curriculum_scholar', 'Curriculum Scholar', 'Completed 10 subtopics in a specialized engineering track', 500, 'Crown')
ON CONFLICT (achievement_code) DO NOTHING;

-- Expose to Data API roles
GRANT SELECT ON public.achievements TO authenticated;
GRANT SELECT ON public.achievements TO anon;
GRANT SELECT, INSERT ON public.user_achievements TO authenticated;

