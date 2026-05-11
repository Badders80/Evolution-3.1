"use client";

import { FormEvent, useMemo, useState } from "react";
import { useInterest } from "@/hooks/useInterest";
import { formatNzd, formatPercent } from "@/lib/marketplace";
import type { MarketplaceListing } from "@/types/marketplace";
import type { InterestSubmissionResult } from "@/types/interest";

type StakeApplicationFormProps = {
  listing: MarketplaceListing;
};

function clampToStep(value: number, step: number, max: number) {
  const rounded = Math.max(step, Math.round(value / step) * step);
  return Math.min(max, Number(rounded.toFixed(2)));
}

export function StakeApplicationForm({ listing }: StakeApplicationFormProps) {
  const minimumStakePercent = listing.application.minimumStakePercent;
  const maximumStakePercent = listing.application.maximumStakePercent;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requestedStakePercent, setRequestedStakePercent] = useState(
    listing.application.defaultRequestedStakePercent,
  );
  const [notes, setNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<InterestSubmissionResult | null>(null);
  const { submit, isSubmitting, error } = useInterest();

  const calculatedUnits = useMemo(
    () =>
      Math.max(
        1,
        Math.round(
          requestedStakePercent / (listing.offering.stakeUnitPercent ?? 1),
        ),
      ),
    [listing.offering.stakeUnitPercent, requestedStakePercent],
  );
  const reservationAmountNzd = useMemo(
    () =>
      Number(
        (calculatedUnits * (listing.offering.tokenPriceNzd ?? 0)).toFixed(2),
      ),
    [calculatedUnits, listing.offering.tokenPriceNzd],
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (isSubmitting || !agreed) {
      return;
    }

    try {
      const result = await submit({
        email: email.trim(),
        campaignKey: listing.application.campaignKey,
        source: listing.application.sourcePath,
        fullName: fullName.trim(),
        phone: phone.trim(),
        horseId: listing.horse.id,
        horseName: listing.horse.name,
        leaseId: listing.offering.leaseId,
        listingSlug: listing.slug,
        submissionType: "application_reservation",
        applicationStatus: listing.application.defaultStatus,
        requestedStakePercent,
        requestedUnits: calculatedUnits,
        reservationAmountNzd,
        notes: notes.trim(),
      });
      setSubmissionResult(result ?? null);
      setSubmitted(true);
    } catch {
      // handled by hook state
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-sm text-emerald-100">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
          Submitted
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Application received
        </h3>
        <p className="mt-3 leading-relaxed text-white/70">
          Your request for {formatPercent(requestedStakePercent)} in{" "}
          {listing.horse.name} has been logged for manual review. Evolution
          Stables will confirm next steps directly before any allocation, KYC,
          or payment process continues.
        </p>
        <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 sm:grid-cols-2">
          <p>
            <span className="block text-xs uppercase tracking-[0.24em] text-white/40">
              Requested Stake
            </span>
            <span className="mt-1 block font-semibold text-white">
              {formatPercent(requestedStakePercent)}
            </span>
          </p>
          <p>
            <span className="block text-xs uppercase tracking-[0.24em] text-white/40">
              Reservation Summary
            </span>
            <span className="mt-1 block font-semibold text-white">
              {formatNzd(reservationAmountNzd)}
            </span>
          </p>
        </div>
        {submissionResult?.submissionReference ? (
          <p className="mt-4 text-sm text-white/75">
            Reference:{" "}
            <span className="font-semibold text-white">
              {submissionResult.submissionReference}
            </span>
          </p>
        ) : null}
        {submissionResult?.warning ? (
          <p className="mt-3 text-sm text-amber-200">
            {submissionResult.warning}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
          Apply / Reserve
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Request an Ownership Stake
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          This flow submits a manual application and reservation request only.
          Evolution Stables will review your request before any KYC or payment
          step proceeds.
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
            step={listing.offering.stakeUnitPercent ?? 1}
            value={requestedStakePercent}
            onChange={(event) =>
              setRequestedStakePercent(
                clampToStep(
                  Number(event.target.value || minimumStakePercent),
                  listing.offering.stakeUnitPercent ?? 1,
                  maximumStakePercent,
                ),
              )
            }
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#D4A964]"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
          Reservation Summary
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <p>
            <span className="block text-xs text-white/40">Stake units</span>
            <span className="mt-1 block font-semibold text-white">
              {calculatedUnits}
            </span>
          </p>
          <p>
            <span className="block text-xs text-white/40">
              Stake percentage
            </span>
            <span className="mt-1 block font-semibold text-white">
              {formatPercent(requestedStakePercent)}
            </span>
          </p>
          <p>
            <span className="block text-xs text-white/40">
              Indicative reservation
            </span>
            <span className="mt-1 block font-semibold text-white">
              {formatNzd(reservationAmountNzd)}
            </span>
          </p>
        </div>
      </div>

      <label className="space-y-2 text-sm text-white/80">
        <span>Notes</span>
        <textarea
          rows={4}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Share any context that helps with manual follow-up."
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[#D4A964]"
        />
      </label>

      <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className="mt-1"
        />
        <span>
          I understand this is a manual application and reservation request
          only, and that no Ownership Stake is allocated until Evolution Stables
          confirms the next step.
        </span>
      </label>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting || !agreed}
        className="inline-flex items-center justify-center rounded-full bg-[#D4A964] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#e0b779] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting…" : "Reserve Your Stake"}
      </button>
    </form>
  );
}
