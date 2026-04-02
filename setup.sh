#!/bin/sh
# One-time setup for xoroh.
# Run this once after cloning on any machine.
#
# Usage: ./setup.sh

set -e

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "Setting up xoroh..."

# --- Git hooks ---
git -C "$REPO_ROOT" config core.hooksPath tools/git-hooks
echo "  [git] hooks path set to tools/git-hooks"

# --- Check required tools ---
missing=""

if ! command -v tree > /dev/null 2>&1; then
  missing="$missing tree"
fi

if [ -n "$missing" ]; then
  echo ""
  echo "  [!] Missing tools:$missing"
  echo "      Install with: brew install$missing"
else
  echo "  [tools] tree is installed"
fi

echo ""
echo "Setup complete."
echo ""
echo "  File trees update automatically on every git commit."
