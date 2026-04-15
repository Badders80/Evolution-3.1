import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions, hasGoogleAuth } from '@/lib/auth';

const handler = hasGoogleAuth ? NextAuth(authOptions) : null;

const handleMissingAuth = (request: NextRequest) => {
  if (request.nextUrl.pathname.endsWith("/session")) {
    return NextResponse.json({});
  }

  if (request.nextUrl.pathname.endsWith("/providers")) {
    return NextResponse.json({});
  }

  if (request.nextUrl.pathname.endsWith("/csrf")) {
    return NextResponse.json({});
  }

  if (request.nextUrl.pathname.endsWith("/_log")) {
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.json(
    { error: 'Google sign-in is currently disabled.' },
    { status: 501 }
  );
};

export const GET = handler ?? handleMissingAuth;
export const POST = handler ?? handleMissingAuth;
