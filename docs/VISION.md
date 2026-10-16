# Xoroh — Vision

The open-source hub of Xoroh. `xoroh/xoroh` is the contributor front door
and coordination home for Xoroh's open-source projects; it also contains
the source of the public hub site (`apps/site/`, published at
`https://xoroh.org` once the launch gate clears).

## What this repo is

- The canonical home for shared engineering standards, repository
  conventions, governance, reusable workflows, agent guidance, release
  engineering, and the project index (`projects.json`).
- The public site for the open-source hub: project directory entries,
  maturity snapshot, governance/contributing/security/brand pointers, and a
  single news stream. Product docs stay with their projects (Kern docs live
  on `kern.xoroh.org`; Axis docs live in its repo until Axis earns a site).

## What this repo is not

- Not a product: there is no product called "Xoroh OSS".
- Not commercial SaaS (that is `xoroh.com`), not apps (`xoroh.app`).
- Never a runtime or build-time dependency of Kern, Axis, or Atlas.
- Never absorbs project implementations or private product
  responsibilities.

## Projects

- **Kern** — the multi-design-system platform: "One foundation. Every
  design system." Material Design 3 is its first system. Target maturity at
  0.1.0: **Incubating**. Docs: `https://kern.xoroh.org`.
- **Axis** — unstyled, accessible behavior primitives for native, the
  counterpart of Base UI for React Native; usable with or without Kern.
  **Axis never depends on Kern.** Target maturity at 0.1.0: **Sandbox**.
  Docs: the `axis` repo docs tree (no `axis.xoroh.org` in v1).

## Launch gate

The hub goes live only with Kern and Axis 0.1.0, never before. See
`docs/decisions/launch-gate.md`. Until then, site changes land as
not-for-deploy PRs.

## Wordmark

Provisional plain-text wordmark ("Xoroh" as text). Legal name and wordmark
are not final; no lockup, no ™/® until legal finalizes.
