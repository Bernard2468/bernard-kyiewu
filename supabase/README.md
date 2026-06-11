# Supabase setup

One-time steps to connect the portfolio to your Supabase project.

## 1. Add credentials

Copy the example env file and fill in your project's values (Supabase dashboard →
**Project Settings → API**):

```bash
cp .env.example .env.local
```

```
VITE_SUPABASE_URL=https://YOUR-REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-PUBLIC-ANON-KEY
```

Use the **anon / public** key — never the `service_role` secret. `.env.local` is
gitignored. Restart `npm run dev` after editing it.

## 2. Create the schema

In the Supabase dashboard → **SQL Editor**, run these two files in order:

1. `supabase/migrations/0001_init.sql` — tables, RLS policies, storage buckets
2. `supabase/seed.sql` — loads your existing content (re-runnable)

(Or, with the Supabase CLI linked to your project: `supabase db push` then run the seed.)

## 3. Create your admin login

The site has no public sign-up. Create your single admin user in the dashboard →
**Authentication → Users → Add user**:

- Email: `kyiewubernard18@gmail.com`
- Password: choose a strong one
- Tick **Auto Confirm User** so you can sign in immediately

Then sign in at `/admin/login`.

## What's protected

Row Level Security is on for every table:

- Visitors can **read** published content (blog posts must be `published = true`).
- Only the **authenticated** admin can create/update/delete.
- Anyone can **submit** a contact message; only the admin can read them.
- Storage buckets `media` and `documents` are public-read, admin-write.
