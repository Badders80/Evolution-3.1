import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Marketplace | Evolution Stables - Digital Syndication',
  description:
    'Explore digital-syndication opportunities for racehorse ownership. Lease or trade verified stakes in the Evolution Stables marketplace.',
  keywords: [
    'racehorse marketplace',
    'digital syndication',
    'horse ownership marketplace',
    'lease racehorse',
    'trade racehorse stakes',
    'fractional ownership',
  ],
  alternates: {
    canonical: '/marketplace',
  },
  openGraph: {
    title: 'Marketplace | Evolution Stables',
    description: 'Explore digital-syndication opportunities for racehorse ownership.',
    url: '/marketplace',
    images: [
      {
        url: '/images/Mockup-trading-window.png',
        width: 1200,
        height: 630,
        alt: 'Evolution Stables Marketplace Trading Interface Mockup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketplace | Evolution Stables',
    description: 'Explore digital-syndication opportunities for racehorse ownership.',
    images: ['/images/Mockup-trading-window.png'],
  },
};

export default function MarketplaceLayout({ children }: { children: ReactNode }) {
  return children;
}
