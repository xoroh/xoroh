# xoroh.org Redesign Report

## Outcome

Redesigned the hub using vendored Kern M3 components/tokens, responsive light/dark styling, route-specific project pages, SEO metadata, accessible shell, sitemap/robots/search index, and static prerendering. The UI is ready for review but **not for deployment**. The full Lighthouse run fails the required performance threshold; do not interpret this PR as meeting the performance acceptance criterion.

## PR

[PR #17 — Kern M3 redesign (NOT FOR DEPLOY)](https://github.com/xoroh/xoroh/pull/17), based on `site/xoroh-org-v1` / PR #15. It is pushed and open; it has not been merged or deployed. T3 `link_pull_request` returned `Authentication required`; thread registration is therefore unverified.

## Commands and Results

- `bun run build:site` — exit 0. TanStack prerendered 14 outputs: `/`, `/projects`, `/projects/kern`, `/projects/axis`, `/maturity`, `/governance`, `/contributing`, `/security`, `/brand`, `/docs`, `/news`, `/llms.txt`, `/projects/`, and `/search-index.json`. Vite emitted per-route JS chunks; the main client bundle is 394.88 kB raw / 125.84 kB gzip. Build emitted a circular-dependency warning (`replaceRouteChunk`) and a CSS sourcemap warning.
- `bun test` — 19 passed, 0 failed, 363 assertions.
- `bun run check:site` — `check:site: ok`.
- `bun run check:index` — `check:index OK (4 projects)`.
- `bun run check:fixture` — `check:adoption OK (pin + 2 adopted files + manifest + workflow + agent instructions)`.
- `bun run check:scaffold-trial` — `check:scaffold-trial OK (instantiated, placeholders filled, self-check passed, temp cleaned)`.
- `bun run lint` — `Checked 43 files ... No fixes applied.`
- `bun run typecheck` — `tsc --noEmit`, exit 0.
- `git diff --check` — exit 0.
- Playwright axe scan — 11 routes × light/dark, `0 violations`. Axe marked maturity color contrast incomplete in both themes because it could not determine one background; manually review that area in future audit.
- Playwright browser smoke — `22 route loads, 0 console/page errors; keyboard skip link passed` (Tab focuses “Skip to main content”; Enter focuses `#main-content`).
- Playwright visual capture — 44 screenshots; all route/theme/viewport checks passed, including status 200, theme state, one canonical, H1, and no horizontal overflow.
- `CHROME_PATH=/usr/bin/google-chrome bunx lighthouse ... --output=json --output-path=... --quiet --chrome-flags="--no-sandbox --headless=new"` — gzip-compressed local preview, full 11-page mobile sweep. Performance / Accessibility / Best Practices / SEO:

  | Page | Perf | A11y | BP | SEO |
  |---|---:|---:|---:|---:|
  | home | 71 | 100 | 100 | 100 |
  | projects | 73 | 98 | 100 | 100 |
  | projects-kern | 67 | 100 | 100 | 100 |
  | projects-axis | 68 | 100 | 100 | 100 |
  | maturity | 70 | 100 | 100 | 100 |
  | governance | 80 | 100 | 100 | 100 |
  | contributing | 73 | 100 | 100 | 100 |
  | security | 83 | 100 | 100 | 100 |
  | brand | 74 | 100 | 100 | 100 |
  | docs | 67 | 100 | 100 | 100 |
  | news | 67 | 100 | 100 | 100 |

  Full results: `apps/site/.reports/redesign/lighthouse-mobile.csv`. The preview served gzip (`content-encoding: gzip`, `vary: accept-encoding`). Prerendering and route splitting are verified, but measured performance is **67–83**, below the required 95. The host was highly contended during the sweep; high CPU activity from unrelated builds, tests, and headless browser tasks was observed. Do not treat contention as proof the code would score 95 at low load. A single quiet home run reached 97, but that does not establish the all-page threshold.
- Link check — `46 unique links; local 24/24 ok; external 18/21 ok; 1 mailto; 3 failures`. The three unavailable hosts are `xoroh.com`, `kern.xoroh.org`, and `xoroh.org`; DNS/launch work is out of scope. GitHub links returned HTTP 200.
- Cross-review by another lead — not obtained. T3 preview/delegation calls required authentication, and the PR-link call also returned `Authentication required`.

## Screenshots

All files are in `apps/site/.reports/redesign/screenshots/` with the exact pattern `<page>-<desktop|mobile>-<light|dark>.png`. Captured all 11 pages—`home`, `projects`, `projects-kern`, `projects-axis`, `maturity`, `governance`, `contributing`, `security`, `brand`, `docs`, `news`—at 1440px desktop and 390px mobile in both themes (44 images total). The visual review compared the result with m3.material.io, vercel.com, and base-ui.com; the editorial M3 treatment looked coherent and responsive, though more restrained than Vercel's visual density.

## Acceptance

- **Visible scope / routes preserved:** PASS — all v1 routes and their content remain represented; project detail pages are canonical and registry-driven.
- **Kern M3 dogfooding:** PASS — site components consume vendored Kern M3 system components/tokens; missing components are isolated below for Kern Lead review.
- **SEO and build artifacts:** PASS — per-route metadata/canonical, robots, sitemap, search index, static prerender, and route code splitting verified.
- **Accessible shell and keyboard:** PASS — axe found no violations; landmarks and skip navigation smoke-tested. Maturity color contrast remains axe-incomplete and warrants manual review.
- **Responsive visual checks:** PASS — every page captured in 4 viewport/theme combinations; smoke checks show no horizontal overflow.
- **Lighthouse >=95 on every page:** FAIL — full sweep measured performance 67–83 (other categories 98–100). Needs a low-load repeat and likely further performance work before acceptance.
- **All links resolve:** PARTIAL — local links 24/24; three unavailable Xoroh domains are pre-launch DNS dependencies.
- **Independent lead review:** FAIL / NOT OBTAINED — T3 authentication prevented orchestration and PR registration.
- **Not-for-deploy / no merge:** PASS — PR is marked NOT FOR DEPLOY in its title/body; no deploy or merge was performed.

## Still Weak

- Full Lighthouse performance remains materially below 95 even with prerendered routes, route splitting, and gzip compression. The evidence is contaminated by observed host contention; low-load reruns for `news` and `contributing` were not available in the handoff at verification time. Repeat the complete page sweep under quiet host conditions; only then decide whether additional optimization is needed.
- Main client entry remains 394.88 kB raw / 125.84 kB gzip despite lazy route chunks. Inspect shared imports and move non-critical shared modules out of the initial entry if measurements support it.
- Axe cannot automatically resolve the maturity-page contrast in two theme states; perform a manual WCAG contrast check.
- Build warnings for sourcemaps and TanStack route-chunk circular dependency remain.
- No independent lead review or confirmed T3 PR linkage.
- Xoroh custom-domain links cannot pass pre-launch DNS checks; keep launch/DNS out of this PR.

## Kern Gaps for Kern Lead

- `apps/site/src/kern-pending/Hero/README.md` — `Hero`: M3 expressive, responsive hero with headline/supporting text and action slots; source in adjacent `hero.tsx`; port into a Kern component using the system type scale and surface/color roles rather than site-local layout CSS.
- `apps/site/src/kern-pending/SiteFooter/README.md` — `SiteFooter`: responsive semantic footer with grouped navigation/contact actions and 44px minimum touch targets; source in adjacent `site-footer.tsx`; expose as a composable Kern layout component.
- `apps/site/src/kern-pending/ThemeToggle/README.md` — `ThemeToggle`: accessible M3 icon-button control for system/light/dark selection, focus and selected states; source in adjacent `theme-toggle.tsx`; implement with Kern IconButton and shared color-scheme state.
- `apps/site/src/kern-pending/TopBar/README.md` — `TopBar`: responsive M3 top app bar with title/navigation/action slots and mobile behavior; source in adjacent `top-bar.tsx`; port with Kern app-bar variants and responsive navigation APIs.
- `apps/site/src/kern-pending/UseColorScheme/README.md` — `UseColorScheme`: shared system-preference-aware color scheme state with persistence and SSR-safe initialization; source in adjacent `use-color-scheme.ts`; port as a Kern theme utility/API, not a visual component.

Each README includes source reference, M3 specification link, intended Kern API, and port notes.

## Suggested Next Item

Run the full Lighthouse sweep (especially `news` and `contributing`) in a quiet CI/browser environment, investigate the large shared client entry, and get a Kern/Axis lead visual review. Keep this PR explicitly not-for-deploy until every route reaches the performance bar and the review is complete.
