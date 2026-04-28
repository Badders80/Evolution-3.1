import { NextResponse } from "next/server";
import { manualSync } from "@/lib/ssot/sync";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as { sourcePath?: string };

    const results = await manualSync(body.sourcePath);

    if (results.errors > 0 && results.upserted === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Sync failed completely",
          details: results,
        },
        { status: 500 }
      );
    }

    // Revalidate cache
    // Note: revalidateTag available in Next.js 15+; adjust if using older API
    // revalidateTag("listings");
    // revalidateTag("marketplace");

    return NextResponse.json({
      success: true,
      upserted: results.upserted,
      errors: results.errors,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}