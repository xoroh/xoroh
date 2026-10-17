# Top Bar

- **Source:** `top-bar.tsx` in this site redesign; uses Kern `Button`/`IconButton` patterns and the theme toggle.
- **M3 references:** [Top app bar](https://m3.material.io/components/top-app-bar/overview), [navigation bar](https://m3.material.io/components/navigation-bar/overview), and [color roles](https://m3.material.io/styles/color/roles). This marketing navigation is responsive site chrome rather than an app-shell `TopAppBar` instance.
- **Intended Kern API:** a `SiteHeader` accepting `items`, `brand`, `actions`, and current-location state, with an accessible responsive navigation presentation.
- **Port notes:** generalize the item list and active-route API, preserve keyboard navigation, visible focus, and 44px targets, and test the compact/mobile layout.
