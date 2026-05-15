import Link from "next/link";
import { FooterBar } from "@/components/site/Footer";

export default function VerificationPage() {
  return (
    <main className="min-h-screen bg-background pt-28 text-mp-text-primary md:pt-36">
      <div className="mx-auto max-w-2xl space-y-8 px-6 pb-24 md:px-10">
        <header>
          <p className="text-xs uppercase tracking-mp-label text-mp-accent">
            MyStable
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Identity Verification
          </h1>
          <p className="mt-4 text-base leading-relaxed text-mp-text-secondary">
            Identity verification helps protect your account and ensures
            compliance with financial regulations. This feature will be powered
            by our verification partner and is coming soon.
          </p>
        </header>

        <div className="rounded-2xl border border-mp-border-prominent bg-mp-surface-card p-6">
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-mp-text-primary">
                Verification Coming Soon
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-mp-text-secondary">
                We are currently integrating our identity verification partner
                to provide a seamless, secure KYC experience. Once available,
                you will be able to complete verification directly from this
                page.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-mp-border-prominent bg-mp-surface-card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-mp-wide text-mp-text-tertiary">
            What to expect
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-mp-text-secondary">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mp-accent" />
              <span>A quick, guided process to verify your identity</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mp-accent" />
              <span>Secure document upload with bank-level encryption</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mp-accent" />
              <span>
                Real-time verification status updates in your MyStable dashboard
              </span>
            </li>
          </ul>
        </div>

        <Link
          href="/mystable"
          className="inline-flex items-center justify-center rounded-full bg-mp-accent px-5 py-3 text-sm font-semibold text-mp-text-inverse transition hover:bg-mp-accent-hover"
        >
          Return to MyStable
        </Link>
      </div>
      <FooterBar />
    </main>
  );
}
