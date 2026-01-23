# Evolution Stables UI Pattern Audit

This report documents the existing UI patterns identified in the Evolution-3.1 codebase for standardization into the Evolution 4.0 UI System.

## 1. Card Patterns

### 1.1 BentoCard
- **Source**: `src/components/layout/Bento.tsx`
- **Usage**: Marketplace modules, feature highlights.
- **Characteristics**:
  - Wide (2-column) and Standard (1-column) variants.
  - Linear gradients and glassmorphism (border-white/10).
  - Lucide icons.
  - Animated transitions.

### 1.2 HorseProfileCard (Internal)
- **Source**: `src/app/mystable/page.tsx`
- **Usage**: Displaying active ownership stakes.
- **Characteristics**:
  - Status badges (racing, training).
  - Grid of stats (Stake, Investment, Value, Next Race).
  - Performance metrics.
  - Positive/Negative returns styling (emerald/red).

### 1.3 StatCard (Sidebar)
- **Source**: `src/app/mystable/page.tsx`
- **Usage**: Key performance indicators (KPIs) in dashboards.
- **Characteristics**:
  - Large font-medium tracking-tight text for values.
  - Label overlines.
  - Sub-labels for secondary metrics.

### 1.4 News/Press Card
- **Source**: `src/app/press/page.tsx`, `src/components/site/PressShowcase.tsx`
- **Usage**: Displaying press coverage and articles.
- **Characteristics**:
  - Image with grayscale-to-color hover transition.
  - Meta data (Date, Publisher) with divider line.
  - Title with hover color change (brand gold).
  - Multi-line excerpt with clamping.

### 1.5 FAQ Accordion
- **Source**: `src/components/ui/SplitFaq.tsx`
- **Usage**: Common questions.
- **Characteristics**:
  - Animated height transitions.
  - Clean divider lines.

---

## 2. Layout Patterns

### 2.1 Page Shell
- **Usage**: All top-level pages.
- **Characteristics**:
  - `pt-24` or `pt-32` top padding for NavBar clearance.
  - `max-w-7xl` or `max-w-[1440px]` central container.
  - `px-6 sm:px-10 lg:px-12` responsive padding.

### 2.2 Content Section
- **Usage**: Homepage, How It Works.
- **Characteristics**:
  - `py-24` or `py-32` vertical spacing.
  - Alternating backgrounds (`bg-background`, `bg-surface`).

### 2.3 Split Hero Layout
- **Usage**: Marketplace page.
- **Characteristics**:
  - 1/3 text column, 2/3 visual/interactive column.
  - Used for impactful introductions.

---

## 3. Header Patterns

### 3.1 Page Header
- **Usage**: Top of major routes.
- **Characteristics**:
  - Eyebrow (text-xs uppercase tracking-[0.28em] text-white/40).
  - H1 (text-4xl md:text-5xl font-medium tracking-tight).
  - Lead paragraph (text-base text-white/60).

### 3.2 Section Header
- **Usage**: Within pages to introduce features.
- **Characteristics**:
  - Eyebrow label.
  - H2/H3 heading.
  - Optional lead text.

---

## 4. Typography & Icons

### 4.1 Typography
- **Headings**: Geist Sans (Light/Normal/Semibold).
- **Body**: Geist Sans (Normal).
- **Accents**: Italic treatments for emphasis.

### 4.2 Icons
- **Primary**: Lucide React.
- **Secondary**: React Icons (Lu, Fa, etc.).

---

## 5. Identified Patterns for Extraction (TODO)
1. `HorseUpdateCard` (from `public/updates/`)
2. `NewsCard` (Standardized version of press/news cards)
3. `StatCard` (Standardized dashboard stat card)
4. `SectionHeader` (Standardized pattern for consistency)
5. `DataTable` (For future race results and listing tables)
