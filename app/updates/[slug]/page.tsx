import { notFound } from 'next/navigation';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';

interface PageProps {
  params: { slug: string };
}

export default async function UpdatePage({ params }: PageProps) {
  const { slug } = params;
  
  // Validate slug format (<Horse>-Update-XXMonYYYY)
  if (!slug?.match(/^[A-Za-z0-9-]+-Update-\d{2}[A-Za-z]{3}\d{4}$/)) {
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
  const updatesDir = join(process.cwd(), 'public', 'updates');
  const entries = await readdir(updatesDir, { withFileTypes: true });

  const slugs = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => entry.name.replace(/\.html$/i, ''))
    .filter((slug) => slug.match(/^[A-Za-z0-9-]+-Update-\d{2}[A-Za-z]{3}\d{4}$/));

  return slugs.map((slug) => ({ slug }));
}
