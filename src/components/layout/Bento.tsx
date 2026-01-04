import type { ReactNode } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

export const BentoGrid = ({ children, className }: BentoGridProps) => (
  <div
    className={clsx(
      'grid w-full auto-rows-[18rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
      className,
    )}
  >
    {children}
  </div>
);

type BentoCardProps = {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  href: string;
  cta: string;
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: BentoCardProps) => (
  <div
    className={clsx(
      'group relative col-span-1 flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-black/70 shadow-[0_24px_80px_rgba(0,0,0,0.55)]',
      'transition-transform duration-300 hover:-translate-y-1',
      className,
    )}
  >
    <div className="absolute inset-0">{background}</div>

    <div className="absolute left-6 top-6 text-white">
      <Icon className="h-7 w-7" />
    </div>

    <span className="absolute right-6 top-6 text-[0.55rem] uppercase tracking-[0.32em] text-white/35">
      Module
    </span>

    <div className="relative z-10 flex h-full flex-col justify-end gap-6 p-6 pt-24">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <p className="max-w-lg text-sm font-light leading-relaxed text-white/70">{description}</p>
      </div>

      <a
        href={href}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:text-white/80"
      >
        {cta}
        <ArrowRightIcon className="h-4 w-4" />
      </a>
    </div>

    <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-white/5" />
  </div>
);
