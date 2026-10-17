# Use Color Scheme

- **Source:** `use-color-scheme.ts` in this site redesign; mirrors the existing `useKernTheme` observable behavior for first paint and client-side switching.
- **M3 references:** [Color roles](https://m3.material.io/styles/color/roles) and [dark and light color schemes](https://m3.material.io/styles/color/dark-and-light).
- **Intended Kern API:** no new API is intended. The site should consume Kern's existing `useKernTheme`/`applyKernTheme` behavior directly.
- **Port notes:** remove this local copy when the site consumes Kern as a package. Keep the `kern-tokens-mode` storage key, `.dark` class, system preference behavior, and no-flash initialization aligned with Kern until then.
