-- ==============================================================================
-- MIGRATION 012: STUDENT PROJECTS & GITHUB PORTFOLIO ANALYSIS
-- Description: Stores confirmed student projects, AI architectural explanations,
--              interactive Mermaid flowcharts, GitHub insights, and interview prep.
-- User Identifier: firebase_uid (TEXT, maps to Firebase Auth UID / JWT 'sub')
-- ==============================================================================

-- 1. Create student_projects table
CREATE TABLE IF NOT EXISTS public.student_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT NOT NULL REFERENCES public.profiles(firebase_uid) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  technologies TEXT[] DEFAULT '{}'::TEXT[],
  role TEXT,
  duration TEXT,
  github_url TEXT,
  live_url TEXT,
  achievements TEXT[] DEFAULT '{}'::TEXT[],
  repository_data JSONB DEFAULT '{}'::JSONB,
  analysis JSONB DEFAULT '{}'::JSONB,
  architecture_diagrams JSONB DEFAULT '[]'::JSONB,
  interview_prep JSONB DEFAULT '[]'::JSONB,
  source TEXT DEFAULT 'cv',
  verification_status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_student_projects_firebase_uid ON public.student_projects (firebase_uid);
CREATE INDEX IF NOT EXISTS idx_student_projects_created_at ON public.student_projects (created_at DESC);

-- 3. Trigger for automatic updated_at timestamp maintenance
DROP TRIGGER IF EXISTS trg_student_projects_updated_at ON public.student_projects;
CREATE TRIGGER trg_student_projects_updated_at
  BEFORE UPDATE ON public.student_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.student_projects ENABLE ROW LEVEL SECURITY;

-- 5. Strict User Isolation RLS Policies
DROP POLICY IF EXISTS "Users can view own projects" ON public.student_projects;
CREATE POLICY "Users can view own projects"
  ON public.student_projects FOR SELECT
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own projects" ON public.student_projects;
CREATE POLICY "Users can insert own projects"
  ON public.student_projects FOR INSERT
  TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own projects" ON public.student_projects;
CREATE POLICY "Users can update own projects"
  ON public.student_projects FOR UPDATE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own projects" ON public.student_projects;
CREATE POLICY "Users can delete own projects"
  ON public.student_projects FOR DELETE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- 6. Expose table to Data API roles
GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_projects TO authenticated;
GRANT SELECT ON public.student_projects TO anon;

