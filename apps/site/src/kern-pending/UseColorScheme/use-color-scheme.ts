// kern-pending: color-scheme hook.
//
// WHAT: app-level light/dark/system mode state for the hub.
// WHY NEEDED: Kern owns this behavior in `useKernTheme` / `applyKernTheme`
// (`@xoroh/kern`), but vendoring that module would pull the whole TS token
// pipeline (`@xoroh/kern-tokens` values, preset tables, motion schemes).
// This hook mirrors its *observable contract* against the vendored CSS:
// localStorage key `kern-tokens-mode`, `.dark` class on <html>, and
// `colorScheme` mirroring — so the hub can adopt Kern's hook later with no
// visible change.
// M3 SPEC: color roles + dark scheme —
// https://m3.material.io/styles/color/roles and
// https://m3.material.io/styles/color/dark-and-light
// TO PORT INTO KERN: nothing — delete this file and use `useKernTheme`
// once the hub consumes `@xoroh/kern` as a package. The localStorage key,
// class name, and system-default semantics already match.
import { useCallback, useEffect, useState } from "react";

export type ColorSchemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "kern-tokens-mode";

function systemIsDark(): boolean {
	return (
		typeof window !== "undefined" &&
		typeof window.matchMedia === "function" &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	);
}

function readStored(): ColorSchemeMode {
	if (typeof window === "undefined") return "system";
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (raw === "light" || raw === "dark" || raw === "system") return raw;
	} catch {
		// Private mode / blocked storage: fall through to system.
	}
	return "system";
}

function applyMode(mode: ColorSchemeMode): void {
	if (typeof document === "undefined") return;
	const dark = mode === "dark" || (mode === "system" && systemIsDark());
	document.documentElement.classList.toggle("dark", dark);
	document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

export function useColorScheme() {
	const [mode, setModeState] = useState<ColorSchemeMode>("system");
	const [resolved, setResolved] = useState<"light" | "dark">("light");

	useEffect(() => {
		const stored = readStored();
		setModeState(stored);
		applyMode(stored);
		setResolved(
			stored === "dark" || (stored === "system" && systemIsDark())
				? "dark"
				: "light",
		);
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => {
			const current = readStored();
			applyMode(current);
			setResolved(
				current === "dark" || (current === "system" && media.matches)
					? "dark"
					: "light",
			);
		};
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, []);

	const setMode = useCallback((next: ColorSchemeMode) => {
		setModeState(next);
		try {
			window.localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// Storage blocked: still apply for this session.
		}
		applyMode(next);
		setResolved(
			next === "dark" || (next === "system" && systemIsDark())
				? "dark"
				: "light",
		);
	}, []);

	const toggle = useCallback(() => {
		setMode(resolved === "dark" ? "light" : "dark");
	}, [resolved, setMode]);

	return { mode, resolved, setMode, toggle };
}

/** First-paint theme init. Inlined into <head> by __root__ so the stored or
 * OS mode applies before React hydrates (no light/dark flash). Mirrors the
 * contract above: `kern-tokens-mode` → `.dark` + `colorScheme`. */
export const COLOR_SCHEME_INIT = `(function(){try{var m=localStorage.getItem('${STORAGE_KEY}');var d=m==='dark'||(m!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;
