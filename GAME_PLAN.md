**Status:** 🟡 Phase 4 In Progress — SEO Foundation Complete, Auth + KYC + Purchase Flow Complete  
**Next Priority:** v0 Database-First Launch (ship `v3.2-clean` to main)  
**Branch Strategy:** `v3.2-clean` (database-only) → `v3.2-tokenized` (Base on-chain) when ready  
**Branch:** `v3.2-clean`  
**Created:** 2026-04-28
**Last Updated:** 2026-04-30

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

## 🚀 Go-to-Market Strategy

### Branch Strategy

We maintain **two parallel branches**. They are identical except for the tokenization layer.

| Branch | Purpose | When to Use |
|--------|---------|-------------|
| `v3.2-clean` | Database-only holdings. No blockchain. | Ship v0 immediately. |
| `v3.2-tokenized` | Everything in `v3.2-clean` + on-chain tokens on Base. | When tokenization is ready. |

**Rule:** `v3.2-tokenized` is always rebased on `v3.2-clean`. Any bug fix, UI improvement, auth change, or SEO update goes to `v3.2-clean` first, then merged into `v3.2-tokenized`.

**Why two branches?**
- v0 ships now. No blockchain dependency. No gas. No wallet friction.
- v1 adds tokens behind the scenes. Same UX, but holdings are on-chain.
- If tokenization hits a blocker, v0 keeps shipping.
- If tokenization is ready early, we cut over to `v3.2-tokenized` instantly.

### v0: Database-First Launch (Ship Now)

**Goal:** Investors can browse, KYC, pay via Stripe, and see holdings in `/mystable`.
No blockchain. No wallets. No gas.

**What the investor sees:**
- Browse horses → click "Buy Shares" → Stripe checkout → done
- `/mystable` shows: "You own 2 shares of Hottathanafantasy (0.5%)"
- No MetaMask. No gas. No wallet. Just a login and a dashboard.

**v0 Exit Criteria:**
- [ ] Document acknowledgement checkboxes block purchase (4.11)
- [ ] SSOT_Build → Platform sync fixed (seed.json leases, marketplace.json export)
- [ ] `v3.2-clean` merged to `main` branch
- [ ] Hottathanafantasy status → `live`
- [ ] Admin can toggle listing status (draft → ready → live → closed)

### v1: Base Tokenization (Immediate Follow-Up)

**Goal:** Same UX, but holdings become on-chain tokens on Base.

**What changes for the investor:** Nothing. Same `/mystable`, same purchase flow.
**What changes behind the scenes:** Holdings are now ERC-20 tokens on Base. `tx_hash` links to Base explorer.

**v1 Exit Criteria:**
- [ ] `HorseLeaseToken.sol` deployed per horse on Base Sepolia → mainnet
- [ ] `token_contract_address` stored per listing in DB
- [ ] Existing holders backfilled from `holdings` table (`status: 'paid'` → on-chain transfer)
- [ ] Openfort wallet created on KYC approval (embedded, user manages nothing)
- [ ] Stripe webhook → on-chain mint → update holdings (`status: 'minted'`)
- [ ] Admin contract deployment UI (`/admin/contracts`)
- [ ] `v3.2-tokenized` rebased on latest `v3.2-clean`, then merged to `main`

---

## 🏗️ Architecture Decisions (Locked)

| Decision | Choice | Rationale | Date |
|----------|--------|-----------|------|
| Database | **SQLite** (Better SQLite3) | File-based, simple NZ deployment, proven in Evolution_Token | 2026-04-28 |
| Framework | **Next.js 16** + App Router | Server Components for SEO, latest stable | 2026-04-28 |
| Auth | **NextAuth v4** + RBAC | Google OAuth active; Email (Resend) built, deferred pending DNS | 2026-04-29 |
| Styling | **Tailwind CSS** + shadcn/ui | Rapid development, Radix accessibility | 2026-04-28 |
| Blockchain | **Base** (via viem/wagmi) | Low gas (~$0.01-0.05/tx), Coinbase on-ramps, retail-friendly | 2026-04-28 |
| Wallet | **Openfort** (embedded ERC-4337) | Users stay in Web2 mindset, no seed phrases | 2026-04-28 |
| KYC | **Didit** (fully automated) | Already integrated, working webhook flow, no manual review queue | 2026-04-28 |
| Payments | **Stripe** (NZD) + on-chain tokens | Dual flow: fiat via Stripe, tokens via contract | 2026-04-28 |
| Token Contracts | **Per-horse ERC-20** | Unique terms per syndicate, deployed via `/admin` | 2026-04-28 |
| Contract Repo | **Consolidated into Platform** | `HorseLeaseToken.sol`, Hardhat, deploy scripts — all in this repo. Evolution_Token archived after port. | 2026-04-29 |
| Branch Strategy | **`v3.2-clean` + `v3.2-tokenized`** | `v3.2-clean` = database-only (ship now). `v3.2-tokenized` = identical + Base tokens (when ready). Rebase tokenized on clean. | 2026-04-29 |
| Evolution_Token | **Archived after port** | Staging repo — all workflows (contracts, deploy, mint) consolidated into Platform | 2026-04-28 |
| Testing | **Vitest** (unit) + **Playwright** (E2E) | Coverage thresholds enforced in CI | 2026-04-28 |
| Hosting | **Current infrastructure** (not Vercel) | Self-managed, NZ-based | 2026-04-28 |
| SSOT Sync | **File system watcher** + manual trigger | SSOT_Build is local FS, not remote API | 2026-04-28 |
| Images | **Copy from SSOT** → optimize → host | 4 images per horse, WebP/AVIF conversion | 2026-04-28 |

---

## 📁 Directory Structure (Target)

```
v3.2-clean/
├── contracts/
│   ├── HorseLeaseToken.sol      # ERC-20 per-horse syndicate token
│   └── lib/                     # OpenZeppelin imports (npm)
├── scripts/
│   ├── deploy-contract.ts       # Hardhat deploy script (per listing)
│   ├── sync-ssot.ts
│   └── seed-db.ts
├── hardhat.config.ts            # Networks: hardhat, baseSepolia, base
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
│   │   ├── tokens/                # On-chain interactions (viem)
│   │   ├── stripe/
│   │   ├── kyc/
│   │   └── validation/
│   ├── hooks/
│   ├── types/
│   └── styles/
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
  - [x] Didit session creation (`api/kyc/session`)
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

- [x] **4.1** Build MyStable dashboard (`/mystable`)
  - [x] Portfolio summary (real holdings from DB)
  - [x] Active stakes list
  - [ ] Performance metrics (deferred — requires on-chain data)
  - [x] Quick actions (marketplace link, KYC CTA)
- [ ] **4.2** Build horse detail view (`/mystable/horse/[id]`)
  - [ ] Horse profile (from SSOT)
  - [ ] Token ownership details
  - [ ] Performance history
- [ ] **4.3** Build settings page (`/mystable/settings`)
  - [ ] Profile management
  - [ ] KYC status display
  - [ ] Wallet connection management
- [x] **4.4** Build admin panel (`/admin`)
  - [ ] Listing management (CRUD)
  - [x] User management (read-only table)
  - [x] KYC review queue (real data from DB)
  - [ ] Sales analytics
- [x] **4.5** Dynamic OG images
  - [x] `/marketplace/[slug]/opengraph-image.tsx`
  - [x] Horse name + price + branding
  - [x] Edge runtime
- [x] **4.6** Complete sitemap
  - [x] All static routes
  - [x] All dynamic listing routes (live + ready_to_publish)
  - [x] `lastModified` from DB `updated_at`
- [x] **4.7** Web app manifest (`manifest.ts`)
- [x] **4.8** Structured data enhancements
  - [x] Product schema per listing (price, availability, properties)
  - [x] Horse schema (NZTR life number, pedigree)
  - [x] Organization + WebSite schema (global)
  - [x] BreadcrumbList (marketplace, press, listing pages)
  - [x] FAQ schema (homepage)
- [x] **4.13** SEO foundation — page-level metadata
  - [x] `generateMetadata` per `/marketplace/[slug]` (unique title, description, OG, Twitter)
  - [x] `loading.tsx` + `error.tsx` for marketplace routes
  - [x] Privacy-aware Google Analytics (DNT-respecting, IP anonymized)
  - [x] `noindex` on `/auth`, `/mystable`, `/admin`
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
  - [x] Listing appears on `/marketplace` (status: `ready_to_publish`)
  - [x] Listing detail page renders at `/marketplace/hottathanafantasy`
  - [x] "Buy Shares" flow initiates Stripe checkout (KYC-gated)
  - [x] Webhook creates holding with `status: "paid"`
  - [x] KYC check gates token mint
  - [x] Token mint API returns `status: "minted"` + txHash
  - [x] Holding appears in `/mystable` portfolio
  - [ ] Edge cases: insufficient KYC, max stake exceeded, sold out

**Phase 4 Owner:** TBD  
**Phase 4 Target:** 2026-05-26

---

### Phase 5: Tokenization Layer (v1 — `v3.2-tokenized` branch)

**Goal:** Port all smart contract infrastructure from Evolution_Token. Add on-chain tokens behind the existing v0 UX. This phase ONLY exists in the `v3.2-tokenized` branch.

**Branch rule:** Start from `v3.2-clean`, create `v3.2-tokenized`, then apply these changes. Never merge tokenized → clean.

- [ ] **5.1** Port `HorseLeaseToken.sol` into `contracts/` directory
  - [ ] Copy contract source + OpenZeppelin dependencies
  - [ ] Add `hardhat.config.ts` with networks: hardhat, baseSepolia, base
  - [ ] Add `@nomicfoundation/hardhat-toolbox-viem` to devDependencies
- [ ] **5.2** Add `token_contract_address` field to `listings` table schema
  - [ ] Migration: `ALTER TABLE listings ADD COLUMN token_contract_address TEXT`
  - [ ] Update `MarketplaceListing` type + `rowToListing` mapper
  - [ ] Update `upsertListing` to persist contract address
- [ ] **5.3** Port deploy scripts from Evolution_Token
  - [ ] `scripts/deploy-contract.ts` — deploy per-horse contract with listing params
  - [ ] Save deployment artifact to `data/deployments/{slug}-{network}-{timestamp}.json`
  - [ ] Update listing DB record with deployed contract address
- [ ] **5.4** Build admin contract deployment UI (`/admin/contracts`)
  - [ ] "Deploy Contract" button per listing (status: `ready_to_publish` or `live`)
  - [ ] Form: confirm network (baseSepolia / base), confirm splits total 100%
  - [ ] Display deployed address + Etherscan link + tx hash
  - [ ] Prevent re-deploy if contract already exists (idempotent)
- [ ] **5.5** Update token mint API (`api/tokens/mint`) to use per-listing contract
  - [ ] Read `token_contract_address` from listing record (not env var)
  - [ ] Fallback to `CONTRACT_ADDRESS` env var for legacy listings
  - [ ] Remove mock mint path once all listings have contract addresses
- [ ] **5.6** Build token balance API (`api/tokens/balance`)
  - [ ] On-chain balance check via viem `balanceOf`
  - [ ] Portfolio aggregation across multiple holdings
- [ ] **5.7** Backfill existing holders
  - [ ] Read `holdings` table where `status = 'paid'`
  - [ ] Call `transfer(admin, investorWallet, amount)` for each
  - [ ] Update holdings row with `tx_hash`, `minted_at`
- [ ] **5.8** Enable Openfort wallets
  - [ ] KYC callback creates embedded wallet if not exists
  - [ ] Store `wallet_address` in `users` table
  - [ ] Investor has a wallet — they just don't need to manage it
- [ ] **5.9** Archive Evolution_Token repo
  - [ ] Final commit: `ARCHIVED — all workflows migrated to Evolution_Platform`
  - [ ] Update README with migration notice + link to new repo

**Phase 5 Owner:** TBD  
**Phase 5 Target:** 2026-06-02

---

### Phase 6: Staging + Testing (Week 6)

- [ ] **6.1** Deploy `v3.2-clean` to staging environment (v0 smoke test)
- [ ] **6.2** Deploy `v3.2-tokenized` to staging environment (v1 smoke test)
- [ ] **6.3** Run full E2E test suite on `v3.2-clean`
- [ ] **6.4** Run tokenization test suite on `v3.2-tokenized`
- [ ] **6.5** Performance audit (Lighthouse 90+ target)
- [ ] **6.6** Security audit (re-run npm audit, CSP testing)
- [ ] **6.7** Migrate production SQLite database to new schema
- [ ] **6.8** Verify SSOT sync in staging
- [ ] **6.9** Load testing (simulate 100 concurrent users)
- [ ] **6.10** Contract deployment test on Base Sepolia
- [ ] **6.11** End-to-end tokenisation test: deploy → purchase → mint → portfolio

**Phase 6 Owner:** TBD  
**Phase 6 Target:** 2026-06-09

---

### Phase 7: Production Cutover (Week 7)

- [ ] **7.1** Decision point: ship `v3.2-clean` (v0) or `v3.2-tokenized` (v1)?
- [ ] **7.2** If v0: Feature-flag 10% traffic to `v3.2-clean`
- [ ] **7.3** If v1: Rebase `v3.2-tokenized` on latest `v3.2-clean`, then feature-flag 10%
- [ ] **7.4** Monitor: error rates, conversion, token mints, page speed
- [ ] **7.5** Ramp: 25% → 50% → 100% over 3 days
- [ ] **7.6** Rollback plan: instant DNS switch to v3.1
- [ ] **7.7** Archive v3.1 branch
- [ ] **7.8** Update SSOT_Build to point to new platform

**Phase 7 Owner:** TBD  
**Phase 7 Target:** 2026-06-16

---

## 🚧 Blockers & Risks

| Risk | Impact | Mitigation | Status |
|------|--------|-----------|--------|
| SSOT_Build schema changes | High | Versioned transformer, validation with Zod | 🟡 Monitoring |
| Token contract mainnet deployment | High | Port contract + Hardhat into Platform; admin deploy from dashboard; test on Sepolia first | 🟡 In Progress (Phase 5, `v3.2-tokenized` branch) |
| Evolution_Token dual-repo dependency | High | Consolidate all workflows into Platform; archive Evolution_Token | 🟡 In Progress (Phase 5, `v3.2-tokenized` branch) |
| v0 launch delay | High | Ship `v3.2-clean` now. Tokenization is a layer, not a blocker. | 🟢 Mitigated (branch strategy) |
| KYC provider (Didit) rate limits | Medium | Implement request caching, fallback queue | 🟡 Pending |
| Image optimization pipeline | Medium | Sharp-based script, run at build time | 🟡 Pending |
| Concurrent DB writes (SQLite) | Low | WAL mode, file locks, queue writes | 🟢 Mitigated |
| Email auth DNS verification | Low | MiStables to add 3 Route 53 records; Google OAuth active as fallback | 🟡 Pending |

---

## 📊 Progress Tracking

### Current Phase: Phase 4 In Progress — Auth + KYC + Purchase Flow Complete

| Task | Status | Owner | Commit |
|------|--------|-------|--------|
| SQLite schema (users, listings, holdings, kyc) | ✅ Done | Cline | — |
| DB connection + WAL mode | ✅ Done | Cline | — |
| Query layer (listings, holdings) | ✅ Done | Cline | — |
| SSOT types + transformer | ✅ Done | Cline | — |
| SSOT sync engine (watch + manual) | ✅ Done | Cline | — |
| API endpoint `/api/marketplace/sync` | ✅ Done | Cline | — |
| Seed script from static JSON | ✅ Done | Cline | — |
| `/marketplace` live grid + detail pages | ✅ Done | Cline | — |
| Hottathanafantasy listing data + images + docs | ✅ Done | Cline | — |
| Hottathanafantasy seeded to SQLite | ✅ Done | Cline | — |
| **Email auth (Resend magic links)** | ✅ Built | Cline | — |
| **Google OAuth auth** | ✅ Active | Cline | — |
| **Role + KYC status in JWT/session** | ✅ Done | Cline | — |
| **KYC gate in checkout API** | ✅ Done | Cline | — |
| **Tier-gated purchase UI** | ✅ Done | Cline | — |
| **MyStable real holdings + KYC banner** | ✅ Done | Cline | — |
| **Admin panel with NextAuth RBAC** | ✅ Done | Cline | — |
| **Didit KYC verification UI** | ✅ Done | Cline | — |
| **PWA manifest (`manifest.ts`)** | ✅ Done | Cline | — |
| **Dynamic sitemap with listing routes** | ✅ Done | Cline | — |
| **Dynamic OG images (`opengraph-image.tsx`)** | ✅ Done | Cline | — |
| **Structured data (Product, Horse, Breadcrumb, FAQ)** | ✅ Done | Cline | — |
| **Listing page `generateMetadata`** | ✅ Done | Cline | — |
| **Loading + error boundaries** | ✅ Done | Cline | — |
| **Privacy-aware Google Analytics** | ✅ Done | Cline | — |
| **`noindex` on private pages** | ✅ Done | Cline | — |

---

## 📝 Change Log

| Date | Commit | Change | Author |
|------|--------|--------|--------|
| 2026-04-28 | — | Initial Game Plan created | Cline |
| 2026-04-28 | — | Architecture decisions locked: SQLite, NextAuth v5, Didit, Stripe, Ethereum | Cline |
| 2026-04-28 | `71d9206e` | Phase 1: Foundation + Security — ESLint, Husky, middleware, headers, Vitest, Playwright, npm audit, NextAuth v5 assessment | Cline |
| 2026-04-28 | `79ec3e36` | Phase 2: Database + SSOT Integration — SQLite schema, query layer, SSOT sync engine, API endpoint, seed script | Cline |
| 2026-04-28 | `0b53dea9` | docs: Lock Phase 3 architecture — Base chain, Openfort wallets, per-horse ERC-20, Didit KYC | Cline |
| 2026-04-28 | `6f59777f` | Phase 3: Payments + Token Integration — Stripe checkout/webhook, Didit KYC, token mint via viem on Base, Openfort wallets | Cline |
| 2026-04-28 | `366ae301` | Phase 4 start: Replace marketplace placeholders with live listing grid + detail pages | Cline |
| 2026-04-28 | — | Add Hottathanafantasy NZ02 listing — single-horse test slug for tokenisation validation; placeholder images + document structure | Cline |
| 2026-04-29 | — | Phase 4 sprint: Email auth (Resend) built + deferred; Google OAuth active; KYC-gated checkout; tier-gated purchase UI; real MyStable holdings; Admin RBAC + real data; Didit KYC verification UI | Cline |
| 2026-04-29 | — | **Decision: Option B — Consolidate Evolution_Token into Platform.** New Phase 5 added: port `HorseLeaseToken.sol`, Hardhat config, deploy scripts, per-listing contract addresses, admin deployment UI. Evolution_Token to be archived. | Cline |
| 2026-04-29 | — | **Decision: Dual-branch GTM strategy.** `v3.2-clean` = database-only (ship v0 now). `v3.2-tokenized` = identical + Base tokens (v1 when ready). Rebase rule: tokenized always rebased on clean. | Cline |
| 2026-04-30 | — | **Sprint planning session:** All real credentials gathered and locked in `.env`. Stripe test keys (publishable + secret), Didit API key + KYC+AML workflow ID (`8e9761bf-c63e-45a7-81b8-e7b66a17bbde`), Openfort keys (public, secret, shield pub, shield secret). Webhook secrets (Stripe + Didit) documented for user generation on dashboards. Base Sepolia RPC configured; deployer private key stubbed with auto-generation plan for testing. | Cline |

---

## 🔗 Related Documents

- `AUDIT_2026-04-27_TokenReadiness.md` — Previous audit findings
- `PERFORMANCE_OPTIMIZATION.md` — Current performance state
- `SEO_AUDIT_REPORT.md` — SEO requirements
- Evolution_Token repo: `/home/evo/workspace/projects/Evolution_Token`
- SSOT_Build repo: `/home/evo/workspace/projects/SSOT_Build`

---

**Next Action:** Ship v0. Priority order for `v3.2-clean`: (1) Wire document acknowledgement checkboxes to block purchase (4.11), (2) Fix SSOT_Build → Platform sync, (3) Admin listing status toggle, (4) Merge `v3.2-clean` to `main`. Parallel: prepare `v3.2-tokenized` branch from `v3.2-clean` + Phase 5 tokenization layer.

### Credential Vault (Locked in `.env` — 2026-04-30)

| Service | Key | Webhook Secret | Status |
|---------|-----|----------------|--------|
| **Stripe** | `sk_test_6aa2b3e6-776a-51aa-a2c7-64881893c6bc` | ⚠️ Generate in Dashboard: Developers → Webhooks → Add destination | Ready |
| **Didit** | `disqRn333A2aZf-C_0oqJfeWfBdOQQtxiMVHNBR3dFM` | ⚠️ Generate in Dashboard: Developers → Webhooks → Add destination | Ready |
| **Didit Workflow** | `8e9761bf-c63e-45a7-81b8-e7b66a17bbde` (KYC + AML) | — | Ready |
| **Openfort** | `sk_test_6aa2b3e6-776a-51aa-a2c7-64881893c6bc` | — | Ready |
| **Base** | `BASE_RPC_URL=https://sepolia.base.org` | — | Sepolia configured; deployer key stubbed |

### Webhook Secret Generation Guide

**Stripe:**
1. Stripe Dashboard → Developers → Webhooks → "+ Add destination"
2. Enter endpoint URL: `https://yourdomain.com/api/checkout/webhook`
3. Select events: `checkout.session.completed`, `invoice.payment_succeeded`
4. Copy `whsec_...` → `.env` as `STRIPE_WEBHOOK_SECRET`

**Didit:**
1. Didit Dashboard → Developers → Webhooks → "Add destination"
2. Enter endpoint URL: `https://yourdomain.com/api/kyc/webhook`
3. Copy secret → `.env` as `DIDIT_WEBHOOK_SECRET`

### Base Testing Approach

| Network | Method | Deployer Key |
|---------|--------|--------------|
| Hardhat local | Built-in test accounts | `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` (account 0) |
| Base Sepolia | Auto-generated wallet via viem | Generated at first deploy, saved to `data/deployments/` |
| Base mainnet | User-provided production wallet | Documented gap — swap in `ADMIN_PRIVATE_KEY` |

**Updated by:** Cline  
**Last update:** 2026-04-30