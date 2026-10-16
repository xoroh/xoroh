# Repository-Type Profiles

Additional standards on top of `universal-baseline.md`. A repository adopts
the universal baseline plus each profile that fits it. Nothing here overrides
project-owned architecture (design-system laws, native stacks, docs engines).

## `scaffold` (transitional)

For pre-implementation repositories (today: Axis, Atlas).

- File-existence CI plus an explicit "not yet decided" ADR for each open
  product decision (stack, framework, package identity).
- No publication conventions apply. `private: true` stays until a release
  checklist explicitly removes it.
- Graduates to a full profile on first implementation; graduation is a reviewed
  PR, not a silent drift.

## `public-library`

For repositories shipping publishable npm packages.

- Changesets (or equivalent) per-package versioning; changelog on release.
- `exports`/`files` audit: built output matches the packed files
  (`npm pack --dry-run`, inspected, never published from CI without approval).
- Type declarations where applicable; peer/runtime compatibility declared.
- Provenance via Trusted Publishing (OIDC) preferred; no repo-wide npm
  credentials; publish only from a human-approved, environment-gated step.

## `monorepo`

- Workspace fan-out with one command (`bun run --filter` or equivalent).
- Boundary rules documented and gated (e.g. renderer A never imports renderer
  B; generated files never hand-edited) with a freshness check in CI.
- Changesets configured with the correct `baseBranch`.

## `docs-site` / `app`

- Preview builds, internal link checks, and accessibility checks in CI.
- Deployments gated on a protected environment with required reviewers.

## `foundation` (this repository)

- Template, workflow, skill, and schema changes follow `docs/governance.md`.
- Every change ships with adoption notes in `docs/standards/CHANGELOG.md`.
