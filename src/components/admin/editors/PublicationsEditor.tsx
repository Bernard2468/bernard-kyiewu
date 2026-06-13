import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { reorder } from '@/lib/adminApi';
import { useAdmin } from '@/components/admin/context';
import { Modal, OrderButtons, VisibilityToggle } from '@/components/admin/ui';
import type { Publication } from '@/types/database';

type PubType = 'journal' | 'conference' | 'workshop';

const TABS: { key: PubType; label: string }[] = [
  { key: 'journal', label: 'Journals' },
  { key: 'conference', label: 'Conferences' },
  { key: 'workshop', label: 'Workshops' },
];

type PubForm = {
  pub_id: string;
  year: string;
  citation: string;
  award_note: string;
  pdf_url: string;
  doi_url: string;
  slides_url: string;
};

const EMPTY: PubForm = {
  pub_id: '',
  year: '',
  citation: '',
  award_note: '',
  pdf_url: '',
  doi_url: '',
  slides_url: '',
};

export function PublicationsEditor() {
  const { data, reload, notify, showSaved } = useAdmin();
  const pubs = data.pubs;
  const [tab, setTab] = useState<PubType>('journal');
  const [modal, setModal] = useState<null | { mode: 'add' | 'edit'; id?: number; type: PubType }>(null);
  const [values, setValues] = useState<PubForm>(EMPTY);
  const [saving, setSaving] = useState(false);

  const set = (k: keyof PubForm, v: string) => setValues((prev) => ({ ...prev, [k]: v }));
  const items = pubs.filter((p) => p.pub_type === tab);

  const openAdd = (type: PubType) => {
    setValues(EMPTY);
    setModal({ mode: 'add', type });
  };
  const openEdit = (p: Publication) => {
    setValues({
      pub_id: p.pub_id || '',
      year: p.year ? String(p.year) : '',
      citation: p.citation || '',
      award_note: p.award_note || '',
      pdf_url: p.pdf_url || '',
      doi_url: p.doi_url || '',
      slides_url: p.slides_url || '',
    });
    setModal({ mode: 'edit', id: p.id, type: p.pub_type as PubType });
  };
  const close = () => setModal(null);

  const payload = (type: PubType) => ({
    pub_type: type,
    pub_id: values.pub_id.trim(),
    citation: values.citation,
    award_note: values.award_note.trim(),
    pdf_url: values.pdf_url.trim(),
    doi_url: values.doi_url.trim(),
    slides_url: values.slides_url.trim(),
    year: values.year ? +values.year : null,
  });

  const save = async () => {
    if (!modal) return;
    setSaving(true);
    if (modal.mode === 'add') {
      await supabase.from('publications').insert({ ...payload(modal.type), sort_order: pubs.length + 1 });
      notify('Added');
    } else {
      await supabase.from('publications').update(payload(modal.type)).eq('id', modal.id);
      notify('Saved');
    }
    setSaving(false);
    showSaved();
    close();
    reload();
  };

  const del = async (id: number) => {
    if (!window.confirm('Delete publication?')) return;
    await supabase.from('publications').delete().eq('id', id);
    notify('Deleted');
    reload();
  };

  const move = async (idx: number, dir: number) => {
    await reorder('publications', 'sort_order', items, idx, dir);
    reload();
  };

  const toggleVisible = async (p: Publication, next: boolean) => {
    await supabase.from('publications').update({ visible: next }).eq('id', p.id);
    showSaved();
    reload();
  };

  return (
    <>
      <div className="editor-header">
        <div>
          <div className="editor-title">Publications</div>
          <div className="editor-desc">
            HTML is supported in the Citation field (for &lt;em&gt;, &lt;strong&gt;, &amp;ldquo;, etc.).
          </div>
        </div>
      </div>

      <div className="pub-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`pub-tab${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="pub-tab-panel">
        <div style={{ marginBottom: '0.75rem' }}>
          <button className="btn-primary" onClick={() => openAdd(tab)}>
            + Add
          </button>
        </div>
        <div className="item-list">
          {items.length ? (
            items.map((p, i) => (
              <div className="item-card" key={p.id}>
                <OrderButtons idx={i} total={items.length} onMove={(d) => move(i, d)} />
                <div className="item-card-body">
                  <div className="item-card-title">
                    {p.pub_id} · {(p.citation || '').replace(/<[^>]+>/g, '').slice(0, 70)}…
                  </div>
                  {p.award_note && (
                    <div className="item-card-sub" style={{ color: 'var(--accent-mid)' }}>
                      {p.award_note}
                    </div>
                  )}
                </div>
                <div className="item-card-actions">
                  <VisibilityToggle checked={Boolean(p.visible)} onChange={(n) => toggleVisible(p, n)} />
                  <button className="btn-secondary btn-edit" onClick={() => openEdit(p)}>
                    Edit
                  </button>
                  <button className="btn-danger" onClick={() => del(p.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">No entries.</div>
          )}
        </div>
      </div>

      {modal && (
        <Modal
          title={modal.mode === 'add' ? `Add ${modal.type} publication` : 'Edit Publication'}
          wide
          saving={saving}
          onClose={close}
          onSave={save}
        >
          <div className="field-row">
            <div className="field-group">
              <label>Publication ID</label>
              <input
                type="text"
                placeholder="J5 / C8 / W1"
                value={values.pub_id}
                onChange={(e) => set('pub_id', e.target.value)}
              />
            </div>
            <div className="field-group">
              <label>Year</label>
              <input
                type="number"
                min={1900}
                max={2200}
                placeholder="2024"
                value={values.year}
                onChange={(e) => set('year', e.target.value)}
              />
            </div>
          </div>
          <div className="field-group">
            <label>Full Citation (HTML)</label>
            <textarea
              className="tall"
              placeholder="Authors, “Title,” Venue, Year."
              value={values.citation}
              onChange={(e) => set('citation', e.target.value)}
            />
          </div>
          <div className="field-group">
            <label>Award Note (leave blank if none)</label>
            <input type="text" value={values.award_note} onChange={(e) => set('award_note', e.target.value)} />
          </div>
          <div className="field-row">
            <div className="field-group">
              <label>PDF URL</label>
              <input type="url" value={values.pdf_url} onChange={(e) => set('pdf_url', e.target.value)} />
            </div>
            <div className="field-group">
              <label>DOI URL</label>
              <input type="url" value={values.doi_url} onChange={(e) => set('doi_url', e.target.value)} />
            </div>
          </div>
          <div className="field-group">
            <label>Slides URL</label>
            <input type="url" value={values.slides_url} onChange={(e) => set('slides_url', e.target.value)} />
          </div>
        </Modal>
      )}
    </>
  );
}
