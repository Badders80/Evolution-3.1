'use client';

import { useEffect, useState } from 'react';
import { Email } from '@/components/Email/Email';

export function WaitlistOverlayController() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (showWaitlist) return;

      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (!target.closest('[data-waitlist-trigger="true"]')) {
        return;
      }

      setShowWaitlist(true);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showWaitlist]);

  if (!showWaitlist) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 p-12 rounded-2xl shadow-2xl">
        <button
          onClick={() => setShowWaitlist(false)}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="space-y-8 text-center">
          <p className="text-[11px] font-light tracking-[0.2em] uppercase text-white/30">
            Qualified Asset Waitlist
          </p>
          <h3 className="text-3xl font-light text-white tracking-tight">Priority Access</h3>
          <p className="text-white/60 font-light leading-relaxed">
            Join the institutional waitlist for our next high-performance releases. Verified stakeholders
            receive first-look access to digital equine assets before public listing.
          </p>
          <Email campaignKey="release_waitlist_2026" />
        </div>
      </div>
    </div>
  );
}

