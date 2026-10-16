# AGENTS.md — Xoroh ecosystem foundation

Bun monorepo (`bun@1.4.2`). Install: `bun install --frozen-lockfile`.

## Scope

Work in this repository only. Reference repos (`kern`, `axis`, `atlas`) are
read-only context; the private product monorepo is strictly excluded — never
access, inspect, or reference its contents.

## Rules

1. Do not publish, release, tag, deploy, merge, or change remote settings.
2. Do not push to `main`; do not run destructive Git operations.
3. No secrets in files, logs, or prompts. Never bypass failing checks.
4. Human approval is required before any irreversible action.
5. Verify against `docs/standards/`; project specifics stay in project repos.

## Skills

- Release preparation: `.agents/skills/release-prep/SKILL.md` (stops before
  publication; never removes holds).
- New-monorepo onboarding: `.agents/skills/xoroh-new-monorepo/SKILL.md`
  (discover standards, inspect stack, adapt scaffold, validate, record
  adoption; stops before releases, permission changes, cross-repo actions).
- Standards changes: follow `docs/governance.md` and record decisions as ADRs
  in `docs/adr/`.

## Reporting

Report commands run, validation results, failures, and anything you could not
verify. State approval requirements explicitly; do not assume authorization.
