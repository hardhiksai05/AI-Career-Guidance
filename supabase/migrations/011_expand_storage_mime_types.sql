-- ==============================================================================
-- MIGRATION 011: EXPAND STORAGE BUCKET ALLOWED MIME TYPES
-- Description: Updates 'student-resumes' bucket to allow universal chat attachments
-- (PDF, Word, Excel, PPTX, Images PNG/JPG/WEBP, Markdown, CSV, RTF) up to 25MB.
-- ==============================================================================

UPDATE storage.buckets
SET
  file_size_limit = 26214400, -- 25MB in bytes
  allowed_mime_types = ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-powerpoint',
    'text/plain',
    'text/markdown',
    'text/csv',
    'application/rtf',
    'application/json',
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/jpg',
    'application/octet-stream'
  ]
WHERE id = 'student-resumes';

