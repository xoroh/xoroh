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
