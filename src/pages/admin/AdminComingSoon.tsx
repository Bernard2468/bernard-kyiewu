import { Wrench } from 'lucide-react';
import { AdminHeading } from '@/components/admin/AdminUI';

/** Placeholder for admin editors implemented in a later phase. */
const AdminComingSoon = ({ title }: { title: string }) => (
  <>
    <AdminHeading title={title} />
    <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-border py-20 text-center text-muted-foreground">
      <Wrench className="h-6 w-6" />
      <p className="text-sm">This editor is coming in the next phase.</p>
    </div>
  </>
);

export default AdminComingSoon;
