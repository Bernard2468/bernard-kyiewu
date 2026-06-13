import { useEffect, useState } from 'react';
import { saveProfile } from '@/lib/adminApi';
import { useAdmin } from '@/components/admin/context';

const FIELDS = [
  { key: 'scholar_url', label: 'Google Scholar URL', placeholder: 'https://scholar.google.com/citations?user=…' },
  { key: 'orcid_url', label: 'ORCID URL', placeholder: 'https://orcid.org/0000-0000-0000-0000' },
  { key: 'researchgate_url', label: 'ResearchGate URL', placeholder: 'https://www.researchgate.net/profile/…' },
  { key: 'linkedin_url', label: 'LinkedIn URL', placeholder: 'https://www.linkedin.com/in/…' },
  { key: 'github_url', label: 'GitHub URL', placeholder: 'https://github.com/…' },
] as const;

type Key = (typeof FIELDS)[number]['key'];

export function SocialEditor() {
  const { data, reload, notify, showSaved } = useAdmin();
  const p = data.profile;

  const [form, setForm] = useState<Record<Key, string>>(
    () => Object.fromEntries(FIELDS.map((f) => [f.key, (p?.[f.key] as string) || ''])) as Record<Key, string>,
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(Object.fromEntries(FIELDS.map((f) => [f.key, (p?.[f.key] as string) || ''])) as Record<Key, string>);
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
      </div>
    </>
  );
}
