import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Platform Demo | Evolution Stables',
  description: 'Preview the Evolution Stables platform experience and core product flows.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/demo',
  },
  openGraph: {
    title: 'Platform Demo | Evolution Stables',
    description: 'Preview the Evolution Stables platform experience and core product flows.',
    url: '/demo',
    images: [
      {
        url: '/images/Gemini_Generated_Image_r4hnnzr4hnnzr4hn.jpg',
        width: 1200,
        height: 630,
        alt: 'Evolution Stables',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platform Demo | Evolution Stables',
    description: 'Preview the Evolution Stables platform experience and core product flows.',
    images: ['/images/Gemini_Generated_Image_r4hnnzr4hnnzr4hn.jpg'],
  },
};

export default function DemoLayout({ children }: { children: ReactNode }) {
  return children;
}
