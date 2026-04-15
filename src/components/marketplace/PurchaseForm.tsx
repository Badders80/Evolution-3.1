'use client';

import { FormEvent, useMemo, useState } from 'react';
import { formatNzd, formatPercent } from '@/lib/marketplace';
import {
  REQUIRED_DOCUMENT_TYPES,
  DOCUMENT_TYPE_LABELS,
  getOfficialDocumentsForListing,
} from '@/lib/marketplace-documents';
import type { MarketplaceListing } from '@/types/marketplace';
import type { StripeCheckoutResult } from '@/types/stripe';

type PurchaseFormProps = {
  listing: MarketplaceListing;
};

function clampToStep(value: number, step: number, max: number) {
  const rounded = Math.max(step, Math.round(value / step) * step);
  return Math.min(max, Number(rounded.toFixed(2)));
}

export function PurchaseForm({ listing }: PurchaseFormProps) {
  const officialDocuments = getOfficialDocumentsForListing(listing);

  const minimumStakePercent = listing.application.minimumStakePercent;
  const maximumStakePercent = listing.application.maximumStakePercent;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requestedStakePercent, setRequestedStakePercent] = useState(
    listing.application.defaultRequestedStakePercent,
  );
  const [notes, setNotes] = useState('');
  const [documentAcknowledgements, setDocumentAcknowledgements] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    for (const docType of REQUIRED_DOCUMENT_TYPES) {
      initial[docType] = false;
    }
    return initial;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allDocumentsAcknowledged = REQUIRED_DOCUMENT_TYPES.every(
    (type) => documentAcknowledgements[type],
  );

  const calculatedUnits = useMemo(
    () =>
      Math.max(
        1,
        Math.round(requestedStakePercent / listing.offering.stakeUnitPercent),
      ),
    [listing.offering.stakeUnitPercent, requestedStakePercent],
  );
  const reservationAmountNzd = useMemo(
    () => Number((calculatedUnits * listing.offering.tokenPriceNzd).toFixed(2)),
    [calculatedUnits, listing.offering.tokenPriceNzd],
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (isSubmitting || !allDocumentsAcknowledged) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingSlug: listing.slug,
          requestedStakePercent,
          requestedUnits: calculatedUnits,
          reservationAmountNzd,
          customerEmail: email.trim(),
          customerName: fullName.trim(),
          phone: phone.trim() || undefined,
          notes: notes.trim() || undefined,
          documentAcknowledgements: REQUIRED_DOCUMENT_TYPES.reduce(
            (acc, type) => {
              acc[type] = documentAcknowledgements[type];
              return acc;
            },
            {} as Record<string, boolean>,
          ),
        }),
      });

      const data: StripeCheckoutResult = await response.json();

      if (!data.ok) {
        setError(data.error || 'Unable to start checkout. Please try again.');
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch {
      setError('Unable to connect to the payment service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  function getDocumentLink(docType: string): string {
    const doc = officialDocuments.find((d) => d.documentType === docType);
    return doc?.filePath ?? '#';
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-[#D4A964]/30 bg-white/[0.03] p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4A964]">
          Reserve Your Stake
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Purchase an Ownership Stake
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          Complete the form below to reserve your stake in {listing.horse.name}. You will be directed to our secure payment page to confirm your reservation.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-white/80">
          <span>Full name</span>
          <input
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#D4A964]"
          />
        </label>
        <label className="space-y-2 text-sm text-white/80">
          <span>Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#D4A964]"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-white/80">
          <span>Phone</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#D4A964]"
          />
        </label>
        <label className="space-y-2 text-sm text-white/80">
          <span>Requested Stake</span>
          <input
            required
            type="number"
            min={minimumStakePercent}
            max={maximumStakePercent}
            step={listing.offering.stakeUnitPercent}
            value={requestedStakePercent}
            onChange={(event) =>
              setRequestedStakePercent(
                clampToStep(
                  Number(event.target.value || minimumStakePercent),
                  listing.offering.stakeUnitPercent,
                  maximumStakePercent,
                ),
              )
            }
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#D4A964]"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">Reservation Summary</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <p>
            <span className="block text-xs text-white/40">Stake units</span>
            <span className="mt-1 block font-semibold text-white">{calculatedUnits}</span>
          </p>
          <p>
            <span className="block text-xs text-white/40">Stake percentage</span>
            <span className="mt-1 block font-semibold text-white">{formatPercent(requestedStakePercent)}</span>
          </p>
          <p>
            <span className="block text-xs text-white/40">Indicative reservation</span>
            <span className="mt-1 block font-semibold text-white">{formatNzd(reservationAmountNzd)}</span>
          </p>
        </div>
      </div>

      <label className="space-y-2 text-sm text-white/80">
        <span>Notes</span>
        <textarea
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Any additional context for your reservation."
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#D4A964]"
        />
      </label>

      {/* Document acknowledgement checkboxes */}
      <div className="space-y-3 rounded-2xl border border-[#D4A964]/20 bg-[#D4A964]/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4A964]">
          Required Acknowledgements
        </p>
        {REQUIRED_DOCUMENT_TYPES.map((docType) => (
          <label
            key={docType}
            className="flex items-start gap-3 text-sm text-white/70"
          >
            <input
              type="checkbox"
              checked={documentAcknowledgements[docType]}
              onChange={(event) =>
                setDocumentAcknowledgements((prev) => ({
                  ...prev,
                  [docType]: event.target.checked,
                }))
              }
              className="mt-1"
            />
            <span>
              I have read and understood the{' '}
              <a
                href={getDocumentLink(docType)}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#D4A964] underline underline-offset-2 transition hover:text-[#e0b779]"
              >
                {DOCUMENT_TYPE_LABELS[docType]}
              </a>
            </span>
          </label>
        ))}
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting || !allDocumentsAcknowledged}
        className="inline-flex items-center justify-center rounded-full bg-[#D4A964] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#e0b779] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Redirecting to payment…' : 'Reserve Your Stake'}
      </button>
    </form>
  );
}