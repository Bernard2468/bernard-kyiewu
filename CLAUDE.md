# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Academic profile website (single-page public homepage + password-protected admin
dashboard) for an academic. React + TypeScript + Vite, backed by **Supabase**
(Postgres + Auth + Storage). It was **ported from the legacy Django / static-JS
app in [profile/](profile/)** — that directory is the design source of truth and
has its own `CLAUDE.md`. The site's CSS was copied verbatim from
`profile/styles.css` into [src/index.css](src/index.css).

> The repo was originally scaffolded as a Lovable portfolio (hence the
> `vite_react_shadcn_ts` package name, `lovable-tagger`, the [README.md](README.md),
> and the unused `src/components/ui/` shadcn library). That portfolio is gone —
> ignore the README, it describes the old site.

## Commands

```bash
npm run dev        # Vite dev server on http://localhost:8080 (host "::")
npm run build      # production build to dist/
npm run build:dev  # build in development mode
npm run lint       # ESLint over the repo
npm run preview    # serve the production build locally
```

There is no test setup in this project.

## Supabase configuration

The browser talks to Supabase directly using the **anon key only**; all security
is enforced by Postgres Row-Level Security (public `SELECT`, authenticated full
access). Never put the `service_role` secret in the frontend.

- Credentials come from `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`, read in
  [src/lib/supabase.ts](src/lib/supabase.ts). Local values live in `.env.local`
  (gitignored). If they're missing, the client falls back to placeholder values
  and `isSupabaseConfigured` is `false` (the app imports but real calls fail) —
  it does not crash.
- **Schema source of truth: [profile/sql/schema.sql](profile/sql/schema.sql)** —
  idempotent, run once in the Supabase SQL editor. It creates the 10 content
  tables, RLS policies, the public `profile` storage bucket, and seed data.
- TypeScript row types in [src/types/database.ts](src/types/database.ts) mirror
  that SQL. They are **maintained by hand** — when the schema changes, update
  both files together.

## Architecture

### Routing & providers

[src/App.tsx](src/App.tsx) wraps everything in `QueryClientProvider` →
`AuthProvider` → `BrowserRouter` and defines four routes:

- `/` → public homepage ([src/pages/public/Home.tsx](src/pages/public/Home.tsx))
- `/admin/login` → [src/pages/admin/Login.tsx](src/pages/admin/Login.tsx)
- `/admin` → [src/pages/admin/Dashboard.tsx](src/pages/admin/Dashboard.tsx), wrapped in `ProtectedRoute`
- `*` → `NotFound`

There is no SPA-redirect config (`_redirects` / `netlify.toml`) in the repo, so a
host-level catch-all rewrite to `index.html` is required for deep links like
`/admin` to survive a hard refresh in production.

### Data layer (one query, shared by both UIs)

[src/hooks/data/index.ts](src/hooks/data/index.ts) is the single data source.
`fetchSiteData()` does **one parallel fetch of all 10 content tables** and returns
**every row, including hidden ones**. `useSiteData()` (React Query, key
`['site-data']`) is consumed by **both** the public page and the admin dashboard;
`useReloadSiteData()` returns an invalidator to call after admin writes.

The public page filters `visible` **client-side**; the admin shows everything.

### Public homepage

[Home.tsx](src/pages/public/Home.tsx) is data-driven: it renders sections in the
order/visibility defined by the `site_sections` table, mapping each `slug` to a
renderer in `renderSection()` (`biography`, `news`, `research`, `education`,
`publications`, `teaching`, `awards`, `service`), then appends any visible
`custom_pages`. Notable conventions:

- Rich-text fields (biography, news bodies, awards, service items, custom pages,
  publication citations) are stored as **HTML strings** and rendered with
  `dangerouslySetInnerHTML`.
- Brand/academic icons (Scholar, ORCID, ResearchGate, LinkedIn, GitHub) are
  **inlined SVGs** — deliberately no icon-font or third-party CDN (browser
  tracking-prevention can block those).
- Scroll-spy and the mobile nav toggle are a hand-written `IntersectionObserver`
  effect that mirrors `initNavObserver` in the legacy `profile/app.js`.

### Admin dashboard

[Dashboard.tsx](src/pages/admin/Dashboard.tsx) is a sidebar shell that switches
between editors by key. It provides `AdminContext`
([src/components/admin/context.ts](src/components/admin/context.ts)) carrying
`{ data, reload, notify, showSaved }` to all editors.

Editors in [src/components/admin/editors/](src/components/admin/editors/):

- **Bespoke editors**: `ProfileEditor`, `SocialEditor`, `SectionsEditor`,
  `BiographyEditor`, `PublicationsEditor`.
- **Generic [CardListEditor](src/components/admin/editors/CardListEditor.tsx)** —
  one component drives add/edit/delete/reorder/visibility for news, research,
  education, teaching, awards, service, and custom pages. Each is described by a
  `CardListConfig` object in
  [configs.tsx](src/components/admin/editors/configs.tsx). **To add a new
  list-backed section, add a config there rather than writing a new editor.**

Writes: editors call `supabase.from(table)` directly for plain
insert/update/delete. The cases that need care live in
[src/lib/adminApi.ts](src/lib/adminApi.ts):

- `saveProfile` — the singleton `site_profile` row; re-fetches the real id first
  to avoid creating duplicates.
- `reorder` — swaps `sort_order` with a neighbour (drives the up/down buttons).
- `uploadPhoto` — uploads to the public `profile` storage bucket, returns the
  public URL.

All write helpers are ports of functions in `profile/admin/app.js`.

### Auth

[src/lib/auth.tsx](src/lib/auth.tsx) wraps Supabase Auth: `AuthProvider` tracks
the session, `useAuth()` exposes `signIn`/`signOut`, and `ProtectedRoute`
redirects to `/admin/login` when there is no session. There is **no signup UI** —
admin users are created in the Supabase Auth dashboard.

## Styling — read before touching any UI

The public site and the admin dashboard are styled with **plain, hand-authored
CSS**, not Tailwind utilities or shadcn/ui:

- [src/index.css](src/index.css) — public academic homepage, ported verbatim from
  `profile/styles.css`. Imported globally in [src/main.tsx](src/main.tsx).
  Semantic classes: `.site-header`, `.section`, `.section-title`, `.prose`,
  `.timeline`, `.pub-list`, `.news-table`, etc.
- [src/styles/admin.css](src/styles/admin.css) — the admin "glass" dashboard,
  scoped under `#admin-root` and imported by `Dashboard`/`Login`. Classes:
  `.adash-*`, `.btn-primary`, `.item-card`, `.field-group`, `.login-card`, etc.
  (Visual style and the Outfit font are borrowed from the separate `GNRS/`
  project.)
- Fonts are **self-hosted via `@fontsource`** (Inter + Lora for the public site,
  Outfit for admin), imported in `main.tsx` — again, no Google Fonts CDN.

**Tailwind, shadcn/ui ([src/components/ui/](src/components/ui/)), `next-themes`,
and `framer-motion` are installed but unused by the rendered app** — leftovers
from the original portfolio. There are no `@tailwind`/`@apply` directives in
`src`, and nothing outside `src/components/ui/` imports those primitives. When
editing pages, **match the existing hand-written CSS**; don't reach for Tailwind
classes or shadcn components.

## `profile/` and `GNRS/` (gitignored)

- [profile/](profile/) — the legacy Django + static-JS implementation this app was
  ported from. Gitignored but kept as reference; it has its own `CLAUDE.md` and
  holds the canonical schema (`profile/sql/schema.sql`). Public render logic
  mirrors `profile/app.js`; admin writes mirror `profile/admin/app.js`.
- `GNRS/` — a separate, unrelated project (gitignored). Only relevance: the admin
  dashboard's look was adapted from it.

## Path alias

`@/` resolves to `src/` (configured in both [vite.config.ts](vite.config.ts) and
[tsconfig.json](tsconfig.json)). Use `@/components/...`, `@/hooks/...`,
`@/lib/...`, etc.

## TypeScript / lint notes

TypeScript is intentionally loose: `strictNullChecks`, `noImplicitAny`,
`noUnusedLocals`, and `noUnusedParameters` are disabled, and ESLint has
`@typescript-eslint/no-unused-vars` off. Don't rely on the compiler to catch
null/undefined — handle it deliberately, especially around `useSiteData()` data
that can be `null`/empty before the first fetch resolves.
