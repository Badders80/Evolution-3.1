import { Metadata } from 'next';
import { HomeClient } from '@/components/pages/HomeClient';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomeClient />;
}
