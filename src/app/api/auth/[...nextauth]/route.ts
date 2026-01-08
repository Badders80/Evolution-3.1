import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

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

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
      }
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
