'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { LOGOS } from '@/lib/assets';
import { submitInterest } from '@/services/interest/submitInterest';

export function AuthClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleEmailSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setStatusMessage(null);
    try {
      await submitInterest({
        email,
        campaignKey: 'auth_email_signup',
        source: 'auth',
      });
      setStatusMessage('Thanks! You are on the list.');
      setEmail('');
      window.setTimeout(() => {
        router.push('/');
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Image
            src={LOGOS.simple.grey}
            alt="Evolution Stables"
            width={192}
            height={64}
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl font-light text-white mb-2">Join By Email</h1>
          <p className="text-white/60">
            Get launch updates, platform news, and early access announcements.
          </p>
        </div>

        <form onSubmit={handleEmailSignup} className="mt-6 space-y-3">
          <label className="sr-only" htmlFor="auth-email">
            Email address
          </label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 rounded-lg bg-white/90 hover:bg-white text-gray-900 font-medium py-3 px-4 transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg className="h-5 w-5 text-gray-900" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6.75C4 5.78 4.78 5 5.75 5h12.5C19.22 5 20 5.78 20 6.75v10.5c0 .97-.78 1.75-1.75 1.75H5.75A1.75 1.75 0 0 1 4 17.25V6.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M5 7l7 5 7-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {isSubmitting ? 'Submitting...' : statusMessage ?? 'Join with email'}
          </button>
        </form>

        <p className="text-center text-white/40 text-sm mt-6">
          By joining with email, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
