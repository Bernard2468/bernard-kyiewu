import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Self-hosted fonts (no third-party CDN that tracking-prevention can block).
// Inter (body / --font-sans) + Lora 700 (headings / --font-serif).
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/lora/700.css';
// Outfit — admin dashboard font (GNRS "glass" look); scoped to #admin-root in CSS.
import '@fontsource/outfit/300.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';

// Global stylesheet — the academic homepage CSS, ported verbatim from the
// `profile/` static site. Academic icons are inlined as SVGs in Home.tsx.
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
