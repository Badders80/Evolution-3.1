'use client';

import React, { useState } from 'react';
import { GlowPillButton } from '@/components/ui/GlowPillButton';
import { useInterest } from '@/hooks/useInterest';

export function Waitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { submit, isSubmitting, error } = useInterest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    try {
      await submit(email, 'evolution-4-foundation', 'waitlist-section');
      setSubmitted(true);
    } catch (err) {
      console.error('Waitlist submission failed', err);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <h3 className="heading-sub mb-4">You're on the list.</h3>
        <p className="body-standard">
          Thank you for your interest. We'll be in touch with exclusive updates.
        </p>
      </div>
    );
  }

  return (
    <section id="waitlist" className="py-24 bg-surface border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="label-overline mb-6">Early Access</p>
        <h2 className="heading-section mb-8">Join the Evolution</h2>
        <p className="body-lead mb-12 max-w-2xl mx-auto">
          Be the first to know when new horse stakes are listed and gain access
          to institutional-grade racing insights.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-black/50 border border-white/10 rounded-full px-6 py-3 text-body-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            <GlowPillButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </GlowPillButton>
          </div>
          {error && (
            <p className="text-red-400 text-xs mt-4 absolute left-0 right-0">{error}</p>
          )}
        </form>

        <p className="body-small mt-8 text-neutral-600">
          By joining, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </section>
  );
}
