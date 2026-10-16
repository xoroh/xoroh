---
name: repository-audit
description: Perform read-only audits of specified repositories against Xoroh governance standards. Use to assess Git state, structure, CI, security evidence, and release readiness. Default mode is read-only; implementation needs a separately authorized task.
---

# repository-audit skill

Audit only explicitly named repositories. Default mode is read-only —
any implementation requires a separately authorized task.

## Coverage

- **Identity and Git state:** remote, branches, HEAD, upstream sync,
  worktree, stashes, worktrees, open PRs (read-only).
- **Standards:** which universal-baseline controls apply; evidence per
  control (file / CI run / remote read).
- **Instructions and skills:** the target repository's root agent
  instructions present and accurate; skill coverage for the repo's workflows.
- **Structure and boundaries:** layout vs `repository-structure` policy;
  package boundaries and distribution contracts.
- **CI/tests/builds/security:** workflow definitions, recent results,
  toolchain versions, secret handling, dependency hygiene.
- **Release readiness and maintenance:** versioning, changelog, provenance,
  review cadence — where relevant.

## Rules

- Never modify, commit, push, merge, deploy, or change settings.
- Never access repositories outside the stated scope.
- Label claims verified / reported / inferred / recommended.
- Distinguish a missing control from an unverifiable one; record how each
  gap could be verified.
- Report gaps by severity with evidence, plus what to check next — not a
  redesign.
