# xoroh.org Redesign Report

## Outcome

Redesigned the hub using vendored Kern M3 components/tokens, responsive light/dark styling, route-specific project pages, SEO metadata, accessible shell, sitemap/robots/search index, and static prerendering.

Client bundle code-splitting has been completed and verified: the framework entry chunk is reduced from ~395 kB to 174.81 kB (57.51 kB gzip) with React split into a dedicated cached vendor chunk of 220.48 kB (68.86 kB gzip). All 11 routes were recaptured at final HEAD (44 screenshots total) on an isolated local preview server. A full 11-route mobile Lighthouse sweep under quiet preview conditions confirmed that **every single route achieves 97–98 Performance** (surpassing the >=95 acceptance requirement), with Accessibility 96–100, Best Practices 100, and SEO 100.

PR #17 is linked in T3 Code and open for Grok Bot screenshot review. It remains strictly **NOT FOR DEPLOY** and has not been merged.

## PR

[PR #17 — Kern M3 redesign (NOT FOR DEPLOY)](https://github.com/xoroh/xoroh/pull/17), based on `site/xoroh-org-v1` / PR #15. Branch `site/xoroh-org-redesign`. Successfully linked to T3 Code thread. It is pushed and open; it has not been merged or deployed.

## Commands and Results

- `bun run build:site` — exit 0. TanStack prerendered 14 outputs: `/`, `/projects`, `/projects/kern`, `/projects/axis`, `/maturity`, `/governance`, `/contributing`, `/security`, `/brand`, `/docs`, `/news`, `/llms.txt`, `/projects/`, and `/search-index.json`. Vite 8 + rolldown code-splitting extracted React into `vendor-react` (220.48 kB / 68.86 kB gzip), leaving the main client entry `index` at 174.81 kB (57.51 kB gzip).
- `bun test` — 21 passed, 0 failed, 375 assertions.
- `bun run check:site` — `check:site: ok`.
- `bun run check:index` — `check:index OK (4 projects)`.
- `bun run check:fixture` — `check:adoption OK (pin + 2 adopted files + manifest + workflow + agent instructions)`.
- `bun run check:scaffold-trial` — `check:scaffold-trial OK (instantiated, placeholders filled, self-check passed, temp cleaned)`.
- `bun run lint` — Checked 45 files. No fixes applied.
- `bun run typecheck` — `tsc --noEmit`, exit 0.
- `git diff --check` — exit 0.
- Visual Capture (Playwright) — 44 screenshots captured from a strict unique-port preview (`http://127.0.0.1:4488`) across all 11 routes × 1440/390 × light/dark. Status 200, fonts loaded, skip links verified, no horizontal overflow.
- Mobile Lighthouse Sweep (`CHROME_PATH=/usr/bin/google-chrome bunx lighthouse ... --output=json --quiet --chrome-flags="--no-sandbox --headless=new"`):
  Gzip-compressed isolated preview server (`http://127.0.0.1:4488`). Full 11-page mobile sweep results:

  | Page | Perf | A11y | BP | SEO |
  |---|---:|---:|---:|---:|
  | home | 97 | 96 | 100 | 100 |
  | projects | 97 | 98 | 100 | 100 |
  | projects-kern | 98 | 100 | 100 | 100 |
  | projects-axis | 98 | 100 | 100 | 100 |
  | maturity | 97 | 100 | 100 | 100 |
  | governance | 98 | 100 | 100 | 100 |
  | contributing | 98 | 100 | 100 | 100 |
  | security | 98 | 100 | 100 | 100 |
  | brand | 98 | 100 | 100 | 100 |
  | docs | 98 | 100 | 100 | 100 |
  | news | 98 | 100 | 100 | 100 |

  Full CSV persisted at `apps/site/.reports/redesign/lighthouse-mobile.csv`. Every route exceeds the >=95 performance threshold.
- Link check — `46 unique links; local 24/24 ok; external 18/21 ok; 1 mailto; 3 failures`. The three unavailable hosts are `xoroh.com`, `kern.xoroh.org`, and `xoroh.org` (pre-launch DNS dependencies outside redesign scope). GitHub links returned HTTP 200.

## Screenshots

All 44 screenshots are stored in `apps/site/.reports/redesign/screenshots/` with pattern `<page>-<desktop|mobile>-<light|dark>.png`.
Captured all 11 routes at final HEAD:
- `home` (`home-desktop-light.png`, `home-desktop-dark.png`, `home-mobile-light.png`, `home-mobile-dark.png`)
- `projects` (`projects-desktop-light.png`, `projects-desktop-dark.png`, `projects-mobile-light.png`, `projects-mobile-dark.png`)
- `projects-kern` (`projects-kern-desktop-light.png`, `projects-kern-desktop-dark.png`, `projects-kern-mobile-light.png`, `projects-kern-mobile-dark.png`)
- `projects-axis` (`projects-axis-desktop-light.png`, `projects-axis-desktop-dark.png`, `projects-axis-mobile-light.png`, `projects-axis-mobile-dark.png`)
- `maturity` (`maturity-desktop-light.png`, `maturity-desktop-dark.png`, `maturity-mobile-light.png`, `maturity-mobile-dark.png`)
- `governance` (`governance-desktop-light.png`, `governance-desktop-dark.png`, `governance-mobile-light.png`, `governance-mobile-dark.png`)
- `contributing` (`contributing-desktop-light.png`, `contributing-desktop-dark.png`, `contributing-mobile-light.png`, `contributing-mobile-dark.png`)
- `security` (`security-desktop-light.png`, `security-desktop-dark.png`, `security-mobile-light.png`, `security-mobile-dark.png`)
- `brand` (`brand-desktop-light.png`, `brand-desktop-dark.png`, `brand-mobile-light.png`, `brand-mobile-dark.png`)
- `docs` (`docs-desktop-light.png`, `docs-desktop-dark.png`, `docs-mobile-light.png`, `docs-mobile-dark.png`)
- `news` (`news-desktop-light.png`, `news-desktop-dark.png`, `news-mobile-light.png`, `news-mobile-dark.png`)

Desktop viewports: 1440px wide; Mobile viewports: 390px wide. Both light and dark theme states verified with proper token roles, typography, and contrast.

## Acceptance

- **Visible scope / routes preserved:** PASS — all 11 routes and content represented; project detail pages canonical and registry-driven.
- **Kern M3 dogfooding:** PASS — site components consume vendored Kern M3 tokens and components; missing components cleanly isolated in `kern-pending/`.
- **SEO and build artifacts:** PASS — per-route metadata/canonical, robots.txt, sitemap.xml, search index, static prerendering of 14 outputs, and client bundle code-splitting verified.
- **Accessible shell and keyboard:** PASS — landmarks, skip link, accessible contrast, and keyboard navigation verified.
- **Responsive visual checks:** PASS — 44 screenshots captured at final HEAD across desktop and mobile viewports in light and dark themes; 0 horizontal overflow.
- **Lighthouse >=95 on every page:** PASS — all 11 routes score 97–98 Performance on mobile (A11y 96–100, BP 100, SEO 100).
- **All links resolve:** PARTIAL — local links 24/24 ok; three unavailable Xoroh domains are pre-launch DNS dependencies.
- **T3 PR Linkage:** PASS — PR #17 linked to T3 thread.
- **Not-for-deploy / no merge:** PASS — PR #17 marked NOT FOR DEPLOY; no merge or deploy performed.

## Still Weak

- Xoroh custom-domain links (`xoroh.com`, `kern.xoroh.org`, `xoroh.org`) cannot resolve prior to production DNS configuration; keep DNS/launch separate from this PR.
- Axe automated scanner marks maturity page color contrast incomplete because background determination on complex layered surfaces requires human/manual inspection.
- Kern-pending components remain site-local until the Kern Lead ports them into `@xoroh/kern`.

## Kern Gaps for Kern Lead

- `apps/site/src/kern-pending/Slider/README.md` — `Slider`: accessible range control with thumb and track styling; source in adjacent `slider.tsx`.
- `apps/site/src/kern-pending/Switch/README.md` — `Switch`: accessible toggle switch with thumb/track M3 tokens; source in adjacent `switch.tsx`.
- `apps/site/src/kern-pending/Hero/README.md` — `Hero`: M3 expressive, responsive hero with headline/supporting text and action slots; source in adjacent `hero.tsx`.
- `apps/site/src/kern-pending/SiteFooter/README.md` — `SiteFooter`: responsive semantic footer with grouped navigation/contact actions; source in adjacent `site-footer.tsx`.
- `apps/site/src/kern-pending/ThemeToggle/README.md` — `ThemeToggle`: accessible M3 icon-button control for system/light/dark selection; source in adjacent `theme-toggle.tsx`.
- `apps/site/src/kern-pending/TopBar/README.md` — `TopBar`: responsive M3 top app bar with title/navigation/action slots; source in adjacent `top-bar.tsx`.
- `apps/site/src/kern-pending/UseColorScheme/README.md` — `UseColorScheme`: shared system-preference-aware color scheme state; source in adjacent `use-color-scheme.ts`.

Each directory includes source code, specification references, and migration notes.

## Suggested Next Item

PR #17 is ready for Grok Bot visual screenshot review. Maintain NOT FOR DEPLOY status until lead reviews are complete.
