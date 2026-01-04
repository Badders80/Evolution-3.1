'use client';

import React from 'react';
import clsx from 'clsx';

type GlowPillButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  /**
   * Optional classes for the wrapper so consumers can control layout (e.g. responsive visibility).
   */
  wrapperClassName?: string;
  /**
   * Allow consumers to disable the shimmer layer (e.g. static success pill).
   */
  shimmer?: boolean;
};

const baseButtonClasses =
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2.5 text-[11px] font-light tracking-wider uppercase text-white/70 transition-all duration-300 hover:text-white hover:scale-105 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] overflow-hidden disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:text-white/70';

export const GlowPillButton = React.forwardRef<HTMLButtonElement, GlowPillButtonProps>(
  ({ children, wrapperClassName, shimmer = true, className, type = 'button', ...rest }, ref) => {
    return (
      <div className={clsx('relative group inline-block', wrapperClassName)}>
        {/* Subtle breathing glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-[2px] rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-60"
        />
        {/* Gold accent line */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 blur-[2px] transition-all duration-500 ease-out group-hover:w-full group-hover:opacity-100"
        />
        <button ref={ref} type={type} {...rest} className={clsx(baseButtonClasses, className)}>
          {shimmer && (
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer opacity-50"
            />
          )}
          <span className="relative z-10 inline-block transition-all duration-300 group-hover:scale-110">
            {children}
          </span>
        </button>
      </div>
    );
  },
);

GlowPillButton.displayName = 'GlowPillButton';
