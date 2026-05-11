# SEO Sprint — Evolution Stables Platform

**Sprint ID**: `seo-sprint-2026-05-08`  
**Date**: May 8, 2026  
**Status**: Track A implemented — 17/25 tasks complete  
**Owner**: Evolution Stables Dev Team  
**Priority**: P1 — Directly impacts organic traffic, Core Web Vitals, and Google indexing

---

## 🎯 Sprint Goal

Fix the remaining SEO gaps that prevent search engines from properly discovering, indexing, and ranking all public pages. Focus: page-specific metadata, structured data, crawlability, and Core Web Vitals.

**Important context**: A new marketplace and auth system is being built in Evolution_Token. This sprint is split into three tracks to avoid duplicating work that will be replaced by the migration.

---

## 📊 Audit Summary

### ✅ Strong Foundations (Keep These)

| Area | Status | Evidence |
|---|---|---|
| Root metadata (`layout.tsx`) | ✅ Excellent | Title, description, keywords, OG, Twitter Cards, icons, robots, canonical |
| Security headers | ✅ Best-in-class | CSP, HSTS, X-Frame-Options, Referrer-Policy in `next.config.ts` |
| Image formats | ✅ Configured | AVIF + WebP in `next.config.ts` |
| Robots.txt | ✅ Correct | `Disallow: /api/`, `Disallow: /auth` |
| Brand voice guidelines | ✅ Comprehensive | `BRAND_GUIDELINES.md` — British English, active voice, no hype |
| Typography system | ✅ Systematic | Audi-inspired scale in `tailwind.config.ts` |
| JSON-LD (Organization + WebSite) | ✅ Present | `StructuredData.tsx` injected server-side in `layout.tsx` `<head>` |

### 🔴 Critical Gaps (Fix First — Track A)

| # | Issue | Impact | File |
|---|---|---|---|
| 1 | **Sub-pages lack `generateMetadata` overrides** — root metadata is excellent, but `/about`, `/gallery`, `/contact`, `/press`, `/demo`, `/marketplace`, `/updates/*` all inherit the generic site-wide title/description | Every page shares the same title in search results | Multiple pages |
| 2 | **Marketplace detail pages have no SEO metadata** — no title, description, canonical, OG | Invisible to Google | `src/app/marketplace/[slug]/page.tsx` |
| 3 | **Homepage FAQ schema is client-rendered** — `FAQStructuredData.tsx` uses `'use client'`; crawlers may miss it. Organization + WebSite schema is already server-rendered via layout | FAQ rich results may not appear | `src/components/seo/FAQStructuredData.tsx` |
| 4 | **Sitemap missing almost all routes** — only 2–3 URLs (homepage, press, conditional marketplace); missing `/about`, `/gallery`, `/contact`, `/demo`, and all dynamic listing/update pages | Google can't discover pages | `src/app/sitemap.ts` |
| 5 | **No loading states anywhere** — blank pages during navigation, bad Core Web Vitals | UX, INP, bounce rate | Missing `loading.tsx` files |
| 6 | **`StructuredData.tsx` is `'use client'`** — JSON-LD Organization + WebSite schema rendered client-side | Crawlers may miss schema | `src/components/seo/StructuredData.tsx` |

### 🟡 Secondary Gaps (Track A)

| # | Issue | Impact | File |
|---|---|---|---|
| 7 | No `generateStaticParams` for dynamic routes (but see Track B) | Pages not pre-built at build time | `marketplace/[slug]`, `updates/[slug]` |
| 8 | No canonical tags on most routes | Duplicate content risk from params | All public pages |
| 9 | Gallery image alt text is poor (`${horse.name} 1`, `${horse.name} 2`) | Image SEO missed | `marketplace/[slug]/page.tsx` |
| 10 | ~~No `width`/`height` on `<Image>` components~~ | **REMOVED — all images use `fill` with proper parent sizing or have explicit width/height** | N/A |
| 11 | HTML lang is `en` not `en-NZ` | Missed geo-targeting signal | `src/app/layout.tsx` |
| 12 | `dangerouslySetInnerHTML` in updates pages — no sanitization | XSS + SEO spam risk (low: content is static files from disk) | `updates/[slug]/page.tsx` |
| 13 | Hardcoded mock data in MyStable page | Thin content penalty if indexed (mitigated: shows "Coming Soon" overlay) | `src/app/mystable/page.tsx` |
| 14 | `console.log` statements in production components | Performance + data leak risk | Various components |
| 15 | No `manifest.ts`, `opengraph-image.tsx`, apple-touch-icon sizes | PWA + social sharing gaps | Missing files |
| 16 | `postcss.config.mjs` has no optimization plugins | Bundle bloat | `postcss.config.mjs` |
| 17 | `framer-motion` potentially bloating bundle | INP, TTI penalties | Dependencies |
| 18 | Middleware may add TTFB latency to all routes | Slow origin response | `src/middleware.ts` |

### 🟠 Gaps Added After Audit (Track A)

| # | Issue | Impact | File |
|---|---|---|---|
| 19 | **`FAQStructuredData.tsx` is `'use client'`** — sprint missed this file | FAQ rich results may not appear | `src/components/seo/FAQStructuredData.tsx` |
| 20 | **`/about`, `/gallery`, `/contact` pages have no `generateMetadata`** — sprint only identified `/marketplace`, `/updates`, `/press` | Every page shares generic title | `src/app/about/page.tsx`, `gallery/page.tsx`, `contact/page.tsx` |
| 21 | **`/demo` not in sitemap** and not disallowed in robots | Either include or exclude, don't ignore | `src/app/sitemap.ts`, `src/app/robots.ts` |
| 22 | **Internal links use `<a>` instead of Next.js `<Link>`** — breadcrumb in marketplace detail, CTA links | No prefetching, slower navigation | `marketplace/[slug]/page.tsx` line 46, line 159 |
| 23 | **`<Image fill>` missing `sizes` attribute** — prevents optimal responsive srcset | LCP hurt on mobile | `HeroSection.tsx`, `marketplace/[slug]/page.tsx` |
| 24 | **Below-fold images missing `loading="lazy"`** — gallery thumbnails load eagerly | Initial payload bloat | `marketplace/[slug]/page.tsx` |
| 25 | **No `metadata.title.template` pattern** — root layout uses static title; sub-pages can't easily append brand suffix | Inconsistent titles in SERPs | `src/app/layout.tsx` |
| 26 | **No custom `not-found.tsx`** — generic Next.js 404 doesn't match brand | Poor UX for broken links | Missing file |

### 🟣 Gaps Deferred to Token Migration (Track B)

These will be solved by the new Evolution_Token marketplace — do NOT duplicate effort here:

| # | Issue | Why Defer |
|---|---|---|
| B1 | Marketplace detail pages need `generateMetadata` | Token version has per-listing `seoTitle`/`seoDescription` |
| B2 | Marketplace needs `generateStaticParams` | Token version already pre-builds all listing pages |
| B3 | Marketplace cards don't link to detail pages | Token version uses `<Link>` properly |
| B4 | MyStable mock data / thin content | Token version uses auth redirect, no mock data |
| B5 | Marketplace image alt text improvements | Token has different image handling |
| B6 | Marketplace Product/Offer schema | Implement in Token instead |

---

## 🗓️ Implementation Phases

### Track A — Do Now (Platform-Only, Migration-Proof)

These changes apply to pages that WON'T be replaced by the Token migration.

#### Phase 1: Critical SEO Fixes (Steps 1–8)

| Step | Task | File(s) |
|---|---|---|
| 1.1 | Add `generateMetadata` overrides to all sub-pages (`/about`, `/gallery`, `/contact`, `/press`, `/demo`, `/marketplace`, `/updates/*`) | Multiple pages |
| 1.2 | Adopt `metadata.title.template` pattern from Token (`"%s | Evolution Stables"`) | `src/app/layout.tsx` |
| 1.3 | Complete sitemap — add all public routes (exclude marketplace detail pages for now, defer to Track C) | `src/app/sitemap.ts` |
| 1.4 | Split homepage FAQ schema into server component | `src/app/page.tsx`, `src/components/seo/FAQStructuredData.tsx` |
| 1.5 | Add loading skeletons for static pages (`/about`, `/gallery`, `/contact`, `/press`, `/demo`) | New `loading.tsx` files |
| 1.6 | Add error boundaries for key routes | New `error.tsx` files |
| 1.7 | Add custom `not-found.tsx` matching brand | New file |
| 1.8 | Decide on `/demo`: add to sitemap OR disallow in robots | `src/app/sitemap.ts`, `src/app/robots.ts` |

#### Phase 2: Structured Data Expansion (Steps 9–12)

| Step | Task | File(s) |
|---|---|---|
| 2.1 | Make `StructuredData.tsx` server-rendered (remove `'use client'`) | `src/components/seo/StructuredData.tsx` |
| 2.2 | Make `FAQStructuredData.tsx` server-rendered (remove `'use client'`) | `src/components/seo/FAQStructuredData.tsx` |
| 2.3 | Add BreadcrumbList schema to marketplace detail (but defer if Token migration is imminent) | New `BreadcrumbStructuredData.tsx` |
| 2.4 | Add Article schema to press & updates | `src/app/press/page.tsx`, `updates/[slug]` |

#### Phase 3: Architecture & Crawlability (Steps 13–18)

| Step | Task | File(s) |
|---|---|---|
| 3.1 | Add self-referencing canonical tags to all static routes | Multiple pages |
| 3.2 | Fix HTML lang to `en-NZ` | `src/app/layout.tsx` |
| 3.3 | URL hygiene — align `metadataBase` with www. domain | `next.config.ts`, `layout.tsx` |
| 3.4 | Convert internal `<a>` tags to Next.js `<Link>` for prefetching | `marketplace/[slug]/page.tsx` (if not deferring) |
| 3.5 | Add `noindex` metadata to `/mystable/*`, `/api/*` routes | MyStable, API routes |
| 3.6 | Verify no `public/robots.txt` conflicts with `src/app/robots.ts` | Check `public/` |

#### Phase 4: Core Web Vitals (Steps 19–22)

| Step | Task | File(s) |
|---|---|---|
| 4.1 | Add `fetchPriority="high"` to hero image | `src/components/site/HeroSection.tsx` |
| 4.2 | Add `sizes` attribute to all `<Image fill>` components | `HeroSection.tsx`, `marketplace/[slug]/page.tsx` |
| 4.3 | Add `loading="lazy"` to below-fold images | `marketplace/[slug]/page.tsx` |
| 4.4 | Audit middleware for TTFB impact | `src/middleware.ts` |

#### Phase 5: Security, Quality & PWA (Steps 23–28)

| Step | Task | File(s) |
|---|---|---|
| 5.1 | Sanitize `dangerouslySetInnerHTML` with DOMPurify | `src/app/updates/[slug]/page.tsx` |
| 5.2 | Remove `console.log` from production | Various components |
| 5.3 | Add PWA manifest + dynamic OG images + apple icons | New files |
| 5.4 | Add `cssnano` + `postcss-preset-env` | `postcss.config.mjs` |
| 5.5 | Consider `next/font/google` pattern from Token (replace manual font preload) | `src/app/layout.tsx` |
| 5.6 | Add `seoTitle`/`seoDescription` fields to marketplace data model (align with Token) | Marketplace data |

#### Phase 6: Verification & Deploy (Steps 29–36)

| Step | Task | Tool |
|---|---|---|
| 6.1 | Build + lint + test | `npm run build`, `npm run lint` |
| 6.2 | Schema validation | https://validator.schema.org/ |
| 6.3 | Rich results test | https://search.google.com/test/rich-results |
| 6.4 | Lighthouse audit | Chrome DevTools |
| 6.5 | 404 status check | `curl -I` |
| 6.6 | Submit sitemap to GSC (only after confirming marketplace URLs are stable) | https://search.google.com/search-console |
| 6.7 | Request re-indexing | GSC |
| 6.8 | Monitor Core Web Vitals | GSC for 2 weeks |

---

### Track B — Defer to Token Migration

Do NOT implement these in Platform — they will be replaced.

| Original Sprint Task | Reason to Defer |
|---|---|
| Add `generateMetadata` to marketplace detail pages | Token already has per-listing `seoTitle`/`seoDescription` |
| Add `generateStaticParams` for marketplace routes | Token already has this |
| Link marketplace cards to detail pages | Token uses `<Link>` properly |
| Wrap mock data in `NODE_ENV === 'development'` for MyStable | Token uses auth redirect |
| Marketplace image alt text improvements | Token has different image handling |
| Marketplace Product schema | Implement in Token instead |

### Track C — Add During Token Migration

Bake SEO into the new codebase from day one.

| Step | Task | Why |
|---|---|---|
| C1 | Ensure all Token routes get `generateMetadata` with template pattern | Inherit `"%s | Evolution Stables"` from layout |
| C2 | Add `noindex` to `/mystable/*`, `/api/*`, `/mock/*`, `/admin/*` routes | Auth pages must not be indexed |
| C3 | Add BreadcrumbList + Product/Offer schema to Token marketplace detail pages | Rich results for horse listings |
| C4 | Add canonical URLs to all Token routes | Prevent duplicate content |
| C5 | Create `sitemap.ts` in Token that includes all listing slugs dynamically | Ensure discoverability |
| C6 | Add `loading.tsx` and `error.tsx` to all Token route groups | UX + Core Web Vitals |
| C7 | Verify Token's `robots.ts` disallows `/api/`, `/auth`, `/mystable`, `/mock`, `/admin` | Prevent crawling of private routes |
| C8 | Remove `console.log` and `console.error` from Token production code | Found in `mystable/user/page.tsx` lines 29, 68 |
| C9 | Verify Token's `<Image>` components have proper `sizes`, `loading`, `alt` attributes | CWV + accessibility |
| C10 | Add Article schema to any blog/updates content in Token | Rich results |

---

## 📁 Files to Modify / Create

### Modify (14 files)

1. `src/app/layout.tsx` — `metadata.title.template`, `lang="en-NZ"`, canonical base
2. `src/app/page.tsx` — split server/client for FAQ schema
3. `src/app/about/page.tsx` — add `generateMetadata`
4. `src/app/gallery/page.tsx` — add `generateMetadata`
5. `src/app/contact/page.tsx` — add `generateMetadata`
6. `src/app/press/page.tsx` — add `generateMetadata`
7. `src/app/demo/page.tsx` — add `generateMetadata` (or add to sitemap + noindex decision)
8. `src/app/marketplace/page.tsx` — add `generateMetadata`, canonical
9. `src/app/updates/[slug]/page.tsx` — enhance metadata, Article schema, sanitize HTML
10. `src/app/sitemap.ts` — add all public routes
11. `src/app/robots.ts` — verify disallows, decide on `/demo`
12. `src/components/seo/StructuredData.tsx` — remove `'use client'`
13. `src/components/seo/FAQStructuredData.tsx` — remove `'use client'`
14. `src/components/site/HeroSection.tsx` — add `fetchPriority="high"`, `sizes` attribute
15. `src/middleware.ts` — audit TTFB impact
16. `postcss.config.mjs` — add optimization plugins
17. `src/app/marketplace/[slug]/page.tsx` — `<Link>` instead of `<a>`, image `sizes`, `loading="lazy"` (or defer to Track B)

### Create (10 files)

1. `src/app/about/loading.tsx` — skeleton
2. `src/app/gallery/loading.tsx` — skeleton
3. `src/app/contact/loading.tsx` — skeleton
4. `src/app/press/loading.tsx` — skeleton
5. `src/app/demo/loading.tsx` — skeleton
6. `src/app/marketplace/error.tsx` — error boundary
7. `src/app/updates/error.tsx` — error boundary
8. `src/app/not-found.tsx` — branded 404 page
9. `src/app/manifest.ts` — PWA manifest
10. `src/app/opengraph-image.tsx` — dynamic OG image generation
11. `src/components/seo/BreadcrumbStructuredData.tsx` — reusable breadcrumb JSON-LD

### Do NOT Create (Track B — Deferred)

~~`src/app/marketplace/[slug]/loading.tsx`~~ — defer to Token migration  
~~`src/app/marketplace/[slug]/error.tsx`~~ — defer to Token migration  
~~`src/app/updates/[slug]/loading.tsx`~~ — still create this (updates stay in Platform)

---

## 🎯 Success Metrics

| Metric | Before | Target (Post-Sprint) |
|---|---|---|
| Sitemap URLs | 2–3 | 10+ (all static public routes) |
| Pages with unique metadata | 1 (root only) | 10+ (every public page) |
| Pages with structured data | 2 (Organization + WebSite, server-rendered in layout) | 6+ (Org, WebSite, FAQ, Article, Breadcrumb) |
| Lighthouse SEO Score | ~70 | 100 |
| Lighthouse Performance | ~75 | 90+ |
| Lighthouse Accessibility | ~85 | 95+ |
| CLS | Unknown | < 0.1 |
| LCP | Unknown | < 2.5s |
| INP | Unknown | < 200ms |
| Indexed marketplace listings | 0 | Deferred to Track C |
| Rich results eligibility | 1 (FAQ, client-rendered) | 4+ (FAQ, Article, Breadcrumb, Organization) |

**Note**: Marketplace listing indexing is deferred to Track C (Token migration). The sprint target of "All live listings" will be achieved when the new marketplace launches with SEO baked in.

---

## 🔗 Reference Documents

| Document | Location | Purpose |
|---|---|---|
| This Sprint | `SEO_SPRINT.md` (this file) | Master plan & tracker |
| Previous Audit | `SEO_AUDIT_REPORT.md` | Jan 2026 findings |
| SEO Checklist | `SEO_CHECKLIST.md` | Action items & goals |
| SEO Guide | `SEO_GUIDE.md` | Technical implementation guide |
| SEO Summary | `SEO_SUMMARY.md` | Quick reference |
| Performance Baseline | `PERFORMANCE_OPTIMIZATION.md` | Pre/Post optimization metrics |
| Brand Guidelines | `BRAND_GUIDELINES.md` | Voice, tone, British English rules |
| Token Readiness Audit | `AUDIT_2026-04-27_TokenReadiness.md` | Security/performance findings |
| Evolution_Token Marketplace | `Evolution_Token/src/app/marketplace/` | Reference implementation for SEO patterns |

---

## 📝 Notes & Decisions

- **Homepage stays mostly client-rendered** — framer-motion scroll animations require client interactivity. Split only SEO-critical parts (FAQ schema) to server rendering.
- **Root metadata is excellent** — the sprint originally claimed a "metadata vacuum" but the audit found `layout.tsx` has comprehensive metadata. The real issue is sub-pages lacking unique overrides.
- **Privacy/Terms remain `noindex`** — temporary placeholder pages, correct to keep out of search until final legal copy is ready.
- **MyStable remains `noindex`** — authenticated dashboard, not a public landing page. Token migration will replace with auth redirect.
- **Demo page** — needs a decision: add to sitemap (public marketing page) OR disallow in robots. Currently it's in neither.
- **British English (en-NZ)** — consistent with brand guidelines. Token layout already uses `en-NZ`.
- **Token migration patterns** — adopt `metadata.title.template`, `next/font/google`, `generateStaticParams`, per-listing `seoTitle`/`seoDescription`, and proper `<Link>` usage from the Token codebase.
- **www. vs non-www.** — align `metadataBase` with actual canonical domain to prevent split authority.
- **`dangerouslySetInnerHTML` risk is low** — content is static HTML files from disk, not user input. Sanitization is still recommended as defense-in-depth.
- **Marketplace SEO deferred** — do NOT invest in marketplace-specific SEO (detail page metadata, Product schema, card linking) in Platform. The Token migration already implements these patterns correctly.

---

## 🚀 Next Actions

1. **Start Phase 1** — metadata overrides + sitemap (highest ROI)
2. **Decide on `/demo`** — sitemap inclusion or robots disallow
3. **Run `npm run build`** after each phase to catch issues early
4. **Deploy to staging** after Phase 3 for live validation
5. **Submit sitemap to GSC** only after confirming marketplace URLs are stable
6. **Monitor Core Web Vitals** for 2 weeks post-deploy
7. **Before Token migration** — review Track C checklist and ensure SEO is baked in from day one

---

*Last updated: May 8, 2026 (Revised after audit)*  
*Sprint owner: Dev Team*  
*Questions: Reference `SEO_GUIDE.md` or `SEO_SUMMARY.md` for technical details*