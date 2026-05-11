# Evolution_Platform — Workflows

> Human-readable guide to the public website. Updated when flows change.

---

## Core Flow

```
Visitor → Marketplace → Syndicate Detail → KYC → Checkout → MyStable
```

### 1. Marketplace Browsing
- `/marketplace` — Grid of all syndicates from SQLite
- `/marketplace/[slug]` — Horse detail, pricing, documents, buy button
- Data sourced from Platform's own SQLite (synced from SSOT_Build)

### 2. Investor Onboarding
- KYC via Didit.me (or Stripe Identity fallback)
- Wallet creation via Openfort (embedded wallet)
- Status tracked in SQLite `users` table

### 3. Purchase Flow
- "Buy Shares" → Stripe Checkout → Webhook → Mint API
- Document acknowledgement checkboxes required before payment
- Holding record created in SQLite

### 4. Portfolio (MyStable)
- `/mystable` — Holdings list, token balances, KYC status
- Data from SQLite `holdings` table
- On-chain balance via viem read calls

### 5. Admin
- `/admin` — Dashboard with stats, investor list, KYC queue
- Mock auth (window.prompt) — needs NextAuth replacement

---

## Data Residency

| Data | Stored In | Details |
|------|-----------|---------|
| Listings | Platform SQLite | Synced from SSOT_Build |
| Users + KYC status | Platform SQLite | Set by KYC webhook |
| Holdings | Platform SQLite | Set by checkout webhook |
| Identity documents | Stripe Identity | Never stored locally |
| Payment cards | Stripe | Never stored locally |
| Token balances | On-chain (Base Sepolia) | Read via viem |

---

## External Services

| Service | Purpose | Key Status |
|---------|---------|------------|
| Stripe | Payments + KYC | ✅ Configured |
| Openfort | Embedded wallets | ✅ Configured |
| Didit.me | KYC (planned) | 🟡 Placeholder |
| Alchemy | RPC provider | ✅ Configured |

---

## Context Chain

<- GAME_PLAN.md
-> README.md

---

## Deployment Workflow

### Pre-Deployment Checklist

**CRITICAL: Fix everything locally before pushing. Never push incrementally.**

```bash
# 1. Run local build and catch ALL errors
npm run build

# 2. Fix ALL TypeScript errors locally
# (Edit files until build succeeds)

# 3. Verify build succeeds locally
# ✓ Compiled successfully
# ✓ No type errors

# 4. Check what's modified
git status

# 5. Commit EVERYTHING in ONE commit
git add -A
git commit -m "Fix: [description]"

# 6. Push ONCE to main
git push

# 7. Monitor Vercel deployment
# https://vercel.com/dashboard
```

### Why This Matters

**❌ Wrong approach (what NOT to do):**
- Push with errors → Vercel fails → Fix one error → Push again → Repeat
- Results in: 5+ failed builds, 15+ minutes wasted, whack-a-mole debugging

**✅ Right approach:**
- Fix all errors locally → One commit → One push → One successful build
- Results in: 1 build, 2-3 minutes total, done

### Vercel Deployment

1. Push to `main` branch triggers automatic deployment
2. Monitor at: https://vercel.com/dashboard
3. Build takes ~2-3 minutes
4. Production URL: https://evolutionstables.nz

### Rollback (If Needed)

```bash
# Revert to previous commit
git revert HEAD
git push

# Or deploy specific commit via Vercel dashboard
```
