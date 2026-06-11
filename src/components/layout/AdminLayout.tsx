import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ExternalLink, LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';
import { adminNav } from '@/config/adminNav';

export const AdminLayout = () => {
  const { signOut, session } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <span className="flex h-8 w-8 items-center justify-center bg-primary font-serif text-sm font-semibold text-primary-foreground">
          KB
        </span>
        <span className="font-serif text-base font-semibold">Studio</span>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {adminNav.map(({ label, to, icon: Icon, ready }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center justify-between gap-3 rounded-sm px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )
            }
          >
            <span className="flex items-center gap-3">
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </span>
            {!ready && (
              <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                soon
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
          View site
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-0.5 flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden border-r border-border bg-card lg:block lg:h-screen lg:sticky lg:top-0">
        {SidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-sm hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-serif text-base font-semibold">Studio</span>
        <span className="w-9" />
      </div>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-border bg-card">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-4 inline-flex h-9 w-9 items-center justify-center rounded-sm hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
            {SidebarContent}
          </aside>
        </div>
      )}

      <main className="min-w-0">
        <div className="hidden h-16 items-center justify-end border-b border-border px-8 lg:flex">
          <span className="text-sm text-muted-foreground">{session?.user?.email}</span>
        </div>
        <div className="p-5 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
