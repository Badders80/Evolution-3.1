import type { Metadata } from 'next';
import { AuthClient } from './AuthClient';

export const metadata: Metadata = {
  title: 'Join By Email | Evolution Stables',
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
