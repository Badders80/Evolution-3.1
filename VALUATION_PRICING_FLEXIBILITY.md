# Valuation Page: Enhanced Pricing Flexibility

## ✅ What's New

Syndicators now have **4 flexible ways** to enter lease pricing on the valuation page:

### Pricing Period
- **Per Month** - Enter monthly lease amount
- **Per Year** - Enter annual lease amount

### Pricing Scope
- **Per 1%** - Enter price for each 1% of stake
- **Total Lease** - Enter total price for entire lease (based on SSS%)

## 🎯 How It Works

The page automatically converts all inputs to the standard calculation format (price per 1% per year) behind the scenes, so syndicators can think about pricing in whatever way makes most sense to them.

### Examples:

**Example 1: Monthly per 1%**
- Syndicator enters: $100/month per 1%
- System calculates: $100 × 12 = $1,200/year per 1%
- Used for calculations as PPP = $1,200

**Example 2: Monthly total (10% stake)**
- Syndicator enters: $1,000/month total
- System calculates: $1,000 × 12 ÷ 10% = $1,200/year per 1%
- Used for calculations as PPP = $1,200

**Example 3: Yearly total (10% stake)**
- Syndicator enters: $12,000/year total
- System calculates: $12,000 ÷ 10% = $1,200/year per 1%
- Used for calculations as PPP = $1,200

## 🎨 UI Features

### Toggle Buttons
- **Visual feedback** - Active toggle is highlighted
- **Two rows of toggles**:
  - Row 1: Per Month | Per Year
  - Row 2: Per 1% | Total Lease
- **Dynamic help text** - Shows what the current input represents

### Smart Conversions
- When you change SSS% and are in "Total Lease" mode, the price automatically adjusts
- When you switch toggle modes, the displayed price updates to match the new mode
- All conversions maintain the same underlying PPP value

## 💡 Benefits

**For Syndicators:**
- Enter pricing the way you think about it naturally
- No mental math required for conversions
- See total lease value vs per-stake pricing side-by-side

**For Calculations:**
- All math stays consistent internally
- Breakeven analysis uses standardized PPP value
- Charts and results remain accurate

## 🧮 Technical Details

### State Management
```typescript
const [pricingPeriod, setPricingPeriod] = useState<'month' | 'year'>('year');
const [pricingScope, setPricingScope] = useState<'per1percent' | 'total'>('per1percent');
const [displayPrice, setDisplayPrice] = useState<string>('1000');
```

### Conversion Logic
1. **User enters price** → `handlePriceChange()`
2. **Convert to monthly/yearly** → Multiply by 12 if monthly
3. **Convert to per-1%/total** → Divide by SSS% if total
4. **Store as PPP** → All calculations use this standardized value

### Toggle Changes
When user clicks a toggle:
1. **Update mode** → Set new period/scope
2. **Recalculate display** → Convert PPP to new display format
3. **Update input field** → Show converted value

## 🎯 Use Cases

### Use Case 1: Simple Monthly Pricing
*"I want to charge $500/month for a 20% stake"*
- Set: Per Month + Total Lease
- Enter: 500
- System handles: $500 × 12 ÷ 20% = $300/year per 1%

### Use Case 2: Industry Standard (per 1% per year)
*"The market rate is $1,000 per 1% per year"*
- Set: Per Year + Per 1%
- Enter: 1000
- System uses: $1,000 directly (no conversion needed)

### Use Case 3: Total Package Deal
*"I want $24,000 per year for the whole 15% stake"*
- Set: Per Year + Total Lease
- Enter: 24000
- System handles: $24,000 ÷ 15% = $1,600/year per 1%

## 📊 Impact on Calculations

All existing calculations remain unchanged:
- ✅ Upfront Income formula still works
- ✅ Breakeven TTT* calculation accurate
- ✅ Chart data points correct
- ✅ Owner returns properly calculated

The flexibility is **purely in the input layer** - the math engine sees consistent PPP values.

---

**Location:** `/engine/valuation`
**Status:** ✅ Live on development server
**Next:** Ready for syndicator testing and feedback
