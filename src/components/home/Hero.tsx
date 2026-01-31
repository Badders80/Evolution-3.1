"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background text-foreground">
      {/* 1. The "Atmosphere" Background - Subtle noise + Slow Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-radial from-neutral-800/20 via-background to-background animate-pulse-slow"></div>
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10"></div>
      </div>

      {/* 2. The Content Container */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* Ticker / Badge */}
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
              Market Status: Active
            </span>
            <span className="w-[1px] h-3 bg-white/10 mx-2"></span>
            <span className="text-xs font-mono text-primary flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.4% Vol
            </span>
          </div>
        </Reveal>

        {/* Main Headline */}
        <Reveal delay={0.2}>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            The Thoroughbred <br />
            <span className="italic font-light text-primary">Asset Class.</span>
          </h1>
        </Reveal>

        {/* Subhead */}
        <Reveal delay={0.4}>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-neutral-400 font-light leading-relaxed mb-10">
            Own fractional shares in elite racehorses. Trade instantly on the 
            first FMA-regulated marketplace. Institutional transparency meets 
            heritage racing.
          </p>
        </Reveal>

        {/* Buttons */}
        <Reveal delay={0.6}>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link 
              href="/marketplace" 
              className="group relative px-8 py-4 bg-primary text-black font-medium tracking-wide rounded-sm overflow-hidden transition-all hover:bg-primary/90"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative flex items-center gap-2">
                View Marketplace <ArrowRight className="w-4 h-4" />
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
      <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-background/80 backdrop-blur-md z-30 hidden md:block">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between text-xs font-mono text-neutral-500">
          <div className="flex gap-8">
            <span>AUM: <span className="text-white">$4.2M</span></span>
            <span>ACTIVE HORSES: <span className="text-white">12</span></span>
            <span>TOTAL PAYOUTS: <span className="text-white">$850K</span></span>
          </div>
          <div className="flex gap-4 opacity-50">
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
