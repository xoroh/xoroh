# O-2 — Atlas relationship: alongside now, extract later

Status: accepted 2026-10-16 (director).

## Decision

Build the hub alongside Atlas now; extract shared parts later, if ever.

## Context

There is nothing to depend on today: `atlas/packages/` holds only a
placeholder README, hosting is undecided, and the TanStack rewrite
(`atlas/docs/adr/0002-tanstack-foundation.md`) is proposed, not approved.
Importing from `atlas/apps/docs` would violate its documented engine/site
seam. The hub may later become the second consumer that justifies extracting
a real engine, recorded in a new ADR after launch.
