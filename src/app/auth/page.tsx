import { Metadata } from 'next';
import { AuthClient } from './AuthClient';

export const metadata: Metadata = {
  title: 'Authentication | Evolution Stables',
  alternates: {
    canonical: '/auth',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AuthPage() {
  return <AuthClient />;
}
