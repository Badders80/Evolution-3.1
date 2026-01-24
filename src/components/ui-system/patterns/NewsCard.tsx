import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/shadcn/card';

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  publisher: string;
  url: string;
  imageUrl?: string;
  className?: string;
}

/**
 * NewsCard Pattern
 *
 * Standardised for press coverage and news updates.
 */
export function NewsCard({
  title,
  excerpt,
  date,
  publisher,
  url,
  imageUrl,
  className,
}: NewsCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group block space-y-6", className)}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-700">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/10 font-medium tracking-widest uppercase text-xs">
            {publisher}
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            {date}
          </span>
          <div className="h-px w-6 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold">
            {publisher}
          </span>
        </div>

        <h2 className="heading-sub group-hover:text-brand-gold transition-colors duration-300">
          {title}
        </h2>

        <p className="body-standard line-clamp-3">
          {excerpt}
        </p>

        <div className="pt-2">
          <span className="text-label flex items-center gap-2 group-hover:text-neutral-100 transition-colors">
            Read Full Article
            <svg
              className="w-3 h-3 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
