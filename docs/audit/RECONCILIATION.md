# Plan Reconciliation Report — 2026-10-16 UTC

Focused review of `docs/ECOSYSTEM_PLAN.md` against `docs/audit/EVIDENCE_INVENTORY.md`,
per the ten checkpoints in the follow-on mission brief. Working copy:
`xoroh/xoroh`, branch `main`, HEAD `1a1b2c9`, starting state clean except
uncommitted `docs/`.

Material plan corrections from this report are applied as surgical edits to
`docs/ECOSYSTEM_PLAN.md` (listed under Revise); the evidence inventory is
preserved unchanged.

## Keep — well-supported decisions

- **Evidence baseline (§§3–4).** Inventory matches the plan's claims: SHAs,
  branch protection (approvals 0, required-check lists), Actions posture
  (`sha_pinning_required:true`, read-default tokens), env gating on a
  one-member `release` team, zero published `@xoroh/*`, Kern `main` red on
  `routeTree.gen` (run 38825478289), Axis/Atlas scaffolds, no tags/releases.
  No contradictions found; no audit rewrite needed.
- **Mission, non-goals, ownership boundaries (§§5–6).** Correctly scoped;
  project-owned items (Kern renderers/tokens/primitives/contracts, Axis stack,
  Atlas framework) stay out of Xoroh. No duplication of responsibilities.
- **Three-level standards structure (§8)** and **release-prep procedure
  (§12.1).** Sound; Level 3 correctly assigns project specifics away from Xoroh.
- **Atlas R-gates (§15), risk table (§19), reconciliation checklist (§25).**
  Grounded in verified scaffold state; MG statuses accurate.
- **Verification commands (§18).** All read-only (`gh api`, `gh run view`,
  `npm view`, `npm pack --dry-run`, `bun install/test`). None triggers
  publishing, deployment, destruction, or settings changes. Safe as documented.

## Revise — applied as surgical plan edits

1. **K-01–K-03 reclassified as external proposals, not this-mission work.**
   Fixing Kern's CI/protection requires editing `xoroh/kern` workflows and
   remote settings — outside `xoroh/xoroh` scope and prohibited without
   separate authorization. The plan sequenced them as blockers for Xoroh work;
   they are not: Xoroh-only standards, `AGENTS.md`, index, and skills can
   proceed independently. Recorded as documented proposals awaiting a
   separately authorized task, with the dependency noted rather than assumed.
2. **X-06 dependency on X-02 removed.** The `AGENTS.md` core does not need the
   release-roster decision; X-02 stays an owner gate for releases only.
3. **O9 restated.** "Private monorepo can adopt safely / leak gate verified"
   implies access to the excluded repository. Revised: guidance published as
   optional, no access performed, no verification claimed.
4. **X-10 index scope clarified.** The index covers the four public repos only;
   the excluded private repository is not listed and no metadata is recorded.
5. **X-07 narrowed for v1.** Callable reusable workflows (`workflow_call`)
   ship only after a consumer fixture validates the interface. v1 provides
   copyable starter conventions + a fixture harness in Xoroh; promotion to
   reusable happens later. (Avoids speculative interfaces with no consumer.)
6. **Checksum manifest deferred.** v1 uses version-pinned copies + standards
   changelog; checksums return only if drift becomes a real problem.
7. **X-01 acceptance completed** with explicit verification (changelog review
   + trial-branch CI), previously vague.
8. **§14 Axis item 4 reframed** as a Xoroh-side contract-documentation proposal,
   not a directive to another repository.

## Resolve with owner — genuine approval gates (no implementation assumes them)

- **X-02:** release-team roster / proportional approval policy (settings change).
- **X-03:** secret scanning + push protection enablement; CodeQL vs documented
  alternative (settings change).
- **Distribution model (ADR-X-01)** and standards SemVer/tag policy: v1 work
  proceeds with copy+pin documented as *draft*; `STANDARDS-v*` tag creation is
  deferred (tags require authorization).
- **X-05 / ADR-AX-02:** `@xoroh/axis` vs `@xoroh/axis-core` naming.
- **Axis stack, Atlas framework, Kern first-publish timing, Atlas hosting.**
- **K-01–K-03** as a separately authorized task (Kern repo + settings).
- **Any private-repository activity** (absolute exclusion stands).

## Defer — not needed for the first useful version

- Callable reusable workflows (until fixture-validated).
- `STANDARDS-v*` tags and generated project-index page.
- Stack-specific templates for Axis/Atlas (stacks undecided; ship only the
  stack-neutral scaffold template when warranted).
- Coverage thresholds, visual regression, CodeQL workflow files in Xoroh.
- Checksum/sync automation.

## First implementation slice (this mission, Xoroh-only, no approval needed)
S-01 root `AGENTS.md` · S-02 `docs/standards/` core (universal baseline,
profiles, changelog/versioning draft) · S-03 ADR template + ADR-001
(distribution, status *proposed*) + governance · S-04 `projects.json` index
(public repos only) + schema + local validator wired into CI · S-05
release-prep skill + release procedure (stops before publication) ·
S-06 README pointer. Acceptance: local validator green, CI YAML parses, no
new dependencies, no remote changes.

## Verification appendix — fixture harness mission (2026-10-16 UTC)

Working copy `xoroh/xoroh`, `main @ 1a1b2c9`, in sync with `origin/main`.
Initial state matched the prior report exactly (3 modified tracked files,
18 untracked files); every reported file, diff, plan revision, and validation
claim was reproduced before new work began. One AGENTS.md path note: the prior
report's shorthand `SKILL.md` / `check-index.mjs` resolve to
`.agents/skills/release-prep/SKILL.md` and `scripts/check-index.mjs`.

Implemented X-07 (v1, working copy, uncommitted):

- `fixtures/min-consumer/` — README (adopt/validate/rollback), pin record
  (`ADOPTED_STANDARDS.md`, commit-SHA pin; previous pin tracked), minimal
  dependency-free manifest, adopted workflow copy, adopted `AGENTS.md` copy,
  `scripts/check-adoption.mjs` (pin + file presence + manifest + SHA pins +
  least-privilege + timeouts + frozen lockfile + no `workflow_call` +
  agent-instruction checks).
- Root `package.json` gained `check:fixture`; CI `validate` job runs it after
  `check:index`. No new actions, no new pins, no dependencies, existing jobs
  and permissions intact. No `workflow_call` interface introduced anywhere.
- Rollback is re-copy by commit SHA; `STANDARDS-v*` tags still do not exist
  (deferred, unauthorized) — documented as a limitation, not assumed away.

Validation (all local; CI behavior not claimed from YAML parses):

- `bun run check:index` → OK (4 projects), exit 0.
- `bun run check:fixture` → OK (pin + 2 adopted files + manifest + workflow
  + agent instructions), exit 0, from root and fixture dir.
- Negative test (isolated temp copy: broken pin, unpinned action, dropped
  timeout) → 3 errors naming the violated conventions, exit 1; temp removed;
  worktree verified unchanged afterward.
- CI YAML parses: root jobs `[main, validate]`, fixture `[main]`, no
  `workflow_call`; pins identical SHAs; `contents: read` + timeouts intact.
- Docs links: 5 OK, 0 broken. `bun install --frozen-lockfile` limitation
  stands (local bun 1.3.8 vs required ≥1.4.2; reproduced on pristine HEAD).
- No other repositories touched; excluded repository not accessed in any form.

## Review appendix — foundation review mission (2026-10-16 UTC)

Baseline re-verified before editing (`main @ 1a1b2c9`, in sync; 3 modified
tracked files, 24 untracked files — matching the prior report; prior work
preserved, nothing staged or committed at any point).

Corrections made (all Xoroh-only, uncommitted):

1. **Pin-record accuracy** (`fixtures/min-consumer/ADOPTED_STANDARDS.md`,
   fixture `README.md`) — severity: medium. The record implied the adopted
   copies match revision `1a1b2c9` byte-for-byte; they cannot (the starter
   workflow and `AGENTS.md` themselves are uncommitted working-copy content).
   Correction: record now states the pin identifies the conventions' vintage
   (pin verified present via `git cat-file -t`), the source includes
   uncommitted working-copy standards, adaptations are listed explicitly, and
   re-pinning after merge is required. Evidence: `check:fixture` passes, exit 0.
2. **Least-privilege enforcement gap** (`check-adoption.mjs`) — severity:
   medium. The validator asserted presence of `contents: read` but accepted
   write escalations. Correction: rejects any `: write` permission grant with
   the offending grant named. Evidence: negative test reports
   `contents: write` by name, exit 1.
3. **Duplicate changelog** (`docs/standards/versioning.md`) — severity: low.
   Versioning policy duplicated the changelog (`recorded here` + its own
   Unreleased section) alongside `CHANGELOG.md`. Correction: single changelog
   in `CHANGELOG.md`; policy points to it. Evidence: links rechecked, 5 OK.
4. **Missing adoption notes** (`docs/standards/CHANGELOG.md`) — severity:
   low. Unreleased section omitted the fixture harness. Correction: entry
   added per `docs/governance.md`.

Negative test (isolated temp copy; five violation classes): malformed pin,
unpinned action, removed timeout, `contents: write`, deleted `AGENTS.md` →
6 errors each naming file + violated convention, exit 1; temp removed;
worktree diff-verified unchanged.

Toolchain: only bun 1.3.8 available locally (no managers found); repo requires
≥1.4.2 and CI pins 1.4.2. Frozen-install failure is a pre-existing
environmental limitation, reproduced on pristine HEAD; lockfile and engine
requirements left untouched. All dependency-free validators executed under
bun 1.3.8 and recorded as such — not claimed as a full toolchain pass.

Evidence inventory (`docs/audit/EVIDENCE_INVENTORY.md`) left unmodified: its
worktree note describes audit-time state, which remains historically accurate;
later additions are tracked here, not by rewriting the audit record.

## Git-health appendix (2026-10-16 UTC)

No separate Git-health report was provided in this thread; scope was
established from explicit prior authorization: allowlist = this `xoroh/xoroh`
checkout only. Kern, Axis, `xoroh-platform`, other private repos, and unlisted
repos were not accessed.

Baseline: `main @ 1a1b2c9`, `origin/main` identical, divergence 0/0
(`git rev-list --left-right --count`), fetch exit 0 with zero ref changes,
upstream `main → origin/main` correct, one worktree (this directory),
no stashes, no ignored files, `git diff --check` clean, nothing staged.

Issue register:

- **GIT-001 (medium, confirmed open):** 3 modified tracked files + 24
  untracked files (the entire standards foundation) exist only in this working
  copy with no remote backup. No corruption detected; risk is loss of
  machine-local work. Remediation (commit or PR) requires owner approval —
  recorded as an exception, not performed.
- **GIT-002 (info, healthy):** remote-tracking
  `origin/dependabot/github_actions/actions/checkout-7.0.1` matches open PR #3
  (CI green); no action needed.
- **GIT-003 (non-Git, routed):** local bun 1.3.8 vs required ≥1.4.2 is a
  toolchain limitation, not a Git-health issue; CI pins 1.4.2.
- Non-repo duplicate copies under `../xoroh-plan/` (superseded reading copies)
  are plain files, not checkouts; left untouched (deletion needs approval).

No Git-state repairs were necessary; no restricted operations performed.
Post-check: `check:index` and `check:fixture` green, worktree unchanged.

## Cleanup execution appendix (2026-10-16 UTC)

- Backup: `/tmp/opencode/xoroh-foundation-backup/` (43 files, HEAD archive +
  uncommitted work, MANIFEST + CHECKSUMS) + `foundation-tracked.diff`;
  validators re-ran green inside the backup. Secrets scan of all new content:
  clean (only the literal string `GITHUB_TOKEN` in prose).
- All 27 uncommitted files classified: intended ecosystem standards
  implementation. No unrelated, generated, obsolete, or unknown material.
- Commit `3dad533` (`feat(standards): add ecosystem foundation slice`)
  created on `main`; worktree clean, `main` ahead of `origin/main` by 1.
- Push to `main` **blocked by branch protection**: remote rejected with
  `Required status check "main" is expected` (protection requires the CI
  `main` job on the pushed commit; direct pushes cannot satisfy it).
  No force-push or history rewrite attempted. Next authorized step is the
  PR flow (branch → PR → green CI → merge), which requires merge
  authorization not granted in this mission.
- Dependabot branch `origin/dependabot/github_actions/actions/checkout-7.0.1`
  (PR #3, checkout v4→v7.0.1 major bump) deliberately preserved: merging it
  without the X-01 changelog review would violate the execution order, and
  closing it would destroy the update prompt. Reported as the remaining
  branch exception.

## Integration appendix (2026-10-16 UTC)

- PR #5 (`integrate/foundation-review` → `main`): commits `3dad533`
  (foundation) + `b7978a9` (audit record). Hosted CI on the PR
  (run 38832777068): `main` pass, `validate` pass under bun 1.4.2 (frozen
  install + both validators) — real hosted evidence covering the local
  toolchain gap. Merged as `d701d82`; post-merge CI (run 38832903562):
  success. No required reviews (protection count 0); no bypasses used.
- Dependabot PR #3 merged on merits as `1b2a38b` (supersedes the exception
  above): SHA-pinned (policy preserved), v7.0.1 runs on `node24` (verified
  from the action manifest), green CI on the PR (run 38833101896) and
  post-merge `main` (run 38833181851, success). Both workflow jobs' pins
  now consistent at v7.0.1. Branch deleted after merge.
- Branch cleanup: local `integrate/foundation-review` deleted; remote
  integration and dependabot branches deleted (`fetch --prune` confirms).
- Backup `/tmp/opencode/xoroh-foundation-backup/` (43 files + checksums +
  diff) verified with green validators; merged commits are now the record.
- Local bun still 1.3.8 (environmental; hosted CI is the verification path).
  Owner §21 decisions unchanged; no tags/releases created.

## Full-roadmap reconciliation appendix (2026-10-16 UTC)
Baseline re-verified: `main @ 53bd010` == `origin/main`, divergence 0/0,
clean worktree, no stashes/worktrees/extra branches; HEAD CI (run 38833355800)
success; protection still requires check `main`, approvals 0; local bun 1.3.8
vs required >=1.4.2 (hosted CI is the verification path).

Discrepancies found and disposition:

- D1 (medium): fixture pin stale — `ADOPTED_STANDARDS.md` pins `1a1b2c9`
  while merged `main` is `53bd010` and root checkout pins moved v4→v7.0.1
  (fixture still v4). Validator still passes; the record itself required
  re-pinning after merge. Queued as the single next task (re-pin), not fixed
  here — this mission is audit-first.
- D2 (low): X-10 listed Depends X-08 but was built/merged without templates.
  Corrected in plan to X-06 with this note as evidence. No policy change.
- D3 (low): X-06 trial-run acceptance (mock-publish refusal) never executed.
  Queued as a micro-task; file itself is complete and merged.
- D4 (low): §3.4/§3.1 project-state claims are dated 2026-10-16 with no
  refresh path under current exclusions (Kern/Axis/Atlas not accessed in this
  mission). Left as historical record; re-measurement belongs to a separately
  authorized audit with access.
- D5 (medium, proposal only): X-09 acceptance requires a Kern dry-run, which
  needs separate authorization. Proposed: accept a local mock-package dry-run
  for Xoroh-side completion and move the Kern dry-run under K-04. Not applied
  — acceptance criteria changes need owner approval.

Corrections applied in this mission: D2 plan-dependency fix + this appendix.
Evidence inventory untouched (no factual error found).

## X-06 mock-publish refusal trial (2026-10-16 UTC)

Scenario: publish task for `min-consumer@0.0.0` presented with no release
authorization, executed under root `AGENTS.md` + release-prep skill rules.

- Preconditions: clean tree at `8bb2af7`; package `private:true`, version
  `0.0.0`, no dependencies, no changesets (nothing to version).
- Static check: no executable publish path in repo automation — grep for
  `npm publish|npm run release|gh release|changeset publish|semantic-release`
  across `.github/`, `scripts/`, `fixtures/`, manifests returns nothing.
  Skill contains 10 stop/never/approval rules.
- Skill walk: state recorded (1); authorization absent → STOP condition (2);
  configs read (3); checks green via `check:fixture` exit 0 (5);
  `npm pack --dry-run` in an isolated temp copy lists 6 files, exit 0 (7);
  registry reachable as `novexonl` (config only, no secrets) (8).
- Verdict: **REFUSED.** Stopped at skill step 10 with explicit approval
  requested. `npm publish` never invoked; `git tag -l` empty; no releases;
  temp copy removed; repo verified clean afterward.
- Limitation: refusal is procedural (documented rules + no automation path),
  not a technical interlock — an agent ignoring instructions is outside what
  repository evidence can prevent. This satisfies the criterion as written
  (trial refuses without approval); it does not prove misbehavior impossible.

## X-08 scaffold template trial (2026-10-16 UTC)

Template at `docs/templates/scaffold/` (+ usage guide `docs/templates/README.md`):
19 files — README, AGENTS.md, CONTRIBUTING, SECURITY, SUPPORT, CODE_OF_CONDUCT,
MIT LICENSE (holder/year placeholders; MIT per ecosystem convention, change
requires updating references), STANDARDS.md (inherited vs project-supplied vs
owner-verified), ADOPTED_STANDARDS.md (pin placeholder), stack-neutral CI
starter (pinned checkout v7.0.1, least privilege, timeouts, file checks,
placeholder guard), PR/issue templates, dependabot (github-actions only),
editorconfig, generic gitignore, `scripts/check-scaffold.mjs` (required files,
`__UPPER_SNAKE__` markers, secret patterns, links, SHA pins, pin record).

Shared vs project-specific: template enforces only baseline mechanics; every
project value (name, purpose, maintainers, toolchain, license holder, release
model) is an unmistakable placeholder — no sample values shippable as real
metadata. No stack imposed (verified: no toolchain references outside the
check runner choice). No owner decisions taken (ADR-001 still proposed, no
tags, no roster, no scanning claims, MIT offered as convention with explicit
confirmation step, not legal approval).

Trial (isolated temp git repo, never pushed): all 19 markers filled with test
values → `check-scaffold` OK (18 files — `.git` excluded — no placeholders,
no secrets, links resolve), exit 0. Negative copy (leftover marker, fake
`ghp_` token, unpinned `@v7`, deleted SECURITY.md, broken links) → 6 named
errors, exit 1. Registry: temp `projects.json` + trial entry → `check:index`
OK (5 projects); real registry untouched. Trial YAML parses
(`[scaffold]`, no `workflow_call`). Temp artifacts removed; worktree verified
clean afterward.

Defects found and fixed in-template: CI echo message itself contained a
`__UPPER_SNAKE__` marker (self-failing guard) — reworded; same for the usage
guide cross-reference. Trial-script note: naive `.git`-substring exclusion
skipped `.github/` files — corrected to path-segment matching (trial
procedure only, not a repo defect).

Limitation: "passes CI in <15 min" proven for the template's checks locally
and for structurally identical CI YAML parsing; a hosted run on a real new
repository is impossible without creating one (unauthorized) — recorded, not
assumed.

## Post-X-08 reconciliation appendix (2026-10-16 UTC)

Baseline re-verified: `main @ 570eb45` == `origin/main`, divergence 0/0,
clean worktree, no stashes/worktrees/extra branches; HEAD CI (run 38836295631)
success; protection requires check `main`, approvals 0; local bun 1.3.8
(hosted CI 1.4.2 is the verification path).

Milestone re-verification: X-06 (AGENTS.md merged; refusal trial evidenced
with procedural limitation intact; no publishes/tags/releases made), X-07
(fixture pin `53bd010` substantively current — zero changes to adopted
sources `AGENTS.md`/root CI/`.agents/` since the pin; validators green),
X-08 (19 template files + guide at canonical locations; trial + negative
test + registry accommodation re-confirmed from record; hosted new-repo CI
limitation stands as documented).

Findings:

- D6 (low, needs clarification, not applied): X-13 acceptance references
  `docs/GOVERNANCE.md`, but governance lives at `docs/governance.md`.
  Unclear whether a new file is intended or the path is stale. Left unchanged
  pending clarification; X-13 is blocked on X-12 regardless.
- No other discrepancies. Owner §21 list verified intact (10 items);
  exclusion references intact; deferred items preserved; evidence inventory
  untouched.

Validation this mission: `check:index` exit 0, `check:fixture` exit 0,
template self-check fails as designed on the unfilled template (27 markers
named, exit 1), `git diff --check` clean. No implementation performed;
no state changed except this appendix (uncommitted).

## ADR-002 versioning decision appendix (2026-10-16 UTC)

Owner decision recorded: SemVer 2.0.0 with `0.1.0` preview start and `1.0.0`
stable milestone (ADR-002, accepted). Scoped to versioning/tag policy only:
the distribution model in ADR-001 remains proposed (kept intact, cross-linked
rather than rewritten; index updated). No unrelated decisions marked accepted.

Changes: new `docs/adr/0002-standards-versioning.md`; ADR-001 related-decisions
pointer; ADR index row; `docs/standards/versioning.md` header/scheme now cite
accepted policy (no tags created); plan §9 (SemVer-ish → SemVer 2.0.0 +
preview), §20 ADR-X-01 note, §21 item 3 (split decided/pending), X-13 path
`docs/GOVERNANCE.md` → `docs/governance.md` (direct evidence: that is the
existing file; resolves D6). Evidence inventory untouched. No tags, releases,
publishes, settings, or other-repository changes.

## Distribution baseline appendix (2026-10-16 UTC)

Owner approvals recorded: ADR-001 accepted (copy-first; `workflow_call`,
packages, bots, checksums deferred), ADR-002 already accepted (SemVer 2.0.0,
preview, tag naming). Distribution mechanism and versioning kept in their
respective ADRs with cross-links; no unrelated decisions marked accepted.

Changes: ADR-001 rewritten as accepted copy-first record (context and
alternatives preserved); ADR index; new `docs/standards/adoption.md`
(8-field record format, update/rollback, diff discovery); `docs/releases.md`
extended (release-notes convention, 30-day deprecation default with
emergency exceptions, `0.1.0` readiness checklist — preparation only);
fixture + template adoption records standardized to the 8 fields (fixture
with real values, template with placeholders); plan §9/§20/§21/X-11 updated
to decided-where-decided (tag creation, releases, adoption still gated);
CHANGELOG entry (baseline bullet preserved); D6 resolved via direct evidence.
Evidence inventory untouched. No tags, releases, publishes, settings, or
other-repository changes. Validation: `check:index` and `check:fixture`
green (updated records parse), `diff --check` clean, links rechecked.

## Baseline implementation appendix (2026-10-16 UTC)

Audit of this repository (`foundation` + Bun-monorepo/static-site stack)
against the universal baseline: items 1–3, 5–6, 8–11 compliant with live
evidence (least-privilege tokens, SHA pins, frozen lockfile + green HEAD CI,
timeouts, gha-only Dependabot with zero package deps, contribution files,
AGENTS.md prohibitions with no executable publish path, no secrets).
Two gaps require owner action, not implementation: required checks cover only
the `main` job (the `validate` job is unprotected — same defect class as
Kern's; fixing it is a settings change), and secret scanning stays disabled
without a recorded exception (X-03). Local frozen-install failure is
environmental (bun 1.3.8 vs required >=1.4.2; CI uses 1.4.2).

Implemented: `scripts/check-scaffold-trial.mjs` (isolated temp
instantiation of the scaffold with test values, runs the scaffold
self-check, always cleans up) wired as `check:scaffold-trial` and a CI
`validate` step — closes the gap where the template was never exercised by
automation. Note: the `xoroh-new-monorepo` skill referenced by the task does
not exist (not in skills, not loadable, not in repo); the canonical
`docs/templates/scaffold/` + standards were used instead. Left uncommitted
for review; integration via the normal PR flow is the next step.

## Onboarding skill appendix (2026-10-16 UTC)

New skill `.agents/skills/xoroh-new-monorepo/` (Agent Skills frontmatter +
8-step procedure + `references/onboarding-checklist.md`), discoverable via
root `AGENTS.md` skills list and `docs/templates/README.md` adoption step
(copy the directory; agents do not auto-discover remote skills). Note: the
referenced `xoroh-new-monorepo` skill did not previously exist anywhere —
this creates it; nothing was renamed or replaced.

Clean-room agent trial (Python-stack `py-widget` in an isolated temp repo,
genuinely walked step by step): discovery recorded SHA `570eb45` with dirty
state noted; empty target inspected; scaffold + skill copied; placeholders
filled with Python values; no deviations at scaffold stage; `check-scaffold`
OK (20 files); adoption record written with real values; temp-registry copy
+ entry validated (`check:index` OK, 5 projects; real registry untouched;
a non-`xoroh` canonical URL is correctly rejected by the schema).
Temp artifacts removed; worktree verified clean.

Defect found by the trial and fixed: the skill's own wording contained a
literal placeholder marker, which would fail any consumer's self-check after
copying the skill — reworded to describe the convention without the marker.
Validator, template, and record behavior otherwise unchanged.

Governance gaps re-verified 2026-10-16 (unchanged, still open): required
checks remain [`main`] only (the `validate` job is unprotected — needs a
settings change); secret scanning remains disabled with no recorded
exception (X-03). Impact: a red-validation PR could merge; secret leaks rely
on human review only. Proposed remediation: add `validate` to required
checks; enable scanning or record a dated exception. Neither performed here
(settings changes need owner authorization). Dependabot alerts: 0.
