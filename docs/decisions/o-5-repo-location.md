# O-5 — Repo location: `apps/site` in the `xoroh` repo

Status: accepted 2026-10-16 (director).

## Decision

The hub lives in `apps/site/` in the `xoroh` repo. No new repo.

## Context

The repo already declares this purpose (`README.md`), is the natural MIT
contributor front door, and the hub ships no packages (nothing to
version-isolate). Alternatives lose: `kern/` would repeat a mis-routing
into another lead's release-gated program; `atlas/` has no engine and
undecided hosting; product surfaces would leak private CI/DNS concerns and
contradict the `xoroh.com`/`.org` split.

## Revisit triggers

Split only on: an independent secrets/compliance boundary, sustained
high hub-contributor volume, or a hub release cadence decoupled from
`xoroh/` main. Record the trigger, then decide — never pre-split.
