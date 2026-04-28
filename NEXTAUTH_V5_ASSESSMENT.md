# NextAuth v5 Upgrade Assessment

**Date:** 2026-04-28  
**Current Version:** next-auth@4.24.13  
**Target Version:** next-auth@5.x (latest: 5.0.0-beta.4)

## Status

NextAuth v5 is currently in **beta** (5.0.0-beta.4 as of 2026-04-28). No stable v5 release is available on npm.

## Key Changes in v5

1. **Package rename:** `next-auth` → `auth` (or `@auth/nextjs`)
2. **Config location:** `auth.ts` instead of `[...nextauth]/route.ts`
3. **Middleware integration:** Built-in `auth()` helper for middleware
4. **Edge runtime support:** Full compatibility with Next.js middleware
5. **Database adapters:** New adapter API

## Migration Effort Estimate

| Task | Effort | Risk |
|------|--------|------|
| Install `auth` / `@auth/nextjs` | Low | Low |
| Migrate `authOptions` to `auth.ts` | Medium | Medium |
| Update API route (`[...nextauth]`) | Medium | Medium |
| Update session hooks in components | Medium | Medium |
| Update `middleware.ts` to use `auth()` | Low | Low |
| Test all auth flows (sign in, sign out, session) | High | High |
| Update type definitions | Low | Low |

**Total estimated effort:** 1–2 days  
**Risk level:** Medium — beta software, API may change

## Recommendation

**Defer v5 upgrade until stable release.** The current v4.24.13 setup is functional. Migrating to beta software introduces unnecessary risk for the v3.2 rebuild timeline.

**Alternative:** Continue with v4.24.13 for Phase 1–3. Re-evaluate v5 stability at Phase 4 (Dashboard + SEO + Testing week). If v5 is stable by then, migrate as part of Phase 4 polish. If not, document v5 migration as a post-v3.2 task.

## Current v4 Setup Audit

| Component | Status | Notes |
|-----------|--------|-------|
| `src/lib/auth.ts` | ✅ Functional | GoogleProvider, custom callbacks |
| `src/app/api/auth/[...nextauth]/route.ts` | ✅ Functional | Standard NextAuth API route |
| `src/middleware.ts` | ✅ Compatible | Uses `getToken` from `next-auth/jwt` |
| `src/app/auth/page.tsx` | ✅ Functional | Custom sign-in page |
| Environment variables | ✅ Configured | `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, etc. |

## Action Items

- [ ] Monitor `next-auth` releases for v5 stable
- [ ] Subscribe to `@auth` changelog
- [ ] Create migration branch when v5 stable drops
- [ ] Update `GAME_PLAN.md` architecture decisions if v5 is adopted later