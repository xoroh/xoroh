# ADR-001: Standards distribution model

- Status: accepted
- Date: 2026-10-16
- Deciders: owner (explicit approval recorded 2026-10-16)

## Context

Xoroh must distribute standards to independently maintainable repositories
without becoming a runtime dependency or creating silent coupling
(see `docs/ECOSYSTEM_PLAN.md` §9).

## Decision

Standards are distributed through **versioned releases of the canonical Git
repository, consumed as pinned copies in consumer repositories** (copy-first).

### Canonical source

The single canonical source of Xoroh standards is the `xoroh/xoroh`
repository. There is no second standards repository, registry, package, or
distribution service. Consumers adopt through reviewed pull requests in their
own repositories: each project updates independently, validates in its own
environment, and reverts its pin if necessary. The process stays usable
without special tooling.

### Default distribution method

**Versioned copies with documented provenance.** Consumers copy the
applicable standards files and skill directories into their repositories,
recording the exact source version. Updates and rollbacks are ordinary
reviewed changes; no synchronization automation stands between the canonical
source and the consumer.

### Artifact-specific rules

1. **Static standards files:** versioned copies with documented provenance;
   adoption and update changes stay reviewable.
2. **Agent skills:** versioned copies of the applicable skill directories,
   preserving the source version.
3. **Policy documentation:** canonical Markdown in `xoroh/xoroh`. Consumers
   may copy required policies and link to canonical explanatory documentation.
4. **CI logic:** reusable `workflow_call` distribution stays deferred until a
   real consumer validates the interface, permissions, pinning, and
   compatibility requirements.
5. **Emergency corrections:** corrections land in the canonical source
   through the governed review process. A security or operational emergency
   may justify expedited handling, but never silently bypasses safeguards.
6. **Packages and registries:** no dedicated package or registry.
7. **Synchronization bots and automation:** deferred until real adoption pain
   justifies them.
8. **Checksum manifests and automation:** not mandatory for the first preview;
   revisit if integrity verification becomes necessary.

Explicitly rejected: Git submodules as default, silent sync bots, live
cross-repo imports, and any second "versioned template repository" — consumer
copies live in their respective repositories.

### Version identification

Consumer adoption records identify both the human-readable standards tag
(when one exists) and the exact canonical source commit SHA. The commit SHA
is authoritative for reproducibility; the tag names the intended release.
Before the first standards tag exists, consumers identify the source by exact
commit SHA. Never fabricate a tag or present an untracked commit as a
published release. Versioning rules live in ADR-002.

## Alternatives considered

1. Single distribution mechanism for everything — simpler to describe, but
   couples artifacts with different update/rollback needs.
2. Submodule-based sharing — familiar, but poor offline UX and rollback.

## Consequences

Consumers adopt explicitly through reviewed copies and roll back by
re-pinning; each project moves on its own schedule with no synchronization
overhead. Accepting this model authorizes the documented process only —
creating tags, publishing releases, and downstream adoption each need their
own authorization. The `workflow_call`, automation, and checksum rows stay
deferred until real adoption evidence justifies them.
