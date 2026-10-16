# ADR-002: Standards versioning policy

- Status: accepted
- Date: 2026-10-16
- Deciders: owner (explicit approval recorded 2026-10-16)

## Context

Xoroh standards need a versioning contract so consumers can pin, review, and
roll back shared requirements. The distribution mechanism itself remains
proposed under ADR-001; this record decides versioning and tag policy only.

## Decision

Adopt Semantic Versioning 2.0.0 for Xoroh standards releases, using the
standard `MAJOR.MINOR.PATCH` structure. Once version `1.0.0` has established
the stable compatibility contract:

- **PATCH** increments represent backward-compatible bug fixes and corrections.
- **MINOR** increments represent backward-compatible additions.
- **MAJOR** increments represent incompatible changes.

### Preview phase

The initial standards release is `0.1.0`. During the `0.x` preview phase:

- The standards are still evolving and are not yet covered by the stable
  compatibility guarantee established at `1.0.0`.
- Breaking changes may be introduced in minor-version increments, consistent
  with SemVer's pre-1.0 rules.
- Patch increments are reserved for fixes that do not introduce new breaking
  changes.
- No `0.x` update may be presented as backward-compatible by default.

Illustrative progression (policy examples, not authorized releases):

- `0.1.0` — initial preview release.
- `0.1.1` — compatible fix.
- `0.2.0` — preview additions; breaking changes may also be introduced.
- `1.0.0` — first production-ready release establishing the stable
  compatibility contract.
- `1.1.0` — first backward-compatible feature release after `1.0.0`.
- `1.1.1` — backward-compatible fixes.
- `2.0.0` — breaking changes after the stable contract is established.

### Stable release milestone

`1.0.0` represents the first production-ready release of the Xoroh standards.
A version number alone never constitutes readiness: the transition must meet
the documented release and acceptance requirements, including applicable owner
approvals. Before `1.0.0`, a `0.x` release may be usable in selected
production settings, but it does not promise the stable standards contract.

### Tag naming

Standards tags use Xoroh's chosen format (a naming convention, not one
mandated by SemVer itself):

`STANDARDS-vMAJOR.MINOR.PATCH`

Examples: `STANDARDS-v0.1.0`, `STANDARDS-v0.1.1`, `STANDARDS-v0.2.0`,
`STANDARDS-v1.0.0`, `STANDARDS-v1.1.0`.

A version or tag must identify a real, corresponding standards release. No
tags or releases are created by this decision.

## Alternatives considered

1. Perpetual `0.x` versioning with no stability commitment — rejected: the
   `1.0.0` milestone gives consumers a defined point at which compatibility
   guarantees begin.
2. CalVer or date-based versions — rejected: SemVer communicates compatibility
   impact, which is what consumers pin against.

## Consequences

- Consumers pin by tag once tags exist, or by commit SHA until then; they
  review changes before adopting and roll back by re-pinning.
- Accepting this policy does not authorize publishing standards, creating
  tags, or downstream adoption — each needs its own authorization.
- The pre-1.0 rule must be restated in every `0.x` release note so no consumer
  mistakes a preview update for a compatibility guarantee.
