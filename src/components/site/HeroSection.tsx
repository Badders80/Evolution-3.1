'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StaticImage from '@/components/ui/ParallaxImage';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  backgroundImage?: string;
  overlay?: boolean;
  className?: string;
}

export function HeroSection({
  backgroundImage = '/images/Horse-Double-Black.png',
  overlay = true,
  className = '',
}: HeroSectionProps) {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.5]);

  return (
    <section
      id="hero"
      className={`relative flex min-h-screen items-center justify-center overflow-hidden pt-32 pb-48 ${className}`}
    >
      {/* Cinematic Background Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY, opacity }}
      >
        <StaticImage
          src={backgroundImage}
          alt="Majestic racehorses representing Evolution Stables digital ownership"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 grayscale-[20%] contrast-[1.1]"
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-transparent" />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* Label / Trust Signal */}
        <Reveal delay={0.1}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-300">
              Institutional-Grade RWA Platform
            </span>
          </div>
        </Reveal>

        {/* Primary Headline */}
        <div className="max-w-6xl">
          <Reveal delay={0.2} width="100%">
            <h1 className="font-heading text-display md:text-[5.5rem] leading-[0.95] tracking-tight text-white mb-8">
              Ownership, <br className="md:hidden" />
              <span className="text-white/40 italic font-light ml-4 mr-4">Evolved.</span>
            </h1>
          </Reveal>
        </div>

        {/* Subhead */}
        <div className="max-w-2xl mx-auto mb-12">
          <Reveal delay={0.4}>
            <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed">
              The first regulated marketplace for digital racehorse syndication. 
              Built on <span className="text-white font-normal">Tokinvest</span> infrastructure for instant liquidity and total transparency.
            </p>
          </Reveal>
        </div>

        {/* Action Group */}
        <Reveal delay={0.5}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <a
              href="/marketplace"
              className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 text-[13px] font-semibold uppercase tracking-widest text-black transition-all hover:bg-brand-gold hover:text-black hover:scale-105"
            >
              <span>View Listings</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            
            <a
              href="/mission"
              className="group inline-flex h-12 items-center justify-center px-8 text-[13px] font-medium uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              Our Mission
            </a>
          </div>
        </Reveal>

        {/* Live Data Ticker / Stats */}
        <Reveal delay={0.7} width="100%" className="mt-24">
          <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
              
              {/* Stat 1 */}
              <div className="bg-background/80 p-6 flex flex-col items-center justify-center group hover:bg-background/60 transition-colors">
                <span className="font-mono text-2xl text-white mb-1">$2.4M</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">Asset Value</span>
              </div>

              {/* Stat 2 */}
              <div className="bg-background/80 p-6 flex flex-col items-center justify-center group hover:bg-background/60 transition-colors">
                <span className="font-mono text-2xl text-brand-gold mb-1">12</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">Active Horses</span>
              </div>

              {/* Stat 3 */}
              <div className="bg-background/80 p-6 flex flex-col items-center justify-center group hover:bg-background/60 transition-colors">
                <span className="font-mono text-2xl text-white mb-1">14.2%</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">Avg. Yield</span>
              </div>

              {/* Stat 4 */}
              <div className="bg-background/80 p-6 flex flex-col items-center justify-center group hover:bg-background/60 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                   <span className="font-mono text-2xl text-white">Live</span>
                   <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">Market Status</span>
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
