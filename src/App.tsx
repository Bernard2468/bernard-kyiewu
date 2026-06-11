import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, ProtectedRoute } from './lib/auth';

import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';

import Home from './pages/public/Home';
import About from './pages/public/About';
import ComingSoon from './pages/public/ComingSoon';
import NotFound from './pages/NotFound';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProfileEditor from './pages/admin/ProfileEditor';
import ExperienceEditor from './pages/admin/ExperienceEditor';
import AdminComingSoon from './pages/admin/AdminComingSoon';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public site */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/research" element={<ComingSoon kicker="Research" title="Publications & Research" />} />
                <Route path="/projects" element={<ComingSoon kicker="Work" title="Projects" />} />
                <Route path="/experience" element={<ComingSoon kicker="Career" title="Experience" />} />
                <Route path="/teaching" element={<ComingSoon kicker="Teaching" title="Teaching, Talks & Service" />} />
                <Route path="/education" element={<ComingSoon kicker="Education" title="Education & Certifications" />} />
                <Route path="/writing" element={<ComingSoon kicker="Writing" title="Writing" />} />
                <Route path="/cv" element={<ComingSoon kicker="Curriculum Vitae" title="CV" />} />
                <Route path="/contact" element={<ComingSoon kicker="Contact" title="Get in touch" />} />
              </Route>

              {/* Admin */}
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<ProfileEditor />} />
                <Route path="experience" element={<ExperienceEditor />} />
                <Route path="projects" element={<AdminComingSoon title="Projects" />} />
                <Route path="publications" element={<AdminComingSoon title="Publications" />} />
                <Route path="education" element={<AdminComingSoon title="Education" />} />
                <Route path="teaching" element={<AdminComingSoon title="Teaching & Talks" />} />
                <Route path="tools" element={<AdminComingSoon title="Tools" />} />
                <Route path="service" element={<AdminComingSoon title="Service" />} />
                <Route path="writing" element={<AdminComingSoon title="Writing" />} />
                <Route path="messages" element={<AdminComingSoon title="Messages" />} />
                <Route path="settings" element={<AdminComingSoon title="Settings" />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
