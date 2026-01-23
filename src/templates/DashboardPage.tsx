import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardPageProps {
  title: string;
  subtitle: string;
  stats: React.ReactNode;
  mainContent: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

/**
 * DashboardPage Template
 *
 * Layout for internal user pages (MyStable, Admin).
 */
export function DashboardPage({
  title,
  subtitle,
  stats,
  mainContent,
  sidebar,
  className,
}: DashboardPageProps) {
  return (
    <main className={cn("min-h-screen pt-32 pb-24 bg-black text-white", className)}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        <header className="mb-12">
          <p className="label-overline mb-2">Evolution Stables</p>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">{title}</h1>
          <p className="mt-4 text-base text-neutral-400 max-w-2xl">{subtitle}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats}
          </div>

          <div className="lg:col-span-3 space-y-12">
            {mainContent}
          </div>

          {sidebar && (
            <aside className="lg:col-span-1 space-y-8">
              {sidebar}
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
