# Release Preparation Procedure

Staged, human-approved releases. This procedure prepares a release; it never
publishes one. Xoroh itself currently has nothing publishable (`private: true`,
no distributable artifacts) — this document governs consumer repositories and
any future Xoroh artifacts.

## Stages

1. **CI** — full test and quality gates green on the release branch.
2. **Version prep** — changesets (or equivalent) reviewed; changelog updated.
3. **Candidate validation** — build from a clean checkout; verify manifests,
   `exports`, entry points, and package contents (`npm pack --dry-run`,
   inspected, never published).
4. **Authorization** — explicit human approval recorded; release holds
   verified in place (never removed by automation).
5. **Publication** — human-executed, from an environment-gated step with
   Trusted Publishing (OIDC) where supported; provenance recorded.
6. **Post-release** — verify registry metadata, provenance, and installability;
   file a rollback/incident note.

## Rules

- Never bypass failing tests, remove holds, fabricate checks, or run
  destructive Git operations.
- Never commit credentials; verify authentication readiness without exposing
  secrets.
- Unpublished/private packages: validate `private: true` intent explicitly
  and skip publication stages on the record.
- For agent execution, see `.agents/skills/release-prep/SKILL.md`, which
  implements these stages and stops before stage 5.

## Standards release notes and migration convention

Each standards release entry (in `docs/standards/CHANGELOG.md`) identifies,
proportionally to its impact:

- Version and source commit.
- Summary of changes.
- Changed or added standards files.
- Consumer action required.
- Breaking changes, if any, with migration guidance.
- Rollback guidance (which previous pin to restore).
- For `0.x` releases: an explicit preview-phase compatibility warning —
  no `0.x` update is backward-compatible by default.

Trivial changes need only a brief entry; significant changes get full
migration notes. Consumers review the diff between pins via ordinary Git
history plus these entries.

## Deprecation policy

Ordinary standards deprecations carry a **30-day default notice** recorded in
the changelog with the affected files, recommended action, and migration or
mitigation guidance. This default may be revisited if adoption experience
shows it too strict or too permissive.

Expedited exceptions (document reason, scope, action, and guidance; preserve
review and owner authority for consequential calls):

- Security vulnerabilities or active exploitation.
- Legal or regulatory requirements demanding faster action.
- Documented critical operational risk that cannot reasonably wait 30 days.

The 30-day period governs deprecations, not urgent fixes or every standards
change.

## `0.1.0` preview readiness checklist

Manual, reviewable sequence for a future authorized first preview release
(preparation only — executing it needs separate authorization):

1. Confirm the exact file set included in the release.
2. Check the source tree and required validators (`check:index`,
   `check:fixture`, `diff --check`, link checks).
3. Review the changelog and migration notes (including the `0.x` warning).
4. Confirm consumer adoption records can identify the intended source
   (tag + SHA fields per `docs/standards/adoption.md`).
5. Verify the selected source commit is suitable (green CI, reviewed content).
6. Ensure required release approvals and acceptance criteria are satisfied.
7. Prepare the tag name `STANDARDS-v0.1.0` (do not create it here).
8. Identify a consumer validation trial (e.g. fixture re-pin) and its success
   criteria.
9. Record results and limitations honestly.
10. Prepare rollback instructions (restore previous pin; no tag deletion needed
    since none exists yet).
