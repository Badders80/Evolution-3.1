'use client';

import type { ReactNode } from 'react';
import {
  LayoutProvider,
  ThemeProvider,
  ToastProvider,
} from '@once-ui-system/core/contexts';

interface OnceUIProviderProps {
  children: ReactNode;
}

export function OnceUIProvider({ children }: OnceUIProviderProps) {
  return (
    <ThemeProvider
      theme="dark"
      neutral="gray"
      brand="yellow"
      accent="indigo"
      solid="contrast"
      surface="filled"
      transition="all"
      scaling="100"
    >
      <LayoutProvider>
        <ToastProvider>{children}</ToastProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
}
