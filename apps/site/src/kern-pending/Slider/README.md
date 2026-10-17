# Slider

- **Source:** `slider.tsx` in the site redesign preview; not part of the current vendored Kern component set.
- **M3 reference:** [Sliders](https://m3.material.io/components/sliders/overview) and [color roles](https://m3.material.io/styles/color/roles).
- **Intended Kern API:** controlled numeric slider with `label`, `value`, `min`, `max`, and `onValueChange`; support discrete steps and optional value label.
- **Port notes:** this preview uses a semantic native range input with Kern token accent. Before porting, replace browser-dependent track/thumb styling with a tested M3 implementation and cover keyboard, pointer, touch, focus, disabled, and forced-colors behavior.
