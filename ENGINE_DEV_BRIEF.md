# Evolution Engine — Developer Brief  
_Authoritative Architecture Document for evolution-3.1_

This document defines the architecture, structure, and development rules for all Evolution Engine modules.  
It is the single source of truth for:

- Module boundaries  
- Folder structure  
- Naming conventions  
- Data schemas  
- Document generation  
- AI assistant behaviour  

It ensures a clean, modular, scalable system with minimal drift or duplication.

---

# 1. Purpose

The Evolution Engine is the internal application powering:

- Owner onboarding  
- Horse submission  
- Term Sheet collection  
- Compliance workflows  
- Document generation (PDS, Syndicate Agreement, NZTR forms)  
- Tokinvest tokenisation metadata  
- Internal approvals and audit trail  

The aim is to create a **single structured workflow** that turns a real-world horse into a fully compliant digital-syndication asset.

---

# 2. Architecture Principles

1. **Modular by default**  
   Every Engine module lives in isolation:  
   `/engine/owners`, `/engine/valuation`, `/engine/studio`, etc.

2. **Single Source of Knowledge (SSOK): The Term Sheet**  
   All structured data comes from the Term Sheet schema  
   (`termSheetSchema.ts`).  
   No other file may introduce new fields.

3. **Schema-first development**  
   Use Zod schemas as the foundation for all forms, validation, and document generation.

4. **Separation of Concerns**  
   - `/app` → UI  
   - `/lib` → business logic  
   - `/services` → backend services / server actions  
   - `/types` → schemas + TypeScript definitions  

5. **No cross-module dependencies**  
   Modules may read shared utilities but not depend on one another.

6. **AI Safety**  
   AI tools must follow this brief, may not write outside Engine folders, and cannot invent new fields or endpoints.

---

# 3. Folder Structure (must be followed exactly)

```
src/
  app/
    engine/
      owners/
        page.tsx
        submit/
          page.tsx
        review/
          page.tsx
        complete/
          page.tsx
      valuation/
      studio/

  lib/
    owners/
      validation.ts
      transform.ts
      documentGenerator.ts

  services/
    owners/
      submitHorse.ts
      generateDocuments.ts
      notifyNZTR.ts
      prepareTokinvestListing.ts

  types/
    owners/
      termSheetSchema.ts
      horseSchema.ts
      ownerSchema.ts
      listingSchema.ts
```

---

# 4. Core Schemas (Zod)

## 4.1 Term Sheet Schema (SSOK)

This schema is the authoritative source of all data in the syndication workflow.

Downstream schemas must import fields from here.

Includes:

- Horse identity  
- Lease details  
- Duration  
- Stakes  
- Price  
- Reward split  
- Owner details  
- Trainer details  
- Racing Manager approval  
- Vet status  
- Tokenisation details  

## 4.2 Horse Schema  
Derived from Term Sheet.

## 4.3 Owner Schema  
Derived from Term Sheet.

## 4.4 Listing Schema  
Defines tokenisation economics and Tokinvest metadata.

---

# 5. Workflow Pipeline

## Step 1 — Owner submits Term Sheet  
UI writes into `termSheetSchema`.

## Step 2 — Validation  
Zod validation performed in `/lib/owners/validation.ts`.

## Step 3 — Document Generation  
`documentGenerator.ts` produces:

- PDS  
- Syndicate Agreement  
- NZTR forms  
- Internal compliance report  
- Tokinvest metadata  

## Step 4 — Notify  
`notifyNZTR.ts`  
`prepareTokinvestListing.ts`

## Step 5 — Completion  
Owner sees "Your horse is under review."

---

# 6. Coding Rules

- Use TypeScript everywhere.  
- Zero `any`.  
- Use Zod for all validation.  
- No dynamic imports unless necessary.  
- No business logic inside components.  

---

# 7. AI Usage Rules

AI assistants (VS Code / Windsurf):

1. Must follow this brief as the highest authority.  
2. May write only inside Engine folders, lib/owners, services/owners, types/owners.  
3. May not modify root marketing pages or unrelated components.  
4. May not invent unapproved fields, schemas, or logic.  
5. Must follow schema-first development.

---

# 8. Future Modules (reserved space)

- Investor onboarding  
- Allocation manager  
- Distribution engine  
- Price/valuation tools  
- Compliance dashboards  
- Studio content pipeline  

---

# 9. Principle

Measure twice, cut once.  
The structure comes first — then the code.

This document must not be modified without architectural approval.
