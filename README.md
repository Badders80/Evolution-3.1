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

1. Enable Corepack (recommended) and install dependencies:
   ```bash
   corepack enable
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Visit [http://localhost:3000](http://localhost:3000).

## Development Workflow

1. Run `pnpm dev` for the main application on port 3000.
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
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

## Environment Variables

Copy the example file and then fill in real values:

```bash
cp .env.example .env.local
```

Required runtime variables:

```env
NEXT_PUBLIC_API_MODE=mock
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-04
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-strong-random-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
# Optional: required only for private Sanity datasets
SANITY_READ_TOKEN=your-sanity-read-token
# Optional: if not set, app uses built-in fallback endpoint
GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/your-script-id/exec
# Optional: enables bundle analyzer when running `pnpm analyze`
ANALYZE=false
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

## License

This project is private and proprietary.
