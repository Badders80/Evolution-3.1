# Evolution Platform — Comprehensive Codebase Audit

**Date:** 2026-04-27  
**Auditor:** Cline  
**Scope:** `Evolution_Platform` — pre-tokenised marketplace readiness review  
**Context:** Preparing for wallet integration, token marketplace, and production hardening

---

## Executive Summary

The codebase is a **Next.js 16 + React 19** application for a racehorse digital-syndication platform. After 18 months of organic growth, it has **significant security, build hygiene, and architectural debt** that must be addressed before layering crypto/token features. The payment/checkout logic is surprisingly robust, but everything surrounding it — auth, secrets management, testing, and infrastructure — needs hardening.

**Verdict: NOT production-ready for token/wallet hosting without substantial remediation.**

---

## 1. CRITICAL SECURITY ISSUES (Blockers)

### 🔴 CRITICAL: Live Secrets Committed to Git History

**`.env` and `.env.local` are tracked in the repository** despite `.gitignore` entries. They contain unrotated production credentials:

- **AI/LLM:** OpenRouter, Gemini (2 keys), Anthropic, GLM/Zhipu, Kimi, Ollama, HuggingFace, Magic API
- **Infrastructure:** Supabase Service Role Key, N8N License + API Key, Firecrawl, ElevenLabs, FAL
- **Application:** `ADMIN_SECRET_KEY=vp%oXQtKi@Ig28X$M44GJ99VxT$ml&id` (hardcoded in `.env.local`)

**Required actions:**
1. Immediately rotate ALL exposed keys
2. Run `git filter-branch` or use BFG Repo-Cleaner to purge secrets from history
3. Add `.env.*` to `.gitignore` properly
4. Verify no secrets remain in history with `git log --all --full-history -- .env*`

---

### 🔴 CRITICAL: Admin Authentication is a Mock

The admin panel (`/admin`) uses `window.prompt('Enter admin token:')` and stores the token in `sessionStorage`:

- **File:** `src/app/admin/page.tsx` (lines 50, 58, 71, 76, 146)
- `sessionStorage` is **vulnerable to XSS exfiltration**
- No rate limiting on `/api/admin` — brute-forceable
- No role-based access control (RBAC)
- Admin API returns **mock data only** — not connected to real database

**For token/wallet hosting:** This must be replaced with proper NextAuth sessions, JWT verification, and RBAC before any sensitive operations are possible.

---

### 🔴 CRITICAL: Zero Security Headers in next.config.ts

Current `next.config.ts`:
```ts
const nextConfig: NextConfig = {
  experimental: {},
};
```

**Missing entirely:**
- Content Security Policy (CSP) — **essential for preventing XSS when handling wallet interactions**
- `X-Frame-Options` / `X-Content-Type-Options` / `Referrer-Policy`
- HSTS (for HTTPS enforcement)
- CORS configuration for API routes
- `images.domains` / `images.remotePatterns` (will break Next.js Image optimization)

---

### 🔴 HIGH: 15 npm Audit Vulnerabilities (8 High, 7 Moderate)

Notable vulnerable packages in direct dependencies:
- `cheerio` — DOM parsing, could be attack surface
- `stripe` — payment library with known moderate issues
- `next-auth` — auth library (check if high-severity)

Run `npm audit fix` and review remaining issues manually.

---

### 🟡 HIGH: No middleware.ts for Route Protection

There is **no `middleware.ts`**. This means:
- `/admin` is accessible to everyone (only "protected" by client-side prompt)
- `/api/*` routes have no rate limiting or CORS enforcement
- No bot protection on checkout/admin endpoints

---

### 🟡 HIGH: No Content Security Policy

With wallet integrations, you'll be handling `window.ethereum`, injected scripts, and iframe embeds. A CSP is **non-negotiable**. Current state: completely absent.

---

### 🟡 MEDIUM: localStorage/sessionStorage Used for Secrets

7 instances of `localStorage`/`sessionStorage` access in source code. Beyond the admin token, check if any other tokens or sensitive data is stored client-side.

---

## 2. BUILD TOOLCHAIN & DEPENDENCIES

### ❌ React 19 with React 18 Type Definitions

`package.json`:
```json
"react": "^19.2.1",
"react-dom": "^19.2.1",
"@types/react": "^18",
"@types/react-dom": "^18"
```

**Type mismatch.** Upgrade `@types/react` to v19 or downgrade React. Mismatched types will cause silent bugs and broken intellisense.

---

### ❌ autoprefixer in dependencies (not devDependencies)

`autoprefixer` and `postcss` are in `dependencies` — they should be `devDependencies`. This bloats the production bundle.

---

### ❌ Unused ESLint Packages

`@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` are installed but **not referenced in `.eslintrc.json`**. The ESLint config only extends `next/core-web-vitals` and `next/typescript`.

**`.eslintrc.json`:**
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}
```

This is extremely minimal. Missing:
- Security rules (`eslint-plugin-security`)
- React hooks exhaustive-deps checking
- Accessibility rules (`eslint-plugin-jsx-a11y`)

---

### ⚠️ TypeScript Not Fully Strict

`tsconfig.json`:
```json
"strict": true
```

✅ Strict mode is enabled, which is good. But:
- No `exactOptionalPropertyTypes`
- No `noUncheckedIndexedAccess`
- `paths` aliases not configured (only baseUrl: ".")

---

### ⚠️ Vitest Config is Minimal

```ts
export default defineConfig({
  test: { environment: 'jsdom' },
});
```

No coverage thresholds, no setup files, no reporters. Only **1 test file** exists in the entire project (`src/lib/marketplace-release-stage.test.ts` — 33 lines).

**Test coverage: effectively zero.** Critical untested paths:
- Checkout amount validation
- Stripe webhook signature verification
- Admin authentication
- All API routes

---

## 3. SEO ASSESSMENT

### ❌ Sitemap is Incomplete

`src/app/sitemap.ts` only lists 3 routes:
- `/` (priority 1.0)
- `/press` (priority 0.5)
- `/marketplace` (conditional)

**Missing:**
- `/mystable`
- `/updates/*` (dynamic update pages)
- `/marketplace/[slug]` (listing pages)
- `/terms`, `/privacy`
- `/demo`
- No `lastModified` values (uses `new Date()` on every build)

---

### ❌ No Dynamic OpenGraph Images

No `opengraph-image.tsx` or `twitter-image.tsx` found. Social sharing will use default metadata only.

---

### ❌ No Web App Manifest

No `manifest.json` or `manifest.ts`. No PWA support.

---

### ⚠️ robots.ts Missing /admin Disallow

```ts
Disallow: ['/api/', '/auth']
```

`/admin` is not disallowed — admin panel URL is discoverable by crawlers.

---

### ⚠️ SEO Documentation is Fragmented

Multiple overlapping SEO docs exist:
- `SEO_AUDIT_REPORT.md`
- `SEO_CHECKLIST.md`
- `SEO_GUIDE.md`
- `SEO_SUMMARY.md`

These appear to be **ad-hoc notes** rather than a living audit. No evidence they're kept current with code changes.

---

### ✅ Good SEO Practices Found

- Root layout has comprehensive `<Metadata>` with OpenGraph and Twitter cards
- `metadataBase` is set to `https://evolutionstables.nz`
- `viewport` export is properly separated
- JSON-LD structured data present for Organization and Articles
- `robots.ts` and `sitemap.ts` use the correct Next.js App Router APIs

---

## 4. PERFORMANCE & MODERN WEB STANDARDS

### 🔴 108MB Public Folder with Unoptimized Assets

**25 files > 1MB**, including:
- `Jockey-walk-out.mp4` (video)
- Multiple `marketplace/first-gear-*.png` images
- Press article logos (PNG, not SVG)
- Update images (`Prudentia_18April_4k.png`)

**No Next.js Image optimization** — `next.config.ts` doesn't configure `images.domains` or `images.remotePatterns`.

---

### 🔴 Potential Memory Leak: PressShowcase Timer Cascade

`src/components/site/PressShowcase.tsx` (line 108):
```tsx
useEffect(() => { /* setTimeout that updates startIndex */ }, [startIndex]);
```

`startIndex` is both state and a dependency. Every timer update triggers a new effect, scheduling another timer. **Timers can overlap and cascade.**

---

### 🟡 Animation Libraries Used Heavily

- **GSAP** + **Framer Motion** both imported
- `AnimatedText.tsx`, `WaveText.tsx` use recursive `setTimeout` patterns
- No `prefers-reduced-motion` checks found

**For token/wallet UI:** Heavy animations can cause jank during crypto transaction signing. Consider reducing or making optional.

---

### 🟡 No Resource Preloading Strategy

`layout.tsx` preloads only one font file:
```tsx
<link rel="preload" href="/fonts/GeistSans-VFItalic.woff2" as="font" />
```

Missing:
- Preload for non-italic variant
- Preconnect for external domains (Stripe, Supabase, etc.)
- DNS-prefetch hints

---

## 5. CODE QUALITY & ARCHITECTURE

### ❌ No Radix Primitives Actually Used (Despite Being Installed)

Installed: `@radix-ui/react-slot`, `@radix-ui/react-icons`

But UI components are **custom-built**:
- `Modal.tsx` — custom z-index stacking (`z-[9999]`), no focus trapping, no Radix Dialog
- `Accordion.tsx` — native `<details>`, not Radix Accordion
- `Badge.tsx`, `Card.tsx` — simple custom components

**For a design system:** Either commit to Radix primitives (recommended for accessibility) or remove the unused dependency.

---

### ❌ Custom Modal Accessibility Issues

`src/components/ui/Modal.tsx`:
- No focus trapping
- No `Escape` key handler
- No `aria-modal` or `aria-labelledby`
- No body scroll lock management

**This will fail accessibility audits and confuse screen reader users.**

---

### ⚠️ 15 console.log/console.error Statements in Source

Production code should not log to console. These can leak sensitive data in production builds.

---

### ⚠️ `dangerouslySetInnerHTML` Used (3 instances)

While `markdown-to-jsx` is the primary renderer, any `dangerouslySetInnerHTML` is an XSS vector if content is ever user-controlled.

---

### ✅ Good Patterns Found

- **Checkout amount validation is thorough** — server-side recalculation, epsilon-based step validation, metadata checks
- **Stripe webhook signature IS verified** using `stripe.webhooks.constructEvent()`
- **Type safety is generally strong** — only 1 `any` found in entire source
- **No `eval()` or `Function()`** usage
- **No `@ts-ignore` or `@ts-expect-error`** usage

---

## 6. TOKEN/WALLET HOSTING READINESS

### Blockers for Crypto Integration

| Requirement | Current State | Gap |
|-------------|-------------|-----|
| CSP for inline scripts | ❌ Missing | Must implement before any wallet SDK injection |
| Secure secret storage | ❌ .env in git | Must purge + use vault/Secrets Manager |
| Route protection (middleware) | ❌ None | Need auth guards on `/mystable`, `/wallet`, `/admin` |
| Rate limiting | ❌ None | API routes vulnerable to abuse |
| Session management | ⚠️ NextAuth v4 | Consider upgrading to v5 (Auth.js) for better JWT handling |
| Database layer | ⚠️ Supabase config unclear | Need verified RLS policies before storing wallet data |
| Error boundaries | ⚠️ Basic only | Need granular error handling for tx failures |
| Testing | ❌ 1 test file | Must add integration tests for wallet flows |

---

## Prioritized Remediation Plan

### Phase 1: Security Lockdown (Before ANY Token Work)

1. **Rotate all secrets** and purge from git history
2. **Remove `.env` and `.env.local` from tracking** — use proper secret management (Vercel env vars, AWS Secrets Manager, or 1Password)
3. **Implement `middleware.ts`** for route protection and rate limiting
4. **Add security headers to `next.config.ts`** — CSP, HSTS, X-Frame-Options, etc.
5. **Fix npm audit vulnerabilities** — `npm audit fix`, then manual review
6. **Replace admin `sessionStorage` auth** with proper NextAuth session + RBAC

### Phase 2: Build Hygiene

7. **Fix React type mismatch** — align `@types/react` with React 19
8. **Move build deps to `devDependencies`** (autoprefixer, postcss)
9. **Strengthen ESLint config** — add security, a11y, and hooks rules
10. **Add Vitest coverage thresholds** — aim for 60% on API routes, 40% on components
11. **Write tests for critical paths** — checkout, webhooks, auth, admin

### Phase 3: SEO & Performance

12. **Complete the sitemap** — include all dynamic routes with proper `lastModified`
13. **Add dynamic OG images** for updates and marketplace listings
14. **Add `manifest.ts`** for PWA support
15. **Optimize public assets** — convert PNGs to WebP/AVIF, compress videos
16. **Configure `images.remotePatterns`** in `next.config.ts`
17. **Fix PressShowcase timer cascade** and add `prefers-reduced-motion` checks

### Phase 4: Architecture for Token Features

18. **Replace custom Modal with Radix Dialog** (or remove Radix entirely)
19. **Add proper error boundaries** for wallet transaction flows
20. **Implement API rate limiting** (Redis-based or Vercel KV)
21. **Add request logging and monitoring** (Vercel Analytics, LogRocket, or similar)
22. **Document the architecture** — update README with deployment, auth, and wallet integration patterns

---

## Files Referenced in This Audit

- `next.config.ts`
- `package.json`
- `tsconfig.json`
- `.eslintrc.json`
- `vitest.config.ts`
- `tailwind.config.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/admin/page.tsx`
- `src/app/api/admin/route.ts`
- `src/app/api/checkout/route.ts`
- `src/app/api/stripe-webhook/route.ts`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/components/ui/Modal.tsx`
- `src/components/site/PressShowcase.tsx`
- `src/components/ui/AnimatedText.tsx`
- `src/components/ui/WaveText.tsx`

---

*End of Audit*