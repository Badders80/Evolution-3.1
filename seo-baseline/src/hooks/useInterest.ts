'use client';

import { useState } from 'react';
import { submitInterest } from '@/services/interest/submitInterest';

export function useInterest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (email: string, campaignKey: string, source?: string) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await submitInterest({ email, campaignKey, source });
    } catch (err: any) {
      const message = err?.message ?? 'Unable to register interest';
      setError(message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, error };
}
