import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/shadcn/card';

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
      <header className="border-b border-black pb-3 mb-6">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-neutral-500">
          {updateType}
        </div>
        <div className="text-[10px] font-medium text-neutral-400 mt-1 uppercase">
          {horseName} • {updateDate}
        </div>
      </header>

      <main className="space-y-6">
        <h1 className="font-serif text-[44px] leading-[1.1] tracking-tight">
          {headline}
        </h1>

        <p className="text-xl font-medium leading-relaxed text-neutral-800">
          {subheadline}
        </p>

        <div className="space-y-4">
          {content.map((p, idx) => (
            <p
              key={idx}
              className={cn(
                "text-[15px] leading-relaxed text-neutral-900 text-justify",
                idx === 0 && "first-letter:font-serif first-letter:text-[3.8em] first-letter:float-left first-letter:leading-[0.8] first-letter:mr-2 first-letter:mt-1"
              )}
            >
              {p}
            </p>
          ))}
        </div>

        {bullets && bullets.length > 0 && (
          <div className="bg-black text-white p-6 border-l-[3px] border-brand-gold my-6">
            <ul className="list-disc pl-5 space-y-2 text-lg font-medium">
              {bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        )}

        {mediaEmbed && (
          <div className={cn(
            "relative w-full rounded-lg overflow-hidden bg-neutral-100",
            mediaEmbed.aspect === 'landscape' ? "aspect-video" : "aspect-[9/16]"
          )}>
            <iframe
              src={mediaEmbed.url}
              className="absolute inset-0 w-full h-full border-none"
              allowFullScreen
            />
          </div>
        )}

        {quote && (
          <div className="bg-neutral-50 p-8 border-l-[3px] border-brand-gold my-6 space-y-4">
            <blockquote className="font-serif text-[22px] italic leading-relaxed text-black">
              <span className="text-3xl leading-[0.8] align-top mr-1">“</span>
              {quote.text}
              <span className="text-3xl leading-[0.8] align-top ml-1">”</span>
            </blockquote>
            <cite className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 not-italic block">
              — {quote.author}
            </cite>
          </div>
        )}
      </main>

      <footer className="mt-12 pt-8 border-t border-neutral-100 text-center space-y-4">
        <h2 className="font-serif text-2xl">
          The Future of <span className="text-brand-gold">Ownership</span> Has Arrived
        </h2>
        <p className="text-[10px] uppercase tracking-wider text-neutral-400">
          Digital-Syndication by Evolution Stables
        </p>
      </footer>
    </Card>
  );
}
