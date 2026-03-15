import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'MyStable | Evolution Stables',
  description:
    'This is your personal command center for managing ownership positions, tracking performance, and staying connected to your stable.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/mystable',
  },
  openGraph: {
    title: 'MyStable | Evolution Stables',
    description:
      'This is your personal command center for managing ownership positions, tracking performance, and staying connected to your stable.',
    url: '/mystable',
    images: [
      {
        url: '/images/Gemini_Generated_Image_r4hnnzr4hnnzr4hn.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital racehorse tracking and insights on Evolution Stables platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyStable | Evolution Stables',
    description:
      'This is your personal command center for managing ownership positions, tracking performance, and staying connected to your stable.',
    images: ['/images/Gemini_Generated_Image_r4hnnzr4hnnzr4hn.jpg'],
  },
};

export default function MyStableLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <style>{`
        body nav {
          display: none !important;
        }
        body {
          background: #eef1f4 !important;
        }
      `}</style>
      {children}
    </>
  );
}
