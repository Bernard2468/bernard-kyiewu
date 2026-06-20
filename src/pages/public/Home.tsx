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

// ── Inline brand icons (no external icon font / CDN) ──────────────────────────
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
// CV / résumé download icon (document with a downward arrow).
const CvIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18v-6M9.5 15.5 12 18l2.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
// Academic icons inlined (from the academicons set, OFL) so nothing loads from a
// third-party CDN that browser tracking-prevention can block.
const ScholarIcon = (
  <svg aria-hidden="true" viewBox="0 0 384 512" width="12" height="16" fill="currentColor">
    <path d="M 343.75868,106.66243 V 79.430205 L 363.52365,63.999997 H 149.63354 L 20.476345,176.2736 h 85.656075 c -0.15534,2.12494 -0.21914,4.04644 -0.21914,6.22563 0,20.84472 7.2192,38.08662 21.67203,51.86089 14.45284,13.79702 32.25124,20.64784 53.32651,20.64784 4.92319,0 9.75059,-0.36794 14.43842,-1.02419 -2.90722,6.50082 -4.37457,12.52302 -4.37457,18.14228 0,9.87526 4.49924,20.4304 13.46715,31.6418 -39.23377,2.6705 -68.06112,9.73264 -86.43702,21.16322 -10.53108,6.49907 -19.000207,14.70396 -25.390349,24.5311 -6.390569,9.89933 -9.577754,20.51525 -9.577754,31.9616 0,9.64822 2.062375,18.33611 6.21907,26.06233 4.156694,7.7263 9.577757,14.07047 16.312223,18.98408 6.71825,4.96781 14.46899,9.10088 23.219,12.46874 8.73429,3.34378 17.40643,5.71858 26.06106,7.06258 8.62707,1.34222 17.20471,1.9985 25.70579,1.9985 13.46887,0 26.95353,-1.73428 40.54711,-5.18707 13.56165,-3.48461 26.28022,-8.64143 38.17105,-15.4927 11.85935,-6.80488 21.51545,-16.0865 28.9219,-27.7183 7.39024,-11.67998 11.09457,-24.80499 11.09457,-39.33613 0,-11.01584 -2.24964,-21.03852 -6.7502,-30.14073 -4.46864,-9.07202 -9.93785,-16.54102 -16.45271,-22.34403 -6.5008,-5.81263 -12.99987,-11.15539 -19.51512,-15.9679 -6.50083,-4.84488 -12.00021,-9.75058 -16.46884,-14.8129 -4.4848,-5.04657 -6.73444,-10.05419 -6.73444,-14.98395 0,-4.92145 1.73422,-9.67183 5.21588,-14.26559 3.45451,-4.6095 7.67376,-9.04795 12.60967,-13.30571 4.93756,-4.24944 9.87523,-8.96788 14.79665,-14.13302 4.92147,-5.14719 9.14072,-11.82739 12.60971,-20.00822 3.48467,-8.17907 5.20318,-17.44489 5.20318,-27.75679 0,-13.4527 -2.54714,-24.46065 -7.54735,-33.31348 -0.59369,-1.02243 -1.21757,-1.80338 -1.87511,-3.02225 l 56.90745,-46.672136 v 17.118526 c -7.39373,0.92969 -6.62422,5.34582 -6.62422,10.6352 v 128.66719 c 0,5.95832 4.8751,10.83382 10.83386,10.83382 h 3.98869 c 5.95835,0 10.83386,-4.87506 10.83386,-10.83382 V 117.29282 c 0,-5.27669 0.77741,-9.68801 -6.56167,-10.63039 z M 236.39865,329.14114 c 1.14099,0.7503 3.7039,2.78075 7.7184,6.03838 4.0495,3.24319 6.797,5.69582 8.26567,7.41432 1.43851,1.66381 3.5792,4.16501 6.37617,7.54734 2.81268,3.3744 4.7184,6.30394 5.71853,8.73425 1.00016,2.4767 2.01603,5.46089 3.04636,8.94556 0.98567,3.44488 1.48486,6.97595 1.48486,10.56169 0,17.04813 -6.56338,29.68007 -19.65604,37.85915 -13.125,8.18083 -28.76651,12.27368 -46.93767,12.27368 -9.18709,0 -18.2031,-1.09289 -27.06247,-3.1951 -8.84322,-2.11665 -17.31192,-5.3362 -25.39035,-9.60185 -8.07846,-4.25771 -14.57754,-10.20337 -19.50072,-17.79659 -4.93764,-7.64012 -7.40645,-16.41464 -7.40645,-26.24962 0,-10.32022 2.79692,-19.28987 8.42233,-26.90588 5.59343,-7.62564 12.93774,-13.3919 22.03208,-17.3154 9.0624,-3.94582 18.24946,-6.74232 27.56166,-8.39827 9.31221,-1.7023 18.79679,-2.555 28.43842,-2.555 4.46862,0 7.93582,0.25115 10.40465,0.69607 0.45456,0.21918 3.03188,2.07025 7.73456,5.56326 4.70401,3.46237 7.62565,5.59519 8.75047,6.38401 z m -3.35823,-100.5779 c -7.40648,8.85938 -17.73454,13.2882 -30.95363,13.2882 -11.85933,0 -22.29766,-4.76482 -31.26554,-14.31195 -8.99984,-9.52309 -15.42235,-20.32803 -19.34408,-32.43061 -3.93752,-12.10871 -5.90585,-23.98423 -5.90585,-35.648 0,-13.6942 3.59542,-25.35184 10.7809,-34.97598 7.18727,-9.64952 17.49915,-14.48477 30.93786,-14.48477 11.87507,0 22.37423,5.03825 31.43704,15.15677 9.09434,10.08482 15.60961,21.41303 19.5169,33.96799 3.92176,12.5392 5.87345,24.52979 5.87345,35.98399 0,13.44658 -3.70256,24.60984 -11.07663,33.45436 z" />
  </svg>
);
const OrcidIcon = (
  <svg aria-hidden="true" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
    <path d="m 336.6206,194.53756 c -7.12991,-3.32734 -13.8671,-5.55949 -20.25334,-6.61343 -6.36534,-1.09517 -16.57451,-1.61223 -30.71059,-1.61223 h -36.70409 v 152.74712 h 37.63425 c 14.6735,0 26.08126,-1.01267 34.22385,-3.01709 8.14259,-2.00442 14.92159,-4.52592 20.35674,-7.62608 5.43519,-3.07925 10.416,-6.8615 14.94192,-11.38742 14.4876,-14.71475 21.74129,-33.27334 21.74129,-55.7176 0,-22.05151 -7.44016,-40.05177 -22.34085,-53.98159 -5.49732,-5.16674 -11.82143,-9.44459 -18.88918,-12.79281 z M 255.99999,8.0000031 C 119.02153,8.0000031 8.0000034,119.04185 8.0000034,255.99998 8.0000034,392.95812 119.02153,504 255.99999,504 392.97849,504 504,392.95812 504,255.99998 504,119.04185 392.97849,8.0000031 255.99999,8.0000031 Z M 173.66372,365.51268 H 144.27546 V 160.1481 h 29.38826 z M 158.94954,138.69619 c -11.13935,0 -20.21208,-9.01056 -20.21208,-20.21208 0,-11.11841 9.05183,-20.191181 20.21208,-20.191181 11.18058,0 20.23244,9.051831 20.23244,20.191181 -0.0219,11.22184 -9.05186,20.21208 -20.23244,20.21208 z m 241.3866,163.59715 c -5.29051,12.54475 -12.83407,23.58066 -22.65053,33.08742 -9.98203,9.83734 -21.59659,17.19443 -34.84378,22.19616 -7.74983,3.01709 -14.83852,5.06335 -21.30725,6.11726 -6.4891,1.01267 -18.82759,1.50883 -37.07593,1.50883 H 219.5033 V 160.1481 h 69.23318 c 27.96195,0 50.03378,4.1541 66.31951,12.54476 16.26485,8.36977 29.18144,20.72859 38.79164,36.97254 9.61013,16.26483 14.4254,34.01757 14.4254,53.19607 0.0227,13.76426 -2.66619,26.90802 -7.93576,39.43187 z" />
  </svg>
);
const ResearchGateIcon = (
  <svg aria-hidden="true" viewBox="0 0 384 512" width="12" height="16" fill="currentColor">
    <path d="M 228.65968,408.10149 C 208.46616,386.12784 181.4422,350.83324 158.962,310.93516 c 37.13444,-8.68487 64.63318,-43.55027 64.63318,-78.38386 0,-51.3457 -39.88089,-75.17678 -92.16329,-75.17678 -27.02266,0 -48.583367,1.36546 -68.715441,1.36546 -18.369155,0 -36.722401,0 -48.154153,-0.4447 v 13.30466 l 17.401097,3.19159 c 11.968845,2.30214 18.78249,7.76579 18.78249,36.21494 v 180.59919 c 0,28.43543 -6.813222,33.92871 -18.78249,36.19953 l -17.401097,3.25258 v 13.25908 c 12.367998,-0.4447 33.912828,-1.3513 55.473533,-1.3513 20.62404,0 47.217451,0.9066 58.680561,1.3513 v -13.25908 l -23.84698,-3.25258 c -12.366696,-1.796 -18.813848,-7.7641 -18.813848,-36.19953 v -76.54225 c 11.002507,0.92078 20.624038,0.92078 35.325548,0.92078 27.95932,49.94887 54.55102,87.55896 69.65214,104.9618 13.779,16.52587 34.84949,27.05401 61.44162,27.05401 7.78128,0 16.02316,-1.36721 21.05458,-3.68315 v -11.89361 c -16.49625,0 -32.99204,-11.47725 -44.8702,-24.3213 z M 119.06392,295.34424 c -15.59093,0 -22.434257,-0.41463 -33.007939,-1.41103 V 178.91935 c 10.573682,-0.92079 24.751869,-0.92079 37.135739,-0.92079 38.53132,0 61.42745,20.19525 61.42745,56.83902 0,36.21495 -24.73641,60.50666 -65.55525,60.50666 z m 139.93416,-115.7035 c -0.4606,-2.4087 -0.87524,-5.21701 -1.24303,-8.45544 -0.38328,-3.26846 -0.63033,-7.10411 -0.78243,-11.63108 -0.15386,-4.49562 -0.21509,-9.98891 -0.21509,-16.28098 0,-6.32297 0.0616,-11.7398 0.21509,-16.25087 0.15258,-4.52698 0.39915,-8.4099 0.78243,-11.64703 0.36778,-3.22291 0.78243,-6.0467 1.24303,-8.45541 0.4447,-2.4246 1.02776,-4.72679 1.78055,-6.981678 3.94262,-11.923264 10.40396,-20.884861 19.44246,-26.901503 9.0226,-6.015342 20.08653,-9.036752 33.22147,-9.036752 6.75224,0 12.87587,0.782429 18.30773,2.377345 5.37082,1.580761 10.1887,3.760457 14.43897,6.552435 4.18926,2.762339 7.81137,6.015349 10.80317,9.698476 3.06868,3.697285 5.53882,7.641624 7.47319,11.877718 0.75106,1.349583 0.53752,2.424608 -0.65998,3.175676 l -16.68012,6.858773 c -1.41275,0.75278 -2.40869,0.36907 -3.19287,-1.12058 -3.74283,-6.93613 -6.93611,-11.49275 -12.18281,-14.806757 -5.30941,-3.299853 -10.22007,-4.865129 -18.3077,-4.865129 -8.79314,0 -12.7216,1.748734 -18.22953,5.693102 -5.46364,3.867008 -9.46901,8.732137 -11.83217,16.142614 -0.47437,1.33581 -0.9053,2.99348 -1.41104,4.94203 -0.41463,1.97991 -0.75278,4.40452 -0.9663,7.24247 -0.21544,2.83925 -0.41464,6.35308 -0.59855,10.49678 -0.12246,4.14373 -0.18403,9.17686 -0.18403,15.00788 0,5.86107 0.0616,10.8942 0.18403,15.03794 0.18402,4.12779 0.38328,7.64162 0.59855,10.48086 0.2135,2.86931 0.55167,5.27805 0.9663,7.27386 0.50616,1.91846 0.93667,3.57483 1.41104,4.92613 2.36316,7.38084 5.74037,11.41585 10.71205,14.65467 4.91068,3.28394 10.55651,5.64755 19.34965,5.64755 7.81134,0 14.96232,-2.22524 19.62634,-5.61746 4.61979,-3.39094 8.45544,-7.87108 10.17452,-13.99472 0.75281,-2.57843 1.71916,-5.78588 2.3791,-9.71393 0.59853,-3.92843 0.59853,-8.08632 0.59853,-13.82497 0,-0.9066 -0.5074,-1.36721 -1.3513,-1.36721 h -26.71631 c -1.50383,0 -2.24073,-0.73558 -2.24073,-2.23898 v -15.31466 c 0,-1.51931 0.7369,-2.25661 2.24073,-2.25661 h 49.02807 c 1.53521,0 2.25661,0.73688 2.25661,2.25661 v 13.08938 c 0,6.93614 0,13.36612 -0.7214,19.32001 -0.69131,5.95392 -1.62625,11.10951 -2.80789,14.86822 -3.74453,11.7712 -9.68254,20.14969 -18.78247,26.39405 -9.1313,6.29165 -20.90079,9.68257 -33.6838,9.68257 -13.13494,0 -24.19891,-3.02183 -33.22147,-9.0226 -9.0385,-6.07635 -15.49984,-14.99239 -19.44246,-26.91566 -0.75279,-2.25489 -1.33585,-4.57253 -1.78055,-6.99714 z" />
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

  const links: { url: string; label: string; icon: React.ReactNode; newTab?: boolean }[] = [];
  if (p.scholar_url) links.push({ url: p.scholar_url, label: 'Google Scholar', icon: ScholarIcon });
  if (p.orcid_url) links.push({ url: p.orcid_url, label: 'ORCID', icon: OrcidIcon });
  if (p.researchgate_url)
    links.push({ url: p.researchgate_url, label: 'ResearchGate', icon: ResearchGateIcon });
  if (p.linkedin_url) links.push({ url: p.linkedin_url, label: 'LinkedIn', icon: LinkedInIcon });
  if (p.github_url) links.push({ url: p.github_url, label: 'GitHub', icon: GitHubIcon });
  if (p.cv_url) links.push({ url: p.cv_url, label: 'CV', icon: CvIcon, newTab: true });

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
                    <a
                      href={lk.url}
                      rel="noopener noreferrer"
                      target={lk.newTab ? '_blank' : undefined}
                    >
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
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (profile?.full_name) document.title = `${profile.full_name} | Home`;
  }, [profile?.full_name]);

  // Back-to-top button — appears after scrolling past 300px (mirrors GNRS).
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

      <button
        type="button"
        className={`back-to-top${showBackToTop ? ' is-visible' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
};

export default Home;
