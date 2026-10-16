# release-prep skill

Prepare a repository release and stop before publication. Implements
`docs/releases.md` for agent execution.

## Procedure

1. Record repository identity, branch, commit SHA, and worktree state
   (`git status --short --branch && git rev-parse HEAD`). Stop if the tree
   is dirty in ways the task did not authorize.
2. Confirm release authorization for this exact version and verify no HOLD
   flags or release-blocker labels. If authorization is absent or a hold
   exists, stop and report.
3. Read the repository's actual package and release configuration
   (`package.json` files, changesets, release workflows). Do not assume.
4. Identify versioning and changeset requirements; list pending changesets.
5. Run the repository-appropriate tests and quality gates. Record results.
6. Validate package contents, manifests, `exports`, and intended artifacts.
7. Run the build and `npm pack --dry-run`; inspect the file list.
8. Verify publication configuration and authentication readiness without
   exposing credentials (check config presence, never print secrets).
9. Summarize versions, artifacts, test results, risks, and unresolved issues
   in a release manifest.
10. **Stop. Require explicit human approval before publication or any other
    irreversible release action.**

## Prohibitions

- Never bypass failing tests or quality gates.
- Never remove release holds or dismiss blockers.
- Never fabricate successful checks or manifests.
- Never perform destructive Git operations.
- For packages not intended for publication, validate `private: true` and
  skip publication stages explicitly on the record.

## Reporting

Emit the manifest plus: every command run, validation outcomes, failures,
evidence gaps, and the exact approval being requested.
