import { Metadata } from 'next';
import { ReactNode } from 'react';

export function generateMetadata(): Metadata {
  return {
    title: 'MyStable | Evolution Stables',
    description:
      'MyStable is the Evolution Stables ownership dashboard experience.',
    alternates: {
      canonical: '/mystable',
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function MyStableLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
