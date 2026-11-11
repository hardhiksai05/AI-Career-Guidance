-- ==============================================================================
-- MIGRATION 010: RPC FUNCTION PERMISSION & ACHIEVEMENT VALIDATION HARDENING
-- Description:
-- 1. Drops legacy public function overloads.
-- 2. Restricts insert_verified_assistant_reply and verify_and_unlock_achievement
--    exclusively to service_role and database owner (postgres).
-- 3. Revokes all EXECUTE permissions from PUBLIC, anon, and authenticated roles.
-- 4. Enforces verified student UID parameters when executed via service_role.
-- 5. Hardens achievement criteria:
--    - resume_verified: verifies upload_status = 'verified' on resumes table.
--    - roadmap_zen_master: verifies progress_percentage >= 100 on roadmap_progress table.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. HARDEN: insert_verified_assistant_reply
-- ------------------------------------------------------------------------------
-- Drop any legacy 3-parameter overload
DROP FUNCTION IF EXISTS public.insert_verified_assistant_reply(UUID, TEXT, JSONB);

-- Re-create canonical 4-parameter function with strict ownership validation
CREATE OR REPLACE FUNCTION public.insert_verified_assistant_reply(
  p_conversation_id UUID,
  p_content TEXT,
  p_metadata JSONB DEFAULT '{}'::jsonb,
  p_firebase_uid TEXT DEFAULT NULL
)
RETURNS public.chat_messages
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_firebase_uid TEXT;
  v_new_message public.chat_messages;
BEGIN
  -- If executed by service_role or database superuser, use the verified p_firebase_uid
  IF (auth.jwt()->>'role' = 'service_role' OR current_user IN ('postgres', 'service_role')) THEN
    v_firebase_uid := COALESCE(p_firebase_uid, auth.jwt()->>'sub');
  ELSE
    v_firebase_uid := auth.jwt()->>'sub';
  END IF;

  IF v_firebase_uid IS NULL THEN
    RAISE EXCEPTION 'Unauthorized: Missing authenticated Firebase UID';
  END IF;

  -- Verify conversation belongs to this student
  IF NOT EXISTS (
    SELECT 1 FROM public.chat_conversations
    WHERE id = p_conversation_id AND firebase_uid = v_firebase_uid
  ) THEN
    RAISE EXCEPTION 'Forbidden: Conversation not found or access denied';
  END IF;

  -- Insert trusted assistant reply
  INSERT INTO public.chat_messages (
    conversation_id,
    firebase_uid,
    role,
    content,
    metadata
  )
  VALUES (
    p_conversation_id,
    v_firebase_uid,
    'assistant',
    p_content,
    p_metadata
  )
  RETURNING * INTO v_new_message;

  -- Automatically update last_message_at and updated_at on the parent conversation
  UPDATE public.chat_conversations
  SET last_message_at = NOW(),
      updated_at = NOW()
  WHERE id = p_conversation_id;

  RETURN v_new_message;
END;
$$;

-- Revoke all execute permissions from unprivileged roles and default PUBLIC
REVOKE ALL ON FUNCTION public.insert_verified_assistant_reply(UUID, TEXT, JSONB, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.insert_verified_assistant_reply(UUID, TEXT, JSONB, TEXT) FROM anon;
REVOKE ALL ON FUNCTION public.insert_verified_assistant_reply(UUID, TEXT, JSONB, TEXT) FROM authenticated;

-- Grant EXECUTE exclusively to service_role and postgres
GRANT EXECUTE ON FUNCTION public.insert_verified_assistant_reply(UUID, TEXT, JSONB, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.insert_verified_assistant_reply(UUID, TEXT, JSONB, TEXT) TO postgres;


-- ------------------------------------------------------------------------------
-- 2. HARDEN: verify_and_unlock_achievement
-- ------------------------------------------------------------------------------
-- Drop any legacy 2-parameter overload
DROP FUNCTION IF EXISTS public.verify_and_unlock_achievement(TEXT, TEXT);

-- Re-create canonical 3-parameter function with verified UID and genuine progress validation
CREATE OR REPLACE FUNCTION public.verify_and_unlock_achievement(
  p_achievement_code TEXT,
  p_career_id TEXT DEFAULT NULL,
  p_firebase_uid TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_firebase_uid TEXT;
  v_achievement_id UUID;
  v_is_eligible BOOLEAN := FALSE;
BEGIN
  -- If executed by service_role or database superuser, use the verified p_firebase_uid
  IF (auth.jwt()->>'role' = 'service_role' OR current_user IN ('postgres', 'service_role')) THEN
    v_firebase_uid := COALESCE(p_firebase_uid, auth.jwt()->>'sub');
  ELSE
    v_firebase_uid := auth.jwt()->>'sub';
  END IF;

  IF v_firebase_uid IS NULL THEN
    RAISE EXCEPTION 'Unauthorized: Missing authenticated Firebase UID';
  END IF;

  -- Lookup achievement definition
  SELECT id INTO v_achievement_id
  FROM public.achievements
  WHERE achievement_code = p_achievement_code;

  IF v_achievement_id IS NULL THEN
    RETURN FALSE;
  END IF;

  -- Check if already unlocked (idempotent)
  IF EXISTS (
    SELECT 1 FROM public.user_achievements
    WHERE firebase_uid = v_firebase_uid AND achievement_id = v_achievement_id
  ) THEN
    RETURN TRUE;
  END IF;

  -- Server-side validation of genuine accomplishment in PostgreSQL
  CASE p_achievement_code
    WHEN 'first_mission' THEN
      -- Student must have completed at least 1 mission node
      SELECT EXISTS (
        SELECT 1 FROM public.roadmap_progress
        WHERE firebase_uid = v_firebase_uid
          AND (p_career_id IS NULL OR career_id = p_career_id)
          AND (cardinality(completed_missions) >= 1 OR array_length(completed_missions, 1) >= 1)
      ) INTO v_is_eligible;

    WHEN 'stage_ascension' THEN
      -- Student must have ascended to Level 2 or above
      SELECT EXISTS (
        SELECT 1 FROM public.roadmap_progress
        WHERE firebase_uid = v_firebase_uid
          AND (p_career_id IS NULL OR career_id = p_career_id)
          AND current_level >= 2
      ) INTO v_is_eligible;

    WHEN 'resume_verified' THEN
      -- Student must have a document whose upload_status is 'verified'
      SELECT EXISTS (
        SELECT 1 FROM public.resumes
        WHERE firebase_uid = v_firebase_uid
          AND upload_status = 'verified'
      ) INTO v_is_eligible;

    WHEN 'curriculum_scholar' THEN
      -- Student must have completed at least 10 curriculum subtopics
      SELECT EXISTS (
        SELECT 1 FROM public.roadmap_progress
        WHERE firebase_uid = v_firebase_uid
          AND (p_career_id IS NULL OR career_id = p_career_id)
          AND (cardinality(completed_subtopics) >= 10 OR array_length(completed_subtopics, 1) >= 10)
      ) INTO v_is_eligible;

    WHEN 'roadmap_zen_master' THEN
      -- Student must have achieved genuine 100% completion on a career roadmap
      SELECT EXISTS (
        SELECT 1 FROM public.roadmap_progress
        WHERE firebase_uid = v_firebase_uid
          AND (p_career_id IS NULL OR career_id = p_career_id)
          AND progress_percentage >= 100
      ) INTO v_is_eligible;

    ELSE
      v_is_eligible := FALSE;
  END CASE;

  -- Only record achievement if criteria were genuinely met
  IF v_is_eligible THEN
    INSERT INTO public.user_achievements (
      firebase_uid,
      achievement_id
    )
    VALUES (
      v_firebase_uid,
      v_achievement_id
    )
    ON CONFLICT (firebase_uid, achievement_id) DO NOTHING;
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$;

-- Revoke all execute permissions from unprivileged roles and default PUBLIC
REVOKE ALL ON FUNCTION public.verify_and_unlock_achievement(TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.verify_and_unlock_achievement(TEXT, TEXT, TEXT) FROM anon;
REVOKE ALL ON FUNCTION public.verify_and_unlock_achievement(TEXT, TEXT, TEXT) FROM authenticated;

-- Grant EXECUTE exclusively to service_role and postgres
GRANT EXECUTE ON FUNCTION public.verify_and_unlock_achievement(TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.verify_and_unlock_achievement(TEXT, TEXT, TEXT) TO postgres;
