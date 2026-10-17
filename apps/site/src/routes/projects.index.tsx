import { createFileRoute, Link } from "@tanstack/react-router";
import {
	featuredProjects,
	projectByName,
	projects,
	targetMaturity,
} from "#/data/projects";
import { InstallBlock } from "../components/install-block";
import { PageHeader } from "../components/page-header";
import { ProjectCard, RegistryRow } from "../components/project-card";
import { pageHead } from "../components/seo";
import { Button } from "../kern/button";
import { Card, CardContent, CardHeader } from "../kern/card";

export const Route = createFileRoute("/projects/")({
	head: () =>
		pageHead({
			title: "Projects — Xoroh open-source hub",
			description:
				"The project directory of Xoroh open source: Kern and Axis with target-maturity badges, plus the full registry tracked in projects.json.",
			path: "/projects",
		}),
	component: Projects,
});

function Projects() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
			<PageHeader
				kicker="Directory"
				title="Projects"
				lede={
					<>
						The project directory of the open-source hub of Xoroh, driven by the{" "}
						<a href="https://github.com/xoroh/xoroh/blob/main/projects.json">
							project registry
						</a>
						. Maturity badges below are targets at 0.1.0, not earned stages —
						the hub goes live only with Kern and Axis 0.1.0, never before.
					</>
				}
				actions={
					<>
						<Button variant="primary" href="/projects/kern">
							Kern details
						</Button>
						<Button variant="outlined" href="/projects/axis">
							Axis details
						</Button>
					</>
				}
			/>

			<div className="mt-8 grid gap-4 md:grid-cols-2">
				{featuredProjects.map((name) => (
					<article key={name} className="h-full">
						<ProjectCard project={projectByName(name)} />
					</article>
				))}
			</div>

			<section aria-labelledby="install-title" className="mt-10">
				<h2 id="install-title" className="sr-only">
					Install
				</h2>
				<InstallBlock command="bun add @xoroh/kern @xoroh/kern-tokens @xoroh/kern-m3" />
				<p className="mt-2 text-(length:--sys-typescale-body-small-font-size) text-(--sys-color-on-surface-variant)">
					Available at release (0.1.0). Target maturity at 0.1.0:{" "}
					{targetMaturity.kern} for Kern, {targetMaturity.axis} for Axis.
				</p>
			</section>

			<section id="registry" aria-labelledby="registry-title" className="mt-10">
				<Card variant="outlined">
					<CardHeader>
						<h2
							id="registry-title"
							className="text-(length:--sys-typescale-title-large-font-size) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface)"
						>
							Full registry
						</h2>
						<p className="mt-1 text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
							Every entry tracked in <code>projects.json</code>, including the
							standards home (this repository) and the docs platform:
						</p>
					</CardHeader>
					<CardContent>
						<ul>
							{projects.map((project) => (
								<RegistryRow key={project.name} project={project} />
							))}
						</ul>
					</CardContent>
				</Card>
			</section>

			<p className="hub-prose mt-10">
				<Link to="/">Back to the hub</Link> ·{" "}
				<Link to="/maturity">How maturity works</Link>
			</p>
		</div>
	);
}
