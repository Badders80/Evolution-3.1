import "server-only";

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }

  return value;
}

export const NEXT_PUBLIC_SUPABASE_URL = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
export const NEXT_PUBLIC_SUPABASE_ANON_KEY = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
export const SUPABASE_SERVICE_ROLE_KEY = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
