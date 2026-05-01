import { notFound } from "next/navigation";
import { Metadata } from "next";
import fs from "fs";
import path from "path";

// List of available updates with their HTML file names
const updates: Record<string, { title: string; file: string }> = {
  prudentiaterapa02may2026: {
    title: "Prudentia at Te Rapa - 2 May 2026",
    file: "Prudentia-TeRapa-02May2026.html",
  },
  "prudentia-terapa-17apr2026": {
    title: "Prudentia at Te Rapa - 17 April 2026",
    file: "Prudentia-TeRapa-17Apr2026-v2.html",
  },
  "prudentia-pukekohe-01apr2026": {
    title: "Prudentia at Pukekohe - 1 April 2026",
    file: "Prudentia-Pukekohe-01Apr2026.html",
  },
  "prudentia-terapa-12apr2026": {
    title: "Prudentia at Te Rapa - 12 April 2026",
    file: "Prudentia-TeRapa-12Apr2026.html",
  },
  "first-gear-19dec2025": {
    title: "First Gear Update - 19 December 2025",
    file: "First-Gear-Update-19Dec2025.html",
  },
};

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const update = updates[params.slug];
  if (!update) {
    return {
      title: "Update Not Found",
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

  // Read the HTML file and render it directly
  // (redirecting to the .html file causes a 404 because the [slug] route catches it)
  const filePath = path.join(process.cwd(), "public", "updates", update.file);
  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch {
    notFound();
  }

  // Extract body content to avoid nested <html>/<head>/<body> tags
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const content = bodyMatch ? bodyMatch[1] : htmlContent;

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
