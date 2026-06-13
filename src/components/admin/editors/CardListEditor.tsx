import { useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { reorder } from '@/lib/adminApi';
import { useAdmin } from '@/components/admin/context';
import { Modal, OrderButtons, VisibilityToggle } from '@/components/admin/ui';

export type FormValues = Record<string, string>;

export interface CardListConfig<T> {
  table: string;
  title: string;
  desc?: string;
  addLabel?: string;
  modalAdd: string;
  modalEdit: string;
  wide?: boolean;
  hasVisible?: boolean;
  emptyState?: string;
  cardTitle: (item: T) => string;
  cardSub?: (item: T) => string;
  emptyValues: FormValues;
  itemToValues: (item: T) => FormValues;
  toPayload: (values: FormValues) => Record<string, unknown>;
  renderForm: (values: FormValues, set: (k: string, v: string) => void) => ReactNode;
}

/**
 * Generic add/edit/delete/reorder/visibility list editor — covers news,
 * research, awards, education, teaching, service and custom pages. Mirrors the
 * `renderListEditor`/`bind*Editor` pattern from admin/app.js, with the edit
 * pre-fill bug fixed (the form is populated before the modal opens).
 */
export function CardListEditor<T extends { id: number; visible?: boolean }>({
  items,
  config,
}: {
  items: T[];
  config: CardListConfig<T>;
}) {
  const { reload, notify, showSaved } = useAdmin();
  const [modal, setModal] = useState<null | { mode: 'add' | 'edit'; id?: number }>(null);
  const [values, setValues] = useState<FormValues>(config.emptyValues);
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: string) => setValues((prev) => ({ ...prev, [k]: v }));

  const openAdd = () => {
    setValues(config.emptyValues);
    setModal({ mode: 'add' });
  };
  const openEdit = (item: T) => {
    setValues(config.itemToValues(item));
    setModal({ mode: 'edit', id: item.id });
  };
  const close = () => setModal(null);

  const save = async () => {
    setSaving(true);
    const payload = config.toPayload(values);
    if (modal?.mode === 'add') {
      await supabase.from(config.table).insert({ ...payload, sort_order: items.length + 1 });
      notify('Added');
    } else if (modal?.mode === 'edit') {
      await supabase.from(config.table).update(payload).eq('id', modal.id);
      notify('Saved');
    }
    setSaving(false);
    showSaved();
    close();
    reload();
  };

  const del = async (id: number) => {
    if (!window.confirm('Delete this item?')) return;
    await supabase.from(config.table).delete().eq('id', id);
    notify('Deleted');
    reload();
  };

  const move = async (idx: number, dir: number) => {
    await reorder(config.table, 'sort_order', items, idx, dir);
    reload();
  };

  const toggleVisible = async (item: T, next: boolean) => {
    await supabase.from(config.table).update({ visible: next }).eq('id', item.id);
    showSaved();
    reload();
  };

  return (
    <>
      <div className="editor-header">
        <div>
          <div className="editor-title">{config.title}</div>
          {config.desc && <div className="editor-desc">{config.desc}</div>}
        </div>
        <button className="btn-primary" onClick={openAdd}>
          {config.addLabel || '+ Add'}
        </button>
      </div>

      <div className="item-list">
        {items.length ? (
          items.map((item, i) => (
            <div className="item-card" key={item.id}>
              <OrderButtons idx={i} total={items.length} onMove={(d) => move(i, d)} />
              <div className="item-card-body">
                <div className="item-card-title">{config.cardTitle(item)}</div>
                {config.cardSub && config.cardSub(item) ? (
                  <div className="item-card-sub">{config.cardSub(item)}</div>
                ) : null}
              </div>
              <div className="item-card-actions">
                {config.hasVisible && (
                  <VisibilityToggle
                    checked={Boolean(item.visible)}
                    onChange={(n) => toggleVisible(item, n)}
                  />
                )}
                <button className="btn-secondary btn-edit" onClick={() => openEdit(item)}>
                  Edit
                </button>
                <button className="btn-danger" onClick={() => del(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">{config.emptyState || 'No items yet.'}</div>
        )}
      </div>

      {modal && (
        <Modal
          title={modal.mode === 'add' ? config.modalAdd : config.modalEdit}
          wide={config.wide}
          saving={saving}
          onClose={close}
          onSave={save}
        >
          {config.renderForm(values, set)}
        </Modal>
      )}
    </>
  );
}
