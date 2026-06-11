import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';
import { ConfigBanner } from '@/components/ui-kit/States';

/** Resets scroll position whenever the route changes. */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const PublicLayout = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <ScrollToTop />
    <ConfigBanner />
    <SiteNav />
    <main className="flex-1">
      <Outlet />
    </main>
    <SiteFooter />
  </div>
);
