# Evolution 4.0 Architecture Document

This document outlines the technical decisions, patterns, and long-term strategy for the Evolution Stables platform.

---

## 1. Component & Rendering Strategy

### HTML / TypeScript Ratio
The current ratio (~90% HTML) is a direct result of our **Server-First Architecture**. In Next.js 15+, using React Server Components (RSC) means that the majority of our components render to static HTML on the server.
- **Benefits**: Faster Time to Interactive (TTI), zero client-side JS for static content, and superior SEO indexing.
- **Future Trend**: As we add complex marketplace logic (client-side filters, trading windows), the TypeScript percentage will naturally increase. However, we strive to keep the "outer shell" as HTML-heavy as possible for performance.

---

## 2. Data Persistence (Phase 2 & Beyond)

### Database Strategy
For the Marketplace launch, we recommend **Supabase (PostgreSQL)**.
- **Rationale**: Provides a robust, relational database (essential for financial records and ownership tracking) with built-in Auth, Real-time updates, and an excellent developer experience.
- **Alternative**: Pocketbase is excellent for smaller, single-binary needs, but Supabase scales better for the "Exchange" vision (Phase 3).
- **ORM**: **Prisma** is our recommended ORM for type-safe database access.
- **Location**: Models will live in `/prisma/schema.prisma`.

---

## 3. State Management

For the Evolution Marketplace, we follow a "Least Power" principle:
1. **Server State**: Handled by Next.js Data Fetching and Cache.
2. **Global UI State**: **Zustand**. Lightweight, no boilerplate, perfect for "cart-like" interactions (e.g., selecting stakes across pages).
3. **Session State**: **NextAuth.js**. Handles Google OAuth and JWT-based session management.
4. **Local State**: `useState` / `useReducer` for component-specific logic.

---

## 4. API Patterns

We utilize **Server Actions** as the primary pattern for data mutations (forms, stake purchases).
- **Benefits**: End-to-end type safety with Zod, no need for manual `fetch` calls, and works without client JS enabled.
- **REST Endpoints**: Reserved for external integrations (e.g., TAB API) or public-facing APIs in `src/app/api/`.
- **tRPC**: Excellent for full-stack type safety, but Server Actions provide a more native Next.js experience with less boilerplate.

---

## 5. Geographic Expansion (i18n)

Evolution Stables is designed to support NZ, AU, UK, and UAE markets:
- **Routing**: We will implement the `[locale]` segment pattern (e.g., `/en-au/marketplace`).
- **Middleware**: A centralized middleware handles locale detection based on headers or cookies.
- **Strategy**: Content for different regions will be managed via **Sanity.io**, using their internationalization features to swap text/assets based on the locale.

---

## 6. Security Patterns

- **Environment Variables**: Strictly validated using a central `src/lib/env.ts` (Zod-backed).
- **Security Headers**: Managed via `src/middleware.ts` (Content Security Policy, HSTS, X-Frame-Options).
- **Rate Limiting**: Implementation of `upstash/ratelimit` (Redis-based) for the email capture and future login forms.
- **Audit Trails**: All financial transactions and ownership changes are logged in a dedicated `AuditLog` table in the database, ensuring FMA compliance.
- **Authentication Guards**: Centralized in `middleware.ts` to protect sensitive routes.

---

## 7. Migration & Cut-over Plan

1. **Phase 1 (Parallel Run)**: Deploy 4.0 on a subdomain for final testing.
2. **Phase 2 (SEO Mapping)**: Implement `next.config.js` redirects for legacy 3.1 URLs.
3. **Phase 3 (DNS Swap)**: Switch the main domain to the new Vercel deployment.
4. **Rollback**: Vercel's "Instant Rollback" allows us to revert in < 10 seconds.

---

## Technical Stack Summary

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + Shadcn/UI |
| Content | Sanity.io |
| Auth | NextAuth.js |
| Database | Supabase (Postgres) |
| ORM | Prisma |
| State | Zustand |
| Validation | Zod |
| Analytics | GA4 / UTM Tracking |
