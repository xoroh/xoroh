# O-1 — Hub stack: TanStack Start, Kern site recipe

Status: accepted 2026-10-16 (director).

## Decision

Build the hub on TanStack Start + React + Vite + Tailwind v4 on Cloudflare
Workers via `wrangler` (Bun, TypeScript, Biome), reusing the Kern site setup
(`kern/apps/site`).

## Context

Two candidate stacks: the Kern recipe (proven deploy, one stack to operate,
dogfoods Kern) vs Astro + Starlight (Atlas recipe — no engine exists yet,
`atlas/packages/` is a placeholder, and its TanStack rewrite is only
proposed). One stack wins on operability and dogfooding.

## Staging

v0 ships the corrected static scaffold; the TanStack port is the next
tracked step, not the v0 PR. Port acceptance: prerendered static output,
`wrangler deploy` parity with Kern's flow, install-snippet checks, and the
full IA (`/projects`, `/maturity`, `/governance`, `/contributing`,
`/security`, `/brand`, `/news`, `/llms.txt`).
