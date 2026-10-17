// kern-pending: marketing top bar.
//
// WHAT: sticky site header for a marketing/docs hub — wordmark, primary
// nav, theme switch, and source link, collapsing to a disclosure menu on
// narrow screens.
// WHY NEEDED: Kern's app-shell header (`TopAppBar` in `@xoroh/kern/start`)
// is built for product screens (headline + actions, framework-wired); there
// is no marketing header with a flat nav-link row, responsive disclosure,
// and active-page indication. Composition here uses Kern color roles, the
// label-large type slot, 4dp/8dp shape, and state-layer hover — no new
// visual language.
// M3 SPEC: top app bar (small) —
// https://m3.material.io/components/top-app-bar/overview (scroll/contrast
// behavior adapted: sticky with a surface + outline hairline instead of
// scroll-fill); type scale —
// https://m3.material.io/styles/typography/type-scale; state layers —
// https://m3.material.io/styles/color/roles (`hover` 8% layer semantics).
// TO PORT INTO KERN: generalize the item list into props (`items`,
// `activePath`, trailing actions slot), move into `packages/kern/src/start/`
// alongside the app shell, wire `LinkProvider` instead of the router import,
// and add responsive + a11y (aria-current, disclosure, focus) tests.
import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "../../kern/cn";
import { ThemeToggle } from "../ThemeToggle/theme-toggle";

const NAV_ITEMS = [
	{ to: "/projects", label: "Projects" },
	{ to: "/maturity", label: "Maturity" },
	{ to: "/governance", label: "Governance" },
	{ to: "/contributing", label: "Contributing" },
	{ to: "/security", label: "Security" },
	{ to: "/brand", label: "Brand" },
	{ to: "/docs", label: "Docs" },
	{ to: "/news", label: "News" },
] as const;

const linkClass = (active: boolean) =>
	cn(
		"relative inline-flex min-h-11 items-center rounded-(--sys-shape-corner-small) px-3",
		"text-(length:--sys-typescale-label-large-font-size) leading-(--sys-typescale-label-large-line-height) font-(--sys-typescale-label-large-font-weight)",
		"text-(--sys-color-on-surface-variant) outline-none select-none",
		"transition-colors duration-150 hover:text-(--sys-color-on-surface)",
		"focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)",
		active && "text-(--sys-color-primary)",
	);

function GitHubIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.14c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
		</svg>
	);
}

export function TopBar() {
	const [open, setOpen] = useState(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	return (
		<header className="sticky top-0 z-50 border-b border-(--sys-color-outline-variant) bg-(--sys-color-surface)/90 backdrop-blur">
			<div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 sm:px-6">
				<Link
					to="/"
					className="mr-2 inline-flex min-h-11 items-center gap-2 rounded-(--sys-shape-corner-small) px-2 text-(length:--sys-typescale-title-large-font-size) leading-(--sys-typescale-title-large-line-height) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface) outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
				>
					<span
						aria-hidden="true"
						className="inline-flex size-7 items-center justify-center rounded-(--sys-shape-corner-small) bg-(--sys-color-primary) text-(length:--sys-typescale-title-medium-font-size) font-bold text-(--sys-color-on-primary)"
					>
						X
					</span>
					Xoroh
				</Link>

				<nav aria-label="Primary" className="hidden min-w-0 flex-1 lg:block">
					<ul className="flex items-center gap-0.5">
						{NAV_ITEMS.map((item) => {
							const active =
								pathname === item.to || pathname.startsWith(`${item.to}/`);
							return (
								<li key={item.to}>
									<Link
										to={item.to}
										aria-current={active ? "page" : undefined}
										className={linkClass(active)}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className="ml-auto flex items-center gap-1">
					<ThemeToggle />
					<a
						href="https://github.com/xoroh/xoroh"
						aria-label="Xoroh on GitHub"
						className="inline-flex size-10 items-center justify-center rounded-full text-(--sys-color-on-surface-variant) outline-none transition-colors hover:text-(--sys-color-on-surface) focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary) [&_svg]:size-6"
					>
						<GitHubIcon />
					</a>
					<button
						type="button"
						aria-expanded={open}
						aria-controls="hub-menu"
						onClick={() => setOpen((v) => !v)}
						className="inline-flex size-10 items-center justify-center rounded-full text-(--sys-color-on-surface-variant) outline-none hover:text-(--sys-color-on-surface) focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary) lg:hidden"
					>
						<span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							aria-hidden="true"
							className="size-6"
						>
							{open ? (
								<path d="M6 6l12 12M18 6 6 18" />
							) : (
								<path d="M4 7h16M4 12h16M4 17h16" />
							)}
						</svg>
					</button>
				</div>
			</div>

			{open ? (
				<nav
					id="hub-menu"
					aria-label="Primary"
					className="border-t border-(--sys-color-outline-variant) lg:hidden"
				>
					<ul className="mx-auto w-full max-w-6xl px-4 py-2 sm:px-6">
						{[{ to: "/", label: "Home" }, ...NAV_ITEMS].map((item) => {
							const active = pathname === item.to;
							return (
								<li key={item.to}>
									<Link
										to={item.to}
										aria-current={active ? "page" : undefined}
										onClick={() => setOpen(false)}
										className={cn(linkClass(active), "w-full")}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			) : null}
		</header>
	);
}
