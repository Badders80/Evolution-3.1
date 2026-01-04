import React from 'react';
import { Button } from '@/components/ui/Button';

interface SectionTemplateProps {
  id?: string;
  label: string;
  heading: React.ReactNode;
  description: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  maxWidth?: 'default' | 'wide'; // default = 5xl, wide = 6xl
}

export const SectionTemplate: React.FC<SectionTemplateProps> = ({
  id,
  label,
  heading,
  description,
  className = '',
  children,
  showButton = false,
  buttonText = 'JOIN THE REVOLUTION',
  onButtonClick,
  maxWidth = 'default',
}) => {
  const containerClass = maxWidth === 'wide' ? 'max-w-6xl' : 'max-w-5xl';

  return (
    <section id={id} className={`py-56 bg-background text-foreground overflow-hidden ${className}`}>
      <div className={`${containerClass} mx-auto px-6 w-full`}>
        {/* Section Label */}
        <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-12 text-white/30">
          {label}
        </p>

        {/* Two Column Layout - Heading Left, Description Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-12 lg:gap-32 mb-12 items-start">
          {/* Headline */}
          <h2 className="text-[36px] md:text-[48px] leading-[1.1] text-white font-light tracking-tight whitespace-nowrap">
            {heading}
          </h2>

          {/* Lead Paragraph - Pushed to the Right */}
          <p className="text-[16px] leading-[1.7] font-light text-white/65 lg:pt-2 lg:ml-auto lg:max-w-md">
            {description}
          </p>
        </div>

        {/* CTA Button (optional) */}
        {showButton && (
          <div className="mb-12">
            <Button
              variant="outline"
              size="lg"
              className="gap-3 uppercase tracking-[0.2em] border-[#d4a964] text-[#d4a964] hover:bg-[#d4a964] hover:text-black"
              onClick={onButtonClick}
            >
              {buttonText}
              <span aria-hidden className="text-base">
                &rsaquo;
              </span>
            </Button>
          </div>
        )}

        {/* Additional Content */}
        {children}
      </div>
    </section>
  );
};
