import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Container } from '@/components/ui-kit';
import { useProfile } from '@/hooks/data';
import { navItems } from '@/config/nav';

// X (Twitter) has no current lucide glyph we want; inline a minimal mark.
const XMark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

export const SiteFooter = () => {
  const { data: profile } = useProfile();
  const year = new Date().getFullYear();
  const socials = profile?.socials ?? {};
  const name = profile?.full_name || 'Kyiewu Bernard';
  const roles = profile?.roles?.length
    ? profile.roles.join(' · ')
    : 'AI Engineer · Computer Engineer · Health & Safety Advocate';

  const links = [
    socials.github && { icon: Github, href: socials.github, label: 'GitHub' },
    socials.linkedin && { icon: Linkedin, href: socials.linkedin, label: 'LinkedIn' },
    socials.x && { icon: XMark, href: socials.x, label: 'X' },
    (socials.email || profile?.email) && {
      icon: Mail,
      href: socials.email || `mailto:${profile?.email}`,
      label: 'Email',
    },
  ].filter(Boolean) as { icon: typeof Github; href: string; label: string }[];

  return (
    <footer className="border-t border-border bg-card">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-semibold">{name}</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{roles}</p>
            <div className="mt-5 flex items-center gap-2">
              {links.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              ))}
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:max-w-xs">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="rule mt-12" />
        <p className="mt-6 text-xs text-muted-foreground">
          © {year} {name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};
