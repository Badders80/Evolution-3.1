import type { InterestPayload } from '@/types/interest';

export async function submitInterest(payload: InterestPayload) {
  const res = await fetch('/api/interest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to submit interest');
  }

  return res.json();
}
