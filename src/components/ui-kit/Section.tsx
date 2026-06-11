import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  kicker?: string;
  heading?: string;
  intro?: string;
  containerSize?: 'default' | 'narrow' | 'wide';
  /** Render a hairline at the top of the section. */
  divided?: boolean;
}

/** A vertical content band with an optional editorial heading block. */
export const Section = ({
  kicker,
  heading,
  intro,
  containerSize = 'default',
  divided = false,
  className,
  children,
  ...props
}: SectionProps) => (
  <section className={cn('py-16 sm:py-24', divided && 'border-t border-border', className)} {...props}>
    <Container size={containerSize}>
      {(kicker || heading || intro) && (
        <div className="mb-10 max-w-2xl">
          {kicker && <p className="kicker mb-3">{kicker}</p>}
          {heading && <h2 className="text-3xl font-semibold sm:text-4xl text-balance">{heading}</h2>}
          {intro && <p className="prose-editorial mt-4 text-muted-foreground">{intro}</p>}
        </div>
      )}
      {children}
    </Container>
  </section>
);
