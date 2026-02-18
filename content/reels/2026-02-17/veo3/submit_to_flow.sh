#!/bin/bash
# Veo3 Batch Submission Script
# Run this to submit all clips to FLOW


echo "Submitting: opening"
# FLOW CLI command (adjust based on your FLOW setup)
flow generate video \
    --prompt "Cinematic wide shot of thoroughbred racehorses walking through morning mist on a racecourse, golden hour lighting, steam rising from their breath, shallow depth of field, 35mm film aesthetic, muted earth tones with gold accents, professional horse racing cinematography, 4K, photorealistic" \
    --duration 5 \
    --aspect 9:16 \
    --output /home/evo/projects/Evolution-3.1/content/reels/2026-02-17/veo3/opening.mp4 \
    --provider veo3


echo "Submitting: mounting_yard"
# FLOW CLI command (adjust based on your FLOW setup)
flow generate video \
    --prompt "Close-up shot of a racehorse being saddled in the mounting yard, elegant leather tack, jockey hands adjusting equipment, shallow depth of field, institutional documentary style, desaturated colors with gold highlights, cinematic" \
    --duration 3 \
    --aspect 9:16 \
    --output /home/evo/projects/Evolution-3.1/content/reels/2026-02-17/veo3/mounting_yard.mp4 \
    --provider veo3


echo "Submitting: finish_line"
# FLOW CLI command (adjust based on your FLOW setup)
flow generate video \
    --prompt "Dramatic slow motion shot of racehorses crossing the finish line, dust and turf flying, powerful muscle definition, side angle tracking shot, professional sports cinematography, high contrast, gold and charcoal color grading, epic" \
    --duration 4 \
    --aspect 9:16 \
    --output /home/evo/projects/Evolution-3.1/content/reels/2026-02-17/veo3/finish_line.mp4 \
    --provider veo3


echo "Submitting: trophy"
# FLOW CLI command (adjust based on your FLOW setup)
flow generate video \
    --prompt "Elegant close-up of a silver racing trophy on dark mahogany wood, soft dramatic window light, shallow depth of field, gold accents reflecting, cinematic still life composition, institutional wealth aesthetic, muted luxury" \
    --duration 3 \
    --aspect 9:16 \
    --output /home/evo/projects/Evolution-3.1/content/reels/2026-02-17/veo3/trophy.mp4 \
    --provider veo3


echo "Submitting: transition"
# FLOW CLI command (adjust based on your FLOW setup)
flow generate video \
    --prompt "Abstract motion graphics, dark charcoal background with flowing gold particles, cinematic bokeh, institutional broadcast style, seamless loop, subtle motion" \
    --duration 2 \
    --aspect 9:16 \
    --output /home/evo/projects/Evolution-3.1/content/reels/2026-02-17/veo3/transition.mp4 \
    --provider veo3

