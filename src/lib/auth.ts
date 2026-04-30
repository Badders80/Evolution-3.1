import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import { getUserByEmail, createUser } from "@/lib/db/queries/users";

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

  if (
    !googleSheetsWebAppUrl ||
    !normalizedEmail ||
    !EMAIL_PATTERN.test(normalizedEmail)
  ) {
    return;
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
    });
  } catch {
    // Avoid blocking sign-in if tracking fails.
  }
}

export const googleClientId = process.env.GOOGLE_CLIENT_ID;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const isGoogleAuthEnabled = process.env.ENABLE_GOOGLE_AUTH === "true";
export const hasGoogleAuth =
  isGoogleAuthEnabled && Boolean(googleClientId && googleClientSecret);

export const isEmailAuthEnabled = process.env.ENABLE_EMAIL_AUTH !== "false"; // default on

export function getMarketplaceOperatorAllowlist(): string[] {
  const raw = process.env.MARKETPLACE_OPERATOR_ALLOWLIST?.trim() || "";
  if (!raw) return [];
  return Array.from(
    new Set(
      raw
        .split(",")
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

export function isMarketplaceFounderInboxEnabled(): boolean {
  return process.env.MARKETPLACE_FOUNDER_INBOX_ENABLED === "true";
}

export function hasMarketplaceOperatorAccess(email?: string | null): boolean {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail) return false;
  return getMarketplaceOperatorAllowlist().includes(normalizedEmail);
}

/**
 * Custom sendVerificationRequest using Resend SMTP.
 * NextAuth EmailProvider calls this to send magic links.
 */
async function sendVerificationRequest({
  identifier: email,
  url,
  provider,
}: {
  identifier: string;
  url: string;
  provider: { server: string; from: string };
}) {
  const { server, from } = provider;
  const transport = createTransport(server);
  await transport.sendMail({
    to: email,
    from,
    subject: "Sign in to Evolution Stables",
    text: `Sign in to Evolution Stables\n\n${url}\n\n`,
    html: `<body style="background:#0b0b0b;padding:40px 0;font-family:system-ui,Segoe UI,Roboto,sans-serif;color:#fff;">
      <table align="center" width="100%" style="max-width:520px;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;">
        <tr><td style="padding:32px 32px 24px;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#D4A964;">Evolution Stables</p>
          <h1 style="margin:0 0 12px;font-size:22px;font-weight:600;color:#fff;">Sign in to your account</h1>
          <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#aaa;">Click the button below to securely sign in. This link expires in 24 hours and can only be used once.</p>
          <a href="${url}" style="display:inline-block;padding:12px 24px;background:#D4A964;color:#000;text-decoration:none;border-radius:10px;font-weight:600;font-size:14px;">Sign in to Evolution Stables</a>
          <p style="margin:24px 0 0;font-size:12px;color:#666;">Or copy and paste this URL into your browser:<br/><span style="color:#888;word-break:break-all;">${url}</span></p>
        </td></tr>
        <tr><td style="padding:16px 32px;background:#0a0a0a;border-top:1px solid #1a1a1a;font-size:12px;color:#555;">
          If you did not request this email, you can safely ignore it.
        </td></tr>
      </table>
    </body>`,
  });
}

function buildProviders() {
  const providers: NextAuthOptions["providers"] = [];

  if (hasGoogleAuth) {
    providers.push(
      GoogleProvider({
        clientId: googleClientId!,
        clientSecret: googleClientSecret!,
      }),
    );
  }

  if (isEmailAuthEnabled) {
    providers.push(
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST || "smtp.resend.com",
          port: Number(process.env.EMAIL_SERVER_PORT || 587),
          auth: {
            user: process.env.EMAIL_SERVER_USER || "resend",
            pass: process.env.RESEND_API_KEY || "",
          },
          secure: false,
          tls: {
            rejectUnauthorized: true,
          },
        },
        from:
          process.env.EMAIL_FROM ||
          "Evolution Stables <noreply@evolutionstables.nz>",
        sendVerificationRequest,
      }),
    );
  }

  return providers;
}

export const authOptions: NextAuthOptions = {
  providers: buildProviders(),
  pages: {
    signIn: "/auth",
    error: "/auth",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign-in: persist DB user fields into the JWT
      if (user?.email) {
        const dbUser = getUserByEmail(user.email);
        if (dbUser) {
          token.sub = dbUser.id;
          token.role = dbUser.role;
          token.kyc_status = dbUser.kyc_status;
          token.wallet_address = dbUser.wallet_address;
        } else if (account) {
          // Auto-provision on first OAuth sign-in
          const newUser = createUser({
            id: `usr_${Date.now()}`,
            email: user.email,
            name: user.name || user.email.split("@")[0],
            image: user.image || null,
            role: "user",
            kyc_status: "none",
            kyc_verified_at: null,
            wallet_address: null,
            openfort_user_id: null,
          });
          token.sub = newUser.id;
          token.role = newUser.role;
          token.kyc_status = newUser.kyc_status;
          token.wallet_address = newUser.wallet_address;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub as string;
        session.user.role = (token.role as string) || "user";
        session.user.kyc_status = (token.kyc_status as string) || "none";
        session.user.wallet_address = (token.wallet_address as string) || null;
      }
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

export function isAdminRequest(request: Request): boolean {
  const token =
    request.headers.get("x-admin-token") ||
    request.headers.get("authorization")?.replace("Bearer ", "") ||
    new URL(request.url).searchParams.get("admin_token");

  return token === process.env.ADMIN_SECRET_KEY;
}

export function requireAdmin(request: Request): void {
  if (!isAdminRequest(request)) {
    throw new Error("Unauthorized");
  }
}
