-- ==============================================================================
-- MIGRATION 007: STORAGE BUCKET & POLICIES
-- Description: Creates private 'student-resumes' bucket and secures access
-- with folder-level ownership based on Firebase UID (auth.jwt()->>'sub').
-- ==============================================================================

-- 1. Create the private bucket for student resumes
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'student-resumes',
  'student-resumes',
  false,
  10485760, -- 10MB in bytes
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

-- 2. Drop any legacy or conflicting storage policies
DROP POLICY IF EXISTS "Authenticated users can upload own resume" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view own resume" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update own resume" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete own resume" ON storage.objects;

-- 3. Storage Policy: INSERT (Upload)
-- Only authenticated users into their own {firebase_uid}/ folder
CREATE POLICY "Authenticated users can upload own resume"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'student-resumes' AND
    (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  );

-- 4. Storage Policy: SELECT (Download / Signed URLs)
-- Users can only view or generate download URLs for files in their own folder
CREATE POLICY "Authenticated users can view own resume"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'student-resumes' AND
    (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  );

-- 5. Storage Policy: UPDATE (Replace / Upsert)
-- Storage upsert requires both USING and WITH CHECK
CREATE POLICY "Authenticated users can update own resume"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'student-resumes' AND
    (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  )
  WITH CHECK (
    bucket_id = 'student-resumes' AND
    (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  );

-- 6. Storage Policy: DELETE (Remove document)
CREATE POLICY "Authenticated users can delete own resume"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'student-resumes' AND
    (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  );

