import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui-kit';
import { LoadingState } from '@/components/ui-kit/States';
import { useProfile, useProjects, usePublications } from '@/hooks/data';
import type { Project, Publication } from '@/types/database';

const Home = () => {
  const { data: profile, isLoading } = useProfile();
  const { data: projects = [] } = useProjects();
  const { data: publications = [] } = usePublications();

  if (isLoading && !profile) return <LoadingState label="Loading…" className="min-h-[60vh]" />;

  const roles = profile?.roles ?? [];
  const badges = profile?.badges ?? [];
  const featured = (projects.filter((p) => p.featured).length
    ? projects.filter((p) => p.featured)
    : projects
  ).slice(0, 3);
  const selectedPubs = publications.slice(0, 2);

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="border-b border-border">
        <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:py-28">
          <div className="animate-fade-in-up">
            <p className="kicker mb-5">Portfolio</p>
            <h1 className="text-display font-semibold text-balance">{profile?.full_name}</h1>

            {roles.length > 0 && (
              <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-lg text-muted-foreground">
                {roles.map((role, i) => (
                  <span key={role} className="inline-flex items-center gap-3">
                    {i > 0 && <span className="text-border">/</span>}
                    {role}
                  </span>
                ))}
              </p>
            )}

            {profile?.short_bio && (
              <p className="prose-editorial mt-6">{profile.short_bio}</p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-sm">
                <Link to="/projects">
                  View work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-sm">
                <Link to="/contact">Get in touch</Link>
              </Button>
            </div>

            {badges.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-x-2 gap-y-2">
                {badges.map((badge) => (
                  <li
                    key={badge}
                    className="border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Portrait */}
          <div className="order-first lg:order-last">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="aspect-[4/5] overflow-hidden border border-border bg-muted">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-serif text-6xl text-muted-foreground">
                    {profile?.full_name?.slice(0, 1) ?? 'K'}
                  </div>
                )}
              </div>
              {/* Editorial frame accent (flat, no gradient) */}
              <div className="absolute -bottom-3 -right-3 -z-10 hidden h-full w-full border border-primary lg:block" />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- Selected work */}
      {featured.length > 0 && (
        <Section
          kicker="Selected work"
          heading="Projects & research in practice"
          divided
        >
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <FeaturedProject key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              All projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      )}

      {/* -------------------------------------------------------- Selected papers */}
      {selectedPubs.length > 0 && (
        <Section kicker="Research" heading="Selected publications" divided containerSize="default">
          <ol className="divide-y divide-border border-y border-border">
            {selectedPubs.map((pub) => (
              <PublicationRow key={pub.id} pub={pub} />
            ))}
          </ol>
          <div className="mt-8">
            <Link
              to="/research"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              All publications
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      )}

      {/* ----------------------------------------------------------------- CTA */}
      <section className="border-t border-border bg-card">
        <Container className="flex flex-col items-start justify-between gap-6 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Let’s build something rigorous.</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Open to engineering roles, research collaborations, and speaking engagements.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-sm">
            <Link to="/contact">
              Contact me
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Container>
      </section>
    </>
  );
};

const FeaturedProject = ({ project }: { project: Project }) => (
  <article className="group flex flex-col bg-card p-6 transition-colors hover:bg-accent">
    <div className="flex items-start justify-between gap-3">
      <h3 className="font-serif text-lg font-semibold leading-snug">{project.title}</h3>
      {project.demo_url && (
        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
        </a>
      )}
    </div>
    {project.summary && (
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
    )}
    {project.achievement && (
      <p className="mt-4 text-sm font-medium text-primary">{project.achievement}</p>
    )}
    {project.tech?.length > 0 && (
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.tech.slice(0, 4).map((t) => (
          <li key={t} className="border border-border px-2 py-0.5 text-xs text-muted-foreground">
            {t}
          </li>
        ))}
      </ul>
    )}
  </article>
);

const PublicationRow = ({ pub }: { pub: Publication }) => (
  <li className="flex flex-col gap-1 py-5">
    <div className="flex items-baseline gap-3">
      <h3 className="font-serif text-lg font-medium leading-snug">{pub.title}</h3>
    </div>
    {pub.authors && <p className="text-sm text-muted-foreground">{pub.authors}</p>}
    <p className="text-sm text-muted-foreground">
      {[pub.venue, pub.year].filter(Boolean).join(', ')}
      {pub.status && pub.status !== 'published' && (
        <span className="ml-2 border border-border px-1.5 py-0.5 text-xs uppercase tracking-wide text-primary">
          {pub.status}
        </span>
      )}
    </p>
  </li>
);

export default Home;
