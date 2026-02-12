import Image from 'next/image';
import { FixedBg } from '@/components/ui/FixedBg';
import { GrassBg } from '@/components/ui/GrassBg';
import { Footer } from '@/components/site/Footer';
import { SplitFaq } from '@/components/ui/SplitFaq';
import { HeroSection } from '@/components/site/HeroSection';
import { PressShowcase } from '@/components/site/PressShowcase';
import { FAQStructuredData } from '@/components/seo/FAQStructuredData';
import { pressArticles } from '@/lib/press-articles';
import { About } from '@/components/About/About';
import { WaitlistOverlayController } from '@/components/site/WaitlistOverlayController';

const faqItems = [
  {
    question: 'What is Evolution Stables?',
    answer: "Evolution Stables is an institutional-grade marketplace designed for the acquisition and trade of digital equine assets. We provide a regulated, transparent environment for digital-syndication, ensuring that high-performance ownership is accessible to a global audience."
  },
  {
    question: 'What is our primary objective?',
    answer:
      "We aim to professionalise the racehorse ownership experience. By leveraging financial-grade infrastructure, we enable owners to unlock liquidity from their assets while providing investors with a secure, rule-based platform for participation.",
  },
  {
    question: 'How does digital-syndication differ from traditional models?',
    answer:
      "Digital-syndication removes the friction of manual paperwork and opaque management. All ownership stakes are managed through a secure digital ledger, providing real-time transparency, immediate settlement, and enhanced flexibility for stakeholders.",
  },
  {
    question: 'Is the marketplace regulated?',
    answer:
      "Yes. Compliance is central to our operation. All transactions and ownership structures are governed by clear regulatory frameworks and industry-standard protocols to ensure investor protection and market integrity.",
  },
  {
    question: 'What are the risks?',
    answer:
      "As with any regulated asset class, digital equine ownership involves inherent risks, including horse health and competitive performance. Evolution Stables mitigates secondary risks through transparent disclosure, regulated processes, and institutionalised management standards.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
          <FAQStructuredData items={faqItems} />
          <div className="sr-only">
            <h2>Horse Racing Digital Syndication</h2>
            <p>Evolution Stables is the premier platform for regulated racehorse ownership through digital-syndication and tokenised assets.</p>
          </div>
      <main className="text-foreground">
        <h1 className="sr-only">Evolution Stables - Regulated Marketplace for Digital Equine Assets</h1>
        <div className="w-full bg-background px-0 shadow-[0_0_80px_RGBA(0,0,0,0.35)] m-0 p-0 border-none max-w-none">
          <HeroSection />
        </div>
        
        <About />
        
        <section
          className="px-0 md:px-0 m-0 p-0 border-none"
          data-cta-overlay="off"
        >
          <FixedBg src="/images/Background-hooves-back-and-white.jpg" height="h-[50vh]" />
        </section>

        <WaitlistOverlayController />

        <section id="mission" className="py-24 bg-background text-foreground">
            <div className="max-w-6xl mx-auto px-12 md:px-16 lg:px-20 w-full">
              {/* Heading & Description */}
              <div className="space-y-12 mb-16">
                <p className="text-[11px] font-light tracking-[0.2em] uppercase text-white/30">
                  OUR MISSION
                </p>
                <h2 className="text-[36px] md:text-[56px] leading-[1.1] text-white font-light tracking-tight">
                  Institutionalised<br />Ownership
                </h2>
                <p className="text-[16px] leading-[1.7] font-light text-white/65">
                  Evolution Stables professionalises the lifecycle of racehorse ownership, ensuring that market integrity and high-performance standards benefit all industry stakeholders.
                </p>
              </div>

              {/* 3 Cards horizontally aligned */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div 
                  data-waitlist-trigger="true"
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
                      Qualified<br />Investors
                    </p>
                    <h4 className="text-[21px] font-light text-white leading-tight">
                      Institutional precision for high-performance assets.
                    </h4>
                    <p className="text-[15px] leading-[1.9] font-light text-white/60">
                      Access premium thoroughbred syndications within a transparent, regulated marketplace. Our platform ensures that risk, compliance, and asset performance are clear before every commitment.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div 
                  data-waitlist-trigger="true"
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
                      Strategic<br />Partners
                    </p>
                    <h4 className="text-[21px] font-light text-white leading-tight">
                      Enhanced liquidity and operational control.
                    </h4>
                    <p className="text-[15px] leading-[1.9] font-light text-white/60">
                      Breeders and syndicators can leverage our institutional infrastructure to manage digital equine assets, ensuring professional delivery and market-leading transparency.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div 
                  data-waitlist-trigger="true"
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
                      Governing<br />Bodies
                    </p>
                    <h4 className="text-[21px] font-light text-white leading-tight">
                      A benchmark for racing market integrity.
                    </h4>
                    <p className="text-[15px] leading-[1.9] font-light text-white/60">
                      Evolution Stables sets the standard for digital racing governance, converting market participation into long-term stakeholder value and industry stability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </section>

        <section
          className="px-0 md:px-0 m-0 p-0 border-none"
          data-cta-overlay="off"
        >
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
                Regulated Marketplace<br />for Digital Equine Assets
              </h2>

              {/* Description */}
              <p className="text-[16px] leading-[1.7] font-light text-white/65 mb-16 max-w-3xl">
                Behind our integrated marketplace, Tokinvest delivers the raw horsepower that powers digital-syndication — built on regulated, financial-grade infrastructure, tailored from institutional finance and adapted to meet the demands of modern equine asset management.
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

        {/* Press Showcase Section */}
        <PressShowcase articles={pressArticles} />

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
