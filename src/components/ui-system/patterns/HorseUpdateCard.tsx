import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/shadcn/card';
import {
  UpdateHeader,
  UpdateHeadline,
  UpdateBody,
  UpdateBullets,
  UpdateQuote,
  UpdateMedia,
  UpdateFooter
} from './horse-update';

interface HorseUpdateCardProps {
  horseName: string;
  updateDate: string;
  updateType: 'TRAINER UPDATE' | 'RACE UPDATE' | 'HEALTH UPDATE';
  headline: string;
  subheadline: string;
  content: string[];
  bullets?: string[];
  quote?: {
    text: string;
    author: string;
  };
  mediaEmbed?: {
    url: string;
    aspect: 'landscape' | 'portrait';
  };
  className?: string;
}

/**
 * HorseUpdateCard Pattern
 *
 * Composed from atomic horse-update components.
 * Extracted from the "First Gear" update pages.
 * Designed for institutional-grade horse racing updates.
 */
export function HorseUpdateCard({
  horseName,
  updateDate,
  updateType,
  headline,
  subheadline,
  content,
  bullets,
  quote,
  mediaEmbed,
  className,
}: HorseUpdateCardProps) {
  return (
    <Card className={cn("max-w-[430px] mx-auto bg-white text-black p-6 font-sans border-none rounded-none shadow-xl", className)}>
      <UpdateHeader
        updateType={updateType}
        horseName={horseName}
        updateDate={updateDate}
      />

      <main>
        <UpdateHeadline
          headline={headline}
          subheadline={subheadline}
        />

        <UpdateBody content={content} />

        {bullets && bullets.length > 0 && (
          <UpdateBullets bullets={bullets} />
        )}

        {mediaEmbed && (
          <UpdateMedia
            url={mediaEmbed.url}
            aspect={mediaEmbed.aspect}
          />
        )}

        {quote && (
          <UpdateQuote
            text={quote.text}
            author={quote.author}
          />
        )}
      </main>

      <UpdateFooter />
    </Card>
  );
}
