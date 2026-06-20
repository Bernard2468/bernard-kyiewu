-- =====================================================================
-- supabase/migrations/storage.sql
-- Public `profile` storage bucket for profile-photo uploads.
-- Run AFTER schema.sql, once, in the Supabase SQL editor.
-- Idempotent: drops/recreates its own policies.
-- =====================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('profile', 'profile', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop our own policies first so this is safe to re-run.
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname IN (
        'profile_public_read','profile_auth_insert',
        'profile_auth_update','profile_auth_delete'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', r.policyname);
  END LOOP;
END $$;

-- Anyone can read photos; only logged-in admins can upload/replace/delete.
CREATE POLICY "profile_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile');

CREATE POLICY "profile_auth_insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'profile');

CREATE POLICY "profile_auth_update"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'profile');

CREATE POLICY "profile_auth_delete"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'profile');
