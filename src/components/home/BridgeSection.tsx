"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ShieldCheck, Globe, Zap } from "lucide-react";
import Image from "next/image";

export const BridgeSection = () => {
  return (
    <section className="relative w-full py-32 bg-background overflow-hidden">
      
      {/* Background Gradient Mesh */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <Reveal>
            <h2 className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-4">
              From Paddocks to Protocols
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-heading text-5xl md:text-6xl text-white font-light">
              Real Horses. <span className="text-neutral-500">Digital Assets.</span>
            </h3>
          </Reveal>
        </div>

        {/* The Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* LEFT: The Paddock (Physical) */}
          <Reveal variant="slide" delay={0.2} className="relative group">
            <div className="relative aspect-[4/5] md:aspect-square w-full rounded-sm overflow-hidden border border-white/5">
              <Image 
                src="/images/Hooves-on-grass.png" 
                alt="Thoroughbred in the paddock"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              
              {/* Overlay Text */}
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-heading text-3xl mb-1">The Asset</p>
                <p className="text-neutral-400 font-mono text-sm">Physical Thoroughbred</p>
              </div>
            </div>

            {/* The Gold Connector Line (Desktop Only) */}
            <div className="hidden lg:block absolute top-1/2 -right-12 lg:-right-24 w-24 h-[1px] bg-gradient-to-r from-primary to-transparent"></div>
          </Reveal>

          {/* RIGHT: The Protocol (Digital) */}
          <div className="flex flex-col gap-8">
            
            <Reveal delay={0.3}>
              <p className="text-xl text-neutral-300 font-light leading-relaxed">
                We bridge the gap between heritage racing and modern finance.
                Every horse is vetted, acquired, and tokenized on a regulated infrastructure.
              </p>
            </Reveal>

            {/* Feature List */}
            <div className="space-y-6 mt-4">
              {[
                { 
                  icon: ShieldCheck, 
                  title: "FMA Regulated", 
                  desc: "Fully compliant legal structure under NZ Equine Exemptions." 
                },
                { 
                  icon: Globe, 
                  title: "Global Liquidity", 
                  desc: "Trade shares 24/7 on the secondary marketplace." 
                },
                { 
                  icon: Zap, 
                  title: "Instant Settlement", 
                  desc: "Blockchain-powered ownership transfer in seconds." 
                }
              ].map((item, i) => (
                <Reveal key={i} delay={0.4 + (i * 0.1)} variant="slide">
                  <div className="flex gap-6 p-6 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-heading text-xl mb-1">{item.title}</h4>
                      <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
