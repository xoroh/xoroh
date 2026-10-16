import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/governance")({
	head: () => ({
		meta: [
			{ title: "Governance — Xoroh open-source hub" },
			{
				name: "description",
				content:
					"How decisions get made for the Xoroh open-source hub: proposing changes, accepting and deprecating, maintenance cadence, and conduct contact.",
			},
			{ property: "og:title", content: "Governance — Xoroh open-source hub" },
			{
				property: "og:description",
				content:
					"How decisions get made for the Xoroh open-source hub: proposing changes, accepting and deprecating, maintenance cadence, and conduct contact.",
			},
			{ property: "og:url", content: "https://xoroh.org/governance" },
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:title", content: "Governance — Xoroh open-source hub" },
			{
				name: "twitter:description",
				content:
					"How decisions get made for the Xoroh open-source hub: proposing changes, accepting and deprecating, maintenance cadence, and conduct contact.",
			},
		],
		links: [{ rel: "canonical", href: "https://xoroh.org/governance" }],
	}),
	component: Governance,
});

function Governance() {
	return (
		<main id="main-content" tabIndex={-1}>
			<h1>Governance</h1>
			<p>
				The open-source hub of Xoroh is maintained by the Xoroh organization
				owners. Project repositories keep their own maintainers; shared
				standards never override project-owned architecture.
			</p>

			<section id="proposing">
				<h2>Proposing a change</h2>
				<ol>
					<li>
						Open an issue or PR in{" "}
						<a href="https://github.com/xoroh/xoroh">xoroh/xoroh</a> describing
						the problem, affected repositories, and the proposed standard.
					</li>
					<li>
						Cross-project decisions require an ADR in{" "}
						<a href="https://github.com/xoroh/xoroh/tree/main/docs/adr">
							docs/adr
						</a>{" "}
						with status <code>proposed</code>.
					</li>
					<li>
						Land via reviewed PR on green CI. The PR updates the standards
						changelog with adoption notes.
					</li>
				</ol>
			</section>

			<section id="accepting">
				<h2>Accepting and deprecating</h2>
				<p>
					ADR acceptance, MAJOR standards versions, and tags require owner
					approval. Deprecations get a dated sunset notice in the changelog;
					removal happens no earlier than stated.
				</p>
			</section>

			<section id="cadence">
				<h2>Maintenance cadence</h2>
				<ul>
					<li>Quarterly standards review, or sooner on incident.</li>
					<li>
						Annual access and team review — the release-approver roster must
						never silently become single-member.
					</li>
					<li>
						The project index (<code>projects.json</code>) is updated by the PR
						that changes the underlying fact; CI validates the schema.
					</li>
				</ul>
			</section>

			<p>
				Code of conduct contact: conduct@xoroh.org. Full text:{" "}
				<a href="https://github.com/xoroh/xoroh/tree/main/docs/governance.md">
					governance.md
				</a>
				.
			</p>

			<p>
				<Link to="/">Back to the hub</Link> ·{" "}
				<Link to="/contributing">How to contribute</Link> ·{" "}
				<Link to="/maturity">How maturity works</Link>
			</p>
		</main>
	);
}
