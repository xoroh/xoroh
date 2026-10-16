# AGENTS.md — __REPO_NAME__

__TOOLCHAIN_LINE__ (runtime and install command, e.g. install plus frozen-lockfile equivalent).

## Scope

Work in this repository only. Xoroh standards were adopted by copy (see
`ADOPTED_STANDARDS.md`); this repository never imports Xoroh at runtime or
build time.

## Rules

1. Do not publish, release, tag, deploy, merge, or change remote settings.
2. Do not push to protected branches; do not run destructive Git operations.
3. No secrets in files, logs, or prompts. Never bypass failing checks.
4. Human approval is required before any irreversible action.
5. Verify against `STANDARDS.md`; project specifics stay in project docs.

## Skills

- Release preparation (if applicable): follow `STANDARDS.md` release section;
  stop before publication; never remove holds.
- Standards changes: propose in Xoroh, not here; record decisions as ADRs
  where the project keeps them (__ADR_LOCATION__).

## Reporting

Report commands run, validation results, failures, and anything you could not
verify. State approval requirements explicitly; do not assume authorization.
