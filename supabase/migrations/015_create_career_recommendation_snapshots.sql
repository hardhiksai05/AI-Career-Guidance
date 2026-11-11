-- ==============================================================================
-- MIGRATION 015: CAREER RECOMMENDATION SNAPSHOTS & CV CACHING
-- Description: Stores persistent, CV-versioned AI career recommendations.
-- Guarantees that Gemini is only called on new CV uploads or explicit user regeneration.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.career_recommendation_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT NOT NULL REFERENCES public.profiles(firebase_uid) ON DELETE CASCADE,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
  cv_hash TEXT NOT NULL,
  cv_filename TEXT,
  recommendation_data JSONB NOT NULL,
  student_summary JSONB,
  model_name TEXT NOT NULL DEFAULT 'gemini-3.1-flash-lite',
  generation_version INT NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_rec_snapshots_user_active 
  ON public.career_recommendation_snapshots (firebase_uid, is_active);

CREATE INDEX IF NOT EXISTS idx_rec_snapshots_user_hash 
  ON public.career_recommendation_snapshots (firebase_uid, cv_hash);

CREATE INDEX IF NOT EXISTS idx_rec_snapshots_created_at 
  ON public.career_recommendation_snapshots (created_at DESC);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trg_career_recommendation_snapshots_updated_at ON public.career_recommendation_snapshots;
CREATE TRIGGER trg_career_recommendation_snapshots_updated_at
  BEFORE UPDATE ON public.career_recommendation_snapshots
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.career_recommendation_snapshots ENABLE ROW LEVEL SECURITY;

-- Expose table to Data API roles
GRANT SELECT, INSERT, UPDATE, DELETE ON public.career_recommendation_snapshots TO authenticated;
GRANT ALL ON public.career_recommendation_snapshots TO service_role;

-- ------------------------------------------------------------------------------
-- RLS POLICIES FOR CAREER RECOMMENDATION SNAPSHOTS
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own recommendation snapshots" ON public.career_recommendation_snapshots;
CREATE POLICY "Users can view own recommendation snapshots"
  ON public.career_recommendation_snapshots FOR SELECT
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own recommendation snapshots" ON public.career_recommendation_snapshots;
CREATE POLICY "Users can insert own recommendation snapshots"
  ON public.career_recommendation_snapshots FOR INSERT
  TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own recommendation snapshots" ON public.career_recommendation_snapshots;
CREATE POLICY "Users can update own recommendation snapshots"
  ON public.career_recommendation_snapshots FOR UPDATE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own recommendation snapshots" ON public.career_recommendation_snapshots;
CREATE POLICY "Users can delete own recommendation snapshots"
  ON public.career_recommendation_snapshots FOR DELETE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));
