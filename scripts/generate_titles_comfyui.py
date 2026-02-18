# ComfyUI workflow for Evolution title cards
# Run this via API to generate 6 title cards

import json
import requests
import os

COMFYUI_URL = "http://localhost:8188"
OUTPUT_DIR = "/home/evo/projects/Evolution-3.1/content/reels/2026-02-17/comfyui"

# Simple Flux workflow for text images
WORKFLOW = {
    "1": {
        "inputs": {
            "text": "EVOLUTION WEEKEND RECAP",
            "clip": ["4", 1]
        },
        "class_type": "CLIPTextEncode"
    },
    "4": {
        "inputs": {
            "ckpt_name": "flux1-schnell.safetensors"
        },
        "class_type": "CheckpointLoaderSimple"
    },
    "5": {
        "inputs": {
            "seed": 12345,
            "steps": 4,
            "cfg": 1.0,
            "sampler_name": "euler",
            "scheduler": "simple",
            "model": ["4", 0],
            "positive": ["1", 0],
            "negative": ["1", 0],
            "latent_image": ["6", 0]
        },
        "class_type": "KSampler"
    },
    "6": {
        "inputs": {
            "width": 1080,
            "height": 1920,
            "batch_size": 1
        },
        "class_type": "EmptyLatentImage"
    },
    "7": {
        "inputs": {
            "samples": ["5", 0],
            "vae": ["4", 2]
        },
        "class_type": "VAEDecode"
    },
    "8": {
        "inputs": {
            "filename_prefix": "title",
            "images": ["7", 0]
        },
        "class_type": "SaveImage"
    }
}

TITLES = [
    "EVOLUTION WEEKEND RECAP 21-22 FEB 2025",
    "MATAMATA ENRICO 23-1",
    "INVERCARGILL SMOOTH OPERATOR 6.25L",
    "ELLERSLIE BLUE SKY AT NIGHT",
    "ELLERSLIE EL VENCEDOR G1",
    "AUCKLAND CUP MARCH 8"
]

print("=== Generating Title Cards with ComfyUI ===")
print(f"Output: {OUTPUT_DIR}")
print()

for i, title in enumerate(TITLES):
    print(f"[{i+1}/6] {title}")
    # Queue prompt
    workflow = WORKFLOW.copy()
    workflow["1"]["inputs"]["text"] = title
    workflow["8"]["inputs"]["filename_prefix"] = f"title_{i+1:02d}"
    
    try:
        response = requests.post(f"{COMFYUI_URL}/prompt", json={"prompt": workflow})
        if response.status_code == 200:
            print(f"  ✓ Queued")
        else:
            print(f"  ✗ Failed: {response.status_code}")
    except Exception as e:
        print(f"  ✗ Error: {e}")

print()
print("=== Check ComfyUI interface for progress ===")
print(f"URL: {COMFYUI_URL}")
print(f"Output folder: {OUTPUT_DIR}")
