# Evolution Stables - SEO Audit & Implementation Report

## Audit History

| Date | Version | Status |
|---|---|---|
| January 2026 | v1 | Initial audit — immediate fixes implemented |
| May 8, 2026 | v2 | Deep audit — sprint revised, 20 gaps catalogued, Token migration impact assessed |

---

## 🔍 May 2026 Audit Findings

### ✅ Confirmed Strong (Keep These)

| Area | Status | Evidence |
|---|---|---|
| Root metadata (`layout.tsx`) | ✅ Excellent | Title, description, keywords, OG, Twitter Cards, icons, robots, canonical — all present |
| Security headers | ✅ Best-in-class | CSP, HSTS, X-Frame-Options, Referrer-Policy in `next.config.ts` |
| Image formats | ✅ Configured | AVIF + WebP in `next.config.ts` |
| Robots.txt | ✅ Correct | `Disallow: /api/`, `Disallow: /auth` |
| Brand voice guidelines | ✅ Comprehensive | `BRAND_GUIDELINES.md` |
| Typography system | ✅ Systematic | Audi-inspired scale in `tailwind.config.ts` |
| JSON-LD (Organization + WebSite) | ✅ Present | `StructuredData.tsx` injected in `layout.tsx` `<head>` |
| Hidden `<h1>` on homepage | ✅ Fixed (v1) | Visually hidden, semantically correct |
| Viewport scaling | ✅ Fixed (v1) | `userScalable` restriction removed |

### ❌ Confirmed Critical Gaps

| # | Issue | Impact | File | Status |
|---|---|---|---|---|
| 1 | Sub-pages lack `generateMetadata` overrides | Every page shares generic site-wide title/description | Multiple pages | 🔴 Not fixed |
| 2 | Marketplace detail pages have no SEO metadata | Invisible to Google | `marketplace/[slug]/page.tsx` | 🟡 Deferred to Token |
| 3 | FAQ schema is client-rendered (`FAQStructuredData.tsx` uses `'use client'`) | FAQ rich results may not appear | `FAQStructuredData.tsx` | 🔴 Not fixed |
| 4 | Sitemap missing almost all routes (only 2–3 URLs) | Google can't discover pages | `src/app/sitemap.ts` | 🔴 Not fixed |
| 5 | No loading states anywhere | Blank pages during navigation, bad CWV | Missing `loading.tsx` | 🔴 Not fixed |
| 6 | `StructuredData.tsx` is `'use client'` | Organization + WebSite JSON-LD rendered client-side | `StructuredData.tsx` | 🔴 Not fixed |

### 🟡 Secondary Gaps

| # | Issue | Impact | File | Status |
|---|---|---|---|---|
| 7 | No `generateStaticParams` for dynamic routes | Pages not pre-built | `[slug]` routes | 🟡 Deferred to Token |
| 8 | No canonical tags on most routes | Duplicate content risk | All public pages | 🔴 Not fixed |
| 9 | Gallery image alt text is poor | Image SEO missed | `marketplace/[slug]` | 🟡 Deferred to Token |
| 10 | ~~No `width`/`height` on `<Image>`~~ | REMOVED — all images properly sized | N/A | ✅ Not an issue |
| 11 | HTML lang is `en` not `en-NZ` | Missed geo-targeting | `layout.tsx` | 🔴 Not fixed |
| 12 | `dangerouslySetInnerHTML` in updates — no sanitization | XSS risk (low: static files from disk) | `updates/[slug]` | 🔴 Not fixed |
| 13 | Hardcoded mock data in MyStable | Thin content risk (mitigated: "Coming Soon" overlay) | `mystable/page.tsx` | 🟡 Deferred to Token |
| 14 | `console.log` in production | Performance + data leak | Various | 🔴 Not fixed |
| 15 | No `manifest.ts`, `opengraph-image.tsx` | PWA + social sharing gaps | Missing files | 🔴 Not fixed |
| 16 | `postcss.config.mjs` has no optimization plugins | Bundle bloat | `postcss.config.mjs` | 🔴 Not fixed |
| 17 | `framer-motion` potentially bloating bundle | INP, TTI penalties | Dependencies | 🔴 Not fixed |
| 18 | Middleware may add TTFB latency | Slow origin response | `middleware.ts` | 🟡 Needs audit |

### 🟠 Gaps Added After May 2026 Audit

| # | Issue | Impact | File |
|---|---|---|---|
| 19 | `FAQStructuredData.tsx` is `'use client'` — original sprint missed this | FAQ rich results may not appear | `FAQStructuredData.tsx` |
| 20 | `/about`, `/gallery`, `/contact` have no `generateMetadata` | Every page shares generic title | Multiple pages |
| 21 | `/demo` not in sitemap and not disallowed in robots | Neither indexed nor excluded | `sitemap.ts`, `robots.ts` |
| 22 | Internal links use `<a>` instead of `<Link>` | No prefetching, slower navigation | `marketplace/[slug]` |
| 23 | `<Image fill>` missing `sizes` attribute | LCP hurt on mobile | `HeroSection.tsx`, `marketplace/[slug]` |
| 24 | Below-fold images missing `loading="lazy"` | Initial payload bloat | `marketplace/[slug]` |
| 25 | No `metadata.title.template` pattern | Inconsistent SERP titles | `layout.tsx` |
| 26 | No custom `not-found.tsx` | Generic 404 doesn't match brand | Missing file |

### 🔴 Original Sprint Claims — Corrected

| Original Claim | Audit Finding | Correction |
|---|---|---|
| "Site-wide metadata vacuum" | `layout.tsx` has excellent metadata (description, OG, Twitter, keywords, robots, canonical) | The real issue: sub-pages lack unique `generateMetadata` overrides |
| "Homepage entirely `'use client'`" | Root `layout.tsx` is server-rendered, Organization+WebSite schema is in `<head>` | The real issue: FAQ schema is client-rendered, homepage can't export `generateMetadata` |
| "No `width`/`height` on `<Image>` components" | All images either have explicit dimensions or use `fill` with proper parent sizing | **Not an issue** — removed from sprint |
| "Sitemap only has 2 URLs" | Actually 2–3 URLs (marketplace appears conditionally) | Corrected to "2–3 URLs, missing all dynamic routes" |

---

## 🚀 January 2026 Fixes (Previously Implemented)

### 1. Enhanced Metadata & Canonicals
*   **Canonical Tags:** Added explicit canonical URL support to primary public routes.
*   **Unique Page Titles & Descriptions:** Created dedicated metadata for Marketplace and MyStable pages.

### 2. Improved Heading Hierarchy
*   **Homepage:** Added visually hidden `<h1>` for semantic context.
*   **Marketplace:** Added visually hidden `<h1>`.

### 3. Rich Results Expansion
*   **FAQ Schema:** Created `FAQStructuredData` component on homepage.
*   **Press Articles:** Refined connection between press mentions and Organization schema.

### 4. Image SEO & Accessibility
*   **Descriptive Alt Tags:** Updated key images with descriptive, keyword-rich alt text.
*   **Accessibility Fix:** Removed viewport scaling restrictions.

---

## 🔄 Evolution_Token Migration Impact

A new marketplace and auth system is being built in `Evolution_Token/`. Key differences:

| Feature | Evolution_Platform (Current) | Evolution_Token (New) |
|---|---|---|
| `generateMetadata` on listings | ❌ None | ✅ Per-listing `seoTitle`/`seoDescription` |
| `generateStaticParams` | ❌ None | ✅ Pre-builds all pages |
| `metadata.title.template` | ❌ Static title | ✅ `"%s | Evolution Stables"` |
| `html lang` | ❌ `en` | ✅ `en-NZ` |
| Marketplace cards link to detail | ❌ No `<Link>` | ✅ Uses `<Link>` properly |
| MyStable auth | ❌ Mock data + overlay | ✅ Email auth redirect |
| `next/font/google` | ❌ Manual preload | ✅ Zero-CLS font loading |

**Impact on sprint:** Marketplace-specific SEO tasks are deferred to the Token migration (Track B). See `SEO_SPRINT.md` for the three-track strategy.

---

## 📋 Recommended Next Steps

1. **Implement Track A** (Platform-only, migration-proof changes) — see `SEO_SPRINT.md`
2. **Bake SEO into Token migration** from day one — see Track C in `SEO_SPRINT.md`
3. **Submit sitemap to GSC** only after marketplace URLs are stable
4. **Monitor Core Web Vitals** for 2 weeks post-deploy

---

**Report Date:** May 8, 2026  
**Status:** Revised — see `SEO_SPRINT.md` for implementation plan