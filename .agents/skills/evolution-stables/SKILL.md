# Evolution Stables — Website Skill

**Scope:** Evolution Stables web platform only. Does NOT cover email templates, investor updates, or iOS.
**Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS + shadcn/ui
**Theme:** Dark mode only. Velvet Night background (#000000). Evolution Gold accent (#d4a964).

---

## 1. Architecture

### Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 + custom CSS variables
- **Components:** shadcn/ui + custom components
- **Fonts:** Geist Sans (primary), Geist Mono (data), Playfair Display (editorial — IU only)
- **Icons:** Lucide React, Radix Icons
- **Animation:** CSS keyframes + Tailwind transitions

### File Structure
```
src/
  app/              # Next.js App Router pages
    marketplace/    # Marketplace page
    mystable/       # MyStable dashboard
    page.tsx        # Homepage
    layout.tsx      # Root layout (NavBar, metadata)
  components/
    layout/         # BentoGrid, BentoCard
    site/           # Footer, HeroSection, NavBar
    ui/             # shadcn/ui components + custom (FixedBg, GrassBg, SplitFaq)
    About/          # About section
    seo/            # StructuredData, FAQStructuredData
  lib/              # Utilities, data fetching
  styles/
    globals.css     # Font faces, CSS variables, keyframes
    brand.css       # Semantic color tokens, shadows, spacing
  types/            # TypeScript types
public/
  images/           # Static assets
  updates/          # Investor update HTML files (separate from website)
```

---

## 2. Design Tokens (Single Source of Truth)

### Colors
All colors are defined in `styles/brand.css` and referenced via CSS variables:

| Token | Value | Usage |
|---|---|---|
| `--color-background` | `#000000` | Page background |
| `--color-surface` | `#0a0a0a` | Elevated surfaces (cards, modals) |
| `--color-surface-alt` | `#111111` | Card fills (portfolio cards) |
| `--color-foreground` | `#f5f5f5` | Primary text |
| `--color-muted` | `#a1a1aa` | Secondary text |
| `--evolution-gold` | `#d4a964` | ONLY accent — CTAs, key metrics, highlights |
| `--color-border` | `rgba(255,255,255,0.06)` | Subtle dividers |

**White opacity scale (Tailwind):**
- `text-white/40` — eyebrow labels, metadata
- `text-white/50` — captions, secondary info
- `text-white/60` — body text on dark
- `text-white/70` — card descriptions
- `text-white/80` — Coming Soon text
- `text-white/90` — headings

**Status colors:**
- `text-emerald-400` / `bg-emerald-500/10` — positive, racing status
- `text-blue-400` / `bg-blue-500/10` — info, training status
- `text-red-400` — negative, losses

### Typography
Font families loaded via `@font-face` in `globals.css`:
- **Primary:** `Geist Sans` (variable font, weights 100-900)
- **Monospace:** `Geist Mono` (data, metrics, timestamps)
- **Display:** `Geist Sans` at light weights for large headings

**Scale (from `tailwind.config.ts`):**
| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `text-h1` | 52px | 1.1 | 300 | Page headings |
| `text-h2` | 32px | 1.3 | 400 | Section headings |
| `text-h3` | 24px | 1.5 | 600 | Card titles |
| `text-body-lg` | 20px | 1.7 | 300 | Large body |
| `text-body` | 16px | 1.7 | 400 | Standard body |
| `text-label` | 12px | 1.4 | 500 | Labels, uppercase |

**Letter spacing:**
- `tracking-tight` (-0.01em) — headings
- `tracking-[0.28em]` — eyebrow labels (brand signature)
- `tracking-[0.3em]` — CTA labels

### Spacing
Base unit: 4px (0.25rem). Key values:
- Page padding: `px-6` (24px) → `md:px-10` (40px) → `lg:px-12` (48px)
- Section gap: `space-y-24` (96px)
- Card padding: `p-6` (24px)
- Grid gap: `gap-8` (32px)

### Shadows
| Token | Value | Usage |
|---|---|---|
| Trading window | `0 30px 120px rgba(0,0,0,0.45)` | Hero containers |
| Card | `0 24px 80px rgba(0,0,0,0.55)` | Bento cards |
| Dashboard | `0 28px 120px rgba(0,0,0,0.55)` | MyStable dashboard |
| Soft | `0 1px 2px rgba(0,0,0,0.25)` | Buttons, interactive |

### Border Radius
| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | 6px | Buttons, small elements |
| `rounded-md` | 10px | Inputs, badges |
| `rounded-lg` | 14px | Cards |
| `rounded-xl` | 20px | Large cards |
| `rounded-3xl` | 24px | Hero containers, Bento cards |
| `rounded-[32px]` | 32px | Dashboard containers |

---

## 3. Component Patterns

### Section Header (Reusable)
Used on marketplace, mystable, and future pages:

```tsx
<div className="space-y-4">
  <p className="text-xs uppercase tracking-[0.28em] text-white/40">
    Evolution Stables
  </p>
  <h2 className="text-4xl font-medium tracking-tight text-white">
    Section Title
  </h2>
  <p className="text-base leading-relaxed text-white/60 max-w-2xl">
    Description text...
  </p>
</div>
```

### Trading Window Container
Hero container with image + blur + Coming Soon overlay:

```tsx
<div className="relative min-h-[400px] overflow-hidden rounded-3xl 
  border border-white/10 
  bg-gradient-to-br from-white/[0.03] via-transparent to-black/80 
  shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
  {/* Image with blur transition */}
  {/* Dark overlay with transition */}
  {/* Faint outline border */}
  {/* Coming Soon text (centered, fades in) */}
</div>
```

**Animation timing:**
- Blur starts: 1800ms delay
- Coming Soon appears: 2600ms delay
- Transition duration: 700ms ease-in-out

### BentoCard
Feature card with icon, title, description, CTA:

```tsx
<div className="group relative col-span-1 flex flex-col overflow-hidden 
  rounded-3xl border border-white/15 bg-black/70 
  shadow-[0_24px_80px_rgba(0,0,0,0.55)]
  transition-transform duration-300 hover:-translate-y-1">
  {/* Background gradient */}
  {/* Icon (absolute top-left) */}
  {/* Content (bottom-aligned) */}
  {/* Hover overlay: group-hover:bg-white/5 */}
</div>
```

### Portfolio Card (MyStable)
Horse stake card with status badge and stats grid:

```tsx
<div className="group relative rounded-xl border border-white/5 bg-[#111111] p-6 
  transition-all hover:border-white/10 hover:bg-[#151515]">
  {/* Title + status badge (racing/training) */}
  {/* Returns percentage (emerald/red) */}
  {/* 4-column stats grid */}
</div>
```

**Status badge pattern:**
```tsx
<span className={`inline-block rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider
  ${status === 'racing' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
  {status}
</span>
```

### Stats Sidebar Card
Metric display with label + big number + change:

```tsx
<div className="flex-1 rounded-xl border border-white/5 bg-[#111111] p-6 
  flex flex-col justify-center">
  <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Label</p>
  <p className="text-3xl font-medium tracking-tight">$245.8k</p>
  <p className="mt-1 text-sm text-emerald-400">+12.3% this month</p>
</div>
```

---

## 4. Animation System

### Key Animations
| Name | Duration | Easing | Usage |
|---|---|---|---|
| `gold-letter-wave` | 8s | cubic-bezier(0.4, 0, 0.2, 1) | Text highlight sweep |
| `shimmer` | 8s | ease-in-out | Surface light sweep |
| `float` | 15s | ease-in-out | Decorative floating |
| `tilt` | 10s | ease-in-out | Subtle rotation |

### Transition Patterns
- **Hover lift:** `transition-transform duration-300 hover:-translate-y-1`
- **Opacity fade:** `transition-opacity duration-700 ease-out`
- **Color transition:** `transition-colors duration-300`
- **Blur transition:** `transition-all duration-700 ease-in-out`

### The "Unblur" Reveal
Signature pattern for dashboard overlays:
1. Content visible at `blur-0`
2. After delay (1800-2200ms), transition to `blur-[1.5px]`
3. Dark overlay fades in (`bg-black/20` → `bg-black/60`)
4. "Coming Soon" text fades in after second delay (2600-2800ms)

---

## 5. Layout Patterns

### Two-Column Hero (1/3 + 2/3)
```tsx
<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
  <div className="space-y-4 lg:col-span-1">{/* Text */}</div>
  <div className="lg:col-span-2">{/* Visual */}</div>
</div>
```

### Dashboard Layout (Fluid + Fixed Sidebar)
```tsx
<div className="grid gap-8 lg:grid-cols-[1fr_320px]">
  <section>{/* Main content */}</section>
  <aside className="flex flex-col gap-4">{/* Sidebar */}</aside>
</div>
```

### BentoGrid
```tsx
<BentoGrid className="gap-3 md:gap-4 auto-rows-auto sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
  {/* Cards */}
</BentoGrid>
```

---

## 6. Rules

### Do
- Use `bg-background` and `text-foreground` as defaults
- Use `border-border` for all dividers
- Use the white opacity scale (`text-white/60`) instead of arbitrary hex values
- Use `tracking-[0.28em]` for eyebrow labels
- Use `rounded-3xl` for hero containers, `rounded-xl` for cards
- Use `space-y-24` between major sections
- Use `max-w-7xl mx-auto` for content containers
- Use `pt-24` / `md:pt-32` for page top padding (below NavBar)

### Don't
- Use arbitrary hex colors — always reference tokens
- Use green, burgundy, or any accent besides Evolution Gold
- Use `font-serif` on the website (reserved for investor updates)
- Mix email styles with website styles
- Use viewport scaling restrictions (removed for accessibility)
- Add gamification elements (no progress bars, badges, points)

---

## 7. External References

- **Design tokens:** `/home/evo/workspace/DNA/brand/design-tokens/`
- **Brand guidelines:** `/home/evo/workspace/DNA/brand/BRAND_SYSTEM.md`
- **Design system:** `/home/evo/workspace/DNA/brand/DESIGN.md`
- **Tailwind config:** `tailwind.config.ts`
- **Global styles:** `src/styles/globals.css`
- **Brand styles:** `src/styles/brand.css`

---

## 8. Email / IU Separation

**This skill is for the WEBSITE only.**

For email/investor updates, see:
- `generate-update.js` — email generator CLI
- `public/updates/` — HTML email templates
- `src/emails/` — transactional email templates
- `DNA/brand/design-tokens/profiles/iu-profile.json` — IU design tokens

**Never mix web and email styles.** They use different:
- Font stacks (web: Geist Sans, email: Inter/Playfair Display)
- Background colors (web: black, email: white)
- Layout constraints (web: fluid, email: 430-600px fixed)
