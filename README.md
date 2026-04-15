# Evolution Platform - Marketplace

This README provides an overview of the Evolution Marketplace project, which is built on top of the Evolution Platform.

## Overview

The Evolution Marketplace is a comprehensive horse marketplace platform. Its architecture is distributed across different projects within this workspace, primarily:

- **`SSOT_Build`**: The "Single Source of Truth" for all canonical data related to horses, leases, and offerings.
- **`Evolution_Platform`**: This project, which provides the user-facing experience, including the marketplace UI, investor flows, and eventually, transaction handling.

The relationship and data flow between these projects is defined in the [Evolution Stables Marketplace Orchestration Blueprint](/home/evo/workspace/_docs/agent-stack/EVOLUTION_STABLES_MARKETPLACE_ORCHESTRATION_2026-04-10.md).

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

The basic data flow is as follows:

1.  Canonical horse and lease data is created and maintained in the `SSOT_Build` project.
2.  A publishing script in `SSOT_Build` generates a marketplace payload (e.g., a JSON file).
3.  The `Evolution_Platform` (this project) reads the published payload to display the marketplace listings.
4.  The `Evolution_Platform` does **not** directly modify the canonical data in `SSOT_Build`.

This separation of concerns ensures data integrity and a clean architecture.

For more detailed information on the architecture, development stages, agent roles, and more, please refer to the [Evolution Stables Marketplace Orchestration Blueprint](/home/evo/workspace/_docs/agent-stack/EVOLUTION_STABLES_MARKETPLACE_ORCHESTRATION_2026-04-10.md).
