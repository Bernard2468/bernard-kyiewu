-- Run in Supabase SQL Editor: Dashboard → SQL → New query
-- Academic profile schema for Django + Supabase backend

-- Main profile (one row)
create table if not exists site_profile (
  id            bigint generated always as identity primary key,
  full_name     text not null,
  name_alt      text,
  title         text,
  department_1  text,
  department_2  text,
  university    text,
  address       text,
  office        text,
  phone         text,
  email         text,
  photo_url     text,
  biography     text,
  scholar_url       text,
  researchgate_url  text,
  linkedin_url      text,
  github_url        text,
  orcid_url         text,
  cv_url            text,
  cv_filename       text,
  students_text     text,
  students_email    text,
  updated_at    timestamptz default now()
);

-- News
create table if not exists news_items (
  id          bigint generated always as identity primary key,
  event_date  date not null,
  body        text not null,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- Research interests
create table if not exists research_interests (
  id          bigint generated always as identity primary key,
  label       text not null,
  sort_order  int default 0
);

-- Education
create table if not exists education_entries (
  id          bigint generated always as identity primary key,
  degree      text not null,
  institution text not null,
  sort_order  int default 0
);

-- Publications: pub_type = journal | conference | workshop
create table if not exists publications (
  id          bigint generated always as identity primary key,
  pub_id      text not null,
  pub_type    text not null check (pub_type in ('journal', 'conference', 'workshop')),
  citation    text not null,
  pdf_url     text,
  doi_url     text,
  slides_url  text,
  award_note  text,
  year        int,
  sort_order  int default 0
);

-- Teaching
create table if not exists teaching_courses (
  id          bigint generated always as identity primary key,
  label       text not null,
  sort_order  int default 0
);

-- Awards
create table if not exists awards (
  id          bigint generated always as identity primary key,
  label       text not null,
  year        int,
  sort_order  int default 0
);

-- Service
create table if not exists service_entries (
  id          bigint generated always as identity primary key,
  category    text not null,
  label       text not null,
  sort_order  int default 0
);

-- Site navigation pages (public + admin sidebar)
create table if not exists site_pages (
  id             bigint generated always as identity primary key,
  slug           text not null unique,
  label          text not null,
  page_type      text not null check (page_type in (
    'biography', 'news', 'research', 'education',
    'publications', 'teaching', 'awards', 'service', 'custom'
  )),
  sort_order     int default 0,
  is_enabled     boolean default true,
  custom_content text,
  icon           text default 'fa-file-alt',
  created_at     timestamptz default now()
);

-- Row Level Security: public read, authenticated write
alter table site_profile        enable row level security;
alter table news_items          enable row level security;
alter table research_interests  enable row level security;
alter table education_entries   enable row level security;
alter table publications        enable row level security;
alter table teaching_courses    enable row level security;
alter table awards              enable row level security;
alter table service_entries     enable row level security;
alter table site_pages          enable row level security;

-- Drop all existing policies on these tables before recreating (idempotent)
do $$
declare r record;
begin
  for r in
    select tablename, policyname from pg_policies
    where schemaname = 'public'
    and tablename in (
      'site_profile','news_items','research_interests','education_entries',
      'publications','teaching_courses','awards','service_entries','site_pages'
    )
  loop
    execute format('drop policy if exists %I on public.%I', r.policyname, r.tablename);
  end loop;
end $$;

create policy "Public read site_profile"       on site_profile       for select using (true);
create policy "Public read news_items"         on news_items         for select using (true);
create policy "Public read research_interests" on research_interests for select using (true);
create policy "Public read education_entries"  on education_entries  for select using (true);
create policy "Public read publications"       on publications       for select using (true);
create policy "Public read teaching_courses"   on teaching_courses   for select using (true);
create policy "Public read awards"             on awards             for select using (true);
create policy "Public read service_entries"    on service_entries    for select using (true);
create policy "Public read site_pages"         on site_pages         for select using (true);

-- Service role bypasses RLS; use Django admin or authenticated API for writes.

-- Seed example profile (only inserts if the table is empty)
insert into site_profile (
  full_name, name_alt, title, department_1, department_2, university, address,
  office, phone, email, biography, students_text
)
select
  'Your Name',
  '（姓名）',
  'Assistant Professor',
  'Department of Electrical and Computer Engineering',
  'Department of Computer Science (Courtesy)',
  'North Carolina State University',
  '890 Oval Dr, Raleigh, NC 27695',
  '3072 Engr Bldg II',
  '(919) 515-5128',
  'you@university.edu',
  'I am an Assistant Professor...',
  'I am recruiting self-motivated Ph.D. students...'
where not exists (select 1 from site_profile);

-- Migrations for existing databases
alter table site_profile add column if not exists cv_url text;
alter table site_profile add column if not exists cv_filename text;
