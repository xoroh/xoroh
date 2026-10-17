import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/page-header";
import { pageHead } from "../components/seo";

export const Route = createFileRoute("/docs")({
	head: () =>
		pageHead({
			title: "Docs — Xoroh open-source hub",
			description:
				"Where Xoroh docs live: Kern docs on kern.xoroh.org, the Axis repo docs tree, hub docs, search-index.json, and llms.txt.",
			path: "/docs",
		}),
	component: Docs,
});

function Docs() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
			<PageHeader
				kicker="Project"
				title="Docs"
				lede={
					<>
						Product docs stay with their projects. This hub links out and never
						duplicates them.
					</>
				}
			/>

			<div className="hub-prose mt-8 max-w-3xl">
				<section id="product-docs" aria-labelledby="product-docs-title">
					<h2 id="product-docs-title">Product docs</h2>
					<ul>
						<li>
							Kern docs live on{" "}
							<a href="https://kern.xoroh.org">kern.xoroh.org</a> — see{" "}
							<Link to="/projects/kern">the Kern page</Link>.
						</li>
						<li>
							Axis docs live in the{" "}
							<a href="https://github.com/xoroh/axis/tree/main/docs">
								axis repo docs tree
							</a>{" "}
							until Axis earns a site — see{" "}
							<Link to="/projects/axis">the Axis page</Link>.
						</li>
					</ul>
				</section>

				<section id="hub-docs" aria-labelledby="hub-docs-title">
					<h2 id="hub-docs-title">Hub and standards docs</h2>
					<ul>
						<li>
							<a href="https://github.com/xoroh/xoroh/tree/main/docs">
								Hub docs tree
							</a>{" "}
							— vision, decisions, governance, standards, and the project index.
						</li>
						<li>
							Machine-readable:{" "}
							<a href="/search-index.json">search-index.json</a>{" "}
							(hand-maintained per the JSON-index decision) and{" "}
							<a href="/llms.txt">llms.txt</a>.
						</li>
					</ul>
				</section>

				<p>
					<Link to="/">Back to the hub</Link> ·{" "}
					<Link to="/projects">All projects</Link>
				</p>
			</div>
		</div>
	);
}
