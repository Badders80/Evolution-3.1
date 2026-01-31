"use client";

import { Reveal } from "@/components/ui/Reveal";
import { BarChart3, Target, Activity, Zap } from "lucide-react";

export const IntelligenceSection = () => {
  return (
    <section className="relative w-full py-32 bg-background/95 border-t border-white/5">
      
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-4">
                The Intelligence Engine
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-heading text-4xl md:text-5xl text-white font-light leading-tight">
                Intelligence <span className="text-neutral-500">Over Luck.</span>
              </h3>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="md:text-right max-w-sm">
            <p className="text-neutral-400 font-light">
              We don't provide tips. We provide <span className="text-white font-medium">Market Signals</span>. 
              Moneyball analytics for the modern owner.
            </p>
          </Reveal>
        </div>

        {/* The "Terminal" Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          
          {/* Card 1: Smart Money (Whale Alert) - Large Left */}
          <Reveal delay={0.3} className="md:col-span-7 h-full">
            <div className="h-full bg-surface border border-white/5 rounded-sm p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-50">
                <Activity className="w-6 h-6 text-emerald-500" />
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h4 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">Signal Type: Volume Delta</h4>
                  <p className="text-white font-heading text-3xl">Smart Money Flow</p>
                </div>

                {/* Mock Chart Visualization */}
                <div className="w-full h-48 flex items-end gap-2 mt-8">
                  {[30, 45, 25, 60, 80, 40, 95, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative group-hover:bg-white/10 transition-colors">
                      <div 
                        style={{ height: `${h}%` }} 
                        className={`w-full absolute bottom-0 rounded-t-sm ${i === 6 ? 'bg-primary animate-pulse' : 'bg-neutral-700'}`}
                      ></div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-6 text-sm font-mono">
                  <span className="text-primary flex items-center gap-2">
                    <Zap className="w-4 h-4" /> High Confidence
                  </span>
                  <span className="text-neutral-500">Detecting institutional capital flow pre-race.</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column Stack */}
          <div className="md:col-span-5 flex flex-col gap-6 h-full">
            
            {/* Card 2: The Referee (Expert Audit) */}
            <Reveal delay={0.4} className="flex-1">
              <div className="h-full bg-surface border border-white/5 rounded-sm p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <Target className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">The Referee</h4>
                  <p className="text-white font-heading text-2xl mb-4">Expert Ledger Audit</p>
                  <p className="text-neutral-400 font-light text-sm mb-6">
                    We track every pundit's pick. We verify ROI. We report the truth.
                  </p>
                  
                  {/* Mock Leaderboard Row */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-mono border-b border-white/5 pb-2">
                      <span className="text-neutral-300">RANK 01</span>
                      <span className="text-emerald-400">+124% ROI</span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-mono border-b border-white/5 pb-2 opacity-60">
                      <span className="text-neutral-300">RANK 02</span>
                      <span className="text-emerald-400/80">+86% ROI</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Sectional Efficiency */}
            <Reveal delay={0.5} className="flex-1">
              <div className="h-full bg-surface border border-white/5 rounded-sm p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <BarChart3 className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">Performance Data</h4>
                  <p className="text-white font-heading text-2xl">Sectional Efficiency</p>
                  <div className="mt-6 flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-2xl text-white font-mono">10.4s</span>
                      <span className="text-xs text-neutral-500 uppercase">Last 200m</span>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10"></div>
                    <div className="flex flex-col">
                      <span className="text-2xl text-white font-mono">7.2m</span>
                      <span className="text-xs text-neutral-500 uppercase">Stride Length</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
};
