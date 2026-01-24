import React from 'react';

interface UpdateHeadlineProps {
  headline: string;
  subheadline?: string;
}

export function UpdateHeadline({ headline, subheadline }: UpdateHeadlineProps) {
  return (
    <div className="space-y-6 mb-6">
      <h1 className="font-serif text-[44px] leading-[1.1] tracking-tight">
        {headline}
      </h1>
      {subheadline && (
        <p className="text-xl font-medium leading-relaxed text-neutral-800">
          {subheadline}
        </p>
      )}
    </div>
  );
}
