-- ==============================================================================
-- MIGRATION 008: ROW LEVEL SECURITY (RLS) POLICIES
-- Description: Enforces strict tenant data isolation using the Firebase JWT
-- subject claim: (auth.jwt()->>'sub') = firebase_uid.
-- ==============================================================================

-- 1. Enable Row Level Security on all application tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- PROFILES POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;
CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- ------------------------------------------------------------------------------
-- CAREER PREFERENCES POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own career preferences" ON public.career_preferences;
CREATE POLICY "Users can view own career preferences"
  ON public.career_preferences FOR SELECT
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own career preferences" ON public.career_preferences;
CREATE POLICY "Users can insert own career preferences"
  ON public.career_preferences FOR INSERT
  TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own career preferences" ON public.career_preferences;
CREATE POLICY "Users can update own career preferences"
  ON public.career_preferences FOR UPDATE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own career preferences" ON public.career_preferences;
CREATE POLICY "Users can delete own career preferences"
  ON public.career_preferences FOR DELETE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- ------------------------------------------------------------------------------
-- RESUMES METADATA POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own resume metadata" ON public.resumes;
CREATE POLICY "Users can view own resume metadata"
  ON public.resumes FOR SELECT
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own resume metadata" ON public.resumes;
CREATE POLICY "Users can insert own resume metadata"
  ON public.resumes FOR INSERT
  TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own resume metadata" ON public.resumes;
CREATE POLICY "Users can update own resume metadata"
  ON public.resumes FOR UPDATE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own resume metadata" ON public.resumes;
CREATE POLICY "Users can delete own resume metadata"
  ON public.resumes FOR DELETE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- ------------------------------------------------------------------------------
-- CHAT CONVERSATIONS POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own conversations" ON public.chat_conversations;
CREATE POLICY "Users can view own conversations"
  ON public.chat_conversations FOR SELECT
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own conversations" ON public.chat_conversations;
CREATE POLICY "Users can insert own conversations"
  ON public.chat_conversations FOR INSERT
  TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own conversations" ON public.chat_conversations;
CREATE POLICY "Users can update own conversations"
  ON public.chat_conversations FOR UPDATE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own conversations" ON public.chat_conversations;
CREATE POLICY "Users can delete own conversations"
  ON public.chat_conversations FOR DELETE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- ------------------------------------------------------------------------------
-- CHAT MESSAGES POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view messages from own conversations" ON public.chat_messages;
CREATE POLICY "Users can view messages from own conversations"
  ON public.chat_messages FOR SELECT
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert messages into own conversations" ON public.chat_messages;
CREATE POLICY "Users can insert messages into own conversations"
  ON public.chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own messages" ON public.chat_messages;
CREATE POLICY "Users can update own messages"
  ON public.chat_messages FOR UPDATE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own messages" ON public.chat_messages;
CREATE POLICY "Users can delete own messages"
  ON public.chat_messages FOR DELETE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- ------------------------------------------------------------------------------
-- ROADMAP PROGRESS POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own roadmap progress" ON public.roadmap_progress;
CREATE POLICY "Users can view own roadmap progress"
  ON public.roadmap_progress FOR SELECT
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can insert own roadmap progress" ON public.roadmap_progress;
CREATE POLICY "Users can insert own roadmap progress"
  ON public.roadmap_progress FOR INSERT
  TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can update own roadmap progress" ON public.roadmap_progress;
CREATE POLICY "Users can update own roadmap progress"
  ON public.roadmap_progress FOR UPDATE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'))
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can delete own roadmap progress" ON public.roadmap_progress;
CREATE POLICY "Users can delete own roadmap progress"
  ON public.roadmap_progress FOR DELETE
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

-- ------------------------------------------------------------------------------
-- ACHIEVEMENTS CATALOG POLICIES (Read-only for all users)
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can read achievements catalog" ON public.achievements;
CREATE POLICY "Anyone can read achievements catalog"
  ON public.achievements FOR SELECT
  TO authenticated, anon
  USING (true);

-- ------------------------------------------------------------------------------
-- USER ACHIEVEMENTS POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own unlocked achievements" ON public.user_achievements;
CREATE POLICY "Users can view own unlocked achievements"
  ON public.user_achievements FOR SELECT
  TO authenticated
  USING (firebase_uid = (auth.jwt()->>'sub'));

DROP POLICY IF EXISTS "Users can unlock own achievements" ON public.user_achievements;
CREATE POLICY "Users can unlock own achievements"
  ON public.user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (firebase_uid = (auth.jwt()->>'sub'));

