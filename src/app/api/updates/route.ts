import { NextResponse } from 'next/server';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

type UpdateItem = {
  slug: string;
  horseName: string;
  dateLabel: string;
  dateIso: string;
  url: string;
};

const MONTHS: Record<string, string> = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

const parseUpdateSlug = (slug: string): Omit<UpdateItem, 'url'> | null => {
  const match = slug.match(/^(.*)-Update-(\d{2})([A-Za-z]{3})(\d{4})$/);
  if (!match) return null;

  const horsePart = match[1];
  const day = match[2];
  const monthShort = match[3];
  const year = match[4];
  const month = MONTHS[monthShort];
  if (!month) return null;

  const horseName = horsePart.replace(/-/g, ' ').trim();
  const dateIso = `${year}-${month}-${day}`;
  const dateLabel = `${day} ${monthShort} ${year}`;

  return {
    slug,
    horseName,
    dateLabel,
    dateIso,
  };
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const updatesDir = path.join(process.cwd(), 'public', 'updates');
    const files = await readdir(updatesDir, { withFileTypes: true });

    const updates: UpdateItem[] = files
      .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
      .map((entry) => entry.name.replace(/\.html$/i, ''))
      .map((slug) => parseUpdateSlug(slug))
      .filter((value): value is Omit<UpdateItem, 'url'> => Boolean(value))
      .map((item) => ({
        ...item,
        url: `/updates/${item.slug}`,
      }))
      .sort((a, b) => b.dateIso.localeCompare(a.dateIso));

    return NextResponse.json({
      ok: true,
      updates,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to load updates.';
    return NextResponse.json(
      {
        ok: false,
        error: message,
        updates: [],
      },
      { status: 500 },
    );
  }
}
