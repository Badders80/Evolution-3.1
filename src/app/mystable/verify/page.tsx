"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FooterBar } from "@/components/site/Footer";

export default function VerificationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [diditUrl, setDiditUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kycStatus, setKycStatus] = useState<string>("none");

  // Redirect if already verified
  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.kyc_status === "verified"
    ) {
      router.push("/mystable");
    }
    if (session?.user?.kyc_status) {
      setKycStatus(session.user.kyc_status);
    }
  }, [session, status, router]);

  const startKyc = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/kyc/session", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to start verification");
      }
      setDiditUrl(data.url);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Poll for status updates while in progress
  useEffect(() => {
    if (kycStatus !== "pending" && kycStatus !== "in_progress") return;

    const interval = setInterval(async () => {
      const res = await fetch("/api/kyc/session/status");
      if (res.ok) {
        const data = await res.json();
        setKycStatus(data.status);
        if (data.status === "verified") {
          router.push("/mystable");
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [kycStatus, router]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-background pt-28 text-white md:pt-36">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4A964] mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-28 text-white md:pt-36">
      <div className="mx-auto max-w-2xl space-y-8 px-6 pb-24 md:px-10">
        <header>
          <p className="text-xs uppercase tracking-[0.28em] text-[#D4A964]">
            MyStable
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Identity Verification
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Identity verification is required before you can purchase shares.
            Complete the quick, secure process below to unlock full access.
          </p>
        </header>

        {/* Status Banner */}
        {kycStatus === "verified" ? (
          <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-green-400">
                  Verified
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Your identity has been verified. You can now purchase shares
                  and access all features.
                </p>
              </div>
            </div>
          </div>
        ) : kycStatus === "pending" || kycStatus === "in_progress" ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-amber-400">
                  Verification in Progress
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Your verification is being reviewed. This usually takes a few
                  minutes. We&apos;ll update your status automatically.
                </p>
              </div>
            </div>
          </div>
        ) : kycStatus === "rejected" ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-red-400">
                  Verification Failed
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Your verification could not be completed. Please try again or
                  contact support.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* CTA */}
        {!diditUrl &&
          kycStatus !== "verified" &&
          kycStatus !== "pending" &&
          kycStatus !== "in_progress" && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4A964]/10 text-[#D4A964]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white">
                    Start Verification
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    You&apos;ll need a valid government-issued ID. The process
                    takes about 2–3 minutes.
                  </p>
                  <button
                    onClick={startKyc}
                    disabled={isLoading}
                    className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#D4A964] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e0b779] disabled:opacity-60"
                  >
                    {isLoading ? "Starting..." : "Start Verification"}
                  </button>
                  {error && (
                    <p className="mt-3 text-sm text-red-400">{error}</p>
                  )}
                </div>
              </div>
            </div>
          )}

        {/* Didit iframe */}
        {diditUrl && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <iframe
                src={diditUrl}
                className="w-full h-[600px] rounded-xl border-0"
                allow="camera; microphone"
                title="Identity Verification"
              />
            </div>
            <p className="text-center text-sm text-white/40">
              Having trouble?{" "}
              <button
                onClick={() => window.open(diditUrl, "_blank")}
                className="text-[#D4A964] hover:underline"
              >
                Open in a new tab
              </button>
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/40">
            What to expect
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A964]" />
              <span>A quick, guided process to verify your identity</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A964]" />
              <span>Secure document upload with bank-level encryption</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A964]" />
              <span>
                Real-time verification status updates in your MyStable dashboard
              </span>
            </li>
          </ul>
        </div>
      </div>
      <FooterBar />
    </main>
  );
}
