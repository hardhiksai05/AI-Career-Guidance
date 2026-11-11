-- ==============================================================================
-- MIGRATION 016: JOBS & STUDENT JOB RECOMMENDATIONS
-- Description: Stores Adzuna job listings, Gemini 2.5 Flash-Lite processed summaries,
-- deterministic matching scores, and background sync logs.
-- ==============================================================================

-- 1. JOBS TABLE
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL DEFAULT 'adzuna',
  provider_job_id TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  description TEXT,
  description_summary TEXT,
  salary_min NUMERIC,
  salary_max NUMERIC,
  salary_is_predicted BOOLEAN DEFAULT false,
  contract_type TEXT,
  experience_level TEXT,
  category TEXT,
  required_skills JSONB DEFAULT '[]'::jsonb,
  responsibilities JSONB DEFAULT '[]'::jsonb,
  qualifications JSONB DEFAULT '[]'::jsonb,
  application_url TEXT NOT NULL,
  posted_at TIMESTAMPTZ,
  last_verified_at TIMESTAMPTZ DEFAULT NOW(),
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  raw_provider_data JSONB,
  content_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_jobs_provider_job_id UNIQUE (provider, provider_job_id)
);

-- Performance Indexes on Jobs
CREATE INDEX IF NOT EXISTS idx_jobs_provider_id ON public.jobs (provider, provider_job_id);
CREATE INDEX IF NOT EXISTS idx_jobs_active_posted ON public.jobs (is_active, posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_content_hash ON public.jobs (content_hash);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON public.jobs (category);

-- Trigger for jobs.updated_at
DROP TRIGGER IF EXISTS trg_jobs_updated_at ON public.jobs;
CREATE TRIGGER trg_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 2. STUDENT JOB RECOMMENDATIONS TABLE
CREATE TABLE IF NOT EXISTS public.student_job_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT NOT NULL REFERENCES public.profiles(firebase_uid) ON DELETE CASCADE,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  match_score NUMERIC NOT NULL,
  matched_skills JSONB DEFAULT '[]'::jsonb,
  missing_skills JSONB DEFAULT '[]'::jsonb,
  qualification_compatibility TEXT,
  experience_compatibility TEXT,
  match_explanation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_student_job_rec UNIQUE (firebase_uid, job_id)
);

-- Performance Indexes on Recommendations
CREATE INDEX IF NOT EXISTS idx_student_job_rec_user_score 
  ON public.student_job_recommendations (firebase_uid, match_score DESC);
CREATE INDEX IF NOT EXISTS idx_student_job_rec_job_id 
  ON public.student_job_recommendations (job_id);

-- Trigger for student_job_recommendations.updated_at
DROP TRIGGER IF EXISTS trg_student_job_recommendations_updated_at ON public.student_job_recommendations;
CREATE TRIGGER trg_student_job_recommendations_updated_at
  BEFORE UPDATE ON public.student_job_recommendations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 3. JOB SYNC LOGS TABLE
CREATE TABLE IF NOT EXISTS public.job_sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL DEFAULT 'adzuna',
  sync_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sync_completed_at TIMESTAMPTZ,
  jobs_fetched INT NOT NULL DEFAULT 0,
  jobs_inserted INT NOT NULL DEFAULT 0,
  jobs_updated INT NOT NULL DEFAULT 0,
  jobs_failed INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'in_progress',
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_sync_logs_provider_created 
  ON public.job_sync_logs (provider, created_at DESC);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_job_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_sync_logs ENABLE ROW LEVEL SECURITY;

-- Expose to authenticated and service_role
GRANT SELECT ON public.jobs TO authenticated;
GRANT ALL ON public.jobs TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_job_recommendations TO authenticated;
GRANT ALL ON public.student_job_recommendations TO service_role;

GRANT SELECT ON public.job_sync_logs TO authenticated;
GRANT ALL ON public.job_sync_logs TO service_role;

-- ------------------------------------------------------------------------------
-- RLS POLICIES FOR JOBS & RECOMMENDATIONS
-- ------------------------------------------------------------------------------
-- Jobs are globally readable by authenticated students
DROP POLICY IF EXISTS "Authenticated users can read active jobs" ON public.jobs;
CREATE POLICY "Authenticated users can read active jobs"
  ON public.jobs FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Student Job Recommendations are tenant-isolated by Firebase UID
DROP POLICY IF EXISTS "Users can view own job recommendations" ON public.student_job_recommendations;
CREATE POLICY "Users can view own job recommendations"
  ON public.student_job_recommendations FOR SELECT
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own job recommendations" ON public.student_job_recommendations;
CREATE POLICY "Users can insert own job recommendations"
  ON public.student_job_recommendations FOR INSERT
  TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own job recommendations" ON public.student_job_recommendations;
CREATE POLICY "Users can update own job recommendations"
  ON public.student_job_recommendations FOR UPDATE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own job recommendations" ON public.student_job_recommendations;
CREATE POLICY "Users can delete own job recommendations"
  ON public.student_job_recommendations FOR DELETE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- Job Sync Logs are viewable by authenticated users
DROP POLICY IF EXISTS "Authenticated users can view job sync logs" ON public.job_sync_logs;
CREATE POLICY "Authenticated users can view job sync logs"
  ON public.job_sync_logs FOR SELECT
  TO authenticated
  USING (true);
