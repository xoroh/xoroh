# Adopted standards record — min-consumer fixture

- Pinned Xoroh revision: `1a1b2c998caf73c5023ff6ffa445d66a1ea716f6`
  (HEAD `main` at time of adoption, verified present in local history via
  `git cat-file -t`; `STANDARDS-v*` tags do not exist yet — pins are commit
  SHAs until tag creation is separately authorized).
- Source state: the pinned commit **plus uncommitted working-copy standards**
  (the starter conventions and `AGENTS.md` themselves are uncommitted). The
  pin therefore identifies the conventions' vintage, not byte-identical
  files. Re-pin after the standards merge.
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
