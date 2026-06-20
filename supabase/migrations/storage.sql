-- Run in Supabase SQL Editor: Storage → or SQL → New query
-- Public bucket for profile photo uploads (name: profile)

INSERT INTO storage.buckets (id, name, public)
VALUES ('profile', 'profile', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public read profile bucket" ON storage.objects;
CREATE POLICY "Public read profile bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile');

DROP POLICY IF EXISTS "Authenticated upload profile bucket" ON storage.objects;
CREATE POLICY "Authenticated upload profile bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'profile');

DROP POLICY IF EXISTS "Authenticated update profile bucket" ON storage.objects;
CREATE POLICY "Authenticated update profile bucket"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'profile');

DROP POLICY IF EXISTS "Authenticated delete profile bucket" ON storage.objects;
CREATE POLICY "Authenticated delete profile bucket"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'profile');
