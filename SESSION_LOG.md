# Evolution_Platform — Session Log

> Append-only. Grows forever. Any tool can write.

- Reviewed platform state
- Verified marketplace shell ready
- Confirmed MyStable MVP pending auth

## Context Chain

<- MEMORY.md

## 2026-05-08 — DNA Backup Palette System

**What:** Updated brand CSS to align with new centralized token system.

**Updated:**
- `src/styles/brand.css` — Updated primary palette values from `#000000` bg to `#09090b` (Velvet Night) to match tokens.json. Added backup palette CSS custom properties (`--palette-navy-*`, `--palette-emerald-*`, `--palette-charcoal-*`). Added `brand-gold-hover` token.

**Source of truth:** `/home/evo/projects/tokens.json` — now referenced by all projects.

**Impact:** Platform Tailwind config already reads CSS vars, so no tailwind.config.ts changes needed. Backup palettes available for future campaign pages.

**Instagram reference:** https://www.instagram.com/p/DYCxv6RlFU7/ (Minimal Premium, Black & Gold, Navy & Cream, Emerald & Gold palettes)

## 2026-05-08 — SEO Sprint Audit & Implementation

**What:** Deep-audited `SEO_SPRINT.md` against actual codebase, then implemented Track A.

**Audit findings:**
- 3 false claims corrected ("metadata vacuum" → root metadata is excellent; "homepage entirely 'use client'" → Organization+WebSite schema server-rendered in layout; "no width/height on Image" → all images properly sized)
- 8 gaps the sprint missed (`FAQStructuredData.tsx` also `'use client'`, `/demo` neither indexed nor excluded, `<Image fill>` missing `sizes`, below-fold images missing `loading="lazy"`, no `metadata.title.template`, no custom 404, `<a>` tags instead of `<Link>`)
- Evolution_Token already solves 6 marketplace-specific gaps → restructured into 3-track strategy

**Track A implemented (17 tasks):**
- `layout.tsx`: `metadata.title.template` (`"%s | Evolution Stables"`), `lang="en-NZ"`, FAQStructuredData injected server-side in `<head>`
- `demo/page.tsx`: `generateMetadata` export (title, description, canonical), removed `'use client'`, added `sizes` + improved `alt`
- `marketplace/page.tsx`: `generateMetadata` + canonical
- `sitemap.ts`: expanded from 2-3 to 5 URLs (home, press, demo, updates, marketplace-conditional)
- `robots.ts`: disallow `/mystable`, `/admin`
- `StructuredData.tsx`, `FAQStructuredData.tsx`: removed `'use client'` → server-rendered JSON-LD
- `faq-items.ts`: new shared constants file (extracted from `page.tsx`)
- `page.tsx`: removed inline faqItems + FAQStructuredData (now in layout)
- `loading.tsx`: marketplace, press, demo skeletons created
- `manifest.ts`, `opengraph-image.tsx`: PWA manifest + dynamic OG image
- `postcss.config.mjs`: `cssnano` installed and configured for production
- `api/interest/route.ts`: fixed 3 pre-existing type errors (null-coalescing)
- Build: ✓ Compiled in 6.2s

**Track B deferred to Token migration:** marketplace detail metadata, generateStaticParams, card linking, Product schema — Token already solves these.

**Track C for Token migration:** 10 SEO tasks to bake in from day one (canonicals, sitemap, loading/error boundaries, robots, console cleanup).

**Docs updated:** `SEO_SPRINT.md`, `SEO_AUDIT_REPORT.md`, `SEO_CHECKLIST.md`, `SEO_SUMMARY.md`
