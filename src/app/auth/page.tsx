import type { Metadata } from 'next';
import { AuthClient } from './AuthClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Welcome Back | Evolution Stables',
  description: 'Sign in to manage your stable, positions, and updates.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/auth',
  },
  openGraph: {
    title: 'Welcome Back | Evolution Stables',
    description: 'Sign in to manage your stable, positions, and updates.',
    url: '/auth',
    images: [
      {
        url: '/images/Logo-Gold.png',
        width: 1200,
        height: 630,
        alt: 'Evolution Stables',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welcome Back | Evolution Stables',
    description: 'Sign in to manage your stable, positions, and updates.',
    images: ['/images/Logo-Gold.png'],
  },
};

export default function AuthPage() {
  return <AuthClient />;
}
