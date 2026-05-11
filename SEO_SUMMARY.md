# SEO Implementation Summary

**Last Updated:** May 8, 2026  
**Status:** Revised after deep audit — see `SEO_SPRINT.md` for implementation plan

---

## ✅ What Was Done (v1 — January 2026)

### 1. JSON-LD Structured Data
**File:** `/src/components/seo/StructuredData.tsx`

Tells search engines:
- Who you are (Organization)
- What you do (Digital racehorse ownership)
- Your social profiles
- Press articles about you

**Note:** Currently uses `'use client'` — needs to be server-rendered (Track A, Phase 2).

### 2. Press Mentions Section
**File:** `/src/components/site/PressMentions.tsx`

Elegant "As Featured In" section on homepage showing press coverage.

### 3. Root Metadata
**File:** `/src/app/layout.tsx`

Comprehensive metadata including:
- Title, description, keywords
- Open Graph tags
- Twitter Card tags
- Canonical URL
- Robots directives
- Icons

**Note:** Root metadata is excellent. The issue is that sub-pages don't have unique `generateMetadata` overrides — they all inherit the generic site-wide title/description.

### 4. Press Articles Database
**File:** `/src/lib/press-articles.ts`

Centralized management — add articles here and they appear everywhere.

### 5. Sitemap & Robots.txt
**Files:** `/src/app/sitemap.ts` & `/src/app/robots.ts`

Currently only 2–3 URLs in sitemap. Needs expansion to include all public routes.

### 6. Heading Hierarchy Fix
- Homepage: Hidden `<h1>` for semantic context
- Marketplace: Hidden `<h1>`

### 7. Viewport Fix
- Removed `userScalable: false` for accessibility

---

## 🔴 Current Gaps (May 2026 Audit)

### Critical (Must Fix)

| Gap | Impact | Track |
|---|---|---|
| Sub-pages lack unique `generateMetadata` | Every page shows same title in Google | A |
| FAQ schema client-rendered | Rich results may not appear | A |
| `StructuredData.tsx` client-rendered | Organization schema may not be indexed | A |
| Sitemap only 2–3 URLs | Google can't discover pages | A |
| No loading states | Blank pages, bad UX & CWV | A |
| No canonical tags on sub-pages | Duplicate content risk | A |

### Secondary (Should Fix)

| Gap | Impact | Track |
|---|---|---|
| HTML lang is `en` not `en-NZ` | Missed geo-targeting | A |
| `dangerouslySetInnerHTML` unsanitized | XSS risk (low: static content) | A |
| `console.log` in production | Performance + data leak | A |
| No PWA manifest / OG images | Missing social + PWA features | A |
| No PostCSS optimization | Bundle bloat | A |
| Middleware TTFB impact | Slow origin response | A |

### Marketplace-Specific (Defer to Token Migration)

| Gap | Impact | Track |
|---|---|---|
| No `generateMetadata` on detail pages | Invisible to Google | B |
| No `generateStaticParams` | Pages not pre-built | B |
| Cards don't link to detail pages | No internal linking | B |
| Poor image alt text | Image SEO missed | B |
| Mock data in MyStable | Thin content risk | B |

---

## 🟣 Evolution_Token Reference Patterns

The new marketplace codebase already implements several SEO patterns correctly. Use these as reference when building:

| Pattern | Token Implementation | Platform Current |
|---|---|---|
| Per-listing metadata | `seoTitle` / `seoDescription` in data model | None |
| `generateMetadata` | Per-listing with fallback | None |
| `generateStaticParams` | Pre-builds all listing pages | None |
| `metadata.title.template` | `"%s | Evolution Stables"` | Static title only |
| `html lang` | `en-NZ` | `en` |
| Internal links | Next.js `<Link>` | `<a>` tags |
| `next/font/google` | Geist + Geist_Mono | Manual font preload |

---

## 🎯 Three-Track Strategy

### Track A — Do Now (Platform-Only)
Changes to pages that WON'T be replaced by Token migration. Start here.

### Track B — Defer to Token Migration
Marketplace-specific SEO that will be replaced. Don't duplicate effort.

### Track C — Add During Token Migration
SEO requirements to bake into the new codebase from day one.

See `SEO_SPRINT.md` for the full implementation plan.

---

## 📊 Quick Metrics

| Metric | Before | Target |
|---|---|---|
| Sitemap URLs | 2–3 | 10+ |
| Pages with unique metadata | 1 | 10+ |
| Pages with structured data | 2 | 6+ |
| Lighthouse SEO | ~70 | 100 |
| Rich results eligibility | 1 | 4+ |

---

## 📚 Documentation

- **Sprint Plan:** `SEO_SPRINT.md` — full implementation plan with phases
- **Audit Report:** `SEO_AUDIT_REPORT.md` — detailed findings with evidence
- **Checklist:** `SEO_CHECKLIST.md` — actionable checklist
- **This Summary:** `SEO_SUMMARY.md` — quick overview
- **SEO Guide:** `SEO_GUIDE.md` — technical implementation guide
- **Token Reference:** `Evolution_Token/src/app/marketplace/` — reference patterns

---

*Last updated: May 8, 2026*