#!/bin/bash
cd /mnt/s/projects/Evolution-3.1
git add src/app/page.tsx
git commit -m "fix: restore home page content with proper sections"
git push origin main
echo "Home page restored and pushed!"
