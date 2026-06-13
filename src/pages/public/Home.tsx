import { Fragment, useEffect, useState } from 'react';
import { useSiteData } from '@/hooks/data';
import type {
  SiteProfile,
  NewsItem,
  ResearchInterest,
  EducationEntry,
  Publication,
  TeachingCourse,
  Award,
  ServiceEntry,
  SiteSection,
  CustomPage,
} from '@/types/database';

// ── Inline brand icons (academicons handle Scholar/ORCID/ResearchGate) ────────
const LinkedInIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GitHubIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

// ── Section shell ─────────────────────────────────────────────────────────────
function SectionShell({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section" tabIndex={-1}>
      <h2 className="section-title">
        <span>{label}</span>
      </h2>
      {children}
    </section>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
function SiteHeader({ profile }: { profile: SiteProfile | null }) {
  const [imgError, setImgError] = useState(false);
  const p = profile;

  if (!p) {
    return (
      <header className="site-header" id="top">
        <div className="header-inner">
          <div className="identity" />
        </div>
      </header>
    );
  }

  const initials = (p.full_name || '')
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const hasPhoto = Boolean(p.photo_url) && !imgError;
  const affLines = [p.department_1, p.department_2, p.university].filter(Boolean);

  const links: { url: string; label: string; icon: React.ReactNode }[] = [];
  if (p.scholar_url)
    links.push({ url: p.scholar_url, label: 'Google Scholar', icon: <i className="ai ai-google-scholar" aria-hidden="true" /> });
  if (p.orcid_url)
    links.push({ url: p.orcid_url, label: 'ORCID', icon: <i className="ai ai-orcid" aria-hidden="true" /> });
  if (p.researchgate_url)
    links.push({ url: p.researchgate_url, label: 'ResearchGate', icon: <i className="ai ai-researchgate" aria-hidden="true" /> });
  if (p.linkedin_url) links.push({ url: p.linkedin_url, label: 'LinkedIn', icon: LinkedInIcon });
  if (p.github_url) links.push({ url: p.github_url, label: 'GitHub', icon: GitHubIcon });

  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <div className="identity">
          <div className={`portrait${hasPhoto ? '' : ' portrait--placeholder'}`} aria-hidden="true">
            {hasPhoto && (
              <img
                src={p.photo_url}
                alt=""
                width={128}
                height={160}
                onError={() => setImgError(true)}
              />
            )}
            <span className="portrait-initials" aria-hidden="true">
              {initials}
            </span>
          </div>

          <div className="identity-text">
            <h1 className="name">{p.full_name}</h1>
            {p.name_alt && <p className="name-alt">{p.name_alt}</p>}
            <p className="title">{p.title}</p>

            <address className="affiliation">
              {affLines.map((a, i) => (
                <span key={i}>{a}</span>
              ))}
            </address>

            <dl className="contact">
              {p.office && (
                <div>
                  <dt>Office</dt>
                  <dd>{p.office}</dd>
                </div>
              )}
              {p.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${p.phone.replace(/\D/g, '')}`}>{p.phone}</a>
                  </dd>
                </div>
              )}
              {p.email && (
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${p.email}`}>{p.email}</a>
                  </dd>
                </div>
              )}
            </dl>

            {links.length > 0 && (
              <ul className="profiles" aria-label="External profiles">
                {links.map((lk, i) => (
                  <li key={i}>
                    <a href={lk.url} rel="noopener noreferrer">
                      {lk.icon}
                      <span>{lk.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function SiteFooter({ updatedAt }: { updatedAt?: string }) {
  let iso = '';
  let label = '—';
  if (updatedAt) {
    const d = new Date(updatedAt);
    iso = d.toISOString().slice(0, 10);
    label = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return (
    <footer className="site-footer">
      <p>
        Last updated <time dateTime={iso}>{label}</time>.{' '}
        <a href="#top">Back to top</a> ·{' '}
        <a href="/admin">Admin</a>
      </p>
    </footer>
  );
}

// ── Section renderers (mirror app.js mk* functions) ───────────────────────────
function Biography({ section, profile }: { section: SiteSection; profile: SiteProfile | null }) {
  const raw = profile?.biography || '';
  const hasHtml = /<[a-z][\s\S]*>/i.test(raw);
  if (hasHtml) {
    return (
      <SectionShell id={section.slug} label={section.label}>
        <div className="prose" dangerouslySetInnerHTML={{ __html: raw || '<p>No biography yet.</p>' }} />
      </SectionShell>
    );
  }
  const paras = raw.split('\n\n').filter(Boolean);
  return (
    <SectionShell id={section.slug} label={section.label}>
      <div className="prose">
        {paras.length ? paras.map((para, i) => <p key={i}>{para.trim()}</p>) : <p>No biography yet.</p>}
      </div>
    </SectionShell>
  );
}

function NewsSection({ section, items }: { section: SiteSection; items: NewsItem[] }) {
  if (!items.length) {
    return (
      <SectionShell id={section.slug} label={section.label}>
        <p className="section-note">No news yet.</p>
      </SectionShell>
    );
  }
  return (
    <SectionShell id={section.slug} label={section.label}>
      <table className="news-table">
        <caption className="visually-hidden">Recent updates</caption>
        <tbody>
          {items.map((n) => {
            const d = n.event_date ? new Date(n.event_date + 'T00:00:00') : null;
            const iso = n.event_date || '';
            const label = d ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
            return (
              <tr key={n.id}>
                <th scope="row">
                  <time dateTime={iso}>{label}</time>
                </th>
                <td dangerouslySetInnerHTML={{ __html: n.body }} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </SectionShell>
  );
}

function ResearchSection({ section, items }: { section: SiteSection; items: ResearchInterest[] }) {
  return (
    <SectionShell id={section.slug} label={section.label}>
      <ul className="research-list">
        {items.map((r) => (
          <li key={r.id}>{r.label}</li>
        ))}
      </ul>
    </SectionShell>
  );
}

function EducationSection({ section, items }: { section: SiteSection; items: EducationEntry[] }) {
  return (
    <SectionShell id={section.slug} label={section.label}>
      <ol className="timeline">
        {items.map((e) => (
          <li key={e.id}>
            <span className="timeline-degree">{e.degree}</span>
            <span className="timeline-inst">{e.institution}</span>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

const PUB_TYPE_LABELS: Record<string, string> = {
  journal: 'Journal Articles',
  conference: 'Conference Papers',
  workshop: 'Workshop & Demo Papers',
};

function PublicationsSection({ section, items }: { section: SiteSection; items: Publication[] }) {
  const grouped: Record<string, Publication[]> = { journal: [], conference: [], workshop: [] };
  for (const p of items) if (grouped[p.pub_type]) grouped[p.pub_type].push(p);

  return (
    <SectionShell id={section.slug} label={section.label}>
      <p className="section-note">Representative works listed below.</p>
      {Object.entries(PUB_TYPE_LABELS).map(([type, label]) =>
        grouped[type].length ? (
          <Fragment key={type}>
            <h3 className="subsection-title">{label}</h3>
            <ol className="pub-list">
              {grouped[type].map((p) => {
                const links: { href: string; label: string }[] = [];
                if (p.pdf_url) links.push({ href: p.pdf_url, label: 'PDF' });
                if (p.doi_url) links.push({ href: p.doi_url, label: 'DOI' });
                if (p.slides_url) links.push({ href: p.slides_url, label: 'Slides' });
                return (
                  <li key={p.id}>
                    <span className="pub-id">{p.pub_id}.</span>
                    <span className="pub-body">
                      <span dangerouslySetInnerHTML={{ __html: p.citation }} />
                      {p.award_note && <span className="pub-award">{p.award_note}</span>}
                      {links.length > 0 && (
                        <>
                          {' '}
                          <span className="pub-links">
                            [
                            {links.map((l, i) => (
                              <Fragment key={i}>
                                {i > 0 && '] ['}
                                <a href={l.href} rel="noopener noreferrer">
                                  {l.label}
                                </a>
                              </Fragment>
                            ))}
                            ]
                          </span>
                        </>
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>
          </Fragment>
        ) : null,
      )}
    </SectionShell>
  );
}

function TeachingSection({ section, items }: { section: SiteSection; items: TeachingCourse[] }) {
  const groups = new Map<string, string[]>();
  const ungrouped: string[] = [];
  for (const t of items) {
    if (t.institution) {
      if (!groups.has(t.institution)) groups.set(t.institution, []);
      groups.get(t.institution)!.push(t.label);
    } else {
      ungrouped.push(t.label);
    }
  }
  return (
    <SectionShell id={section.slug} label={section.label}>
      <div className="prose">
        {Array.from(groups.entries()).map(([inst, labels], gi) => (
          <Fragment key={gi}>
            <p>
              <strong>{inst}</strong>
            </p>
            <ul>
              {labels.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </Fragment>
        ))}
        {ungrouped.length > 0 && (
          <ul>
            {ungrouped.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        )}
      </div>
    </SectionShell>
  );
}

function AwardsSection({ section, items }: { section: SiteSection; items: Award[] }) {
  return (
    <SectionShell id={section.slug} label={section.label}>
      <ul className="awards-list">
        {items.map((a) => (
          <li key={a.id} dangerouslySetInnerHTML={{ __html: a.label }} />
        ))}
      </ul>
    </SectionShell>
  );
}

function ServiceSection({ section, items }: { section: SiteSection; items: ServiceEntry[] }) {
  const groups = new Map<string, string[]>();
  for (const row of items) {
    if (!groups.has(row.category)) groups.set(row.category, []);
    groups.get(row.category)!.push(row.label);
  }
  return (
    <SectionShell id={section.slug} label={section.label}>
      <div className="service-grid">
        {Array.from(groups.entries()).map(([cat, labels], i) => (
          <div key={i}>
            <h3 className="subsection-title">{cat}</h3>
            <ul>
              {labels.map((l, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: l }} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function CustomPageSection({ page }: { page: CustomPage }) {
  return (
    <SectionShell id={page.slug} label={page.title}>
      <div className="prose" dangerouslySetInnerHTML={{ __html: page.content }} />
    </SectionShell>
  );
}

interface SectionData {
  profile: SiteProfile | null;
  news: NewsItem[];
  research: ResearchInterest[];
  education: EducationEntry[];
  pubs: Publication[];
  teaching: TeachingCourse[];
  awards: Award[];
  service: ServiceEntry[];
}

function renderSection(s: SiteSection, d: SectionData) {
  switch (s.slug) {
    case 'biography':
      return <Biography section={s} profile={d.profile} />;
    case 'news':
      return <NewsSection section={s} items={d.news} />;
    case 'research':
      return <ResearchSection section={s} items={d.research} />;
    case 'education':
      return <EducationSection section={s} items={d.education} />;
    case 'publications':
      return <PublicationsSection section={s} items={d.pubs} />;
    case 'teaching':
      return <TeachingSection section={s} items={d.teaching} />;
    case 'awards':
      return <AwardsSection section={s} items={d.awards} />;
    case 'service':
      return <ServiceSection section={s} items={d.service} />;
    default:
      return null;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
const Home = () => {
  const { data, isLoading } = useSiteData();
  const profile = data?.profile ?? null;

  useEffect(() => {
    if (profile?.full_name) document.title = `${profile.full_name} | Home`;
  }, [profile?.full_name]);

  const visibleSections = (data?.sections ?? []).filter((s) => s.visible);
  const visiblePages = (data?.pages ?? []).filter((p) => p.visible);
  const news = (data?.news ?? []).filter((n) => n.visible);
  const pubs = (data?.pubs ?? []).filter((p) => p.visible);

  const navSlugs = [
    ...visibleSections.map((s) => s.slug),
    ...visiblePages.map((p) => p.slug),
  ].join(',');

  // Scroll-spy + mobile nav toggle — mirrors initNavObserver in app.js.
  useEffect(() => {
    if (!data) return;
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.section-nav a'));
    const navToggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
    const sectionNav = document.getElementById('section-nav');

    const observed: Element[] = [];
    navLinks.forEach((link) => {
      const id = link.getAttribute('href');
      if (id?.startsWith('#')) {
        const sec = document.querySelector(id);
        if (sec) observed.push(sec);
      }
    });

    let obs: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window && observed.length) {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              navLinks.forEach((l) => {
                const active = l.getAttribute('href') === '#' + entry.target.id;
                l.classList.toggle('is-active', active);
                if (active) l.setAttribute('aria-current', 'location');
                else l.removeAttribute('aria-current');
              });
            }
          });
        },
        { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
      );
      observed.forEach((el) => obs!.observe(el));
    }

    const onLinkClick = () => {
      if (window.matchMedia('(max-width:800px)').matches && sectionNav) {
        sectionNav.classList.remove('is-open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    };
    navLinks.forEach((l) => l.addEventListener('click', onLinkClick));

    const onToggle = () => {
      if (!navToggle) return;
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      sectionNav?.classList.toggle('is-open', !expanded);
    };
    navToggle?.addEventListener('click', onToggle);

    return () => {
      obs?.disconnect();
      navLinks.forEach((l) => l.removeEventListener('click', onLinkClick));
      navToggle?.removeEventListener('click', onToggle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navSlugs, Boolean(data)]);

  if (!data && isLoading) {
    return (
      <main id="main" className="content">
        <p className="page-loading">Loading…</p>
      </main>
    );
  }

  const sectionData: SectionData = {
    profile,
    news,
    research: data?.research ?? [],
    education: data?.education ?? [],
    pubs,
    teaching: data?.teaching ?? [],
    awards: data?.awards ?? [],
    service: data?.service ?? [],
  };

  const navItems = [
    ...visibleSections.map((s) => ({ slug: s.slug, label: s.label })),
    ...visiblePages.map((p) => ({ slug: p.slug, label: p.title })),
  ];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader profile={profile} />

      <div className="page-shell">
        <nav className="sidebar" aria-label="Page sections">
          <button className="nav-toggle" type="button" aria-expanded="false" aria-controls="section-nav">
            <span className="nav-toggle-label">Sections</span>
            <span className="nav-toggle-icon" aria-hidden="true" />
          </button>
          <ol className="section-nav" id="section-nav">
            {navItems.map((s, i) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className={i === 0 ? 'is-active' : undefined}>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <main id="main" className="content">
          {visibleSections.map((s) => (
            <Fragment key={s.slug}>{renderSection(s, sectionData)}</Fragment>
          ))}
          {visiblePages.map((p) => (
            <CustomPageSection key={p.slug} page={p} />
          ))}
        </main>
      </div>

      <SiteFooter updatedAt={profile?.updated_at} />
    </>
  );
};

export default Home;
