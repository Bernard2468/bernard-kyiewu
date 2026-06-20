import { useEffect, useRef, useState } from 'react';
import { saveProfile, uploadPhoto, deleteStorageFile } from '@/lib/adminApi';
import { useAdmin } from '@/components/admin/context';

const FIELDS = [
  'full_name',
  'name_alt',
  'title',
  'department_1',
  'department_2',
  'university',
  'address',
  'office',
  'phone',
  'email',
] as const;

type Field = (typeof FIELDS)[number];

export function ProfileEditor() {
  const { data, reload, notify, showSaved } = useAdmin();
  const p = data.profile;

  const [form, setForm] = useState<Record<Field, string>>(() =>
    Object.fromEntries(FIELDS.map((f) => [f, (p?.[f] as string) || ''])) as Record<Field, string>,
  );
  const [photoUrl, setPhotoUrl] = useState(p?.photo_url || '');
  const [saving, setSaving] = useState(false);
  const [dragover, setDragover] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(Object.fromEntries(FIELDS.map((f) => [f, (p?.[f] as string) || ''])) as Record<Field, string>);
    setPhotoUrl(p?.photo_url || '');
  }, [p]);

  const upd = (k: Field, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleFile = async (file: File) => {
    const previousUrl = photoUrl;
    setProgress('Uploading…');
    const { publicUrl, error } = await uploadPhoto(file);
    if (error || !publicUrl) {
      setProgress(null);
      notify(error || 'Upload failed', 'error');
      return;
    }
    await saveProfile({ photo_url: publicUrl, updated_at: new Date().toISOString() });
    // Clear out the photo we just replaced so old avatars don't linger publicly.
    if (previousUrl && previousUrl !== publicUrl) await deleteStorageFile(previousUrl);
    setProgress('Saved!');
    setTimeout(() => setProgress(null), 1500);
    setPhotoUrl(publicUrl);
    notify('Photo uploaded');
    showSaved();
    reload();
  };

  const onSave = async () => {
    setSaving(true);
    const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
    FIELDS.forEach((f) => (payload[f] = form[f].trim()));
    const { error } = await saveProfile(payload);
    setSaving(false);
    if (error) {
      notify(error.message, 'error');
      return;
    }
    notify('Profile saved');
    showSaved();
    reload();
  };

  return (
    <>
      <div className="editor-header">
        <div>
          <div className="editor-title">Profile Info</div>
          <div className="editor-desc">Your name, photo, title, affiliation and contact details.</div>
        </div>
      </div>

      <div className="profile-form">
        <div className="form-section-label">Photo</div>
        <div
          className={`photo-upload-area${dragover ? ' dragover' : ''}`}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragover(true);
          }}
          onDragLeave={() => setDragover(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragover(false);
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
          }}
        >
          {photoUrl ? (
            <img className="photo-preview" src={photoUrl} alt="Profile photo" />
          ) : (
            <div
              style={{
                width: 90,
                height: 112,
                background: 'var(--bg-subtle)',
                borderRadius: 4,
                margin: '0 auto 0.75rem',
                border: '1px solid var(--rule)',
              }}
            />
          )}
          <p className="photo-upload-hint">
            <strong>Click or drag</strong> to upload a new photo
          </p>
          <p className="photo-upload-hint" style={{ fontSize: '0.73rem', marginTop: '0.2rem' }}>
            Saved to the <code>profile</code> Supabase Storage bucket
          </p>
          {progress && <p className="upload-progress">{progress}</p>}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>

        <div className="form-section-label">Name</div>
        <div className="field-row">
          <div className="field-group">
            <label>Full Name</label>
            <input type="text" value={form.full_name} onChange={(e) => upd('full_name', e.target.value)} />
          </div>
          <div className="field-group">
            <label>Name (alternate / Chinese)</label>
            <input
              type="text"
              placeholder="（姓名）"
              value={form.name_alt}
              onChange={(e) => upd('name_alt', e.target.value)}
            />
          </div>
        </div>

        <div className="form-section-label">Position</div>
        <div className="field-group">
          <label>Title</label>
          <input type="text" value={form.title} onChange={(e) => upd('title', e.target.value)} />
        </div>

        <div className="form-section-label">Affiliation</div>
        <div className="field-group">
          <label>Primary Department / Lab</label>
          <input type="text" value={form.department_1} onChange={(e) => upd('department_1', e.target.value)} />
        </div>
        <div className="field-group">
          <label>Secondary Department (optional)</label>
          <input
            type="text"
            placeholder="e.g. Department of Computer Science (Courtesy)"
            value={form.department_2}
            onChange={(e) => upd('department_2', e.target.value)}
          />
        </div>
        <div className="field-group">
          <label>University / Institution</label>
          <input type="text" value={form.university} onChange={(e) => upd('university', e.target.value)} />
        </div>
        <div className="field-group">
          <label>Mailing Address</label>
          <input type="text" value={form.address} onChange={(e) => upd('address', e.target.value)} />
        </div>

        <div className="form-section-label">Contact</div>
        <div className="field-row">
          <div className="field-group">
            <label>Office</label>
            <input type="text" value={form.office} onChange={(e) => upd('office', e.target.value)} />
          </div>
          <div className="field-group">
            <label>Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => upd('phone', e.target.value)} />
          </div>
        </div>
        <div className="field-group">
          <label>Email</label>
          <input type="email" value={form.email} onChange={(e) => upd('email', e.target.value)} />
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <button className="btn-primary" onClick={onSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save Profile'}
          </button>
        </div>
      </div>
    </>
  );
}
