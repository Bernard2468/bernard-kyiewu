import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { AdminHeading, Field } from '@/components/admin/AdminUI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { LoadingState } from '@/components/ui-kit/States';
import { useProfile, useUpdateProfile } from '@/hooks/data';
import type { LongBioCard, Profile } from '@/types/database';

const linesToArray = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean);
const arrayToLines = (a?: string[]) => (a ?? []).join('\n');

const ProfileEditor = () => {
  const { data: profile, isLoading } = useProfile();
  const update = useUpdateProfile();
  const { toast } = useToast();

  const [form, setForm] = useState<Partial<Profile>>({});
  const [rolesText, setRolesText] = useState('');
  const [badgesText, setBadgesText] = useState('');
  const [cards, setCards] = useState<LongBioCard[]>([]);

  useEffect(() => {
    if (!profile) return;
    setForm(profile);
    setRolesText(arrayToLines(profile.roles));
    setBadgesText(arrayToLines(profile.badges));
    setCards(profile.long_bio ?? []);
  }, [profile]);

  if (isLoading && !profile) return <LoadingState className="min-h-[40vh]" />;
  if (!profile) {
    return (
      <>
        <AdminHeading title="Profile" />
        <p className="text-sm text-muted-foreground">
          No profile row found. Run <code>supabase/seed.sql</code> to create one.
        </p>
      </>
    );
  }

  const set = (key: keyof Profile, value: unknown) => setForm((f) => ({ ...f, [key]: value }));
  const setSocial = (key: string, value: string) =>
    setForm((f) => ({ ...f, socials: { ...(f.socials ?? {}), [key]: value } }));

  const handleSave = async () => {
    try {
      await update.mutateAsync({
        id: profile.id,
        values: {
          full_name: form.full_name,
          headline: form.headline,
          hero_tagline: form.hero_tagline,
          short_bio: form.short_bio,
          avatar_url: form.avatar_url,
          location: form.location,
          email: form.email,
          phone: form.phone,
          cv_url: form.cv_url,
          socials: form.socials ?? {},
          roles: linesToArray(rolesText),
          badges: linesToArray(badgesText),
          long_bio: cards.filter((c) => c.heading || c.body),
        },
      });
      toast({ title: 'Profile saved' });
    } catch (err) {
      toast({
        title: 'Save failed',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <AdminHeading
        title="Profile"
        description="Your identity, bio, and contact details — shown across the site."
        action={
          <Button onClick={handleSave} disabled={update.isPending} className="rounded-sm">
            {update.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        }
      />

      <div className="grid max-w-4xl gap-8">
        {/* Identity */}
        <section className="grid gap-5 border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-semibold">Identity</h2>
          <Field label="Full name" htmlFor="full_name">
            <Input id="full_name" className="rounded-sm" value={form.full_name ?? ''} onChange={(e) => set('full_name', e.target.value)} />
          </Field>
          <Field label="Headline" htmlFor="headline" hint="Short professional summary line.">
            <Input id="headline" className="rounded-sm" value={form.headline ?? ''} onChange={(e) => set('headline', e.target.value)} />
          </Field>
          <Field label="Hero tagline" htmlFor="hero_tagline">
            <Input id="hero_tagline" className="rounded-sm" value={form.hero_tagline ?? ''} onChange={(e) => set('hero_tagline', e.target.value)} />
          </Field>
          <Field label="Roles" htmlFor="roles" hint="One per line.">
            <Textarea id="roles" className="rounded-sm" rows={4} value={rolesText} onChange={(e) => setRolesText(e.target.value)} />
          </Field>
          <Field label="Short bio" htmlFor="short_bio">
            <Textarea id="short_bio" className="rounded-sm" rows={4} value={form.short_bio ?? ''} onChange={(e) => set('short_bio', e.target.value)} />
          </Field>
          <Field label="Avatar URL" htmlFor="avatar_url" hint="Direct image URL (or path under /public).">
            <Input id="avatar_url" className="rounded-sm" value={form.avatar_url ?? ''} onChange={(e) => set('avatar_url', e.target.value)} />
          </Field>
        </section>

        {/* Bio cards */}
        <section className="grid gap-5 border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold">Narrative cards</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-sm"
              onClick={() => setCards((c) => [...c, { heading: '', body: '' }])}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Add card
            </Button>
          </div>
          {cards.length === 0 && <p className="text-sm text-muted-foreground">No cards yet.</p>}
          {cards.map((card, i) => (
            <div key={i} className="grid gap-3 border border-border p-4">
              <div className="flex items-center gap-2">
                <Input
                  className="rounded-sm"
                  placeholder="Heading"
                  value={card.heading}
                  onChange={(e) =>
                    setCards((cs) => cs.map((c, idx) => (idx === i ? { ...c, heading: e.target.value } : c)))
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => setCards((cs) => cs.filter((_, idx) => idx !== i))}
                  aria-label="Remove card"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                className="rounded-sm"
                rows={4}
                placeholder="Body"
                value={card.body}
                onChange={(e) =>
                  setCards((cs) => cs.map((c, idx) => (idx === i ? { ...c, body: e.target.value } : c)))
                }
              />
            </div>
          ))}
        </section>

        {/* Contact + socials */}
        <section className="grid gap-5 border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-semibold">Contact & links</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" htmlFor="email">
              <Input id="email" className="rounded-sm" value={form.email ?? ''} onChange={(e) => set('email', e.target.value)} />
            </Field>
            <Field label="Phone" htmlFor="phone">
              <Input id="phone" className="rounded-sm" value={form.phone ?? ''} onChange={(e) => set('phone', e.target.value)} />
            </Field>
            <Field label="Location" htmlFor="location">
              <Input id="location" className="rounded-sm" value={form.location ?? ''} onChange={(e) => set('location', e.target.value)} />
            </Field>
            <Field label="CV URL" htmlFor="cv_url">
              <Input id="cv_url" className="rounded-sm" value={form.cv_url ?? ''} onChange={(e) => set('cv_url', e.target.value)} />
            </Field>
            <Field label="LinkedIn" htmlFor="linkedin">
              <Input id="linkedin" className="rounded-sm" value={form.socials?.linkedin ?? ''} onChange={(e) => setSocial('linkedin', e.target.value)} />
            </Field>
            <Field label="GitHub" htmlFor="github">
              <Input id="github" className="rounded-sm" value={form.socials?.github ?? ''} onChange={(e) => setSocial('github', e.target.value)} />
            </Field>
            <Field label="X" htmlFor="x">
              <Input id="x" className="rounded-sm" value={form.socials?.x ?? ''} onChange={(e) => setSocial('x', e.target.value)} />
            </Field>
          </div>
        </section>

        {/* Badges */}
        <section className="grid gap-5 border border-border bg-card p-6">
          <h2 className="font-serif text-lg font-semibold">Hero badges</h2>
          <Field label="Badges" htmlFor="badges" hint="One per line. Shown as chips on the home page.">
            <Textarea id="badges" className="rounded-sm" rows={5} value={badgesText} onChange={(e) => setBadgesText(e.target.value)} />
          </Field>
        </section>

        <div>
          <Button onClick={handleSave} disabled={update.isPending} className="rounded-sm">
            {update.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfileEditor;
