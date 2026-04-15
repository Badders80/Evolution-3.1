import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// List of available updates
const updates: Record<string, { title: string; file: string }> = {
  'prudentia-terapa-17apr2026': {
    title: 'Prudentia at Te Rapa - 17 April 2026',
    file: 'Prudentia-TeRapa-17Apr2026.html',
  },
  'prudentia-pukekohe-01apr2026': {
    title: 'Prudentia at Pukekohe - 1 April 2026',
    file: 'Prudentia-Pukekohe-01Apr2026.html',
  },
  'prudentia-terapa-12apr2026': {
    title: 'Prudentia at Te Rapa - 12 April 2026',
    file: 'Prudentia-TeRapa-12Apr2026.html',
  },
  'first-gear-19dec2025': {
    title: 'First Gear Update - 19 December 2025',
    file: 'First-Gear-Update-19Dec2025.html',
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const update = updates[slug];

  if (!update) {
    return NextResponse.json({ error: 'Update not found' }, { status: 404 });
  }

  // Read the HTML file
  const htmlPath = path.join(process.cwd(), 'public', 'updates', update.file);
  
  try {
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error(`Failed to read HTML file for update ${slug}:`, error);
    return NextResponse.json({ error: 'Failed to read HTML file' }, { status: 500 });
  }
}
