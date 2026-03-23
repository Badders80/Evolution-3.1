import React from 'react';
import { Metadata } from 'next';
import { Footer } from '@/components/site/Footer';

export const metadata: Metadata = {
  title: 'Privacy Notice | Evolution Stables',
  description: 'A temporary privacy notice for Evolution Stables while final legal copy is being completed.',
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-24 space-y-6">
        <h1 className="text-4xl font-semibold">Privacy Notice</h1>
        <p className="text-gray-300">
          This page is a temporary privacy notice while Evolution Stables prepares its final legal documentation. It is
          provided for transparency, but it is not intended to replace a completed, jurisdiction-specific privacy policy.
        </p>
        <p className="text-gray-400">
          When you use the site, submit an expression of interest, or contact the team, Evolution Stables may collect
          information such as your name, email address, and the interaction details needed to respond to you.
        </p>
        <p className="text-gray-400">
          That information is used to operate the website, manage enquiries, understand product interest, and improve
          the service. Evolution Stables does not intend to sell personal information.
        </p>
        <p className="text-gray-400">
          Some data may be processed by service providers that support hosting, analytics, authentication, or contact
          workflows. If you have questions about the handling of your information, contact{' '}
          <a href="mailto:alex@evolutionstables.nz" className="text-primary">
            alex@evolutionstables.nz
          </a>.
        </p>
        <p className="text-gray-500 text-sm">
          Final legal copy should be reviewed and approved before this page is made indexable again.
        </p>
      </section>
      <Footer />
    </main>
  );
}
