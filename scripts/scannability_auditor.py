import re
import os
import sys

def count_words(text):
    # Remove HTML/React tags
    text = re.sub(r'<[^>]+>', ' ', text)
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return len(text.split())

def audit_file(filepath):
    print(f"Auditing {filepath} for scannability...")
    with open(filepath, 'r') as f:
        content = f.read()

    # Look for paragraphs and content blocks
    # Simple heuristic: find text between tags or in strings
    matches = re.findall(r'>([^<]+)<', content)

    violations = 0
    for match in matches:
        word_count = count_words(match)
        if word_count > 25:
            print(f"  [VIOLATION] Module found with {word_count} words (Limit: 25):")
            print(f"    \"{match.strip()[:60]}...\"")
            violations += 1

    if violations == 0:
        print("  [SUCCESS] All scanned modules are under 25 words.")
    else:
        print(f"  [FAILURE] Found {violations} modules exceeding word limit.")

    return violations

if __name__ == "__main__":
    target = "src/app/page.tsx"
    if len(sys.argv) > 1:
        target = sys.argv[1]

    if os.path.exists(target):
        audit_file(target)
    else:
        print(f"Target {target} not found.")
