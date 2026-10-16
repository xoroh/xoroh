# min-consumer fixture

A minimal Bun workspace consumer used to validate Xoroh starter conventions
before any callable reusable workflow is published. It exercises the documented
**copy-based adoption** process: adopted files are copies, pinned to a Xoroh
commit, validated locally and in CI.

## Adopt

1. Read `ADOPTED_STANDARDS.md` for the pinned Xoroh revision.
2. Copy the listed files from that Xoroh revision into the consumer, applying
   only the adaptations documented in `ADOPTED_STANDARDS.md` (fixture scope;
   conventions unchanged).
3. Run `bun run check:adoption` from this directory (or `bun run check:fixture`
   from the Xoroh root).
4. Run the consumer's full CI.

## What is validated

`scripts/check-adoption.mjs` checks the adopted conventions, not Xoroh itself:

- A pin is recorded (`ADOPTED_STANDARDS.md` names a 40-hex Xoroh commit SHA
  and lists every adopted file).
- Every adopted file exists in the consumer.
- The consumer CI workflow pins third-party Actions by SHA, declares
  least-privilege `contents: read`, sets `timeout-minutes`, and installs with
  `bun install --frozen-lockfile`.
- The consumer `package.json` is `private: true` and adds no dependencies
  (this fixture stays dependency-free by design).

## Rollback

Re-copy the previously pinned revision's files over the adopted copies and
re-run `check:adoption` plus full CI. See `ADOPTED_STANDARDS.md` for the
previous pin. No tags are involved: `STANDARDS-v*` tags do not exist yet
(deferred until separately authorized), so pins are commit SHAs.
