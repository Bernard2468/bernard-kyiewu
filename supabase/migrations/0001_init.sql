-- ============================================================================
-- Bernard Kyiewu portfolio — initial schema
-- Run this in the Supabase SQL editor (or `supabase db push`).
-- Creates content tables, an updated_at trigger, RLS policies, and storage
-- buckets. Public visitors can READ content; only authenticated (the site
-- owner) can WRITE. Anyone can submit a contact message.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Helper: keep updated_at fresh on every UPDATE
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profile (singleton row)
-- ---------------------------------------------------------------------------
create table if not exists public.profile (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null default '',
  headline    text not null default '',
  roles       text[] not null default '{}',
  hero_tagline text not null default '',
  short_bio   text not null default '',
  long_bio    jsonb not null default '[]'::jsonb,   -- [{ heading, body }]
  avatar_url  text,
  location    text,
  email       text,
  phone       text,
  socials     jsonb not null default '{}'::jsonb,    -- { linkedin, github, x, ... }
  badges      text[] not null default '{}',          -- hero "social proof" chips
  cv_url      text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- experiences
-- ---------------------------------------------------------------------------
create table if not exists public.experiences (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  organization text not null,
  location     text,
  period       text,            -- human-readable, e.g. "May 2025 - Present"
  start_date   date,
  end_date     date,
  is_current   boolean not null default false,
  kind         text not null default 'work',  -- work|research|field|admin|teaching
  achievements text[] not null default '{}',
  sort_order   int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text unique,
  summary     text,
  description text,
  tech        text[] not null default '{}',
  achievement text,
  github_url  text,
  demo_url    text,
  image_url   text,
  featured    boolean not null default false,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- publications
-- ---------------------------------------------------------------------------
create table if not exists public.publications (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  authors     text,
  venue       text,
  year        int,
  kind        text not null default 'manuscript',  -- journal|conference|manuscript|review
  status      text not null default 'published',   -- published|under-review|in-progress
  abstract    text,
  url_doi     text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- education
-- ---------------------------------------------------------------------------
create table if not exists public.education (
  id                uuid primary key default gen_random_uuid(),
  degree            text not null,
  institution       text not null,
  field             text,
  period            text,
  start_date        date,
  end_date          date,
  thesis_title      text,
  thesis_supervisor text,
  achievements      text[] not null default '{}',
  sort_order        int not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- certifications
-- ---------------------------------------------------------------------------
create table if not exists public.certifications (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  issuer         text,
  year           int,
  credential_url text,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- skills
-- ---------------------------------------------------------------------------
create table if not exists public.skills (
  id          uuid primary key default gen_random_uuid(),
  category    text not null default 'technical',  -- technical|computer|behavioral
  name        text not null,
  proficiency int not null default 85,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- interests
-- ---------------------------------------------------------------------------
create table if not exists public.interests (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- tools
-- ---------------------------------------------------------------------------
create table if not exists public.tools (
  id         uuid primary key default gen_random_uuid(),
  category   text not null,
  name       text not null,
  icon_slug  text,   -- react-icons/si slug, e.g. "SiPython"
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- talks (talks & workshops)
-- ---------------------------------------------------------------------------
create table if not exists public.talks (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  event         text,
  venue         text,
  date          date,
  audience_size int,
  kind          text not null default 'workshop',  -- talk|workshop|symposium
  description   text,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- service (volunteer & leadership)
-- ---------------------------------------------------------------------------
create table if not exists public.service (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  organization text,
  description  text,
  icon_slug    text,   -- lucide icon name, e.g. "Users"
  period       text,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- posts (blog / writing)
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique not null,
  excerpt      text,
  body         text not null default '',   -- markdown
  cover_url    text,
  tags         text[] not null default '{}',
  published    boolean not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- contact_messages
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- site_settings (singleton row)
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id          uuid primary key default gen_random_uuid(),
  seo_title   text,
  seo_description text,
  default_theme text not null default 'light',  -- light|dark
  nav         jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at triggers for every table that has the column
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'profile','experiences','projects','publications','education','certifications',
    'skills','interests','tools','talks','service','posts','site_settings'
  ]
  loop
    execute format('drop trigger if exists set_updated_at on public.%I;', t);
    execute format(
      'create trigger set_updated_at before update on public.%I
         for each row execute function public.set_updated_at();', t);
  end loop;
end$$;

-- ============================================================================
-- Row Level Security
-- ============================================================================
do $$
declare
  t text;
begin
  foreach t in array array[
    'profile','experiences','projects','publications','education','certifications',
    'skills','interests','tools','talks','service','posts','contact_messages','site_settings'
  ]
  loop
    execute format('alter table public.%I enable row level security;', t);
  end loop;
end$$;

-- Public read on content tables (drop-then-create so the script is re-runnable)
do $$
declare
  t text;
begin
  foreach t in array array[
    'profile','experiences','projects','publications','education','certifications',
    'skills','interests','tools','talks','service','site_settings'
  ]
  loop
    execute format('drop policy if exists "public read" on public.%I;', t);
    execute format('create policy "public read" on public.%I for select using (true);', t);

    execute format('drop policy if exists "auth write" on public.%I;', t);
    execute format(
      'create policy "auth write" on public.%I for all
         to authenticated using (true) with check (true);', t);
  end loop;
end$$;

-- posts: public can only read published; authenticated can do anything
drop policy if exists "public read published" on public.posts;
create policy "public read published" on public.posts
  for select using (published = true);

drop policy if exists "auth read all" on public.posts;
create policy "auth read all" on public.posts
  for select to authenticated using (true);

drop policy if exists "auth write" on public.posts;
create policy "auth write" on public.posts
  for all to authenticated using (true) with check (true);

-- contact_messages: anyone may submit; only authenticated may read/update/delete
drop policy if exists "anyone can submit" on public.contact_messages;
create policy "anyone can submit" on public.contact_messages
  for insert with check (true);

drop policy if exists "auth read messages" on public.contact_messages;
create policy "auth read messages" on public.contact_messages
  for select to authenticated using (true);

drop policy if exists "auth manage messages" on public.contact_messages;
create policy "auth manage messages" on public.contact_messages
  for update to authenticated using (true) with check (true);

drop policy if exists "auth delete messages" on public.contact_messages;
create policy "auth delete messages" on public.contact_messages
  for delete to authenticated using (true);

-- ============================================================================
-- Storage buckets: media (images) + documents (CV pdf). Public read.
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true), ('documents', 'documents', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select using (bucket_id in ('media', 'documents'));

drop policy if exists "auth upload media" on storage.objects;
create policy "auth upload media" on storage.objects
  for insert to authenticated with check (bucket_id in ('media', 'documents'));

drop policy if exists "auth update media" on storage.objects;
create policy "auth update media" on storage.objects
  for update to authenticated using (bucket_id in ('media', 'documents'));

drop policy if exists "auth delete media" on storage.objects;
create policy "auth delete media" on storage.objects
  for delete to authenticated using (bucket_id in ('media', 'documents'));
