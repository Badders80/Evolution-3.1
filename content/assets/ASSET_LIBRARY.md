# Evolution Stables - B-Roll Asset Library

## Location
`/home/evo/projects/Evolution-3.1/content/assets/broll/`

## Structure
```
broll/
├── veo3_generated/           # AI clips from FLOW (high quality, use sparingly)
├── canva_stock/              # Downloaded Canva Pro clips (unlimited, reusable)
├── comfyui_stills/           # AI-generated title cards and graphics
├── racing_footage/           # Real race footage (fair use clips)
└── music/                    # Licensed tracks
```

## Asset Categories

### A. OPENING SEQUENCES
- [ ] Horses in morning mist (FLOW - high quality)
- [ ] Aerial racecourse drone shot (Canva stock)
- [ ] Jockeys walking to mounting yard (Canva stock)
- [ ] Trophy room pan (Canva stock)

### B. TRANSITIONS
- [ ] Gold particle flow (Canva animation)
- [ ] Dark wipe with gold accent (Canva)
- [ ] Quick flash to white (Canva)

### C. RACE MOMENTS
- [ ] Finish line cross (FLOW - use for key races)
- [ ] Horses rounding turn (Canva stock)
- [ ] Crowd cheering (Canva stock)
- [ ] Photo finish stills (download from loveracing.nz)

### D. INSTITUTIONAL SHOTS
- [ ] Handshake deal (Canva stock)
- [ ] Signing documents (Canva stock)
- [ ] Luxury interior (Canva stock)
- [ ] Champagne celebration (Canva stock)

### E. GRAPHICS TEMPLATES (ComfyUI/Canva)
- [ ] "MATAMATA" title card
- [ ] "INVERCARGILL" title card
- [ ] "ELLERSLIE" title card
- [ ] "AUCKLAND CUP" title card
- [ ] Calendar flip animation
- [ ] Prizemoney counter animation
- [ ] Odds display graphic

## Canva Pro Search Terms
Save these for quick asset finding:

**Video:**
- "horse racing finish line"
- "thoroughbred horses running"
- "jockey silks mounting yard"
- "race trophy gold"
- "luxury lifestyle wealth"
- "business handshake deal"

**Music:**
- "tension documentary"
- "corporate instrumental"
- "sports epic"
- "minimal piano"

## Weekly Build Process
1. Generate 3 high-quality FLOW clips (use credits)
2. Download 10 Canva stock clips (unlimited)
3. Create 2-3 new graphic templates in ComfyUI
4. Add real race footage from loveracing.nz
5. Organize in dated folders: `assets/2026-02-17/`

## Usage Priority
1. **Canva stock** (unlimited, fast, good enough for B-roll)
2. **FLOW clips** (limited credits, use for hero moments only)
3. **ComfyUI graphics** (custom, on-brand)
4. **Real footage** (authenticity, fair use)

## Quick Access Commands
```bash
# List all assets
ls -la /home/evo/projects/Evolution-3.1/content/assets/broll/

# Find by type
find /home/evo/projects/Evolution-3.1/content/assets/broll/ -name "*opening*"

# Copy to new reel
cp -r /home/evo/projects/Evolution-3.1/content/assets/broll/canva_stock/* \
   /home/evo/projects/Evolution-3.1/content/reels/$(date +%Y-%m-%d)/
```
