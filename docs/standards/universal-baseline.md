# Universal Baseline

Applies to every public Xoroh repository. Labels: [MUST] required (exceptions
need recorded justification), [SHOULD] recommended, [MAY] optional.

## CI and supply chain

1. [MUST] Least-privilege `GITHUB_TOKEN`: repository default `read`;
   per-job `permissions` minima (`contents: read` unless a job needs more).
   Verify: `gh api repos/<org>/<repo>/actions/permissions/workflow` (remote)
   plus workflow `permissions:` blocks (files).
2. [MUST] SHA-pinned third-party Actions with version comments
   (e.g. `# v4`). Organization enforces `sha_pinning_required`. Verify: inspect
   `uses:` lines in `.github/workflows/*.yml`.
3. [MUST] Reproducible installs: `bun install --frozen-lockfile` (or the
   lockfile equivalent) in CI; commit the lockfile. Verify: CI run + local
   `bun install --frozen-lockfile`.
4. [MUST] Branch protection on default and development branches: strict
   required checks, conversation resolution, no force pushes or deletions.
   Required checks must cover **every blocking CI job** — a green merge on a
   red branch is a protection defect, not just a CI defect.
   Verify: `gh api repos/<org>/<repo>/branches/<branch>/protection` (remote).
5. [MUST] `timeout-minutes` on every CI job (≤ 30; ≤ 10 for scaffold checks).
6. [SHOULD] Dependabot: `github-actions` weekly everywhere, plus the package
   ecosystem (`bun`/`npm`) wherever a lockfile has dependencies.
7. [SHOULD] Secret scanning + push protection enabled; otherwise a dated,
   risk-accepted exception recorded by the owner. Verify in Organization →
   Code security (remote); never inferred from files.

## Contribution and governance files

8. [MUST] `CONTRIBUTING.md`, `SECURITY.md` (private-advisory reporting),
   `CODE_OF_CONDUCT.md`, `SUPPORT.md`, MIT `LICENSE`. PR/issue templates with a
   no-secrets checklist; `blank_issues_enabled: false`.
9. [MUST] Human approval for releases, deployments, pushes to protected
   branches, and destructive Git operations. Agents and automation stop before
   these actions.

## Agent operation

10. [MUST] Root `AGENTS.md` with scope, prohibited actions, and reporting
    rules (see this repo's `AGENTS.md` as the reference implementation).
11. [MUST] No committed secrets, tokens, or credentials — in files, lockfiles,
    logs, or prompts.

## Verify

For each adopting repository, evidence is one of: **file** (path in repo),
**CI** (passing run), or **remote** (API/dashboard read). A standard is
"adopted" only when all three applicable evidences exist.
