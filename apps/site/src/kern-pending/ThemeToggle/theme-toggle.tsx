// kern-pending: theme toggle (M3 icon button, sun/moon).
//
// WHAT: one-tap light/dark switch for the marketing header.
// WHY NEEDED: Kern ships the pieces (`IconButton` toggle + `useKernTheme`)
// but no composed, labeled theme switch a marketing header can drop in.
// Built here from the vendored Kern `IconButton` (toggle form, `label` +
// `selectedLabel` so the accessible name follows the state) and the
// pending `useColorScheme` hook.
// M3 SPEC: icon buttons — https://m3.material.io/components/icon-buttons/overview
// (toggle form reports state; the name must describe the action); dark
// scheme roles — https://m3.material.io/styles/color/dark-and-light
// TO PORT INTO KERN: move as-is into `packages/kern/src/components/`
// (imports become `../utils/cn`-relative again), rewire the hook prop to
// `useKernTheme`, and add the component test + docs entry per Kern's
// component checklist. Needs a sun/moon glyph decision from Kern's icon
// set (`@xoroh/kern-icons`) instead of the inline SVGs below.
import { IconButton } from "../../kern/icon-button";
import { useColorScheme } from "../UseColorScheme/use-color-scheme";

function SunIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
		</svg>
	);
}

function MoonIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
		</svg>
	);
}

export function ThemeToggle() {
	const { resolved, toggle } = useColorScheme();
	const dark = resolved === "dark";
	return (
		<IconButton
			variant="standard"
			toggle
			pressed={dark}
			onPressedChange={toggle}
			icon={dark ? <SunIcon /> : <MoonIcon />}
			label={dark ? "Switch to light mode" : "Switch to dark mode"}
			selectedLabel={dark ? "Switch to light mode" : "Switch to dark mode"}
		/>
	);
}
