-- ==============================================================================
-- MIGRATION 014: REMOVE ACHIEVEMENTS & GAMIFICATION SYSTEM
-- Description: Deprecates and removes achievements and user_achievements tables,
-- dropping gamification functions and RPCs while strictly preserving
-- all student profiles, authentications, CV data, and roadmap progress tracking.
-- ==============================================================================

-- 1. Drop verify_and_unlock_achievement RPC function
DROP FUNCTION IF EXISTS public.verify_and_unlock_achievement(TEXT, TEXT, TEXT);

-- 2. Drop user_achievements table
DROP TABLE IF EXISTS public.user_achievements CASCADE;

-- 3. Drop achievements catalog table
DROP TABLE IF EXISTS public.achievements CASCADE;

-- Note: public.roadmap_progress is strictly retained to preserve
-- student topic completion status, active phase, and learning history.
