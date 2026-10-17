import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/page-header";
import { pageHead } from "../components/seo";

export const Route = createFileRoute("/governance")({
	head: () =>
		pageHead({
			title: "Governance — Xoroh open-source hub",
			description:
				"How Xoroh open source is governed: proposing changes, ADRs, acceptance, and maintenance cadence.",
			path: "/governance",
		}),
	component: Governance,
});

function Governance() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
			<PageHeader
				kicker="Project"
				title="Governance"
				lede={
					<>
						The open-source hub of Xoroh is maintained by the Xoroh organization
						owners. Project repositories keep their own maintainers; shared
						standards never override project-owned architecture.
					</>
				}
			/>

			<div className="hub-prose mt-8 max-w-3xl">
				<section id="proposing" aria-labelledby="proposing-title">
					<h2 id="proposing-title">Proposing a change</h2>
					<ol>
						<li>
							Open an issue or PR in{" "}
							<a href="https://github.com/xoroh/xoroh">xoroh/xoroh</a>{" "}
							describing the problem, affected repositories, and the proposed
							standard.
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

				<section id="accepting" aria-labelledby="accepting-title">
					<h2 id="accepting-title">Accepting and deprecating</h2>
					<p>
						ADR acceptance, MAJOR standards versions, and tags require owner
						approval. Deprecations get a dated sunset notice in the changelog;
						removal happens no earlier than stated.
					</p>
				</section>

				<section id="cadence" aria-labelledby="cadence-title">
					<h2 id="cadence-title">Maintenance cadence</h2>
					<ul>
						<li>Quarterly standards review, or sooner on incident.</li>
						<li>
							Annual access and team review — the release-approver roster must
							never silently become single-member.
						</li>
						<li>
							The project index (<code>projects.json</code>) is updated by the
							PR that changes the underlying fact; CI validates the schema.
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
			</div>
		</div>
	);
}
