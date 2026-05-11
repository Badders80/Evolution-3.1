
**Status:** 🟢 Phase 3 Complete — Ready for Phase 4 (Dashboard + UI)
**Branch:** `v3.2-clean`  
**Created:** 2026-04-28  
**Last Updated:** 2026-04-28

---

## 📋 How to Use This Document

This is a **living document**. Every commit, architectural decision, blocker, or scope change must be recorded here **before** or **with** the corresponding code change.

> **Rule:** If it's not in the Game Plan, it doesn't exist.

Update this file via the same commit that introduces the change. Use the checklists to track progress.

---

## 🎯 Project Overview

**Goal:** Rebuild the Evolution Platform from the ground up as a production-grade application, leaving all accumulated technical debt behind.

**Scope:**
- `/marketplace` — Tokenized horse syndication listings (SSOT-driven)
- `/mystable` — Investor portfolio dashboard (auth + KYC gated)
- `/admin` — Proper RBAC-protected admin panel
- SEO-first architecture with dynamic OG images
- SSOT_Build integration with automated sync
- Full token lifecycle: browse → KYC → pay → mint → portfolio

**Non-Goals (v3.2):**
- Native mobile app
- Real-time race streaming
- Secondary market / peer-to-peer trading
- Multi-language support

---

## 🏗️ Architecture Decisions (Locked)

| Decision | Choice | Rationale | Date |
|----------|--------|-----------|------|
| Database | **SQLite** (Better SQLite3) | File-based, simple NZ deployment, proven in Evolution_Token | 2026-04-28 |
| Framework | **Next.js 16** + App Router | Server Components for SEO, latest stable | 2026-04-28 |
| Auth | **NextAuth v5** + RBAC | Industry standard, JWT sessions, role-based middleware | 2026-04-28 |
| Styling | **Tailwind CSS** + shadcn/ui | Rapid development, Radix accessibility | 2026-04-28 |
| Blockchain | **Base** (via viem/wagmi) | Low gas (~$0.01-0.05/tx), Coinbase on-ramps, retail-friendly | 2026-04-28 |
| Wallet | **Openfort** (embedded ERC-4337) | Users stay in Web2 mindset, no seed phrases | 2026-04-28 |
| KYC | **Stripe Identity** (fully automated) | Migrated from Didit on 2026-05-05, working webhook flow | 2026-05-05 |
| Payments | **Stripe** (NZD) + on-chain tokens | Dual flow: fiat via Stripe, tokens via contract | 2026-04-28 |
| Token Contracts | **Per-horse ERC-20** | Unique terms per syndicate, deployed via /admin | 2026-04-28 |
| Evolution_Token | **Active development/prototype** | Token validates features → ported to Platform for production | 2026-05-08 |
| Testing | **Vitest** (unit) + **Playwright** (E2E) | Coverage thresholds enforced in CI | 2026-04-28 |
| Hosting | **Current infrastructure** (not Vercel) | Self-managed, NZ-based | 2026-04-28 |
| SSOT Sync | **File system watcher** + manual trigger | SSOT_Build is local FS, not remote API | 2026-04-28 |
| Images | **Copy from SSOT** → optimize → host | 4 images per horse, WebP/AVIF conversion | 2026-04-28 |

---

## 📁 Directory Structure (Target)

```
v3.2-clean/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx
│   │   │   ├── press/
│   │   │   ├── about/
│   │   │   └── layout.tsx
│   │   ├── (marketplace)/
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── opengraph-image.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── mystable/
│   │   │   │   ├── page.tsx
│   │   │   │   └── horse/[id]/
│   │   │   ├── settings/
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   ├── marketplace/
│   │   │   │   ├── listings/route.ts
│   │   │   │   └── sync/route.ts
│   │   │   ├── checkout/
│   │   │   │   ├── route.ts
│   │   │   │   └── webhook/route.ts
│   │   │   ├── tokens/
│   │   │   │   ├── mint/route.ts
│   │   │   │   └── balance/route.ts
│   │   │   ├── kyc/
│   │   │   │   ├── session/route.ts
│   │   │   │   └── webhook/route.ts
│   │   │   └── holdings/route.ts
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── manifest.ts
│   ├── components/
│   │   ├── ui/                    # shadcn/ui primitives
│   │   ├── layout/
│   │   ├── marketplace/
│   │   ├── dashboard/
│   │   └── seo/
│   ├── lib/
│   │   ├── auth/
│   │   ├── db/                    # Better SQLite3
│   │   ├── ssot/                  # SSOT_Build integration
│   │   ├── tokens/                # On-chain interactions
│   │   ├── stripe/
│   │   ├── kyc/
│   │   └── validation/
│   ├── hooks/
│   ├── types/
│   └── styles/
├── scripts/
│   └── sync-ssot.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── [config files]
```

---

## ✅ Phase Checklists

### Phase 1: Foundation + Security (Week 1)

- [x] **1.1** Create `v3.2-clean` branch from clean Next.js 16 scaffold
- [ ] **1.2** Configure TypeScript strict mode + `exactOptionalPropertyTypes` (deferred — 7 type errors to fix)
- [x] **1.3** Configure ESLint with security, a11y, and hooks rules
- [x] **1.4** Configure Husky pre-commit hooks (lint + type-check + test)
- [x] **1.5** Implement `middleware.ts` with route guards
  - [x] Protect `/mystable` and `/mystable/*` — require auth
  - [x] Protect `/admin` and `/admin/*` — require admin role
  - [x] Rate limiting on `/api/*` routes
- [x] **1.6** Configure security headers in `next.config.ts`
  - [x] Content Security Policy (CSP)
  - [x] HSTS
  - [x] X-Frame-Options
  - [x] X-Content-Type-Options
  - [x] Referrer-Policy
  - [x] Permissions-Policy
- [x] **1.7** Fix npm audit vulnerabilities (documented — 6 upstream vulnerabilities in dependencies, no direct fixes available; monitored via `npm audit`)
- [x] **1.8** Set up Vitest with coverage thresholds (60% API, 40% components)
- [x] **1.9** Set up Playwright with critical flow tests
- [x] **1.10** Configure image optimization (WebP/AVIF, remotePatterns)

**Phase 1 Owner:** TBD  
**Phase 1 Target:** 2026-05-05

---

### Phase 2: Database + SSOT Integration (Week 2)

- [x] **2.1** Port SQLite schema from Evolution_Token
  - [x] `users` table
  - [x] `listings` table (JSON blob for flexibility)
  - [x] `holdings` table
  - [x] `kyc_sessions` table
- [x] **2.2** Create type-safe DB query layer
  - [ ] `lib/db/queries/users.ts` (placeholder — Phase 4)
  - [x] `lib/db/queries/listings.ts`
  - [x] `lib/db/queries/holdings.ts`
  - [ ] `lib/db/queries/kyc.ts` (placeholder — Phase 3)
- [x] **2.3** Build SSOT sync engine (`lib/ssot/`)
  - [x] `types.ts` — SSOT type definitions
  - [x] `transformer.ts` — SSOT → Listing mapping
  - [x] `sync.ts` — Sync orchestrator with fs.watch + manual trigger
- [x] **2.4** Build SSOT webhook endpoint (`api/marketplace/sync`)
  - [x] POST endpoint accepts optional sourcePath
  - [x] Transform and validate data
  - [x] Upsert to SQLite
  - [ ] Revalidate Next.js cache (deferred — Next.js version compatibility)
- [x] **2.5** Create `scripts/seed-db.ts` — seed from static JSON
- [ ] **2.6** Port and optimize image copy from SSOT_Build (deferred — Sharp pipeline, Phase 4)
- [x] **2.7** Build marketplace browse page (`/marketplace`) — ✅ live grid with real listings
- [x] **2.8** Build marketplace detail page (`/marketplace/[slug]`) — ✅ live detail with offering data

**Phase 2 Owner:** Cline  
**Phase 2 Target:** 2026-05-12

---

**Placeholder Decision:** `/marketplace` and `/mystable` UI pages remain as Coming Soon placeholders. The underlying data layer (SQLite + SSOT sync) is production-ready. Pages will be wired to the DB layer in Phase 4 when UI components are built.

**HLT Term Sheet / Horse Listing:** ✅ Hottathanafantasy NZ02 listing created as the single-horse test slug for full tokenisation validation. Status: `ready_to_publish` pending human approval. Document placeholders created for HLT Term Sheet, PDS, and Syndicate Agreement.

---

### Phase 3: Payments + Token Integration (Week 3)

- [x] **3.1** Port Stripe checkout API (`api/checkout`)
  - [x] Session creation with NZD
  - [x] Metadata for webhook handling
  - [x] Billing address collection
- [x] **3.2** Port Stripe webhook handler (`api/checkout/webhook`)
  - [x] Signature verification
  - [x] Create holding (status: "paid")
  - [x] Trigger token mint (if KYC verified + wallet exists)
- [x] **3.3** Port token mint API (`api/tokens/mint`)
  - [x] KYC verification check
  - [x] Admin wallet approval + transfer via viem on Base Sepolia
  - [x] Update holding status to "minted"
  - [x] Return txHash
- [x] **3.4** Port KYC flow
  - [x] Stripe Identity session creation (`api/kyc/session`)
  - [x] KYC webhook handler (`api/kyc/callback`)
  - [x] Update user KYC status + auto-create Openfort wallet
- [ ] **3.5** Integrate wagmi + wallet connection (deferred — Phase 4 UI)
  - [ ] WalletConnect + MetaMask support
  - [ ] Network switching (Base)
- [ ] **3.6** Build purchase flow UI (deferred — Phase 4 UI)
  - [ ] "Buy Shares" modal
  - [ ] Token quantity selector
  - [ ] Payment method selection (Stripe vs. wallet)
  - [ ] KYC status check before purchase
- [ ] **3.7** Build token balance API (`api/tokens/balance`) (deferred — Phase 4)
  - [ ] On-chain balance check
  - [ ] Portfolio aggregation

**Phase 3 Owner:** TBD  
**Phase 3 Target:** 2026-05-19

---

### Phase 4: Dashboard + SEO + Testing (Week 4)

- [ ] **4.1** Build MyStable dashboard (`/mystable`)
  - [ ] Portfolio summary
  - [ ] Active stakes list
  - [ ] Performance metrics
  - [ ] Quick actions
- [ ] **4.2** Build horse detail view (`/mystable/horse/[id]`)
  - [ ] Horse profile (from SSOT)
  - [ ] Token ownership details
  - [ ] Performance history
- [ ] **4.3** Build settings page (`/mystable/settings`)
  - [ ] Profile management
  - [ ] KYC status display
  - [ ] Wallet connection management
- [ ] **4.4** Build admin panel (`/admin`)
  - [ ] Listing management (CRUD)
  - [ ] User management
  - [ ] KYC review queue
  - [ ] Sales analytics
- [ ] **4.5** Dynamic OG images
  - [ ] `/marketplace/[slug]/opengraph-image.tsx`
  - [ ] Horse photo + syndicate info
  - [ ] Edge runtime
- [ ] **4.6** Complete sitemap
  - [ ] All static routes
  - [ ] All dynamic listing routes
  - [ ] `lastModified` from SSOT update time
- [ ] **4.7** Web app manifest (`manifest.ts`)
- [ ] **4.8** Structured data enhancements
  - [ ] Product schema per listing
  - [ ] Horse schema
  - [ ] Organization schema
  - [ ] BreadcrumbList
- [ ] **4.9** Integration tests
  - [ ] Checkout flow
  - [ ] Token mint flow
  - [ ] KYC flow
  - [ ] Auth flow
- [ ] **4.10** E2E tests
  - [ ] Browse marketplace → view listing → purchase
  - [ ] KYC verification → wallet connection → portfolio view
  - [ ] Admin: review KYC → approve → user can purchase
- [ ] **4.11** Document acknowledgement checkboxes in purchase flow
  - [ ] "I have read and agree to the Product Disclosure Statement (PDS)"
  - [ ] "I have read and agree to the Syndicate Agreement"
  - [ ] "I have read and agree to the HLT Term Sheet"
  - [ ] All 3 must be ticked before "Proceed to Payment" is enabled
  - [ ] Acknowledgements recorded on holding record (`documentAcknowledgements` JSON)
- [ ] **4.12** Hottathanafantasy end-to-end tokenisation test (single-horse slug)
  - [ ] Listing appears on `/marketplace` (status: `ready_to_publish`)
  - [ ] Listing detail page renders at `/marketplace/hottathanafantasy`
  - [ ] "Buy Shares" flow initiates Stripe checkout
  - [ ] Webhook creates holding with `status: "paid"`
  - [ ] KYC check gates token mint
  - [ ] Token mint API returns `status: "minted"` + txHash
  - [ ] Holding appears in `/mystable` portfolio
  - [ ] Edge cases: insufficient KYC, max stake exceeded, sold out

**Phase 4 Owner:** TBD  
**Phase 4 Target:** 2026-05-26

---

## 🔄 Migration & Cutover

### Phase 5: Staging + Testing (Week 5)

- [ ] **5.1** Deploy v3.2-clean to staging environment
- [ ] **5.2** Run full E2E test suite
- [ ] **5.3** Performance audit (Lighthouse 90+ target)
- [ ] **5.4** Security audit (re-run npm audit, CSP testing)
- [ ] **5.5** Migrate production SQLite database to new schema
- [ ] **5.6** Verify SSOT sync in staging
- [ ] **5.7** Load testing (simulate 100 concurrent users)

### Phase 6: Production Cutover (Week 6)

- [ ] **6.1** Feature-flag: 10% traffic to v3.2-clean
- [ ] **6.2** Monitor: error rates, conversion, token mints, page speed
- [ ] **6.3** Ramp: 25% → 50% → 100% over 3 days
- [ ] **6.4** Rollback plan: instant DNS switch to v3.1
- [ ] **6.5** Archive v3.1 branch
- [ ] **6.6** Update SSOT_Build to point to new platform

---

## 🚧 Blockers & Risks

| Risk | Impact | Mitigation | Status |
|------|--------|-----------|--------|
| SSOT_Build schema changes | High | Versioned transformer, validation with Zod | 🟡 Monitoring |
| Token contract mainnet deployment | High | Verify contract address, test on Sepolia first | 🟡 Pending |
| KYC provider (Stripe Identity) rate limits | Medium | Implement request caching, fallback queue | 🟡 Pending |
| Image optimization pipeline | Medium | Sharp-based script, run at build time | 🟡 Pending |
| Concurrent DB writes (SQLite) | Low | WAL mode, file locks, queue writes | 🟢 Mitigated |

---

## 📊 Progress Tracking

### Current Phase: Phase 3 Complete — Ready for Phase 4 (Dashboard + UI)

| Task | Status | Owner | Commit |
|------|--------|-------|--------|
| SQLite schema (users, listings, holdings, kyc) | ✅ Done | Cline | — |
| DB connection + WAL mode | ✅ Done | Cline | — |
| Query layer (listings, holdings) | ✅ Done | Cline | — |
| SSOT types + transformer | ✅ Done | Cline | — |
| SSOT sync engine (watch + manual) | ✅ Done | Cline | — |
| API endpoint `/api/marketplace/sync` | ✅ Done | Cline | — |
| Seed script from static JSON | ✅ Done | Cline | — |
| `/marketplace` placeholder retained | ✅ Done | Cline | — |
| `/mystable` placeholder retained | ✅ Done | Cline | — |
| Hottathanafantasy listing data + images + docs | ✅ Done | Cline | — |
| Hottathanafantasy seeded to SQLite | ✅ Done | Cline | — |

---

## 📝 Change Log

| Date | Commit | Change | Author |
|------|--------|--------|--------|
| 2026-04-28 | — | Initial Game Plan created | Cline |
| 2026-05-08 | — | Architecture decisions locked: SQLite, NextAuth v5, Stripe Identity, Stripe, Base | Cline |
| 2026-04-28 | `71d9206e` | Phase 1: Foundation + Security — ESLint, Husky, middleware, headers, Vitest, Playwright, npm audit, NextAuth v5 assessment | Cline |
| 2026-04-28 | `79ec3e36` | Phase 2: Database + SSOT Integration — SQLite schema, query layer, SSOT sync engine, API endpoint, seed script | Cline |
| 2026-05-08 | `0b53dea9` | docs: Lock Phase 3 architecture — Base chain, Openfort wallets, per-horse ERC-20, Stripe Identity KYC | Cline |
| 2026-05-08 | `6f59777f` | Phase 3: Payments + Token Integration — Stripe checkout/webhook, Stripe Identity KYC, token mint via viem on Base, Openfort wallets | Cline |
| 2026-04-28 | `366ae301` | Phase 4 start: Replace marketplace placeholders with live listing grid + detail pages | Cline |
| 2026-04-28 | — | Add Hottathanafantasy NZ02 listing — single-horse test slug for tokenisation validation; placeholder images + document structure | Cline |

---

## 🔗 Related Documents

- `AUDIT_2026-04-27_TokenReadiness.md` — Previous audit findings
- `PERFORMANCE_OPTIMIZATION.md` — Current performance state
- `SEO_AUDIT_REPORT.md` — SEO requirements
- Evolution_Token repo: `/home/evo/workspace/projects/Evolution_Token`
- SSOT_Build repo: `/home/evo/workspace/projects/SSOT_Build`

---

**Next Action:** Continue Phase 4 — Build MyStable dashboard (`/mystable`) + purchase flow UI (or proceed with Hottathanafantasy tokenisation test: human approval → status `live` → end-to-end purchase + mint validation)
**Updated by:** Cline  
**Last update:** 2026-04-28