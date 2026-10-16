# Launch gate: live only with Kern + Axis 0.1.0

Status: in force 2026-10-16 (director).

## Rule

The hub goes live only with Kern and Axis 0.1.0 — never before. A hub
advertising unreleased packages fails the near-Alpha bar.

## Gate criteria

- Kern 0.1.0: `kern/CHANGELOG.md` Unreleased → released, `.changeset/`
  drained, founder publish approval (`RELEASE_CHANGESSETS=true` +
  `npm-publish` approval per `kern/docs/releases.md`).
- Axis 0.1.0: same pattern per `axis/docs/RELEASING.md` ("ships alongside
  Kern 0.1.0").
- Hub `/news` + project entries updated with real versions and verified
  install outputs the same day; `CLOUDFLARE_*` secrets + `xoroh.org` DNS
  owner in place (P0).

## Consequence

Until the gate clears, every site PR is marked **not-for-deploy** and no
production deploy workflow runs from any branch.
