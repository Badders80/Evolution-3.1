import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Demo | Evolution Stables',
  description: 'Experience the Evolution Stables marketplace demo.',
  alternates: {
    canonical: '/demo',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
