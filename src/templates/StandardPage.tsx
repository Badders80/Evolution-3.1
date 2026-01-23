import React from 'react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui-system/patterns';

interface StandardPageProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * StandardPage Template
 *
 * Default layout for informational pages (How it works, Why Evolution, etc.)
 */
export function StandardPage({
  eyebrow,
  title,
  description,
  children,
  className,
}: StandardPageProps) {
  return (
    <main className={cn("min-h-screen pt-32 pb-24", className)}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        <SectionHeader
          eyebrow={eyebrow}
          heading={title}
          description={description}
        />
        {children}
      </div>
    </main>
  );
}
