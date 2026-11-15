-- ==============================================================================
-- MIGRATION 017: SHARED 25-MINUTE JOB CACHE & VERSIONED RECOMMENDATIONS
-- Description: Adds inventory and profile versioning, safe cache state tracking,
-- and atomic PostgreSQL RPC locking for concurrent background synchronization.
-- ==============================================================================

-- 1. ADD VERSIONING COLUMNS TO JOBS & STUDENT RECOMMENDATIONS
ALTER TABLE public.jobs 
  ADD COLUMN IF NOT EXISTS inventory_version INT DEFAULT 1;

ALTER TABLE public.student_job_recommendations 
  ADD COLUMN IF NOT EXISTS profile_version TEXT,
  ADD COLUMN IF NOT EXISTS inventory_version INT DEFAULT 1;

CREATE INDEX IF NOT EXISTS idx_student_job_rec_versions 
  ON public.student_job_recommendations (firebase_uid, profile_version, inventory_version);

-- 2. CREATE SHARED JOBS CACHE STATE TABLE
CREATE TABLE IF NOT EXISTS public.jobs_cache_state (
  id INT PRIMARY KEY DEFAULT 1,
  inventory_version INT NOT NULL DEFAULT 1,
  last_synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sync_status TEXT NOT NULL DEFAULT 'idle' CHECK (sync_status IN ('idle', 'syncing', 'error')),
  sync_locked_until TIMESTAMPTZ,
  total_jobs INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT single_row_cache_state CHECK (id = 1)
);

-- Seed initial cache state row if empty
INSERT INTO public.jobs_cache_state (
  id, inventory_version, last_synced_at, sync_status, sync_locked_until, total_jobs, updated_at
)
VALUES (1, 1, '1970-01-01 00:00:00+00', 'idle', NULL, 0, NOW())
ON CONFLICT (id) DO NOTHING;

-- Grant permissions on cache state
ALTER TABLE public.jobs_cache_state ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.jobs_cache_state TO authenticated;
GRANT ALL ON public.jobs_cache_state TO service_role;

DROP POLICY IF EXISTS "Authenticated users can read cache state" ON public.jobs_cache_state;
CREATE POLICY "Authenticated users can read cache state"
  ON public.jobs_cache_state FOR SELECT
  TO authenticated
  USING (true);

-- 3. ATOMIC LOCK ACQUISITION FUNCTION
-- Performs an atomic FOR UPDATE row lock on jobs_cache_state.
-- Only ONE backend process can acquire the lock when the cache is expired.
CREATE OR REPLACE FUNCTION public.acquire_job_sync_lock(
  cooldown_seconds INT DEFAULT 1500,
  lock_timeout_seconds INT DEFAULT 180
)
RETURNS JSONB AS $$
DECLARE
  current_state public.jobs_cache_state%ROWTYPE;
  now_ts TIMESTAMPTZ := NOW();
  acquired BOOLEAN := FALSE;
  is_expired BOOLEAN := FALSE;
BEGIN
  -- Ensure the singleton record exists
  INSERT INTO public.jobs_cache_state (
    id, inventory_version, last_synced_at, sync_status, sync_locked_until, total_jobs, updated_at
  )
  VALUES (1, 1, '1970-01-01 00:00:00+00', 'idle', NULL, 0, now_ts)
  ON CONFLICT (id) DO NOTHING;

  -- Acquire exclusive row lock for the transaction
  SELECT * INTO current_state 
  FROM public.jobs_cache_state 
  WHERE id = 1 
  FOR UPDATE;

  -- Determine if cache has expired (25 minutes / 1500 seconds by default)
  is_expired := (current_state.last_synced_at + (cooldown_seconds || ' seconds')::INTERVAL <= now_ts);

  -- Only grant the lock if cache is expired AND no active sync is running (or previous lock timed out)
  IF is_expired THEN
    IF (current_state.sync_status != 'syncing' OR current_state.sync_locked_until IS NULL OR current_state.sync_locked_until < now_ts) THEN
      UPDATE public.jobs_cache_state
      SET sync_status = 'syncing',
          sync_locked_until = now_ts + (lock_timeout_seconds || ' seconds')::INTERVAL,
          updated_at = now_ts
      WHERE id = 1;

      acquired := TRUE;
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'acquired', acquired,
    'inventory_version', current_state.inventory_version,
    'last_synced_at', current_state.last_synced_at,
    'sync_status', current_state.sync_status,
    'is_expired', is_expired
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. ATOMIC LOCK RELEASE FUNCTION
-- Safely releases the sync lock and increments the inventory version on success.
CREATE OR REPLACE FUNCTION public.release_job_sync_lock(
  new_inventory_version INT DEFAULT NULL,
  new_total_jobs INT DEFAULT NULL,
  was_success BOOLEAN DEFAULT TRUE
)
RETURNS VOID AS $$
BEGIN
  IF was_success THEN
    UPDATE public.jobs_cache_state
    SET sync_status = 'idle',
        sync_locked_until = NULL,
        last_synced_at = NOW(),
        inventory_version = COALESCE(new_inventory_version, inventory_version + 1),
        total_jobs = COALESCE(new_total_jobs, total_jobs),
        updated_at = NOW()
    WHERE id = 1;
  ELSE
    UPDATE public.jobs_cache_state
    SET sync_status = 'idle',
        sync_locked_until = NULL,
        updated_at = NOW()
    WHERE id = 1;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

