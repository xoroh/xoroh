---
name: cross-repo-standardization
description: Apply a canonical Xoroh standard across explicitly requested repositories. Use when the user asks to roll out a standard to multiple repos. Discovers via the registry, reconciles per repo, validates independently, records provenance.
---

# cross-repo-standardization skill

Apply one canonical standard to explicitly requested repositories. Never
inspect or modify all repositories automatically — use the requested scope.

## Workflow

1. Identify the canonical standard (path + version) and the requested scope.
2. Discover affected repositories via `projects.json` (validate first).
3. Inspect current implementations and constraints per repository (read-only).
4. Classify per repo: requirements, recommendations, exceptions, unknowns.
5. Determine the smallest safe adoption plan per repository.
6. Reconcile existing files instead of blindly overwriting them.
7. Apply only authorized changes, one repository at a time.
8. Validate each repository independently with its own checks.
9. Record source provenance (repo + tag/SHA + date + validation) and results.
10. Report completed work, exceptions, and remaining gaps per repository.

## Rules

- Keep the copy-first, review-based distribution model: reviewed copies in
  consumer repos, never live imports. No sync automation, no checksum
  infrastructure, no shared runtime dependency.
- One repository per commit/PR where practical; never cross-contaminate.
- Stop at authorization boundaries (settings, releases, other repos) and
  report the exact approval needed.
- Unresolved owner decisions stay unresolved.
