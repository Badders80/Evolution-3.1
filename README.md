# Evolution 3.1

A modern Next.js application built with TypeScript, Tailwind CSS, and Framer Motion for Evolution Stables.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Component library** with reusable UI components
- **Responsive design** with mobile-first approach

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   npm install --prefix studio
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Visit [http://localhost:3000](http://localhost:3000). (If you want the Studio later, start it separately with `npm run dev --prefix studio`.)

## Development Workflow

1. Run `npm run dev` for the main application on port 3000.
2. Iterate on components in the app and validate in the browser.

## Project Structure

```
src/
|-- app/                 # Next.js app router pages
|-- components/          # Reusable UI components
|   |-- ui/             # Basic UI components (Button, Card, etc.)
|   |-- layout/         # Layout components
|   |-- site/           # Site-specific components
|   |-- marketing/      # Marketing components
|   |-- media/          # Media components
|   `-- icons/          # Icon components
|-- lib/                # Utility libraries
|   `-- api/            # API integration layer
`-- styles/             # Global styles and themes
```

## Components

### UI Components
- `Button` - Customizable button component
- `Card` - Card layout component
- `Badge` - Label/badge component

### Layout Components
- `NavBar` - Navigation bar
- `Footer` - Site footer
- `SectionShell` - Section wrapper

### Site Components
- `Section` - Content section with image
- `ImageBand` - Full-width image banner
- `MissionCombo` - Mission statement component

## Development

To add new images, place them in the `public/images/` directory and update the asset references in `src/lib/assets.ts`.

## Build and Deploy

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
npm start
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_MODE=mock
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_SANITY_PROJECT_ID=a4xfnv5b
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-04
# Optional: required only for private datasets
SANITY_READ_TOKEN=your-sanity-read-token
```

If you create additional content models in Sanity, make sure they expose the following fields so the
Marketplace modules can be managed from the CMS:

- `title` (string)
- `description` (text or string)
- `ctaLabel` (string)
- `ctaHref` (string URL)
- `iconKey` (string matching one of `digitalSyndication`, `ownershipDashboard`, `integrationCompliance`, `analyticsInsights`, `communityMedia`)
- `layoutKey` (string matching one of `middle-tall`, `left-tall`, `left-bottom`, `right-top`, `right-bottom`)

The data is fetched at request time; if Sanity is unreachable or the query returns no documents, the UI falls back to the locally-defined defaults.

## Sanity Studio

A Sanity Studio has been scaffolded in the `/studio` directory.

### Install & Run

```bash
cd studio
npm install
npm run dev
```

The Studio targets project `a4xfnv5b` and dataset `production` by default (controlled via the same `NEXT_PUBLIC_SANITY_*` env variables shown above).

### Deploy

- **Sanity hosting**: `npx sanity deploy`
- **Self hosted (Vercel/Netlify)**: build and deploy this folder; the scripts `npm run build` and `npm run deploy` are provided for convenience.
- **Schema-only deploy**: `npx sanity schema deploy` (requires `SANITY_AUTH_TOKEN` if run from CI)

After deploying you will receive a Studio URL (for example `https://<project>.sanity.studio` or a Vercel URL). Add that URL to the Sanity project settings under *Add studio*.

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
