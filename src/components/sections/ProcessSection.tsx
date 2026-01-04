import React from 'react';
import { Button } from '@/components/ui/Button';

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type ProcessSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  steps: ProcessStep[];
  ctaText?: string;
  onCtaClick?: () => void;
};

export function ProcessSection({
  eyebrow = 'PROCESS',
  title,
  description,
  steps,
  ctaText = 'Get started',
  onCtaClick,
}: ProcessSectionProps) {
  return (
    <section className="py-48 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Label */}
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}

        {/* Headline */}
        <h2 className="heading-xl mb-6">{title}</h2>

        {/* Description */}
        {description && (
          <p className="body-text max-w-3xl mb-12">{description}</p>
        )}

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group p-6 rounded-lg hover:bg-foreground/5 transition-colors duration-300"
            >
              <div className="flex flex-col gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {onCtaClick && (
          <div className="mt-12">
            <Button
              variant="outline"
              className="gap-3 uppercase tracking-[0.2em]"
              onClick={onCtaClick}
            >
              {ctaText}
              <span aria-hidden className="text-base">
                &rsaquo;
              </span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProcessSection;
