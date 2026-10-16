# AGENTS.md — min-consumer fixture (adopted copy)

Bun workspace (`bun@1.4.2`). Install: `bun install --frozen-lockfile`.

## Scope

Work in this repository only. Xoroh standards were adopted by copy; this
repository never imports Xoroh at runtime or build time.

## Rules

1. Do not publish, release, tag, deploy, merge, or change remote settings.
2. Do not push to protected branches; do not run destructive Git operations.
3. No secrets in files, logs, or prompts. Never bypass failing checks.
4. Human approval is required before any irreversible action.

## Reporting

Report commands run, validation results, failures, and anything you could not
verify. State approval requirements explicitly; do not assume authorization.
