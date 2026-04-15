import { notFound } from 'next/navigation';
import { Metadata } from 'next';
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

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const update = updates[params.slug];
  if (!update) {
    return {
      title: 'Update Not Found',
    };
  }
  
  return {
    title: `${update.title} | Evolution Stables`,
    description: `Investor update for ${update.title}`,
    alternates: {
      canonical: `/updates/${params.slug}`,
    },
  };
}

export default function UpdatePage({ params }: { params: { slug: string } }) {
  const update = updates[params.slug];
  
  if (!update) {
    notFound();
  }
  
  // Read the HTML file
  const htmlPath = path.join(process.cwd(), 'public', 'updates', update.file);
  let htmlContent = '';
  try {
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  } catch (error) {
    console.error(`Failed to read HTML file for update ${params.slug}:`, error);
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="w-full min-h-screen">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </main>
  );
}
