import type { VerificationStatus } from '@/types/verification';

export type VerificationCheckResult = {
  canProceed: boolean;
  status: VerificationStatus;
  message: string;
};

/**
 * Returns the current verification status for a user.
 * Placeholder: always returns 'not_started'.
 * Will be connected to Sumsub SDK in a future release.
 */
export function getVerificationStatus(_userId: string): VerificationStatus {
  return 'not_started';
}

/**
 * Creates a Sumsub verification session for a user.
 * Placeholder: returns a mock URL.
 * Will be connected to Sumsub SDK in a future release.
 */
export function createVerificationSession(_userId: string): {
  url: string;
  externalId: string;
} {
  return {
    url: '#verification-placeholder',
    externalId: 'placeholder-session',
  };
}

/**
 * Checks whether a user is eligible to start verification.
 * Placeholder: always allows.
 * Will be connected to Sumsub SDK in a future release.
 */
export function checkVerificationEligibility(
  _userId: string,
): VerificationCheckResult {
  return {
    canProceed: true,
    status: 'not_started',
    message:
      'Verification placeholder — not yet connected to Sumsub.',
  };
}