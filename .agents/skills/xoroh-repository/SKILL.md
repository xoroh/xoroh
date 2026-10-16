---
name: xoroh-repository
description: Govern work in the xoroh/xoroh OSS coordination hub. Use for any task in this repository: follow the roadmap, registry, standards, and ADRs; select the right specialized skill; scope cross-repository work; and respect authorization boundaries.
---

# xoroh-repository skill

`xoroh/xoroh` is the governance and coordination hub for Xoroh open-source
projects. It owns canonical standards — it is never a runtime dependency of
consumer repositories, which adopt reviewed copies and stay independently
buildable.

## Authoritative sources (in order)

1. `docs/ECOSYSTEM_PLAN.md` — the sole roadmap.
2. `docs/audit/RECONCILIATION.md` — audit trail (never a second roadmap).
3. `projects.json` + `projects.schema.json` — project registry (validate with
   `bun run check:index`).
4. `docs/standards/` — universal baseline, profiles, versioning, adoption,
   changelog.
5. `docs/adr/` — accepted decisions (ADR-001 distribution, ADR-002 versioning).
6. `docs/governance.md`, `docs/releases.md` — change process, release process.

## Selecting skills

- New/existing repo onboarding → `xoroh-new-monorepo`.
- Release work → `oss-release` (generic workflow) + `release-prep`
  (Xoroh procedure, stops before publication).
- Read-only multi-repo inspection → `repository-audit` (never implements).
- Requested changes across repos → `cross-repo-standardization`.
- Recurring upkeep (dependency triage, index updates, review cadence) →
  `oss-maintenance`.
- Repository layout questions → `repository-structure`.

## Self-audit entry point

On requests like "audit this repository against Xoroh standards", run an
on-demand self-audit (read-only by default):

1. Confirm this checkout's identity and state; note any uncommitted drift
   versus the last integrated commit.
2. Verify root `AGENTS.md` still describes the repo accurately and points at
   this skill.
3. Verify every skill in `.agents/skills/` is routed above, has valid
   frontmatter, and links resolve.
4. Validate the registry (`bun run check:index`) and confirm entries match
   live repositories for fields this checkout can verify.
5. Confirm the standards, changelog, and ADR index agree (no accepted
   decision missing, no proposed item marked accepted).
6. Run all validators; report exact results.
7. Classify findings: compliant / noncompliant / partial / blocked /
   exception / owner-decision-required / recommendation / not-applicable,
   each with standard, evidence, impact, next action.
8. Standardization needs explicit scope afterward — never roll changes out
   as part of the audit.

## Continuous standards improvement

When audits or implementation surface a potential standards improvement:
detect it, collect evidence, decide whether it is project-specific or
ecosystem-wide, propose a proportionate change, obtain required approval,
implement and validate when authorized, identify affected repositories, and
track adoption separately. No self-modifying policies, no automatic
rollouts, no silent synchronization.

## Cross-repository work

Scope each task to explicitly authorized repositories. Discover candidates
via `projects.json`, never by broad inspection. Inspect before proposing;
reconcile existing files instead of overwriting; validate each repository
independently; record provenance. Coordination never makes consumers depend
on this repository.

## Evidence discipline

Label every claim: **verified** (inspected/tested), **reported** (from a
report, not rechecked), **inferred** (reasoned), **recommended** (proposal).
Never present inference as verification.

## Authorization boundaries

Explicit approval required for: publishing, releases, tags, deployments,
merges, pushes to protected branches, settings/permission changes, branch
protection, secrets, accessing non-authorized repositories, destructive Git
operations. Unresolved owner decisions stay unresolved — record them.

## Preservation and verification

Never reset, clean, stash, or discard unrelated work. Report commands run,
exit codes, failures, and anything unverified. State required approvals
explicitly; do not assume authorization.
