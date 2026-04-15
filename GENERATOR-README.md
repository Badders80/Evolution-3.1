# Simple Investor Update Generator

A streamlined Node.js tool for generating branded HTML investor updates that match your Evolution Platform styling.

## Usage

### Direct Node.js
```bash
node generate-simple.js <input.json> [output.html]
```

### NPM Scripts
```bash
# Generate from test data
npm run generate:simple test-update.json

# Generate with automatic naming
npm run generate:simple:example
```

## Input Format

Create a JSON file with your update content:

```json
{
  "heading": "Your Update Title",
  "subheading": "Optional subtitle",
  "content": "Your main content here. Multiple paragraphs work fine.",
  "quote": "Optional quote text",
  "quoteAttribution": "Quote source",
  "imageUrl": "Optional image URL"
}
```

## Example

```bash
# Generate from test data
node generate-simple.js test-update.json

# Generate with custom output location
node generate-simple.js my-update.json public/updates/custom-name.html
```

## Features

- ✅ Exact Evolution Platform branding (Playfair Display, Inter fonts, #d4a964 gold accents)
- ✅ Responsive design optimized for email and web
- ✅ Inline CSS for email compatibility
- ✅ Automatic file naming with timestamps
- ✅ No external dependencies
- ✅ Simple JSON input format

## Output

Generates HTML files in `public/updates/` with your Evolution Platform branding intact.