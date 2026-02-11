'use client';

import { useEffect, useRef, useState } from 'react';
import { Email } from '@/components/Email/Email';

export const About = () => {
  const ctaAnchorRef = useRef<HTMLDivElement>(null);
  const [ctaHeight, setCtaHeight] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isOverMission, setIsOverMission] = useState(false);

  const ctaCopy =
    'Professionalise your racehorse ownership experience. Secure priority access and institutional insights through our regulated platform.';
  const shouldShowCta = !isDismissed && !hasSubmitted;

  useEffect(() => {
    const submitted = localStorage.getItem('es_cta_submitted') === 'true';
    setHasSubmitted(submitted);

    if (!submitted && sessionStorage.getItem('es_cta_dismissed') === 'true') {
      setIsDismissed(true);
    }
  }, []);

  useEffect(() => {
    const updateSticky = () => {
      if (isDismissed || hasSubmitted) {
        setIsSticky(false);
        return;
      }

      const anchor = ctaAnchorRef.current;
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const midpoint = window.innerHeight / 2;
      const shouldStick = rect.top <= midpoint;
      setIsSticky(shouldStick);

      if (ctaHeight === null && rect.height > 0) {
        setCtaHeight(rect.height);
      }
    };

    updateSticky();
    window.addEventListener('scroll', updateSticky, { passive: true });
    window.addEventListener('resize', updateSticky);

    return () => {
      window.removeEventListener('scroll', updateSticky);
      window.removeEventListener('resize', updateSticky);
    };
  }, [ctaHeight, hasSubmitted, isDismissed]);

  useEffect(() => {
    if (!isSticky || !shouldShowCta) {
      setIsOverMission(false);
      return;
    }

    const updateOverlap = () => {
      const mission = document.getElementById('mission');
      if (!mission) {
        setIsOverMission(false);
        return;
      }

      const rect = mission.getBoundingClientRect();
      const midpoint = window.innerHeight / 2;
      setIsOverMission(rect.top <= midpoint && rect.bottom >= midpoint);
    };

    updateOverlap();
    window.addEventListener('scroll', updateOverlap, { passive: true });
    window.addEventListener('resize', updateOverlap);

    return () => {
      window.removeEventListener('scroll', updateOverlap);
      window.removeEventListener('resize', updateOverlap);
    };
  }, [isSticky, shouldShowCta]);


  useEffect(() => {
    const handleSubmitted = () => {
      window.setTimeout(() => {
        setHasSubmitted(true);
        setIsDismissed(false);
        setIsSticky(false);
      }, 2000);
    };

    window.addEventListener('es_cta_submitted', handleSubmitted);
    return () => window.removeEventListener('es_cta_submitted', handleSubmitted);
  }, []);

  const handleClose = () => {
    setIsDismissed(true);
    sessionStorage.setItem('es_cta_dismissed', 'true');
  };

  return (
    <section
      className="bg-background py-64 text-foreground"
      id="about"
      data-cta-overlay="off"
    >
      <div className="mx-auto max-w-6xl px-12 md:px-16 lg:px-20">
        <p className="mb-16 text-[11px] font-light uppercase tracking-[0.2em] text-white/30">
          ABOUT
        </p>

        <h2 className="mb-8 text-[36px] font-light tracking-tight text-white md:text-[48px]">
          Own the Experience
        </h2>

        <div className={`mt-6 ${shouldShowCta ? 'space-y-20' : 'space-y-8'}`}>
          <p className="text-[18px] font-light leading-[1.85] text-white/65">
            Racehorse ownership has changed. Evolution Stables removes the barriers that once made it
            complex and inaccessible — opening the door for first-timers and seasoned fans alike to not
            just watch, but own the experience.
          </p>

          {shouldShowCta ? (
            <div
              ref={ctaAnchorRef}
              style={isSticky && ctaHeight ? { minHeight: ctaHeight } : undefined}
            >
              {isSticky ? (
                <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[3px] pointer-events-none" />
              ) : null}
              <div
                className={
                  isSticky
                    ? 'fixed left-1/2 top-1/2 z-50 w-full max-w-[760px] -translate-x-1/2 -translate-y-1/2 px-4 text-center'
                    : 'w-[calc(100%+6rem)] -mx-12 px-4 text-center max-w-[760px] sm:mx-auto sm:w-full sm:max-w-[760px]'
                }
              >
                <div
                  className={`relative rounded-lg bg-black px-12 py-12 shadow-[0_0_120px_rgba(0,0,0,0.98)] border transition-colors duration-500 ${
                    isOverMission ? 'border-white/25' : 'border-white/10'
                  }`}
                >
                  {isSticky ? (
                    <button
                      type="button"
                      onClick={handleClose}
                      aria-label="Dismiss"
                      className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center"
                    >
                      ×
                    </button>
                  ) : null}
                  <h4 className="mb-6 text-[21px] font-light leading-tight text-white">
                    {ctaCopy}
                  </h4>

                  <Email />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-[18px] font-light leading-[1.85] text-white/65">
              {ctaCopy}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
