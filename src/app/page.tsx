import { HeroSection } from '@/components/site/HeroSection';
import { PressMentions } from '@/components/site/PressMentions';
import { Footer } from '@/components/site/Footer';
import { pressArticles } from '@/lib/press-articles';
import { partnerLogos } from '@/lib/partner-logos';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PressMentions articles={pressArticles} partnerLogos={partnerLogos} />
      <Footer />
    </>
  );
}
