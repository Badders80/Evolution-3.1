'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useCallback } from 'react';
import { FaGoogle } from 'react-icons/fa';

export default function GoogleSignInButton() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleGoogleSignIn = useCallback(async () => {
    const redirectTo = new URL('/auth/callback', window.location.origin);
    const basePath =
      window.location.pathname.startsWith('/auth')
        ? '/mystable'
        : window.location.pathname || '/mystable';
    const redirectTarget = `${basePath}${window.location.search ?? ''}`;
    redirectTo.searchParams.set('redirectedFrom', redirectTarget);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo.toString(),
      },
    });

    if (error) {
      console.error('Google sign-in error:', error.message);
      alert(`Sign in failed: ${error.message}`);
    }
  }, [supabase]);

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-gray-800 shadow-md transition-colors hover:bg-gray-100"
    >
      <FaGoogle className="text-blue-500" />
      Continue with Google
    </button>
  );
}
