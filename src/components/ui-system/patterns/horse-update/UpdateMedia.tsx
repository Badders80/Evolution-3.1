import React from 'react';
import { cn } from '@/lib/utils';

interface UpdateMediaProps {
  url: string;
  aspect?: 'landscape' | 'portrait';
}

export function UpdateMedia({ url, aspect = 'landscape' }: UpdateMediaProps) {
  return (
    <div className={cn(
      "relative w-full rounded-lg overflow-hidden bg-neutral-100 my-6",
      aspect === 'landscape' ? "aspect-video" : "aspect-[9/16]"
    )}>
      <iframe
        src={url}
        className="absolute inset-0 w-full h-full border-none"
        allowFullScreen
      />
    </div>
  );
}
