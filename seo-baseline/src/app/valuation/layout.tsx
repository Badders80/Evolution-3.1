import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Valuation Model | Evolution Stables - Racehorse Lease Calculator',
  description: 'Calculate racehorse lease valuations, breakeven points, and compare leasing vs. retaining your ownership stake with our interactive model.',
  alternates: {
    canonical: '/valuation',
  },
};

export default function ValuationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
