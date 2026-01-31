"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Search, Wallet, TrendingUp } from "lucide-react";

export const Process = () => {
  const steps = [
    {
      id: "01",
      title: "Select",
      desc: "Browse elite thoroughbreds vetted by our bloodstock experts. Analysis, pedigree, and projected value—transparently presented.",
      icon: Search
    },
    {
      id: "02",
      title: "Acquire",
      desc: "Purchase fractional ownership instantly. Your stake is tokenized on a regulated blockchain infrastructure for absolute security.",
      icon: Wallet
    },
    {
      id: "03",
      title: "Experience",
      desc: "Track performance, receive prize money directly to your wallet, and trade your position on our secondary marketplace.",
      icon: TrendingUp
    }
  ];

  return (
    <section className="relative w-full py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-2xl mb-24">
          <Reveal>
            <h2 className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-4">
              The Process
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-heading text-4xl md:text-5xl text-white font-light leading-tight mb-6">
              Ownership, <span className="text-neutral-500">Simplified.</span>
            </h3>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-neutral-400 font-light text-lg">
              We stripped away the barriers of traditional syndication. 
              No paperwork. No phone calls. Just pure access.
            </p>
          </Reveal>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-white/10 via-white/10 to-transparent -z-10"></div>

          {steps.map((step, i) => (
            <Reveal key={step.id} delay={0.3 + (i * 0.1)} variant="slide">
              <div className="group relative bg-surface p-8 rounded-sm border border-white/5 hover:border-primary/30 transition-colors h-full">
                
                {/* Step Number */}
                <span className="absolute -top-10 left-8 text-6xl font-heading text-white/5 group-hover:text-primary/10 transition-colors">
                  {step.id}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 mb-6 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <step.icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <h4 className="font-heading text-2xl text-white mb-4">{step.title}</h4>
                <p className="text-neutral-400 font-light leading-relaxed">
                  {step.desc}
                </p>

              </div>
            </Reveal>
          ))}

        </div>
      </div>
    </section>
  );
};
