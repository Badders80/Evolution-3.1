#!/usr/bin/env python3
"""
Evolution Reel Orchestrator
Coordinates Veo3 (FLOW) + ComfyUI (Local GPU) + FFmpeg
Optimal resource usage for non-time-sensitive reel production
"""

import os
import json
import subprocess
import time
from datetime import datetime
from pathlib import Path

# Configuration
REEL_DIR = Path("/home/evo/projects/Evolution-3.1/content/reels") / datetime.now().strftime("%Y-%m-%d")
CONFIG = {
    "veo3_enabled": True,  # Use Google credits
    "comfyui_enabled": True,  # Use local RTX 3060
    "ffmpeg_accel": "nvenc",  # Use GPU for encoding
    "parallel_generation": True,  # Generate multiple clips simultaneously
}

# Veo3 Prompts optimized for FLOW interface
VEO3_PROMPTS = {
    "opening": {
        "prompt": "Cinematic wide shot of thoroughbred racehorses walking through morning mist on a racecourse, golden hour lighting, steam rising from their breath, shallow depth of field, 35mm film aesthetic, muted earth tones with gold accents, professional horse racing cinematography, 4K, photorealistic",
        "duration": 5,
        "aspect_ratio": "9:16"
    },
    "mounting_yard": {
        "prompt": "Close-up shot of a racehorse being saddled in the mounting yard, elegant leather tack, jockey hands adjusting equipment, shallow depth of field, institutional documentary style, desaturated colors with gold highlights, cinematic",
        "duration": 3,
        "aspect_ratio": "9:16"
    },
    "finish_line": {
        "prompt": "Dramatic slow motion shot of racehorses crossing the finish line, dust and turf flying, powerful muscle definition, side angle tracking shot, professional sports cinematography, high contrast, gold and charcoal color grading, epic",
        "duration": 4,
        "aspect_ratio": "9:16"
    },
    "trophy": {
        "prompt": "Elegant close-up of a silver racing trophy on dark mahogany wood, soft dramatic window light, shallow depth of field, gold accents reflecting, cinematic still life composition, institutional wealth aesthetic, muted luxury",
        "duration": 3,
        "aspect_ratio": "9:16"
    },
    "transition": {
        "prompt": "Abstract motion graphics, dark charcoal background with flowing gold particles, cinematic bokeh, institutional broadcast style, seamless loop, subtle motion",
        "duration": 2,
        "aspect_ratio": "9:16"
    }
}

# ComfyUI workflow for graphic generation
COMFYUI_WORKFLOWS = {
    "title_card": {
        "prompt": "Professional broadcast graphic, dark charcoal background (#36454F), bold gold text '{text}', Helvetica font, institutional finance aesthetic, 4K, clean typography",
        "model": "flux"
    },
    "calendar_flip": {
        "prompt": "Minimalist calendar page flipping animation frame, revealing 'MARCH 8', dark charcoal background with gold text (#D4AF37), motion blur, professional broadcast graphics, clean",
        "model": "flux"
    }
}

class ReelOrchestrator:
    def __init__(self):
        self.reel_dir = REEL_DIR
        self.veo3_queue = []
        self.comfyui_queue = []
        self.assets = {
            "veo3_clips": [],
            "comfyui_images": [],
            "downloaded_stills": [],
            "audio": []
        }
        
    def setup_workspace(self):
        """Create directory structure"""
        dirs = ["veo3", "comfyui", "stills", "audio", "output", "temp"]
        for d in dirs:
            (self.reel_dir / d).mkdir(parents=True, exist_ok=True)
        print(f"✓ Workspace: {self.reel_dir}")
        
    def queue_veo3_generations(self):
        """Queue all Veo3 clips for FLOW"""
        for name, config in VEO3_PROMPTS.items():
            self.veo3_queue.append({
                "name": name,
                **config,
                "output": self.reel_dir / "veo3" / f"{name}.mp4"
            })
        print(f"✓ Queued {len(self.veo3_queue)} Veo3 clips")
        
    def generate_veo3_batch_script(self):
        """Generate script for FLOW/Veo3 batch submission"""
        script_path = self.reel_dir / "veo3" / "submit_to_flow.sh"
        
        with open(script_path, 'w') as f:
            f.write("#!/bin/bash\n# Veo3 Batch Submission Script\n# Run this to submit all clips to FLOW\n\n")
            
            for clip in self.veo3_queue:
                safe_prompt = clip['prompt'].replace('"', '\\"')
                f.write(f"""
echo "Submitting: {clip['name']}"
# FLOW CLI command (adjust based on your FLOW setup)
flow generate video \\
    --prompt "{safe_prompt}" \\
    --duration {clip['duration']} \\
    --aspect {clip['aspect_ratio']} \\
    --output {clip['output']} \\
    --provider veo3

""")
        
        os.chmod(script_path, 0o755)
        print(f"✓ Veo3 batch script: {script_path}")
        return script_path
        
    def queue_comfyui_generations(self):
        """Queue ComfyUI graphic generations"""
        titles = ["MATAMATA", "INVERCARGILL", "ELLERSLIE", "AUCKLAND CUP"]
        
        for title in titles:
            self.comfyui_queue.append({
                "name": f"title_{title.lower().replace(' ', '_')}",
                "prompt": COMFYUI_WORKFLOWS["title_card"]["prompt"].format(text=title),
                "output": self.reel_dir / "comfyui" / f"title_{title.lower().replace(' ', '_')}.png"
            })
            
        print(f"✓ Queued {len(self.comfyui_queue)} ComfyUI graphics")
        
    def generate_comfyui_workflow(self):
        """Generate ComfyUI workflow JSON"""
        # Convert queue items to JSON-serializable format
        serializable_queue = []
        for item in self.comfyui_queue:
            serializable_queue.append({
                "name": item["name"],
                "prompt": item["prompt"],
                "output": str(item["output"])
            })
        
        workflow = {
            "prompts": serializable_queue,
            "model": "flux",
            "batch_size": len(self.comfyui_queue),
            "output_dir": str(self.reel_dir / "comfyui")
        }
        
        workflow_path = self.reel_dir / "comfyui" / "batch_workflow.json"
        with open(workflow_path, 'w') as f:
            json.dump(workflow, f, indent=2)
            
        print(f"✓ ComfyUI workflow: {workflow_path}")
        return workflow_path
        
    def setup_ffmpeg_pipeline(self):
        """Create FFmpeg assembly script with GPU acceleration"""
        script_content = f"""#!/bin/bash
# FFmpeg Assembly Pipeline
# Uses RTX 3060 NVENC for hardware-accelerated encoding

REEL_DIR="{self.reel_dir}"
OUTPUT="$REEL_DIR/output/evolution_weekend_recap_$(date +%Y%m%d_%H%M).mp4"

# Settings
RESOLUTION="1080x1920"
FRAMERATE=30
VOICEOVER="$REEL_DIR/audio/voiceover.mp3"

echo "=== Evolution Reel Assembly ==="
echo "GPU Acceleration: NVENC (RTX 3060)"
echo "Output: $OUTPUT"

# Check for required assets
echo "Checking assets..."
for asset in "$REEL_DIR/veo3"/*.mp4; do
    [ -f "$asset" ] && echo "  ✓ $(basename $asset)"
done

for asset in "$REEL_DIR/comfyui"/*.png; do
    [ -f "$asset" ] && echo "  ✓ $(basename $asset)"
done

# Assembly (placeholder - customize based on actual assets)
echo ""
echo "To assemble manually, run:"
echo "  ffmpeg -f concat -i concat_list.txt -c:v h264_nvenc -preset p6 -tune hq -b:v 5M -c:a aac -b:a 192k $OUTPUT"

echo ""
echo "For CPU-only (if GPU busy):"
echo "  ffmpeg -f concat -i concat_list.txt -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 192k $OUTPUT"
"""
        
        script_path = self.reel_dir / "assemble_with_ffmpeg.sh"
        with open(script_path, 'w') as f:
            f.write(script_content)
        os.chmod(script_path, 0o755)
        
        print(f"✓ FFmpeg assembly script: {script_path}")
        return script_path
        
    def create_concat_template(self):
        """Create FFmpeg concat list template"""
        template = """# Evolution Reel Concat List
# Edit this file with your actual asset paths
# Format: file 'path/to/file.mp4'

# OPENING (0:00-0:05)
file 'veo3/opening.mp4'
duration 5

# RACE 1 - ENRICO (0:05-0:18)
file 'comfyui/title_matamata.png'
duration 2
file 'stills/enrico.jpg'
duration 3
file 'veo3/finish_line.mp4'
duration 4
file 'veo3/transition.mp4'
duration 2

# RACE 2 - SMOOTH OPERATOR (0:18-0:28)
file 'comfyui/title_invercargill.png'
duration 2
file 'stills/smooth_operator.jpg'
duration 3
file 'veo3/transition.mp4'
duration 2

# RACE 3 & 4 - ELLERSLIE DOUBLE (0:28-0:55)
file 'comfyui/title_ellerslie.png'
duration 2
file 'stills/blue_sky.jpg'
duration 4
file 'veo3/finish_line.mp4'
duration 4
file 'stills/el_vencedor.jpg'
duration 4
file 'veo3/finish_line.mp4'
duration 4
file 'veo3/transition.mp4'
duration 2

# CLOSE (0:55-1:15)
file 'veo3/trophy.mp4'
duration 3
file 'comfyui/title_auckland_cup.png'
duration 2
file 'veo3/transition.mp4'
duration 2

# AUDIO
file 'audio/voiceover.mp3'
"""
        
        concat_path = self.reel_dir / "concat_list.txt"
        with open(concat_path, 'w') as f:
            f.write(template)
            
        print(f"✓ Concat template: {concat_path}")
        return concat_path
        
    def generate_master_readme(self):
        """Create comprehensive README"""
        readme = f"""# Evolution Reel - {datetime.now().strftime("%Y-%m-%d")}

## 🎯 PROJECT OVERVIEW
Automated reel production using optimal resource allocation:
- **Veo3 (Google Credits)**: AI B-roll generation
- **ComfyUI (RTX 3060)**: Graphic elements + stills
- **FFmpeg (GPU/CPU)**: Final assembly

## 📁 STRUCTURE
```
{self.reel_dir.name}/
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
cd {self.reel_dir}/veo3
./submit_to_flow.sh
```
**Cost**: ~5 clips × $0.05 = $0.25 USD
**Time**: ~10-15 minutes (parallel)

### Phase 2: Generate Graphics (ComfyUI)
```bash
# Load batch workflow into ComfyUI
# {self.reel_dir}/comfyui/batch_workflow.json

# Or use generate_image.py
python3 /home/evo/projects/Asset_Generation/generate_image.py \
    --batch {self.reel_dir}/comfyui/batch_workflow.json
```
**VRAM**: ~11GB for Flux, leaves 1GB headroom
**Time**: ~2-3 minutes per image

### Phase 3: Download Race Stills
```bash
# Manual download from:
# - racingnews.co.nz
# - windsorparkstud.co.nz
# - loveracing.nz

# Place in: {self.reel_dir}/stills/
```

### Phase 4: Assembly (FFmpeg)
```bash
cd {self.reel_dir}

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
"""
        
        readme_path = self.reel_dir / "README.md"
        with open(readme_path, 'w') as f:
            f.write(readme)
            
        print(f"✓ Master README: {readme_path}")
        return readme_path
        
    def run(self):
        """Execute full orchestration"""
        print("╔════════════════════════════════════════════════════════════╗")
        print("║     EVOLUTION REEL ORCHESTRATOR v1.0                      ║")
        print("║     Optimal Resource Pipeline                             ║")
        print("╚════════════════════════════════════════════════════════════╝")
        print()
        
        self.setup_workspace()
        self.queue_veo3_generations()
        self.queue_comfyui_generations()
        
        veo3_script = self.generate_veo3_batch_script()
        comfyui_workflow = self.generate_comfyui_workflow()
        ffmpeg_script = self.setup_ffmpeg_pipeline()
        concat_template = self.create_concat_template()
        readme = self.generate_master_readme()
        
        # Copy voiceover if exists
        voiceover_src = "/tmp/tts-Q10Oul/voice-1771294193570.mp3"
        voiceover_dst = self.reel_dir / "audio" / "voiceover.mp3"
        if os.path.exists(voiceover_src):
            import shutil
            shutil.copy(voiceover_src, voiceover_dst)
            print(f"✓ Voiceover copied: {voiceover_dst}")
        
        print()
        print("╔════════════════════════════════════════════════════════════╗")
        print("║     ORCHESTRATION COMPLETE                                ║")
        print("╚════════════════════════════════════════════════════════════╝")
        print()
        print("📁 All assets in:", self.reel_dir)
        print()
        print("🚀 NEXT STEPS:")
        print(f"1. Run: {veo3_script}")
        print(f"2. Load: {comfyui_workflow}")
        print(f"3. Edit: {concat_template}")
        print(f"4. Run: {ffmpeg_script}")
        print()
        print(f"📖 Full guide: {readme}")
        
        return {
            "reel_dir": str(self.reel_dir),
            "veo3_script": str(veo3_script),
            "comfyui_workflow": str(comfyui_workflow),
            "ffmpeg_script": str(ffmpeg_script),
            "concat_template": str(concat_template),
            "readme": str(readme)
        }

if __name__ == "__main__":
    orchestrator = ReelOrchestrator()
    results = orchestrator.run()
    
    # Save manifest
    manifest_path = REEL_DIR / "manifest.json"
    with open(manifest_path, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"\n✓ Manifest saved: {manifest_path}")
