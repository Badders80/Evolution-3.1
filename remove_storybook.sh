#!/bin/bash
# Remove Storybook files causing build errors

echo "Removing Storybook directories..."
rm -rf src/components/stories
rm -rf src/stories
rm -rf .storybook

echo "Committing changes..."
git add -A
git commit -m "fix: remove Storybook files causing build errors"
git push origin main

echo "Done! Storybook files removed and changes pushed."
