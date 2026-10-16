# O-4 — Search: JSON index

Status: accepted 2026-10-16 (director).

## Decision

Ship a hand-maintained JSON search index (`apps/site/search-index.json`)
at launch; consider Pagefind only when the page count exceeds ~50. Never a
SaaS search vendor (no paid extras).

## Consequences

The index is validated in CI (`scripts/check-site.mjs`): valid JSON,
required fields per entry, and every entry's anchor resolves to a real
page/section in the scaffold.
