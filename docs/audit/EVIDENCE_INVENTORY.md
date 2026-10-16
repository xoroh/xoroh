# Evidence Inventory — Xoroh ecosystem audit, 2026-10-16 UTC

Companion to `docs/ECOSYSTEM_PLAN.md` (§§3–4). All inspection read-only.
Labels: **Verified** (observed), **Reported** (in-repo claim, not re-measured),
**Inferred**, **Unresolved**.

## Observation log

| Time (UTC) | Action | Result |
|------------|--------|--------|
| 2026-10-16 ~00:00 | Listed `xoroh` org repos via `gh api orgs/xoroh/repos` | 4 public in-scope repos (`xoroh`, `kern`, `axis`, `atlas`); private product monorepo excluded — not cloned, not inspected, no metadata recorded |
| — | Cloned 4 public repos to `/tmp/opencode/xoroh-audit/` (read-only inspection) | `xoroh@1a1b2c9` (main), `kern@f0774ae` (main), `axis@638a1a1` (development), `atlas@a70ea34` (development); all worktrees clean |
| — | Subagent deep-dives (4× explore) + direct API checks | Reports reconciled into plan §§3–4 |
| — | `npm org ls xoroh`, `npm view @xoroh/{axis,kern}`, `npm search @xoroh` | Owner `novexonl`; zero published packages (404s) |
| — | Branch protection / Actions perms / envs / teams / runs / releases / alerts via `gh api` | Recorded below; no settings changed |

## Per-repo facts (Verified)

### xoroh/xoroh — `main@1a1b2c9`, clean, 19 tracked files
- `package.json`: `xoroh@0.0.0`, `private:true`, Bun 1.4.2, workspaces `apps/*`, no scripts/deps.
- `apps/site`: static `index.html` + `styles.css` only; `/docs` and `/projects` links have no targets.
- `.github/workflows/ci.yml`: single `main` job, `contents:read`, SHA-pinned checkout v4 + setup-bun v2, `bun install --frozen-lockfile`, six `test -f` existence checks.
- `dependabot.yml`: github-actions weekly only. PR/issue templates present; `blank_issues_enabled:false`. No CODEOWNERS, no `AGENTS.md`/skills, no `docs/`, no ADRs, no changesets, no publish config.
- History: 7 commits; 1 unmerged Dependabot branch (checkout 7.0.1). No tags/releases. CI green.

### xoroh/kern — `main@f0774ae`, clean
- Bun 1.3.8 monorepo (`apps/*`, `packages/*`, `libs/*`); publishable-intent `@xoroh/kern|kern-tokens|kern-native|kern-icons|kern-mcp|kern-contracts|kern-material-3` (all `0.0.0`, MIT), private `kern-cli` + `libs/kern-primitives`.
- Stacks: web React on Base UI; native RN StyleSheet; `kern-tokens` + DTCG 2025.10 (`dtcg.json`, ADR-006); MCP server (12 tools); `kern-cli` installer; `kern-contracts` metadata schemas.
- Standards present: `AGENTS.md` + `.agents/skills/{kern,kern-agents,docs}`; Biome; strict TS; changesets (~70 pending) + `docs/releases.md`/`versioning.md`; `CODEOWNERS` (10 teams); Dependabot npm+gha grouped; `release.yml` (env-gated Trusted Publishing design, founder HOLD); `deploy.yml` (production env, Cloudflare).
- Migration material (Reported, not modified): `docs/planning/XOROH_MIGRATION.md` self-describes as **BLOCKED until owner authorization**; `docs/planning/` (00–09), `docs/plan/`, `KERN_ARCHITECTURE_AUDIT_HANDOFF{,2,3}.md`, parity contracts + ~24 gate scripts.
- CI: `main` **red** — run 38825478289 `apps/Typecheck site` fails (`routeTree.gen` missing; route types collapse to `never`); PR #18 runs show `gates`, `pkg(kern|kern-native|mcp)`, `apps` failures. Required check is `cold-install` only → red merges possible.
- Open PRs: #18 (Biome fix), #19/#20 (setup-node/upload-artifact 7.x). No open issues (count 3 = PRs). No tags/releases.

### xoroh/axis — `development@638a1a1`, clean, 27 tracked files
- `axis-monorepo@0.1.0` private, Bun 1.3.8; `packages/core` = `@xoroh/axis-core@0.1.0` **`private:true`**, no `exports`/`main`/`scripts`/`src` — deliberate placeholder (enforced by `tests/monorepo.test.ts`).
- Zero mobile code: no RN/Expo/NativeWind/metro/gesture/a11y hits; no TS/Biome config; no `AGENTS.md`; `docs/RELEASING.md` = manual-only, "do not publish placeholder".
- CI single `validate` job (pinned, least-privilege), green. 2 commits + 1 Dependabot branch. No `main`, no tags/releases.

### xoroh/atlas — `development@a70ea34`, clean, 26 tracked files
- `atlas-monorepo@0.1.0` private, Bun 1.3.8; `apps/docs` = `@xoroh/atlas-docs@0.1.0` private, no framework/deps; `packages/` empty.
- No docs framework/content/search/i18n/AI-retrieval; README states scaffold. Zero coupling to kern/axis/xoroh (no `@xoroh/*` deps).
- CI single `validate` job, green. 1 commit + 1 Dependabot branch. No `main`, no tags/releases.

### xoroh/xoroh-platform — EXCLUDED (not inspected)
- Private product monorepo under separate authorization. Not cloned; no files,
  branches, commits, issues, PRs, workflows, secrets, configuration, or
  documentation accessed. No metadata recorded. If a task appears to require
  access, stop and request explicit owner authorization.

## Platform facts (Verified via GitHub API as admin `Novexonl`)
- Protection (all): strict + enforce-admins + conversation-resolution; force-push/deletion blocked; approvals required **0**; code-owner reviews off; **no rulesets**.
- Required checks: `xoroh/main:[main]`, `kern/main:[cold-install]` (gap), `axis/development:[validate]`, `atlas/development:[validate]`.
- Actions: `allowed_actions:all` + `sha_pinning_required:true` (all repos); default `GITHUB_TOKEN` perms `read`, no PR-approval use (all repos).
- Environments: only kern — `npm-publish` + `production`, both require review by team `release` (protected-branches only, no admin bypass). **Team `release` = 1 member (`Novexonl`)** — separation-of-duties gap.
- Dependabot alerts: 0 everywhere. Code scanning: no analyses (CodeQL off). Secret scanning: disabled on all four repos (repo-level 404). Push-protection org default: Unresolved (token scope).
- Releases/tags: none anywhere. `npm org ls xoroh` → `novexonl - owner`.

## Key inferences
- Kern's red `main` merged because required checks exclude failing jobs — protection, not just code, needs fixing.
- Axis `@xoroh/axis-core` placeholder vs preferred `@xoroh/axis` is an open naming decision, not an error.
- Scaffolds (axis/atlas) show sound minimal hygiene (pinning, least privilege, frozen lockfiles, manual-release guardrails) — adopt standards at implementation time, not before.

## Unresolved / needs owner
Secret/push-protection org defaults; full team rosters; npm Trusted Publisher/2FA re-verification at release time; migration AST counts (Reported); private-repo internals (out of scope).

## Worktree note
Planning files created (uncommitted) in this working copy: `docs/ECOSYSTEM_PLAN.md`, `docs/audit/EVIDENCE_INVENTORY.md`. No other modifications; no commits/pushes/merges/releases/publishes/settings changes performed.
