'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <h1 className="text-h2-mobile md:text-h2 mb-4 text-primary">Something went wrong!</h1>
      <p className="text-body text-secondary mb-6 max-w-md">
        We apologize for the inconvenience. Please try again.
      </p>
      <Button
        onClick={() => reset()}
        variant="outline"
        className="text-label uppercase"
      >
        Try Again
      </Button>
    </div>
  );
}
