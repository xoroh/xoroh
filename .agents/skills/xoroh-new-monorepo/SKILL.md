---
name: xoroh-new-monorepo
description: Onboard a new or existing monorepo onto the Xoroh engineering standards. Use when starting ecosystem work in an unfamiliar repository: discover standards, inspect the target stack, adapt the scaffold template, validate, and record adoption. Stops before releases, permission changes, or cross-repository actions.
---

# xoroh-new-monorepo skill

Bring a monorepo onto the Xoroh baseline without guessing. Link to canonical
standards; do not duplicate them here.

## 1. Discover the standards

From the canonical source (`https://github.com/xoroh/xoroh`), read in order:

1. `AGENTS.md` — scope, prohibitions, reporting rules. New repositories get
   the same minimal pattern: one-sentence description, mandatory pointer to
   their governing skill, critical rules, reporting requirements.
2. `.agents/skills/xoroh-repository/SKILL.md` — hub governance and skill
   router. Each consumer repository gets its own small governing skill;
   that skill must include a "Xoroh standards audit" entry point (pinned vs
   latest baseline, finding classes, read-only default) modeled on the
   `atlas` skill — never a full copy of central audit procedures.
   never copy the hub skill verbatim as one.
3. `docs/standards/README.md` — structure and MUST/SHOULD/MAY labels.
3. `docs/standards/universal-baseline.md` — mandatory controls.
4. `docs/standards/repository-profiles.md` — the profiles fitting the target.
5. `docs/standards/versioning.md` + `docs/adr/` — versioning and decisions.
6. `docs/standards/adoption.md` — adoption-record format.
7. `docs/templates/README.md` — scaffold adoption procedure.

Record the exact source commit SHA (`git rev-parse HEAD` in the Xoroh
checkout). If only a working copy is available, record its SHA and note it is
unreleased. Never invent a version or tag.

## 2. Inspect the target before proposing changes

Read-only first: stack, languages, package manager(s), architecture and
workspace layout, CI workflows and permissions, branch protection (via API
when authorized), dependency files and lockfiles, security posture (scanning,
secrets handling), and existing conventions (contribution docs, agent
instructions, ADRs). Record what exists; do not assume a toolchain.

## 3. Select and adapt templates

Copy from `docs/templates/scaffold/` only what fits; never blindly copy
unrelated project configuration (e.g. do not carry over another project's
toolchain, test commands, or deployment setup). Fill every placeholder
(double-underscore UPPER_SNAKE markers) with deliberate values. Confirm the license choice explicitly —
MIT text ships per ecosystem convention and any change must update every
license reference.

## 4. Bootstrap or reconcile

For a new repository: instantiate the scaffold, then add the project's
toolchain, build/test commands, and CI jobs. Classify every top-level
directory per `docs/standards/repository-structure.md` (`apps/` runnable,
`packages/` distributable, `libs/` internal shared) and introduce `libs/`
only for a genuine internal shared-library need. For release guidance use the
`oss-release` skill (procedure stops before publication). For an existing
repository: reconcile file by file against the baseline, keeping
project-specific architecture intact. Shared requirements stay; project
choices stay explicit.

## 5. Handle gaps and deviations

List missing requirements. Keep MUST rules mandatory; SHOULD deviations need
a brief recorded reason; MAY items are optional. Any deviation from a MUST
needs a dated, justified exception — never a silent skip.

## 6. Validate and report evidence

Run the applicable checks and report exact commands, exit codes, and output:

- Scaffold self-check (`node scripts/check-scaffold.mjs` or equivalent).
- Project validators and the repository's own test/build commands.
- Workflow YAML parsing and internal-link checks where applicable.
- A negative check (invalid input fails for the intended reason) when new
  validation is introduced.

Report failures, environmental limitations (e.g. toolchain newer than the
local runtime — use hosted CI as the authority), and anything unverified.
Never weaken a check to make it pass.

## 7. Record the adoption

Write `ADOPTED_STANDARDS.md` per `docs/standards/adoption.md`: canonical
source repo, tag if available, exact source SHA, adopted file list, previous
pin, date, validation command and result, migration notes and deviations.
If proposing the project for the ecosystem index, add the entry to Xoroh's
`projects.json` via PR (`tbd-owner-input` for unknowns) and validate it.

## 8. Respect authorization boundaries

Stop and request explicit authorization before: changing repository or
organization permissions/settings, branch protection, releases, tags,
publication, secrets handling, accessing other repositories, or any
irreversible operation. Unresolved owner decisions stay unresolved; record
them, do not decide them.

## Usage examples

- "Onboard this fresh checkout using the Xoroh scaffold" → steps 1–4, then 6–7.
- "Audit this monorepo against the Xoroh baseline" → steps 1–2, then 5–6,
  reporting gaps without changing files unless asked.
- "Reconcile this repo after the standards updated" → steps 1, 4 (diff current
  pin vs new pin), 6–7.

## Discovery and installation

- Discovery: referenced from the Xoroh root `AGENTS.md` skills list and from
  `docs/templates/README.md`; lives at `.agents/skills/xoroh-new-monorepo/`.
- Installation: copy that directory into the target repository's `.agents/skills/`
  (or read it from the canonical checkout). No agent auto-discovers remote
  skills — point the agent at the path explicitly.
- Supporting reference: `references/onboarding-checklist.md` (ordered steps).
