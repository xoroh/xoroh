import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/docs")({
	head: () => ({
		meta: [{ title: "Docs — Xoroh open-source hub" }],
		links: [{ rel: "canonical", href: "https://xoroh.org/docs" }],
	}),
	component: Docs,
});

function Docs() {
	return (
		<main>
			<h1>Docs</h1>
			<p>
				Product docs stay with their projects. This hub links out and never
				duplicates them.
			</p>

			<section id="product-docs">
				<h2>Product docs</h2>
				<ul>
					<li>
						Kern docs live on{" "}
						<a href="https://kern.xoroh.org">kern.xoroh.org</a> — see{" "}
						<Link to="/projects/kern">the Kern page</Link>.
					</li>
					<li>
						Axis docs live in the{" "}
						<a href="https://github.com/xoroh/axis/tree/development/docs">
							axis repo docs tree
						</a>{" "}
						until Axis earns a site — see{" "}
						<Link to="/projects/axis">the Axis page</Link>.
					</li>
				</ul>
			</section>

			<section id="hub-docs">
				<h2>Hub and standards docs</h2>
				<ul>
					<li>
						<a href="https://github.com/xoroh/xoroh/tree/main/docs">
							Hub docs tree
						</a>{" "}
						— vision, decisions, governance, standards, and the project index.
					</li>
					<li>
						Machine-readable: <a href="/search-index.json">search-index.json</a>{" "}
						(hand-maintained per the JSON-index decision) and{" "}
						<a href="/llms.txt">llms.txt</a>.
					</li>
				</ul>
			</section>

			<p>
				<Link to="/">Back to the hub</Link> ·{" "}
				<Link to="/projects">All projects</Link>
			</p>
		</main>
	);
}
