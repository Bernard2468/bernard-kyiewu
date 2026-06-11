import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Narrower reading width for text-heavy pages. */
  size?: 'default' | 'narrow' | 'wide';
}

const sizes = {
  narrow: 'max-w-3xl',
  default: 'max-w-7xl',
  wide: 'max-w-8xl',
} as const;

/** Centered, padded content column. Caps width but lets 1600px+ screens breathe. */
export const Container = ({ size = 'default', className, ...props }: ContainerProps) => (
  <div className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', sizes[size], className)} {...props} />
);
