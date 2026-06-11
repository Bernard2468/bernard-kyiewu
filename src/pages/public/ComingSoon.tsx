import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader, Container } from '@/components/ui-kit';

/** On-brand placeholder for public sections being built in a later phase. */
const ComingSoon = ({ title, kicker = 'Section' }: { title: string; kicker?: string }) => (
  <>
    <PageHeader kicker={kicker} title={title} intro="This section is being prepared and will be published shortly." />
    <Container className="py-16">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back home
      </Link>
    </Container>
  </>
);

export default ComingSoon;
