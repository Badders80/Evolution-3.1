# Where Your Press Articles Appear

## 🎯 Visual Guide

When you add an article to `/src/lib/press-articles.ts`, it automatically appears in **3 key places**:

---

## 1️⃣ Homepage - "As Featured In" Section

**Location:** Between "Get Started" and "FAQ" sections

**What visitors see:**
```
┌─────────────────────────────────────────────────┐
│           AS FEATURED IN                        │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐           │
│  │ INVESTING.COM│  │ YOUR NEXT    │           │
│  │ Dec 2024     │  │ ARTICLE      │           │
│  │              │  │              │           │
│  │ Tokinvest    │  │ Article      │           │
│  │ and Singular │  │ Title        │           │
│  │ ry Partner...│  │ Here...      │           │
│  │              │  │              │           │
│  │ Read Article→│  │ Read Article→│           │
│  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────┘
```

**Features:**
- Clean, professional design
- Hover effects
- Opens in new tab
- Mobile responsive
- Shows publisher, date, title, excerpt

---

## 2️⃣ Google Search Results - Structured Data

**What Google sees (invisible to users):**

```json
{
  "@type": "Organization",
  "name": "Evolution Stables",
  "subjectOf": [
    {
      "@type": "NewsArticle",
      "headline": "Tokinvest and Singularry Partner...",
      "url": "https://investing.com/...",
      "publisher": "Investing.com",
      "datePublished": "2024-12-19"
    }
  ]
}
```

**How it helps:**
- Google associates articles with your brand
- Articles may appear in brand search results
- Builds authority and trust signals
- Enables rich snippets

**Example search result:**
```
Evolution Stables - Digital Racehorse Ownership
https://evolutionstables.nz
Own racehorses through digital-syndication...

In the news:
→ Tokinvest and Singularry Partner... - Investing.com
→ Your next article... - Publisher Name
```

---

## 3️⃣ Page Source Code - Meta Tags

**What's in the HTML `<head>`:**

```html
<head>
  <!-- Enhanced Meta Tags -->
  <title>Evolution Stables - Digital Racehorse Ownership | Tokenized RWA Platform</title>
  <meta name="description" content="Own racehorses through digital-syndication..." />
  <meta name="keywords" content="racehorse ownership, Tokinvest, Singularry..." />
  
  <!-- Open Graph for Social Sharing -->
  <meta property="og:title" content="Evolution Stables..." />
  <meta property="og:description" content="..." />
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Evolution Stables",
      "subjectOf": [
        // Your press articles here
      ]
    }
  </script>
</head>
```

---

## 🔍 How Search Engines Use This

### Google's Process:

1. **Crawls your site** → Finds sitemap.xml
2. **Reads structured data** → Sees press articles
3. **Indexes content** → Associates articles with brand
4. **Ranks pages** → Higher authority = better rankings
5. **Shows results** → Articles appear in brand searches

### Timeline:

```
Week 1-2:  Crawling & Indexing
Week 2-4:  Initial rankings
Month 2-3: Improved visibility
Month 3-6: Established authority
```

---

## 📱 What Users Experience

### Desktop View:
```
┌────────────────────────────────────────────────────┐
│  [Evolution Logo]    About  Mission  Marketplace   │
├────────────────────────────────────────────────────┤
│                                                    │
│  [Hero Section]                                    │
│  Own the Future of Racing                          │
│                                                    │
├────────────────────────────────────────────────────┤
│  [About Section]                                   │
├────────────────────────────────────────────────────┤
│  [Mission Section]                                 │
├────────────────────────────────────────────────────┤
│  [Get Started Section]                             │
├────────────────────────────────────────────────────┤
│                                                    │
│           AS FEATURED IN                           │
│                                                    │
│  [Article 1]  [Article 2]  [Article 3]            │
│                                                    │
├────────────────────────────────────────────────────┤
│  [FAQ Section]                                     │
├────────────────────────────────────────────────────┤
│  [Footer]                                          │
└────────────────────────────────────────────────────┘
```

### Mobile View:
```
┌──────────────────┐
│ [Logo]      ☰    │
├──────────────────┤
│                  │
│ [Hero]           │
│                  │
├──────────────────┤
│ [About]          │
├──────────────────┤
│ AS FEATURED IN   │
│                  │
│ ┌──────────────┐ │
│ │ Article 1    │ │
│ └──────────────┘ │
│ ┌──────────────┐ │
│ │ Article 2    │ │
│ └──────────────┘ │
│                  │
├──────────────────┤
│ [FAQ]            │
└──────────────────┘
```

---

## 🎨 Design Details

### Press Mentions Section Styling:

**Colors:**
- Background: Black with subtle transparency
- Border: White with 5% opacity
- Text: White with varying opacity
- Accent: Gold (#d4a964) on hover

**Effects:**
- Subtle glow on hover
- Smooth transitions
- Scale animation (1.02x)
- Arrow slides right on hover

**Typography:**
- Publisher: 10px, uppercase, gold
- Title: 15px, light weight
- Excerpt: 13px, 50% opacity
- Date: 10px, 40% opacity

---

## 🔧 Technical Implementation

### Component Structure:

```
PressMentions Component
├── Section Container
│   ├── "AS FEATURED IN" Label
│   └── Articles Grid
│       ├── Article Card 1
│       │   ├── Publisher & Date
│       │   ├── Title
│       │   ├── Excerpt
│       │   └── "Read Article" Link
│       ├── Article Card 2
│       └── Article Card 3
```

### Responsive Breakpoints:

- **Mobile (< 768px):** 1 column
- **Tablet (768px - 1024px):** 2 columns
- **Desktop (> 1024px):** 3 columns

---

## 📊 SEO Impact

### Before Implementation:
```
Search: "Evolution Stables"
Result: Basic listing
Authority: Low
Backlinks: Few
```

### After Implementation:
```
Search: "Evolution Stables"
Result: Enhanced listing with articles
Authority: Growing
Backlinks: Multiple from press
Keywords: Ranking for "Tokinvest", "Singularry", "RWA"
```

---

## ✨ Key Benefits

### For SEO:
✅ Articles linked to your brand
✅ Structured data for rich snippets
✅ Keyword associations
✅ Authority building

### For Users:
✅ Social proof
✅ Credibility
✅ Easy access to press coverage
✅ Professional appearance

### For You:
✅ Easy to manage (one file)
✅ Automatic updates everywhere
✅ No media page needed
✅ Scalable solution

---

## 🚀 Adding Your Next Article

**Step 1:** Get press coverage
**Step 2:** Open `/src/lib/press-articles.ts`
**Step 3:** Add article details
**Step 4:** Save file
**Step 5:** Done! It appears everywhere automatically

---

## 📈 Measuring Success

### Track These:

1. **Google Search Console**
   - Impressions for brand terms
   - Click-through rate
   - Backlinks from articles

2. **Google Analytics**
   - Referral traffic from press
   - Time on site
   - Conversion rate

3. **Rankings**
   - "Evolution Stables"
   - "Digital racehorse ownership"
   - "Tokinvest" + "racing"
   - "Singularry" + "RWA"

---

**That's it!** Your articles now work hard for your SEO without needing a dedicated media page.
