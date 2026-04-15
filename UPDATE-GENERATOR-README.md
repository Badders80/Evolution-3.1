# Evolution Update Generator

A Node.js CLI tool that generates branded HTML updates for the Evolution Platform from raw JSON content.

## Features

- ✅ Generates email-optimized HTML (max-width 640px)
- ✅ Generates mobile-responsive HTML (viewport units)
- ✅ Uses exact Evolution Platform branding (colors, fonts, spacing)
- ✅ Supports quotes, images, videos, and markdown content
- ✅ Zero external dependencies for core functionality

## Quick Start

### 1. Create your update content (JSON)

```json
{
  "updateType": "investor",
  "heading": "April Performance Update",
  "subheading": "Strong Q1 positioning",
  "content": "Market conditions remain favorable. Our diversified strategy continues to deliver consistent returns.\n\nKey metrics:\n- Portfolio growth: +2.8%\n- New partnerships: 3\n- Geographic expansion: Singapore approved",
  "quote": "Success favors the prepared.",
  "quoteAttribution": "Team Leadership"
}
```

### 2. Generate HTML

```bash
# Method 1: Direct file input
node generate-update.js your-update.json

# Method 2: Pipe content
cat your-update.json | node generate-update.js

# Method 3: Save to file
node generate-update.js your-update.json public/updates/investor-2026-04-07.html

# Method 4: Use npm script
npm run generate:update your-update.json public/updates/output.html
```

### 3. Output

The script generates clean, branded HTML that matches your existing investor updates exactly:

- **Typography**: Playfair Display (headlines), Inter (body), Geist Sans (quotes)
- **Colors**: #d4a964 gold accents, #000000 black, #fafafa light boxes
- **Layout**: 430px mobile view, justified text with drop caps
- **Features**: Responsive images, quote boxes, video embeds

## Update Types

| Type | Use Case |
|------|----------|
| `investor` | Monthly/quarterly performance updates |
| `pre-race` | Pre-event analysis and strategy |
| `post-race` | Race results and performance review |
| `nomination` | Awards, announcements, news |

## JSON Schema

```json
{
  "updateType": "investor",           // Required: investor | pre-race | post-race | nomination
  "heading": "Main Title",            // Required: Main headline
  "subheading": "Subtitle",           // Optional: Secondary headline
  "content": "Body text here",        // Required: Main content (supports \n for paragraphs)
  "quote": "Quote text",              // Optional: Featured quote
  "quoteAttribution": "Source",       // Optional: Quote attribution
  "imageUrl": "https://...",          // Optional: Hero image URL
  "videoUrl": "https://youtube.com/embed/...", // Optional: YouTube embed URL
  "outputFormat": "both"              // Optional: email | mobile | both (default: both)
}
```

## Examples

### Basic Investor Update
```bash
echo '{
  "updateType": "investor",
  "heading": "March Performance",
  "content": "Strong month with +3.2% returns."
}' | node generate-update.js > investor-march.html
```

### Full Featured Update
```bash
node generate-update.js full-update.json public/updates/investor-2026-04-07.html
```

### Pre-Race Update
```bash
echo '{
  "updateType": "pre-race",
  "heading": "Championship Weekend Preview",
  "content": "Weather forecast: Clear skies, optimal conditions.",
  "quote": "Race day is won on Friday night.",
  "quoteAttribution": "Team Principal"
}' | node generate-update.js > pre-race-preview.html
```

## Integration

### Git Workflow
```bash
# Generate update
node generate-update.js monthly-update.json public/updates/investor-$(date +%Y-%m-%d).html

# Commit to repo
git add public/updates/investor-*.html
git commit -m "Add investor update for $(date +%Y-%m-%d)"
git push
```

### Package.json Scripts
```json
{
  "scripts": {
    "generate:update": "node generate-update.js",
    "generate:investor": "node generate-update.js investor-update.json public/updates/",
    "generate:pre-race": "node generate-update.js pre-race-update.json public/updates/",
    "generate:post-race": "node generate-update.js post-race-update.json public/updates/"
  }
}
```

## File Structure

```
Evolution_Platform/
├── generate-update.js          # Main generator script
├── example-update.json         # Sample input file
├── package.json                # Updated with generate scripts
└── public/updates/             # Output directory
    ├── investor-2026-04-07.html
    ├── pre-race-2026-04-14.html
    └── ...
```

## Technical Details

- **Language**: Node.js (no external dependencies)
- **Input**: JSON via stdin or file argument
- **Output**: HTML to stdout or specified file
- **Styling**: Inline CSS for email compatibility
- **Responsive**: Mobile-first design with viewport units
- **Branding**: Exact match to existing Evolution Platform styles

## Troubleshooting

### Script not found
```bash
chmod +x generate-update.js
```

### JSON parsing error
```bash
# Validate JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('your-file.json', 'utf8')))"
```

### Output not generated
```bash
# Test with minimal input
echo '{"heading": "Test", "content": "Test"}' | node generate-update.js
```

### Styling issues
- Open generated HTML in browser
- Check for missing quotes in JSON
- Verify image URLs are HTTPS

## Future Enhancements

- [ ] Add markdown processing for content
- [ ] Support for multiple output formats (PDF, etc.)
- [ ] Template customization options
- [ ] Batch processing of multiple updates
- [ ] Integration with email services

---

**Ready to generate your first update?** Try the example:

```bash
node generate-update.js example-update.json public/updates/test-output.html
```