# Evolution 3.1

A modern Next.js application built with TypeScript, Tailwind CSS, and Framer Motion for Evolution Stables.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Storybook** for component development and testing
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

## Storybook Development

This project includes Storybook for component development and testing:

1. Start Storybook:
   ```bash
   npm run storybook
   ```

2. Open [http://localhost:6006](http://localhost:6006) in your browser.

3. **Dev Tip**: Click the "Login (Stories)" button in the navigation bar to quickly access Storybook from the main application.

## Development Workflow

1. **Terminal 1**: `npm run dev` (main application on port 3000)
2. **Terminal 2**: `npm run storybook` (component stories on port 6006)
3. Develop components in Storybook → Test in the main application → Instant visual feedback

## Component Stories

- **Button**: Primary, Outline, Secondary, Ghost variants with different sizes
- **Evolution Stables Branded**: Custom gold/black themed components
- **Interactive**: Test component variants before implementing in the main app

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

## License

This project is private and proprietary.
