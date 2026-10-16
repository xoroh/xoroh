# Standards Changelog

See `versioning.md` for the versioning policy. Entries describe what changed
and how consumers adopt it.

## Unreleased

- Initial universal baseline, repository-type profiles, and versioning draft.
- Project index (`projects.json`) with schema and local validator.
- Release-prep skill and release procedure (human approval required; no tags
  or publishes created by this change).
- Consumer fixture (`fixtures/min-consumer/`) with adoption validator
  (`bun run check:fixture`), wired into the CI `validate` job. No new
  dependencies; no `workflow_call` interface.
