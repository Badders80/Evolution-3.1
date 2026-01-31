import { Hero } from "@/components/home/Hero";
import { BridgeSection } from "@/components/home/BridgeSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background">
      <Hero />
      <BridgeSection />
      {/* 
        TODO: Add subsequent sections:
        - <HowItWorks /> (Scrollytelling)
        - <RecentOfferings /> (Carousel)
      */}
    </main>
  );
}
