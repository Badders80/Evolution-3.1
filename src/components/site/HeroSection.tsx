'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import StaticImage from '@/components/ui/ParallaxImage';

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
  const [shouldFixBackground, setShouldFixBackground] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Fix background when user scrolls past initial hero height
      if (scrollPosition > windowHeight * 0.3) {
        setShouldFixBackground(true);
      } else {
        setShouldFixBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className={`relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-48 ${className}`}
    >
      {/* Fixed Background Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: shouldFixBackground ? 0 : backgroundY,
          position: shouldFixBackground ? 'fixed' : 'absolute',
          top: shouldFixBackground ? 0 : undefined,
          zIndex: shouldFixBackground ? -1 : undefined,
        }}
      >
        <div className="absolute inset-0 animate-float-slow opacity-30 blur-3xl bg-gradient-radial from-brand-gold/20 via-transparent to-transparent" />
        <StaticImage
          src={backgroundImage}
          alt="Majestic racehorses representing Evolution Stables digital ownership"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 grayscale contrast-125"
        />
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 bg-black"
        />
        {overlay && (
          <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" 
               style={{ 
                 height: '100vh',
                 background: 'linear-gradient(to bottom, rgba(var(--background)/0.7) 0%, rgba(var(--background)/0.7) 20%, rgba(var(--background)/0.3) 40%, transparent 50%)',
                 pointerEvents: 'none'
               }} 
          />
        )}
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-8 py-32 text-center md:px-12">
        {/* Primary Headline */}
        <div className="max-w-5xl space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-hero-mobile md:text-display font-light tracking-tight text-white"
          >
            Transforming racehorse ownership into a <span className="text-brand-gold italic">modern institutional-grade asset</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-neutral-400 font-light"
          >
            Institutional infrastructure meeting racing heritage. Regulation-ready digital syndication for the next generation of investors.
          </motion.p>
        </div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <a
            href="/marketplace"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-brand-gold px-10 font-medium text-black transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Explore the Marketplace</span>
            <div className="absolute inset-0 -translate-x-full bg-white transition-transform group-hover:translate-x-0" />
          </a>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-12 border-t border-white/10 pt-12"
        >
          <div className="space-y-1">
            <p className="text-3xl font-light text-white">$2.4M</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Total Value</p>
          </div>
          <div className="h-12 w-px bg-white/10 hidden md:block" />
          <div className="space-y-1">
            <p className="text-3xl font-light text-white">12</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Active Horses</p>
          </div>
          <div className="h-12 w-px bg-white/10 hidden md:block" />
          <div className="space-y-1">
            <p className="text-3xl font-light text-white">847</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Total Investors</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

