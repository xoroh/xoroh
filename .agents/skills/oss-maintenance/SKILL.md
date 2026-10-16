---
name: oss-maintenance
description: Run recurring open-source maintenance loops (dependency triage, index upkeep, standards review, health re-checks). Use for scheduled upkeep, not one-shot implementation.
---

# oss-maintenance skill

Recurring maintenance workflows, distinct from one-shot implementation.
Run on schedule (or when triggered), report evidence, stop at authorization
boundaries.

## Loops

- **Dependency triage:** review Dependabot PRs per repo; check changelogs for
  breaking changes (especially majors); merge only within authorization,
  otherwise report readiness.
- **Index upkeep:** verify `projects.json` entries against live repositories
  (branches, status, maintainers); propose updates via PR.
- **Standards review:** quarterly — confirm controls still fit, retire or
  update stale guidance via the governance process (`docs/governance.md`).
- **Health re-checks:** re-run validators and spot-check branch protection,
  scanning posture, and CI health; file findings, don't fix settings.

## Rules

- Maintenance never changes policy, approves decisions, or modifies settings.
- Findings become issues or reported gaps, not silent fixes.
- Record what was checked, what changed, and what needs an owner.
