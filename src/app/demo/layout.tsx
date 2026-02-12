import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Marketplace | Evolution Stables',
  description: 'Discover and own digital assets in the Evolution Stables ecosystem',
  alternates: {
    canonical: '/demo',
  },
  openGraph: {
    title: 'Marketplace | Evolution Stables',
    description: 'Discover and own digital assets in the Evolution Stables ecosystem',
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
    title: 'Marketplace | Evolution Stables',
    description: 'Discover and own digital assets in the Evolution Stables ecosystem',
    images: ['/images/Gemini_Generated_Image_r4hnnzr4hnnzr4hn.jpg'],
  },
};

export default function DemoLayout({ children }: { children: ReactNode }) {
  return children;
}

