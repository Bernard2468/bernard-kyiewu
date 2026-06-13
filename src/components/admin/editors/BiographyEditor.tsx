import { useEffect, useState } from 'react';
import { saveProfile } from '@/lib/adminApi';
import { useAdmin } from '@/components/admin/context';

export function BiographyEditor() {
  const { data, reload, notify, showSaved } = useAdmin();
  const [bio, setBio] = useState(data.profile?.biography || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setBio(data.profile?.biography || '');
  }, [data.profile]);

  const onSave = async () => {
    setSaving(true);
    const { error } = await saveProfile({ biography: bio, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) {
      notify(error.message, 'error');
      return;
    }
    notify('Biography saved');
    showSaved();
    reload();
  };

  return (
    <>
      <div className="editor-header">
        <div>
          <div className="editor-title">Biography</div>
          <div className="editor-desc">
            HTML supported. Use &lt;p&gt; tags for paragraphs, or separate paragraphs with a blank line.
          </div>
        </div>
        <button className="btn-primary" onClick={onSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      <div className="bio-editor">
        <div className="field-group">
          <label>Content</label>
          <textarea className="tall" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
      </div>
    </>
  );
}
