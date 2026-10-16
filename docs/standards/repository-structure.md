# Repository Structure

Standardized meanings for top-level monorepo directories. These define what
each directory means where present — no repository is required to contain
all three. Respect framework-required layouts and document justified
exceptions; do not reorganize files merely for uniformity.

- `apps/` — runnable applications and deployable services (sites, servers,
  CLIs users execute). Each app is independently runnable.
- `packages/` — packages intended for independent distribution (e.g. npm
  packages with their own name, version, and release policy). A private
  package designed for distribution belongs here.
- `libs/` — internal shared libraries with no independent external
  distribution contract, even when consumed by multiple applications.

Not standardized initially: `tests/`, `scripts/`, `templates/`, `examples/`.
Name and place those per project convention.

An agent applying this policy must read
`.agents/skills/repository-structure/SKILL.md` first.
