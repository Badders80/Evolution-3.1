# Merge Conflict Resolution Log - Jules-merge

This document records the strategic decisions made during the unification of `codex-optimised`, `kilo-optimised`, `glm-optimised`, and `jules-optimised`.

## 1. Layout Metadata (RESOLVED)
**Files:** `src/app/layout.tsx`
**Conflict:** Different descriptions and OG images.
**Resolution:**
- Adopted Kilo's more descriptive and keyword-rich titles and descriptions for better SEO.
- Kept Codex's OG image logic (1200x630 dimensions) for better social sharing preview.
- Merged Twitter card metadata from Codex.

## 2. FAQ Structured Data (RESOLVED)
**Files:** `src/components/seo/FAQStructuredData.tsx`
**Conflict:** Different implementations between Kilo and Codex.
**Resolution:**
- Adopted the `'use client'` directive and React imports from Kilo to ensure compatibility when imported into client-side components.
- Maintained the clean JSON-LD structure common to both.

## 3. Page Metadata (RESOLVED)
**Files:** `src/app/marketplace/layout.tsx`, `src/app/mystable/layout.tsx`, `src/app/valuation/layout.tsx`
**Conflict:** Codex had existing layouts; Kilo had metadata in pages.
**Resolution:**
- Merged Kilo's refined metadata into Codex's layout files, keeping the metadata separate from the client-side page components.

## 4. Organization Schema (RESOLVED)
**Files:** `src/components/seo/StructuredData.tsx`
**Conflict:** GLM had more automated/descriptive organization schema.
**Resolution:**
- Adopted GLM's version which includes a more comprehensive list of keywords and a more detailed brand description.

## 5. Waitlist Strategy (RESOLVED)
**Files:** `src/app/page.tsx`
**Conflict:** Kilo used inline state; Codex used `WaitlistOverlayController`.
**Resolution:**
- Retained Codex's `WaitlistOverlayController` for better architectural separation and "conversion engine" robustness.

## 6. Infrastructure (NO CONFLICT)
**Resolution:**
- Wholesale adoption of Codex's infrastructure (Next.js 14.2.35, pnpm, CI/CD) as it was the most advanced and secure.

## 7. Directory Structure (RESOLVED)
**Files:** `app/` vs `src/app/`
**Conflict:** Redundant root-level `app/` directory containing proxies caused Next.js routing conflicts (404s).
**Resolution:**
- Removed all Next.js proxy files from the root `app/` directory.
- Moved Python backend files from `app/` to `src/python_backend/` to strictly adhere to the `src/` convention.
- This ensures Next.js correctly prioritizes `src/app/` and resolves routing issues.
