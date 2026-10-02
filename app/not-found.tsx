import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <EmptyState
        icon={FileQuestion}
        title="Page Not Found"
        description="The page you are looking for does not exist or has been moved."
        action={
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            Go back home
          </Link>
        }
      />
    </div>
  );
}
