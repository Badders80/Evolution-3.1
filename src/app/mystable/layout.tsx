import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'MyStable | Evolution Stables - Your Ownership Dashboard',
  description: 'Manage your racehorse ownership positions, track performance, and stay connected to your stable through the MyStable dashboard.',
  alternates: {
    canonical: '/mystable',
  },
};

export default function MyStableLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
