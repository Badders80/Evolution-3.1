import { NextResponse } from 'next/server';
import { loadSsotSeed } from '@/lib/ssot/seed-loader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const seed = await loadSsotSeed(true);
    return NextResponse.json({
      ok: true,
      seed,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to load SSOT seed data.';
    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
