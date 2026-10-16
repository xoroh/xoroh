import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/brand")({
	head: () => ({
		meta: [
			{ title: "Brand — Xoroh open-source hub" },
			{
				name: "description",
				content:
					"Xoroh brand: the provisional plain-text wordmark, naming rules, and where things live across xoroh.com, xoroh.org, and kern.xoroh.org.",
			},
			{ property: "og:title", content: "Brand — Xoroh open-source hub" },
			{
				property: "og:description",
				content:
					"Xoroh brand: the provisional plain-text wordmark, naming rules, and where things live across xoroh.com, xoroh.org, and kern.xoroh.org.",
			},
			{ property: "og:url", content: "https://xoroh.org/brand" },
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:title", content: "Brand — Xoroh open-source hub" },
			{
				name: "twitter:description",
				content:
					"Xoroh brand: the provisional plain-text wordmark, naming rules, and where things live across xoroh.com, xoroh.org, and kern.xoroh.org.",
			},
		],
		links: [{ rel: "canonical", href: "https://xoroh.org/brand" }],
	}),
	component: Brand,
});

function Brand() {
	return (
		<main id="main-content" tabIndex={-1}>
			<h1>Brand</h1>
			<p>
				"Xoroh" is a provisional plain-text wordmark — the legal name and mark
				are not final. Use "Xoroh" as text. There is no designed lockup and no
				binaries in git.
			</p>

			<section id="naming">
				<h2>Naming</h2>
				<ul>
					<li>
						This site covers the open-source hub of Xoroh — never describe it as
						a product (no OSS-product noun phrase).
					</li>
					<li>Commercial SaaS lives at xoroh.com — not on this hub.</li>
					<li>Apps live at xoroh.app. xoroh.dev is on hold.</li>
					<li>
						Kern is the multi-design-system platform: "One foundation. Every
						design system."
					</li>
					<li>
						Axis is unstyled, accessible behavior primitives for native — and
						Axis never depends on Kern.
					</li>
				</ul>
			</section>

			<section id="domains">
				<h2>Where things live</h2>
				<ul>
					<li>
						<a href="https://xoroh.com">xoroh.com</a> — commercial SaaS
					</li>
					<li>
						<a href="https://xoroh.org">xoroh.org</a> — this open-source hub
						(apex canonical)
					</li>
					<li>
						<a href="https://kern.xoroh.org">kern.xoroh.org</a> — Kern site
					</li>
					<li>xoroh.app — apps</li>
					<li>xoroh.dev — on hold</li>
				</ul>
				<p>
					There are no links anywhere on the hub to the retired UI subdomain
					host; that host redirects to kern.xoroh.org as a DNS-owner task.
				</p>
			</section>

			<p>
				<Link to="/">Back to the hub</Link> ·{" "}
				<Link to="/docs">Where the docs live</Link>
			</p>
		</main>
	);
}
