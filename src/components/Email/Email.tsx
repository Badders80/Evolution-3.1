'use client';

import React, { useState } from 'react';

export const Email = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="max-w-xl">
      {/* Glow container */}
      <div className="relative rounded-full transition-all duration-500 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
        <form
          className="relative flex w-full items-center rounded-full border border-white/20 bg-black p-1 transition-all duration-300 focus-within:border-white/60"
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 rounded-l-full bg-transparent px-6 py-3 font-light text-white placeholder:text-white/40 focus:outline-none"
          />

          <button
            type="submit"
            className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-white/[0.06] bg-white/[0.03] px-6 py-2.5 text-[11px] font-light uppercase tracking-[0.18em] text-[var(--evolution-gold)] transition-all duration-300 hover:bg-white/[0.06] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50"
          >
            JOIN THE EVOLUTION
          </button>
        </form>
      </div>
    </div>
  );
};
