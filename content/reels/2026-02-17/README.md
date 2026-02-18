# Evolution Reel - 2026-02-17

## 🎯 PROJECT OVERVIEW
Automated reel production using optimal resource allocation:
- **Veo3 (Google Credits)**: AI B-roll generation
- **ComfyUI (RTX 3060)**: Graphic elements + stills
- **FFmpeg (GPU/CPU)**: Final assembly

## 📁 STRUCTURE
```
2026-02-17/
├── veo3/           # AI-generated B-roll clips
├── comfyui/        # Graphic elements from local GPU
├── stills/         # Downloaded race photos
├── audio/          # Voiceover + music
├── output/         # Final rendered reel
└── temp/           # Working files
```

## 🚀 WORKFLOW

### Phase 1: Generate AI B-roll (Veo3)
```bash
cd /home/evo/projects/Evolution-3.1/content/reels/2026-02-17/veo3
./submit_to_flow.sh
```
**Cost**: ~5 clips × $0.05 = $0.25 USD
**Time**: ~10-15 minutes (parallel)

### Phase 2: Generate Graphics (ComfyUI)
```bash
# Load batch workflow into ComfyUI
# /home/evo/projects/Evolution-3.1/content/reels/2026-02-17/comfyui/batch_workflow.json

# Or use generate_image.py
python3 /home/evo/projects/Asset_Generation/generate_image.py     --batch /home/evo/projects/Evolution-3.1/content/reels/2026-02-17/comfyui/batch_workflow.json
```
**VRAM**: ~11GB for Flux, leaves 1GB headroom
**Time**: ~2-3 minutes per image

### Phase 3: Download Race Stills
```bash
# Manual download from:
# - racingnews.co.nz
# - windsorparkstud.co.nz
# - loveracing.nz

# Place in: /home/evo/projects/Evolution-3.1/content/reels/2026-02-17/stills/
```

### Phase 4: Assembly (FFmpeg)
```bash
cd /home/evo/projects/Evolution-3.1/content/reels/2026-02-17

# Option A: GPU Accelerated (Fast)
./assemble_with_ffmpeg.sh

# Option B: Edit in DaVinci Resolve (More control)
# Import all assets, follow voiceover timing
```

## 🎨 BRAND SPECS
- **Primary**: Dark Charcoal (#36454F)
- **Accent**: Gold (#D4AF37)
- **Font**: Helvetica Bold or Futura
- **Effect**: Ken Burns zoom (105-115%) on stills

## ⏱️ TIMING
Total: 75 seconds
- Opening: 5s
- Enrico: 13s
- Smooth Operator: 10s
- Blue Sky At Night: 15s
- El Vencedor: 15s
- Close: 17s

## ✅ CHECKLIST
- [ ] Veo3 clips generated
- [ ] ComfyUI graphics rendered
- [ ] Race stills downloaded
- [ ] Voiceover copied to audio/
- [ ] Concat list customized
- [ ] FFmpeg assembly complete
- [ ] Final review

## 🐛 TROUBLESHOOTING
**Veo3 fails?**
→ Check FLOW credits, retry individual clips

**ComfyUI OOM?**
→ Switch to SDXL (uses ~8GB), or reduce batch size

**FFmpeg NVENC fails?**
→ Fallback to libx264 (CPU, slower but reliable)

## 📊 RESOURCE USAGE
| Task | Resource | Cost | Time |
|------|----------|------|------|
| B-roll | Veo3 (Google) | ~$0.25 | 15 min |
| Graphics | RTX 3060 | $0 | 15 min |
| Assembly | NVENC/CPU | $0 | 5 min |
| **Total** | | **~$0.25** | **~35 min** |
