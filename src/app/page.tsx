import { HeroSection } from '@/components/site/HeroSection';
import { About } from '@/components/About/About';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PressMentions } from '@/components/site/PressMentions';
import { Footer } from '@/components/site/Footer';
import { pressArticles } from '@/lib/press-articles';
import { partnerLogos } from '@/lib/partner-logos';

export default function HomePage() {
  const processSteps = [
    {
      number: '01',
      title: 'Register Interest',
      description: 'Sign up for early access to upcoming tokenization offerings and stay informed about new opportunities.',
    },
    {
      number: '02',
      title: 'Browse Horses',
      description: 'Explore our curated selection of racehorses with detailed performance data, pedigree information, and ownership structures.',
    },
    {
      number: '03',
      title: 'Own & Trade',
      description: 'Purchase fractional ownership tokens, track your horses performance, and trade positions on our secondary marketplace.',
    },
  ];

  return (
    <>
      <HeroSection />
      
      <About />
      
      <ProcessSection
        eyebrow="HOW IT WORKS"
        title="Own a Racehorse in Three Simple Steps"
        description="Evolution Stables makes racehorse ownership accessible through blockchain tokenization. Join the revolution in digital ownership."
        steps={processSteps}
        ctaText="Get Started"
      />
      
      <PressMentions articles={pressArticles} partnerLogos={partnerLogos} />
      
      <Footer />
    </>
  );
}
