# Quick Guide: Adding Press Articles

## Simple 3-Step Process

### Step 1: Open the Press Articles File
```bash
/src/lib/press-articles.ts
```

### Step 2: Add Your Article
Copy this template and fill in your details:

```typescript
{
  title: 'Full Article Title Here',
  url: 'https://publication.com/full-article-url',
  publisher: 'Publication Name',
  date: '2025-01-15', // Format: YYYY-MM-DD
  excerpt: 'A brief 1-2 sentence summary of what the article is about.',
},
```

### Step 3: Save the File
That's it! The article will automatically appear:
- ✅ On your homepage in the "As Featured In" section
- ✅ In your SEO structured data for Google
- ✅ In search engine results

## Example

Here's the Investing.com article already added:

```typescript
{
  title: 'Tokinvest and Singularry Superapp Partner to Make Regulated Real-World Asset Investing Accessible to Everyone',
  url: 'https://www.investing.com/news/cryptocurrency-news/tokinvest-and-singularry-superapp-partner-to-make-regulated-realworld-asset-investing-accessible-to-everyone-4316762',
  publisher: 'Investing.com',
  date: '2024-12-19',
  excerpt: 'Strategic partnership bringing regulated real-world asset investing to mainstream audiences through innovative digital platforms.',
},
```

## Tips

- **Title**: Use the exact article headline
- **URL**: Full URL including https://
- **Publisher**: The publication name (e.g., "Forbes", "TechCrunch")
- **Date**: When the article was published (YYYY-MM-DD format)
- **Excerpt**: Optional but recommended - helps with SEO and user engagement

## Where to Find the File

```
Evolution-3.1/
└── src/
    └── lib/
        └── press-articles.ts  ← Edit this file
```

## Need Help?

See the full `SEO_GUIDE.md` for more details about SEO strategy and implementation.
