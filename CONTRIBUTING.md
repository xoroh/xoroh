# Contributing to Xoroh

Contributions are welcome. For a substantial change, open an issue first so its scope can be discussed.

## Development

Requirements: Bun 1.4.2 or newer.

```sh
bun install --frozen-lockfile
```

The current site is a starter scaffold and does not yet define test or build scripts. Pull requests run the repository's CI workflow, which checks the workspace install and required site files. Add focused tests and update this guide as project scripts are introduced.

## Pull requests

- Branch from `main` and target pull requests at `main`.
- Keep changes focused and describe their impact.
- Update documentation when behavior or setup changes.
- Do not include secrets, credentials, or private user data.
- Preserve the repository's Apache-2.0 license and existing notices.
