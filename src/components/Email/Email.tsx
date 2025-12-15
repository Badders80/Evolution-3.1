'use client';

import React, { useEffect, useState } from 'react';
import { useInterest } from '@/hooks/useInterest';
import { GlowPillButton } from '@/components/ui/GlowPillButton';

export const Email = () => {
  const [email, setEmail] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { submit, isSubmitting } = useInterest();

  useEffect(() => {
    if (!hasSubmitted) return;
    const timeout = window.setTimeout(() => setHasSubmitted(false), 8000);
    return () => window.clearTimeout(timeout);
  }, [hasSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || isSubmitting) return;

    try {
      await submit(trimmed, 'about_join_evolution', 'about');
      setEmail('');
      setHasSubmitted(true);
    } catch (error) {
      console.error('Interest submission failed', error);
    }
  };

  return (
    <div className="max-w-lg mt-8">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center w-full rounded-full border border-white/10 bg-zinc-900/80 p-1.5 overflow-hidden transition-all duration-500 group-focus-within:border-white/30 group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <div className="absolute inset-0 opacity-20 transition-opacity duration-700 pointer-events-none mix-blend-overlay group-hover:opacity-40 group-focus-within:opacity-40">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl animate-border-shimmer -skew-x-12" />
          </div>
          {hasSubmitted ? (
            <div className="relative z-10 flex w-full justify-center py-2">
              <GlowPillButton
                type="button"
                disabled
                shimmer={false}
                wrapperClassName="pointer-events-none"
                className="cursor-default"
              >
                Welcome to the Evolution
              </GlowPillButton>
            </div>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-transparent pl-6 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none font-light rounded-full relative z-10"
                aria-label="Email address"
                disabled={isSubmitting}
              />
              <GlowPillButton
                type="submit"
                disabled={isSubmitting || !email.trim()}
                wrapperClassName="relative z-10 flex-shrink-0 ml-3"
              >
                Join the Evolution
              </GlowPillButton>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
