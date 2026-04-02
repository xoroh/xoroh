#!/bin/sh
# Regenerates FILE_TREE.md after every merge or pull.

REPO_ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
IGNORE_FILE="$REPO_ROOT/.filetreeignore"

PATTERN=$(grep -v '^\s*#' "$IGNORE_FILE" | grep -v '^\s*$' | tr '\n' '|' | sed 's/|$//')
{
  echo "# xoroh — File Tree"
  echo ""
  echo "> Auto-generated. Do not edit manually."
  echo "> Edit \`.filetreeignore\` to control what is excluded."
  echo "> Last updated: $(date '+%Y-%m-%d %H:%M:%S')"
  echo ""
  echo '```'
  tree -I "$PATTERN" --dirsfirst -f -i --noreport -L 5 "$REPO_ROOT" \
    | sed "s|^$REPO_ROOT/||" \
    | sed "s|^$REPO_ROOT\$|.|"
  echo '```'
} > "$REPO_ROOT/FILE_TREE.md"

echo "[post-merge] FILE_TREE.md updated"
