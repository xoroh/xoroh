# Standards Changelog

See `versioning.md` for the versioning policy. Entries describe what changed
and how consumers adopt it.

## Unreleased

- On-demand standards-audit workflow: self-audit entry in
  `xoroh-repository`, audit entry in the `atlas` skill (pinned vs latest,
  finding classes, read-only default), governing-skill audit requirement in
  onboarding skill/checklist/template guide, and continuous-improvement loop.
- Initial universal baseline, repository-type profiles, and versioning draft.
- Minimal root `AGENTS.md` pointing at the new `xoroh-repository`
  governing skill; reusable `oss-release`, `repository-audit`,
  `cross-repo-standardization`, `repository-structure`, and
  `oss-maintenance` skills; repository-structure policy
  (`apps/`/`packages/`/`libs/`); onboarding skill updated to cover them.
- New-monorepo onboarding skill (`.agents/skills/xoroh-new-monorepo/`) with
  ordered checklist reference; discoverable via root `AGENTS.md` and the
  template adoption procedure (copy the skill directory; no auto-discovery
  assumed).
- ADR-001 accepted (copy-first distribution); ADR-002 accepted (SemVer 2.0.0,
  `0.x` preview, `STANDARDS-vX.Y.Z`). New: adoption-record format
  (`docs/standards/adoption.md`), release-notes/migration convention,
  30-day deprecation default with emergency exceptions, and `0.1.0`
  readiness checklist (all documentation; no tags or releases created).
- Project index (`projects.json`) with schema and local validator.
- Release-prep skill and release procedure (human approval required; no tags
  or publishes created by this change).
- Consumer fixture (`fixtures/min-consumer/`) with adoption validator
  (`bun run check:fixture`), wired into the CI `validate` job. No new
  dependencies; no `workflow_call` interface.
- Stack-neutral scaffold template (`docs/templates/scaffold/`) with usage
  guide, self-check validator, and trial evidence (isolated instantiation,
  negative test, registry accommodation).
