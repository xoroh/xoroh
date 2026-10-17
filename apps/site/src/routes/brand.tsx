import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/page-header";
import { pageHead } from "../components/seo";

export const Route = createFileRoute("/brand")({
	head: () =>
		pageHead({
			title: "Brand — Xoroh open-source hub",
			description:
				"Xoroh brand rules: the provisional plain-text wordmark, naming, and where things live across xoroh.com, xoroh.org, and kern.xoroh.org.",
			path: "/brand",
		}),
	component: Brand,
});

function Brand() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
			<PageHeader
				kicker="Project"
				title="Brand"
				lede={
					<>
						"Xoroh" is a provisional plain-text wordmark — the legal name and
						mark are not final. Use "Xoroh" as text. There is no designed lockup
						and no binaries in git.
					</>
				}
			/>

			<div className="hub-prose mt-8 max-w-3xl">
				<section id="naming" aria-labelledby="naming-title">
					<h2 id="naming-title">Naming</h2>
					<ul>
						<li>
							This site covers the open-source hub of Xoroh — never describe it
							as a product (no OSS-product noun phrase).
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

				<section id="domains" aria-labelledby="domains-title">
					<h2 id="domains-title">Where things live</h2>
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
			</div>
		</div>
	);
}
