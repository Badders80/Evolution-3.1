import React from 'react';
import { cn } from '@/lib/utils';

interface UpdateBodyProps {
  content: string[];
  dropCap?: boolean;
}

export function UpdateBody({ content, dropCap = true }: UpdateBodyProps) {
  return (
    <div className="space-y-4">
      {content.map((p, idx) => (
        <p
          key={idx}
          className={cn(
            "text-[15px] leading-relaxed text-neutral-900 text-justify",
            dropCap && idx === 0 && "first-letter:font-serif first-letter:text-[3.8em] first-letter:float-left first-letter:leading-[0.8] first-letter:mr-2 first-letter:mt-1"
          )}
        >
          {p}
        </p>
      ))}
    </div>
  );
}
