'use client';

import { useState } from 'react';
import { submitInterest } from '@/services/interest/submitInterest';
import type { InterestPayload, InterestSubmissionResult } from '@/types/interest';

export function useInterest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (
    payload: InterestPayload,
  ): Promise<InterestSubmissionResult | undefined> => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      return await submitInterest(payload);
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
