import { Metadata } from 'next';
import { ReactNode } from 'react';

export function generateMetadata(): Metadata {
  return {
    title: 'Marketplace | Evolution Stables',
    description:
      'Discover Evolution Stables marketplace opportunities and explore the digital syndication experience.',
    alternates: {
      canonical: '/marketplace',
    },
  };
}

export default function MarketplaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
