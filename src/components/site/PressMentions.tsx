'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface PressArticle {
  title: string;
  url: string;
  publisher: string;
  date: string;
  excerpt?: string;
  imageUrl?: string;
}

interface PartnerLogo {
  name: string;
  imagePath: string;
  url?: string;
  type: 'publication' | 'partner';
  tone?: 'mono' | 'accent';
  imageClassName?: string;
}

interface PressMentionsProps {
  articles: PressArticle[];
  partnerLogos?: PartnerLogo[];
}

export function PressMentions({ articles, partnerLogos = [] }: PressMentionsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!articles || articles.length === 0) return null;

  const duplicatedArticles = [...articles, ...articles, ...articles];
  const displayedLogos = partnerLogos.slice(0, 9);
  const logoRows = [
    displayedLogos.slice(0, 3),
    displayedLogos.slice(3, 6),
    displayedLogos.slice(6, 9),
  ].filter((row) => row.length > 0);

  return (
    <section className="pt-36 pb-24 md:pt-40 md:pb-28 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-16 md:mb-20 text-white/30 text-center px-12">
          AS FEATURED IN
        </p>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute inset-0 pointer-events-none z-10">
            <div
              className="absolute left-0 top-0 bottom-0 w-[30%]"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-[30%]"
              style={{
                background: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              }}
            />
          </div>

          <div
            ref={scrollRef}
            className="flex gap-10 px-12"
            style={{
              animation: isPaused ? 'none' : 'scroll 50s linear infinite',
            }}
          >
            {duplicatedArticles.map((article, index) => (
              <ArticleCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${100 / 3}%);
            }
          }
        `}</style>

        {partnerLogos && partnerLogos.length > 0 && (
          <div className="mt-44 md:mt-52 pt-28 md:pt-32 px-12 md:px-16 lg:px-20">
            <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-16 md:mb-20 text-white/20 text-center">
              Partners & Publications
            </p>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center lg:hidden">
                {displayedLogos.map((logo) => (
                  <LogoItem key={logo.name} logo={logo} className="w-full" />
                ))}
              </div>
              <div className="hidden lg:block space-y-8">
                {logoRows.map((row, rowIndex) => {
                  const isFullRow = row.length === 3;
                  return (
                    <div
                      key={`partner-row-${rowIndex}`}
                      className={
                        isFullRow
                          ? 'grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center'
                          : 'flex flex-wrap items-center justify-center gap-8'
                      }
                    >
                      {row.map((logo) => (
                        <LogoItem
                          key={logo.name}
                          logo={logo}
                          className={isFullRow ? 'w-full' : 'w-32 sm:w-36 md:w-40'}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: PressArticle }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [distanceFromCenter, setDistanceFromCenter] = useState(1);

  useEffect(() => {
    const updateGradient = () => {
      if (!cardRef.current) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const viewportCenter = window.innerWidth / 2;

      const distance = Math.abs(cardCenter - viewportCenter) / viewportCenter;
      const clampedDistance = Math.min(Math.max(distance, 0), 1);

      setDistanceFromCenter(clampedDistance);
    };

    const interval = setInterval(updateGradient, 50);
    updateGradient();

    return () => clearInterval(interval);
  }, []);

  const grayscaleAmount = Math.min(distanceFromCenter * 100, 100);
  const opacityAmount = Math.max(1 - distanceFromCenter * 0.7, 0.3);
  const scaleAmount = Math.max(1 - distanceFromCenter * 0.1, 0.9);

  return (
    <a
      ref={cardRef}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex-shrink-0 w-[280px] aspect-square overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500"
      style={{
        filter: `grayscale(${hovered ? 0 : grayscaleAmount}%)`,
        opacity: opacityAmount,
        transform: `scale(${hovered ? 1.05 : scaleAmount})`,
      }}
    >
      {article.imageUrl ? (
        <div className="relative w-full h-[160px] bg-black/40">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="280px"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div className="relative w-full h-[160px] bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
          <div className="text-white/20 text-6xl font-light">
            {article.publisher.charAt(0)}
          </div>
        </div>
      )}

      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 p-6">
        <div className="mb-3">
          <span className="text-[10px] font-light tracking-wider uppercase text-primary">
            {article.publisher}
          </span>
        </div>

        <h3 className="text-[15px] leading-[1.5] font-light text-white/90 mb-3 group-hover:text-white transition-colors line-clamp-3">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="text-[13px] leading-[1.6] font-light text-white/50 line-clamp-2 mb-4">
            {article.excerpt}
          </p>
        )}

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
  );
}

function LogoItem({ logo, className }: { logo: PartnerLogo; className?: string }) {
  const wrapperClassName =
    `group relative flex items-center justify-center h-20 px-4 transition-all duration-300 hover:scale-110 ${className ?? ''}`.trim();

  const image = (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={logo.imagePath}
        alt={`Evolution Stables featured in ${logo.name}`}
        width={160}
        height={80}
        className={`object-contain w-full h-full max-w-[160px] max-h-[80px] transition-all duration-300 ${
          logo.tone === 'accent'
            ? 'opacity-60 group-hover:opacity-80'
            : 'filter grayscale brightness-0 invert opacity-60 group-hover:opacity-80'
        } ${logo.imageClassName ?? ''}`.trim()}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );

  if (logo.url) {
    return (
      <a href={logo.url} target="_blank" rel="noopener noreferrer" className={wrapperClassName} title={logo.name}>
        {image}
        <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.02] transition-all duration-300" />
      </a>
    );
  }

  return (
    <div className={wrapperClassName} title={logo.name}>
      {image}
      <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.02] transition-all duration-300" />
    </div>
  );
}
