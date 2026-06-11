import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { useProfile } from '@/hooks/data';
import { navItems } from '@/config/nav';
import { Container } from '@/components/ui-kit';

export const SiteNav = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { data: profile } = useProfile();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const name = profile?.full_name || 'Kyiewu Bernard';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const ThemeToggle = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {isDarkMode ? <Sun className="h-[1.15rem] w-[1.15rem]" /> : <Moon className="h-[1.15rem] w-[1.15rem]" />}
    </button>
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-background/90 backdrop-blur transition-shadow',
        scrolled ? 'border-border shadow-[0_1px_0_0_hsl(var(--border))]' : 'border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center bg-primary font-serif text-sm font-semibold text-primary-foreground">
            KB
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">{name}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => cn('nav-link', isActive && 'active')}
            >
              {item.label}
            </NavLink>
          ))}
          <span className="h-5 w-px bg-border" />
          {ThemeToggle}
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          {ThemeToggle}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-accent"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-background transition-transform duration-300 ease-out',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <nav className="flex h-full flex-col gap-1 overflow-y-auto px-5 py-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  'border-b border-border py-4 font-serif text-2xl transition-colors',
                  isActive ? 'text-primary' : 'text-foreground hover:text-primary',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
