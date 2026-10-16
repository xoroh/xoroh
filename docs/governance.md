# Governance

## Owner

The Xoroh organization owners maintain these shared standards. Project
repositories keep their own maintainers; shared standards never override
project-owned architecture.

## Proposing a change

1. Open an issue or PR in `xoroh/xoroh` describing the problem, affected
   repositories, and the proposed standard.
2. Cross-project decisions require an ADR in `docs/adr/` (status `proposed`).
3. Land via reviewed PR on green CI. The PR updates `docs/standards/CHANGELOG.md`
   with adoption notes.

## Accepting and deprecating

- ADR acceptance, MAJOR standards versions, and tags require owner approval.
- Deprecations get a dated sunset notice in the changelog; removal happens no
  earlier than stated.

## Consumer adoption and rollback

Consumers copy a pinned standards version, run full CI, and record the pinned
version. Roll back by re-applying the previous pinned version and re-running
CI. Never adopt a MAJOR on a red branch.

## Maintenance cadence

- Quarterly standards review (or sooner on incident).
- Annual access/team review; the release-approver roster must never silently
  become single-member.
- The project index (`projects.json`) is updated by the PR that changes the
  underlying fact; CI validates the schema.
