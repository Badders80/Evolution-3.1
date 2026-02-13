# Evolution Stables v3.1

A production-ready Next.js 14 application built with TypeScript, Tailwind CSS, and Framer Motion for Evolution Stables. This branch (`Jules-merge`) represents the unified technical foundation, merging the best of `codex-optimised`, `kilo-optimised`, `glm-optimised`, and `jules-optimised`.

## 🚀 Quick Start

1. **Prerequisites:** Node.js 22.22.0 (managed via `.nvmrc`)
2. **Install:** `corepack enable && pnpm install`
3. **Develop:** `pnpm dev` (runs on http://localhost:3000)
4. **Test:** `pnpm test:watch`
5. **Build:** `pnpm build`

## 📦 Tech Stack

- **Framework:** Next.js 14.2.35 with App Router
- **Language:** TypeScript 5.3+
- **Styling:** Tailwind CSS 3.3+
- **Animations:** Framer Motion 10.x, GSAP 3.x
- **Icons:** Lucide React, Radix Icons, React Icons
- **CMS:** Sanity.io
- **Testing:** Vitest + Testing Library
- **CI/CD:** GitHub Actions
- **Package Manager:** pnpm 10.28.2

## 🏗️ Architecture

```
src/
├── app/            # Next.js App Router pages
│   ├── marketplace/# Digital syndication marketplace
│   ├── mystable/   # Ownership dashboard
│   ├── valuation/  # Asset valuation tools
│   └── layout.tsx  # Root layout with metadata & GTM
├── components/     # Reusable UI components
│   ├── seo/        # SEO components (structured data)
│   ├── ui/         # Base UI primitives (Bento, Button, etc.)
│   ├── layout/     # Layout components
│   └── site/       # Site-specific components
├── lib/            # Utility libraries
│   ├── api/        # API integration layer
│   ├── assets.ts   # Centralized asset manifest
│   └── press-articles.ts # Press data
├── hooks/          # Custom React hooks (useAnalytics, etc.)
├── providers/      # Context providers
└── styles/         # Global styles
```

## 📊 SEO & Performance

- ✅ **Dynamic Metadata:** Optimized titles and descriptions per route.
- ✅ **Structured Data:** FAQ and Organization schemas (JSON-LD).
- ✅ **Image Optimization:** AVIF/WebP support with aggressive caching.
- ✅ **Analytics:** Google Tag Manager integration with custom event hooks.
- ✅ **Bundle Analysis:** Integrated analyzer for performance monitoring.

## 🧪 Testing

- **Unit Tests:** Vitest + Testing Library.
- **Coverage:** `pnpm test:coverage`.
- **Linting:** ESLint + Prettier.

## 🔐 Environment Variables

See `.env.local.example` for required configuration. Key variables include:
- `NEXT_PUBLIC_GTM_ID`: Google Tag Manager ID.
- `NEXT_PUBLIC_API_MODE`: `mock` or `live`.

## 🚢 Deployment

Optimized for Vercel deployment with automatic branch previews and GitHub Actions CI pipeline.

## 📄 License

Private and proprietary to Evolution Stables.
