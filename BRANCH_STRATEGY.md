# Branch Strategy: v3.2-clean → v3.2-tokenized

**Date:** 2026-04-29  
**Status:** Active

## The Rule

`v3.2-tokenized` is **always rebased** on `v3.2-clean`. Never the reverse.

```
v3.2-clean (database-only, ships v0)
    ↓
    ├── bug fix → commit to clean
    ├── SEO update → commit to clean
    ├── auth change → commit to clean
    └── UI improvement → commit to clean
            ↓
    git rebase v3.2-tokenized on v3.2-clean
            ↓
v3.2-tokenized (clean + Base tokenization layer)
```

## Why This Exists

| Branch | What It Is | When It Ships |
|--------|-----------|---------------|
| `v3.2-clean` | Database-only holdings. No blockchain. No gas. No wallets. | **Now.** This week. |
| `v3.2-tokenized` | Identical to `v3.2-clean`, but holdings are ERC-20 tokens on Base. | When tokenization is ready. |

The investor sees **zero difference** between v0 and v1. Same `/mystable`. Same purchase flow. Same everything. Tokens are invisible infrastructure.

## Forward-Compatible Schema

The `v3.2-clean` schema already includes columns for v1:

- `listings.token_contract_address` — Base ERC-20 address (nullable, empty in v0)
- `holdings.document_acknowledgements` — JSON array of acknowledged doc IDs (v0 feature)

When `v3.2-tokenized` is created, it reuses the same schema. No migrations needed.

## Creating v3.2-tokenized

```bash
# 1. Ensure v3.2-clean is on main and stable
git checkout main
git pull origin main

# 2. Create tokenized branch from clean
git checkout -b v3.2-tokenized

# 3. Apply Phase 5: tokenization layer
#    - contracts/HorseLeaseToken.sol
#    - hardhat.config.ts
#    - scripts/deploy-contract.ts
#    - Admin contract deployment UI
#    - Update mint API to use per-listing contract address
#    - Openfort wallet creation on KYC

# 4. Push
git push -u origin v3.2-tokenized
```

## Daily Workflow

```bash
# Bug fix on clean
git checkout v3.2-clean
# ... fix ...
git commit -m "fix: ..."
git push

# Rebase tokenized
git checkout v3.2-tokenized
git rebase v3.2-clean
# Resolve conflicts if any (usually none — tokenized only adds files)
git push --force-with-lease
```

## Migration Path: v0 → v1

When v1 is ready, the cutover is a single database update + branch switch:

1. **Deploy contracts** for each live listing (admin UI)
2. **Backfill** existing `paid` holdings → on-chain tokens
3. **Update `listings.token_contract_address`** with deployed addresses
4. **Switch production branch** from `v3.2-clean` to `v3.2-tokenized`
5. **Done.** Investors see the same dashboard. Holdings now have `tx_hash` linking to Base explorer.

## What NOT to Do

- ❌ Never commit bug fixes directly to `v3.2-tokenized`
- ❌ Never merge `v3.2-tokenized` → `v3.2-clean`
- ❌ Never change the purchase flow on `v3.2-tokenized` without first changing it on `v3.2-clean`
- ❌ Never add schema changes to `v3.2-tokenized` that aren't also in `v3.2-clean`

## Emergency Rollback

If v1 has issues:

```bash
# Instant rollback to v0
git checkout v3.2-clean
# Deploy. Done. Holdings are still in SQLite. No tokens lost.
```

Tokens are a layer. The database is the source of truth. Always.
