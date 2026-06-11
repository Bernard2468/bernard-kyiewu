import { Link } from 'react-router-dom';
import { AdminHeading } from '@/components/admin/AdminUI';
import {
  useProjects,
  usePublications,
  useExperiences,
  usePosts,
  messages,
} from '@/hooks/data';
import { adminNav } from '@/config/adminNav';

const Dashboard = () => {
  const { data: projects = [] } = useProjects();
  const { data: publications = [] } = usePublications();
  const { data: experiences = [] } = useExperiences();
  const { data: posts = [] } = usePosts();
  const { data: msgs = [] } = messages.useList();

  const unread = msgs.filter((m) => !m.is_read).length;

  const stats = [
    { label: 'Experiences', value: experiences.length, to: '/admin/experience' },
    { label: 'Projects', value: projects.length, to: '/admin/projects' },
    { label: 'Publications', value: publications.length, to: '/admin/publications' },
    { label: 'Posts', value: posts.length, to: '/admin/writing' },
    { label: 'Unread messages', value: unread, to: '/admin/messages' },
  ];

  return (
    <>
      <AdminHeading title="Dashboard" description="Overview of your portfolio content." />

      <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="bg-card p-5 transition-colors hover:bg-accent">
            <p className="font-serif text-4xl font-semibold tabular-nums">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="mb-4 mt-12 font-serif text-lg font-semibold">Manage</h2>
      <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {adminNav
          .filter((item) => item.to !== '/admin')
          .map(({ label, to, icon: Icon, ready }) => (
            <Link key={to} to={to} className="flex items-center gap-3 bg-card p-4 transition-colors hover:bg-accent">
              <span className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">{label}</span>
              {!ready && (
                <span className="ml-auto text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  soon
                </span>
              )}
            </Link>
          ))}
      </div>
    </>
  );
};

export default Dashboard;
