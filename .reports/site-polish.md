# xoroh.org v1 design + a11y polish — work report

Date: 2026-10-16. Branch: `site/xoroh-org-polish`, stacked on
`site/xoroh-org-v1` (PR #15). NOT-FOR-DEPLOY: no merges, no deploys, no
publishes, no DNS/secret/Cloudflare changes. No aliases or shims added.
No `.team` changes. OSS tooling only (axe-core, Lighthouse CLI, linkinator,
all run locally against a production-build harness).

## Findings and fixes

1. **Detail pages rendered the wrong body (fixed).** `/projects/kern` and
   `/projects/axis` rendered the parent `/projects` directory (H1
   "Projects") because nested file routes (`projects.kern.tsx`) had no
   `<Outlet />` in the parent. Fixed with a pathless layout:
   `projects.tsx` → `projects.index.tsx` (directory, `createFileRoute("/projects/")`)
   plus new `projects.route.tsx` (bare `<Outlet />`, no head). Detail pages
   now render only their own content.
2. **Duplicate canonicals on detail pages (fixed).** TanStack Start appends
   `links` from every matched route (verified in
   `@tanstack/react-router` `buildTagsFromMatches`: meta dedupes by
   name/property, links concatenate). Parent + child canonicals both
   rendered, failing Lighthouse SEO (92). The pathless layout carries no
   head, so each page now emits exactly one `rel=canonical`.
3. **`/search-index.json` 404 in the built site (fixed).** `docs.tsx` and
   `llms.txt` link `/search-index.json`, but the file lived at
   `apps/site/search-index.json` (per O-4) and only `public/` files reach
   `dist/`. Fixed with a dependency-free `copySearchIndex` vite plugin
   that copies it to `dist/client/search-index.json` (source path per O-4
   unchanged). Verified 200 in `dist/client`.
4. **Broken Axis docs link + wrong registry branch (fixed).**
   `https://github.com/xoroh/axis/tree/development/docs` 404s: the
   `development` branch does not exist (verified via GitHub API; default
   branch is `main`, `main/docs` is 200). Updated to `tree/main/docs` in
   `src/data/projects.ts`, `index.tsx`, `docs.tsx`, `projects.axis.tsx`,
   and `public/llms.txt`; corrected `projects.json` axis
   `default_branch` to `main` (rendered in Axis Facts). Atlas has the same
   stale `development` value but is not rendered anywhere — left for
   owners (see open items).
5. **Design system (new).** `src/styles.css` rewritten around tokens:
   `--bg #0b0b0c`, `--text #f5f5f4` (18.0:1), `--accent #facc15` (12.9:1
   on bg), `--muted #d4d4d8` (~11:1) — all clear WCAG 2.2 AA. Fluid type
   scale (`clamp`), consistent article-card surface, `pre` horizontal
   scroll, `overflow-wrap: anywhere` on links (fixes 191px overflow on
   `/security` at 320px from advisory URLs), `:focus-visible` 3px accent
   outline, `prefers-reduced-motion` disables smooth scrolling/anim,
   44px minimum tap targets on header/footer nav and footer contact
   links. Inline prose links rely on the WCAG 2.2 inline exception (axe
   `target-size` clean).
6. **Shell a11y (new).** Skip link (first tab stop, verified keyboard:
   Tab → visible skip link → Enter moves focus to `main#main-content`),
   labelled primary nav as a wrapping `<ul>` with `aria-current="page"`,
   footer landmark with footer nav, shared footer on every route (home
   inline footer removed as a move-to-shell).
7. **SEO metadata.** Unique title + description per route, OG
   (`og:title/description/url/type`, `og:site_name`) and Twitter
   (`summary` card/title/description) tags, apex canonicals, `theme-color`,
   `public/robots.txt` (allow + apex sitemap), `public/sitemap.xml`
   (all 11 routes).
8. **Checks extended.** `scripts/check-site.mjs` + `site.test.ts` now assert
   shell landmarks, skip-link targets, per-route description/OG/Twitter/
   canonical, unique titles, robots/sitemap contents, and the vite
   search-index copy. CI scaffold list updated for the route rename.

## Lighthouse (mobile, local production build, full run 2026-10-16)

Target was 95+ in all four categories per route. Accessibility,
Best Practices, and SEO hit 100 on every route. Performance did not
reach 95 (see open items).

| route | perf | a11y | bp | seo |
|---|---:|---:|---:|---:|
| `/` | 82 | 100 | 100 | 100 |
| `/projects` | 90 | 100 | 100 | 100 |
| `/projects/kern` | 89 | 100 | 100 | 100 |
| `/projects/axis` | 87 | 100 | 100 | 100 |
| `/maturity` | 89 | 100 | 100 | 100 |
| `/governance` | 91 | 100 | 100 | 100 |
| `/contributing` | 85 | 100 | 100 | 100 |
| `/security` | 86 | 100 | 100 | 100 |
| `/brand` | 91 | 100 | 100 | 100 |
| `/docs` | 92 | 100 | 100 | 100 |
| `/news` | 91 | 100 | 100 | 100 |

Raw JSON: scratch audit dir (not committed). Spot re-runs of
`/projects/kern` (90/100/100/100) and `/projects/axis` (89/100/100/100)
confirm SEO 100 after the canonical fix.

## axe-core (WCAG 2.2 AA ruleset, Chromium, 2026-10-16)

**0 violations on all 11 routes** (16–17 passes each). `color-contrast`
reports `incomplete` (background determination) — verified manually:
body 18.0:1, accent 12.9:1, muted ~11:1, all pass AA for normal text.
Manual keyboard checks: skip-link first-stop/visible/focus-moving,
3px focus ring on nav links, `scroll-behavior: auto` under
`prefers-reduced-motion`. No `<img>` (nothing to alt-text), no form
inputs (nothing to label), heading order h1→h2→h3 intact, landmarks
(header/nav/main/footer) present.

## Responsive (320/375/768/1024/1440px, Chromium, 2026-10-16)

**0px horizontal overflow on all 11 routes at all 5 widths** after the
URL-wrap fix (before: 191px on `/security` at 320px). Nav wraps to
multiple rows at 320px, readable; `pre` blocks scroll internally;
tap targets ≥44px on header/footer navigation and footer contact links.

## Link checks (linkinator, recurse, local build + live externals)

66 links: 47 OK, 19 BROKEN — all 19 are status-0 connection failures to
`https://xoroh.org/*` (canonicals), `https://kern.xoroh.org`,
`https://xoroh.com`: none of these hosts resolve yet (not-for-deploy, no
DNS per hard rules). Correct-by-construction, verifiable only after
deploy. **Zero HTTP 4xx/5xx remain** (fixed the 4 axis-docs 404s).

## Validation (all green, 2026-10-16)

`check:index` OK · `check:site` ok · `bun test` 19 pass / 0 fail (411
expects) · `lint` clean (22 files) · `typecheck` exit 0 · `build:site` ok
(same benign tailwind sourcemap warning as the base branch).

## Left open

- **Performance < 95 on mobile emulation (82–92, run variance ±5).**
  Driver is framework hydration weight (~176 KiB flagged unused JS:
  React + router parsed under 4× Moto-G4 throttling → FCP ~2.7s),
  inherent to the TanStack Start SSR stack, not page-specific. No
  webfonts/images to trim; no architecture change attempted for a metric.
  Suggest revisiting on real-device traces or after route-level code
  splitting lands upstream.
- **Apex/subdomain links unverifiable until deploy** (`xoroh.org`,
  `kern.xoroh.org`, `xoroh.com` do not resolve; owner DNS task, out of
  scope).
- **Atlas `default_branch: development`** in `projects.json` matches the
  axis error pattern (repo default is `main`) but is not rendered
  anywhere on the site — left for owners to confirm/correct.
- Prose-link tap targets (~20px line boxes) rely on the WCAG 2.2 inline
  exception (axe `target-size` clean); only nav/footer links were
  upsized to 44px.
