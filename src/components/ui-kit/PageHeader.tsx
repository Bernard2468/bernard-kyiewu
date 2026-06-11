import { cn } from '@/lib/utils';
import { Container } from './Container';

interface PageHeaderProps {
  kicker?: string;
  title: string;
  intro?: string;
  className?: string;
  align?: 'left' | 'center';
}

/** Editorial page masthead: kicker · serif title · hairline rule · intro. */
export const PageHeader = ({ kicker, title, intro, className, align = 'left' }: PageHeaderProps) => (
  <header className={cn('border-b border-border bg-card', className)}>
    <Container className={cn('py-14 sm:py-20', align === 'center' && 'text-center')}>
      {kicker && <p className="kicker mb-4">{kicker}</p>}
      <h1 className="text-display-sm font-semibold text-balance">{title}</h1>
      {intro && (
        <p
          className={cn(
            'prose-editorial mt-5 text-muted-foreground',
            align === 'center' && 'mx-auto',
          )}
        >
          {intro}
        </p>
      )}
    </Container>
  </header>
);
