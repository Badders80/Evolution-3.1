# Evolution_Platform — Memory

> Tool-agnostic project memory. Any agent or human can read/write.

## Current State

- **Branch:** main
- **Status:** Marketplace shell ready, MyStable MVP pending
- **Environment:** Next.js 16

## Active Threads

| Thread | Status | Next Step | Owner |
|--------|--------|-----------|-------|
| Marketplace v0.0 | ✅ | Public listings, open by default | Done |
| MyStable MVP | 🟡 | Shell exists, needs auth + real data | Human |
| Auth integration | 🔴 | Deferred per product decision | Human |
| KYC flow | 🟡 | Didit hosted flow works | Working |

## Recent Decisions

- 2026-04-11: Marketplace open by default, MyStable private by default.
- 2026-04-11: KYC, payments, transaction lifecycle spec-first until truthful shell exists.
- 2026-04-11: n8n deferred.

## Audit Records

| Date | Scope | Deliverable | Verdict |
|------|-------|-------------|---------|
| 2026-04-27 | Full codebase — security, SEO, performance, architecture, token readiness | `AUDIT_2026-04-27_TokenReadiness.md` | **NOT production-ready**. Phase 1 (security lockdown) must complete before any token/wallet integration. |

**Key findings from audit:**
- 3 CRITICAL security issues (secrets in git history, mock admin auth via `sessionStorage`, zero security headers)
- 15 npm vulnerabilities (8 high severity)
- React 19 + React 18 type definition mismatch
- 1 test file (33 lines) — effectively zero coverage
- SEO gaps: incomplete sitemap, no dynamic OG images, no web manifest
- 108MB public folder with unoptimized assets
- Memory leak in PressShowcase timer cascade

**Remediation phases defined:**
1. Security Lockdown — purge secrets, add middleware, CSP, security headers
2. Build Hygiene — fix types, ESLint, tests
3. SEO + Performance — complete sitemap, OG images, asset optimization
4. Architecture for Tokens — error boundaries, rate limiting, monitoring

## Blockers

| Blocker | Severity | Resolution |
|---------|----------|------------|
| No auth system | High | Blocks personalized MyStable |
| Real holdings data | Medium | Waiting for Evolution_Token integration |
| Secrets committed to git (.env, .env.local) | **CRITICAL** | Rotate all keys, purge git history with BFG |
| Admin auth is client-side mock (`sessionStorage` + `window.prompt`) | **CRITICAL** | Replace with proper NextAuth session + RBAC before ANY sensitive ops |
| Zero security headers / no CSP | **CRITICAL** | Add CSP, HSTS, X-Frame-Options before wallet SDK injection |

## Integration Points

| System | Direction | Status |
|--------|-----------|--------|
| SSOT_Build | ← Horse data, listings | API ready |
| Evolution_Token | ← Token holdings | API ready |
| Evolution_Token | → KYC status | Webhook ready |

## Machine Constraints

Before recommending local models, builds, or Docker workloads, read:
- `DNA/ops/HARDWARE.md` — machine specs (GPU: RTX 3060 12GB, RAM: 12GB WSL)

## DNA References
- `DNA/ops/HARDWARE.md` — machine specs (read before recommending local models)

- `DNA/brand/DESIGN.md` — design tokens

## Next Actions

1. **TODO: Integrate auth from Evolution_Token** — MyStable needs real auth gate
2. **TODO: Wire real holdings data** — connect to Token API for MyStable view
3. **TODO: Test marketplace → MyStable flow** — full user journey with auth
4. **Auth system design** — deferred until Token auth ready

## Context Chain

<- workspace/MEMORY.md
<- workspace/memory/STATE.md
<- workspace/memory/BLOCKERS.md
<- workspace/memory/SESSION_LOG.md
-> Project README.md
-> SESSION_LOG.md
