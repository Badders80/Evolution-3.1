import { notFound } from 'next/navigation';
import { readFile } from 'fs/promises';
import { join } from 'path';

interface PageProps {
  params: { slug: string };
}

export default async function UpdatePage({ params }: PageProps) {
  const { slug } = params;
  
  // Validate slug format (First-Gear-Update-XXMonYYYY)
  if (!slug?.match(/^First-Gear-Update-\d{2}[A-Za-z]{3}\d{4}$/)) {
    notFound();
  }
  
  const filePath = join(process.cwd(), 'public', 'updates', `${slug}.html`);
  
  try {
    const htmlContent = await readFile(filePath, 'utf-8');
    
    // Extract body content from HTML (between <body> and </body>)
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;
    
    // Extract title
    const titleMatch = htmlContent.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'First Gear Update';
    
    return (
      <>
        <title>{title}</title>
        <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
      </>
    );
  } catch (error) {
    notFound();
  }
}

// Generate static params for all existing updates
export async function generateStaticParams() {
  const updates = [
    'First-Gear-Update-11Dec2025',
    'First-Gear-Update-12Dec2025',
    'First-Gear-Update-18Dec2025',
    'First-Gear-Update-19Dec2025',
    'First-Gear-Update-22Dec2025',
    'First-Gear-Update-31Dec2025',
    'First-Gear-Update-02Jan2026',
  ];
  
  return updates.map((slug) => ({ slug }));
}
