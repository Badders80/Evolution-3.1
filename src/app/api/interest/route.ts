import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

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

  const supabase = createServerSupabaseClient();

  const { error } = await supabase.from('interest_signups').insert({
    email,
    campaign_key: campaignKey,
    source,
  });

  if (error) {
    if ((error as any)?.code === '23505') {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
