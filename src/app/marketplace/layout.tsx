import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Marketplace | Evolution Stables - Digital Racehorse Ownership',
  description: 'Explore digital-syndication opportunities. Browse upcoming offerings, ownership positions, and live data in the Evolution Stables marketplace.',
  alternates: {
    canonical: '/marketplace',
  },
};

export default function MarketplaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
