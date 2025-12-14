'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FixedBg } from '@/components/ui/FixedBg';
import { GrassBg } from '@/components/ui/GrassBg';
import { Footer } from '@/components/site/Footer';
import { SplitFaq } from '@/components/ui/SplitFaq';
import { HeroSection } from '@/components/site/HeroSection';
import { PressMentions } from '@/components/site/PressMentions';
import { pressArticles } from '@/lib/press-articles';
import { InterestForm } from '@/components/interest/InterestForm';

const faqItems = [
  {
    question: 'Who is Evolution Stables?',
    answer: "At its core, Evolution Stables is a marketplace built to make buying and selling racehorse ownership stakes simple, transparent, and secure. We use modern tools to make participation easier for anyone — whether you're new to racing or already involved."
  },
  {
    question: 'What is Evolution Stables here to do?',
    answer:
      "We're here to make racehorse ownership work better for everyone. That means creating an easier way to get involved, helping owners unlock value from their horses, and building a system where ownership can move more freely between people.",
  },
  {
    question: 'How is Evolution Stables different?',
    answer:
      "We focus on making ownership practical. No long-term lock-ins, no complicated paperwork — just clear terms, flexible options, and the ability to buy or sell stakes when it suits you. Everything is designed around how people want to participate today.",
  },
  {
    question: 'What does digital-syndication mean?',
    answer:
      "Digital-syndication is a modern take on a familiar idea. Instead of traditional syndicates managed on paper, ownership stakes are offered and managed online — making them easier to access, track, and trade.",
  },
  {
    question: 'Can I trade or sell my stake?',
    answer: "Yes. Our marketplace is designed to make ownership more flexible, so you can sell your stake to someone else if you choose. This creates liquidity — something the racing industry has traditionally lacked.",
  },
  {
    question: 'What are the risks?',
    answer:
      "Like any regulated investment, racehorse ownership carries some risk. Horses can get injured, performance can vary, and returns are not guaranteed. What matters is that everything on our platform operates under clear rules — with transparent terms, regulated processes, and compliance built in — so you always know what you're investing in and how it's managed.",
  },
];

const Home = () => {
  const [mode, setMode] = useState<'idle' | 'form' | 'success'>('idle');

  return (
    <div className="min-h-screen">
      <main className="text-foreground">
        <div className="w-full bg-background px-0 shadow-[0_0_80px_RGBA(0,0,0,0.35)] m-0 p-0 border-none max-w-none">
          <HeroSection />
        </div>
        
        <section id="about" className="py-64 bg-background text-foreground">
          <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20">
            {/* Section Label */}
            <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-16 text-white/30">
              ABOUT
            </p>

            {/* Headline */}
            <h2 className="text-[36px] md:text-[48px] leading-[1.1] mb-14 text-white font-light tracking-tight">
              Own the Experience
            </h2>

            {/* Lead Paragraph */}
            <p className="text-[18px] leading-[1.85] font-light max-w-3xl mb-20 text-white/65">
              Racehorse ownership has changed. Evolution Stables removes the barriers that once made it complex and inaccessible — opening the door for first-timers and seasoned fans alike to not just watch, but own the experience
            </p>

            <div className="relative group inline-block">
              {mode === 'idle' && (
                <>
                  <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 blur-[2px] group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-out" />
                  <button
                    onClick={() => setMode('form')}
                    className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-3.5 text-[11px] font-light tracking-wider uppercase text-white/70 transition-all duration-300 hover:text-white hover:scale-105 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer opacity-50" />
                    <span className="relative z-10 inline-block transition-all duration-300 group-hover:scale-110">JOIN THE EVOLUTION</span>
                  </button>
                </>
              )}
              {mode === 'form' && (
                <InterestForm
                  campaignKey="about_join_evolution"
                  onSuccess={() => setMode('success')}
                  onCancel={() => setMode('idle')}
                />
              )}
              {mode === 'success' && (
                <div className="text-sm text-neutral-400">
                  Welcome to the Evolution
                </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Background-hooves-back-and-white.jpg" height="h-[50vh]" />
        </section>

        <section id="mission" className="py-24 bg-background text-foreground">
            <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 w-full">
              {/* Heading & Description */}
              <div className="space-y-12 mb-16">
                <p className="text-[11px] font-light tracking-[0.2em] uppercase text-white/30">
                  OUR MISSION
                </p>
                <h2 className="text-[36px] md:text-[56px] leading-[1.1] text-white font-light tracking-tight">
                  How It<br />Works
                </h2>
                <p className="text-[16px] leading-[1.7] font-light text-white/65">
                  At Evolution Stables, we understand that ownership is the lifeblood of racing — and strengthening it benefits every part of the industry.
                </p>
              </div>

              {/* 3 Cards horizontally aligned */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div 
                  className="group relative bg-white/[0.02] border border-white/[0.08] rounded-lg p-10 transition-all duration-700 ease-out hover:bg-white/[0.04] hover:border-white/[0.15] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer"
                >
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                    style={{
                      background: 'linear-gradient(140deg, rgba(255,255,255,0.06), rgba(67,129,255,0.08) 40%, transparent 70%)'
                    }}
                  />
                  <div className="relative space-y-4">
                    <p className="text-sm font-light uppercase tracking-[0.32em] text-white/40">
                      Investors & <br />Fans
                    </p>
                    <h4 className="text-[21px] font-light text-white leading-tight">
                      Experience the thrill — without the hassle.
                    </h4>
                    <p className="text-[15px] leading-[1.9] font-light text-white/60">
                      Ownership, on your terms. Simplified terms and conditions give you the full thrill of ownership in a transparent, regulated marketplace — where risk and return are clear before you buy.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div 
                  className="group relative bg-white/[0.02] border border-white/[0.08] rounded-lg p-10 transition-all duration-700 ease-out hover:bg-white/[0.04] hover:border-white/[0.15] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer"
                >
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                    style={{
                      background: 'linear-gradient(140deg, rgba(255,255,255,0.06), rgba(67,129,255,0.08) 40%, transparent 70%)'
                    }}
                  />
                  <div className="relative space-y-4">
                    <p className="text-sm font-light uppercase tracking-[0.32em] text-white/40">
                      Breeders & <br />Syndicators
                    </p>
                    <h4 className="text-[21px] font-light text-white leading-tight">
                      Unlock new income — same control, zero extra effort.
                    </h4>
                    <p className="text-[15px] leading-[1.9] font-light text-white/60">
                      Expand your reach and retain full control, with offers structured, managed, and delivered — all in one place.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div 
                  className="group relative bg-white/[0.02] border border-white/[0.08] rounded-lg p-10 transition-all duration-700 ease-out hover:bg-white/[0.04] hover:border-white/[0.15] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer"
                >
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                    style={{
                      background: 'linear-gradient(140deg, rgba(255,255,255,0.06), rgba(67,129,255,0.08) 40%, transparent 70%)'
                    }}
                  />
                  <div className="relative space-y-4">
                    <p className="text-sm font-light uppercase tracking-[0.32em] text-white/40">
                      Clubs & <br />Organisations
                    </p>
                    <h4 className="text-[21px] font-light text-white leading-tight">
                      From spectators to invested stakeholders.
                    </h4>
                    <p className="text-[15px] leading-[1.9] font-light text-white/60">
                      Ownership is the gateway to deeper engagement — turning one-time spectators into lifelong members, building revenue, and strengthening the sport&apos;s future, all in one place.
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </section>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Landscape-digitaloverlay.jpg" height="h-[50vh]" />
        </section>

        <section id="digital-syndication" className="py-56 bg-background text-foreground">
          <div className="max-w-5xl mx-auto px-6">
            {/* Section Label */}
            <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-12 text-white/30">
              OUR MODEL
            </p>

            {/* Two Column Layout */}
            <div className="grid gap-16 lg:grid-cols-[1fr,1fr] lg:gap-48 xl:gap-56">

              {/* LEFT COLUMN */}
              <div className="space-y-8">
                {/* Headline */}
                <h2 className="text-[36px] md:text-[48px] leading-[1.1] text-white font-light tracking-tight">
                  Digital Syndication
                </h2>

                {/* Lead Paragraph */}
                <p className="text-[16px] leading-[1.7] font-light text-white/65">
                  Syndication has always been the heartbeat of racehorse ownership — sharing risk, reward, and the thrill of the sport. But the way people participate has changed.
                </p>
                <p className="text-[16px] leading-[1.7] font-light text-white/65">
                  Our digital-syndication model builds on that legacy — lowering barriers, increasing transparency, and unlocking new ways for owners, investors, and fans to participate — without replacing what works.
                </p>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-8">
                {/* Features List */}
                <div className="space-y-12">
                  {/* Increased Access Section */}
                  <div className="group py-2 transition-transform duration-500 hover:scale-[1.02]">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center transition-all duration-500">
                        <Image 
                          src="/images/Increased Access.svg" 
                          alt="INCREASED ACCESS"
                          width={48}
                          height={48}
                          className="w-10 h-10 transition-all duration-500 group-hover:[filter:brightness(0)_saturate(100%)_invert(100%)]"
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(80%)'
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-[300] tracking-[0.05em] uppercase text-white mb-3 relative overflow-hidden">
                          <span className="relative inline-block">
                            Increased Access
                            {/* Dark overlay sweep - left to right only, instant disappear on unhover */}
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-transparent -translate-x-full opacity-0 group-hover:translate-x-full group-hover:opacity-100 group-hover:transition-all group-hover:duration-700 group-hover:ease-in-out transition-none" />
                          </span>
                        </h4>
                        <p className="text-[15px] leading-[1.6] font-light text-white/50 group-hover:text-white/70 transition-colors duration-500">
                          A digital platform that lowers barriers<br />and opens ownership to everyone.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Greater Transparency Section */}
                  <div className="group py-2 transition-transform duration-500 hover:scale-[1.02]">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center transition-all duration-500">
                        <Image 
                          src="/images/greater-than-equal-icon-original.svg" 
                          alt="GREATER TRANSPARENCY"
                          width={48}
                          height={48}
                          className="w-10 h-10 transition-all duration-500 group-hover:[filter:brightness(0)_saturate(100%)_invert(100%)]"
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(80%)'
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-[300] tracking-[0.05em] uppercase text-white mb-3 relative overflow-hidden">
                          <span className="relative inline-block">
                            Greater Transparency
                            {/* Dark overlay sweep */}
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                          </span>
                        </h4>
                        <p className="text-[15px] leading-[1.6] font-light text-white/50 group-hover:text-white/70 transition-colors duration-500">
                          Real-time performance, clear costs,<br />and open communication.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Borderless Flexibility Section */}
                  <div className="group py-2 transition-transform duration-500 hover:scale-[1.02]">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center transition-all duration-500">
                        <Image 
                          src="/images/Untitled design (36).svg" 
                          alt="BORDERLESS FLEXIBILITY"
                          width={48}
                          height={48}
                          className="w-10 h-10 transition-all duration-500 group-hover:[filter:brightness(0)_saturate(100%)_invert(100%)]"
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(80%)'
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-[300] tracking-[0.05em] uppercase text-white mb-3 relative overflow-hidden">
                          <span className="relative inline-block">
                            Borderless Flexibility
                            {/* Dark overlay sweep - left to right only, instant disappear on unhover */}
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-transparent -translate-x-full opacity-0 group-hover:translate-x-full group-hover:opacity-100 group-hover:transition-all group-hover:duration-700 group-hover:ease-in-out transition-none" />
                          </span>
                        </h4>
                        <p className="text-[15px] leading-[1.6] font-light text-white/50 group-hover:text-white/70 transition-colors duration-500">
                          Fractional shares and short-term<br />commitments for modern investors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-0 md:px-0 m-0 p-0 border-none">
          <FixedBg src="/images/Horse-and-foal.jpg" height="h-[50vh]" />
        </section>

        <section id="innovation" className="py-56 bg-background text-foreground">
          <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20">
            {/* Section Label */}
            <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-12 text-white/30">
              REGULATED MARKETPLACE
            </p>

            {/* Headline */}
            <h2 className="text-[36px] md:text-[48px] leading-[1.1] text-white font-light tracking-tight mb-6">
              Transformation Powered<br />by <a href="https://tokinvest.capital/" target="_blank" rel="noopener noreferrer" className="text-[#21B981] hover:!text-[#2dd4a4] hover:font-normal hover:tracking-[-0.02em] transition-all">Tokinvest</a>
            </h2>

            {/* Description */}
            <p className="text-[16px] leading-[1.7] font-light text-white/65 mb-16 max-w-3xl">
              Behind our integrated marketplace, Tokinvest delivers the raw horsepower that powers digital-syndication — built on regulated, financial-grade infrastructure, tailored from institutional finance and adapted to meet the demands of modern owners.
            </p>
          {/* Features */}
          <div className="mt-32 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Card 1 */}
              <div className="group flex flex-col gap-6 relative px-8 py-12 md:px-10 md:py-16 transition-all duration-500">
                {/* Vertical line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[1px] bg-white/[0.08]" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[1px] bg-primary origin-center scale-y-0 transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-y-100" />
                <div className="space-y-12">
                  <div>
                    <svg className="h-8 w-8 text-white/60 transition-colors duration-500 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[18px] font-light text-white leading-tight relative overflow-hidden">
                      <span className="relative inline-block">
                        Discover Opportunities
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-transparent -translate-x-full opacity-0 group-hover:translate-x-full group-hover:opacity-100 group-hover:transition-all group-hover:duration-700 group-hover:ease-in-out transition-none" />
                      </span>
                    </h4>
                    <p className="text-[15px] leading-[1.7] font-light text-white/50 transition-colors duration-500 group-hover:text-white/80">
                      Explore available syndications and short-term leases — all clearly structured, fully transparent, and ready to invest in with confidence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group flex flex-col gap-6 relative px-8 py-12 md:px-10 md:py-16 transition-all duration-500">
                {/* Vertical line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[1px] bg-white/[0.08]" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[1px] bg-primary origin-center scale-y-0 transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-y-100" />
                <div className="space-y-12">
                  <div>
                    <svg className="h-8 w-8 text-white/60 transition-colors duration-500 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[18px] font-light text-white leading-tight relative overflow-hidden">
                      <span className="relative inline-block">
                        Trade with Confidence
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-transparent -translate-x-full opacity-0 group-hover:translate-x-full group-hover:opacity-100 group-hover:transition-all group-hover:duration-700 group-hover:ease-in-out transition-none" />
                      </span>
                    </h4>
                    <p className="text-[15px] leading-[1.7] font-light text-white/50 transition-colors duration-500 group-hover:text-white/80">
                      Tokinvest&apos;s regulated platform ensures secure transactions, immutable ownership records, and integrated settlements — so every trade is safe, clear, and straightforward.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group flex flex-col gap-6 relative px-8 py-12 md:px-10 md:py-16 transition-all duration-500">
                {/* Vertical line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[1px] bg-white/[0.08]" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[1px] bg-primary origin-center scale-y-0 transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-y-100" />
                <div className="space-y-12">
                  <div>
                    <svg className="h-8 w-8 text-white/60 transition-colors duration-500 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[18px] font-light text-white leading-tight relative overflow-hidden">
                      <span className="relative inline-block">
                        Real-Time Insight
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/70 to-transparent -translate-x-full opacity-0 group-hover:translate-x-full group-hover:opacity-100 group-hover:transition-all group-hover:duration-700 group-hover:ease-in-out transition-none" />
                      </span>
                    </h4>
                    <p className="text-[15px] leading-[1.7] font-light text-white/50 transition-colors duration-500 group-hover:text-white/80">
                      Follow your horses, track performance, and manage your positions in real time — with ownership data, updates, and key information always at your fingertips.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="mt-32">
              <div className="relative group inline-block">
                {/* Subtle breathing glow on hover */}
                <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                {/* Gold accent on hover - bottom highlight */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 blur-[2px] group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-out" />
                <a
                  href="https://tokinvest.capital/report"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-8 py-3.5 text-[11px] font-light tracking-wider uppercase text-white/70 transition-all duration-300 hover:text-white hover:scale-105 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] overflow-hidden"
                >
                  {/* Gentle shimmer animation - avoids center for text clarity */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer opacity-50" />
                  <span className="relative z-10 inline-block transition-all duration-300 group-hover:scale-110">Learn More About Tokinvest</span>
                </a>
              </div>
            </div>
          </div>
          </div>
        </section>

        <section id="get-started" className="bg-background">
          <GrassBg src="/images/Hooves-on-grass.png" />
        </section>

        {/* Press Mentions Section */}
        <PressMentions articles={pressArticles} />

        <section id="faq" className="py-56 bg-background text-foreground">
          <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20">
            {/* Section Label */}
            <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-12 text-white/30">
              FAQ
            </p>

            {/* Headline */}
            <h2 className="text-[36px] md:text-[48px] leading-[1.1] text-white font-light tracking-tight mb-6">
              Understanding<br />
              Digital-Syndication
            </h2>

            {/* Description */}
            <p className="text-[18px] leading-[1.7] font-light text-white/50 mb-24 max-w-xl">
              A considered guide to the essentials — how digital-syndication works, what it means for ownership, and where Evolution Stables fits in.
            </p>

            {/* FAQ Component */}
            <div className="mt-16">
              <SplitFaq items={faqItems} className="mx-auto max-w-3xl" />
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default Home;
