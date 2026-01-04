import React from 'react';
import { clsx } from 'clsx';

interface MissionComboProps {
  children: React.ReactNode;
  className?: string;
}

export default function MissionCombo({ children, className }: MissionComboProps) {
  return (
    <div className={clsx('max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16', className)}>
      {children}
    </div>
  );
}