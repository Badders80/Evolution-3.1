'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import {
  LuWorkflow,
  LuBot,
  LuCog,
  LuBrain,
} from 'react-icons/lu';

import { BentoGrid, BentoCard } from '@/components/layout/Bento';
import { FooterBar } from '@/components/site/Footer';

const iconMap: Record<string, IconType> = {
  digitalSyndication: LuWorkflow,
  ownershipDashboard: LuBot,
  integrationCompliance: LuCog,
  analyticsInsights: LuBrain,
  default: LuWorkflow,
};

const defaultBackground = (
  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/80" />
);

const layoutClassMap = {
  wide: 'aspect-[4/3] lg:col-span-2 lg:aspect-[2/1]',
  standard: 'aspect-[4/3] lg:col-span-1 lg:aspect-square',
};

type ModuleCardConfig = {
  name: string;
  description: string;
  cta: string;
  href: string;
  Icon: IconType;
  className: string;
  background?: ReactNode;
};

const fallbackModules: ModuleCardConfig[] = [
  {
    name: 'Digital Syndication',
    description:
      'Experience tokenised racehorse ownership. Lease or trade verified stakes directly within the Evolution platform.',
    cta: 'View Marketplace',
    href: '#',
    Icon: iconMap.digitalSyndication,
    className: layoutClassMap.wide,
    background: defaultBackground,
  },
  {
    name: 'Integration & Compliance',
    description:
      'Built in alignment with NZTR and VARA frameworks, ensuring every trade and syndication is fully compliant.',
    cta: 'Learn More',
    href: 'https://tokinvest.capital/report',
    Icon: iconMap.integrationCompliance,
    className: layoutClassMap.standard,
    background: defaultBackground,
  },
  {
    name: 'Analytics & Insights',
    description:
      'Access data-driven insights into race trends, horse performance, and portfolio value growth.',
    cta: 'View Insights',
    href: '#',
    Icon: iconMap.analyticsInsights,
    className: layoutClassMap.standard,
    background: defaultBackground,
  },
  {
    name: 'Ownership Dashboard',
    description:
      'Track your stable’s performance, prize returns, and active leases through a unified dashboard.',
    cta: 'Open MyStable',
    href: '/mystable',
    Icon: iconMap.ownershipDashboard,
    className: layoutClassMap.wide,
    background: defaultBackground,
  },
];

export default function MarketplacePage() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsTransitioning(true), 1800);
    const comingSoonTimer = setTimeout(() => setShowComingSoon(true), 2600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(comingSoonTimer);
    };
  }, []);

  const modules = fallbackModules;

  return (
    <main className="min-h-screen bg-background text-white pt-32 md:pt-40">
      <h1 className="sr-only">Evolution Stables Marketplace - Digital Syndication Opportunities</h1>
      <div className="mx-auto max-w-7xl space-y-24 px-6 pb-24 md:px-10 lg:px-12">
        {/* Section 1: Marketplace - 1/3 text, 2/3 trading window */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column - 1/3 width */}
          <div className="space-y-4 lg:col-span-1">
            <p className="mb-2 text-xs uppercase tracking-[0.28em] text-white/40">
              Evolution Stables
            </p>
            <h2 className="mb-4 text-4xl font-medium tracking-tight text-white">
              Marketplace
            </h2>
            <p className="text-base leading-relaxed text-white/60">
              Discover and explore digital-syndication opportunities within the
              Evolution ecosystem. Browse upcoming offerings, ownership
              positions, and live data&mdash;all designed to make racehorse
              ownership more accessible and connected.
            </p>
          </div>

          {/* Right column - 2/3 width - Trading window */}
          <div className="relative min-h-[400px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] via-transparent to-black/80 shadow-[0_30px_120px_rgba(0,0,0,0.45)] lg:col-span-2">
            {/* Trading window image that blurs but stays visible */}
            <div className="absolute inset-0 z-10">
              <Image
                src="/images/Mockup-trading-window.png"
                alt="Evolution Stables Marketplace Trading Interface Mockup"
                fill
                className={`object-cover object-center transition-all duration-700 ease-in-out ${
                  isTransitioning ? 'blur-[1.5px]' : 'blur-0'
                }`}
                sizes="(min-width: 1024px) 66vw, 100vw"
                priority
              />
              <div 
                className={`absolute inset-0 transition-colors duration-700 ${
                  isTransitioning ? 'bg-black/60' : 'bg-black/20'
                }`}
              />
            </div>

            {/* Faint outline that remains visible */}
            <div className="absolute inset-0 z-10 pointer-events-none border border-white/5 rounded-3xl" />

            {/* Coming Soon text that fades in */}
            <div
              className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-700 ease-out ${
                showComingSoon ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            >
              <p className="text-2xl font-medium tracking-tight text-white/80">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Section 2: Evolution Modules */}
        <section id="modules" className="space-y-12">
          <div className="space-y-4 text-left md:max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-white/40">
              Evolution Stables
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Modules
            </h2>
            <p className="text-base leading-relaxed text-white/60 md:text-lg">
              Explore the core components powering the Evolution ecosystem
              &mdash; from ownership analytics to race insights.
            </p>
          </div>

          <BentoGrid className="gap-3 md:gap-4 auto-rows-auto sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
            {modules.map(
              ({ name, description, cta, href, Icon, className, background }) => (
                <BentoCard
                  key={name}
                  name={name}
                  description={description}
                  cta={cta}
                  href={href}
                  Icon={Icon}
                  className={className}
                  background={background ?? defaultBackground}
                />
              ),
            )}
          </BentoGrid>
        </section>
      </div>
      <div className="mt-24">
        <FooterBar />
      </div>
    </main>
  );
}
