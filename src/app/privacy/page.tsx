import React from 'react';
import { Footer } from '@/components/site/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-24 space-y-6">
        <h1 className="text-4xl font-semibold">Privacy Policy</h1>
        <p className="text-gray-300">
          This privacy policy outline is a placeholder. Please replace it with the final copy before launch.
        </p>
        <p className="text-gray-400">
          We collect only the information necessary to provide Evolution Stables services and never sell personal data.
          For detailed questions, contact <a href="mailto:alex@evolutionstables.nz" className="text-primary">alex@evolutionstables.nz</a>.
        </p>
      </section>
      <Footer />
    </main>
  );
}
