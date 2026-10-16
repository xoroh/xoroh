# Applicable standards — __REPO_NAME__

Source: Xoroh shared standards (see `ADOPTED_STANDARDS.md` for the pinned
revision). This file states which shared requirements apply to this project
and which details the project must supply itself.

## Provided by this scaffold (inherited, keep current)

- Least-privilege CI permissions (`contents: read` by default).
- SHA-pinned third-party Actions with version comments.
- Reproducible installs (frozen lockfile or equivalent — wire to the
  project's toolchain in `.github/workflows/ci.yml`).
- Branch protection expectations (strict checks, conversation resolution, no
  force pushes/deletions) — to be verified against remote settings, not
  assumed from files.
- Contribution, security, conduct, and support conventions.
- Agent instructions with prohibited actions and reporting rules.
- Human approval for releases, deployments, and destructive operations.
- No committed secrets.

## To be supplied by the project

- Toolchain, install/build/test commands (`CONTRIBUTING.md`, CI jobs).
- Package identity, versioning, and release policy (if it publishes).
- Runtime/platform matrix and environment-gated deploy steps (if it deploys).
- Lint/format/typecheck configuration for its stack.
- Dependency-update coverage for its lockfiles.
- License confirmation (MIT text ships per ecosystem convention; replacing it
  requires updating every MIT reference in this scaffold).

## To be verified by the owner (cannot be templated)

- Branch protection and required checks on the default branch.
- Secret scanning and push protection (or a recorded exception).
- Release/deployment approvers and environment gates.
- Standards-tag policy once ADR-001 is decided (tags do not exist yet;
  adoption pins are commit SHAs).
