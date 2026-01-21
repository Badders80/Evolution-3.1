'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PressArticle } from '@/lib/press-articles';

interface PressShowcaseProps {
  articles: PressArticle[];
}

export function PressShowcase({ articles }: PressShowcaseProps) {
  // Find the lead article
  const leadArticle = articles.find(a =>
    a.publisher === 'BusinessDesk' && a.title.includes('Digital Investment')
  ) || articles[0];

  // The rest for the carousel
  const carouselArticles = articles.filter(a => a !== leadArticle);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  const rotationInterval = 5000; // 5 seconds
  const transitionDuration = 400; // 400ms

  const rotate = useCallback(() => {
    if (isPaused) return;

    const next = (activeIndex + 1) % carouselArticles.length;
    setNextIndex(next);
    setIsTransitioning(true);

    // Prefetch next image
    const futureNext = (next + 1) % carouselArticles.length;
    if (carouselArticles[futureNext].imageUrl) {
      const img = new window.Image();
      img.src = carouselArticles[futureNext].imageUrl!;
    }

    setTimeout(() => {
      setActiveIndex(next);
      setNextIndex(null);
      setIsTransitioning(false);
    }, transitionDuration);
  }, [activeIndex, carouselArticles, isPaused]);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const timer = setInterval(rotate, rotationInterval);
    return () => clearInterval(timer);
  }, [rotate]);

  const partners = [
    { name: 'Investing.com', src: '/images/partners/1_Investing_comLOGO.png' },
    { name: 'BusinessDesk', src: '/images/partners/2_businessdesk-Logo.jpg' },
    { name: 'Singularity', src: '/images/partners/3_SingularryLOGO.png' },
    { name: 'Tokinvest', src: '/images/partners/4_New Logo - White & Green.png' },
    { name: 'Trackside NZ', src: '/images/partners/6_tracksideNZ-logo.png' },
    { name: 'NZTR', src: '/images/partners/8_NZTR_LOGO_WHITE.png' },
    { name: 'Stephen Grey Racing', src: '/images/partners/9_StephenGreyRacingLogo.png' },
    { name: 'Arabian Business', src: '/images/partners/10_arabian-bussiness-logo.png' },
  ];

  const getContextualCTA = (publisher: string) => `Read on ${publisher}`;

  return (
    <section className="relative bg-[#0a0a0a] text-white overflow-hidden bloomberg-showcase">
      {/* PARTNER LOGOS BAR */}
      <div className="w-full py-16 border-b border-white/5 bg-[#080808]/50">
        <div className="max-w-[1400px] mx-auto px-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-10 text-center">AS FEATURED IN</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
             {partners.map(p => (
               <div key={p.name} className="partner-logo-wrapper relative h-6 w-28 md:h-8 md:w-32 opacity-40 hover:opacity-100 transition-opacity duration-500">
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    className="object-contain filter brightness(0) invert(1)"
                  />
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[6fr,4fr] min-h-[700px] lg:h-[800px]">

        {/* LEFT PANEL: Static Featured Article (60%) */}
        <div className="relative p-12 md:p-20 flex flex-col justify-center lg:border-r border-white/5 bg-[#0f0f0f]">
          <div
            className="space-y-8 max-w-2xl"
            style={{ borderLeft: '3px solid #d4af37', paddingLeft: '2.5rem' }}
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                {leadArticle.date}
              </span>
              <div className="h-px w-8 bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                FEATURED COVERAGE
              </span>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
              {leadArticle.imageUrl && (
                <Image
                  src={leadArticle.imageUrl}
                  alt={leadArticle.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            <h3 className="text-3xl md:text-5xl font-light leading-[1.1] tracking-tight">
              {leadArticle.title}
            </h3>

            <p className="text-lg md:text-xl font-light leading-relaxed text-white/60">
              {leadArticle.excerpt}
            </p>

            <a
              href={leadArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#d4af37] text-black hover:bg-[#c4a132] transition-all group rounded-sm"
            >
              <span className="text-xs uppercase tracking-[0.3em] font-semibold">
                {getContextualCTA(leadArticle.publisher)}
              </span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT PANEL: Auto-rotating Fade Carousel (40%) */}
        <div
          className="relative h-full bg-[#0a0a0a] flex flex-col p-12 md:p-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex-1 relative overflow-hidden">
             {/* Current Article */}
             <div
               className={`absolute inset-0 flex flex-col transition-opacity duration-400 ease-in-out ${
                 isTransitioning ? 'opacity-0' : 'opacity-100'
               }`}
             >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      {carouselArticles[activeIndex].date}
                    </span>
                    <div className="h-px w-8 bg-white/10" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                      {carouselArticles[activeIndex].publisher}
                    </span>
                  </div>

                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm grayscale">
                    {carouselArticles[activeIndex].imageUrl && (
                      <Image
                        src={carouselArticles[activeIndex].imageUrl}
                        alt={carouselArticles[activeIndex].title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <h4 className="text-xl md:text-2xl font-light leading-tight tracking-tight hover:text-[#d4af37] transition-colors cursor-pointer"
                      onClick={() => window.open(carouselArticles[activeIndex].url, '_blank')}>
                    {carouselArticles[activeIndex].title}
                  </h4>

                  <p className="text-base font-light leading-relaxed text-white/50 line-clamp-3">
                    {carouselArticles[activeIndex].excerpt}
                  </p>
                </div>
             </div>

             {/* Next Article (Incoming) */}
             {nextIndex !== null && (
                <div
                  className={`absolute inset-0 flex flex-col transition-opacity duration-400 ease-in-out ${
                    isTransitioning ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                        {carouselArticles[nextIndex].date}
                      </span>
                      <div className="h-px w-8 bg-white/10" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                        {carouselArticles[nextIndex].publisher}
                      </span>
                    </div>

                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm grayscale">
                      {carouselArticles[nextIndex].imageUrl && (
                        <Image
                          src={carouselArticles[nextIndex].imageUrl}
                          alt={carouselArticles[nextIndex].title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <h4 className="text-xl md:text-2xl font-light leading-tight tracking-tight">
                      {carouselArticles[nextIndex].title}
                    </h4>

                    <p className="text-base font-light leading-relaxed text-white/50 line-clamp-3">
                      {carouselArticles[nextIndex].excerpt}
                    </p>
                  </div>
                </div>
             )}
          </div>

          {/* Footer of Right Panel */}
          <div className="mt-12 flex flex-col gap-8">
            {/* Progress Dots */}
            <div className="flex items-center gap-3">
              {carouselArticles.slice(0, 5).map((_, i) => (
                <button
                  key={`dot-${i}`}
                  onClick={() => {
                    setNextIndex(i);
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setActiveIndex(i);
                      setNextIndex(null);
                      setIsTransitioning(false);
                    }, 400);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    activeIndex === i ? 'bg-[#d4af37] scale-150 shadow-[0_0_8px_rgba(212,175,55,0.4)]' : 'bg-white/10'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
              {carouselArticles.length > 5 && (
                <span className="text-[9px] text-white/20 font-light">+{carouselArticles.length - 5}</span>
              )}
            </div>

            {/* View All Link */}
            <Link
              href="/press"
              className="text-xs uppercase tracking-[0.3em] text-white/40 hover:text-[#d4af37] transition-colors inline-flex items-center gap-2 group"
            >
              View All Press Coverage
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-opacity {
            transition: none !important;
          }
          /* We would also ideally disable the auto-rotation in the component logic if prefers-reduced-motion is detected */
        }
      `}</style>
    </section>
  );
}
