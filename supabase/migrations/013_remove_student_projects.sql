-- ==============================================================================
-- MIGRATION 013: COMPENSATING MIGRATION - REMOVE STUDENT PROJECTS FEATURE
-- Description: Safely drops the student_projects table and its triggers/policies.
--              Does NOT touch profiles, resumes, chat, roadmaps, or achievements.
-- ==============================================================================

-- 1. Drop trigger if exists
DROP TRIGGER IF EXISTS trg_student_projects_updated_at ON public.student_projects;

-- 2. Drop table with CASCADE (automatically cleans up table policies and indexes)
DROP TABLE IF EXISTS public.student_projects CASCADE;

