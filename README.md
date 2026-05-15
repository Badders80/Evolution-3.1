# Evolution Platform

The clean public-facing website for Evolution Stables — [evolutionstables.nz](https://evolutionstables.nz).

## Scope

This repo is the **production public website only**. It contains:

- Homepage, About, Press, Privacy, Terms, Updates, Valuation
- `/marketplace` — "Coming Soon" placeholder
- `/mystable` — "Coming Soon" placeholder

All functional marketplace, MyStable, token, and blockchain features live in **`Evolution_Token`** — the testing and development build. Features merge back into Platform only when production-ready.

## Legacy Designs

The original mockup pages for Marketplace and MyStable featured glassmorphic blur-to-"Coming Soon" overlays with mock data. These were removed from this repo during the public-site cleanup (May 2026) but are preserved in git history for future reference:

- **Marketplace mockup**: Trading window image with blur transition, BentoGrid module cards (Digital Syndication, Integration & Compliance, Analytics & Insights, Ownership Dashboard)
- **MyStable mockup**: Full dashboard with mock horse portfolio (Thunder Strike, Golden Horizon, Midnight Runner), portfolio stats ($245.8k total value, 8.2% returns), glassmorphic blur overlay transitioning to "Coming Soon"

To recover these designs, check git history at the commit before the cleanup, or look in `Evolution_Token` which carries forward the functional versions.

## Architecture

The project follows a layered architecture:

- **Knowledge Layer**: `/home/evo/workspace/projects/SSOT_Build`
  - This layer owns all the core data. New horse records are authored here.
- **Publish Layer**: `/home/evo/workspace/projects/SSOT_Build/scripts/publish-marketplace-v0.mjs`
  - A script that prepares and "publishes" the marketplace data from the `SSOT_Build` project for consumption by the `Evolution_Platform`.
- **Experience Layer**: `/home/evo/workspace/projects/Evolution_Platform`
  - This project consumes the data from the Publish Layer to render the marketplace to the user. It does not author its own horse or lease data.
- **Asset Layer**: Local files and Google Drive.
  - Assets are referenced by metadata rather than being embedded in records.
- **Transaction Layer**: Manual for now.
  - This will be built out in the `Evolution_Platform` in the future.

## Data Flow

1. Canonical horse and lease data is created and maintained in the `SSOT_Build` project.
2. A publishing script in `SSOT_Build` generates a marketplace payload (e.g., a JSON file).
3. The `Evolution_Platform` (this project) reads the published payload to display the marketplace listings.
4. The `Evolution_Platform` does **not** directly modify the canonical data in `SSOT_Build`.

For more detailed information on the architecture, development stages, agent roles, and more, please refer to the [Evolution Stables Marketplace Orchestration Blueprint](/home/evo/workspace/_docs/agent-stack/EVOLUTION_STABLES_MARKETPLACE_ORCHESTRATION_2026-04-10.md).

## Context Chain

<- inherits from: /home/evo/workspace/AGENTS.md
-> conventions: /home/evo/workspace/DNA/ops/CONVENTIONS.md
