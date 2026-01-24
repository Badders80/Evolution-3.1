'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Join',
    description: 'Create your account and complete our simple identity verification process.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    )
  },
  {
    title: 'Select',
    description: 'Browse our marketplace of vetted thoroughbreds with full performance data.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    title: 'Own',
    description: 'Purchase your stake instantly through our regulation-ready digital platform.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Trade',
    description: 'List your stake for sale on our secondary marketplace whenever you choose.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )
  }
];

export function ProcessTimeline() {
  return (
    <section className="py-32 md:py-48 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="text-center mb-24 space-y-6">
          <p className="label-overline">The Process</p>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white">
            How It <span className="text-brand-gold italic">Works</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="bg-background border border-white/10 rounded-2xl p-8 space-y-6 hover:border-brand-gold/50 transition-colors duration-500">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-500">
                    {step.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-white">{step.title}</h3>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="absolute -top-4 -right-4 text-4xl font-black text-white/[0.03] select-none">
                    0{idx + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
