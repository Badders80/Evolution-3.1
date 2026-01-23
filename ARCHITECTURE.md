# Evolution 4.0 Architecture Document

This document outlines the technical decisions, patterns, and long-term strategy for the Evolution Stables platform.

---

## 1. Component & Rendering Strategy

### HTML / TypeScript Ratio
The current ratio (~90% HTML) is a direct result of our **Server-First Architecture**. In Next.js 15+, using React Server Components (RSC) means that the majority of our components render to static HTML on the server.
- **Benefits**: Faster Time to Interactive (TTI), zero client-side JS for static content, and superior SEO indexing.
- **Future Trend**: As we add complex marketplace logic (client-side filters, trading windows), the TypeScript percentage will naturally increase. However, we strive to keep the "outer shell" as HTML-heavy as possible for performance.

---

## 2. Data Persistence (Future-Proofing)

### Database Strategy
When we transition from static content to dynamic horse listings and ownership records:
- **ORM**: **Prisma** is our recommended choice for its type-safety and developer velocity.
- **Location**: Models will live in `/prisma/schema.prisma`.
- **Service Layer**: Database queries should be abstracted into `src/services/` (e.g., `src/services/horse.service.ts`) to keep them separate from UI logic.
- **Infrastructure**: Optimized for Vercel Postgres or Supabase (PostgreSQL).

---

## 3. State Management

For the Evolution Marketplace, we follow a "Least Power" principle:
1. **Server State**: Handled by Next.js Data Fetching and Cache.
2. **Global UI State**: **Zustand**. Lightweight, no boilerplate, perfect for "cart-like" interactions (e.g., selecting stakes across pages).
3. **Session State**: **NextAuth.js**. Handles Google OAuth and JWT-based session management.
4. **Local State**: `useState` / `useReducer` for component-specific logic (e.g., form inputs).

---

## 4. API Patterns

We utilize **Server Actions** as the primary pattern for data mutations (forms, stake purchases).
- **Benefits**: End-to-end type safety with Zod, no need for manual `fetch` calls, and works without client JS enabled.
- **REST Endpoints**: Reserved for external integrations or public-facing APIs in `src/app/api/`.
- **tRPC**: Not currently planned, as Server Actions provide similar type-safety without the additional configuration overhead.

---

## 5. Geographic Expansion (i18n)

Evolution Stables is designed to support AU, UK, and UAE markets:
- **Routing**: We will implement the `[locale]` segment pattern (e.g., `/en-au/marketplace`).
- **Middleware**: A centralized middleware will handle locale detection based on headers or cookies.
- **Strategy**: Content for different regions will be managed via **Sanity.io**, using their internationalization features to swap text/assets based on the locale.

---

## 6. Security Patterns

- **Environment Variables**: Strictly validated using a central `src/lib/env.ts` (Zod-backed).
- **Security Headers**: Managed via `middleware.ts` (Content Security Policy, HSTS, X-Frame-Options).
- **Rate Limiting**: Implementation of the `upstash/ratelimit` (Redis-based) for the email capture and future login forms.
- **Authentication Guards**: Centralized in `middleware.ts` to protect `/mystable` and `/admin` routes.

---

## 7. Migration & Cut-over Plan

1. **Phase 1 (Parallel Run)**: Deploy 4.0 on a subdomain (e.g., `v4.evolutionstables.nz`) for final testing.
2. **Phase 2 (SEO Mapping)**: Implement `next.config.js` redirects for any legacy 3.1 URLs that have changed.
3. **Phase 3 (DNS Swap)**: Switch the main domain to the new Vercel deployment.
4. **Rollback**: Vercel's "Instant Rollback" allows us to revert to the previous 3.1 deployment in < 10 seconds if issues arise.

---

## Technical Stack Summary

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + Shadcn/UI |
| Content | Sanity.io |
| Auth | NextAuth.js |
| Validation | Zod |
| Analytics | GA4 / UTM Tracking |
