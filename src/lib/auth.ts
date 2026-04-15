import { getServerSession, type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getGoogleSheetsWebAppUrl() {
  return process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim() || null;
}

export async function trackAuthSignIn(params: {
  email?: string | null;
  name?: string | null;
  image?: string | null;
  provider?: string | null;
  providerAccountId?: string | null;
}) {
  const googleSheetsWebAppUrl = getGoogleSheetsWebAppUrl();
  const normalizedEmail = params.email?.trim().toLowerCase();

  if (!googleSheetsWebAppUrl || !normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
    return;
  }

  try {
    await fetch(googleSheetsWebAppUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: normalizedEmail,
        campaignKey: `auth_${params.provider || 'google'}`,
        source: 'auth',
        name: params.name,
        image: params.image,
        provider: params.provider,
        providerAccountId: params.providerAccountId,
      }),
    });
  } catch {
    // Avoid blocking sign-in if tracking fails.
  }
}

export const googleClientId = process.env.GOOGLE_CLIENT_ID;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const isGoogleAuthEnabled = process.env.ENABLE_GOOGLE_AUTH === 'true';
export const hasGoogleAuth =
  isGoogleAuthEnabled && Boolean(googleClientId && googleClientSecret);

export function getMarketplaceOperatorAllowlist(): string[] {
  const raw = process.env.MARKETPLACE_OPERATOR_ALLOWLIST?.trim() || '';
  if (!raw) return [];
  return Array.from(
    new Set(
      raw
        .split(',')
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

export function isMarketplaceFounderInboxEnabled(): boolean {
  return process.env.MARKETPLACE_FOUNDER_INBOX_ENABLED === 'true';
}

export function hasMarketplaceOperatorAccess(email?: string | null): boolean {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail) return false;
  return getMarketplaceOperatorAllowlist().includes(normalizedEmail);
}

export const authOptions: NextAuthOptions = {
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
    async session({ session }) {
      return session;
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
      });
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getOperatorSession() {
  if (!hasGoogleAuth) return null;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  if (!hasMarketplaceOperatorAccess(session.user.email)) return null;
  return session;
}
