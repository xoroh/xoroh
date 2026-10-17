// kern-pending: marketing site footer.
//
// WHAT: full site footer — wordmark + license note, grouped nav columns,
// and contact row — rendering the single shared footer for every page.
// WHY NEEDED: Kern has no footer (`SidebarFooter` is an app-shell slot,
// not a marketing footer), so each property hand-rolls one. The geometry
// here is M3 foundations only: outline-variant hairline, label slots for
// headings, body slots for copy, 44px tap targets on every link (WCAG 2.2
// target-size), and the 3px secondary focus ring shared with Kern's
// `FOCUS_RING_CLASS`.
// M3 SPEC: no footer component exists; built from foundations — color
// roles https://m3.material.io/styles/color/roles, type scale
// https://m3.material.io/styles/typography/type-scale. Touch targets meet
// https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html.
// TO PORT INTO KERN: parameterize the columns (`groups: {heading,
// links}[]`), move next to the hero pattern in the marketing kit, and add
// tests for landmark roles + minimum target sizes.
import { Link } from "@tanstack/react-router";

const GROUPS = [
	{
		heading: "Explore",
		links: [
			{ to: "/projects", label: "Projects" },
			{ to: "/maturity", label: "Maturity" },
			{ to: "/docs", label: "Docs" },
			{ to: "/news", label: "News" },
		],
	},
	{
		heading: "Project",
		links: [
			{ to: "/governance", label: "Governance" },
			{ to: "/contributing", label: "Contributing" },
			{ to: "/security", label: "Security" },
			{ to: "/brand", label: "Brand" },
		],
	},
	{
		heading: "Network",
		links: [
			{
				href: "https://xoroh.com",
				label: "xoroh.com",
				detail: "Commercial SaaS",
			},
			{
				href: "https://xoroh.org",
				label: "xoroh.org",
				detail: "Open-source hub",
			},
			{
				href: "https://kern.xoroh.org",
				label: "kern.xoroh.org",
				detail: "Kern site",
			},
			{ label: "xoroh.app", detail: "Apps" },
			{ label: "xoroh.dev", detail: "On hold" },
		],
	},
] as const;

const footerLinkClass =
	"inline-flex min-h-11 items-center rounded-(--sys-shape-corner-small) px-2 -mx-2 text-(length:--sys-typescale-body-medium-font-size) leading-(--sys-typescale-body-medium-line-height) text-(--sys-color-on-surface-variant) outline-none transition-colors hover:text-(--sys-color-on-surface) focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)";

export function SiteFooter() {
	return (
		<footer className="mt-16 border-t border-(--sys-color-outline-variant) bg-(--sys-color-surface-container-lowest)">
			<div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] lg:px-8">
				<div>
					<p className="text-(length:--sys-typescale-title-large-font-size) leading-(--sys-typescale-title-large-line-height) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface)">
						Xoroh
					</p>
					<p className="mt-3 max-w-prose text-(length:--sys-typescale-body-medium-font-size) leading-(--sys-typescale-body-medium-line-height) text-(--sys-color-on-surface-variant)">
						MIT licensed. "Xoroh" is a provisional plain-text wordmark — legal
						name and mark are not final.
					</p>
					<p className="mt-3 text-(length:--sys-typescale-body-medium-font-size) leading-(--sys-typescale-body-medium-line-height) text-(--sys-color-on-surface-variant)">
						Contact:{" "}
						<a
							href="https://github.com/xoroh/xoroh/issues"
							className="inline-flex min-h-11 items-center rounded-(--sys-shape-corner-small) text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
						>
							issues
						</a>{" "}
						·{" "}
						<a
							href="mailto:conduct@xoroh.org"
							className="inline-flex min-h-11 items-center rounded-(--sys-shape-corner-small) text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
						>
							conduct@xoroh.org
						</a>
					</p>
				</div>
				{GROUPS.map((group) => (
					<nav key={group.heading} aria-label={`Footer — ${group.heading}`}>
						<h2 className="text-(length:--sys-typescale-label-large-font-size) leading-(--sys-typescale-label-large-line-height) font-(--sys-typescale-label-large-font-weight) text-(--sys-color-on-surface-variant)">
							{group.heading}
						</h2>
						<ul className="mt-2">
							{group.links.map((item) => (
								<li key={"to" in item ? item.to : item.label}>
									{"to" in item ? (
										<Link to={item.to} className={footerLinkClass}>
											{item.label}
										</Link>
									) : "href" in item ? (
										<a
											href={item.href}
											className={`${footerLinkClass} flex-col items-start justify-center leading-tight`}
										>
											<span className="block">{item.label}</span>
											<span className="block text-(length:--sys-typescale-body-small-font-size) text-(--sys-color-on-surface-variant)">
												{item.detail}
											</span>
										</a>
									) : (
										<span
											className={`${footerLinkClass} cursor-default flex-col items-start justify-center leading-tight`}
										>
											<span className="block">{item.label}</span>
											<span className="block text-(length:--sys-typescale-body-small-font-size) text-(--sys-color-on-surface-variant)">
												{item.detail}
											</span>
										</span>
									)}
								</li>
							))}
						</ul>
					</nav>
				))}
			</div>
		</footer>
	);
}
