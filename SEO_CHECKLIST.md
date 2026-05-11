# SEO Implementation Checklist

**Last Updated:** May 8, 2026  
**Status:** Revised after deep audit — see `SEO_SPRINT.md` for full details

---

## ✅ Completed (v1 — January 2026)

### Technical Implementation
- [x] JSON-LD structured data created (Organization + WebSite)
- [x] Press mentions component built
- [x] Press articles database set up
- [x] Enhanced meta tags (title, description, keywords)
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] Sitemap.xml configuration
- [x] Robots.txt configuration
- [x] Homepage integration
- [x] Mobile responsive design
- [x] Build verification (no errors)
- [x] Hidden `<h1>` on homepage and marketplace
- [x] Viewport scaling fix (removed `userScalable: false`)
- [x] FAQ structured data component created

### Content
- [x] Investing.com article added
- [x] Documentation created (4 guides)

---

## 🔴 Track A — Do Now (Platform-Only, Migration-Proof)

### Phase 1: Critical SEO Fixes

#### 1.1 Sub-Page Metadata
- [ ] Add `generateMetadata` to `/about`
- [ ] Add `generateMetadata` to `/gallery`
- [ ] Add `generateMetadata` to `/contact`
- [ ] Add `generateMetadata` to `/press`
- [ ] Add `generateMetadata` to `/demo`
- [ ] Add `generateMetadata` to `/marketplace`
- [ ] Add `generateMetadata` to `/updates/[slug]`

#### 1.2 Title Template
- [ ] Adopt `metadata.title.template` pattern (`"%s | Evolution Stables"`) in `layout.tsx`

#### 1.3 Sitemap
- [ ] Add `/about` to sitemap
- [ ] Add `/gallery` to sitemap
- [ ] Add `/contact` to sitemap
- [ ] Add `/demo` to sitemap (or disallow in robots)
- [ ] Add `/updates` to sitemap
- [ ] Add dynamic listing slugs (defer marketplace detail pages to Track C)

#### 1.4 Homepage Server/Client Split
- [ ] Extract FAQ schema to server component
- [ ] Remove `'use client'` from `FAQStructuredData.tsx`

#### 1.5 Loading States
- [ ] Create `src/app/about/loading.tsx`
- [ ] Create `src/app/gallery/loading.tsx`
- [ ] Create `src/app/contact/loading.tsx`
- [ ] Create `src/app/press/loading.tsx`
- [ ] Create `src/app/demo/loading.tsx`

#### 1.6 Error Boundaries
- [ ] Create `src/app/marketplace/error.tsx`
- [ ] Create `src/app/updates/error.tsx`

#### 1.7 404 Page
- [ ] Create `src/app/not-found.tsx` (branded)

#### 1.8 Demo Page Decision
- [ ] Decide: add `/demo` to sitemap OR disallow in robots

### Phase 2: Structured Data Expansion

- [ ] Remove `'use client'` from `StructuredData.tsx`
- [ ] Remove `'use client'` from `FAQStructuredData.tsx`
- [ ] Create `BreadcrumbStructuredData.tsx` (defer if Token migration is imminent)
- [ ] Add Article schema to press page
- [ ] Add Article schema to updates pages

### Phase 3: Architecture & Crawlability

- [ ] Add canonical tags to all static routes
- [ ] Fix HTML lang from `en` to `en-NZ`
- [ ] Align `metadataBase` with www. domain
- [ ] Convert `<a>` to `<Link>` for internal links (or defer marketplace to Track B)
- [ ] Add `noindex` to `/mystable/*`, `/api/*` routes
- [ ] Verify no `public/robots.txt` conflicts with `src/app/robots.ts`

### Phase 4: Core Web Vitals

- [ ] Add `fetchPriority="high"` to hero image in `HeroSection.tsx`
- [ ] Add `sizes` attribute to all `<Image fill>` components
- [ ] Add `loading="lazy"` to below-fold images
- [ ] Audit middleware for TTFB impact

### Phase 5: Security, Quality & PWA

- [ ] Sanitize `dangerouslySetInnerHTML` with DOMPurify in `updates/[slug]`
- [ ] Remove `console.log` from production components
- [ ] Create `src/app/manifest.ts` (PWA manifest)
- [ ] Create `src/app/opengraph-image.tsx` (dynamic OG images)
- [ ] Add apple-touch-icon sizes
- [ ] Add `cssnano` + `postcss-preset-env` to `postcss.config.mjs`
- [ ] Consider `next/font/google` pattern (replace manual font preload)
- [ ] Add `seoTitle`/`seoDescription` fields to marketplace data model

### Phase 6: Verification & Deploy

- [ ] `npm run build` — no errors
- [ ] `npm run lint` — no warnings
- [ ] Schema validation at https://validator.schema.org/
- [ ] Rich results test at https://search.google.com/test/rich-results
- [ ] Lighthouse audit (SEO 100, Performance 90+, Accessibility 95+)
- [ ] 404 status check with `curl -I`
- [ ] Submit sitemap to GSC (after marketplace URLs are stable)
- [ ] Request re-indexing in GSC
- [ ] Monitor Core Web Vitals for 2 weeks

---

## 🟡 Track B — Defer to Token Migration

Do NOT implement these in Platform — they will be replaced.

- [ ] ~~Add `generateMetadata` to marketplace detail pages~~ → Token has per-listing `seoTitle`/`seoDescription`
- [ ] ~~Add `generateStaticParams` for marketplace routes~~ → Token already has this
- [ ] ~~Link marketplace cards to detail pages~~ → Token uses `<Link>` properly
- [ ] ~~Wrap mock data in `NODE_ENV === 'development'` for MyStable~~ → Token uses auth redirect
- [ ] ~~Marketplace image alt text improvements~~ → Token has different image handling
- [ ] ~~Marketplace Product/Offer schema~~ → Implement in Token instead

---

## 🟣 Track C — Add During Token Migration

Bake SEO into the new codebase from day one.

- [ ] Ensure all Token routes get `generateMetadata` with template pattern
- [ ] Add `noindex` to `/mystable/*`, `/api/*`, `/mock/*`, `/admin/*`
- [ ] Add BreadcrumbList + Product/Offer schema to Token marketplace detail pages
- [ ] Add canonical URLs to all Token routes
- [ ] Create `sitemap.ts` in Token with dynamic listing slugs
- [ ] Add `loading.tsx` and `error.tsx` to all Token route groups
- [ ] Verify Token `robots.ts` disallows `/api/`, `/auth`, `/mystable`, `/mock`, `/admin`
- [ ] Remove `console.log`/`console.error` from Token production code
- [ ] Verify Token `<Image>` components have proper `sizes`, `loading`, `alt`
- [ ] Add Article schema to any blog/updates content in Token

---

## 🔴 Corrected Items (May 2026 Audit)

### Previously Believed — Now Corrected
- ~~"Site-wide metadata vacuum"~~ → Root metadata is excellent. Issue is sub-pages lacking `generateMetadata` overrides.
- ~~"Homepage entirely `'use client'"~~ → Root layout IS server-rendered. Issue is FAQ schema client-rendered; Organization+WebSite schema is in `<head>`.
- ~~"No `width`/`height` on `<Image>` components"~~ → All images properly sized. Removed from sprint.
- ~~"Sitemap only has 2 URLs"~~ → Actually 2–3 (marketplace conditional). Corrected.

### Newly Discovered Gaps
- `FAQStructuredData.tsx` is `'use client'` — original sprint missed this
- `/about`, `/gallery`, `/contact` pages have no `generateMetadata` — sprint missed these
- `/demo` not in sitemap and not disallowed in robots
- Internal links use `<a>` instead of `<Link>`
- `<Image fill>` missing `sizes` attribute
- Below-fold images missing `loading="lazy"`
- No `metadata.title.template` pattern
- No custom `not-found.tsx`

---

## 📊 Metrics to Track

### Before / After Targets

| Metric | Before | Target |
|---|---|---|
| Sitemap URLs | 2–3 | 10+ |
| Pages with unique metadata | 1 | 10+ |
| Pages with structured data | 2 (server-rendered) | 6+ |
| Lighthouse SEO | ~70 | 100 |
| Lighthouse Performance | ~75 | 90+ |
| Lighthouse Accessibility | ~85 | 95+ |
| CLS | Unknown | < 0.1 |
| LCP | Unknown | < 2.5s |
| INP | Unknown | < 200ms |
| Rich results eligibility | 1 (FAQ, client-rendered) | 4+ |

### Weekly
- [ ] Check Search Console
- [ ] Monitor rankings
- [ ] Review analytics

### Monthly
- [ ] Audit backlinks
- [ ] Update old content
- [ ] Check competitors

---

## 📚 Resources

- **Sprint Plan:** `SEO_SPRINT.md` — full implementation plan
- **Audit Report:** `SEO_AUDIT_REPORT.md` — detailed findings
- **SEO Guide:** `SEO_GUIDE.md` — technical implementation guide
- **This Checklist:** `SEO_CHECKLIST.md` — action items
- **Quick Reference:** `SEO_SUMMARY.md` — overview
- **Token Reference:** `Evolution_Token/src/app/marketplace/` — reference SEO patterns

---

*Last updated: May 8, 2026*