import { constructMetadata } from "@/lib/seo";
import { Hero } from "@/components/features/Hero";
import { Mission } from "@/components/features/Mission";
import { Waitlist } from "@/components/features/Waitlist";
import { FAQStructuredData } from '@/components/seo/FAQStructuredData';
import { SplitFaq } from '@/components/ui/SplitFaq';
import { pressArticles } from '@/lib/press-articles';
import { PressShowcase } from '@/components/site/PressShowcase';
import { FixedBg } from '@/components/ui/FixedBg';

export const metadata = constructMetadata({
  title: "Evolution Stables - Digital Racehorse Ownership",
  description: "Experience the future of racehorse ownership through digital-syndication. Accessible, transparent, and liquid participation in the world's most elite sport.",
});

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

export default function Home() {
  return (
    <>
      <FAQStructuredData items={faqItems} />

      <Hero />

      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="label-overline mb-8">Evolution Stables</p>
          <h2 className="heading-section mb-12">Institutional-Grade Infrastructure</h2>
          <p className="body-lead max-w-3xl mx-auto">
            We are building the technical foundation that allows the racing industry to evolve.
            By combining heritage-informed design with modern digital systems, we enable a
            new level of participation and transparency.
          </p>
        </div>
      </section>

      <Mission />

      <Waitlist />

      <section className="px-0">
        <FixedBg src="/images/Background-hooves-back-and-white.jpg" height="h-[60vh]" />
      </section>

      {/* Press Showcase Section */}
      <PressShowcase articles={pressArticles} />

      <section id="faq" className="py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="label-overline mb-6">FAQ</p>
            <h2 className="heading-section">Understanding Digital-Syndication</h2>
          </div>
          <SplitFaq items={faqItems} className="mx-auto max-w-3xl" />
        </div>
      </section>
    </>
  );
}
