import React from 'react';
import { Metadata } from 'next';
import { Footer } from '@/components/site/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Evolution Stables',
  description:
    'By using Evolution Stables digital products you agree to abide by all applicable regulations and our platform guidelines.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service | Evolution Stables',
    description:
      'By using Evolution Stables digital products you agree to abide by all applicable regulations and our platform guidelines.',
    url: '/terms',
    images: [
      {
        url: '/images/Logo-Gold.png',
        width: 1200,
        height: 630,
        alt: 'Evolution Stables',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Evolution Stables',
    description:
      'By using Evolution Stables digital products you agree to abide by all applicable regulations and our platform guidelines.',
    images: ['/images/Logo-Gold.png'],
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
