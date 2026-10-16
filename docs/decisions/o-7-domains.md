# O-7 — Domains: apex canonical, `ui.xoroh.org` redirects

Status: accepted 2026-10-16 (director).

## Decision

Apex `xoroh.org` (+ `www`) is canonical for the hub. `ui.xoroh.org`
redirects to `kern.xoroh.org`, preserving the one external link the old
scaffold emitted while canonicalizing Kern docs.

## Consequences

The scaffold contains zero `ui.xoroh.org` links (CI-enforced). The redirect
itself is a DNS-owner task: naming the `xoroh.org` zone owner is P0 before
launch. No DNS or secret action is taken in hub PRs.
