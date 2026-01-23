# Evolution Stables Typography System
## Institutional-Grade Design System (Audi-Inspired)

---

## 🎯 Design Philosophy

This system follows the same disciplined approach as premium brands like Audi:
- **Constraint over choice** - Limited, purposeful options
- **Systematic consistency** - Every element follows rules
- **Engineered precision** - Exact values, not approximations
- **Semantic meaning** - Names describe purpose, not appearance

---

## 📐 Typography Scale

### Headings

```tsx
// H1 - Hero Headings (refined for better hierarchy)
text-h1          // 52px / 1.1 line-height / 0.02% tracking / 300 weight
text-h1-mobile   // 42px / 1.1 line-height / 0.02% tracking / 300 weight

// H2 - Section Headings (refined for better hierarchy)
text-h2          // 32px / 1.3 line-height / 0.01% tracking / 400 weight
text-h2-mobile   // 26px / 1.3 line-height / 0.01% tracking / 400 weight

// H3 - Subsection Headings
text-h3          // 24px / 1.5 line-height / 0.01% tracking / 600 weight

// H4 - Card/Feature Headings
text-h4          // 20px / 1.5 line-height / 0.1em tracking / 600 weight
```

### Body Text

```tsx
// Large Body - Lead paragraphs
text-body-lg     // 20px / 1.7 line-height / 0 tracking / 300 weight

// Standard Body - Default text
text-body        // 16px / 1.7 line-height / 0 tracking / 400 weight

// Small Body - Captions, footnotes
text-body-sm     // 14px / 1.4 line-height / 0 tracking / 400 weight
```

### UI Elements

```tsx
// Labels - Overlines, navigation, tags
text-label       // 12px / 1.4 line-height / 0.25em tracking / 500 weight

// Subheads - Feature titles, card headers
text-subhead     // 16px / 1.5 line-height / 0.1em tracking / 500 weight
```

---

## 🎨 Color System

### Typography Colors

```tsx
// Primary - Headings, emphasis
text-primary     // #ffffff (pure white)

// Secondary - Body text, descriptions  
text-secondary   // #cccccc (light gray)

// Muted - Labels, overlines, de-emphasized text
text-muted       // #999999 (mid gray)
```

### Brand Colors

```tsx
// Accent color for interactive elements
text-primary     // #d4a964 (Evolution gold)
hover:text-primary
group-hover:text-primary
```

---

## 📏 Letter Spacing Tokens

```tsx
tracking-tightest   // -0.015em (large display only)
tracking-tighter    // -0.01em  (headlines)
tracking-tight      // -0.005em (subheads)
tracking-normal     // 0        (body text)
tracking-label      // 0.1em    (uppercase subheads)
tracking-wide       // 0.25em   (uppercase labels)
```

**Rule**: Use only `tracking-label` or `tracking-wide` for uppercase text.

---

## 📐 Line Height Tokens

```tsx
leading-display     // 1.2 (large headings)
leading-heading     // 1.5 (H2-H4)
leading-body        // 1.7 (paragraphs)
leading-ui          // 1.4 (labels, UI elements)
```

---

## ⚖️ Font Weights

**Limited to 3 weights max:**

```tsx
font-light     // 300 - Hero text, lead paragraphs (elegance)
font-normal    // 400 - Body text, standard UI (default)
font-semibold  // 600 - Headings, emphasis (authority)
```

**Do not use**: `font-thin`, `font-extralight`, `font-medium`, `font-bold`, `font-extrabold`

---

## 📋 Common Patterns

### Section Label (Overline)
```tsx
<p className="text-label uppercase mb-8 text-muted">
  SECTION NAME
</p>
```

### Hero Heading
```tsx
<h1 className="text-h1-mobile md:text-h1 text-primary">
  Main Headline
</h1>
```

### Lead Paragraph
```tsx
<p className="text-body-lg text-secondary max-w-4xl">
  Introductory paragraph text...
</p>
```

### Body Paragraph
```tsx
<p className="text-body text-secondary max-w-2xl">
  Standard body text...
</p>
```

### Card Heading (Uppercase)
```tsx
<h4 className="text-h4 uppercase text-primary group-hover:text-primary transition-colors">
  FEATURE NAME
</h4>
```

### Feature Subhead (Uppercase)
```tsx
<h4 className="text-subhead uppercase text-primary mb-2">
  SUBHEADING
</h4>
```

### Button Text
```tsx
<button className="text-label uppercase">
  CALL TO ACTION
</button>
```

---

## 🚫 Anti-Patterns (Do Not Use)

❌ Mixing tracking values for same element type
❌ Using arbitrary font weights (stick to 300, 400, 600)
❌ Inconsistent line heights (use tokens)
❌ Color mixing (`text-gray-300`, `text-gray-400`, etc.)
❌ Random letter spacing (`tracking-[0.3em]`, `tracking-[0.4em]`)
❌ Generic utilities without semantic meaning

---

## ✅ Checklist for New Components

- [ ] Use typography scale tokens (`text-h1`, `text-body`, etc.)
- [ ] Use color tokens (`text-primary`, `text-secondary`, `text-muted`)
- [ ] Use tracking tokens (`tracking-label`, `tracking-wide`)
- [ ] Use line-height tokens (`leading-display`, `leading-body`, etc.)
- [ ] Limit to 3 font weights (300, 400, 600)
- [ ] Use `uppercase` class for labels/buttons
- [ ] Apply `max-w-*` constraints for readability
- [ ] Zero margins on headings (control with spacing utilities)

---

## 📊 Before & After Comparison

### Before (Inconsistent)
```tsx
// Multiple tracking values
tracking-[0.2em]
tracking-[0.3em]  
tracking-[0.4em]

// Multiple font weights
font-extralight
font-light
font-medium
font-semibold

// Mixed colors
text-gray-300
text-gray-400
text-foreground

// Generic line heights
leading-relaxed
leading-tight
```

### After (Systematic)
```tsx
// Two tracking values
tracking-label    // 0.1em for uppercase subheads
tracking-wide     // 0.25em for uppercase labels

// Three font weights
font-light        // 300 for elegance
font-normal       // 400 for default
font-semibold     // 600 for emphasis

// Three colors
text-primary      // white for headings
text-secondary    // light gray for body
text-muted        // mid gray for labels

// Explicit line heights
leading-display   // 1.2 for H1
leading-heading   // 1.5 for H2-H4
leading-body      // 1.7 for paragraphs
leading-ui        // 1.4 for labels
```

---

## 🎯 Key Takeaways

1. **Constraint = Consistency** - Fewer choices lead to better results
2. **Semantic naming** - Names describe purpose, not appearance
3. **Explicit values** - No generic utilities like "relaxed" or "tight"
4. **System thinking** - Every decision follows the rules
5. **Premium feel** - Audi-grade discipline = institutional trust

---

## 📚 Usage in Code

Import and use the system:

```tsx
// Section heading pattern
<section>
  <p className="text-label uppercase text-muted mb-8">
    SECTION LABEL
  </p>
  <h2 className="text-h1-mobile md:text-h1 text-primary mb-8">
    Main Heading
  </h2>
  <p className="text-body-lg text-secondary max-w-4xl">
    Lead paragraph with increased readability...
  </p>
</section>

// Card pattern
<div className="group">
  <h4 className="text-h4 uppercase text-primary group-hover:text-primary">
    FEATURE NAME
  </h4>
  <p className="text-body text-secondary max-w-[42ch]">
    Description text constrained for optimal reading.
  </p>
</div>
```

---

## 🔄 Migration Guide

When updating existing components:

1. Replace arbitrary tracking with tokens
2. Consolidate font weights to 3 max
3. Use color system (`text-primary`, `text-secondary`, `text-muted`)
4. Replace generic line heights with explicit tokens
5. Add max-width constraints for body text
6. Use responsive heading scales (`text-h1-mobile md:text-h1`)

---

## 📈 Benefits

- **Faster development** - Clear patterns to follow
- **Easier maintenance** - Consistent system to update
- **Better performance** - Fewer font weights loaded
- **Premium perception** - Disciplined design = trust
- **Scalability** - System grows without breaking

---

**Last Updated**: October 2025  
**System Version**: 1.0  
**Based on**: Audi Design System principles
