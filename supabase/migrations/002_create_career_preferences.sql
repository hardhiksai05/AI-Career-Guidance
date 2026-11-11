-- ==============================================================================
-- MIGRATION 002: CAREER PREFERENCES TABLE
-- Description: Stores student career interests, target domains, and learning styles.
-- Foreign Key: firebase_uid references profiles(firebase_uid)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.career_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT NOT NULL REFERENCES public.profiles(firebase_uid) ON DELETE CASCADE,
  preferred_domains TEXT[] NOT NULL DEFAULT '{}',
  career_goals TEXT,
  target_skills TEXT[] NOT NULL DEFAULT '{}',
  preferred_learning_style TEXT,
  preferred_locations TEXT[] NOT NULL DEFAULT '{}',
  experience_level TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_career_preferences_uid UNIQUE (firebase_uid)
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_career_preferences_firebase_uid ON public.career_preferences (firebase_uid);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trg_career_preferences_updated_at ON public.career_preferences;
CREATE TRIGGER trg_career_preferences_updated_at
  BEFORE UPDATE ON public.career_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Expose table to Data API roles
GRANT SELECT, INSERT, UPDATE, DELETE ON public.career_preferences TO authenticated;

