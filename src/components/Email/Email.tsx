'use client';

import React, { useEffect, useState } from 'react';
import { useInterest } from '@/hooks/useInterest';

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
        {hasSubmitted ? (
          <div
            className="flex w-full items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] px-6 py-4 text-sm tracking-wide text-white animate-fade-in"
            role="status"
            aria-live="polite"
          >
            Welcome to the Evolution
          </div>
        ) : (
          <div className="relative flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0 w-full rounded-full border border-white/[0.06] bg-zinc-900/60 p-1.5 overflow-hidden transition-all duration-500 group-focus-within:border-white/30 group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <div className="absolute inset-0 opacity-20 transition-opacity duration-700 pointer-events-none mix-blend-overlay group-hover:opacity-40 group-focus-within:opacity-40">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl animate-border-shimmer -skew-x-12" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full md:flex-1 bg-transparent pl-6 pr-6 md:pr-32 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none font-light rounded-full relative z-10"
              aria-label="Email address"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={!email.trim()}
              className="static w-full md:w-auto md:absolute md:right-1.5 md:top-1/2 md:-translate-y-1/2 md:z-20 relative overflow-hidden rounded-full px-6 py-2.5 text-[11px] font-light uppercase tracking-wider text-white border border-white/20 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:scale-[1.03] cursor-pointer disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -inset-y-4 -inset-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30 blur-xl animate-border-shimmer" />
              </div>
              <span className="relative z-10">Join the Evolution</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
