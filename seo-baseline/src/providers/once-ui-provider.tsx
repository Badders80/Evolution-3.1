'use client';
import type { ReactNode } from 'react';

interface OnceUIProviderProps {
  children: ReactNode;
}

export function OnceUIProvider({ children }: OnceUIProviderProps) {
  // Minimal provider - no heavy OnceUI system needed
  return <>{children}</>;
}
