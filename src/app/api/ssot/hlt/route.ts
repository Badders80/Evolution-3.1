import { NextResponse } from 'next/server';
import {
  createHltDraftRepository,
  isValidSsotHltDraft,
} from '@/lib/ssot/hlt-draft-repository';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const repository = createHltDraftRepository();
    const drafts = await repository.listDrafts();

    return NextResponse.json({
      ok: true,
      drafts,
      draftsDir: repository.locationLabel,
      count: drafts.length,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to load SSOT_HLT drafts.';
    return NextResponse.json(
      {
        ok: false,
        error: message,
        drafts: [],
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  let body: unknown = null;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: 'Invalid JSON body.',
      },
      { status: 400 },
    );
  }

  const draft = (body as { draft?: unknown } | null)?.draft;
  if (!isValidSsotHltDraft(draft)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Invalid SSOT_HLT draft payload.',
      },
      { status: 400 },
    );
  }

  try {
    const repository = createHltDraftRepository();
    const result = await repository.saveDraft(draft);

    return NextResponse.json({
      ok: true,
      draftId: result.draftId,
      filePath: result.filePath,
      record: result.record,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to save SSOT_HLT draft.';
    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
