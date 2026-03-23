import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextRequest, NextResponse } from "next/server"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getGoogleSheetsWebAppUrl() {
  return process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim() || null
}

async function trackAuthSignIn(params: {
  email?: string | null
  name?: string | null
  image?: string | null
  provider?: string | null
  providerAccountId?: string | null
}) {
  const googleSheetsWebAppUrl = getGoogleSheetsWebAppUrl()
  const normalizedEmail = params.email?.trim().toLowerCase()

  if (!googleSheetsWebAppUrl || !normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
    return
  }

  try {
    await fetch(googleSheetsWebAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: normalizedEmail,
        campaignKey: `auth_${params.provider || "google"}`,
        source: "auth",
        name: params.name,
        image: params.image,
        provider: params.provider,
        providerAccountId: params.providerAccountId,
      }),
    })
  } catch {
    // Avoid blocking sign-in if tracking fails.
  }
}

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const isGoogleAuthEnabled = process.env.ENABLE_GOOGLE_AUTH === "true"
const hasGoogleAuth = isGoogleAuthEnabled && Boolean(googleClientId && googleClientSecret)

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

  if (request.nextUrl.pathname.endsWith("/providers")) {
    return NextResponse.json({})
  }

  return NextResponse.json(
    { error: "Google sign-in is currently disabled." },
    { status: 501 }
  )
}

export const GET = handler ?? handleMissingAuth
export const POST = handler ?? handleMissingAuth
