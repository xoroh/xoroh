# Consumer adoption records

How a project records which Xoroh standards it follows (ADR-001, copy-first).
Keep the record next to the adopted files and update it on every adoption or
rollback. No new tooling is required; the fixture validator and the scaffold
check verify the machine-checkable fields.

## Required fields

- Canonical source repository (normally `https://github.com/xoroh/xoroh`).
- Standards tag, when one exists (`STANDARDS-vX.Y.Z`).
- Exact source commit SHA (authoritative until tags exist, and recorded
  alongside the tag afterward).
- Adopted file and skill list (every copied path).
- Previous tag/SHA (or `none` for initial adoption).
- Adoption date (`YYYY-MM-DD`).
- Validation command and result (what was run, exit code, date).
- Migration notes or consumer-specific deviations and adaptations, if any.

## Updating and rolling back

To update: review the diff between the current pin and the proposed pin
(ordinary Git history plus the standards CHANGELOG migration notes), copy the
new files in a reviewed pull request, re-run validation, and record the new
pin with the previous pin preserved. To roll back: re-copy the previous pin's
files, re-run validation, and record the restored pin. Never adopt onto a
red branch.

## Discovering changes

Compare pins with `git log`/`git diff` in the canonical repository and read
the corresponding CHANGELOG entries. No update service is involved; the
consumer pulls intentionally.
