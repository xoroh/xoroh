# Standards Versioning (draft — pending owner approval of ADR-001)

## Scheme

Shared standards are versioned `STANDARDS-vX.Y.Z`, recorded in `CHANGELOG.md`:

- **MAJOR** — a change that fails previously-passing consumers (new required
  check, renamed workflow input, stricter gate). Consumers must review the
  migration notes before adopting.
- **MINOR** — new backwards-compatible guidance (new profile, new SHOULD rule).
- **PATCH** — clarifications, examples, typo-level fixes.

## Adoption and rollback

Consumers pin a version (tag or commit SHA) when copying standards into their
repository. To adopt: read the CHANGELOG entry, apply the noted file changes,
run the repository's full CI. To roll back: re-apply the previous pinned
version and re-run CI. Never adopt a MAJOR on a red branch.

## Tags

No `STANDARDS-v*` tags are created until separately authorized. Until then,
the `Unreleased` section of `CHANGELOG.md` plus commit SHAs are the version
record.
