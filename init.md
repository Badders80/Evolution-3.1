# init.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Next.js dev server on `localhost:3000` |
| `npm run build` | Production build |
| `just check` | Type-check (`tsc --noEmit`) then build |
| `just dev` / `just build` | Justfile aliases for the above |
| `npm run lint` | ESLint (`next lint`) |
| `npm run test` | Run all Vitest unit tests once |
| `vitest run <pattern>` | Run a single test file or pattern |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:e2e` | Playwright E2E tests (starts dev server automatically) |

The dev server and build both set `NODE_OPTIONS="--max-old-space-size=4096"` in `package.json` to prevent OOM crashes. If you hit memory pressure, bump this to `8192`.

## Architecture

**Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS + shadcn/ui + SQLite (better-sqlite3).

**Role:** Public-facing website for [evolutionstables.nz](https://evolutionstables.nz). It consumes canonical data from `SSOT_Build` and renders the marketplace and investor experience. It does **not** author canonical truth.

**Layered data flow:**
1. `SSOT_Build` owns all canonical horse/owner/trainer/lease data.
2. `SSOT_Build/scripts/publish-marketplace-v0.mjs` generates a marketplace payload.
3. `Evolution_Platform` (this repo) reads the published payload to display listings. It never writes back to `SSOT_Build`.

**Key directories:**
- `src/app/` — App Router pages. Key segments: `marketplace/`, `mystable/`, `admin/`, `api/`, `auth/`, `press/`, `updates/`, `valuation/`.
- `src/lib/db/` — SQLite schema (`schema.sql`) and query layer (`connection.ts`, `queries/`).
- `src/lib/` — Business logic: `marketplace.ts`, `mystable.ts`, `auth.ts`, `stripe-server.ts`, `openfort.ts`, `faq-items.ts`, `press-articles.ts`.
- `src/components/` — React components.
- `src/styles/` — Global CSS, brand tokens, marketplace-specific tokens.
- `tests/unit/` — Vitest tests.
- `tests/e2e/` — Playwright tests.

**Important services:**
- **Auth:** NextAuth v4 (`src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`).
- **Payments & KYC:** Stripe (NZD). KYC migrated from Didit to Stripe Identity on 2026-05-05. Webhook handlers live in `src/app/api/stripe-webhook/` and `src/app/api/checkout/`.
- **Wallet:** Openfort for embedded ERC-4337 wallets (`src/lib/openfort.ts`).
- **Blockchain:** viem/wagmi interacting with Base.
- **Database:** better-sqlite3 (`src/lib/db/`). Run schema from `src/lib/db/schema.sql`.

**Security headers:** A strict Content-Security-Policy and other security headers are injected via `next.config.ts` `headers()`.

**Performance:** `public/` is ~108MB of static assets and needs optimisation. Image formats prefer AVIF and WebP.

## Rules from `.vscode/copilot-instructions.md`

Before answering:
1. Read `MEMORY.md` — current project state, active threads, blockers.
2. Read `SESSION_LOG.md` — recent session decisions.
3. Read `/home/evo/workspace/memory/BLOCKERS.md` — workspace-level blockers.
4. Read `DNA/ops/STACK.md` — live adopted tool registry.

When logging work:
- Update `MEMORY.md` when project state changes.
- Append to `SESSION_LOG.md`: `YYYY-MM-DD: <what happened>`.
- If a blocker is discovered or resolved, update `memory/BLOCKERS.md`.
- Read `DNA/ops/CONVENTIONS.md` for workspace rules.

Cross-project awareness:
- Platform consumes SSOT truth. It does not define canonical truth.
- All SSOT dependencies must be explicit in `MEMORY.md` integration points.
- Marketplace is open information by default.
- MyStable is private by default.
- Token holdings integration is deferred pending `Evolution_Token` auth readiness.

## Important parts from `README.md`

This repo is the **production public website only**. It contains homepage, About, Press, Privacy, Terms, Updates, and Valuation pages.

- `/marketplace` — "Coming Soon" placeholder.
- `/mystable` — "Coming Soon" placeholder.

All functional marketplace, MyStable, token, and blockchain features live in **`Evolution_Token`** (the testing and development build). Features merge back into Platform only when production-ready.

Legacy mockup designs for Marketplace and MyStable (glassmorphic blur overlays with mock data) were removed during the public-site cleanup (May 2026) but are preserved in git history and in `Evolution_Token`.

## Context Chain

- Inherits from: `/home/evo/workspace/AGENTS.md`, `/home/evo/workspace/projects/PROJECTS_RULES.md`
- Conventions: `/home/evo/workspace/DNA/ops/CONVENTIONS.md`
- Live state: `MEMORY.md` (this project), `/home/evo/workspace/memory/STATE.md`, `/home/evo/workspace/memory/BLOCKERS.md`
