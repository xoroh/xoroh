# ADR-001: Standards distribution model

- Status: proposed
- Date: 2026-10-16
- Deciders: owner approval required for acceptance

## Context

Xoroh must distribute standards to independently maintainable repositories
without becoming a runtime dependency or creating silent coupling
(see `docs/ECOSYSTEM_PLAN.md` §9).

## Decision (proposed)

Hybrid model by artifact type:

- Reusable CI logic → callable workflows (`workflow_call`), pinned by SHA/tag,
  published only after a consumer fixture validates the interface.
- Small static files (editorconfig, templates, `AGENTS.md` core, Dependabot
  defaults) → versioned copies pinned to a standards version; v1 without
  checksum automation.
- Release-prep skill/procedure → versioned skill directory, copied per repo.
- Policy docs → canonical markdown here; per-repo pointers, no competing copies.
- Emergency fixes → direct PRs to consumers, then backfill.

Explicitly rejected: Git submodules as default, silent sync bots, live
cross-repo imports.

## Alternatives considered

1. Single distribution mechanism for everything — simpler to describe, but
   couples artifacts with different update/rollback needs.
2. Submodule-based sharing — familiar, but poor offline UX and rollback.

## Consequences

Consumers adopt explicitly and roll back by re-pinning. Until acceptance,
v1 work proceeds with copy+pin documented as draft; no tags are created.
