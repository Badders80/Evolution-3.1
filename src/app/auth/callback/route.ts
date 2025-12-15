import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const cookieStore = await cookies();
  const requestedRedirect =
    requestUrl.searchParams.get('redirectedFrom') ??
    cookieStore.get('auth_redirect_path')?.value ??
    '/mystable';
  const safeRedirectPath = requestedRedirect.startsWith('/') ? requestedRedirect : '/mystable';

  const response = NextResponse.redirect(new URL(safeRedirectPath, origin));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: any) =>
          response.cookies.set({ name, value, ...options }),
        remove: (name: string, options: any) =>
          response.cookies.set({ name, value: '', ...options }),
      },
    }
  );

  const code = requestUrl.searchParams.get('code');
  if (!code) {
    return NextResponse.redirect(`${origin}/?error=Missing+code`);
  }

  await supabase.auth.exchangeCodeForSession(code);
  response.cookies.delete('auth_redirect_path');

  return response;
}
