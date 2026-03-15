'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { NavBar } from '@/components/NavBar';

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const isMyStable = pathname.startsWith('/mystable');

  return (
    <>
      {!isMyStable ? <NavBar /> : null}
      <div className="min-h-screen flex flex-col">{children}</div>
    </>
  );
}
