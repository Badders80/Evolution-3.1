import { NextResponse } from 'next/server';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getGoogleSheetsWebAppUrl() {
  return process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim() || null;
}

export async function POST(req: Request) {
  const googleSheetsWebAppUrl = getGoogleSheetsWebAppUrl();
  if (!googleSheetsWebAppUrl) {
    return NextResponse.json(
      { error: 'Lead capture is not configured for this environment.' },
      { status: 503 }
    );
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { email, campaignKey, source } =
    body && typeof body === 'object' ? (body as Record<string, unknown>) : {};

  if (typeof email !== 'string' || typeof campaignKey !== 'string') {
    return NextResponse.json(
      { error: 'Missing email or campaignKey' },
      { status: 400 }
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const normalizedCampaignKey = campaignKey.trim();
  if (!normalizedCampaignKey) {
    return NextResponse.json({ error: 'Missing email or campaignKey' }, { status: 400 });
  }

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(googleSheetsWebAppUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: normalizedEmail,
        campaignKey: normalizedCampaignKey,
        source: typeof source === 'string' ? source.trim() || undefined : undefined,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: 'Lead capture service is currently unavailable' },
      { status: 502 }
    );
  }

  let upstreamData: unknown = null;
  try {
    upstreamData = await upstreamResponse.json();
  } catch {
    upstreamData = null;
  }

  const upstreamError =
    upstreamData && typeof upstreamData === 'object' && 'error' in upstreamData
      ? (upstreamData as { error?: string }).error
      : null;

  if (!upstreamResponse.ok || upstreamError) {
    const message =
      upstreamError || 'Failed to submit interest to Google Sheets';
    return NextResponse.json({ error: message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
