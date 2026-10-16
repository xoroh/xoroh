# Repository templates

## `scaffold/` — stack-neutral starting point for a new Xoroh repository

Copy the **contents** of `scaffold/` (not the directory itself) into the root
of a new repository, then follow `scaffold/STANDARDS.md` and the adoption
procedure below. The scaffold prescribes no language, framework, package
manager, or build system.

### Adopt

1. Copy all files (including dotfiles) into the new repository root.
2. Copy `.agents/skills/xoroh-new-monorepo/` into the new repository's
   `.agents/skills/` so the onboarding guidance travels with the project
   (or point the agent at the canonical path explicitly — agents do not
   auto-discover remote skills).
3. Create the repository's own small governing skill with a "Xoroh standards
   audit" entry point (pinned vs latest baseline, finding classes, read-only
   default), modeled on the `atlas` skill. Link to central audit procedures;
   do not copy them.
4. Fill every `__UPPER_SNAKE__` placeholder — project name, purpose,
   maintainers, contacts, toolchain, license holder. Leave none behind.
   (The scaffold check fails on any remaining marker.)
5. Confirm the license: the scaffold ships MIT text per ecosystem convention.
   If the project needs a different license, replace `LICENSE` and update
   every reference to MIT in these files; record the decision.
6. Record the Xoroh revision you adopted from in `ADOPTED_STANDARDS.md`
   (commit SHA; tags do not exist yet).
7. Run the scaffold check (Node 18+ or Bun):
   `node scripts/check-scaffold.mjs` (or `bun scripts/check-scaffold.mjs`).
   It fails on unresolved placeholders, missing files, and secret patterns.
8. Add the project's toolchain, build/test commands, and CI jobs for them.
9. Propose the new project for the ecosystem index: add an entry to Xoroh's
   `projects.json` via PR (unknown fields use `tbd-owner-input`); validate
   with `bun run check:index` in the Xoroh checkout.

### Conventions

- Placeholders use `__UPPER_SNAKE__` and are machine-checkable.
- The starter CI (`.github/workflows/ci.yml`) enforces only stack-neutral
  baseline items (pinned checkout, least privilege, timeouts, required files,
  no unresolved placeholders). Extend it with project jobs; never weaken it.
- Remote settings (branch protection, secret scanning, environments) cannot
  be templated — `STANDARDS.md` lists what the owner must verify.
