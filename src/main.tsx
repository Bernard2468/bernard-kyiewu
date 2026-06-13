import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Global stylesheet — the academic homepage CSS, ported verbatim from the
// `profile/` static site. Fonts (Inter + Lora) and academicons load via the
// <link> tags in index.html, matching the original exactly.
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
