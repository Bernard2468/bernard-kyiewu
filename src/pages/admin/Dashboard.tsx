import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useSiteData, useReloadSiteData } from '@/hooks/data';
import { AdminContext } from '@/components/admin/context';
import { BookIcon } from '@/components/admin/ui';
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

const NAV: { group: string; items: { key: string; label: string }[] }[] = [
  { group: 'Profile', items: [{ key: 'profile', label: 'Profile Info' }, { key: 'social', label: 'Social Links' }] },
  { group: 'Navigation', items: [{ key: 'sections', label: 'Section Names' }] },
  {
    group: 'Content',
    items: [
      { key: 'biography', label: 'Biography' },
      { key: 'news', label: 'News' },
      { key: 'research', label: 'Research' },
      { key: 'education', label: 'Education' },
      { key: 'publications', label: 'Publications' },
      { key: 'teaching', label: 'Teaching' },
      { key: 'awards', label: 'Awards' },
      { key: 'service', label: 'Service' },
    ],
  },
  { group: 'Pages', items: [{ key: 'pages', label: 'Custom Pages' }] },
];

const Dashboard = () => {
  const { data, isLoading } = useSiteData();
  const reload = useReloadSiteData();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const [section, setSection] = useState('profile');
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

  const onSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

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
      <div id="dashboard">
        <header className="admin-topbar">
          <div className="topbar-brand">
            <BookIcon size={18} />
            Profile Admin
          </div>
          <div className="topbar-actions">
            {saved && <span className="save-indicator">Saved</span>}
            <a href="/" target="_blank" rel="noreferrer" className="btn-ghost">
              View Site ↗
            </a>
            <button className="btn-ghost" onClick={onSignOut}>
              Sign Out
            </button>
          </div>
        </header>

        <div className="admin-shell">
          <nav className="admin-nav">
            {NAV.map((g) => (
              <div className="nav-group" key={g.group}>
                <span className="nav-group-label">{g.group}</span>
                {g.items.map((it) => (
                  <button
                    key={it.key}
                    className={`nav-item${section === it.key ? ' active' : ''}`}
                    onClick={() => setSection(it.key)}
                  >
                    {it.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <main className="admin-main">
            {data ? (
              <AdminContext.Provider value={{ data, reload, notify, showSaved }}>
                {renderEditor()}
              </AdminContext.Provider>
            ) : (
              <p className="admin-loading">{isLoading ? 'Loading…' : 'No data.'}</p>
            )}
          </main>
        </div>
      </div>

      <div className={`toast ${toast.type}${toast.show ? ' show' : ''}`}>{toast.msg}</div>
    </div>
  );
};

export default Dashboard;
