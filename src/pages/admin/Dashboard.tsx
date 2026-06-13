import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Share2,
  ListOrdered,
  FileText,
  Newspaper,
  FlaskConical,
  GraduationCap,
  BookOpen,
  Presentation,
  Award,
  HeartHandshake,
  Files,
  Menu,
  ExternalLink,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useSiteData, useReloadSiteData } from '@/hooks/data';
import { AdminContext } from '@/components/admin/context';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { ProfileEditor } from '@/components/admin/editors/ProfileEditor';
import { SocialEditor } from '@/components/admin/editors/SocialEditor';
import { SectionsEditor } from '@/components/admin/editors/SectionsEditor';
import { BiographyEditor } from '@/components/admin/editors/BiographyEditor';
import { PublicationsEditor } from '@/components/admin/editors/PublicationsEditor';
import { CardListEditor } from '@/components/admin/editors/CardListEditor';
import {
  newsConfig,
  researchConfig,
  awardsConfig,
  educationConfig,
  teachingConfig,
  serviceConfig,
  pagesConfig,
} from '@/components/admin/editors/configs';
import '@/styles/admin.css';

interface NavItem {
  key: string;
  label: string;
  Icon: LucideIcon;
}

const NAV: { group: string; items: NavItem[] }[] = [
  { group: 'Overview', items: [{ key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard }] },
  {
    group: 'Profile',
    items: [
      { key: 'profile', label: 'Profile Info', Icon: User },
      { key: 'social', label: 'Social Links', Icon: Share2 },
    ],
  },
  { group: 'Navigation', items: [{ key: 'sections', label: 'Section Names', Icon: ListOrdered }] },
  {
    group: 'Content',
    items: [
      { key: 'biography', label: 'Biography', Icon: FileText },
      { key: 'news', label: 'News', Icon: Newspaper },
      { key: 'research', label: 'Research', Icon: FlaskConical },
      { key: 'education', label: 'Education', Icon: GraduationCap },
      { key: 'publications', label: 'Publications', Icon: BookOpen },
      { key: 'teaching', label: 'Teaching', Icon: Presentation },
      { key: 'awards', label: 'Awards', Icon: Award },
      { key: 'service', label: 'Service', Icon: HeartHandshake },
    ],
  },
  { group: 'Pages', items: [{ key: 'pages', label: 'Custom Pages', Icon: Files }] },
];

const TITLES: Record<string, string> = Object.fromEntries(
  NAV.flatMap((g) => g.items.map((it) => [it.key, it.label])),
);

function initialsOf(name: string): string {
  return (name || 'Admin')
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const Dashboard = () => {
  const { data, isLoading } = useSiteData();
  const reload = useReloadSiteData();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const [section, setSection] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error'; show: boolean }>({
    msg: '',
    type: 'success',
    show: false,
  });
  const [saved, setSaved] = useState(false);
  const toastTimer = useRef<number>();
  const savedTimer = useRef<number>();

  const notify = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type, show: true });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  };
  const showSaved = () => {
    setSaved(true);
    window.clearTimeout(savedTimer.current);
    savedTimer.current = window.setTimeout(() => setSaved(false), 2500);
  };

  useEffect(
    () => () => {
      window.clearTimeout(toastTimer.current);
      window.clearTimeout(savedTimer.current);
    },
    [],
  );

  const go = (key: string) => {
    setSection(key);
    setDrawerOpen(false);
  };

  const onSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  const initials = initialsOf(data?.profile?.full_name ?? '');
  const firstName = (data?.profile?.full_name ?? 'Admin').split(' ')[0] || 'Admin';
  const title = section === 'dashboard' ? 'Dashboard' : TITLES[section] ?? '';

  const renderEditor = () => {
    if (!data) return null;
    switch (section) {
      case 'profile':
        return <ProfileEditor />;
      case 'social':
        return <SocialEditor />;
      case 'sections':
        return <SectionsEditor />;
      case 'biography':
        return <BiographyEditor />;
      case 'news':
        return <CardListEditor items={data.news} config={newsConfig} />;
      case 'research':
        return <CardListEditor items={data.research} config={researchConfig} />;
      case 'education':
        return <CardListEditor items={data.education} config={educationConfig} />;
      case 'publications':
        return <PublicationsEditor />;
      case 'teaching':
        return <CardListEditor items={data.teaching} config={teachingConfig} />;
      case 'awards':
        return <CardListEditor items={data.awards} config={awardsConfig} />;
      case 'service':
        return <CardListEditor items={data.service} config={serviceConfig} />;
      case 'pages':
        return <CardListEditor items={data.pages} config={pagesConfig} />;
      default:
        return null;
    }
  };

  return (
    <div id="admin-root">
      <div className="adash-layout">
        <div
          className={`adash-backdrop${drawerOpen ? ' open' : ''}`}
          onClick={() => setDrawerOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`adash-sidebar${drawerOpen ? ' open' : ''}`}>
          <div className="adash-brand">
            <span className="adash-brand-avatar">{initials}</span>
            <div>
              <div className="adash-brand-name">{firstName}</div>
              <div className="adash-brand-sub">Admin</div>
            </div>
          </div>

          <nav className="adash-nav">
            {NAV.map((g) => (
              <div key={g.group}>
                <div className="adash-nav-section">{g.group}</div>
                {g.items.map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    className={`adash-nav-btn${section === key ? ' active' : ''}`}
                    onClick={() => go(key)}
                  >
                    <Icon className="adash-nav-icon" size={18} strokeWidth={2} />
                    <span className="adash-nav-label">{label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className="adash-sidebar-footer">
            <a href="/" target="_blank" rel="noreferrer" className="adash-foot-btn">
              <ExternalLink />
              View Site
            </a>
            <button className="adash-foot-btn danger" onClick={onSignOut}>
              <LogOut />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="adash-main">
          <header className="adash-topbar">
            <button className="adash-hamburger" aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
              <Menu />
            </button>
            <h1 className="adash-topbar-title">{title}</h1>
            <div className="adash-topbar-actions">
              {saved && <span className="save-indicator">Saved</span>}
              <a href="/" target="_blank" rel="noreferrer" className="adash-viewsite">
                <ExternalLink />
                View Site
              </a>
              <span className="adash-avatar">{initials}</span>
            </div>
          </header>

          <div className="adash-content">
            {data ? (
              <AdminContext.Provider value={{ data, reload, notify, showSaved }}>
                {section === 'dashboard' ? (
                  <DashboardOverview firstName={firstName} onNavigate={setSection} />
                ) : (
                  <div className="adash-card">{renderEditor()}</div>
                )}
              </AdminContext.Provider>
            ) : (
              <p className="adash-loading">{isLoading ? 'Loading…' : 'No data.'}</p>
            )}
          </div>
        </div>
      </div>

      <div className={`toast ${toast.type}${toast.show ? ' show' : ''}`}>{toast.msg}</div>
    </div>
  );
};

export default Dashboard;
