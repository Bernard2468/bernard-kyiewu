import { supabase } from '@/lib/supabase';

/**
 * Admin write helpers — ported from `profile/admin/app.js`.
 * Editors call `supabase.from(...)` directly for plain insert/update/delete;
 * these cover the cases that need extra care (singleton profile, reordering,
 * storage upload).
 */

/**
 * Save to the singleton `site_profile` row. Always re-fetches the real row id
 * first to avoid creating duplicates (mirrors `saveProfile` in admin/app.js).
 */
export async function saveProfile(
  data: Record<string, unknown>,
): Promise<{ error: { message: string } | null }> {
  const { data: rows } = await supabase
    .from('site_profile')
    .select('id')
    .order('id')
    .limit(1);
  const existingId = rows?.[0]?.id;
  if (existingId) {
    const { error } = await supabase.from('site_profile').update(data).eq('id', existingId);
    return { error };
  }
  const { error } = await supabase.from('site_profile').insert(data);
  return { error };
}

/**
 * Swap the `sort_order` of item[idx] with its neighbour in `dir` (-1 up / +1
 * down). No-op at the edges. Mirrors `reorder` in admin/app.js.
 */
export async function reorder<T extends { id: number }>(
  table: string,
  orderField: string,
  items: T[],
  idx: number,
  dir: number,
): Promise<void> {
  const swap = idx + dir;
  if (swap < 0 || swap >= items.length) return;
  const a = items[idx];
  const b = items[swap];
  const aVal = (a as Record<string, unknown>)[orderField];
  const bVal = (b as Record<string, unknown>)[orderField];
  await Promise.all([
    supabase.from(table).update({ [orderField]: bVal }).eq('id', a.id),
    supabase.from(table).update({ [orderField]: aVal }).eq('id', b.id),
  ]);
}

/**
 * Upload a photo to the public `profile` storage bucket and return its public
 * URL. Mirrors `handlePhotoUpload` in admin/app.js.
 */
export async function uploadPhoto(file: File): Promise<{ publicUrl: string | null; error: string | null }> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png';
  const filename = `avatar_${Date.now()}.${ext}`;
  const { error: upErr } = await supabase.storage
    .from('profile')
    .upload(filename, file, { upsert: true });
  if (upErr) return { publicUrl: null, error: upErr.message };
  const {
    data: { publicUrl },
  } = supabase.storage.from('profile').getPublicUrl(filename);
  return { publicUrl, error: null };
}

/**
 * Upload a CV (PDF) to the public `profile` storage bucket and return its public
 * URL. Same bucket/policies as photos; stored under a `cv_` prefix.
 */
export async function uploadCv(file: File): Promise<{ publicUrl: string | null; error: string | null }> {
  const filename = `cv_${Date.now()}.pdf`;
  const { error: upErr } = await supabase.storage
    .from('profile')
    .upload(filename, file, { upsert: true, contentType: 'application/pdf' });
  if (upErr) return { publicUrl: null, error: upErr.message };
  const {
    data: { publicUrl },
  } = supabase.storage.from('profile').getPublicUrl(filename);
  return { publicUrl, error: null };
}
