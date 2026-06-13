import {
  BookOpen,
  Newspaper,
  Award,
  Presentation,
  FlaskConical,
  Files,
  FileText,
  User,
  ListOrdered,
  type LucideIcon,
} from 'lucide-react';
import { useAdmin } from '@/components/admin/context';

function formatDate(iso?: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function DashboardOverview({
  firstName,
  onNavigate,
}: {
  firstName: string;
  onNavigate: (section: string) => void;
}) {
  const { data } = useAdmin();

  const stats: { label: string; value: number; Icon: LucideIcon }[] = [
    { label: 'Publications', value: data.pubs.length, Icon: BookOpen },
    { label: 'News items', value: data.news.length, Icon: Newspaper },
    { label: 'Awards', value: data.awards.length, Icon: Award },
    { label: 'Courses', value: data.teaching.length, Icon: Presentation },
    { label: 'Research areas', value: data.research.length, Icon: FlaskConical },
    { label: 'Custom pages', value: data.pages.length, Icon: Files },
  ];

  const actions: { label: string; key: string; Icon: LucideIcon }[] = [
    { label: 'Add publication', key: 'publications', Icon: BookOpen },
    { label: 'Post news', key: 'news', Icon: Newspaper },
    { label: 'Edit biography', key: 'biography', Icon: FileText },
    { label: 'Edit profile', key: 'profile', Icon: User },
    { label: 'Reorder sections', key: 'sections', Icon: ListOrdered },
    { label: 'Custom pages', key: 'pages', Icon: Files },
  ];

  const visibleSections = data.sections.filter((s) => s.visible).length;
  const visiblePubs = data.pubs.filter((p) => p.visible).length;
  const visibleNews = data.news.filter((n) => n.visible).length;

  const status: { label: string; value: string }[] = [
    { label: 'Last updated', value: formatDate(data.profile?.updated_at) },
    { label: 'Sections visible', value: `${visibleSections} of ${data.sections.length}` },
    { label: 'Publications shown', value: `${visiblePubs} of ${data.pubs.length}` },
    { label: 'News shown', value: `${visibleNews} of ${data.news.length}` },
  ];

  return (
    <div className="adash-overview">
      <div className="adash-hello">
        <div className="adash-hello-title">Welcome back, {firstName} 👋</div>
        <div className="adash-hello-sub">Here's an overview of your academic profile.</div>
      </div>

      <div className="adash-stats">
        {stats.map(({ label, value, Icon }) => (
          <div className="adash-stat" key={label}>
            <span className="adash-stat-icon">
              <Icon size={20} strokeWidth={2} />
            </span>
            <span className="adash-stat-num">{value}</span>
            <span className="adash-stat-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="adash-grid2">
        <div className="adash-panel">
          <div className="adash-panel-title">Quick actions</div>
          <div className="adash-quick">
            {actions.map(({ label, key, Icon }) => (
              <button className="adash-quick-btn" key={key} onClick={() => onNavigate(key)}>
                <span className="adash-quick-ic">
                  <Icon size={16} strokeWidth={2} />
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="adash-panel">
          <div className="adash-panel-title">Site status</div>
          {status.map(({ label, value }) => (
            <div className="adash-updated-row" key={label}>
              <span className="adash-updated-label">{label}</span>
              <span className="adash-updated-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
