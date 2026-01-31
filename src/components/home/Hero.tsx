"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background text-foreground">
      
      {/* 1. The Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Overlay for contrast - The "Velvet Night" filter */}
        <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-10"></div>
        
        {/* The Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-60 grayscale-[20%]"
        >
          <source src="/images/Jockey-walk-out.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. The Content Container */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* The Identity (WHO) - Masthead Style */}
        <Reveal delay={0.1} className="mb-12">
           <div className="relative w-64 md:w-80 h-16 opacity-90">
             <Image 
               src="/images/Evolution-Stables-Name-Logo-White.svg"
               alt="Evolution Stables"
               fill
               className="object-contain"
             />
           </div>
        </Reveal>

        {/* The Product (WHAT) - Headline */}
        <Reveal delay={0.3}>
          <h1 className="font-heading text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.9] tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-2xl">
            The Thoroughbred <br />
            <span className="italic font-light text-primary">Asset Class.</span>
          </h1>
        </Reveal>

        {/* The Ticker / Badge (Moved below headline for "Editorial" feel) */}
        <Reveal delay={0.4}>
           <div className="inline-flex items-center gap-3 px-4 py-2 mb-10 rounded-full border border-white/5 bg-black/20 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
              Live Market
            </span>
            <span className="w-[1px] h-3 bg-white/10"></span>
            <span className="text-xs font-mono text-primary flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.4% Vol
            </span>
          </div>
        </Reveal>

        {/* Subhead */}
        <Reveal delay={0.5}>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-10 drop-shadow-lg">
            Own fractional shares in elite racehorses. Trade instantly on the 
            first FMA-regulated marketplace.
          </p>
        </Reveal>

        {/* Buttons */}
        <Reveal delay={0.6}>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link 
              href="/marketplace" 
              className="group relative px-8 py-4 bg-primary text-black font-medium tracking-wide rounded-sm overflow-hidden transition-all hover:bg-primary/90 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              <span className="relative flex items-center gap-2">
                View Marketplace <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link 
              href="/how-it-works" 
              className="px-8 py-4 border border-white/10 hover:border-white/30 text-white font-medium tracking-wide rounded-sm transition-all backdrop-blur-sm bg-white/5 hover:bg-white/10"
            >
              How It Works
            </Link>
          </div>
        </Reveal>

      </div>

      {/* 3. The "Anchor" Data Strip (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-background/90 backdrop-blur-xl z-30 hidden md:block">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between text-xs font-mono text-neutral-500">
          <div className="flex gap-8">
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>
              AUM: <span className="text-white font-medium">$4.2M</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>
              ACTIVE HORSES: <span className="text-white font-medium">12</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>
              TOTAL PAYOUTS: <span className="text-white font-medium">$850K</span>
            </span>
          </div>
          <div className="flex gap-6 opacity-40 tracking-widest">
             <span>SYD</span>
             <span>MEL</span>
             <span>AKL</span>
             <span>DXB</span>
             <span>LDN</span>
          </div>
        </div>
      </div>

    </section>
  );
};
