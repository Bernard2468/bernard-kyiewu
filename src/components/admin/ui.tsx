import type { ReactNode } from 'react';

// ── Icons (match admin/index.html) ────────────────────────────────────────────
export function BookIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={size} height={size}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ── Reorder ▲ / ▼ buttons ─────────────────────────────────────────────────────
export function OrderButtons({
  idx,
  total,
  onMove,
}: {
  idx: number;
  total: number;
  onMove: (dir: number) => void;
}) {
  return (
    <div className="order-btns">
      <button className="btn-order btn-up" disabled={idx === 0} title="Move up" onClick={() => onMove(-1)}>
        ▲
      </button>
      <button
        className="btn-order btn-down"
        disabled={idx === total - 1}
        title="Move down"
        onClick={() => onMove(1)}
      >
        ▼
      </button>
    </div>
  );
}

// ── Visibility toggle ─────────────────────────────────────────────────────────
export function VisibilityToggle({
  checked,
  onChange,
  label = 'Visible',
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
}) {
  return (
    <label className="toggle-wrap">
      <span className="toggle">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="toggle-track" />
        <span className="toggle-thumb" />
      </span>
      {label}
    </label>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
export function Modal({
  title,
  wide,
  saving,
  onClose,
  onSave,
  children,
}: {
  title: string;
  wide?: boolean;
  saving?: boolean;
  onClose: () => void;
  onSave: () => void;
  children: ReactNode;
}) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-box" style={wide ? { maxWidth: '720px' } : undefined}>
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onSave} disabled={saving}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
