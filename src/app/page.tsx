import { HeroSection } from '@/components/site/HeroSection';
import { MissionCombo } from '@/components/site/MissionCombo';
import { PressMentions } from '@/components/site/PressMentions';
import { Footer } from '@/components/site/Footer';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionCombo />
      <PressMentions />
      <Footer />
    </>
  );
}
