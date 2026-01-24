'use client';

import Image from 'next/image';
import { FixedBg } from '@/components/ui/FixedBg';
import { GrassBg } from '@/components/ui/GrassBg';
import { Footer } from '@/components/site/Footer';
import { SplitFaq } from '@/components/ui/SplitFaq';
import { HeroSection } from '@/components/site/HeroSection';
import { PressShowcase } from '@/components/site/PressShowcase';
import { FAQStructuredData } from '@/components/seo/FAQStructuredData';
import { pressArticles } from '@/lib/press-articles';

const faqItems = [
  {
    question: 'Who is Evolution Stables?',
    answer: "Evolution Stables is a digital marketplace for secure, transparent racehorse ownership stakes."
  },
  {
    question: 'What is your primary goal?',
    answer: "We aim to make ownership flexible, liquid, and accessible to everyone through modern tools."
  },
  {
    question: 'Is it regulated?',
    answer: "Yes. All operations follow clear rules with transparent terms and built-in compliance."
  },
  {
    question: 'How do I get involved?',
    answer: "Browse available opportunities, select a stake, and manage your portfolio through our dashboard."
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <FAQStructuredData items={faqItems} />

      <main className="text-foreground">
        <h1 className="sr-only">Evolution Stables - Digital Racehorse Ownership</h1>

        {/* SECTION 1: HERO */}
        <div className="w-full bg-background border-none">
          <HeroSection />
        </div>
        
        {/* SECTION 2: WHY EVOLUTION (The Standard) */}
        <section id="why-evolution" className="py-56 bg-background">
          <div className="max-w-6xl mx-auto px-8 md:px-12">
            <p className="text-[10px] font-light tracking-[0.4em] uppercase text-white/20 mb-16">The Standard</p>
            <h2 className="text-h2 text-white font-light tracking-tight mb-24 max-w-2xl">
              Engineered for the<br />Modern Owner.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/[0.05] border border-white/[0.05]">
              <div className="bg-background p-12 space-y-6 group hover:bg-white/[0.02] transition-colors duration-500">
                <span className="text-[10px] text-primary tracking-widest uppercase">01</span>
                <h3 className="text-xl font-light text-white">Full Transparency</h3>
                <p className="text-sm font-light text-white/50 leading-relaxed">
                  Direct access to performance data, costs, and management updates.
                </p>
              </div>
              <div className="bg-background p-12 space-y-6 group hover:bg-white/[0.02] transition-colors duration-500">
                <span className="text-[10px] text-primary tracking-widest uppercase">02</span>
                <h3 className="text-xl font-light text-white">Regulated Security</h3>
                <p className="text-sm font-light text-white/50 leading-relaxed">
                  Institutional-grade compliance built into every transaction.
                </p>
              </div>
              <div className="bg-background p-12 space-y-6 group hover:bg-white/[0.02] transition-colors duration-500">
                <span className="text-[10px] text-primary tracking-widest uppercase">03</span>
                <h3 className="text-xl font-light text-white">Dynamic Liquidity</h3>
                <p className="text-sm font-light text-white/50 leading-relaxed">
                  Flexibility to exit or trade stakes through our marketplace.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-0 m-0 border-none">
          <FixedBg src="/images/Background-hooves-back-and-white.jpg" height="h-[60vh]" />
        </section>

        {/* SECTION 3: HOW IT WORKS (The Timeline) */}
        <section id="how-it-works" className="py-56 bg-background">
          <div className="max-w-6xl mx-auto px-8 md:px-12">
            <p className="text-[10px] font-light tracking-[0.4em] uppercase text-white/20 mb-16">The Process</p>
            <h2 className="text-h2 text-white font-light tracking-tight mb-32">How It Works</h2>

            <div className="relative space-y-32">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.05] -translate-x-1/2" />

              {/* Step 1 */}
              <div className="relative grid md:grid-cols-2 gap-12 items-center">
                <div className="md:text-right md:pr-16">
                  <h4 className="text-lg text-white mb-4">Discover</h4>
                  <p className="text-sm font-light text-white/50 max-w-sm md:ml-auto">
                    Browse elite bloodstock curated by industry experts.
                  </p>
                </div>
                <div className="absolute left-[-4px] md:left-1/2 w-2 h-2 rounded-full bg-primary -translate-x-1/2 z-10" />
                <div className="md:pl-16 opacity-20">
                   <div className="w-full aspect-video bg-white/[0.05] rounded-sm" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative grid md:grid-cols-2 gap-12 items-center">
                <div className="md:order-2 md:pl-16">
                  <h4 className="text-lg text-white mb-4">Invest</h4>
                  <p className="text-sm font-light text-white/50 max-w-sm">
                    Secure fractional stakes through our regulated platform.
                  </p>
                </div>
                <div className="absolute left-[-4px] md:left-1/2 w-2 h-2 rounded-full bg-primary -translate-x-1/2 z-10" />
                <div className="md:order-1 md:pr-16 opacity-20">
                   <div className="w-full aspect-video bg-white/[0.05] rounded-sm" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative grid md:grid-cols-2 gap-12 items-center">
                <div className="md:text-right md:pr-16">
                  <h4 className="text-lg text-white mb-4">Experience</h4>
                  <p className="text-sm font-light text-white/50 max-w-sm md:ml-auto">
                    Track performance and enjoy the thrill of ownership.
                  </p>
                </div>
                <div className="absolute left-[-4px] md:left-1/2 w-2 h-2 rounded-full bg-primary -translate-x-1/2 z-10" />
                <div className="md:pl-16 opacity-20">
                   <div className="w-full aspect-video bg-white/[0.05] rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-0 m-0 border-none">
          <FixedBg src="/images/Landscape-digitaloverlay.jpg" height="h-[60vh]" />
        </section>

        {/* SECTION 4: PLATFORM MODULES (The Infrastructure) */}
        <section id="modules" className="py-56 bg-background">
          <div className="max-w-6xl mx-auto px-8 md:px-12">
             <p className="text-[10px] font-light tracking-[0.4em] uppercase text-white/20 mb-16">The Infrastructure</p>
             <h2 className="text-h2 text-white font-light tracking-tight mb-24">Platform Modules</h2>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-8 border border-white/[0.05] hover:border-primary/30 transition-colors duration-500 space-y-6">
                   <Image src="/images/Increased Access.svg" alt="Syndication" width={32} height={32} className="opacity-40" />
                   <h4 className="text-sm uppercase tracking-widest text-white">Digital Syndication</h4>
                   <p className="text-[13px] font-light text-white/40 leading-relaxed">Lowering barriers for global participation.</p>
                </div>
                <div className="p-8 border border-white/[0.05] hover:border-primary/30 transition-colors duration-500 space-y-6">
                   <Image src="/images/greater-than-equal-icon-original.svg" alt="Marketplace" width={32} height={32} className="opacity-40" />
                   <h4 className="text-sm uppercase tracking-widest text-white">Active Marketplace</h4>
                   <p className="text-[13px] font-light text-white/40 leading-relaxed">Secondary trading for stake liquidity.</p>
                </div>
                <div className="p-8 border border-white/[0.05] hover:border-primary/30 transition-colors duration-500 space-y-6">
                   <Image src="/images/Untitled design (36).svg" alt="Compliance" width={32} height={32} className="opacity-40" />
                   <h4 className="text-sm uppercase tracking-widest text-white">AML/KYC Engine</h4>
                   <p className="text-[13px] font-light text-white/40 leading-relaxed">Integrated regulatory verification.</p>
                </div>
                <div className="p-8 border border-white/[0.05] hover:border-primary/30 transition-colors duration-500 space-y-6">
                   <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[8px] text-white/40">AI</div>
                   <h4 className="text-sm uppercase tracking-widest text-white">Data Insights</h4>
                   <p className="text-[13px] font-light text-white/40 leading-relaxed">Real-time bloodstock performance metrics.</p>
                </div>
             </div>
          </div>
        </section>

        {/* SECTION 5: INSTITUTIONAL TRUST (The Partnership) */}
        <section id="trust" className="py-56 bg-white/[0.02] border-y border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-8 md:px-12 text-center">
            <p className="text-[10px] font-light tracking-[0.4em] uppercase text-white/20 mb-16">Institutional by Design</p>
            <h2 className="text-[32px] md:text-[48px] font-light text-white tracking-tight mb-12">
              Powered by <a href="https://tokinvest.capital/" className="text-primary hover:text-primary/80 transition-colors">Tokinvest</a>
            </h2>
            <p className="text-lg font-light text-white/50 max-w-2xl mx-auto mb-24 leading-relaxed">
              Tokinvest delivers the financial-grade infrastructure that makes digital ownership possible, secure, and regulated.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-20 grayscale">
               <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center text-xs tracking-tighter">FMA</div>
                  <span className="text-[10px] uppercase tracking-widest">Regulated</span>
               </div>
               <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center text-xs tracking-tighter">AML</div>
                  <span className="text-[10px] uppercase tracking-widest">Compliant</span>
               </div>
               <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center text-xs tracking-tighter">SEC</div>
                  <span className="text-[10px] uppercase tracking-widest">Standards</span>
               </div>
            </div>
          </div>
        </section>

        <section id="get-started" className="bg-background">
          <GrassBg src="/images/Hooves-on-grass.png" />
        </section>

        {/* SECTION 6: FAQ */}
        <section id="faq" className="py-56 bg-background">
          <div className="max-w-6xl mx-auto px-8 md:px-12">
            <div className="grid md:grid-cols-[1fr,2fr] gap-24">
              <div>
                <p className="text-[10px] font-light tracking-[0.4em] uppercase text-white/20 mb-12">Knowledge</p>
                <h2 className="text-[32px] font-light text-white tracking-tight mb-6">FAQ</h2>
                <p className="text-sm font-light text-white/40 leading-relaxed">
                  A guide to the essentials of digital syndication.
                </p>
              </div>
              <div>
                <SplitFaq items={faqItems} />
              </div>
            </div>
          </div>
        </section>
        
        <PressShowcase articles={pressArticles} />

        <Footer />
      </main>
    </div>
  );
};

export default Home;
