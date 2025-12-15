'use client';

import React, { useState } from 'react';

export const Email = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire to waitlist / Supabase later
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div className="max-w-xl">
      {/* Glow wrapper */}
      <div className="relative rounded-full transition-all duration-500 focus-within:shadow-[0_0_18px_rgba(255,255,255,0.22)]">
        <form
          onSubmit={handleSubmit}
          className="
            relative flex items-stretch w-full
            bg-black border border-white/20
            rounded-full overflow-hidden
            transition-all duration-300
            focus-within:border-white/50
          "
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="
              flex-1 pl-8 pr-4 py-4
              bg-transparent text-white
              placeholder:text-white/40
              focus:outline-none
              font-light text-sm md:text-base
            "
          />

          <button
            type="submit"
            className="
              relative inline-flex shrink-0 items-center justify-center overflow-hidden whitespace-nowrap
              rounded-full border border-white/[0.06] bg-white/[0.03]
              px-8 py-4 text-[11px] font-light uppercase tracking-[0.18em]
              text-white/70
              transition-all duration-300
              hover:border-white/[0.12] hover:bg-white/[0.06]
              focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50
            "
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer opacity-50" />
            <span className="relative z-10 transition-colors duration-300 animate-evo-text-pulse-gold">JOIN THE EVOLUTION</span>
          </button>
        </form>
      </div>
    </div>
  );
};
