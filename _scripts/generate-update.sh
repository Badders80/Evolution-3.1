#!/bin/bash

# Evolution Update Generator Wrapper
# Usage: ./generate-update.sh <update-type> <heading> <content> [output-file]

UPDATE_TYPE=${1:-investor}
HEADING=${2:-"Monthly Update"}
CONTENT=${3:-"Update content goes here."}
OUTPUT_FILE=${4:-"public/updates/${UPDATE_TYPE}-$(date +%Y-%m-%d).html"}

# Create temporary JSON file
TEMP_JSON=$(mktemp)
cat > "$TEMP_JSON" << EOF
{
  "updateType": "$UPDATE_TYPE",
  "heading": "$HEADING",
  "content": "$CONTENT"
}
EOF

# Generate HTML
node generate-update.js "$TEMP_JSON" "$OUTPUT_FILE"

# Clean up
rm "$TEMP_JSON"

echo "Generated: $OUTPUT_FILE"