import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const cookieStore = await cookies();
  const cookieRedirect = cookieStore.get('auth_redirect_path')?.value;

  const decodeRedirect = (value: string | undefined) => {
    if (!value) return undefined;
    try {
      return decodeURIComponent(value);
    } catch (error) {
      console.warn('Failed to decode auth_redirect_path cookie', error);
      return undefined;
    }
  };

  const isValidRedirect = (value: string | null | undefined) =>
    typeof value === 'string' && value.startsWith('/') && !value.startsWith('//');

  const requestedRedirect =
    requestUrl.searchParams.get('redirectedFrom') ??
    decodeRedirect(cookieRedirect) ??
    '/mystable';

  const safeRedirectPath = isValidRedirect(requestedRedirect) ? requestedRedirect : '/mystable';

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
