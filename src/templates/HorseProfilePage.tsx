import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HorseProfilePageProps {
  name: string;
  image: string;
  details: React.ReactNode;
  updates: React.ReactNode;
  stats: React.ReactNode;
  className?: string;
}

/**
 * HorseProfilePage Template
 *
 * Comprehensive profile for a thoroughbred listing or owned horse.
 */
export function HorseProfilePage({
  name,
  image,
  details,
  updates,
  stats,
  className,
}: HorseProfilePageProps) {
  return (
    <main className={cn("min-h-screen pt-32 pb-24 bg-black text-white", className)}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header & Visual */}
          <div className="lg:col-span-8 space-y-8">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight">{name}</h1>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10">
              <Image src={image} alt={name} fill className="object-cover" priority />
            </div>
            {details}
          </div>

          {/* Stats & CTA Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div className="sticky top-40 space-y-8">
              {stats}
            </div>
          </div>

          {/* Updates Section (Full Width below) */}
          <div className="lg:col-span-12 mt-12 pt-12 border-t border-white/5">
            <h2 className="heading-section mb-12">Horse Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {updates}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
