-- ==============================================================================
-- MIGRATION 009: FINAL SECURITY HARDENING (AI CAREER GUIDANCE)
-- Description:
-- 1. Revokes unnecessary anonymous SELECT grants on all private student tables.
-- 2. Hardens chat_messages RLS: validates conversation ownership on INSERT and
--    restricts client INSERTs strictly to role = 'user' (preparing for Part 4 Gemini AI).
-- 3. Hardens achievement security: prevents arbitrary client badge unlocks by
--    requiring server-side validation of mission completion before awarding.
-- 4. Provides trusted server-side function for Gemini AI assistant responses.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. DATABASE PERMISSIONS: REVOKE UNNECESSARY ANONYMOUS ACCESS
-- ------------------------------------------------------------------------------
REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.career_preferences FROM anon;
REVOKE ALL ON public.resumes FROM anon;
REVOKE ALL ON public.chat_conversations FROM anon;
REVOKE ALL ON public.chat_messages FROM anon;
REVOKE ALL ON public.roadmap_progress FROM anon;
REVOKE ALL ON public.user_achievements FROM anon;

-- Preserve legitimate public read-only access to achievements definitions catalog
GRANT SELECT ON public.achievements TO anon;
GRANT SELECT ON public.achievements TO authenticated;

-- Ensure authenticated role maintains explicit CRUD on own data
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.career_preferences TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resumes TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_conversations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.roadmap_progress TO authenticated;
GRANT SELECT ON public.user_achievements TO authenticated;

-- ------------------------------------------------------------------------------
-- 2. CHAT MESSAGE SECURITY & CONVERSATION OWNERSHIP
-- ------------------------------------------------------------------------------

-- Ensure chat messages cannot be read across users AND strictly belong to an owned conversation
DROP POLICY IF EXISTS "Users can view messages from own conversations" ON public.chat_messages;
CREATE POLICY "Users can view messages from own conversations"
  ON public.chat_messages FOR SELECT
  TO authenticated
  USING (
    firebase_uid = (auth.jwt()->>'sub')
    AND EXISTS (
      SELECT 1 FROM public.chat_conversations c
      WHERE c.id = conversation_id AND c.firebase_uid = (auth.jwt()->>'sub')
    )
  );

-- Client users can ONLY insert messages with role = 'user' into conversations they own.
-- Prevents clients from injecting fabricated assistant messages or hijacking other conversations.
DROP POLICY IF EXISTS "Users can insert messages into own conversations" ON public.chat_messages;
CREATE POLICY "Users can insert messages into own conversations"
  ON public.chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    firebase_uid = (auth.jwt()->>'sub')
    AND role = 'user'
    AND EXISTS (
      SELECT 1 FROM public.chat_conversations c
      WHERE c.id = conversation_id AND c.firebase_uid = (auth.jwt()->>'sub')
    )
  );

-- Update policy: Users can only update their own user messages in their own conversations
DROP POLICY IF EXISTS "Users can update own messages" ON public.chat_messages;
CREATE POLICY "Users can update own messages"
  ON public.chat_messages FOR UPDATE
  TO authenticated
  USING (
    firebase_uid = (auth.jwt()->>'sub')
    AND EXISTS (
      SELECT 1 FROM public.chat_conversations c
      WHERE c.id = conversation_id AND c.firebase_uid = (auth.jwt()->>'sub')
    )
  )
  WITH CHECK (
    firebase_uid = (auth.jwt()->>'sub')
    AND role = 'user'
    AND EXISTS (
      SELECT 1 FROM public.chat_conversations c
      WHERE c.id = conversation_id AND c.firebase_uid = (auth.jwt()->>'sub')
    )
  );

-- Delete policy: Users can only delete messages from conversations they own
DROP POLICY IF EXISTS "Users can delete own messages" ON public.chat_messages;
CREATE POLICY "Users can delete own messages"
  ON public.chat_messages FOR DELETE
  TO authenticated
  USING (
    firebase_uid = (auth.jwt()->>'sub')
    AND EXISTS (
      SELECT 1 FROM public.chat_conversations c
      WHERE c.id = conversation_id AND c.firebase_uid = (auth.jwt()->>'sub')
    )
  );

-- ------------------------------------------------------------------------------
-- 3. SERVER-SIDE CHAT REPLY INSERTION FUNCTION (FOR TRUSTED GEMINI ASSISTANT RESPONSES)
-- ------------------------------------------------------------------------------
-- Allows trusted assistant messages to be saved into an owned conversation.
-- Automatically verifies conversation ownership against the caller's JWT subject
-- or against the explicitly passed p_firebase_uid if executed by service_role.
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
  -- If invoked by service_role or superuser, allow explicit p_firebase_uid
  IF (auth.jwt()->>'role' = 'service_role' OR current_user IN ('postgres', 'service_role')) AND p_firebase_uid IS NOT NULL THEN
    v_firebase_uid := p_firebase_uid;
  ELSE
    v_firebase_uid := auth.jwt()->>'sub';
  END IF;

  IF v_firebase_uid IS NULL THEN
    RAISE EXCEPTION 'Unauthorized: Missing authenticated Firebase UID';
  END IF;

  -- Verify that the student genuinely owns the target conversation
  IF NOT EXISTS (
    SELECT 1 FROM public.chat_conversations
    WHERE id = p_conversation_id AND firebase_uid = v_firebase_uid
  ) THEN
    RAISE EXCEPTION 'Forbidden: Conversation not found or access denied';
  END IF;

  -- Insert assistant message with trusted role
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

GRANT EXECUTE ON FUNCTION public.insert_verified_assistant_reply TO authenticated;
GRANT EXECUTE ON FUNCTION public.insert_verified_assistant_reply TO service_role;

-- ------------------------------------------------------------------------------
-- 4. ACHIEVEMENT SECURITY: VALIDATION BEFORE AWARDING
-- ------------------------------------------------------------------------------
-- Remove direct client INSERT policy on user_achievements to prevent arbitrary self-awarding.
DROP POLICY IF EXISTS "Users can unlock own achievements" ON public.user_achievements;

-- Trusted PostgreSQL RPC that validates real mission completion before awarding badge
CREATE OR REPLACE FUNCTION public.verify_and_unlock_achievement(
  p_achievement_code TEXT,
  p_career_id TEXT DEFAULT NULL
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
  v_firebase_uid := auth.jwt()->>'sub';
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

  -- Server-side validation of genuine accomplishment
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
      -- Student must have uploaded an active CV document
      SELECT EXISTS (
        SELECT 1 FROM public.resumes
        WHERE firebase_uid = v_firebase_uid
      ) INTO v_is_eligible;

    WHEN 'curriculum_scholar' THEN
      -- Student must have completed at least 10 subtopics
      SELECT EXISTS (
        SELECT 1 FROM public.roadmap_progress
        WHERE firebase_uid = v_firebase_uid
          AND (p_career_id IS NULL OR career_id = p_career_id)
          AND (cardinality(completed_subtopics) >= 10 OR array_length(completed_subtopics, 1) >= 10)
      ) INTO v_is_eligible;

    WHEN 'roadmap_zen_master' THEN
      -- Student must have an active roadmap progress record
      SELECT EXISTS (
        SELECT 1 FROM public.roadmap_progress
        WHERE firebase_uid = v_firebase_uid
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

GRANT EXECUTE ON FUNCTION public.verify_and_unlock_achievement TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_and_unlock_achievement TO service_role;
