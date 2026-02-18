#!/bin/bash
# FFmpeg Assembly Pipeline
# Uses RTX 3060 NVENC for hardware-accelerated encoding

REEL_DIR="/home/evo/projects/Evolution-3.1/content/reels/2026-02-17"
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
