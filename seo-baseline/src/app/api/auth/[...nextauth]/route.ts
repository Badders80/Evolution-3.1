import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextRequest, NextResponse } from "next/server"

const GOOGLE_SHEETS_WEB_APP_URL =
  process.env.GOOGLE_SHEETS_WEB_APP_URL ||
  "https://script.google.com/macros/s/AKfycbxjA6QWVzkqCqLrDN2QJ_vniL-UJy7RJtgn2ydLXJMw-_UGwJG2Sc9ys41UQYeW5J4/exec"

async function trackAuthSignIn(params: {
  email?: string | null
  name?: string | null
  image?: string | null
  provider?: string | null
  providerAccountId?: string | null
}) {
  if (!params.email) return

  try {
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: params.email,
        campaignKey: `auth_${params.provider || "google"}`,
        source: "auth",
        name: params.name,
        image: params.image,
        provider: params.provider,
        providerAccountId: params.providerAccountId,
      }),
    })
  } catch (err) {
    // Avoid blocking sign-in if tracking fails.
  }
}

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const hasGoogleAuth = Boolean(googleClientId && googleClientSecret)

const authOptions: NextAuthOptions = {
  providers: hasGoogleAuth
    ? [
        GoogleProvider({
          clientId: googleClientId!,
          clientSecret: googleClientSecret!,
        }),
      ]
    : [],
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  callbacks: {
    async session({ session, token }) {
      return session
    },
  },
  events: {
    async signIn(message) {
      await trackAuthSignIn({
        email: message.user.email,
        name: message.user.name,
        image: message.user.image,
        provider: message.account?.provider,
        providerAccountId: message.account?.providerAccountId,
      })
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = hasGoogleAuth ? NextAuth(authOptions) : null

const handleMissingAuth = (request: NextRequest) => {
  if (request.nextUrl.pathname.endsWith("/session")) {
    return NextResponse.json(null)
  }

  return NextResponse.json(
    { error: "Auth provider not configured." },
    { status: 501 }
  )
}

export const GET = handler ?? handleMissingAuth
export const POST = handler ?? handleMissingAuth
