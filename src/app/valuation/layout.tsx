import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Valuation Calculator | Evolution Stables',
  description:
    'Calculate lease valuations, breakeven points, and compare leasing vs. retaining your stake.',
  alternates: {
    canonical: '/valuation',
  },
  openGraph: {
    title: 'Valuation Calculator | Evolution Stables',
    description:
      'Calculate lease valuations, breakeven points, and compare leasing vs. retaining your stake.',
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
    title: 'Valuation Calculator | Evolution Stables',
    description:
      'Calculate lease valuations, breakeven points, and compare leasing vs. retaining your stake.',
    images: ['/images/Order-Window-MockUp.png'],
  },
};

export default function ValuationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
