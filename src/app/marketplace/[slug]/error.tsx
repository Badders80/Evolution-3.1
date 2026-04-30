"use client";

import { useEffect } from "react";

/**
 * Marketplace Listing Error Boundary
 *
 * Catches errors in the listing page and displays a user-friendly fallback.
 * Logs to console for monitoring; could be extended to Sentry.
 */
export default function ListingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Listing page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background text-white pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-12 text-center">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] mx-auto">
            <svg
              className="h-8 w-8 text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-light tracking-tight">
            Something went wrong
          </h1>
          <p className="text-white/60">
            We couldn&apos;t load this listing. Please try again or return to
            the marketplace.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={reset}
              className="rounded-full bg-white/[0.08] px-6 py-2.5 text-sm font-medium uppercase tracking-[0.2em] text-white/80 transition-all hover:bg-white/[0.12] hover:text-white"
            >
              Try Again
            </button>
            <a
              href="/marketplace"
              className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-medium uppercase tracking-[0.2em] text-white/60 transition-all hover:border-white/20 hover:text-white/80"
            >
              Marketplace
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
