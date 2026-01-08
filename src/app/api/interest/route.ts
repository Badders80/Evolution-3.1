import { NextResponse } from 'next/server';

const GOOGLE_SHEETS_WEB_APP_URL =
  process.env.GOOGLE_SHEETS_WEB_APP_URL ||
  'https://script.google.com/macros/s/AKfycbxjA6QWVzkqCqLrDN2QJ_vniL-UJy7RJtgn2ydLXJMw-_UGwJG2Sc9ys41UQYeW5J4/exec';

export async function POST(req: Request) {
  let body: any;

  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { email, campaignKey, source } = body ?? {};

  if (!email || !campaignKey) {
    return NextResponse.json(
      { error: 'Missing email or campaignKey' },
      { status: 400 }
    );
  }

  const upstreamResponse = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, campaignKey, source }),
  });

  let upstreamData: any = null;
  try {
    upstreamData = await upstreamResponse.json();
  } catch (err) {
    upstreamData = null;
  }

  if (!upstreamResponse.ok || upstreamData?.error) {
    const message =
      upstreamData?.error || 'Failed to submit interest to Google Sheets';
    return NextResponse.json({ error: message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
