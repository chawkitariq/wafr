#!/bin/bash
# PostToolUse hook: auto-runs ESLint --fix on edited files and reports remaining issues

# Read tool input JSON from stdin
input=$(cat)

# Extract the file path from the tool input
file=$(echo "$input" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('file_path', ''))
except Exception:
    print('')
" 2>/dev/null)

# Only run on lintable files (skip node_modules, .nuxt, dist, etc.)
if [[ ! "$file" =~ \.(vue|ts|js|mjs|cjs)$ ]]; then
    exit 0
fi

if [[ "$file" =~ (node_modules|\.nuxt|dist|\.output)/ ]]; then
    exit 0
fi

# Change to project root
cd /home/verbq/dev/wafr || exit 0

# Step 1: Auto-fix what ESLint can handle
pnpm exec eslint --fix "$file" 2>/dev/null

# Step 2: Check for remaining issues
remaining=$(pnpm exec eslint "$file" --format=compact 2>&1)
exit_code=$?

# Report remaining issues so Claude can fix them manually
if [ "$exit_code" -ne 0 ] && [ -n "$remaining" ]; then
    echo "⚠️ ESLint: remaining issues in $file (auto-fix could not resolve these):"
    echo "$remaining"
    echo ""
    echo "Please fix these issues manually."
    exit 2
fi

exit 0
