'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PressArticle } from '@/lib/press-articles';

interface PressShowcaseProps {
  articles: PressArticle[];
}

export function PressShowcase({ articles }: PressShowcaseProps) {
  const [openArticleUrl, setOpenArticleUrl] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemHeight, setItemHeight] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const itemRef = useRef<HTMLDivElement | null>(null);
  const rotateTimeoutRef = useRef<number | null>(null);

  const leadArticle = useMemo(() => {
    if (!articles || articles.length === 0) return null;
    return (
      articles.find(
        (article) =>
          article.url ===
          'https://tokinvest.capital/insights-and-news/tokinvest-and-dubai-racing-club'
      ) ?? articles[0]
    );
  }, [articles]);

  const remainingArticles = useMemo(() => {
    if (!articles || articles.length === 0 || !leadArticle) return [];
    return articles.filter((article) => article !== leadArticle) || [];
  }, [articles, leadArticle]);

  const preferredOrder = useMemo(() => [
    'https://businessdesk.co.nz/article/technology/bringing-racing-into-the-digital-age',
    'https://trackside.co.nz/article/thoroughbred-ownership-reimagined',
    'https://www.investing.com/news/cryptocurrency-news/tokinvest-and-singularry-superapp-partner-to-make-regulated-realworld-asset-investing-accessible-to-everyone-4316762',
  ], []);

  const orderMap = useMemo(() => {
    return new Map(preferredOrder.map((url, index) => [url, index]));
  }, [preferredOrder]);

  const rightArticles = useMemo(() => {
    return [...remainingArticles].sort((a, b) => {
      const aRank = orderMap.get(a.url);
      const bRank = orderMap.get(b.url);

      if (aRank !== undefined || bRank !== undefined) {
        if (aRank === undefined) return 1;
        if (bRank === undefined) return -1;
        return aRank - bRank;
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [remainingArticles, orderMap]);

  const visibleCount = useMemo(() => Math.min(6, rightArticles.length), [rightArticles.length]);
  const shouldRotate = useMemo(() => rightArticles.length > visibleCount, [rightArticles.length, visibleCount]);
  const animationDuration = 800;
  const displayDuration = 4200;

  const renderArticles = useMemo(() => {
    if (!shouldRotate) return rightArticles;
    return Array.from({ length: visibleCount + 1 }, (_, index) => {
      return rightArticles[(startIndex + index) % rightArticles.length];
    });
  }, [rightArticles, shouldRotate, startIndex, visibleCount]);

  const toggleArticle = (article: PressArticle) => {
    setOpenArticleUrl((current) => (current === article.url ? null : article.url));
  };

  useEffect(() => {
    setStartIndex(0);
    setOpenArticleUrl(null);
  }, [rightArticles.length]);

  useEffect(() => {
    if (!itemRef.current || openArticleUrl) return;

    const measure = () => {
      if (!itemRef.current) return;
      const nextHeight = itemRef.current.getBoundingClientRect().height;
      if (nextHeight > 0) {
        setItemHeight(nextHeight);
      }
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [rightArticles.length, openArticleUrl]);

  const isPaused = isHovered || openArticleUrl !== null;

  useEffect(() => {
    if (!shouldRotate || isPaused || !itemHeight) return;

    const startTimer = window.setTimeout(() => {
      setIsAnimating(true);
      rotateTimeoutRef.current = window.setTimeout(() => {
        setStartIndex((current) => (current + 1) % rightArticles.length);
        setIsAnimating(false);
        setOpenArticleUrl(null);
      }, animationDuration);
    }, displayDuration);

    return () => {
      window.clearTimeout(startTimer);
      if (rotateTimeoutRef.current) {
        window.clearTimeout(rotateTimeoutRef.current);
        rotateTimeoutRef.current = null;
      }
    };
  }, [animationDuration, displayDuration, isPaused, itemHeight, rightArticles.length, shouldRotate, startIndex]);

  if (!articles || articles.length === 0 || !leadArticle) return null;

  const partners = [
    { name: 'Investing.com', src: '/images/partners/1_Investing_comLOGO.png', size: 'smaller' },
    { name: 'BusinessDesk', src: '/images/partners/2_businessdesk-Logo.jpg' },
    { name: 'Singularity', src: '/images/partners/3_SingularryLOGO.png' },
    { name: 'Tokinvest', src: '/images/partners/4_New Logo - White & Green.png', size: 'smaller' },
    { name: 'Trackside NZ', src: '/images/partners/6_tracksideNZ-logo.png' },
    { name: 'NZTR', src: '/images/partners/8_NZTR_LOGO_WHITE.png' },
    { name: 'Stephen Grey Racing', src: '/images/partners/9_StephenGreyRacingLogo.png' },
    { name: 'Arabian Business', src: '/images/partners/10_arabian-bussiness-logo.png' },
  ];
  const logoAdjustments: Record<string, string> = {
    'BusinessDesk': 'scale-110',
    'Singularity': 'scale-110',
    'Trackside NZ': 'scale-110',
    'NZTR': 'scale-110',
    'Stephen Grey Racing': 'scale-110',
    'Arabian Business': 'scale-110 brightness-125',
  };

  const formatDate = (value: string) => {
    const parts = value.split('-');
    if (parts.length !== 3) return value;
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  return (
    <section className="relative bg-black text-white overflow-hidden bloomberg-showcase">
      <div className="w-full pt-24 pb-20 bg-black">
        <div className="max-w-[1400px] mx-auto px-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-12 text-center">
            AS FEATURED IN
          </p>
          <div className="pb-6">
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-10 lg:gap-x-16">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className={`partner-logo-wrapper relative h-8 w-full sm:h-10 sm:w-1/2 lg:h-12 lg:w-1/3 max-w-[320px] opacity-90 hover:opacity-100 transition-opacity duration-500 ${
                    partner.size === 'smaller' ? 'sm:h-8 lg:h-10 max-w-[260px]' : ''
                  }`}
                >
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className={`object-contain filter brightness(0) invert(1) ${
                      logoAdjustments[partner.name] ?? ''
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[6fr,4fr]">
        <div className="group relative p-12 md:p-20 flex flex-col justify-center bg-black">
          <div className="space-y-8 max-w-2xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-[0.3em] text-white/40 transition-colors group-hover:text-white">
                  {formatDate(leadArticle.date)}
                </span>
                <div className="h-px w-8 bg-white/10" />
                <span className="text-xs uppercase tracking-[0.3em] text-white/60 transition-colors group-hover:text-white">
                  {leadArticle.publisher}
                </span>
              </div>
              <a
                href={leadArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.3em] text-white/40 transition-colors group-hover:text-white"
              >
                <span className="relative inline-flex items-center gap-2 overflow-hidden">
                  <span className="relative z-10">Read the full story here</span>
                  <span className="relative z-10">→</span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 animate-text-wave"
                    style={{ animationDelay: '1.2s' }}
                  />
                </span>
              </a>
            </div>

            <div className="relative aspect-[16/10.8] w-full overflow-hidden rounded-sm shadow-2xl opacity-90 transition-opacity duration-500 group-hover:opacity-100">
              {leadArticle.imageUrl && (
                <Image
                  src={leadArticle.imageUrl}
                  alt={leadArticle.title}
                  fill
                  sizes="(min-width: 1024px) 672px, 100vw"
                  className="object-cover"
                  priority
                />
              )}
            </div>

            <h3 className="text-2xl md:text-3xl font-light leading-[1.15] tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white">
              Dubai Racing Club and Tokinvest Announce Partnership to Develop a Global Equine Token Marketplace
            </h3>

            <p className="text-[14px] md:text-[16px] font-light leading-[1.7] text-white/55 transition-colors duration-300 group-hover:text-white/65">
              {leadArticle.excerpt}
            </p>

          </div>
        </div>

        <div className="relative bg-black flex flex-col p-12 md:p-20">
          <div
            className={`relative overflow-x-hidden ${
              shouldRotate ? (openArticleUrl ? 'overflow-y-auto' : 'overflow-hidden') : ''
            }`}
            style={
              shouldRotate && itemHeight
                ? { height: itemHeight * visibleCount }
                : undefined
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="space-y-0"
              style={
                shouldRotate && itemHeight
                  ? {
                      transform: isAnimating ? `translateY(-${itemHeight}px)` : 'translateY(0px)',
                      transition: isAnimating
                        ? `transform ${animationDuration}ms ease-in-out`
                        : 'none',
                    }
                  : undefined
              }
            >
              {renderArticles.map((article, index) => {
                const isOpen = openArticleUrl === article.url;
                const lastVisibleIndex = shouldRotate
                  ? isAnimating
                    ? visibleCount
                    : visibleCount - 1
                  : renderArticles.length - 1;
                const isLast = index === lastVisibleIndex;
                return (
                  <div
                    key={`${article.url}-${index}`}
                    ref={index === 0 ? itemRef : undefined}
                    className={`transition-all duration-300 ease-out hover:border-white/[0.12] ${
                      isLast ? '' : 'border-b border-white/[0.08]'
                    }`}
                  >
                    <button
                      onClick={() => toggleArticle(article)}
                      className="w-full text-left py-6 group"
                    >
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                            {article.publisher}
                          </span>
                          <span className="text-[14px] md:text-[15px] font-light text-white/90 line-clamp-2">
                            {article.title}
                          </span>
                        </div>
                        <svg
                          className={`h-4 w-4 shrink-0 transition-all duration-300 ease-out ${
                            isOpen ? 'rotate-45 text-white/70' : 'rotate-0 text-white/30'
                          } group-hover:text-white/70`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                        </svg>
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isOpen ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div
                        className={`pt-2 pb-8 space-y-4 transition-all duration-300 ease-out ${
                          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                            {formatDate(article.date)}
                          </span>
                          <div className="h-px w-6 bg-white/10" />
                          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                            {article.publisher}
                          </span>
                        </div>

                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700">
                            {article.imageUrl && (
                              <Image
                                src={article.imageUrl}
                                alt={article.title}
                                fill
                                sizes="(min-width: 1024px) 40vw, 100vw"
                                className="object-cover"
                              />
                            )}
                          </div>
                        </a>

                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <h4 className="text-[16px] md:text-[18px] font-light leading-tight tracking-tight text-white/90 hover:text-white transition-colors">
                            {article.title}
                          </h4>
                        </a>

                        <p className="text-[13px] md:text-[14px] font-light leading-[1.7] text-white/50 line-clamp-4">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/press"
              className="text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors group"
            >
              <span className="relative inline-flex items-center gap-2 overflow-hidden">
                <span className="relative z-10">View All Press Coverage</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 animate-text-wave"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
