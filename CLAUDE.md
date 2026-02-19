# CLAUDE.md - Evolution-3.1

## What this repo is and what it solves
Evolution-3.1 is a Next.js 14 web application that serves as the public-facing website for Evolution Stables. It solves the problem of providing a modern, mobile-first interface for potential owners to learn about the platform, explore horses, and sign up for ownership opportunities.

## Full Stack
### What IS used:
- **Next.js 14** with App Router for routing and server-side rendering
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **NextAuth.js** for authentication
- **Supabase** for database and storage
- **Vercel** for deployment

### What IS NOT used:
- **Create React App**: Not used (Next.js 14 with App Router preferred)
- **Styled Components**: Not used (Tailwind CSS preferred)
- **Firebase**: Not used (Supabase preferred)

## Hard Coding Rules

1. **No empty placeholder files** - Implement or don't create the file
2. **TypeScript first** - All new code must be TypeScript
3. **Mobile-first design** - Start with mobile and scale up
4. **Performance optimized** - Use Next.js 14 features (Streaming, Partial Prerendering)
5. **Environment validation** - Follow env.ts startup validation pattern

## Project Structure
```
Evolution-3.1/
├── src/
│   ├── app/              # App Router pages and API routes
│   │   ├── api/          # Backend API routes
│   │   ├── dashboard/    # Owner dashboard (protected)
│   │   ├── horses/       # Horse profiles
│   │   └── login/        # Authentication page
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Generic components (Button, Input, etc.)
│   │   ├── layout/       # Layout components (Header, Footer, etc.)
│   │   └── sections/     # Section components for pages
│   ├── lib/              # Utility libraries
│   │   ├── api/          # API client (both local and real endpoints)
│   │   ├── constants/    # Constants (colors, fonts, etc.)
│   │   ├── hooks/        # Custom React hooks
│   │   └── utils/        # Utility functions
│   ├── styles/           # Global styles and Tailwind config
│   └── types/            # TypeScript type definitions
├── public/               # Static assets (images, fonts, etc.)
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript configuration
```

## Key Features
1. **Horse Profiles**: Detailed profiles for each horse including stats and photos
2. **Owner Dashboard**: Protected area for owners to view their horses and updates
3. **Press Updates**: Display of press updates from Evolution_Studio
4. **Valuation Calculator**: Horse valuation calculator based on various factors
5. **Authentication**: NextAuth.js with Google and GitHub providers

## Environment Variables
Required environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## WSL2 Paths
- **Project Path**: `/home/evo/projects/Evolution-3.1/`
- **Windows Path**: `C:\Users\Evo\projects\Evolution-3.1\`
- **Dev Server Port**: 3000 (default)

## Current Phase and Next Build Target
- **Current Phase**: Foundation Layer
- **Next Build Target**: Integrate with Evolution_Studio for content display

## Commands
- **Dev Server**: `npm run dev` (runs on port 3000)
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`
- **Type Check**: `npm run type-check`

## Source of Truth
**All development standards are defined in 00_DNA**:
- **Build Philosophy**: `/home/evo/00_DNA/build-philosophy/Master_Config_2026.md`
- **System Prompts**: `/home/evo/00_DNA/system-prompts/PROMPT_LIBRARY.md`
- **Brand Voice**: `/home/evo/00_DNA/brand-identity/BRAND_VOICE.md`
- **Workflows**: `/home/evo/00_DNA/workflows/`

**Key Files to Reference**:
1. `/home/evo/00_DNA/AGENTS.core.md` - Universal agent rules
2. `/home/evo/00_DNA/build-philosophy/Master_Config_2026.md` - Hardware and architecture specs
3. `/home/evo/00_DNA/brand-identity/MESSAGING_CHEAT_SHEET.md` - Brand voice guidelines
