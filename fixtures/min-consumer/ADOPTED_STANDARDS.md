# Adopted standards record — min-consumer fixture

- Canonical source repository: `https://github.com/xoroh/xoroh`.
- Standards tag: none yet (`STANDARDS-v*` tags do not exist; see ADR-002).
- Pinned Xoroh revision: `53bd0106ef33345ae76efde42eb9f098355829fe`
  (`main` at time of re-pin, verified present via `git cat-file -t`.
  `STANDARDS-v*` tags do not exist yet — pins are commit SHAs until tag
  creation is separately authorized).
- Previous pin: `1a1b2c998caf73c5023ff6ffa445d66a1ea716f6` (initial adoption).
- Source state: the pinned commit's merged standards (foundation integrated
  via PR #5). The pin identifies the conventions' vintage, not byte-identical
  files (adaptations below). Pin currency note: this record travels through
  the PR flow, so it names the baseline the re-pin was validated against, not
  the later merge commit. Re-pin again whenever adopted conventions change.
- Checkout pin alignment: fixture `actions/checkout` updated from the v4 SHA
  (`11d5960a…`) to the v7.0.1 SHA (`3d3c42e5…`), matching the merged root CI
  (PR #3) and the upstream `v7.0.1` tag object (verified via API). `setup-bun`
  pin unchanged (identical in both).
- Adopted files (adapted copies; Xoroh is never a dependency):
  - `.github/workflows/ci.yml` (starter conventions: pinned Actions,
    least-privilege permissions, frozen lockfile, timeouts)
  - `AGENTS.md` (agent scope, prohibitions, reporting)
- Deliberate adaptations from the pinned revision (not drift):
  - Workflow runs this fixture's `check:adoption` instead of Xoroh's own
    checks; job named `main` to match the starter shape.
  - `AGENTS.md` trimmed to fixture scope (no Xoroh skill paths); all
    prohibitions and reporting rules retained verbatim in intent.
- Rollback: re-copy the previous pin's versions of the files above, then
  re-run `bun run check:adoption` and full CI. Record the restored pin here.
- Adoption date: 2026-10-16. Validation: `bun run check:fixture` from the
  Xoroh root, exit 0 (plus hosted CI on the integrating PR).
