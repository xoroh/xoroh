import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Xoroh — Open-source hub" },
			{
				name: "description",
				content:
					"The open-source hub of Xoroh: Kern and Axis projects, maturity targets, governance, contributing, security, brand, docs, and news.",
			},
			{ property: "og:title", content: "Xoroh — Open-source hub" },
			{
				property: "og:description",
				content:
					"The open-source hub of Xoroh: Kern and Axis projects, maturity targets, governance, contributing, security, brand, docs, and news.",
			},
			{ property: "og:url", content: "https://xoroh.org/" },
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:title", content: "Xoroh — Open-source hub" },
			{
				name: "twitter:description",
				content:
					"The open-source hub of Xoroh: Kern and Axis projects, maturity targets, governance, contributing, security, brand, docs, and news.",
			},
		],
		links: [{ rel: "canonical", href: "https://xoroh.org/" }],
	}),
	component: Home,
});

function Home() {
	return (
		<main id="main-content" tabIndex={-1}>
			<h1>Xoroh</h1>
			<p>
				The open-source hub of Xoroh. Commercial SaaS lives at{" "}
				<a href="https://xoroh.com">xoroh.com</a>; this site covers community
				open source only.
			</p>

			<section id="projects">
				<h2>Projects</h2>
				<p>
					<Link to="/projects">Browse the project directory</Link>, with full
					pages for <Link to="/projects/kern">Kern</Link> and{" "}
					<Link to="/projects/axis">Axis</Link>. Maturity badges are targets at
					0.1.0 — see <Link to="/maturity">how maturity works</Link>.
				</p>
				<article id="kern">
					<h3>Kern</h3>
					<p>
						One foundation. Every design system. Material Design 3 is its first
						system.
					</p>
					<p>
						<strong>Target maturity at 0.1.0: Incubating.</strong>
					</p>
					<pre>
						<code>bun add @xoroh/kern @xoroh/kern-tokens @xoroh/kern-m3</code>
					</pre>
					<p>
						Available at release (0.1.0). Per-system preset plus per-platform
						widgets: <code>@xoroh/kern-m3</code> carries the M3 preset data.
					</p>
					<p>
						<a href="https://kern.xoroh.org">Kern docs</a> ·{" "}
						<a href="https://github.com/xoroh/kern">Kern repo</a>
					</p>
				</article>
				<article id="axis">
					<h3>Axis</h3>
					<p>
						Unstyled, accessible behavior primitives for native — the
						counterpart of Base UI for React Native. Usable with or without
						Kern: Axis never depends on Kern.
					</p>
					<p>
						<strong>Target maturity at 0.1.0: Sandbox.</strong>
					</p>
					<pre>
						<code>bun add @xoroh/axis</code>
					</pre>
					<p>
						Available at release (0.1.0). Peers: <code>react &gt;= 18</code>,{" "}
						<code>react-native &gt;= 0.86 &lt; 0.89</code>.
					</p>
					<p>
						<a href="https://github.com/xoroh/axis">Axis repo</a> ·{" "}
						<a href="https://github.com/xoroh/axis/tree/development/docs">
							Axis docs
						</a>
					</p>
				</article>
			</section>

			<section id="news">
				<h2>News</h2>
				<p>
					One stream for releases, governance notes, and security notes.{" "}
					<Link to="/news">Read the news stream</Link>.
				</p>
			</section>

			<section id="hub-pages">
				<h2>Hub pages</h2>
				<ul>
					<li>
						<Link to="/governance">Governance</Link> — how decisions get made
					</li>
					<li>
						<Link to="/contributing">Contributing</Link> — how to contribute
					</li>
					<li>
						<Link to="/security">Security</Link> — how to report a vulnerability
					</li>
					<li>
						<Link to="/brand">Brand</Link> — provisional wordmark and naming
					</li>
					<li>
						<Link to="/docs">Docs</Link> — where the docs live
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
					</li>
					<li>
						<a href="https://kern.xoroh.org">kern.xoroh.org</a> — Kern site
					</li>
					<li>xoroh.app — apps</li>
					<li>xoroh.dev — on hold</li>
				</ul>
			</section>
		</main>
	);
}
