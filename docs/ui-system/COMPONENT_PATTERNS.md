# Evolution Stables Component Patterns

This document describes the canonical UI patterns for Evolution 4.0. Always use these standardized components to prevent design drift.

## HorseUpdateCard
**Purpose**: Display institutional-grade horse racing updates, training notes, and race results.
**Source**: Extracted from the "First Gear" update pages.
**File**: `src/components/ui-system/patterns/HorseUpdateCard.tsx`

### Modular Components
For longer-form storytelling, the card is decomposed into atomic components located in `src/components/ui-system/patterns/horse-update/`:
- `UpdateHeader`: Type, Horse Name, and Date.
- `UpdateHeadline`: Primary headline and subheadline.
- `UpdateBody`: Paragraphs with optional drop-cap.
- `UpdateBullets`: High-contrast bullet point highlights.
- `UpdateQuote`: Premium testimonial or trainer quote block.
- `UpdateMedia`: Responsive video/media embed.
- `UpdateFooter`: Standardised brand sign-off.

### Props
- `horseName`: string
- `updateDate`: string
- `updateType`: 'TRAINER UPDATE' | 'RACE UPDATE' | 'HEALTH UPDATE'
- `headline`: string
- `subheadline`: string
- `content`: string[]
- `bullets?`: string[]
- `quote?`: { text: string; author: string }
- `mediaEmbed?`: { url: string; aspect: 'landscape' | 'portrait' }

### Usage
```tsx
import { HorseUpdateCard } from '@/components/ui-system/patterns';

<HorseUpdateCard
  horseName="First Gear"
  updateDate="12 Dec 2025"
  updateType="TRAINER UPDATE"
  headline="First Gear NOMINATED"
  subheadline="Stephen Gray outlines the plan for Thursday."
  content={[
    "We often speak about the difference between a horse that can run and a horse that knows how to race...",
    "This morning at Awapuni, the gelding put in a piece of work that signaled a significant shift..."
  ]}
  bullets={["Nominated", "Otaki 19 December", "Race 2, 1200m"]}
/>
```

---

## NewsCard
**Purpose**: Display press coverage and external media features.
**File**: `src/components/ui-system/patterns/NewsCard.tsx`

### Usage
```tsx
import { NewsCard } from '@/components/ui-system/patterns';

<NewsCard
  title="Dubai Racing Club and Tokinvest Announce Partnership"
  excerpt="A groundbreaking collaboration to bring tokenized racehorse ownership to the Middle East..."
  date="20 Jan 2026"
  publisher="BusinessDesk"
  url="https://..."
  imageUrl="/images/press/dubai-racing.jpg"
/>
```

---

## StatCard
**Purpose**: Key performance indicators in dashboards and portfolio summaries.
**File**: `src/components/ui-system/patterns/StatCard.tsx`

### Usage
```tsx
import { StatCard } from '@/components/ui-system/patterns';

<StatCard
  label="Total Value"
  value="$245.8k"
  trend={{ value: "12.3%", isPositive: true }}
/>
```

---

## SectionHeader
**Purpose**: Consistent introduction for page sections.
**File**: `src/components/ui-system/patterns/SectionHeader.tsx`

### Usage
```tsx
import { SectionHeader } from '@/components/ui-system/patterns';

<SectionHeader
  eyebrow="The Process"
  heading="Simplicity by Design"
  description="We've stripped away the complexity of traditional syndication..."
  align="center"
/>
```

---

## DataTable
**Purpose**: Displaying tabular data like race results or ownership breakdowns.
**File**: `src/components/ui-system/patterns/DataTable.tsx`

### Usage
```tsx
import { DataTable } from '@/components/ui-system/patterns';

<DataTable
  data={horses}
  columns={[
    { header: "Horse", accessor: "name" },
    { header: "Stake", accessor: (h) => `${h.stake}%` },
    { header: "Returns", accessor: "returns" }
  ]}
/>
```
