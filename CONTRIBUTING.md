# Contributing to Xoroh

Contributions are welcome. For a substantial change, open an issue first so its scope can be discussed.

## Development

Requirements: Bun 1.4.2 or newer.

```sh
bun install --frozen-lockfile
```

Run the repository checks before opening a pull request:

```sh
bun run check:index
bun run check:fixture
bun run check:scaffold-trial
```

Pull requests run the same checks in the repository's CI workflow.

## Pull requests

- Branch from `main` and target pull requests at `main`.
- Keep changes focused and describe their impact.
- Update documentation when behavior or setup changes.
- Do not include secrets, credentials, or private user data.
- Preserve the repository's MIT license and any third-party notices.
