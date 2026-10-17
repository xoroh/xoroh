# Site Footer

- **Source:** `site-footer.tsx` in this site redesign; uses Kern tokens and TanStack Router links.
- **M3 references:** [Color roles](https://m3.material.io/styles/color/roles), [type scale](https://m3.material.io/styles/typography/type-scale). M3 has no marketing footer component; 44px links also follow [WCAG 2.2 target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- **Intended Kern API:** a marketing `SiteFooter` accepting `groups: { heading, links }[]`, brand/legal copy, and contact links.
- **Port notes:** move to the marketing/site package, keep footer landmark semantics, minimum 44px interactive targets, responsive columns, and token-based colors. Add landmark and target-size tests.
