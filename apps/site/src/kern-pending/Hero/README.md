# Hero

- **Source:** `hero.tsx` in this site redesign; currently composed from the vendored Kern `Button` and M3 token roles.
- **M3 references:** [Color roles](https://m3.material.io/styles/color/roles), [type scale](https://m3.material.io/styles/typography/type-scale), [elevation](https://m3.material.io/styles/elevation/overview), and [motion](https://m3.material.io/styles/motion/overview). M3 does not define a hero component; this is a marketing composition from those foundations.
- **Intended Kern API:** a site/marketing `Hero` accepting `eyebrow`, `title`, `lede`, `actions`, optional `art`, and an accessible heading id.
- **Port notes:** generalize the art slot, stack content responsively below 600px, and document the foundation-only rationale. Retain tonal-container roles and Kern button actions.
