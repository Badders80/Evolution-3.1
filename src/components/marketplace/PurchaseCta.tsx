"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { OfficialDocument } from "@/types/marketplace";

interface PurchaseCtaProps {
  listingSlug: string;
  tokenPrice: number;
  maxShares: number;
  officialDocuments: OfficialDocument[];
}

function getDocLabel(type: OfficialDocument["documentType"]): string {
  switch (type) {
    case "pds":
      return "Product Disclosure Statement (PDS)";
    case "syndicate_agreement":
      return "Syndicate Agreement";
    case "hlt_term_sheet":
      return "HLT Term Sheet";
    default:
      return type;
  }
}

export function PurchaseCta({
  listingSlug,
  tokenPrice,
  maxShares,
  officialDocuments,
}: PurchaseCtaProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tokenCount, setTokenCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Document acknowledgement state — map doc.id → boolean
  const [acknowledgements, setAcknowledgements] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    for (const doc of officialDocuments) {
      initial[doc.id] = false;
    }
    return initial;
  });

  const isAuthenticated = status === "authenticated";
  const isKycVerified = session?.user?.kyc_status === "verified";
  const totalCost = tokenCount * tokenPrice;

  const allAcknowledged =
    officialDocuments.length === 0 ||
    Object.values(acknowledgements).every(Boolean);

  const toggleAck = (docId: string) => {
    setAcknowledgements((prev) => ({ ...prev, [docId]: !prev[docId] }));
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      router.push(`/auth?redirectedFrom=/marketplace/${listingSlug}`);
      return;
    }

    if (!isKycVerified) {
      router.push("/mystable/verify");
      return;
    }

    if (!allAcknowledged) {
      setError("Please acknowledge all required documents before proceeding.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingSlug,
          tokenCount,
          documentAcknowledgements: Object.keys(acknowledgements).filter(
            (id) => acknowledgements[id],
          ),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === "KYC_REQUIRED") {
          router.push(data.redirectUrl || "/mystable/verify");
          return;
        }
        throw new Error(data.error || "Checkout failed");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Tier 1: Public — not signed in
  if (!isAuthenticated) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="text-sm font-medium text-white mb-2">
          Interested in this horse?
        </h3>
        <p className="text-sm text-white/60 mb-4">
          Sign in to view share availability and purchase.
        </p>
        <button
          onClick={() =>
            router.push(`/auth?redirectedFrom=/marketplace/${listingSlug}`)
          }
          className="inline-flex items-center justify-center rounded-lg bg-[#d4a964] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#c49a54]"
        >
          Sign Up to Purchase
        </button>
      </div>
    );
  }

  // Tier 2: Signed in but not KYC verified
  if (!isKycVerified) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
        <h3 className="text-sm font-medium text-amber-400 mb-2">
          KYC Verification Required
        </h3>
        <p className="text-sm text-white/60 mb-4">
          Complete identity verification to purchase shares. This is required by
          NZ financial regulations.
        </p>
        <button
          onClick={() => router.push("/mystable/verify")}
          className="inline-flex items-center justify-center rounded-lg bg-[#d4a964] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#c49a54]"
        >
          Get KYC Verified
        </button>
      </div>
    );
  }

  // Tier 3: Full access — KYC verified
  return (
    <div className="rounded-xl border border-[#d4a964]/30 bg-[#d4a964]/5 p-5">
      <h3 className="text-sm font-medium text-[#d4a964] mb-3">
        Purchase Shares
      </h3>

      <div className="mb-4">
        <label
          htmlFor="token-count"
          className="block text-xs text-white/40 mb-1"
        >
          Number of shares
        </label>
        <div className="flex items-center gap-3">
          <input
            id="token-count"
            type="number"
            min={1}
            max={maxShares}
            value={tokenCount}
            onChange={(e) =>
              setTokenCount(
                Math.max(1, Math.min(maxShares, parseInt(e.target.value) || 1)),
              )
            }
            className="w-24 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#d4a964]/40"
          />
          <span className="text-sm text-white/60">
            × ${tokenPrice.toLocaleString()} NZD
          </span>
        </div>
      </div>

      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-xs text-white/40">Total:</span>
        <span className="text-lg font-medium text-white">
          ${totalCost.toLocaleString()} NZD
        </span>
      </div>

      {/* Document Acknowledgement Checkboxes */}
      {officialDocuments.length > 0 && (
        <div className="mb-4 space-y-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <h4 className="text-xs font-medium text-white/50 uppercase tracking-[0.2em]">
            Required Documents
          </h4>
          <p className="text-xs text-white/40">
            Please read and acknowledge the following documents before
            proceeding:
          </p>
          {officialDocuments.map((doc) => (
            <label
              key={doc.id}
              className="flex items-start gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={acknowledgements[doc.id] || false}
                onChange={() => toggleAck(doc.id)}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-[#d4a964] focus:ring-[#d4a964]/40 cursor-pointer"
              />
              <span className="text-xs text-white/60 group-hover:text-white/80 transition leading-relaxed">
                I have read and agree to the{" "}
                <a
                  href={`/docs/${doc.fileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4a964] underline hover:text-[#c49a54] transition"
                  onClick={(e) => e.stopPropagation()}
                >
                  {getDocLabel(doc.documentType)}
                </a>
              </span>
            </label>
          ))}
        </div>
      )}

      <button
        onClick={handlePurchase}
        disabled={isLoading || tokenCount < 1 || !allAcknowledged}
        className="w-full inline-flex items-center justify-center rounded-lg bg-[#d4a964] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#c49a54] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading
          ? "Redirecting to Stripe..."
          : !allAcknowledged
            ? "Acknowledge Documents to Continue"
            : "Buy Shares"}
      </button>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
