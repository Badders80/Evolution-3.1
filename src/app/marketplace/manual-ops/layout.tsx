import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Marketplace Manual Ops | Evolution Stables',
  description:
    'Founder-facing manual ops inbox for marketplace application and reservation requests.',
  alternates: {
    canonical: '/marketplace/manual-ops',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function MarketplaceManualOpsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
