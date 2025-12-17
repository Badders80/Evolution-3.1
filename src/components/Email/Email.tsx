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
        <div className="relative flex items-center w-full rounded-full border border-white/[0.06] bg-zinc-900/60 p-1.5 overflow-hidden transition-all duration-500 group-focus-within:border-white/30 group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <div className="absolute inset-0 opacity-20 transition-opacity duration-700 pointer-events-none mix-blend-overlay group-hover:opacity-40 group-focus-within:opacity-40">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl animate-border-shimmer -skew-x-12" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 bg-transparent pl-6 pr-32 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none font-light rounded-full relative z-10"
            aria-label="Email address"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 rounded-full px-6 py-2.5 text-[11px] font-light uppercase tracking-wider text-white/70 bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-white/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:border-white/[0.06]"
          >
            {hasSubmitted ? <span className="text-white/80">Welcome to the Evolution</span> : <span>Join the Evolution</span>}
          </button>
        </div>
      </form>
    </div>
  );
};
