-- ==============================================================================
-- MIGRATION 005: ROADMAP PROGRESS TABLE
-- Description: Stores per-career progression, completed nodes, subtopics, and XP.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.roadmap_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT NOT NULL REFERENCES public.profiles(firebase_uid) ON DELETE CASCADE,
  career_id TEXT NOT NULL,
  career_title TEXT NOT NULL,
  current_level INT NOT NULL DEFAULT 1,
  completed_missions TEXT[] NOT NULL DEFAULT '{}',
  completed_subtopics TEXT[] NOT NULL DEFAULT '{}',
  total_xp INT NOT NULL DEFAULT 0,
  progress_percentage INT NOT NULL DEFAULT 0,
  last_accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_roadmap_user_career UNIQUE (firebase_uid, career_id)
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_roadmap_progress_user
  ON public.roadmap_progress (firebase_uid, last_accessed_at DESC);
CREATE INDEX IF NOT EXISTS idx_roadmap_progress_career
  ON public.roadmap_progress (career_id);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trg_roadmap_progress_updated_at ON public.roadmap_progress;
CREATE TRIGGER trg_roadmap_progress_updated_at
  BEFORE UPDATE ON public.roadmap_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Expose to Data API roles
GRANT SELECT, INSERT, UPDATE, DELETE ON public.roadmap_progress TO authenticated;

