import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui-kit';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 — route not found:', location.pathname);
  }, [location.pathname]);

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="kicker mb-4">Error 404</p>
      <h1 className="text-display-sm font-semibold">Page not found</h1>
      <p className="prose-editorial mx-auto mt-4 text-muted-foreground">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Button asChild className="mt-8 rounded-sm">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back home
        </Link>
      </Button>
    </Container>
  );
};

export default NotFound;
