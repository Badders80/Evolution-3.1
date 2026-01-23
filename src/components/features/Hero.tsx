'use client';

import React from 'react';
import Image from 'next/image';
import { GlowPillButton } from '@/components/ui/GlowPillButton';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Majestic-horse.jpg"
          alt="Majestic racehorse representing Evolution Stables digital ownership"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] px-6 sm:px-10 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <p className="label-overline">
            Digital Racehorse Ownership
          </p>
          <h1 className="heading-hero">
            Redefining the <br />
            <span className="text-primary italic">Thrill of the Track</span>
          </h1>
          <p className="body-lead max-w-2xl mx-auto">
            Experience the future of racehorse ownership through digital-syndication.
            Accessible, transparent, and liquid participation in the world's most elite sport.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <GlowPillButton>
              Explore Marketplace
            </GlowPillButton>
            <button className="px-8 py-3.5 text-label uppercase tracking-wide border border-white/10 rounded-full hover:bg-white/5 transition-all">
              How it Works
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
