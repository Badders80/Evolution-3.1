'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { LOGOS } from '@/lib/assets';
import { submitInterest } from '@/services/interest/submitInterest';

export function AuthClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams.get('redirectedFrom') || '/';
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: redirectTo });
  };

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
        router.push(redirectTo);
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
          <h1 className="text-3xl font-light text-white mb-2">Welcome Back</h1>
          <p className="text-white/60">Sign in to manage your stable, positions, and updates.</p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>

        <div className="mt-6 flex items-center gap-3 text-white/30 text-xs uppercase tracking-[0.2em]">
          <span className="h-px flex-1 bg-white/10" />
          <span>Or</span>
          <span className="h-px flex-1 bg-white/10" />
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
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
