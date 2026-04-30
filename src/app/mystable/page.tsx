"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FooterBar } from "@/components/site/Footer";

interface Holding {
  id: string;
  horse_name: string;
  tokens_owned: number;
  percent_owned: number;
  status:
    | "reserved"
    | "paid"
    | "minted"
    | "transferred"
    | "burned"
    | "kyc_required";
  listing_slug: string;
  tx_hash: string | null;
  minted_at: string | null;
  created_at: string;
}

export default function MyStablePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [kycStatus, setKycStatus] = useState<string>("none");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth?redirectedFrom=/mystable");
      return;
    }

    if (session?.user?.kyc_status) {
      setKycStatus(session.user.kyc_status);
    }

    if (status === "authenticated") {
      fetchHoldings();
    }
  }, [session, status, router]);

  const fetchHoldings = async () => {
    try {
      const res = await fetch("/api/holdings");
      if (res.ok) {
        const data = await res.json();
        setHoldings(data.holdings || []);
      }
    } catch (err) {
      console.error("Failed to fetch holdings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const firstName =
    session?.user?.name?.split(" ")[0] ||
    session?.user?.email?.split("@")[0] ||
    "Owner";

  const totalInvested = holdings.reduce(
    (sum, h) => sum + h.tokens_owned * 1000,
    0,
  ); // placeholder price
  const activeStakes = holdings.filter(
    (h) => h.status === "minted" || h.status === "paid",
  ).length;

  if (status === "loading" || isLoading) {
    return (
      <main className="min-h-screen bg-background text-white pt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4A964] mx-auto mb-4" />
          <p className="text-white/60">Loading your stable...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-white pt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-12">
        {/* Header */}
        <header className="mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/40">
              Evolution Stables
            </p>
            <h1 className="mt-2 text-4xl font-medium tracking-tight md:text-5xl">
              MyStable
            </h1>
            <p className="mt-4 text-base text-white/60 max-w-2xl">
              Welcome, <span className="text-white/90">{firstName}</span>. This
              is your personal command center for managing ownership positions,
              tracking performance, and staying connected to your stable.
            </p>
          </div>
        </header>

        {/* KYC Status Banner */}
        {kycStatus !== "verified" && (
          <div
            className={`mb-8 rounded-xl border p-5 ${
              kycStatus === "pending" || kycStatus === "in_progress"
                ? "border-amber-500/30 bg-amber-500/5"
                : kycStatus === "rejected"
                  ? "border-red-500/30 bg-red-500/5"
                  : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className={`text-sm font-medium ${
                    kycStatus === "pending" || kycStatus === "in_progress"
                      ? "text-amber-400"
                      : kycStatus === "rejected"
                        ? "text-red-400"
                        : "text-white"
                  }`}
                >
                  {kycStatus === "pending" || kycStatus === "in_progress"
                    ? "Verification in Progress"
                    : kycStatus === "rejected"
                      ? "Verification Failed"
                      : "Identity Verification Required"}
                </h3>
                <p className="mt-1 text-sm text-white/60">
                  {kycStatus === "pending" || kycStatus === "in_progress"
                    ? "Your verification is being reviewed. This usually takes a few minutes."
                    : kycStatus === "rejected"
                      ? "Your verification could not be completed. Please try again."
                      : "Complete identity verification to purchase shares and unlock all features."}
                </p>
              </div>
              {kycStatus !== "pending" && kycStatus !== "in_progress" && (
                <button
                  onClick={() => router.push("/mystable/verify")}
                  className="shrink-0 inline-flex items-center justify-center rounded-lg bg-[#D4A964] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#c49a54]"
                >
                  Verify Now
                </button>
              )}
            </div>
          </div>
        )}

        {/* Main Grid: Left (Horses) + Right (Stats) */}
        <div className="relative isolate mt-2 overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0b]/70 px-6 py-10 shadow-[0_28px_120px_rgba(0,0,0,0.55)]">
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Left: My Horses */}
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-medium tracking-tight">
                  My Horses
                </h2>
                <p className="mt-1 text-sm text-white/50">
                  Your active ownership stakes
                </p>
              </div>

              {holdings.length === 0 ? (
                <div className="rounded-xl border border-white/5 bg-[#111111] p-8 text-center">
                  <p className="text-white/40 mb-2">No holdings yet</p>
                  <p className="text-sm text-white/30">
                    Browse the marketplace to purchase your first shares.
                  </p>
                  <a
                    href="/marketplace"
                    className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#D4A964] px-5 py-2 text-sm font-medium text-black transition hover:bg-[#c49a54]"
                  >
                    Browse Marketplace
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {holdings.map((holding) => (
                    <div
                      key={holding.id}
                      className="group relative rounded-xl border border-white/5 bg-[#111111] p-6 transition-all hover:border-white/10 hover:bg-[#151515]"
                    >
                      {/* Horse Name & Status */}
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium tracking-tight">
                            {holding.horse_name || "Unknown Horse"}
                          </h3>
                          <div className="mt-1 flex items-center gap-2">
                            <span
                              className={`inline-block rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                                holding.status === "minted"
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : holding.status === "paid"
                                    ? "bg-amber-500/10 text-amber-400"
                                    : holding.status === "kyc_required"
                                      ? "bg-red-500/10 text-red-400"
                                      : "bg-blue-500/10 text-blue-400"
                              }`}
                            >
                              {holding.status === "kyc_required"
                                ? "KYC REQ"
                                : holding.status}
                            </span>
                            <span className="text-xs text-white/40">
                              {holding.tokens_owned} shares
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-white">
                            {holding.percent_owned.toFixed(2)}%
                          </p>
                          <p className="text-xs text-white/40">ownership</p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-4 gap-4 border-t border-white/5 pt-4">
                        <div>
                          <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
                            Shares
                          </p>
                          <p className="text-sm font-medium">
                            {holding.tokens_owned}
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
                            Status
                          </p>
                          <p className="text-sm font-medium capitalize">
                            {holding.status === "kyc_required"
                              ? "KYC Required"
                              : holding.status}
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
                            Acquired
                          </p>
                          <p className="text-xs text-white/60">
                            {new Date(holding.created_at).toLocaleDateString(
                              "en-NZ",
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">
                            Action
                          </p>
                          {holding.status === "kyc_required" ? (
                            <button
                              onClick={() => router.push("/mystable/verify")}
                              className="text-xs text-[#D4A964] hover:underline"
                            >
                              Complete KYC →
                            </button>
                          ) : (
                            <a
                              href={`/marketplace/${holding.listing_slug}`}
                              className="text-xs text-[#D4A964] hover:underline"
                            >
                              View Listing →
                            </a>
                          )}
                        </div>
                      </div>

                      {holding.tx_hash && (
                        <div className="mt-3 pt-3 border-t border-white/5">
                          <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">
                            Transaction
                          </p>
                          <a
                            href={`https://sepolia.basescan.org/tx/${holding.tx_hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#D4A964] hover:underline break-all"
                          >
                            {holding.tx_hash.slice(0, 20)}...
                            {holding.tx_hash.slice(-8)}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Right: Stats Sidebar */}
            <aside className="flex flex-col gap-4">
              {/* Total Invested */}
              <div className="flex-1 rounded-xl border border-white/5 bg-[#111111] p-6 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">
                  Total Invested
                </p>
                <p className="text-3xl font-medium tracking-tight">
                  ${totalInvested.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-white/50">
                  across {holdings.length} holding
                  {holdings.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Active Stakes */}
              <div className="flex-1 rounded-xl border border-white/5 bg-[#111111] p-6 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">
                  Active Stakes
                </p>
                <p className="text-3xl font-medium tracking-tight">
                  {activeStakes}
                </p>
                <p className="mt-1 text-sm text-white/50">confirmed on-chain</p>
              </div>

              {/* KYC Status */}
              <div className="flex-1 rounded-xl border border-white/5 bg-[#111111] p-6 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">
                  KYC Status
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      kycStatus === "verified"
                        ? "bg-emerald-400"
                        : kycStatus === "pending" || kycStatus === "in_progress"
                          ? "bg-amber-400"
                          : kycStatus === "rejected"
                            ? "bg-red-400"
                            : "bg-white/20"
                    }`}
                  />
                  <p
                    className={`text-sm font-medium capitalize ${
                      kycStatus === "verified"
                        ? "text-emerald-400"
                        : kycStatus === "pending" || kycStatus === "in_progress"
                          ? "text-amber-400"
                          : kycStatus === "rejected"
                            ? "text-red-400"
                            : "text-white/60"
                    }`}
                  >
                    {kycStatus === "none" ? "Not Started" : kycStatus}
                  </p>
                </div>
                {kycStatus !== "verified" && (
                  <button
                    onClick={() => router.push("/mystable/verify")}
                    className="mt-3 text-xs text-[#D4A964] hover:underline text-left"
                  >
                    Complete verification →
                  </button>
                )}
              </div>

              {/* Quick Links */}
              <div className="flex-1 rounded-xl border border-white/5 bg-[#111111] p-6 flex flex-col justify-center">
                <p className="text-xs font-medium tracking-tight mb-3">
                  Quick Actions
                </p>
                <div className="space-y-2 text-sm">
                  <a
                    href="/marketplace"
                    className="block text-white/60 hover:text-white transition-colors"
                  >
                    View Marketplace →
                  </a>
                  <a
                    href="/mystable/verify"
                    className="block text-white/60 hover:text-white transition-colors"
                  >
                    Identity Verification →
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Information Hub Section */}
        <section className="mt-24">
          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.28em] text-white/40">
              Evolution Stables
            </p>
            <h2 className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">
              Information Hub
            </h2>
            <p className="mt-4 text-base text-white/60 max-w-2xl">
              Stay connected with the latest Evolution news, interviews, and
              race insights. Follow community updates and media coverage through
              the Information Hub.
            </p>
          </header>

          <div className="relative overflow-hidden rounded-3xl h-[400px] xl:h-[460px]">
            <Image
              src="/images/Gemini_Generated_Image_r4hnnzr4hnnzr4hn.jpg"
              alt="Digital racehorse tracking and insights on Evolution Stables platform"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-medium tracking-tight text-white mb-2">
                  Latest Insights
                </h3>
                <p className="text-base text-white/70">
                  Curated coverage of races, partnerships, and trends.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="mt-24">
        <FooterBar />
      </div>
    </main>
  );
}
