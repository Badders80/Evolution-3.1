import React from 'react';
import { Metadata } from 'next';
import { Footer } from '@/components/site/Footer';

export const metadata: Metadata = {
  title: 'Website Terms Notice | Evolution Stables',
  description: 'A temporary website terms notice for Evolution Stables while final legal copy is being completed.',
  alternates: {
    canonical: '/terms',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-24 space-y-6">
        <h1 className="text-4xl font-semibold">Website Terms Notice</h1>
        <p className="text-gray-300">
          This page is a temporary notice while Evolution Stables prepares its final terms and conditions. It should
          not be treated as the finished legal agreement for platform or commercial use.
        </p>
        <p className="text-gray-400">
          The website content is provided for general information about Evolution Stables and related offerings. Nothing
          on this page should be relied on as legal, financial, or investment advice.
        </p>
        <p className="text-gray-400">
          Users should not misuse the website, attempt to interfere with its operation, or reproduce site materials
          except as permitted by law or with written permission from Evolution Stables.
        </p>
        <p className="text-gray-400">
          Questions about website use or upcoming legal terms can be directed to{' '}
          <a href="mailto:alex@evolutionstables.nz" className="text-primary">
            alex@evolutionstables.nz
          </a>.
        </p>
        <p className="text-gray-500 text-sm">
          Final terms should be reviewed and approved before this page is made indexable again.
        </p>
      </section>
      <Footer />
    </main>
  );
}
