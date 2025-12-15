import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const publicPaths = [
  '/',
  '/auth',
  '/auth/callback',
  '/api/auth/callback',
  '/marketplace',
  '/privacy',
  '/terms',
  '/demo',
  '/valuation',
  '/mystable',
];

const isPublicPath = (pathname: string) =>
  publicPaths.some(path => {
    if (path === '/') {
      return pathname === '/';
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  });

const copyCookies = (from: NextResponse, to: NextResponse) => {
  from.cookies.getAll().forEach(cookie => {
    to.cookies.set(cookie);
  });
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn('Missing Supabase env vars in middleware.');
    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookies) {
        cookies.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPublicPath(request.nextUrl.pathname)) {
    const redirectTarget = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('redirectedFrom', redirectTarget);
    const redirectResponse = NextResponse.redirect(loginUrl);
    copyCookies(response, redirectResponse);
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
