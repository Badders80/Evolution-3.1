# Evolution Platform v3.2 — Overnight Build Sprint Prompt

**Start Date:** 2026-04-30  
**Target:** Complete `v3.2-clean` branch, branch to `v3.2-tokenized`, document all gaps  
**Mode:** ACT MODE (execute immediately — no further planning needed)

---

## ✅ What's Already Done (Do Not Rebuild)

### Architecture & Foundation
- Next.js 16 + App Router + Tailwind + shadcn/ui
- SQLite (Better SQLite3) with WAL mode — schema: `users`, `listings`, `holdings`, `kyc_sessions`
- NextAuth v4 with Google OAuth + RBAC middleware
- Security headers (CSP, HSTS, etc.) in `next.config.ts`
- Vitest + Playwright configured
- `middleware.ts` protecting `/mystable`, `/admin`, `/api/*`

### Data Layer
- `lib/db/queries/listings.ts` — working
- `lib/db/queries/holdings.ts` — working
- `lib/ssot/` — sync engine with fs.watch + manual trigger
- `api/marketplace/sync` — SSOT webhook endpoint
- `scripts/seed-db.ts` — seeds from static JSON
- `src/data/marketplace-listings.generated.json` — seeded with 3 listings including Hottathanafantasy

### Marketplace Pages
- `/marketplace` — live grid with real listings
- `/marketplace/[slug]` — live detail page with offering data
- `/marketplace/[slug]/opengraph-image.tsx` — dynamic OG images
- SEO: `generateMetadata`, sitemap, manifest, structured data (Product, Horse, Breadcrumb, FAQ)
- Google Analytics (privacy-aware), `noindex` on private pages

### Auth + KYC + Admin
- Google OAuth active
- Role + KYC status in JWT/session
- Didit KYC verification UI + session creation API
- KYC gate in checkout API
- `/admin` panel with RBAC, user table, KYC review queue
- MyStable dashboard with real holdings + KYC banner

### Credentials (All Saved in `.env`)
| Service | Status |
|---------|--------|
| **Stripe** | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY` — ✅ Ready. Webhook secret needs Dashboard generation |
| **Didit** | `DIDIT_API_KEY`, `DIDIT_WORKFLOW_ID` (KYC+AML: `8e9761bf-c63e-45a7-81b8-e7b66a17bbde`) — ✅ Ready. Webhook secret needs Dashboard generation |
| **Openfort** | All 4 keys saved (public, secret, shield pub, shield secret) — ✅ Ready |
| **Base** | `BASE_RPC_URL=https://sepolia.base.org` — Sepolia configured. Deployer private key stubbed (auto-generate for testing) |

---

## 🎯 Build Priority Order

### PHASE A: `v3.2-clean` (Database-Only Branch)

**Start immediately. These are the v0 blockers:**

#### A1. Document Acknowledgement Checkboxes (GAME_PLAN 4.11)
**File:** `/marketplace/[slug]` purchase flow (where "Buy Shares" / "Proceed to Payment" lives)

**Requirements:**
- Add 3 checkboxes before "Proceed to Payment" button:
  1. "I have read and agree to the Product Disclosure Statement (PDS)"
  2. "I have read and agree to the Syndicate Agreement"
  3. "I have read and agree to the HLT Term Sheet"
- All 3 must be ticked before "Proceed to Payment" is enabled
- Each checkbox links to the corresponding PDF document (from `listing.officialDocuments`)
- On Stripe checkout session creation, pass `documentAcknowledgements` JSON in metadata
- On webhook (`checkout.session.completed`), read metadata and save to `holdings.document_acknowledgements` (add this column to schema)

**Schema change:**
```sql
ALTER TABLE holdings ADD COLUMN document_acknowledgements TEXT; -- JSON blob
```

#### A2. Admin Listing Status Toggle
**File:** `/admin` panel

**Requirements:**
- Add "Listing Management" section to admin panel
- Table showing all listings from DB
- Each row has a dropdown/status toggle: `draft` → `ready_to_publish` → `live` → `closed`
- Status change updates DB immediately
- `live` listings appear on `/marketplace`; `ready_to_publish` appear in admin only; `draft` hidden; `closed` show as "Sold Out"
- After status change, call `revalidatePath('/marketplace')` for cache

#### A3. MyStable Portfolio (Functional Wireframe)
**File:** `/mystable/page.tsx`

**Requirements:**
- Simple table/list view: Horse name | Units owned | Status | Action
- Status values: `pending` (unpaid), `paid` (Stripe complete), `minted` (on-chain), `kyc_required`
- "Action" column: link to listing detail, or "Complete KYC" button if `kyc_required`
- Wireframe styling — functional buttons, simple layout, no polish needed

#### A4. SSOT_Build → Platform Sync Fix
**File:** `lib/ssot/sync.ts`, `api/marketplace/sync/route.ts`

**Requirements:**
- Ensure `seed.json` from SSOT_Build is correctly parsed and transformed
- Fix any transformer gaps for the current schema
- `marketplace.json` export endpoint should return all `live` + `ready_to_publish` listings
- Add validation: if `seed.json` is missing required fields, log error but don't crash

---

### PHASE B: `v3.2-tokenized` (Token Layer Branch)

**Branch from `v3.2-clean` when Phase A is solid.**

#### B1. Create `v3.2-tokenized` Branch
```bash
git checkout -b v3.2-tokenized v3.2-clean
```

#### B2. Port `HorseLeaseToken.sol`
**New directory:** `contracts/`

**Requirements:**
- Copy ERC-20 contract from Evolution_Token (if accessible) or rebuild:
  - OpenZeppelin ERC-20 base
  - Custom: `name`, `symbol`, `decimals`, `totalSupply` set from listing params
  - `mint()` — admin only
  - `burn()` — admin only
  - `transfer()` — standard
- Add `hardhat.config.ts`:
  - Networks: `hardhat`, `baseSepolia`, `base`
  - Use `viem` for deployment scripts
- Add `@nomicfoundation/hardhat-toolbox-viem` to devDependencies

#### B3. Add `token_contract_address` to DB
**Schema change:**
```sql
ALTER TABLE listings ADD COLUMN token_contract_address TEXT;
```

#### B4. Deploy Script
**File:** `scripts/deploy-contract.ts`

**Requirements:**
- Read listing params from DB
- Deploy contract to specified network (default: `baseSepolia`)
- Save deployment artifact to `data/deployments/{slug}-{network}-{timestamp}.json`
- Update `listings.token_contract_address` in DB
- Generate deployer wallet if `ADMIN_PRIVATE_KEY` is not set; save key to `data/deployments/wallet-{timestamp}.json`

#### B5. Admin Contract Deploy UI (Stub)
**File:** `/admin/contracts/page.tsx`

**Requirements:**
- Table of listings (status: `ready_to_publish` or `live`)
- "Deploy Contract" button per listing
- Network selector: `baseSepolia` | `base`
- On deploy: show deployed address, Etherscan link, tx hash
- Prevent re-deploy if `token_contract_address` already exists

#### B6. Update Mint API
**File:** `api/tokens/mint/route.ts`

**Requirements:**
- Read `token_contract_address` from listing record
- Fallback to `CONTRACT_ADDRESS` env var for legacy listings
- Use viem to call `mint(to, amount)` with admin wallet
- Remove mock mint path
- Return `txHash`, update holding status to `minted`

#### B7. Openfort Wallet Stub
**File:** `api/kyc/callback/route.ts`

**Requirements:**
- On KYC `Approved`, check if user has Openfort wallet
- If not, call Openfort API to create embedded wallet
- Save `wallet_address` to `users` table
- Document: "Openfort wallet creation — test with real API key tomorrow"

---

## ⚠️ Stubs / Documented Gaps (For Tomorrow)

| Gap | Where | Action Needed |
|-----|-------|-------------|
| Stripe webhook secret | `.env` `STRIPE_WEBHOOK_SECRET` | Generate in Stripe Dashboard → Developers → Webhooks → Add destination |
| Didit webhook secret | `.env` `DIDIT_WEBHOOK_SECRET` | Generate in Didit Dashboard → Developers → Webhooks → Add destination |
| Base deployer private key | `.env` `ADMIN_PRIVATE_KEY` | Generate new wallet OR provide production deployer key |
| E2E tests | `tests/e2e/` | Build Playwright tests for: browse → buy → portfolio |
| `/mystable/horse/[id]` | `src/app/(dashboard)/mystable/horse/[id]/page.tsx` | Deferred — horse detail view |
| `/mystable/settings` | `src/app/(dashboard)/mystable/settings/page.tsx` | Deferred — profile, KYC status, wallet management |

---

## 🔑 Key Files to Reference

- `GAME_PLAN.md` — Full architecture, phase checklists, change log
- `.env` — All real credentials (Stripe, Didit, Openfort)
- `src/data/marketplace-listings.generated.json` — Seed data format
- `src/lib/db/schema.ts` or equivalent — SQLite schema
- `src/lib/db/queries/` — Existing query patterns
- `src/app/api/checkout/` — Stripe checkout/webhook handlers
- `src/app/api/kyc/` — Didit KYC session/callback handlers

---

## 🚀 Start Command

```
git checkout v3.2-clean  # or create if doesn't exist
# Begin Phase A: A1 → A2 → A3 → A4
# Then: git checkout -b v3.2-tokenized
# Begin Phase B: B1 → B2 → B3 → B4 → B5 → B6 → B7
```

**Build functional wireframes, not polished UI.** Every button must work, every API must return real data, every gap must be documented with a TODO comment.

**End of prompt — start executing immediately.**