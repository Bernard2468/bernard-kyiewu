import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { reorder } from '@/lib/adminApi';
import { useAdmin } from '@/components/admin/context';
import { OrderButtons, VisibilityToggle } from '@/components/admin/ui';
import type { SiteSection } from '@/types/database';

type Draft = { label: string; visible: boolean };

const initDrafts = (sections: SiteSection[]): Record<number, Draft> =>
  Object.fromEntries(sections.map((s) => [s.id, { label: s.label, visible: s.visible }]));

export function SectionsEditor() {
  const { data, reload, notify, showSaved } = useAdmin();
  const sections = data.sections;
  const [drafts, setDrafts] = useState<Record<number, Draft>>(() => initDrafts(sections));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDrafts(initDrafts(sections));
  }, [sections]);

  const patch = (id: number, base: Draft, part: Partial<Draft>) =>
    setDrafts((prev) => ({ ...prev, [id]: { ...base, ...prev[id], ...part } }));

  const move = async (idx: number, dir: number) => {
    await reorder('site_sections', 'sort_order', sections, idx, dir);
    reload();
  };

  const saveAll = async () => {
    setSaving(true);
    await Promise.all(
      sections.map((s) => {
        const d = drafts[s.id];
        return supabase
          .from('site_sections')
          .update({ label: d?.label?.trim() || s.label, visible: d?.visible ?? s.visible })
          .eq('id', s.id);
      }),
    );
    setSaving(false);
    notify('Sections saved');
    showSaved();
    reload();
  };

  return (
    <>
      <div className="editor-header">
        <div>
          <div className="editor-title">Section Names</div>
          <div className="editor-desc">
            Rename sections, change their order, or hide them from the public site.
          </div>
        </div>
        <button className="btn-primary" onClick={saveAll} disabled={saving}>
          {saving ? 'Saving…' : 'Save All'}
        </button>
      </div>

      <div className="item-list">
        {sections.length ? (
          sections.map((s, i) => {
            const base: Draft = { label: s.label, visible: s.visible };
            return (
              <div className="section-row" key={s.id}>
                <OrderButtons idx={i} total={sections.length} onMove={(d) => move(i, d)} />
                <input
                  type="text"
                  value={drafts[s.id]?.label ?? s.label}
                  onChange={(e) => patch(s.id, base, { label: e.target.value })}
                />
                <span className="section-slug">{s.slug}</span>
                <VisibilityToggle
                  checked={drafts[s.id]?.visible ?? s.visible}
                  onChange={(n) => patch(s.id, base, { visible: n })}
                />
              </div>
            );
          })
        ) : (
          <div className="empty-state">No sections found. Run the SQL schema to seed defaults.</div>
        )}
      </div>
    </>
  );
}
