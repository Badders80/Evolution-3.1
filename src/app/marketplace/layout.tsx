import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Marketplace | Evolution Stables',
  description:
    'Explore racehorse offerings, ownership interests, and live marketplace data in Evolution Stables.',
  alternates: {
    canonical: '/marketplace',
  },
  openGraph: {
    title: 'Marketplace | Evolution Stables',
    description:
      'Explore racehorse offerings, ownership interests, and live marketplace data in Evolution Stables.',
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
    description:
      'Explore racehorse offerings, ownership interests, and live marketplace data in Evolution Stables.',
    images: ['/images/Mockup-trading-window.png'],
  },
};

export default function MarketplaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
