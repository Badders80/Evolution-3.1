#!/bin/bash

# Simple wrapper for Evolution Update Generator
# Usage: ./generate.sh <input.json> [output.html]

INPUT_FILE=${1:-example-update.json}
OUTPUT_FILE=${2:-public/updates/$(basename "$INPUT_FILE" .json)-$(date +%Y-%m-%d).html}

# Ensure output directory exists
mkdir -p public/updates

# Generate HTML using Node.js inline execution
node -e "
const fs = require('fs');
const { generateUpdate } = require('./generate-update.js');
const data = JSON.parse(fs.readFileSync('$INPUT_FILE', 'utf8'));
const html = generateUpdate(data);
fs.writeFileSync('$OUTPUT_FILE', html);
console.log('✅ Generated: $OUTPUT_FILE');
"