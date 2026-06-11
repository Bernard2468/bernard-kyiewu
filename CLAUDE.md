# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal portfolio website for Kyiewu Bernard. Built with React + TypeScript + Vite, styled with TailwindCSS and shadcn/ui components. Originally scaffolded with Lovable (note the `lovable-tagger` Vite plugin and the `vite_react_shadcn_ts` package name). Deployed to Netlify.

## Commands

```bash
npm run dev        # Vite dev server on http://localhost:8080 (host "::")
npm run build      # production build to dist/
npm run build:dev  # build in development mode
npm run lint       # ESLint over the repo
npm run preview    # serve the production build locally
```

There is no test setup in this project.

## Architecture

The app is a single route that renders one long scrolling page; there is no real routing beyond a 404 fallback.

- [src/main.tsx](src/main.tsx) mounts `<App />`.
- [src/App.tsx](src/App.tsx) wraps everything in provider layers: `QueryClientProvider` → `ThemeProvider` → `TooltipProvider`, mounts both toast systems (`Toaster` + `Sonner`), then `BrowserRouter` with two routes: `/` → `HomePage` ([src/pages/Index.tsx](src/pages/Index.tsx)) and `*` → `NotFound`.
- [src/pages/Index.tsx](src/pages/Index.tsx) is the whole page — it composes the section components in display order: `Header`, `HeroSection`, `AboutSection`, `ExperienceSection`, `ProjectsSection`, `ToolsSection`, `EducationSection`, `VolunteerSection`, `ContactSection`, `Footer`. To add or reorder content on the page, edit this file.

### Section components

Each section in [src/components/](src/components/) is self-contained and **owns its content inline** — text, lists, project entries, timeline data, etc. are hardcoded arrays/JSX inside the component rather than loaded from a shared data source or CMS. To update portfolio content (e.g. add a project or experience entry), edit the relevant section component directly.

### Theming

Dark mode uses a **custom** [src/contexts/ThemeContext.tsx](src/contexts/ThemeContext.tsx), not `next-themes` (which is installed but unused for the page). It toggles the `dark` class on `document.documentElement` and persists the choice in `localStorage` under the `theme` key, falling back to the OS `prefers-color-scheme`. Components read/toggle it via the `useTheme()` hook; `Index` passes `isDarkMode`/`toggleTheme` down to `Header`. Tailwind is configured with `darkMode: ["class"]`, so all theming is expressed as `dark:` variants.

### Styling conventions

- **shadcn/ui** primitives live in [src/components/ui/](src/components/ui/). These are generated/vendored components; prefer composing them over hand-editing. `cn()` from [src/lib/utils.ts](src/lib/utils.ts) merges class names.
- Colors are driven by CSS variables plus a custom `portfolio-*` palette defined in [tailwind.config.ts](tailwind.config.ts) (e.g. `portfolio-navy`, `portfolio-amber`, `portfolio-light-slate`). The `amber` token is actually a blue accent (`#0EA5E9`) — match existing usage rather than the name. Fonts: `font-poppins` (headings), `font-roboto` (body).
- Reusable semantic classes are defined with `@apply` in [src/index.css](src/index.css) under `@layer components`: `.section-title`, `.section-subtitle`, `.nav-link`, `.timeline-item`, `.skill-card`, `.project-card`, `.contact-input`. Reuse these for consistency instead of duplicating long utility strings.
- Custom keyframe animations (`fade-in`, `fade-in-up`, `bounce-subtle`, `pulse-soft`) are defined in the Tailwind config; `framer-motion` is also available for richer animation.

### Contact form

[src/components/ContactSection.tsx](src/components/ContactSection.tsx) posts directly to a **Formspree** endpoint (`https://formspree.io/f/...`) from the browser — there is no backend. Submission feedback uses the shadcn `useToast()` toast.

## Path alias

`@/` resolves to `src/` (configured in both [vite.config.ts](vite.config.ts) and [tsconfig.json](tsconfig.json)). Use `@/components/...`, `@/hooks/...`, etc. for imports.

## TypeScript / lint notes

TypeScript is intentionally loose here: `strictNullChecks`, `noImplicitAny`, `noUnusedLocals`, and `noUnusedParameters` are all disabled, and ESLint has `@typescript-eslint/no-unused-vars` turned off. Don't expect the compiler to catch null/undefined issues — be deliberate about them in new code.
