import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/maturity")({
	head: () => ({
		meta: [{ title: "Maturity — Xoroh open-source hub" }],
		links: [{ rel: "canonical", href: "https://xoroh.org/maturity" }],
	}),
	component: Maturity,
});

function Maturity() {
	return (
		<main>
			<h1>Maturity</h1>
			<p>
				The hub uses a CNCF-style ladder with published entry and exit evidence.
				Until the launch gate clears, every badge below is a{" "}
				<strong>target at 0.1.0</strong> — never an earned stage.
			</p>

			<section id="ladder">
				<h2>The ladder</h2>
				<ol>
					<li>
						<strong>Sandbox</strong> — early experiments: file-docs plus an
						example. Entry: a scoped proposal and a runnable starting point.
					</li>
					<li>
						<strong>Incubating</strong> — production-candidate use: docs site,
						enforced quality gates, and a dual-renderer contract. Entry:
						evidence that consumers can build on it.
					</li>
					<li>
						<strong>Graduated</strong> — proven in sustained production use with
						stable governance. Entry: adoption and stability evidence reviewed
						in the open.
					</li>
				</ol>
				<p>
					<strong>Archived rule:</strong> projects that stop moving are marked
					Archived with a dated note and a pointer to their last state — never
					silently deleted.
				</p>
			</section>

			<section id="seeding">
				<h2>Seeding at 0.1.0</h2>
				<ul>
					<li>
						<Link to="/projects/kern">Kern</Link> → <strong>Incubating</strong>:
						docs site, quality gates, and dual-renderer contract.
					</li>
					<li>
						<Link to="/projects/axis">Axis</Link> → <strong>Sandbox</strong>:
						file-docs plus example only.
					</li>
				</ul>
			</section>

			<p>
				<Link to="/projects">All projects</Link> ·{" "}
				<Link to="/governance">How decisions get made</Link>
			</p>
		</main>
	);
}
