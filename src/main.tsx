import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Fonts (self-hosted via @fontsource — no render-blocking external requests)
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/source-serif-4/400.css';
import '@fontsource/source-serif-4/600.css';
import '@fontsource/source-serif-4/700.css';

import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
