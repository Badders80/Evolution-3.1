import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      kyc_status: string;
      wallet_address: string | null;
    };
  }

  interface User {
    id?: string;
    role?: string;
    kyc_status?: string;
    wallet_address?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    kyc_status?: string;
    wallet_address?: string | null;
  }
}
