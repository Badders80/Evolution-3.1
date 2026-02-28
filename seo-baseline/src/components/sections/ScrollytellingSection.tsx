'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Card {
  label: string;
  heading: string;
  description: string;
}

interface ScrollytellingSectionProps {
  id?: string;
  sectionLabel: string;
  sectionHeading: string;
  sectionDescription: string;
  cards: Card[];
}

export const ScrollytellingSection: React.FC<ScrollytellingSectionProps> = ({
  id,
  sectionLabel,
  sectionHeading,
  sectionDescription,
  cards,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const cardElements = cardsRef.current;

    if (!section || !leftContent || cardElements.some(el => !el)) return;

    // Create a context for cleanup
    const ctx = gsap.context(() => {
      // Pin the left content
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftContent,
        pinSpacing: false,
      });

      // Animate each card sequentially
      cardElements.forEach((card, index) => {
        if (!card) return;

        const totalCards = cardElements.length;
        const startProgress = index / totalCards;
        const fadeInEnd = (index + 0.3) / totalCards;
        const fadeOutStart = (index + 0.7) / totalCards;
        const endProgress = (index + 1) / totalCards;

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        })
          .fromTo(
            card,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: fadeInEnd - startProgress,
            },
            startProgress
          )
          .to(
            card,
            {
              opacity: 1,
              duration: fadeOutStart - fadeInEnd,
            },
            fadeInEnd
          )
          .to(
            card,
            {
              opacity: 0,
              y: -50,
              duration: endProgress - fadeOutStart,
            },
            fadeOutStart
          );
      });
    }, section);

    return () => ctx.revert();
  }, [cards.length]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative bg-background text-foreground"
      style={{ height: '400vh' }}
    >
      <div className="h-screen sticky top-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* LEFT SIDE - Pinned Content */}
            <div ref={leftContentRef} className="space-y-12">
              <p className="text-[11px] font-light tracking-[0.2em] uppercase text-white/30">
                {sectionLabel}
              </p>
              <h2 className="text-[36px] md:text-[56px] leading-[1.1] text-white font-light tracking-tight">
                {sectionHeading}
              </h2>
              <p className="text-[16px] leading-[1.7] font-light text-white/65">
                {sectionDescription}
              </p>
            </div>

            {/* RIGHT SIDE - Animated Cards Container */}
            <div className="relative h-full flex items-center justify-center">
              {cards.map((card, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="absolute inset-0 flex items-center"
                  style={{ opacity: 0 }}
                >
                  <div className="group relative bg-white/[0.02] border border-white/[0.08] rounded-lg p-10 w-full transition-all duration-700 hover:bg-white/[0.04] hover:border-white/[0.15] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer">
                    {/* Hover gradient overlay */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background:
                          'linear-gradient(140deg, rgba(255,255,255,0.06), rgba(67,129,255,0.08) 40%, transparent 70%)',
                      }}
                    />

                    <div className="relative">
                      <div className="space-y-4">
                        <p className="text-sm font-light uppercase tracking-[0.32em] text-white/40">
                          {card.label}
                        </p>
                        <h4 className="text-[21px] font-light text-white leading-tight">
                          {card.heading}
                        </h4>
                        <p className="text-[15px] leading-[1.9] font-light text-white/60">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
