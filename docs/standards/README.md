# Shared Engineering Standards

Canonical source for Xoroh-wide conventions. Consumers adopt by copying pinned
versions (see `versioning.md`); this repository is never a runtime dependency.

## Structure

- `universal-baseline.md` — mandatory controls for every public repository.
- `repository-profiles.md` — additional standards per repository type.
- `versioning.md` — versioning policy for the standards themselves (draft).
- `CHANGELOG.md` — what changed and how to adopt it.

## Mandatory vs recommended

Each control is labeled:

- **[MUST]** — required; exceptions need a recorded, dated justification.
- **[SHOULD]** — strongly recommended; deviations need a brief reason in the
  adopting PR.
- **[MAY]** — optional; adopt when useful.

A label of [MUST] in this directory documents the requirement. It does not
claim the control is enabled anywhere: repository implementation (files, CI)
and remotely configured GitHub settings must each be verified separately —
see "Verify" in `universal-baseline.md`.
