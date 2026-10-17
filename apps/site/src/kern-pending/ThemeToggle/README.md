# Theme Toggle

- **Source:** `theme-toggle.tsx` in this site redesign; composes the vendored Kern `IconButton` with `useColorScheme`.
- **M3 references:** [Icon buttons](https://m3.material.io/components/icon-buttons/overview) and [dark and light color schemes](https://m3.material.io/styles/color/dark-and-light).
- **Intended Kern API:** a labeled `ThemeToggle` built from `IconButton` toggle semantics and the supported Kern theme hook.
- **Port notes:** replace inline sun/moon SVGs with the Kern icon package glyphs, wire to `useKernTheme`, and add component tests/docs. The accessible action label must describe the next mode.
