import { NextResponse } from 'next/server';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

type MediaItem = {
  name: string;
  url: string;
  sizeBytes: number;
  modifiedAt: string;
};

const VIDEO_EXT = /\.(mp4|mov|m4v|webm|avi)$/i;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const mediaDir = path.join(process.cwd(), 'public', 'videos', 'prudentia');
    const files = await readdir(mediaDir, { withFileTypes: true });

    const mediaItems = await Promise.all(
      files
        .filter((entry) => entry.isFile() && VIDEO_EXT.test(entry.name))
        .map(async (entry) => {
          const fullPath = path.join(mediaDir, entry.name);
          const fileStat = await stat(fullPath);
          const item: MediaItem = {
            name: entry.name,
            url: `/videos/prudentia/${entry.name}`,
            sizeBytes: fileStat.size,
            modifiedAt: fileStat.mtime.toISOString(),
          };
          return item;
        }),
    );

    mediaItems.sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));

    return NextResponse.json({
      ok: true,
      media: mediaItems,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to load Prudentia media.';
    return NextResponse.json(
      {
        ok: false,
        error: message,
        media: [],
      },
      { status: 500 },
    );
  }
}
