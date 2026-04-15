export type VerificationStatus = 'not_started' | 'in_progress' | 'verified' | 'failed' | 'expired';

export type VerificationRecord = {
  id: string;
  userId: string;
  status: VerificationStatus;
  provider: 'sumsub';
  externalId: string | null;
  startedAt: string | null;
  completedAt: string | null;
  failureReason: string | null;
};

/** Sumsub is placeholder-only — types and stubs, no real SDK */
export type SumsubConfig = {
  appToken: string;
  apiHost: string;
};