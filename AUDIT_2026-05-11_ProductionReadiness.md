# Evolution Platform — Production Readiness Audit

**Date:** 2026-05-11
**Auditor:** Claude
**Scope:** Full codebase — security, architecture, build health, test coverage, SEO, deployment readiness
**Previous audit:** `AUDIT_2026-04-27_TokenReadiness.md`

---

## Executive Summary

The codebase has made significant progress since the April 2026 audit. Security headers, middleware, database layer, SSOT sync, and Stripe/Openfort/token integrations are all standing. The build compiles cleanly with zero TypeScript errors (outside the test directory).

**However, three critical discrepancies exist between the GAME_PLAN's claimed architecture and the actual code.** The KYC flow still uses Didit (not Stripe Identity), NextAuth is v4 (not v5), and admin auth remains a client-side mock. These are not cosmetic — they directly impact production readiness for token/wallet operations.

**Verdict: NOT production-ready. Phase 3 claims to be "Complete" but contains fabricated migration dates. Fix the three critical discrepancies before proceeding to Phase 4.**

---

## 1. CRITICAL DISCREPANCIES: GAME_PLAN vs Reality

### 🔴 KYC: Didit, Not Stripe Identity

**GAME_PLAN claim** (row 49): "KYC: Stripe Identity (fully automated) — Migrated from Didit on 2026-05-05"

**Reality:** All KYC code still uses Didit:
- `src/app/api/kyc/session/route.ts` — calls `https://verification.didit.me/v3/session/`, uses `DIDIT_API_KEY` and `DIDIT_WORKFLOW_ID`
- `src/app/api/kyc/callback/route.ts` — verifies `x-didit-signature` header, uses `verifyDiditSignature()`
- `src/lib/db/schema.sql` (line 63): `provider TEXT DEFAULT 'didit'`
- CSP in `next.config.ts` still allows `https://*.didit.me`

**No Stripe Identity code exists anywhere in the codebase.**

### 🔴 NextAuth v4, Not v5

**GAME_PLAN claim** (row 45): "Auth: NextAuth v5 + RBAC"

**Reality:** `package.json` has `"next-auth": "^4.24.13"`. Source uses NextAuth v4 APIs:
- `src/lib/auth.ts` imports from `next-auth` (not `@auth/core` or `next-auth/v5`)
- Uses `NextAuthOptions` type (v4), `getServerSession` (v4)
- `src/middleware.ts` imports `getToken` from `next-auth/jwt` (v4 path)

### 🔴 Admin Auth Still Mock

**GAME_PLAN claim:** Phase 1.6 "Replace admin sessionStorage auth with proper NextAuth session + RBAC" (checked as done)

**Reality:** `src/app/admin/page.tsx` still uses:
- `window.prompt('Enter admin token:')` (line 50)
- `sessionStorage.setItem('admin_token', token)` (line 58)
- No RBAC, no NextAuth session check on page load
- The middleware.ts does gate `/admin` paths, but the page itself is still mock

---

## 2. WHAT WAS FIXED (Since April 2026 Audit)

| April Finding | Current State |
|---|---|
| Zero security headers | ✅ CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured |
| No middleware.ts | ✅ Middleware with route guards + rate limiting |
| Minimal ESLint (2 extends) | ✅ eslint.config.mjs with security, a11y, react-hooks, no-console rules |
| Zero test infrastructure | ✅ Vitest with 40% coverage thresholds, Playwright configured |
| No database layer | ✅ SQLite with WAL mode, full schema, query layer |
| No SSOT integration | ✅ Sync engine with fs.watch + manual trigger + API endpoint |
| No token/wallet code | ✅ viem-based mint API, Openfort embedded wallets |
| robots.txt missing /admin | ✅ Now disallows /admin, /mystable, /auth |
| Secrets tracked in git | ✅ `.env` is symlink to `/home/evo/.env`, `.env.local` in .gitignore |

---

## 3. SECURITY ASSESSMENT

### ✅ Resolved
- Security headers configured in `next.config.ts`
- Middleware route protection with JWT verification
- Rate limiting on API routes (100 req/min, in-memory)
- Stripe webhook signature verification (both legacy and v3.2)
- Admin API uses `x-admin-token` header (though still mock auth)

### 🔴 Remaining
- **.env.local still exists** with 59 lines including Supabase service role key, Gemini API keys, N8N license key, admin secret key. These are the same unrotated credentials flagged in April.
- **`ADMIN_SECRET_KEY=vp%oXQtKi@Ig28X$M44GJ99VxT$ml&id`** still present
- **CSP uses `'unsafe-eval'` and `'unsafe-inline'`** — weakens protection against XSS
- **CSP connect-src references Didit** (deprecated) — missing Stripe Identity origins
- **Dev bypass in checkout webhook** — `x-dev-bypass` header skips signature verification
- **Dev bypass in KYC callback** — allows unsigned payloads in non-production

### 🟡 ESLint Status
- 0 errors, 55 warnings
- Most warnings are `no-console` (legitimate logging in API routes) and a few unused vars
- 1 `security/detect-object-injection` in `TypeWriter.tsx` — low risk
- 1 `@typescript-eslint/no-explicit-any` in `useInterest.ts` — low risk

---

## 4. BUILD HEALTH

### TypeScript
- **Source code: 0 errors** — clean compilation
- **E2E tests: 3 errors** — `@playwright/test` module not found (vitest shouldn't be picking up E2E tests)

### npm Audit
- **3 moderate vulnerabilities** — all PostCSS XSS via the `next` → `postcss` chain
- Not directly fixable (requires Next.js downgrade to 9.x)
- PostCSS 8.5.10+ fixes it; waiting on Next.js to bump

### Dependencies
| Issue | Status |
|---|---|
| `@types/react: ^18` with React 19 | 🟡 Still mismatched |
| `autoprefixer` in dependencies | 🟡 Should be devDependencies |
| `next-auth: ^4.24.13` | 🔴 GAME_PLAN says v5 |
| Radix packages installed, unused | 🟡 `@radix-ui/react-slot` is used by shadcn but `@radix-ui/react-icons` may be redundant |

---

## 5. TEST COVERAGE

### Unit Tests
- **1 test file:** `src/lib/marketplace-release-stage.test.ts` — 3 tests
- **Source files:** 141 `*.ts/*.tsx` files
- **Coverage: effectively zero**

### E2E Tests
- **1 test file:** `tests/e2e/marketplace.spec.ts` — 2 tests (browse marketplace, route protection)
- **Broken in vitest** — `@playwright/test` imports fail; vitest config doesn't exclude `tests/e2e/`
- Playwright should be run separately via `npx playwright test`

### Coverage Thresholds
- Configured at 40% (statements, branches, functions, lines)
- Excludes `src/app/**` and `src/components/ui/**` from coverage
- Current actual coverage far below thresholds

---

## 6. ROUTE INVENTORY

### New (v3.2) Routes
| Route | Type | Status |
|---|---|---|
| `/api/checkout` | POST | ✅ Real Stripe integration |
| `/api/checkout/webhook` | POST | ✅ Signature verification, auto-mint trigger |
| `/api/tokens/mint` | POST | ✅ viem on-chain + mock fallback |
| `/api/kyc/session` | POST | 🔴 Still Didit, not Stripe Identity |
| `/api/kyc/callback` | POST | 🔴 Didit webhook handler |
| `/api/marketplace/sync` | POST | ✅ SSOT sync endpoint |
| `/marketplace` | Page | 🟡 Delegates to LegacyMarketplacePage |
| `/marketplace/[slug]` | Page | ✅ Dynamic listing detail |
| `/mystable` | Page | 🟡 Still placeholder/legacy |
| `/admin` | Page | 🔴 Mock auth, not connected to real data |

### Legacy Routes (still active)
| Route | Conflict? |
|---|---|
| `/api/stripe-webhook` | 🟡 Duplicate — `/api/checkout/webhook` is the v3.2 version |
| `/marketplace/legacy` | 🟡 Old marketplace code still shipped |
| `/mystable/legacy` | 🟡 Old mystable code still shipped |

---

## 7. SEO STATUS

### ✅ Good
- `metadataBase` set to production URL
- robots.ts properly disallows `/api/`, `/auth`, `/mystable`, `/admin`
- sitemap.ts uses App Router API
- Root layout has OpenGraph/Twitter card metadata
- JSON-LD structured data present

### 🟡 Gaps
- Sitemap only has 5 entries (/, /press, /demo, /updates, /marketplace)
- No `/marketplace/[slug]` entries in sitemap
- No `/terms`, `/privacy` in sitemap
- All entries use `new Date()` — no real `lastModified`
- No opengraph-image.tsx for `/marketplace/[slug]` (exists only at root)
- manifest.ts exists but returns basic placeholder

---

## 8. PERFORMANCE

### 🟡 Public Folder: 108MB
Same size as April audit. No evidence of asset optimization:
- PNGs not converted to WebP/AVIF
- Videos not compressed
- Font files duplicated

### 🟡 Animation Libraries
- GSAP + Framer Motion both loaded
- No `prefers-reduced-motion` checks confirmed
- PressShowcase timer cascade potentially still present (not verified fixed)

---

## 9. ARCHITECTURE DRIFT

The codebase has accumulated **organic drift**:

1. **Two stripe webhook handlers** — legacy (`/api/stripe-webhook`) and v3.2 (`/api/checkout/webhook`) — both active
2. **Two marketplace implementations** — legacy and new, with the new page delegating to the legacy component
3. **Two mystable implementations** — legacy and placeholder
4. **KYC provider mismatch** — code uses Didit, docs claim Stripe Identity
5. **Auth version mismatch** — code uses NextAuth v4, docs claim v5
6. **Mixed API patterns** — some routes use `getServerSession`, others use `getToken` from middleware

---

## 10. PRIORITIZED ACTION LIST

### Before Phase 4 (Dashboard + UI):

1. **🔴 CRITICAL: Actually migrate KYC from Didit to Stripe Identity** (or update GAME_PLAN to reflect reality)
2. **🔴 CRITICAL: Replace admin mock auth** with NextAuth session + RBAC
3. **🔴 CRITICAL: Align NextAuth version** — either upgrade to v5 or update GAME_PLAN
4. **🔴 CRITICAL: Rotate all secrets in .env.local**, delete the file, use only `/home/evo/.env`
5. **🔴 Update CSP** — remove Didit, add Stripe Identity origins (if migrating), remove `unsafe-eval`/`unsafe-inline` if possible

### Phase 4 Prerequisites:

6. **🟡 Fix vitest config** — exclude `tests/e2e/` from vitest
7. **🟡 Fix @types/react version** — upgrade to v19
8. **🟡 Move autoprefixer to devDependencies**
9. **🟡 Write tests for checkout webhook, token mint, KYC callback** (minimum before production)
10. **🟡 Remove duplicate stripe-webhook route** — keep only v3.2 version
11. **🟡 Clean up legacy marketplace/mystable code** — archive or remove

### Deploy Prerequisites:

12. **🟡 Complete sitemap** — add all dynamic listing routes
13. **🟡 Add dynamic OG images** for `/marketplace/[slug]`
14. **🟡 Optimize public assets** — 108MB → under 50MB target
15. **🟡 Reduce console.log statements** — 61 instances, many with sensitive data (tx hashes, user IDs)

---

## 11. COMPARISON: April Audit vs Today

| Metric | April 2026 | May 2026 |
|---|---|---|
| Security headers | ❌ None | ✅ 7 headers |
| Middleware | ❌ None | ✅ Route guards + rate limiting |
| ESLint | ⚠️ 2 extends | ✅ 4 plugins, 55 warnings |
| TypeScript errors | Unknown | 0 in source |
| DB layer | ❌ None | ✅ SQLite + WAL + query layer |
| SSOT sync | ❌ None | ✅ fs.watch + API |
| Stripe checkout | ✅ Working | ✅ Ported + improved |
| Token mint | ❌ None | ✅ viem on-chain + mock fallback |
| Wallet creation | ❌ None | ✅ Openfort integration |
| Unit tests | 1 file, 33 lines | 1 file, 3 tests |
| E2E tests | ❌ None | 1 file, 2 tests |
| Build | Unknown | ✅ Clean |
| KYC provider | Didit | Didit (despite docs) |
| NextAuth version | v4 | v4 (despite docs) |
| Admin auth | Mock | Mock |
| Secrets in repo | Yes | Yes (.env.local) |
| Public folder | 108MB | 108MB |
| Sitemap entries | 3 | 5 |

---

*End of Audit*
