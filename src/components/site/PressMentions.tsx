'use client';

import React, { useState } from 'react';

interface PressArticle {
  title: string;
  url: string;
  publisher: string;
  date: string;
  excerpt?: string;
}

interface PressMentionsProps {
  articles: PressArticle[];
  initialCount?: number;
}

/**
 * PressMentions Component
 * 
 * Displays press coverage and external articles in a subtle, elegant way.
 * Shows a limited number initially with option to expand and view all.
 * Helps with SEO by creating backlinks and associating your brand with
 * reputable publications.
 */
export function PressMentions({ articles, initialCount = 3 }: PressMentionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!articles || articles.length === 0) return null;

  const displayedArticles = isExpanded ? articles : articles.slice(0, initialCount);
  const hasMore = articles.length > initialCount;

  return (
    <section className="py-20 bg-background border-y border-white/5">
      <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20">
        {/* Section Label */}
        <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-8 text-white/30 text-center">
          AS FEATURED IN
        </p>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArticles.map((article, index) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:scale-[1.02] ${
                index === 2 ? 'md:hidden lg:block' : ''
              }`}
            >
              {/* Subtle glow on hover */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10">
                {/* Publisher */}
                <div className="mb-3">
                  <span className="text-[10px] font-light tracking-wider uppercase text-primary">
                    {article.publisher}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[15px] leading-[1.5] font-light text-white/90 mb-3 group-hover:text-white transition-colors line-clamp-3">
                  {article.title}
                </h3>

                {/* Excerpt (if provided) */}
                {article.excerpt && (
                  <p className="text-[13px] leading-[1.6] font-light text-white/50 line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                )}

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-[11px] font-light tracking-wider uppercase text-white/60 group-hover:text-primary transition-colors">
                  <span>Read Article</span>
                  <svg 
                    className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <div className="relative group inline-block">
              {/* Subtle breathing glow on hover */}
              <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              {/* Gold accent on hover - bottom highlight */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 blur-[2px] group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-out" />
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-3.5 text-[11px] font-light tracking-wider uppercase text-white/70 transition-all duration-300 hover:text-white hover:scale-105 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] overflow-hidden"
              >
                {/* Gentle shimmer animation */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer opacity-50" />
                <span className="relative z-10 inline-flex items-center gap-2 transition-all duration-300 group-hover:scale-110">
                  {isExpanded ? (
                    <>
                      Show Less
                      <svg className="w-3 h-3 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      View All Coverage ({articles.length})
                      <svg className="w-3 h-3 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
