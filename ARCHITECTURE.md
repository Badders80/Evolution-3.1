# Evolution_Platform — Architecture

> High-level structure. Updated when significant changes are made.

---

## Surface Role

Public-facing website for evolutionstables.nz. Marketplace browsing, investor onboarding, KYC, payments, and portfolio management.

---

## Key Files & Structure

```
├── src/
│   ├── app/
│   │   ├── marketplace/          # Listing grid + detail pages
│   │   ├── mystable/             # Investor portfolio
│   │   ├── admin/                # Admin dashboard (mock auth)
│   │   └── api/                  # API routes
│   ├── lib/
│   │   ├── db/                   # SQLite query layer
│   │   └── stripe.ts             # Stripe integration
│   └── middleware.ts             # Route guards + rate limiting
├── public/                       # Static assets (108MB — needs optimisation)
└── .taskmaster/                  # Task tracking
```

---

## Dependencies

| Dependency | Purpose | Version |
|------------|---------|---------|
| Next.js | Web framework | 16 |
| React | UI library | 19 |
| Tailwind CSS | Styling | 4 |
| shadcn/ui | Component library | Latest |
| better-sqlite3 | Local database | Latest |
| Stripe | Payments | Latest |
| viem/wagmi | Ethereum interaction | Latest |
| Openfort | Embedded wallets | API |

---

## Context Chain

<- inherits from: /home/evo/workspace/AGENTS.md
<- inherits from: /home/evo/workspace/projects/PROJECTS_RULES.md
-> overrides by: none
-> live map: /home/evo/workspace/AI_SESSION_BOOTSTRAP.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md

---

## Performance Constraints

### Memory Limit

**Problem:** Next.js dev server can consume excessive RAM during startup and hot reloading, potentially causing OOM (out-of-memory) crashes on resource-constrained systems.

**Solution:** Set memory limit in `.env.local`:

```bash
NODE_OPTIONS="--max-old-space-size=4096"  # 4GB max per Node process
```

This applies to both `npm run dev` and `npm run build`. Adjust to `8192` (8GB) if you encounter memory pressure during large builds.
