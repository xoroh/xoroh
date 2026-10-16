# Xoroh Ecosystem Plan (Authoritative)

> Status: **proposed** — requires owner approval for decisions marked [APPROVAL].
> Observation date: 2026-10-16 UTC. Evidence inventory: `docs/audit/EVIDENCE_INVENTORY.md`.
> This document is the single authoritative ecosystem plan. Older material: none exists
> in this repository (verified: no `docs/`, no ADRs, no prior plans at HEAD `1a1b2c9`).
> The Kern–Axis migration plan (`xoroh/kern` `docs/planning/XOROH_MIGRATION.md` and
> `docs/planning/`, `docs/plan/`) remains authoritative for that workstream and is
> **not** modified or superseded by this plan (§25 reconciles the two).
>
> Reconciliation record (2026-10-16): `docs/audit/RECONCILIATION.md` reviewed
> this plan against the evidence. Material corrections: tasks K-01–K-03 are
> external proposals requiring a separately authorized task (they edit another
> repository and remote settings) and do not block Xoroh-only work; O9 and X-10
> rescoped per the private-repo exclusion; X-06 decoupled from X-02; X-07
> narrowed to starter conventions + fixture validation for v1.

Evidence labels used below: **Verified** (directly observed), **Reported**
(described in repo docs, not independently verified), **Inferred** (derived),
**Recommended** (proposed), **Unresolved** (needs evidence or approval).

---

## 1. Executive summary

The Xoroh open-source ecosystem consists of four repositories under the `xoroh`
GitHub organization plus one private product monorepo (`xoroh/xoroh-platform`,
excluded from this mission — see §7).
Verified state (2026-10-16):

- `xoroh/xoroh` is a 19-file static-site scaffold. It currently provides **none**
  of the ecosystem-foundation capabilities (no templates, reusable workflows,
  standards, index, or release tooling). CI hygiene is good (SHA-pinned actions,
  least-privilege tokens) but quality gates are file-existence checks only.
- `xoroh/kern` is a real, substantial design-system monorepo (Bun 1.3.8,
  ~8 publishable-intent packages under `@xoroh/*`, TanStack Start docs site,
  Expo host, MCP server, DTCG tokens, changesets). Its `main` CI is **currently
  failing** (site typecheck: missing generated `routeTree.gen`) while branch
  protection requires only the `cold-install` check — failing jobs do not block
  merges. First publication (`0.0.0→0.1.0`) is code-ready but founder-gated
  (Trusted Publishing HOLD). A separate migration plan exists and is explicitly
  **BLOCKED until owner authorization**.
- `xoroh/axis` and `xoroh/atlas` are **day-one scaffolds** (2 commits and
  1 commit respectively, `development` default branch, no `main`, no source
  code, no framework selected). Axis's placeholder package is
  `@xoroh/axis-core` (`private:true`), conflicting with the preferred public
  name `@xoroh/axis`. Atlas has selected no docs framework.
- Platform baseline is partially strong: default workflow permissions `read`,
  SHA-pinning enforced org-wide (`sha_pinning_required:true`), Dependabot alerts
  0, no published `@xoroh/*` packages (clean slate). Gaps: required approvals
  = 0 everywhere, single-member release team (no separation of duties), no
  CodeQL analyses, secret scanning disabled on all four repos, no npm/bun
  Dependabot ecosystems outside Kern, no releases/tags anywhere.

This plan therefore sequences work as: (1) stop the bleeding in Kern CI
protection, (2) resolve foundational ownership/naming/governance questions,
(3) build the minimal shared-standards core in Xoroh and distribute it by the
cheapest reproducible mechanism, (4) adopt in Axis/Atlas as they select stacks,
(5) keep Kern's migration undisturbed behind explicit reconciliation gates.

---

## 2. Measurable outcomes and success criteria

| # | Outcome | Success criterion (measurable) |
|---|---------|-------------------------------|
| O1 | Merges to protected branches always pass quality gates | Required status checks cover all blocking CI jobs; `main`/`development` branches green for 14 consecutive days (`gh run list --status failure` empty) |
| O2 | No single-person release approval | `required_approving_review_count ≥ 1` with `prevent_self_review` (or 2-member release team) on `npm-publish`/`production` environments; verified via API |
| O3 | One authoritative shared baseline exists | `docs/standards/*` in `xoroh/xoroh` + versioned distribution (see §9); consumers pin and verify via documented commands |
| O4 | Kern publishes safely or holds explicitly | Either first `@xoroh/*@0.1.0` published with provenance + attestation, or HOLD recorded with unblock conditions; no silent publish path |
| O5 | Axis has a decided native stack and package identity | ADR merged: stack + `@xoroh/axis` vs `@xoroh/axis-core`; placeholder replaced by real entry points or explicitly deferred |
| O6 | Atlas has a decided framework and content model | ADR merged: framework + versioning/search/i18n/AI-retrieval scope; scaffold replaced or explicitly deferred |
| O7 | Every repo has minimum security posture | Secret scanning + push protection enabled (or documented exception), CodeQL or justified alternative, npm/bun Dependabot where deps exist |
| O8 | Agents operate safely by default | `AGENTS.md` + scoped skills in every repo; no agent path can publish, deploy, or push to protected branches without human approval |
| O9 | Private-repo adoption guidance exists without any access | Selective-adoption matrix published as optional guidance (§16); no inspection, adoption, or verification performed under this plan |

---

## 3. Verified repository and GitHub baseline

### 3.1 Repository inventory (Verified, 2026-10-16 UTC)

| Repo | Visibility | Default | HEAD SHA | Worktree | State |
|------|-----------|---------|----------|----------|-------|
| `xoroh/xoroh` | public | `main` | `1a1b2c9` | clean, in sync | 19-file scaffold; static `apps/site`; no framework/tests/build |
| `xoroh/kern` | public | `main` | `f0774ae` | clean, in sync | Full design-system monorepo; Bun 1.3.8; ~70 pending changesets; CI failing on `main` |
| `xoroh/axis` | public | `development` (no `main`) | `638a1a1` | clean, in sync | Scaffold only; `@xoroh/axis-core` placeholder `private:true`; no source |
| `xoroh/atlas` | public | `development` (no `main`) | `a70ea34` | clean, in sync | Scaffold only; `@xoroh/atlas-docs` placeholder; no framework |
| `xoroh/xoroh-platform` | — (excluded; see §7) | — | Excluded from this mission. Not cloned, not inspected; no metadata recorded. |

npm: **no `@xoroh/*` packages published** (Verified: `npm view @xoroh/axis`,
`@xoroh/kern` → 404; `npm search @xoroh` → no matches). npm user `novexonl`
holds `owner` on org `xoroh` (Verified: `npm org ls xoroh`).

### 3.2 Branch protection (Verified via API)

All protected branches: `strict:true`, `enforce_admins:true`,
`require_conversation_resolution:true`, force-push/deletion blocked,
`required_approving_review_count:0`, `require_code_owner_reviews:false`.
**No rulesets** on any repo. Required checks:

| Repo / branch | Required checks | Assessment |
|---------------|----------------|------------|
| `xoroh/main` | `main` (single CI job) | Adequate for current scaffold; must expand when jobs are added |
| `kern/main` | `cold-install` only | **Inadequate**: `gates`, `dist-gates`, `pkg/*`, `apps`, `e2e` failures do not block merge. Main is red (see §3.4) |
| `axis/development` | `validate` (single CI job) | Adequate for scaffold |
| `atlas/development` | `validate` (single CI job) | Adequate for scaffold |

### 3.3 Actions, environments, teams (Verified via API)

- Actions permissions: `allowed_actions:"all"` + **`sha_pinning_required:true`**
  on all four repos (org-enforced; all workflows observed are SHA-pinned —
  strength to preserve).
- Default `GITHUB_TOKEN` permissions: `read` on all four repos;
  `can_approve_pull_request_reviews:false`. Workflow files additionally declare
  `contents:read` least privilege. Strength to preserve.
- Environments: only `kern` has any: `npm-publish` and `production`, both gated
  on required review by team `release` with `branch_policy:protected_branches`
  and `can_admins_bypass:false`. **Team `release` has exactly 1 member
  (`Novexonl`)** — separation-of-duties gap (see §11.1). `xoroh`/`axis`/`atlas`
  have no environments (correct for now: nothing publishable).
- Open PRs (all Dependabot or CI-fix, none merged at observation):
  `xoroh#3` (checkout 7.0.1); `kern#18` (Biome lint fix), `#19`/`#20`
  (setup-node/upload-artifact 7.x); `axis#2`, `atlas#1` (checkout 7.0.1).
  Note: `main`-branch workflows still pin `checkout v4` SHA; Dependabot
  proposes v7.0.1 — merging requires verifying v7 breaking changes.
- Releases/tags: **none** in any repo (Verified). No package has ever published.

### 3.4 CI health (Verified)

- `xoroh`, `axis`, `atlas`: green (trivial install+test/file checks).
- `kern/main`: **red**. Run `38825478289` (merge PR #23): `apps / Typecheck
  site` fails — `src/router.tsx` cannot find `./routeTree.gen` and all
  TanStack route registrations resolve to `never` (generated route tree not
  produced before typecheck in CI, or gitignored artifact missing). Same class
  of failure appears on PR checks (`gates`, `pkg(kern|kern-native|mcp)`,
  `apps` failing on PR #18's runs). Because only `cold-install` is required,
  red `main` merged. **This is the highest-priority fix (task K-01).**
- `kern` deploy runs show `waiting` (environment approval gating works as
  configured).

### 3.5 Security baseline (Verified)

- Dependabot alerts: 0 across all repos. Dependabot config: `github-actions`
  weekly everywhere; `npm`+`gha` with grouping only in Kern. **Axis/Atlas/Xoroh
  have no npm/bun ecosystem coverage** (acceptable today — near-zero deps — but
  must be added when deps arrive).
- Code scanning: **no analyses found** on any repo (CodeQL not enabled).
- Secret scanning: **disabled** on all four repos (API 404
  "Secret scanning is disabled"); push-protection state could not be verified
  with current token scope — recorded Unresolved with manual checklist (§4).
- Kern release workflow uses Trusted Publishing design (`id-token:write`
  isolated to env-gated job, `provenance:true`, `NPM_TOKEN` must not exist
  during HOLD) — sound but unexercised.

---

## 4. Evidence quality and access limitations

| Area | Status | How to verify remaining |
|------|--------|------------------------|
| Repo contents, workflows, configs | Verified (full clones, read-only) | — |
| Branch protection, Actions perms, envs, teams, runs, releases/tags | Verified (GitHub API as `Novexonl`, admin) | — |
| npm org/publish state | Verified (`npm org ls`, `npm view` 404s) | Re-check at release time; confirm Trusted Publishing requirements against current npm docs |
| Secret scanning / push protection org defaults | Partially verified (repo-level disabled confirmed; org default unseen) | Owner: Organization → Settings → Code security; enable or record exception |
| Private `xoroh-platform` internals | Excluded — not inspected, no metadata recorded | Only via separately authorized task; never required for public baseline |
| Kern–Axis migration internals (AST counts, symbol lists) | Reported (from `docs/planning/*`; counts not re-measured) | Migration workstream re-measures before executing |
| Team memberships beyond `release` | Partially listed (several teams exist; full roster not enumerated) | Owner: org Teams pages |
| OIDC/Trusted Publishing publisher config on npmjs.com | Unverified (no publish attempted; correct per prohibitions) | Manual: npmjs.com → `@xoroh` scope → Trusted Publisher + dry-run checklist (§13) |

Read-only inspection only was performed. No commits, pushes, merges, releases,
publishes, deployments, or settings changes were made during this mission.

---

## 5. Xoroh mission, ownership, and non-goals

**Mission (Recommended):** `xoroh/xoroh` is the ecosystem foundation and
canonical home for shared engineering standards, repository conventions,
governance, reusable workflows, AI-agent guidance, release engineering, and the
project index. It serves humans and agents initializing, contributing to, or
auditing any Xoroh open-source project.

**Ownership (Recommended, [APPROVAL]):** Xoroh org owners (currently
`Novexonl`) own Xoroh governance and shared standards; each project repo keeps a
named maintainer or team (Kern has `design-system-lead`/`kern*` teams —
confirm roster; Axis/Atlas need named maintainers when implementation starts).

**Non-goals (must hold):**

1. Xoroh never absorbs Kern's design-system implementation, Axis's mobile
   interaction implementation, Atlas's docs-engine implementation, or private
   product responsibilities.
2. Xoroh never becomes a runtime or build-time dependency of Kern/Axis/Atlas.
3. No mandatory cross-repo runtime coupling merely to simplify tooling.
4. No automatic publishing, auto-merging, or agent-approved releases — humans
   approve every irreversible action.

---

## 6. Four-project ecosystem architecture

```
xoroh/xoroh ......... standards, templates, reusable workflows, index (no runtime)
xoroh/kern .......... design-system platform (web React + native RN renderers,
                      tokens/DTCG, icons, MCP, CLI) — independent implementations
                      per design system; never collapsed into one themed impl
xoroh/axis .......... design-system-neutral native-mobile behavior/accessibility
                      primitives (greenfield; stack undecided)
xoroh/atlas ......... documentation platform (greenfield; framework undecided)
                      — projects keep standalone READMEs/CONTRIBUTING/API docs
(shared contracts: DTCG tokens for Kern↔Axis interop; versioned metadata
schemas à la kern-contracts; machine-readable project index)
```

Dependency rules (Recommended):

- Kern, Axis, Atlas each build, test, and develop with **zero access** to the
  Xoroh repo (standards are copied/pinned artifacts, not live imports).
- Kern renderers (`kern` DOM vs `kern-native` RN) never import each other
  (existing Kern law, preserved).
- Axis consumes Kern **tokens only** (`tokens.json` / `dtcg.json` /
  `resolveThemeDetails`), never renderer internals.
- Atlas documents projects via checked-in sources and published metadata, not
  live monorepo imports; Atlas is never a dev prerequisite.
- Private monorepo consumes sanitized, pinned copies only (§16).

---

## 7. Private monorepo boundary

`xoroh/xoroh-platform` is a private product monorepo under separate
authorization. It is **excluded from this mission**: it was not cloned or
inspected, and no implementation, adoption, settings, or metadata work applies
to it under this plan. If any future task appears to require access, stop and
request explicit owner authorization first.

The following is optional future-adoption guidance only (implementation requires
separate authorization): should the owner later authorize alignment work, the
private boundary retains exclusive ownership of application security, tenant
isolation, secrets management, production infrastructure, deployment, data
protection, customer data, and operational requirements, and must never be
forced into public repos' layout, publishing model, or governance. Candidate
shareable standards (least-privilege CI, SHA pinning, dependency hygiene,
reproducible builds, agent-safety conventions, review/verification procedures,
release-approval principles) are classified in §16. Adoption, if ever
authorized, flows one way (public→private, sanitized copies); nothing private
flows back. No product changes are proposed.

---

## 8. Canonical shared engineering standards

### Level 1 — Universal baseline (mandatory for all public repos)

1. Least-privilege `GITHUB_TOKEN` (`contents:read` default; per-job minima).
2. SHA-pinned third-party Actions with version comments (already org-enforced;
   keep `sha_pinning_required:true`).
3. `bun install --frozen-lockfile` (or lockfile-equivalent) + lockfile
   consistency gate.
4. Branch protection on default/dev branches: strict checks, conversation
   resolution, force-push/deletion blocks, **required checks covering all
   blocking jobs** (the Kern gap in §3.2 must not recur).
5. PR template with Summary/Validation/secrets checklist; issue templates with
   `blank_issues_enabled:false`.
6. `SECURITY.md` (private advisories), `CODE_OF_CONDUCT.md`, `SUPPORT.md`,
   MIT license headers policy.
7. Dependabot: `github-actions` weekly everywhere + package-ecosystem coverage
   wherever a lockfile has deps.
8. Secret scanning + push protection enabled (or risk-accepted exception).
9. Agent instructions (`AGENTS.md`) with safe defaults (§12).
10. Human approval for releases, deployments, and destructive Git operations.
11. `timeout-minutes` on all jobs; no committed secrets/tokens.

### Level 2 — Repository-type profiles

| Profile | Applies to | Extra standards |
|---------|-----------|-----------------|
| `public-library` | Kern packages, future Axis/Atlas packages | Changesets, `publint`/`attw`-class export checks, provenance, `files`/`exports` audit, `npm pack --dry-run` |
| `monorepo` | Kern, Axis, Atlas | Workspace fan-out (`bun run --filter`), layering/boundary gates, generated-file freshness census |
| `docs-site` / `app` | Kern site/mobile, Atlas docs | Preview builds, link checks, a11y checks, env-gated deploys |
| `foundation` | Xoroh itself | Template/reusable-workflow versioning, index schema, ADR process |
| `scaffold` (transitional) | Axis/Atlas today | File-existence CI + explicit "not yet decided" ADRs; graduates to a full profile on first implementation |

No npm-publication conventions imposed on non-publishing repos.

### Level 3 — Project extensions (stay in project repos)

- **Xoroh:** governance, discovery schema, template maintenance.
- **Kern:** M3-canonical naming law, renderer-family split, token pipeline,
  parity contracts, Base UI/RN-StyleSheet stack rules, private-kernel boundary.
- **Axis:** native accessibility/interaction/lifecycle semantics, gesture
  handling, cross-platform device-matrix testing (to be defined with stack ADR).
- **Atlas:** versioning/search/i18n/AI-retrieval contracts, content model.
- **Private:** tenant isolation, secrets, infra, deployment.

---

## 9. Distribution, synchronization, and versioning strategy

**Recommended: hybrid model by artifact type (Recommended, [APPROVAL]):**

| Artifact | Mechanism | Rationale |
|----------|-----------|-----------|
| CI quality-gate logic (lint/typecheck/test recipes) | Reusable workflows (`workflow_call`, pinned by SHA/tag) | Update visibility + centralized fixes; consumers pin |
| Small static files (editorconfig, PR/issue templates, `AGENTS.md` core, Dependabot defaults) | Versioned template repo or `docs/standards/` copies + checksum manifest | Offline-friendly; explicit update PRs; trivial rollback |
| Release-prep skill/procedure | Versioned skill directory, copied per repo, changelog-noted | Agents need local files; review diffs on update |
| Policy docs (security, versioning, branching) | Canonical markdown in Xoroh + per-repo pointer | Avoid competing authoritative copies |
| Emergency security fixes | Direct PR from Xoroh maintainers to each repo (fast lane), then backfill template | Speed with audit trail |

**Explicitly rejected:** Git submodules (poor UX/rollback), automated silent
sync bots (silent divergence), live cross-repo imports (violates §6 autonomy).

Versioning: shared standards use SemVer-ish `STANDARDS-vX.Y.Z` tags on Xoroh;
breaking = any change that fails previously-passing consumers
(new required check, renamed workflow input, stricter gate). Consumers pin by
tag/SHA, validate via `docs/standards/CHANGELOG.md` migration notes, roll back
by re-pinning. Deprecated standards get a 30-day sunset notice in the index.

---

## 10. Repository templates, contribution conventions, governance, discovery

Xoroh owns (Recommended): repo template (`template-bun-monorepo`, `template-docs`),
README/CONTRIBUTING/SECURITY/SUPPORT/issue/PR/CODEOWNERS starters, CI starter
workflows, Dependabot defaults, `AGENTS.md` core, ADR template, release
checklist, repo-type profiles (§8), project metadata schema + public index.

Minimum project metadata (machine-readable `projects.json`, mirrored as
human-readable `/projects` page later):

`name, purpose, canonical_repo, default_branch, status (scaffold|active|
maintenance), maturity, maintainers, license, runtimes, platforms,
packages[] (name, private, published?), docs_url, support_url,
release_policy, security_reporting, ecosystem_relations`.

Missing today (Unresolved, needs owner input): maintainer rosters for
Axis/Atlas, maturity labels, docs URLs. Do not invent them — use
`"tbd-owner-input"` placeholders.

---

## 11. CI/CD, security, quality gates, supply-chain practices

### Mandatory controls

Per §8 Level 1, plus: required-check coverage of every blocking job (close the
Kern `cold-install`-only gap); `npm pack --dry-run` + manifest/`exports`
validation for publishable packages; provenance (`--provenance` / Trusted
Publishing) where npm supports it; lockfile reproducibility; environment-gated
publish/deploy with no repo-wide npm credentials.

### Risk-based options (not mandatory everywhere)

CodeQL (recommended for TS-heavy Kern/private; lighter posture acceptable for
static scaffolds with justification), coverage thresholds per renderer (not one
global number), visual-regression testing (Kern explicitly documents its absence
in `verification-limits.md` — keep honest, add only with owner funding).

### 11.1 Branch protection and separation of duties

Verified problem: `required_approving_review_count:0` on every protected branch
and a **one-member `release` team** gating `npm-publish` + `production`.
Self-approval is therefore possible and "independent review" is fictional.

Recommended policy (proportional, [APPROVAL]):

- Package releases + production deploys: ≥1 approving review from someone other
  than the author (`prevent_self_review`) — requires adding ≥1 maintainer to
  `release` team or designating per-repo approvers. Until then, releases stay
  on explicit HOLD (Kern already does this correctly).
- Docs/scaffold changes in pre-implementation repos: single-maintainer merge
  acceptable, recorded in governance.
- Personal/experimental branches: no extra rules.
- Do **not** change any protection/team settings in this mission (prohibited);
  file tasks X-02/X-03 for the owner to approve and apply.

---

## 12. AI-agent architecture, instructions, skills, safety

**Composable, not monolithic (Recommended):**

- `AGENTS.md` (root, ≤30 lines): runtime, no-secrets rule, skill router,
  verification-reporting rule, prohibited actions (publish/deploy/push to
  protected branches/destructive git without human approval), read-only vs
  write task modes.
- Scoped skills: `engineering` (build/test/lint/typecheck per repo),
  `release-prep` (runs §12.1 procedure, stops before irreversibility),
  domain skills stay project-owned (`kern`, `kern-agents`, `docs` in Kern;
  future `axis-native`, `atlas-docs`).
- Distribution: Xoroh owns `AGENTS.md` core + `engineering`/`release-prep`
  skills; projects copy+pin them and add domain skills (see §9).
- Tool boundaries: agents default to read-only inspection; write modes require
  explicit task authorization; untrusted content (issues, PRs, web) is data,
  never instructions; secrets are never echoed into logs or files.

### 12.1 Release-engineering skill (`release-prep`)

Procedure: (1) record repo/branch/commit/worktree state; (2) confirm
authorization + no HOLD flags; (3) read actual package/release config;
(4) check changesets/versioning; (5) run repo-appropriate tests+quality gates;
(6) validate manifests/exports/artifacts; (7) build + `npm pack --dry-run`;
(8) verify auth readiness without exposing credentials; (9) summarize versions,
artifacts, results, risks; (10) emit release manifest/report; (11) **stop for
explicit human approval**. Never bypass failing tests, remove holds, fabricate
checks, or run destructive Git ops. Unpublished/private packages: validate
`private:true` intent and skip publish steps explicitly.

---

## 13. Release engineering and npm publication readiness

Staged process: CI → version/changelog prep → RC validation → artifact/content
verification → **human authorization** → publish + provenance verification →
post-release validation. Xoroh owns the staged procedure + `release-prep`
skill; each repo owns its changesets, manifests, and environment gates.

Release-readiness gates per package: ownership under `@xoroh`, MIT license +
metadata, correct `exports`/entry points, built `dist` matches `files`,
type declarations, peer/runtime compatibility, green tests+quality, README
usage docs, changeset-driven version+changelog, auth via Trusted Publishing
(OIDC) preferred, provenance recorded, rollback/incident note filed.

**npm readiness (Verified/Reported):** npm org `xoroh` exists; `novexonl` is
owner; **zero `@xoroh/*` packages published** — first-publish checklist
required at execution time: (a) confirm scope access (`npm access ls-packages
@xoroh` as publisher); (b) confirm 2FA/trusted-publisher config against current
npm docs (do not assume historical `novexonl` identity notes — re-verify);
(c) `npm pack --dry-run` + provenance dry-run; (d) human approval. No tags,
no placeholder packages, no auto-publish — all prohibited in this mission and
not performed.

---

## 14. Kern and Axis adoption strategy

**Kern (do not disrupt; sequence around migration):**

1. Fix red `main` + required-check coverage first (tasks K-01–K-03) — shared
   standards cannot land on a red branch.
2. Adopt Xoroh standards incrementally: `AGENTS.md` core pointer (Kern keeps
   domain skills), Dependabot npm coverage already exists (keep), secret
   scanning + CodeQL decision, `release-prep` skill alongside existing
   `docs/releases.md` (no replacement without migration-workstream agreement).
3. Publication stays founder-gated until O4 criteria met; `preflight-publish`
   peer-range tightening (`*`→`^0.1.0`) proceeds per Kern's own plan.
4. No changes to `docs/planning/*`, `docs/plan/*`, ADRs, or package
   architecture from this workstream.

**Axis (greenfield — decide before building):**

1. ADR-AX-01: native stack (RN/Expo vs alternatives) with accessibility,
   lifecycle, gesture, and testing implications.
2. ADR-AX-02: package identity — rename `@xoroh/axis-core` → `@xoroh/axis`
   (preferred) or justify the split; un-`private` only via release checklist.
3. Adopt Xoroh scaffold→library profile on implementation: Biome+tsconfig+CI
   jobs, `AGENTS.md`, npm Dependabot, DTCG consumption contract with Kern.
4. Xoroh documents the proposed DTCG consumption contract for a future Axis ADR;
   no token-pipeline work is directed into Axis from this workstream, and no web
   implementation is transplanted without native justification.

---

## 15. Atlas charter, existing-state assessment, readiness criteria

**Charter (Recommended):** Atlas is the Xoroh documentation platform for
versioned guides, API references, searchable and accessible content, localized
where justified, with AI-friendly retrieval (`llms.txt`, metadata). Users:
project contributors, downstream consumers, and agents. Non-goals: replacing
per-project READMEs/CONTRIBUTING/API docs; becoming a dev dependency;
hosting private product docs.

**Existing-state assessment (Verified):** single scaffold commit; no framework,
no content, no packages, zero coupling to Kern/Axis/Xoroh. Nothing to migrate;
no replacement repo needed or permitted.

**Readiness gates (must all hold before integration/publication):**

- R1 repository identity + named maintainers confirmed ([APPROVAL]).
- R2 framework + content-model ADR merged (versioning, search, i18n need,
  AI surfaces, `packages/*` purpose).
- R3 minimum CI/security baseline (lint/typecheck/test, secret scanning,
  Dependabot when deps exist).
- R4 reproducible build + standalone developer docs.
- R5 versioning/compatibility policy + docs-migration strategy.
- R6 hosting/operations owner named for any hosted service.
- R7 human approval for first public release.

Until R1–R7 hold, Atlas remains an independently developed scaffold; no project
depends on it.

---

## 16. Private monorepo alignment

> Excluded repository: the below is optional future-adoption guidance only.
> Any implementation or adoption requires separate owner authorization; no
> access, inspection, or changes are performed under this plan.

Adoption matrix (Recommended, if ever authorized):

| Class | Examples | Handling |
|-------|----------|----------|
| Universally safe | SHA pinning, least-privilege tokens, frozen lockfiles, PR templates | Adopt directly |
| Shareable with config | Biome/tsc rules, Dependabot cadence, agent-safety core | Copy + repo-specific config |
| Public-only | Changesets public flow, npm provenance, ecosystem index | Do not adopt |
| Private-only | Tenant isolation, secrets mgmt, infra/deploy, customer data | Never enters public repos |
| Sensitive/prohibited | Credentials, infra topology, customer data | Blocked by leak gate |

Mechanism: pinned copies (see §9), validated in CI, rollback by re-pin.
Validation: Kern-style `check:xoroh-leaks` equivalent (no private imports
outside allowlist). No product redesign, no package publishing, no disclosure.

---

## 17. Dependency-aware phased roadmap

Ordering rationale: integrity (red CI, weak protection) before standards;
standards before adoption; decisions (names, stacks, framework) before code;
Kern migration undisturbed throughout (reconciliation gates MG-01–MG-03).

### Phase 0 — Stabilize (external proposals; separate authorization required)

These items edit the `xoroh/kern` repository and remote settings and are
therefore **not** performed in this (`xoroh/xoroh`-only) mission. They are
recorded here so a separately authorized task can execute them; no Xoroh-only
work in Phase 2 depends on them.

| ID | Objective | Evidence | Change | Depends | Acceptance + verification |
|----|-----------|----------|--------|---------|---------------------------|
| K-01 | Green `kern/main` (routeTree.gen typecheck) | Verified red run 38825478289 | Generate route tree before typecheck in CI (and document local `bun run generate`), or check in artifact policy | — (blocking) | `main` CI green: `gh run list -R xoroh/kern -b main --limit 3` all success; `bun run typecheck` pass in `apps/site` |
| K-02 | Required checks cover blocking jobs on `kern/main` | Verified: only `cold-install` required | Add `gates`, `dist-gates`, `pkg`, `apps` (and `e2e` when stable) to required checks [APPROVAL: settings change] | K-01 | API shows full check list; failing test job blocks a trial PR |
| K-03 | Resolve or merge open Kern PRs (#18–#20) | Verified open | Merge/fix Biome + Dependabot 7.x (verify v7 breaking changes first) | K-01 | PRs merged or closed with reason; `git log` records |
| X-01 | Decide Dependabot major bumps (checkout v7 etc.) | Verified: v4 pinned, v7 proposed | Owner approves major_action upgrades per repo after changelog review | — | Merged or deferred with dated note; trial-branch CI green before merging to a protected branch |

### Phase 1 — Foundational decisions ([APPROVAL] gates)

| ID | Objective | Change | Depends | Acceptance |
|----|-----------|--------|---------|------------|
| X-02 | Approval policy + release-team roster | Add ≥1 independent approver; `prevent_self_review`; keep HOLD until then | — | Team roster ≥2 or documented single-maintainer exception; env rules show it |
| X-03 | Code/security scanning posture | Enable secret scanning+push protection; CodeQL (or recorded alternative) per repo | — | API/dashboard shows enabled; exceptions in writing |
| X-04 | Branch strategy for axis/atlas (`main` creation) | Create `main` when first releasable; until then document `development`-as-default | — | Governance files state branch map |
| X-05 | Package identity: `@xoroh/axis` vs `@xoroh/axis-core` | ADR-AX-02 (prefer `@xoroh/axis`) | — | ADR merged; placeholder renamed or split justified |

### Phase 2 — Shared-standards core in Xoroh

| ID | Objective | Location | Depends | Acceptance + verification |
|----|-----------|----------|---------|---------------------------|
| X-06 | `AGENTS.md` core + prohibited-actions policy | `xoroh/AGENTS.md` | — (proceeds independently; X-02 remains the gate for releases only) | `test -f AGENTS.md`; agent trial run refuses mock publish without approval |
| X-07 | Starter CI conventions + consumer fixture harness (v1); callable reusable workflows only after fixture validation | `xoroh/.github/workflows/*`, `xoroh/fixtures/*` | X-06 | Starter conventions documented; fixture run green; no `workflow_call` interface published before a real consumer validates it. Status 2026-10-16: implemented in working copy (uncommitted, unreviewed); see `fixtures/min-consumer/` + `docs/audit/RECONCILIATION.md` appendix |
| X-08 | Repo-type profiles + templates | `xoroh/docs/standards/*`, `xoroh/template-*` or `docs/templates/*` | X-06 | New-repo trial from template passes CI in <15 min |
| X-09 | `release-prep` skill v1 | `xoroh/.agents/skills/release-prep/` | X-06 | Dry-run on Kern produces manifest, stops pre-publish |
| X-10 | Project index + metadata schema (public repos only; excluded private repo is not listed) | `xoroh/projects.json` (+ generated page later) | X-08 | `bun run check:index` validates; all 4 public projects listed, unknowns `tbd-owner-input` |
| X-11 | Standards versioning + changelog | `xoroh/docs/standards/CHANGELOG.md`, `STANDARDS-v*` tags | X-07–X-10 | Tag + migration notes; consumer re-pin trial works |

### Phase 3 — Adoption (non-disruptive)

| ID | Objective | Depends | Acceptance |
|----|-----------|---------|------------|
| K-04 | Kern adopts `AGENTS.md` core pointer + `release-prep` (domain skills stay) | X-09, K-01 | Kern `AGENTS.md` references pinned Xoroh core; release flow unchanged without migration-team sign-off (MG-01) |
| A-01 | Axis stack ADR + scaffold→library graduation | X-05, X-08 | ADR merged; Biome/tsc/CI/npm-Dependabot land with stack |
| A-02 | Axis DTCG consumption contract with Kern | A-01, MG-02 | Contract ADR; Axis reads `tokens.json`/`dtcg.json` via versioned path; no renderer imports |
| T-01 | Atlas framework + content-model ADR | X-08 | R2 merged; toolchain + Dependabot follow |
| T-02 | Atlas R3–R7 readiness track | T-01 | Gates R1–R7 evidenced before any integration |
| P-01 | Private monorepo selective adoption (§16 matrix) — SEPARATELY AUTHORIZED ONLY | X-07, X-09 + explicit owner authorization for any private-repo access | No access performed under this plan; if authorized later: pinned copies land; leak gate green; zero private disclosure |

### Phase 4 — Validate + operate

| ID | Objective | Depends | Acceptance |
|----|-----------|---------|------------|
| X-12 | Ecosystem baseline validation (all O1–O9 re-measured) | All above | Audit rerun; 14-day green; report filed |
| X-13 | Ongoing ownership calendar (standards review cadence, index upkeep, ADR process) | X-12 | `docs/GOVERNANCE.md` maintenance section merged |

Critical blockers: K-01, K-02, X-02. Everything else sequences behind them.

---

## 18. Task-level acceptance criteria and verification commands

Per-task criteria live in §17. Universal verification commands:

```bash
# identity + cleanliness
git status --short --branch && git rev-parse HEAD
# CI health (per repo)
gh run list -R xoroh/<repo> --limit 10
gh run view <run-id> -R xoroh/<repo> --log-failed
# protection / settings (read-only)
gh api repos/xoroh/<repo>/branches/<branch>/protection
gh api repos/xoroh/<repo>/actions/permissions
gh api repos/xoroh/<repo>/actions/permissions/workflow
gh api repos/xoroh/<repo>/environments
# releases / tags / packages
gh release list -R xoroh/<repo>; gh api repos/xoroh/<repo>/tags
npm view @xoroh/<pkg>  # expect 404 until first approved publish
# supply chain
gh api repos/xoroh/<repo>/dependabot/alerts --jq length
bun install --frozen-lockfile && bun test
npm pack --dry-run  # in package dir; inspect files, never publish
```

---

## 19. Risks and mitigations

| Risk | Likelihood / impact | Mitigation |
|------|--------------------|------------|
| Red `main` normalizes failing CI | High / high | K-01+K-02 immediately; required-check coverage rule in standards |
| Single-approver release ships bad/compromised package | Med / high | HOLD until X-02; env gating; provenance; `npm pack` inspection |
| Dependabot major (Actions v7) breaks CI | Med / med | X-01 review changelogs; pin SHA+comment; test on trial branch |
| Standards diverge across repos (silent copies) | Med / med | Checksum manifest + versioned tags; index check in CI |
| Kern migration conflicts with shared standards | Med / high | MG gates (§25); no Kern edits from this workstream; adoption only by agreement |
| Axis picks stack incompatible with Kern tokens | Low / med | DTCG-first contract (A-02); adapter layer, not renderer sharing |
| Atlas becomes premature dependency | Low / med | R-gates (§15); standalone-docs rule (§6) |
| Secret/credential leak via agent or template | Low / high | Prohibited-actions policy; push protection; leak gates; no credential in templates |
| Scope creep: Xoroh absorbs product code | Low / high | Non-goals (§5) enforced in review checklist |

---

## 20. Architecture decisions and proposed ADRs

| ADR | Question | Recommended direction | Status |
|-----|----------|----------------------|--------|
| ADR-X-01 | Standards distribution mechanism | Hybrid by artifact type (§9) | Proposed in this plan |
| ADR-X-02 | Release approval policy | Proportional approvals + HOLD until roster fixed | Proposed, [APPROVAL] |
| ADR-KA-01 | DTCG as token interop baseline | Yes for Kern↔Axis; Axis owns no token system | Proposed; confirm in MG-02 |
| ADR-AX-01 | Axis native stack | Undecided — decision required before primitives | Open, owner+maintainer input |
| ADR-AX-02 | Axis package identity | Prefer `@xoroh/axis` | Open, [APPROVAL] |
| ADR-AT-01 | Atlas framework + content model | Undecided — Next/Fumadocs vs Astro/Starlight vs alternatives | Open, maintainer input |
| ADR-P-01 | Private adoption mechanism, if ever authorized | Pinned sanitized copies + leak gate | Proposed as optional guidance only; any work needs separate authorization |

ADR template and numbering live under `xoroh/docs/adr/` (to be created in X-08).

---

## 21. Open questions and required human approvals

1. [APPROVAL] Release-team roster: add ≥1 approver or record single-maintainer exception with HOLD conditions? (X-02)
2. [APPROVAL] Required-check expansion on `kern/main` and approval-count policy. (K-02, X-02)
3. [APPROVAL] Standards distribution model (§9) and standards SemVer policy.
4. [APPROVAL] Axis package name (`@xoroh/axis` vs split). (X-05/ADR-AX-02)
5. [APPROVAL] Axis stack + Atlas framework choices (need maintainer recommendations first).
6. [APPROVAL] CodeQL vs alternative; secret/push-protection exceptions if any. (X-03)
7. [APPROVAL] Kern first-publish (`0.1.0`) timing + Trusted Publishing setup (re-verify npm docs at execution).
8. [APPROVAL] Atlas integration timing (R-gates) and hosting owner.
9. Confirm maintainer rosters for Axis/Atlas and teams beyond `release`.
10. Authorize the Kern–Axis migration workstream's BLOCKED plan separately (not this plan's scope).

---

## 22. Deferred decisions and explicit non-goals

Deferred: monorepo-vs-polyrepo changes; custom versioning platform; coverage
percentages; visual-regression investment; i18n scope for Atlas; npm org-role
changes; any private-product architecture. Non-goals: see §5 + no
implementation, publishing, deployment, merges, settings changes, or
destructive Git actions under this mission (all prohibited; none performed).

---

## 23. Definition of done for Xoroh

- `AGENTS.md`, `docs/standards/*` (Level 1 + profiles), starter CI conventions,
  templates, `release-prep` skill, `projects.json` index, and standards
  changelog all merged via reviewed PRs on green CI. `STANDARDS-v*` tag
  creation is deferred until separately authorized; versioning proceeds via the
  changelog until then.
- This plan's [APPROVAL] items decided and recorded (ADRs or dated notes).
- No product code, no runtime exports, `private:true` retained.

## 24. Definition of done for the shared baseline

- O1–O9 (§2) evidenced: 14-day green branches, approval policy effective,
  scans enabled (or exceptions), Dependabot coverage where deps exist,
  agents operating under safe defaults, Kern either published-with-provenance
  or explicitly held, Axis/Atlas decisions recorded, private-repo guidance
  published with no access performed.
- Follow-up audit re-measures every criterion; report filed in Xoroh.

---

## 25. Cross-project reconciliation checklist

Status key: ✅ verified · ◐ compatible (no conflict observed) · ✖ conflicting ·
❓ unresolved · 🔒 requires approval. Nothing in the migration plan was modified.

| # | Item | Status | Notes / implication |
|---|------|--------|---------------------|
| MG-01 | Existing worktree changes + implementation plans preserved | ✅ | Kern `docs/planning/*`, `docs/plan/*`, ~70 changesets untouched; no edits made |
| MG-02 | Shared package naming (`@xoroh/*` scope) | ◐/🔒 | Kern names in use, unpublished; Axis placeholder conflicts (`axis-core` vs `axis`) → ADR-AX-02 |
| MG-03 | Package ownership/scope (npm org) | ✅ | Org exists, owner confirmed, zero published — clean slate |
| MG-04 | DTCG interop boundaries | ◐ | Kern DTCG (ADR-006) exists; Axis has nothing yet — contract ADR later, no conflict today |
| MG-05 | Shared vs project-owned tokens/contracts/primitives | ✅ | Kern owns tokens/primitives/contracts; Xoroh must not duplicate |
| MG-06 | Native-mobile vs web responsibilities | ❓ | Kern renderers defined; Axis stack undecided — cannot reconcile until ADR-AX-01 |
| MG-07 | Shared agent instructions + skill distribution | ◐ | Kern skills exist; Xoroh core must compose, not replace (K-04 gated on agreement) |
| MG-08 | Repo-specific CI/quality gates | ✖→task | Kern's required-check gap (K-02) must be fixed regardless of migration |
| MG-09 | Release/versioning compatibility | ◐ | Both use changesets; Kern `baseBranch:main`, Axis/Atlas `development` — document, no change now |
| MG-10 | Package publication readiness | ❓ | Kern code-ready/founder-held; Axis/Atlas unpublishable scaffolds — track per §13 |
| MG-11 | Documentation ownership vs Atlas | ◐ | Kern standalone docs stay; Atlas integration only after R-gates |
| MG-12 | Dependency ordering / migration blockers | 🔒 | Migration self-reports BLOCKED until owner authorization — independent decision, recorded not resolved |
| MG-13 | Decisions needing consistent approval | 🔒 | §21 items affecting both plans must be approved once, referenced twice |

---

## 26. Ongoing ownership, maintenance, and governance

- Standards review cadence: quarterly (or on incident); sunset policy per §9.
- Index upkeep: each project PR touching metadata updates `projects.json`;
  Xoroh CI validates schema.
- ADR process: propose in Xoroh (or project repo for project-scoped ADRs),
  numbered, with status (proposed/accepted/superseded) and date.
- Maintainer hygiene: annual access/team review; release-team roster never
  silently single-member.
- Audit cadence: annual lightweight re-audit of §§3–4 facts; full re-plan only
  on architecture change.

---

*Planning changes in this working copy: none committed. See final mission
report (§21 of mission brief: worktree preservation) for exact status.*
