import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check your email | Evolution Stables",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#D4A964]/10 text-[#D4A964]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-white mb-3">
          Check your email
        </h1>
        <p className="text-white/60 mb-6">
          A sign in link has been sent to your email address. Click the link in
          the email to securely access your account.
        </p>
        <p className="text-sm text-white/40">
          Didn&apos;t receive it? Check your spam folder or try again.
        </p>
        <a
          href="/auth"
          className="mt-8 inline-block text-sm text-[#D4A964] hover:text-[#e0b779] transition"
        >
          ← Back to sign in
        </a>
      </div>
    </div>
  );
}
