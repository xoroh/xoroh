import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/page-header";
import { MaturityBadge } from "../components/project-card";
import { pageHead } from "../components/seo";
import { Card, CardContent, CardHeader } from "../kern/card";

export const Route = createFileRoute("/maturity")({
	head: () =>
		pageHead({
			title: "Maturity — Xoroh open-source hub",
			description:
				"The CNCF-style maturity ladder for Xoroh projects: Sandbox, Incubating, Graduated, and Archived — every badge a target at 0.1.0.",
			path: "/maturity",
		}),
	component: Maturity,
});

const STAGES = [
	{
		stage: "Sandbox",
		title: "Sandbox — early experiments",
		body: "File-docs plus an example. Entry: a scoped proposal and a runnable starting point.",
	},
	{
		stage: "Incubating",
		title: "Incubating — production-candidate use",
		body: "Docs site, enforced quality gates, and a dual-renderer contract. Entry: evidence that consumers can build on it.",
	},
	{
		stage: "Graduated",
		title: "Graduated — proven in sustained production",
		body: "Stable governance and sustained production use. Entry: adoption and stability evidence reviewed in the open.",
	},
];

function Maturity() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
			<PageHeader
				kicker="Trust"
				title="Maturity"
				lede={
					<>
						The hub uses a CNCF-style ladder with published entry and exit
						evidence. Until the launch gate clears, every badge below is a{" "}
						<strong>target at 0.1.0</strong> — never an earned stage.
					</>
				}
			/>

			<section id="ladder" aria-labelledby="ladder-title" className="mt-8">
				<h2 id="ladder-title" className="sr-only">
					The ladder
				</h2>
				<ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{STAGES.map((item) => (
						<li key={item.stage} className="h-full">
							<Card variant="outlined" className="h-full">
								<CardHeader>
									<MaturityBadge stage={item.stage} />
									<h3 className="mt-3 text-(length:--sys-typescale-title-medium-font-size) font-(--sys-typescale-title-medium-font-weight) text-(--sys-color-on-surface)">
										{item.title}
									</h3>
								</CardHeader>
								<CardContent>
									<p className="text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
										{item.body}
									</p>
								</CardContent>
							</Card>
						</li>
					))}
				</ol>
				<Card variant="filled" className="mt-4">
					<CardContent>
						<p className="text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
							<strong className="text-(--sys-color-on-surface)">
								Archived rule:
							</strong>{" "}
							projects that stop moving are marked Archived with a dated note
							and a pointer to their last state — never silently deleted.
						</p>
					</CardContent>
				</Card>
			</section>

			<section id="seeding" aria-labelledby="seeding-title" className="mt-10">
				<Card variant="outlined">
					<CardHeader>
						<h2
							id="seeding-title"
							className="text-(length:--sys-typescale-title-large-font-size) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface)"
						>
							Seeding at 0.1.0
						</h2>
					</CardHeader>
					<CardContent>
						<ul className="grid grid-cols-1 gap-2">
							<li className="flex flex-wrap items-center gap-2 text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
								<Link
									to="/projects/kern"
									className="text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
								>
									Kern
								</Link>
								→ <MaturityBadge stage="Incubating" />
								<span>
									: docs site, quality gates, and dual-renderer contract.
								</span>
							</li>
							<li className="flex flex-wrap items-center gap-2 text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
								<Link
									to="/projects/axis"
									className="text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
								>
									Axis
								</Link>
								→ <MaturityBadge stage="Sandbox" />
								<span>: file-docs plus example only.</span>
							</li>
						</ul>
					</CardContent>
				</Card>
			</section>

			<p className="hub-prose mt-10">
				<Link to="/projects">All projects</Link> ·{" "}
				<Link to="/governance">How decisions get made</Link>
			</p>
		</div>
	);
}
