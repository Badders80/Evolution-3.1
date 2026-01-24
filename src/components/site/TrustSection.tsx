'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function TrustSection() {
  return (
    <section className="bg-[#050505] py-24 md:py-32 border-y border-white/5">
      <div className="container mx-auto px-8 md:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Content */}
          <div className="max-w-xl space-y-8 text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light tracking-tight text-white"
            >
              Institutional by <span className="text-brand-gold italic">Design</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-400 font-light leading-relaxed"
            >
              Evolution Stables operates within a strict regulatory framework, ensuring institutional-grade governance for every digital-syndication. We bridge the gap between legacy racing and modern fintech infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6"
            >
              <a href="/compliance" className="text-xs uppercase tracking-widest text-brand-gold hover:text-white transition-colors">Compliance Docs</a>
              <a href="/risk" className="text-xs uppercase tracking-widest text-brand-gold hover:text-white transition-colors">Risk Disclosure</a>
              <a href="/fees" className="text-xs uppercase tracking-widest text-brand-gold hover:text-white transition-colors">Fee Structure</a>
            </motion.div>
          </div>

          {/* Logos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4"
            >
              <div className="h-16 w-32 relative flex items-center justify-center">
                <Image
                  src="/images/partners/8_NZTR_LOGO_WHITE.png"
                  alt="NZTR"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">New Zealand Thoroughbred Racing</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="h-16 w-32 flex items-center justify-center border border-white/10 rounded px-4">
                <span className="text-2xl font-bold text-white tracking-tighter">VARA</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">Virtual Assets Regulatory Authority</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="h-16 w-32 flex items-center justify-center border border-white/10 rounded px-4">
                <span className="text-2xl font-bold text-white tracking-tighter">FMA</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold">Financial Markets Authority</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
