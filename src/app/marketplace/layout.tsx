import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Evolution Stables Marketplace - Digital Syndication Opportunities',
  description:
    'Discover and explore digital-syndication opportunities within the Evolution ecosystem. Browse upcoming offerings, ownership positions, and live data—all designed to make racehorse ownership more accessible and connected.',
  alternates: {
    canonical: '/marketplace',
  },
  openGraph: {
    title: 'Evolution Stables Marketplace - Digital Syndication Opportunities',
    description:
      'Discover and explore digital-syndication opportunities within the Evolution ecosystem. Browse upcoming offerings, ownership positions, and live data—all designed to make racehorse ownership more accessible and connected.',
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
    title: 'Evolution Stables Marketplace - Digital Syndication Opportunities',
    description:
      'Discover and explore digital-syndication opportunities within the Evolution ecosystem. Browse upcoming offerings, ownership positions, and live data—all designed to make racehorse ownership more accessible and connected.',
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
