import React from 'react';
import { Metadata } from 'next';
import { Footer } from '@/components/site/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Evolution Stables',
  description: 'Terms and conditions for using the Evolution Stables platform and services.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-24 space-y-6">
        <h1 className="text-4xl font-semibold">Terms of Service</h1>
        <p className="text-gray-300">
          These terms are currently a placeholder. Update this copy with the final legal agreement prior to launch.
        </p>
        <p className="text-gray-400">
          By using Evolution Stables digital products you agree to abide by all applicable regulations and our platform guidelines.
          Contact <a href="mailto:alex@evolutionstables.nz" className="text-primary">alex@evolutionstables.nz</a> with any questions.
        </p>
      </section>
      <Footer />
    </main>
  );
}
