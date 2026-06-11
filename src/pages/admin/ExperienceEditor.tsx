import { useEffect, useState } from 'react';
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { AdminHeading, Field } from '@/components/admin/AdminUI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { LoadingState, EmptyState } from '@/components/ui-kit/States';
import { experiences } from '@/hooks/data';
import type { Experience } from '@/types/database';

const KINDS = ['work', 'research', 'teaching', 'admin', 'field'];

type Draft = Partial<Experience> & { achievementsText?: string };

const emptyDraft: Draft = {
  title: '',
  organization: '',
  location: '',
  period: '',
  kind: 'work',
  is_current: false,
  achievementsText: '',
  sort_order: 0,
};

const ExperienceEditor = () => {
  const { data = [], isLoading } = experiences.useList();
  const create = experiences.useCreate();
  const update = experiences.useUpdate();
  const remove = experiences.useRemove();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const editingId = draft.id;

  const openNew = () => {
    setDraft({ ...emptyDraft, sort_order: (data.at(-1)?.sort_order ?? 0) + 10 });
    setOpen(true);
  };

  const openEdit = (exp: Experience) => {
    setDraft({ ...exp, achievementsText: (exp.achievements ?? []).join('\n') });
    setOpen(true);
  };

  const set = (key: keyof Draft, value: unknown) => setDraft((d) => ({ ...d, [key]: value }));

  const handleSubmit = async () => {
    const values = {
      title: draft.title?.trim() ?? '',
      organization: draft.organization?.trim() ?? '',
      location: draft.location ?? null,
      period: draft.period ?? null,
      kind: draft.kind ?? 'work',
      is_current: !!draft.is_current,
      sort_order: Number(draft.sort_order) || 0,
      achievements: (draft.achievementsText ?? '')
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
    };

    if (!values.title || !values.organization) {
      toast({ title: 'Title and organization are required', variant: 'destructive' });
      return;
    }

    try {
      if (editingId) {
        await update.mutateAsync({ id: editingId, values });
      } else {
        await create.mutateAsync(values);
      }
      toast({ title: editingId ? 'Experience updated' : 'Experience added' });
      setOpen(false);
    } catch (err) {
      toast({
        title: 'Save failed',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this experience? This cannot be undone.')) return;
    try {
      await remove.mutateAsync(id);
      toast({ title: 'Experience deleted' });
    } catch (err) {
      toast({
        title: 'Delete failed',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const saving = create.isPending || update.isPending;

  return (
    <>
      <AdminHeading
        title="Experience"
        description="Roles, research, and field experience shown on your CV timeline."
        action={
          <Button onClick={openNew} className="rounded-sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Add experience
          </Button>
        }
      />

      {isLoading && data.length === 0 ? (
        <LoadingState />
      ) : data.length === 0 ? (
        <EmptyState message="No experiences yet. Add your first role." />
      ) : (
        <ul className="divide-y divide-border border border-border">
          {data.map((exp) => (
            <li key={exp.id} className="flex items-start justify-between gap-4 bg-card p-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{exp.title}</p>
                  <span className="border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {exp.kind}
                  </span>
                  {exp.is_current && (
                    <span className="border border-primary px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-primary">
                      current
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {exp.organization}
                  {exp.period ? ` · ${exp.period}` : ''}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(exp)} aria-label="Edit">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(exp.id)}
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-sm sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editingId ? 'Edit experience' : 'Add experience'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <Field label="Title" htmlFor="title">
              <Input id="title" className="rounded-sm" value={draft.title ?? ''} onChange={(e) => set('title', e.target.value)} />
            </Field>
            <Field label="Organization" htmlFor="org">
              <Input id="org" className="rounded-sm" value={draft.organization ?? ''} onChange={(e) => set('organization', e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Period" htmlFor="period" hint="e.g. May 2025 – Present">
                <Input id="period" className="rounded-sm" value={draft.period ?? ''} onChange={(e) => set('period', e.target.value)} />
              </Field>
              <Field label="Kind" htmlFor="kind">
                <Select value={draft.kind} onValueChange={(v) => set('kind', v)}>
                  <SelectTrigger className="rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {KINDS.map((k) => (
                      <SelectItem key={k} value={k} className="capitalize">
                        {k}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Location" htmlFor="loc">
                <Input id="loc" className="rounded-sm" value={draft.location ?? ''} onChange={(e) => set('location', e.target.value)} />
              </Field>
              <Field label="Sort order" htmlFor="sort" hint="Lower shows first.">
                <Input
                  id="sort"
                  type="number"
                  className="rounded-sm"
                  value={draft.sort_order ?? 0}
                  onChange={(e) => set('sort_order', e.target.value)}
                />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-primary"
                checked={!!draft.is_current}
                onChange={(e) => set('is_current', e.target.checked)}
              />
              Current role
            </label>
            <Field label="Achievements" htmlFor="ach" hint="One bullet per line.">
              <Textarea
                id="ach"
                rows={6}
                className="rounded-sm"
                value={draft.achievementsText ?? ''}
                onChange={(e) => set('achievementsText', e.target.value)}
              />
            </Field>
          </div>

          <DialogFooter>
            <Button variant="outline" className="rounded-sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="rounded-sm" onClick={handleSubmit} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingId ? 'Save' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExperienceEditor;
