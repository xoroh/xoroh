# Adopted standards record — __REPO_NAME__

- Canonical source repository: `https://github.com/xoroh/xoroh`.
- Standards tag: `__STANDARDS_TAG__` (or `none yet` before the first tag).
- Pinned Xoroh revision: `__XOROH_PIN__` (40-hex commit SHA of `xoroh/xoroh`
  `main` at adoption time; `STANDARDS-v*` tags do not exist yet).
- Previous pin: none (initial adoption; record the superseded SHA on update).
- Adoption date: `__ADOPTION_DATE__` (`YYYY-MM-DD`).
- Validation: `__VALIDATION_COMMAND_AND_RESULT__` (what was run, exit code).
- Adopted files (adapted copies; Xoroh is never a dependency):
  - `.github/workflows/ci.yml` (starter conventions)
  - `AGENTS.md` (agent scope, prohibitions, reporting)
  - `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CODE_OF_CONDUCT.md`
  - `.editorconfig`, `.gitignore`
- Rollback: re-copy the previous pin's versions of the files above, then
  re-run `node scripts/check-scaffold.mjs` and full CI. Record the restored
  pin here.
