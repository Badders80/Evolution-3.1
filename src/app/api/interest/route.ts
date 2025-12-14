import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { InterestPayload } from "@/lib/interest"

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as InterestPayload

    if (!body.email || !body.campaignKey) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from("interest_signups")
      .insert({
        email: body.email.toLowerCase().trim(),
        campaign_key: body.campaignKey,
        source: body.source ?? null,
      })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Unable to register interest" },
      { status: 500 }
    )
  }
}
