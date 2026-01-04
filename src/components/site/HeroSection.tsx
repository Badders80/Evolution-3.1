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
        <StaticImage
          src={backgroundImage}
          alt="Evolution Stables"
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

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-start gap-4 px-8 pb-16 md:px-12">
        {/* Scrolling Logo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.85 }}
          className="w-full max-w-[720px]"
        >
          <Image
            src="/images/Evolution-Stables-Logo.png"
            alt="Evolution Stables"
            width={1200}
            height={400}
            priority
            className="h-auto w-full"
          />
        </motion.div>

        {/* Scrolling Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.05 }}
          className="eyebrow mt-8 max-w-[720px] font-medium leading-relaxed"
        >
          <span className="whitespace-nowrap">Grounded in tradition.</span>{' '}
          <span className="whitespace-nowrap">Evolved through innovation.</span>
          <br />
          Ownership transformed.
        </motion.p>
      </div>
    </section>
  );
}

