import { useEffect, useRef, useState } from 'react';
import { saveProfile, uploadCv } from '@/lib/adminApi';
import { useAdmin } from '@/components/admin/context';

const FIELDS = [
  { key: 'scholar_url', label: 'Google Scholar URL', placeholder: 'https://scholar.google.com/citations?user=…' },
  { key: 'orcid_url', label: 'ORCID URL', placeholder: 'https://orcid.org/0000-0000-0000-0000' },
  { key: 'researchgate_url', label: 'ResearchGate URL', placeholder: 'https://www.researchgate.net/profile/…' },
  { key: 'linkedin_url', label: 'LinkedIn URL', placeholder: 'https://www.linkedin.com/in/…' },
  { key: 'github_url', label: 'GitHub URL', placeholder: 'https://github.com/…' },
] as const;

type Key = (typeof FIELDS)[number]['key'];

// Document icon shown in the CV upload card.
const PdfIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function SocialEditor() {
  const { data, reload, notify, showSaved } = useAdmin();
  const p = data.profile;

  const [form, setForm] = useState<Record<Key, string>>(
    () => Object.fromEntries(FIELDS.map((f) => [f.key, (p?.[f.key] as string) || ''])) as Record<Key, string>,
  );
  const [saving, setSaving] = useState(false);

  const [cvUrl, setCvUrl] = useState(p?.cv_url || '');
  const [cvDragover, setCvDragover] = useState(false);
  const [cvProgress, setCvProgress] = useState<string | null>(null);
  const cvFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(Object.fromEntries(FIELDS.map((f) => [f.key, (p?.[f.key] as string) || ''])) as Record<Key, string>);
    setCvUrl(p?.cv_url || '');
  }, [p]);

  const onSave = async () => {
    setSaving(true);
    const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
    FIELDS.forEach((f) => (payload[f.key] = form[f.key].trim()));
    const { error } = await saveProfile(payload);
    setSaving(false);
    if (error) {
      notify(error.message, 'error');
      return;
    }
    notify('Social links saved');
    showSaved();
    reload();
  };

  const handleCvFile = async (file: File) => {
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      notify('Please choose a PDF file', 'error');
      return;
    }
    setCvProgress('Uploading…');
    const { publicUrl, error } = await uploadCv(file);
    if (error || !publicUrl) {
      setCvProgress(null);
      notify(error || 'Upload failed', 'error');
      return;
    }
    const { error: saveErr } = await saveProfile({ cv_url: publicUrl, updated_at: new Date().toISOString() });
    if (saveErr) {
      setCvProgress(null);
      notify(saveErr.message, 'error');
      return;
    }
    setCvProgress('Saved!');
    setTimeout(() => setCvProgress(null), 1500);
    setCvUrl(publicUrl);
    notify('CV uploaded');
    showSaved();
    reload();
  };

  const removeCv = async () => {
    const { error } = await saveProfile({ cv_url: '', updated_at: new Date().toISOString() });
    if (error) {
      notify(error.message, 'error');
      return;
    }
    setCvUrl('');
    notify('CV removed');
    showSaved();
    reload();
  };

  return (
    <>
      <div className="editor-header">
        <div>
          <div className="editor-title">Social Links</div>
          <div className="editor-desc">Links shown in the header. Leave blank to hide a link.</div>
        </div>
        <button className="btn-primary" onClick={onSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      <div className="profile-form">
        {FIELDS.map((f) => (
          <div className="field-group" key={f.key}>
            <label>{f.label}</label>
            <input
              type="url"
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
            />
          </div>
        ))}

        <div className="form-section-label">Curriculum Vitae (CV)</div>
        <div className="cv-upload">
          {cvUrl ? (
            <div className="cv-card">
              <span className="cv-card-icon">{PdfIcon}</span>
              <div className="cv-card-info">
                <strong>CV attached</strong>
                <span>Visitors can view or download it from your homepage.</span>
              </div>
              <div className="cv-card-actions">
                <a className="btn-secondary" href={cvUrl} target="_blank" rel="noopener noreferrer">
                  View
                </a>
                <button type="button" className="btn-ghost" onClick={() => cvFileRef.current?.click()}>
                  Replace
                </button>
                <button type="button" className="btn-danger" onClick={removeCv}>
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`photo-upload-area cv-upload-area${cvDragover ? ' dragover' : ''}`}
              onClick={() => cvFileRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setCvDragover(true);
              }}
              onDragLeave={() => setCvDragover(false)}
              onDrop={(e) => {
                e.preventDefault();
                setCvDragover(false);
                const f = e.dataTransfer.files[0];
                if (f) handleCvFile(f);
              }}
            >
              <span className="cv-upload-icon">{PdfIcon}</span>
              <p className="photo-upload-hint">
                <strong>Click or drag</strong> to upload your CV (PDF)
              </p>
              <p className="photo-upload-hint" style={{ fontSize: '0.73rem', marginTop: '0.2rem' }}>
                Saved to the <code>profile</code> Supabase Storage bucket
              </p>
            </div>
          )}
          {cvProgress && <p className="upload-progress">{cvProgress}</p>}
          <input
            ref={cvFileRef}
            type="file"
            accept="application/pdf,.pdf"
            style={{ display: 'none' }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleCvFile(f);
              e.target.value = '';
            }}
          />
        </div>
      </div>
    </>
  );
}
