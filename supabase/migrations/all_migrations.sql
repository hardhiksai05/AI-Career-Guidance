-- ==============================================================================
-- AI CAREER GUIDANCE PLATFORM - COMPLETE SUPABASE MIGRATIONS (PART 3)
-- Execute this entire file in Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- ==============================================================================
-- PART 1: PROFILES TABLE
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  username TEXT,
  phone TEXT,
  university TEXT,
  degree TEXT,
  branch TEXT,
  graduation_year TEXT,
  gpa TEXT,
  profile_picture_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_firebase_uid ON public.profiles (firebase_uid);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
-- Anonymous access revoked on private student profiles
REVOKE ALL ON public.profiles FROM anon;

-- ==============================================================================
-- PART 2: CAREER PREFERENCES TABLE
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

CREATE INDEX IF NOT EXISTS idx_career_preferences_firebase_uid ON public.career_preferences (firebase_uid);

DROP TRIGGER IF EXISTS trg_career_preferences_updated_at ON public.career_preferences;
CREATE TRIGGER trg_career_preferences_updated_at
  BEFORE UPDATE ON public.career_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

GRANT SELECT, INSERT, UPDATE, DELETE ON public.career_preferences TO authenticated;

-- ==============================================================================
-- PART 3: RESUMES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT NOT NULL REFERENCES public.profiles(firebase_uid) ON DELETE CASCADE,
  original_filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  upload_status TEXT NOT NULL DEFAULT 'ready',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resumes_firebase_uid ON public.resumes (firebase_uid);
CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON public.resumes (created_at DESC);

DROP TRIGGER IF EXISTS trg_resumes_updated_at ON public.resumes;
CREATE TRIGGER trg_resumes_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

GRANT SELECT, INSERT, UPDATE, DELETE ON public.resumes TO authenticated;

-- ==============================================================================
-- PART 4: CHAT CONVERSATIONS & MESSAGES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT NOT NULL REFERENCES public.profiles(firebase_uid) ON DELETE CASCADE,
  title TEXT NOT NULL,
  archived BOOLEAN NOT NULL DEFAULT false,
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversations_uid_last_msg
  ON public.chat_conversations (firebase_uid, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at
  ON public.chat_conversations (created_at DESC);

DROP TRIGGER IF EXISTS trg_chat_conversations_updated_at ON public.chat_conversations;
CREATE TRIGGER trg_chat_conversations_updated_at
  BEFORE UPDATE ON public.chat_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  firebase_uid TEXT NOT NULL REFERENCES public.profiles(firebase_uid) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_conv_created
  ON public.chat_messages (conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_firebase_uid
  ON public.chat_messages (firebase_uid);

CREATE OR REPLACE FUNCTION public.handle_chat_message_inserted()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.chat_conversations
  SET last_message_at = NEW.created_at,
      updated_at = NOW()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_chat_message_touch_conversation ON public.chat_messages;
CREATE TRIGGER trg_chat_message_touch_conversation
  AFTER INSERT ON public.chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_chat_message_inserted();

GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_conversations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO authenticated;

-- ==============================================================================
-- PART 5: ROADMAP PROGRESS
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

CREATE INDEX IF NOT EXISTS idx_roadmap_progress_user
  ON public.roadmap_progress (firebase_uid, last_accessed_at DESC);
CREATE INDEX IF NOT EXISTS idx_roadmap_progress_career
  ON public.roadmap_progress (career_id);

DROP TRIGGER IF EXISTS trg_roadmap_progress_updated_at ON public.roadmap_progress;
CREATE TRIGGER trg_roadmap_progress_updated_at
  BEFORE UPDATE ON public.roadmap_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

GRANT SELECT, INSERT, UPDATE, DELETE ON public.roadmap_progress TO authenticated;

-- ==============================================================================
-- PART 6: ACHIEVEMENTS & USER ACHIEVEMENTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  achievement_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  xp_reward INT NOT NULL DEFAULT 100,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT NOT NULL REFERENCES public.profiles(firebase_uid) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_user_achievement UNIQUE (firebase_uid, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_user_achievements_uid ON public.user_achievements (firebase_uid);
CREATE INDEX IF NOT EXISTS idx_achievements_code ON public.achievements (achievement_code);

INSERT INTO public.achievements (achievement_code, title, description, xp_reward, icon)
VALUES
  ('first_mission', 'First Mission Complete', 'Completed your first career learning node in the Anime Skill Tree', 150, 'Sparkles'),
  ('stage_ascension', 'Stage Ascension', 'Ascended to Level 2 in your career discipline', 250, 'Award'),
  ('resume_verified', 'Document Master', 'Uploaded and verified your academic CV in private storage', 200, 'FileText'),
  ('roadmap_zen_master', 'Zen Mode Achieved', 'Entered Focus Canvas mode to study with zero distractions', 100, 'Focus'),
  ('curriculum_scholar', 'Curriculum Scholar', 'Completed 10 subtopics in a specialized engineering track', 500, 'Crown')
ON CONFLICT (achievement_code) DO NOTHING;

GRANT SELECT ON public.achievements TO authenticated;
GRANT SELECT ON public.achievements TO anon;
GRANT SELECT, INSERT ON public.user_achievements TO authenticated;

-- ==============================================================================
-- PART 7: STORAGE BUCKET & POLICIES
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'student-resumes',
  'student-resumes',
  false,
  10485760, -- 10MB
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

DROP POLICY IF EXISTS "Authenticated users can upload own resume" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view own resume" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update own resume" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete own resume" ON storage.objects;

CREATE POLICY "Authenticated users can upload own resume"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'student-resumes' AND
    (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  );

CREATE POLICY "Authenticated users can view own resume"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'student-resumes' AND
    (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  );

CREATE POLICY "Authenticated users can update own resume"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'student-resumes' AND
    (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  )
  WITH CHECK (
    bucket_id = 'student-resumes' AND
    (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  );

CREATE POLICY "Authenticated users can delete own resume"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'student-resumes' AND
    (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  );

-- ==============================================================================
-- PART 8: ROW LEVEL SECURITY POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;
CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- Career Preferences
DROP POLICY IF EXISTS "Users can view own career preferences" ON public.career_preferences;
CREATE POLICY "Users can view own career preferences"
  ON public.career_preferences FOR SELECT TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own career preferences" ON public.career_preferences;
CREATE POLICY "Users can insert own career preferences"
  ON public.career_preferences FOR INSERT TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own career preferences" ON public.career_preferences;
CREATE POLICY "Users can update own career preferences"
  ON public.career_preferences FOR UPDATE TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own career preferences" ON public.career_preferences;
CREATE POLICY "Users can delete own career preferences"
  ON public.career_preferences FOR DELETE TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- Resumes
DROP POLICY IF EXISTS "Users can view own resume metadata" ON public.resumes;
CREATE POLICY "Users can view own resume metadata"
  ON public.resumes FOR SELECT TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own resume metadata" ON public.resumes;
CREATE POLICY "Users can insert own resume metadata"
  ON public.resumes FOR INSERT TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own resume metadata" ON public.resumes;
CREATE POLICY "Users can update own resume metadata"
  ON public.resumes FOR UPDATE TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own resume metadata" ON public.resumes;
CREATE POLICY "Users can delete own resume metadata"
  ON public.resumes FOR DELETE TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- Chat Conversations
DROP POLICY IF EXISTS "Users can view own conversations" ON public.chat_conversations;
CREATE POLICY "Users can view own conversations"
  ON public.chat_conversations FOR SELECT TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own conversations" ON public.chat_conversations;
CREATE POLICY "Users can insert own conversations"
  ON public.chat_conversations FOR INSERT TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own conversations" ON public.chat_conversations;
CREATE POLICY "Users can update own conversations"
  ON public.chat_conversations FOR UPDATE TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own conversations" ON public.chat_conversations;
CREATE POLICY "Users can delete own conversations"
  ON public.chat_conversations FOR DELETE TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- Chat Messages
DROP POLICY IF EXISTS "Users can view messages from own conversations" ON public.chat_messages;
CREATE POLICY "Users can view messages from own conversations"
  ON public.chat_messages FOR SELECT TO authenticated
  USING (
    firebase_uid = (auth.jwt()->>'sub')
    AND EXISTS (
      SELECT 1 FROM public.chat_conversations c
      WHERE c.id = conversation_id AND c.firebase_uid = (auth.jwt()->>'sub')
    )
  );

DROP POLICY IF EXISTS "Users can insert messages into own conversations" ON public.chat_messages;
CREATE POLICY "Users can insert messages into own conversations"
  ON public.chat_messages FOR INSERT TO authenticated
  WITH CHECK (
    firebase_uid = (auth.jwt()->>'sub')
    AND role = 'user'
    AND EXISTS (
      SELECT 1 FROM public.chat_conversations c
      WHERE c.id = conversation_id AND c.firebase_uid = (auth.jwt()->>'sub')
    )
  );

DROP POLICY IF EXISTS "Users can update own messages" ON public.chat_messages;
CREATE POLICY "Users can update own messages"
  ON public.chat_messages FOR UPDATE TO authenticated
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

DROP POLICY IF EXISTS "Users can delete own messages" ON public.chat_messages;
CREATE POLICY "Users can delete own messages"
  ON public.chat_messages FOR DELETE TO authenticated
  USING (
    firebase_uid = (auth.jwt()->>'sub')
    AND EXISTS (
      SELECT 1 FROM public.chat_conversations c
      WHERE c.id = conversation_id AND c.firebase_uid = (auth.jwt()->>'sub')
    )
  );

-- Roadmap Progress
DROP POLICY IF EXISTS "Users can view own roadmap progress" ON public.roadmap_progress;
CREATE POLICY "Users can view own roadmap progress"
  ON public.roadmap_progress FOR SELECT TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own roadmap progress" ON public.roadmap_progress;
CREATE POLICY "Users can insert own roadmap progress"
  ON public.roadmap_progress FOR INSERT TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own roadmap progress" ON public.roadmap_progress;
CREATE POLICY "Users can update own roadmap progress"
  ON public.roadmap_progress FOR UPDATE TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own roadmap progress" ON public.roadmap_progress;
CREATE POLICY "Users can delete own roadmap progress"
  ON public.roadmap_progress FOR DELETE TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- Achievements
DROP POLICY IF EXISTS "Anyone can read achievements catalog" ON public.achievements;
CREATE POLICY "Anyone can read achievements catalog"
  ON public.achievements FOR SELECT TO authenticated, anon
  USING (true);

-- User Achievements (Direct client INSERT revoked; unlocked exclusively through verified RPC)
DROP POLICY IF EXISTS "Users can view own unlocked achievements" ON public.user_achievements;
CREATE POLICY "Users can view own unlocked achievements"
  ON public.user_achievements FOR SELECT TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can unlock own achievements" ON public.user_achievements;

-- ==============================================================================
-- PART 9: HARDENED RPC FUNCTIONS (GEMINI ASSISTANT REPLIES & VERIFIED ACHIEVEMENTS)
-- ==============================================================================
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

  -- Verify conversation belongs to this student
  IF NOT EXISTS (
    SELECT 1 FROM public.chat_conversations
    WHERE id = p_conversation_id AND firebase_uid = v_firebase_uid
  ) THEN
    RAISE EXCEPTION 'Forbidden: Conversation not found or access denied';
  END IF;

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

  SELECT id INTO v_achievement_id
  FROM public.achievements
  WHERE achievement_code = p_achievement_code;

  IF v_achievement_id IS NULL THEN
    RETURN FALSE;
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.user_achievements
    WHERE firebase_uid = v_firebase_uid AND achievement_id = v_achievement_id
  ) THEN
    RETURN TRUE;
  END IF;

  CASE p_achievement_code
    WHEN 'first_mission' THEN
      SELECT EXISTS (
        SELECT 1 FROM public.roadmap_progress
        WHERE firebase_uid = v_firebase_uid
          AND (p_career_id IS NULL OR career_id = p_career_id)
          AND (cardinality(completed_missions) >= 1 OR array_length(completed_missions, 1) >= 1)
      ) INTO v_is_eligible;

    WHEN 'stage_ascension' THEN
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

-- ==============================================================================
-- PART 12: STUDENT PROJECTS & GITHUB PORTFOLIO ANALYSIS
-- ==============================================================================
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

CREATE INDEX IF NOT EXISTS idx_student_projects_firebase_uid ON public.student_projects (firebase_uid);
CREATE INDEX IF NOT EXISTS idx_student_projects_created_at ON public.student_projects (created_at DESC);

DROP TRIGGER IF EXISTS trg_student_projects_updated_at ON public.student_projects;
CREATE TRIGGER trg_student_projects_updated_at
  BEFORE UPDATE ON public.student_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.student_projects ENABLE ROW LEVEL SECURITY;

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

GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_projects TO authenticated;
GRANT SELECT ON public.student_projects TO anon;

-- ==============================================================================
-- PART 13: REMOVE STUDENT PROJECTS FEATURE (COMPENSATING CLEANUP)
-- ==============================================================================
DROP TRIGGER IF EXISTS trg_student_projects_updated_at ON public.student_projects;
DROP TABLE IF EXISTS public.student_projects CASCADE;

-- ==============================================================================
-- PART 15: CAREER RECOMMENDATION SNAPSHOTS & CV CACHING
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

CREATE INDEX IF NOT EXISTS idx_rec_snapshots_user_active 
  ON public.career_recommendation_snapshots (firebase_uid, is_active);

CREATE INDEX IF NOT EXISTS idx_rec_snapshots_user_hash 
  ON public.career_recommendation_snapshots (firebase_uid, cv_hash);

CREATE INDEX IF NOT EXISTS idx_rec_snapshots_created_at 
  ON public.career_recommendation_snapshots (created_at DESC);

DROP TRIGGER IF EXISTS trg_career_recommendation_snapshots_updated_at ON public.career_recommendation_snapshots;
CREATE TRIGGER trg_career_recommendation_snapshots_updated_at
  BEFORE UPDATE ON public.career_recommendation_snapshots
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.career_recommendation_snapshots ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.career_recommendation_snapshots TO authenticated;
GRANT ALL ON public.career_recommendation_snapshots TO service_role;

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

-- ==============================================================================
-- PART 16: JOBS & STUDENT JOB RECOMMENDATIONS (ADZUNA & GEMINI 2.5 FLASH-LITE)
-- ==============================================================================
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

CREATE INDEX IF NOT EXISTS idx_jobs_provider_id ON public.jobs (provider, provider_job_id);
CREATE INDEX IF NOT EXISTS idx_jobs_active_posted ON public.jobs (is_active, posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_content_hash ON public.jobs (content_hash);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON public.jobs (category);

DROP TRIGGER IF EXISTS trg_jobs_updated_at ON public.jobs;
CREATE TRIGGER trg_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

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

CREATE INDEX IF NOT EXISTS idx_student_job_rec_user_score 
  ON public.student_job_recommendations (firebase_uid, match_score DESC);
CREATE INDEX IF NOT EXISTS idx_student_job_rec_job_id 
  ON public.student_job_recommendations (job_id);

DROP TRIGGER IF EXISTS trg_student_job_recommendations_updated_at ON public.student_job_recommendations;
CREATE TRIGGER trg_student_job_recommendations_updated_at
  BEFORE UPDATE ON public.student_job_recommendations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

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

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_job_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_sync_logs ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.jobs TO authenticated;
GRANT ALL ON public.jobs TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_job_recommendations TO authenticated;
GRANT ALL ON public.student_job_recommendations TO service_role;

GRANT SELECT ON public.job_sync_logs TO authenticated;
GRANT ALL ON public.job_sync_logs TO service_role;

DROP POLICY IF EXISTS "Authenticated users can read active jobs" ON public.jobs;
CREATE POLICY "Authenticated users can read active jobs"
  ON public.jobs FOR SELECT
  TO authenticated
  USING (is_active = true);

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

DROP POLICY IF EXISTS "Authenticated users can view job sync logs" ON public.job_sync_logs;
CREATE POLICY "Authenticated users can view job sync logs"
  ON public.job_sync_logs FOR SELECT
  TO authenticated
  USING (true);





