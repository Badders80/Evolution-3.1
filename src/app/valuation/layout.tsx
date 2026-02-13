import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Valuation Model | Evolution Stables - Racehorse Lease Calculator',
  description:
    'Calculate racehorse lease valuations, breakeven points, and compare leasing vs. retaining your ownership stake with our interactive model.',
  alternates: {
    canonical: '/valuation',
  },
  openGraph: {
    title: 'Valuation Model | Evolution Stables',
    description:
      'Calculate racehorse lease valuations and compare leasing vs. retaining your ownership stake.',
    url: '/valuation',
    images: [
      {
        url: '/images/Order-Window-MockUp.png',
        width: 1200,
        height: 630,
        alt: 'Valuation Model',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valuation Model | Evolution Stables',
    description:
      'Calculate racehorse lease valuations and compare leasing vs. retaining your ownership stake.',
    images: ['/images/Order-Window-MockUp.png'],
  },
};

export default function ValuationLayout({ children }: { children: ReactNode }) {
  return children;
}
