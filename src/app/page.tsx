import { Hero } from "@/components/home/Hero";
import { BridgeSection } from "@/components/home/BridgeSection";
import { Process } from "@/components/home/Process";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background">
      <Hero />
      <BridgeSection />
      <Process />
    </main>
  );
}
