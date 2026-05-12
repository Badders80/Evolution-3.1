# Update Generators

Two generators exist for different use cases - **do not consolidate**.

## `generate-simple.js` (211 lines)

**Purpose:** Quick, email-only updates for simple investor communications

**Features:**
- ✅ Email HTML only (430px width)
- ✅ Single function: `generateInvestorUpdate(data)`
- ✅ Minimal dependencies
- ✅ Fast for basic updates

**Use when:**
- Creating simple email updates
- No mobile version needed
- Quick one-off updates

**Example:**
```bash
node generate-simple.js < simple-update.json > email.html
```

---

## `generate-update.js` (345 lines)

**Purpose:** Full-featured generator for production investor updates

**Features:**
- ✅ Email + Mobile versions
- ✅ Conversational input parsing
- ✅ Multiple output formats (`email`, `mobile`, `both`)
- ✅ Video support
- ✅ Three exported functions

**Use when:**
- Creating production investor updates
- Need both email and mobile versions
- Processing conversational input
- Need video support

**Example:**
```bash
# Generate both versions
node generate-update.js < update.json > output.html

# Email only
node generate-update.js < update.json | jq -r '.email' > email.html

# Mobile only
node generate-update.js < update.json | jq -r '.mobile' > mobile.html
```

---

## Key Differences

| Feature | generate-simple | generate-update |
|---------|----------------|-----------------|
| **Output** | Email only | Email + Mobile |
| **Functions** | 1 | 3 |
| **Lines** | 211 | 345 |
| **Conversational parse** | ❌ | ✅ |
| **Video support** | ❌ | ✅ |
| **Format options** | ❌ | ✅ |
| **Best for** | Quick emails | Production updates |

---

## Testing

Both generators have unit tests:

```bash
npm test -- tests/unit/generators.test.js
```

Tests cover:
- HTML generation
- Heading/subheading rendering
- Quote sidebars
- Image/video embedding
- Output format selection
- Conversational parsing

---

## Maintenance

**Keep both** - they serve different workflows:
- `generate-simple`: Fast path for simple needs
- `generate-update`: Full-featured for production

**Future improvements:**
- [ ] Add video support to `generate-simple` (if needed)
- [ ] Share common templates between generators
- [ ] Add CLI flags for inline options
