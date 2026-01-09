'use client';

import type { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { OnceUIProvider } from '@/providers/once-ui-provider';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
      <OnceUIProvider>{children}</OnceUIProvider>
    </SessionProvider>
  );
}
