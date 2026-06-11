import { AlertTriangle, Inbox, Loader2, Settings2 } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export const LoadingState = ({ label = 'Loading…', className }: { label?: string; className?: string }) => (
  <div className={cn('flex items-center justify-center gap-2 py-16 text-muted-foreground', className)}>
    <Loader2 className="h-4 w-4 animate-spin" />
    <span className="text-sm">{label}</span>
  </div>
);

export const EmptyState = ({ message = 'Nothing here yet.', className }: { message?: string; className?: string }) => (
  <div className={cn('flex flex-col items-center justify-center gap-2 py-16 text-center text-muted-foreground', className)}>
    <Inbox className="h-6 w-6" />
    <p className="text-sm">{message}</p>
  </div>
);

export const ErrorState = ({ error, className }: { error?: unknown; className?: string }) => (
  <div className={cn('flex flex-col items-center justify-center gap-2 py-16 text-center', className)}>
    <AlertTriangle className="h-6 w-6 text-destructive" />
    <p className="text-sm text-muted-foreground">
      {error instanceof Error ? error.message : 'Something went wrong loading this content.'}
    </p>
  </div>
);

/** Inline banner shown when env vars are missing, so the site degrades gracefully. */
export const ConfigBanner = () => {
  if (isSupabaseConfigured) return null;
  return (
    <div className="border-b border-border bg-muted">
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-5 py-3 text-sm sm:px-6 lg:px-8">
        <Settings2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          Supabase isn’t configured yet. Copy <code className="text-foreground">.env.example</code> to{' '}
          <code className="text-foreground">.env.local</code>, add your project URL and anon key, then restart the dev server.
        </p>
      </div>
    </div>
  );
};
