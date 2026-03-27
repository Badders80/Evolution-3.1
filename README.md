# Evolution 3.1

Evolution Stables' marketing site and auth/lead-capture app, built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- NextAuth for Google sign-in

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production build locally
- `npm run test` - run the Vitest suite
- `npm run test:e2e` - run Playwright tests

## Environment variables

Use `.env.example` as the template for `.env.local`.

- `NEXTAUTH_URL` - base URL for auth callbacks
- `NEXTAUTH_SECRET` - secret used by NextAuth
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_SHEETS_WEB_APP_URL` - Apps Script endpoint used for lead capture and sign-in tracking
- `NEXT_PUBLIC_API_MODE` - `mock` or `real` for the demo data layer
- `NEXT_PUBLIC_API_URL` - API base URL used when `NEXT_PUBLIC_API_MODE=real`

## Project structure

```text
src/
|-- app/                 # App Router routes, layouts, and API handlers
|-- components/          # Reusable UI and site components
|-- lib/                 # Shared utilities, assets, and API helpers
|-- services/            # Client/server service helpers
`-- types/               # Shared TypeScript types
```

## Notes

- This repo does not include a `studio/` app or Sanity Studio package.
- Production deployments are expected to build from GitHub rather than local build artifacts.
- Lead capture fails closed when `GOOGLE_SHEETS_WEB_APP_URL` is missing, instead of falling back to a hardcoded production endpoint.

## Visual Redesign (Runway-inspired)

The landing page has been redesigned to achieve **Runway-level visual polish**, following an institutional-grade aesthetic.

### Key Changes
- **Whitespace Strategy:** Implemented generous vertical padding (up to `py-56`) between sections to provide breathing room and institutional authority.
- **Scannable Information Bites:** Refactored content modules to ensure a "one idea per section" rhythm, with copy strictly limited to under 25 words per module.
- **Institutional Trust:** Added prominent regulatory badges (FMA, AML) and dedicated partnership sections (e.g., Tokinvest) to reinforce security and credibility.
- **Grid Architecture:** Adopted a clean 2-3 column desktop grid that stacks elegantly on mobile (375px/428px), optimizing for vertical thumb-scrolling.
- **Mobile-First Execution:** Visual hierarchy and rhythm were prioritized for mobile devices and then enhanced for desktop displays.

### Verification Tools
- `scripts/scannability_auditor.py`: A custom tool used to audit and enforce word-count constraints across all information modules.
- Playwright Visual Audit: Automated screenshots were generated during development to ensure responsive layout integrity across 375px, 428px, and 1280px.

## License

This project is private and proprietary.
