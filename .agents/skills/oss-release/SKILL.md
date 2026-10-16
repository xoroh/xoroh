---
name: oss-release
description: Run a reusable open-source release workflow (inspect, scope, validate, version, changelog, readiness, authorized publication, post-release verification). Use for any release task; preparing a release never publishes it.
---

# oss-release skill

Reusable release workflow for Xoroh OSS projects. Supports npm packages,
versioned sites, and other models — adapt the package-specific steps, keep
the authorization gates. Preparing a release is distinct from publishing it;
no step here authorizes publication. For Xoroh procedure details see
`docs/releases.md` and the `release-prep` skill.

## Workflow

1. **Inspect:** repo identity, branch, SHA, worktree state, remote sync.
2. **Scope:** changed files, affected artifacts, release type
   (package/site/other).
3. **Validate:** run the repository's full checks; record results.
4. **Version:** apply the versioning policy (SemVer where adopted);
   confirm the next version number explicitly.
5. **Changelog:** changesets / CHANGELOG / release notes reviewed and
   complete, proportionate to impact.
6. **Duplicate checks:** no existing tag, release, or published version
   collides (`git tag -l`, registry query — read-only).
7. **Content:** manifests, `exports`, entry points, packed files inspected
   (`npm pack --dry-run` or equivalent); no secrets.
8. **Readiness + authorization:** all gates green, holds verified in place,
   explicit human approval recorded for this exact version.
9. **Publication (only if separately requested and approved):** execute the
   authorized mechanism and nothing else.
10. **Post-release:** verify registry/site/tag, provenance where applicable,
    file rollback/incident notes, and write an evidence-based report.

## Rules

- Never bypass failing checks, remove holds, or fabricate results.
- Never publish, tag, or deploy without explicit approval for that action.
- Private/unpublishable artifacts: validate intent explicitly, skip
  publication stages on the record.
- Report every command, result, and the exact approval requested or received.
