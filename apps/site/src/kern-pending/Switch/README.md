# Switch

- **Source:** `switch.tsx` in the site redesign preview; not part of the current vendored Kern component set.
- **M3 reference:** [Switches](https://m3.material.io/components/switch/overview) and [color roles](https://m3.material.io/styles/color/roles).
- **Intended Kern API:** controlled `checked`, `onCheckedChange`, and required accessible `label`; expose checked state as `role="switch"` / `aria-checked` with M3 track/thumb states.
- **Port notes:** verify thumb and track dimensions, focus/disabled states, forced-colors, keyboard activation, and token roles against the Kern component checklist before porting. Used in the live homepage preview only.
