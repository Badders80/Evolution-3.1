'use client';

import React, { Fragment } from 'react';
import { cardHoverEffects, type CardHoverEffect } from '@/styles/hoverEffects';

interface StepItem {
  label: string;
  heading: string;
  description: string;
}

interface StickyScrollSectionProps {
  id?: string;
  sectionLabel: string;
  sectionHeading: string;
  sectionDescription: string;
  steps: StepItem[];
  hoverEffect?: CardHoverEffect; // Optional: defaults to 'blueGradientShimmer'
}

export const StickyScrollSection: React.FC<StickyScrollSectionProps> = ({
  id,
  sectionLabel,
  sectionHeading,
  sectionDescription,
  steps,
  hoverEffect = 'blueGradientShimmer', // Default to current blue gradient
}) => {
  const effect = cardHoverEffects[hoverEffect];
  
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-background text-foreground"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 lg:min-h-[220vh]">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:gap-24">
          {/* LEFT COLUMN — Anchor copy */}
          <aside className="py-24 sm:py-32 lg:py-40">
            <div className="space-y-8 lg:space-y-10 lg:sticky lg:top-24 lg:h-fit">
              <p className="text-xs font-medium tracking-[0.32em] uppercase text-white/35">
                {sectionLabel}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-light tracking-tight text-white">
                {sectionHeading}
              </h2>
              <p className="text-lg md:text-xl font-extralight leading-relaxed text-white/60 max-w-xl">
                {sectionDescription}
              </p>
            </div>
          </aside>

          {/* RIGHT COLUMN — Progressive stack */}
          <div className="relative pb-24 sm:pb-32 lg:pb-40">
            <div className="flex flex-col gap-12 lg:gap-0">
              {/* Phase 2 void */}
              <div className="hidden lg:block h-[26vh]" aria-hidden="true" />

              {steps.map((step, index) => (
                <Fragment key={step.label ?? index}>
                  <article
                    className={`group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] px-7 py-10 sm:px-10 sm:py-12 shadow-[0_24px_80px_-60px_rgba(0,0,0,0.75)] transition-[border,transform,box-shadow] ${effect.transitionClasses} backdrop-blur-[2px] lg:sticky lg:top-24 lg:shadow-[0_18px_60px_-48px_rgba(0,0,0,0.8)]`}
                  >
                    {effect.gradient !== 'none' && (
                      <div
                        className={`pointer-events-none absolute inset-px rounded-[22px] opacity-0 transition-opacity ${effect.transitionClasses} group-hover:opacity-100`}
                        aria-hidden="true"
                        style={{
                          background: effect.gradient,
                        }}
                      />
                    )}
                    <div className="relative flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
                      <div className="flex items-center justify-center">
                        <span className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-sm font-medium tracking-[0.3em] transition-transform ${effect.transitionClasses} ${effect.badgeClasses}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm font-light uppercase tracking-[0.32em] text-white/40">
                          {step.label}
                        </p>
                        <h3 className="text-[21px] sm:text-[23px] font-light leading-tight text-white">
                          {step.heading}
                        </h3>
                        <p className="text-[15px] leading-[1.9] font-light text-white/60">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </article>

                  {/* Spacer between cards for deliberate pauses */}
                  {index < steps.length - 1 && (
                    <div
                      className="hidden lg:block h-[18vh]"
                      aria-hidden="true"
                    />
                  )}
                </Fragment>
              ))}

              {/* Release spacer */}
              <div className="hidden lg:block h-[14vh]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
