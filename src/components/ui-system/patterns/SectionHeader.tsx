import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * SectionHeader Pattern
 *
 * Standardized for consistent section introductions.
 */
export function SectionHeader({
  eyebrow,
  heading,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn(
      "space-y-6 mb-16",
      align === 'center' ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl",
      className
    )}>
      <p className="label-overline">
        {eyebrow}
      </p>
      <h2 className="heading-section">
        {heading}
      </h2>
      {description && (
        <p className="body-lead">
          {description}
        </p>
      )}
    </header>
  );
}
