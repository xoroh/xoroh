---
name: repository-structure
description: Apply the Xoroh repository-structure policy (apps/packages/libs meanings). Use when creating, reviewing, or reorganizing monorepo layouts, or when judging whether a directory belongs in apps, packages, or libs.
---

# repository-structure skill

Read `docs/standards/repository-structure.md` first; it is authoritative.

## Consult this policy when

- Scaffolding a new monorepo or adding a top-level directory.
- Reviewing whether a package belongs in `packages/` vs `libs/`.
- Auditing a repository's layout against the baseline.

## Rules

- `apps/` = runnable; `packages/` = independently distributable;
  `libs/` = internal shared code. Classify by distribution contract, not by
  size or consumer count.
- Never require all three directories; never invent `tests/`/`scripts/`
  placement rules (not standardized).
- Framework-required layouts win; record the exception with justification.
- Reorganize only with explicit authorization — moving code is not cleanup.
- Verify with the repository's own checks after any layout change.
