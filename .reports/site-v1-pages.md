# xoroh.org v1 pages — work report

Date: 2026-10-16. Branch: `site/xoroh-org-v1` (worktree `xoroh-site-v1`),
stacked on `site/tanstack-start` (PR #14). One PR, no merges, no deploys,
no publishes, no DNS/secret changes. No aliases, shims, or deprecations added.

## Built (all driven by `projects.json` via `apps/site/src/data/projects.ts`)

- `/projects` — directory: Kern + Axis feature cards (target-maturity badges),
  full registry table (all four entries).
- `/projects/kern`, `/projects/axis` — detail pages: purpose, install snippet
  with "Available at release (0.1.0)" mark, registry package tables rendered
  with `project.packages.map` (no hardcoded lists), repo/branch/docs/support/
  runtimes/platforms/release-policy/security/ecosystem facts.
- `/maturity` — CNCF-style ladder Sandbox → Incubating → Graduated + Archived
  rule (O-3); seeding table Kern → Incubating, Axis → Sandbox, shown as
  targets, never earned stages.
- `/governance`, `/contributing`, `/security`, `/brand`, `/docs` — pointers
  to `docs/governance.md`, `CONTRIBUTING.md`, `SECURITY.md`, O-8 wordmark +
  naming/domain rules, and product-docs link-out (Kern → kern.xoroh.org,
  Axis → axis repo tree; no axis.xoroh.org in v1).
- Full `public/llms.txt` mapping all 11 routes + snippets + registry pointer.
- Shell nav in `__root.tsx`; home links the new IA; `search-index.json`
  extended to 19 entries (one per route path minimum, O-4).
- `scripts/check-site.mjs` + `site.test.ts` extended (registry wiring, banned
  strings across all routes, canonicals, llms.txt, index coverage); copy
  assertions are whitespace-normalized so Biome reflows can't break them.
- CI scaffold check lists the new files. `routeTree.gen.ts` regenerated.

## Registry fix

`projects.json` used the stale `@xoroh/kern-material-3`; updated to the
decided `@xoroh/kern-m3` (kern 010/020 hard cut, no compat name). Historical
evidence doc untouched. Target-maturity and Kern/Axis docs links stay as
explicit overlays in the data module (registry fields are `tbd-owner-input`),
cited to VISION.md / O-3 / hub plan — never presented as earned facts.

## Validation (all pass, 2026-10-16)

`check:index` OK · `check:site` ok · `bun test` 13 pass / 0 fail (270 expects) ·
`lint` clean (21 files) · `typecheck` exit 0 · `build:site` ok (one benign
tailwind sourcemap warning, same as #14) · `check:fixture` OK ·
`check:scaffold-trial` OK.

## Follow-ups (not this PR)

`deploy.yml` after the P0 DNS/secrets owner is named; Pagefind only past
~50 pages. Tokens: did not run out.
