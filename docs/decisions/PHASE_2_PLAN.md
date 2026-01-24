# Phase 2 Plan: Marketplace Features

This document outlines the roadmap and technical design for the Evolution Stables Marketplace.

---

## 1. Overview
Phase 2 transitions the platform from a static information site to a dynamic marketplace where users can view horse listings, sign up for ownership, and manage their portfolio.

## 2. Database Schema Design

### Core Models (Prisma/Postgres)

```prisma
// Horse Listing
model Horse {
  id              String   @id @default(cuid())
  name            String
  age             Int
  lineage         String
  stats           Json     // Performance metrics
  totalValue      Decimal
  sharesAvailable Int
  syndicatorId    String   @default("evolution-stables")
  status          String   @default("active") // active, fully_funded, retired
  media           Json     // Image/Video URLs
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  ownerships      Ownership[]
}

// Ownership Stake
model Ownership {
  id              String   @id @default(cuid())
  userId          String
  horseId         String
  horse           Horse    @relation(fields: [horseId], references: [id])
  sharePercentage Decimal
  purchasePrice   Decimal
  status          String   @default("active") // active, listed_for_sale, sold
  purchaseDate    DateTime @default(now())
}

// Transaction History
model Transaction {
  id              String   @id @default(cuid())
  type            String   // BUY, SELL, TRADE
  horseId         String
  fromUserId      String?
  toUserId        String
  shares          Int
  amount          Decimal
  timestamp       DateTime @default(now())
  status          String   @default("completed")
}

// Audit Log (FMA Compliance)
model AuditLog {
  id              String   @id @default(cuid())
  action          String
  userId          String?
  resourceId      String?
  details         Json
  ipAddress       String?
  timestamp       DateTime @default(now())
}
```

---

## 3. Authentication Flow

We will use **NextAuth.js** for a secure, seamless experience:
- **Provider**: Google OAuth (primary), Email Magic Links (secondary).
- **Session**: JWT-based sessions for performance.
- **Protected Routes**: `/mystable`, `/marketplace/checkout`, and `/admin`.
- **Database Adapter**: Prisma Adapter for Supabase.

---

## 4. API Endpoints (Server Actions)

Mutations will be handled via Server Actions in `src/app/actions/`:
- `purchaseStake(horseId: string, shares: number)`
- `listStakeForSale(ownershipId: string, price: number)`
- `updateUserPreferences(settings: UserSettings)`
- `submitKYC(data: KYCData)` (Future)

---

## 5. Component Structure

The Marketplace will introduce several new feature components:
- `MarketplaceGrid`: Dynamic filtering and sorting of horse listings.
- `HorseDetailsCard`: Interactive performance stats and lineage visualization.
- `CheckoutModal`: Multi-step purchase flow with payment integration preparation.
- `PortfolioSummary`: Visual representation of a user's holdings in `MyStable`.

---

## 6. Regulatory & Compliance (FMA)

- **KYC/AML**: Integration with a 3rd party verification service (e.g., Akahu or similar) for Phase 2.5.
- **Transparency**: Every listing must display the FMA-mandated disclosures and valuation methodology.
- **Audit Trails**: Every state change in ownership must be recorded in the `AuditLog`.

---

## 7. Next Steps

1. Setup Supabase project and connect Prisma.
2. Implement NextAuth configuration.
3. Migrate existing static horse data to the database.
4. Build the dynamic Marketplace listing page.
