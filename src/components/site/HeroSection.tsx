'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StaticImage from '@/components/ui/ParallaxImage';
import { GlowPillButton } from '@/components/ui/GlowPillButton';

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
        <StaticImage
          src={backgroundImage}
          alt="Majestic racehorses representing Evolution Stables digital ownership"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0"
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

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-start gap-8 px-8 pb-16 md:px-12">
        {/* ANIMATED STORYTELLING HERE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="w-full aspect-video md:aspect-[21/9] bg-white/[0.02] border border-white/[0.05] rounded-sm flex items-center justify-center mb-4 overflow-hidden relative"
        >
           <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent" />
           <span className="text-[10px] uppercase tracking-[0.4em] text-white/10 relative z-10">Evolution In Motion</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="w-full"
        >
          <h1 className="text-h1-mobile md:text-h1 text-white font-light tracking-tight max-w-3xl">
            The New Standard in Bloodstock
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <GlowPillButton>
            View Opportunities
          </GlowPillButton>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
          className="flex flex-wrap items-center gap-x-12 gap-y-4 pt-8"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Total Value</span>
            <span className="text-label text-white font-light">$2.4M</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Horses</span>
            <span className="text-label text-white font-light">12</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Investors</span>
            <span className="text-label text-white font-light">847</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

