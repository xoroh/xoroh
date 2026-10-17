import { createFileRoute, Link } from "@tanstack/react-router";
import { projectByName, targetMaturity } from "#/data/projects";
import { InstallBlock } from "../components/install-block";
import { PageHeader } from "../components/page-header";
import { MaturityBadge } from "../components/project-card";
import { pageHead } from "../components/seo";
import { Button } from "../kern/button";
import { Card, CardContent, CardHeader } from "../kern/card";

export const Route = createFileRoute("/projects/axis")({
	head: () =>
		pageHead({
			title: "Axis — Xoroh open-source hub",
			description:
				"Axis: unstyled, accessible behavior primitives for native — the counterpart of Base UI for React Native, with a Sandbox target at 0.1.0.",
			path: "/projects/axis",
		}),
	component: Axis,
});

function Axis() {
	const project = projectByName("axis");
	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
			<PageHeader
				kicker="Projects · Native primitives"
				title="Axis"
				lede={
					<>
						Unstyled, accessible behavior primitives for native — the
						counterpart of Base UI for React Native. Usable with or without
						Kern: Axis never depends on Kern.
					</>
				}
				actions={
					<>
						<MaturityBadge stage={targetMaturity.axis} />
						<span className="text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
							Status: {project.status}. License: {project.license}.
						</span>
					</>
				}
			/>

			<div className="mt-8 grid gap-4 lg:grid-cols-2">
				<section id="install" aria-labelledby="install-title">
					<Card variant="outlined" className="h-full">
						<CardHeader>
							<h2
								id="install-title"
								className="text-(length:--sys-typescale-title-large-font-size) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface)"
							>
								Install
							</h2>
						</CardHeader>
						<CardContent>
							<InstallBlock command="bun add @xoroh/axis" />
							<p className="mt-3 text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
								Available at release (0.1.0). Peers: <code>react &gt;= 18</code>
								, <code>react-native &gt;= 0.86 &lt; 0.89</code>.
							</p>
							<div className="mt-4 flex flex-wrap gap-3">
								<Button
									variant="primary"
									href="https://github.com/xoroh/axis/tree/main/docs"
								>
									Axis docs
								</Button>
								<Button variant="outlined" href={project.canonical_repo}>
									Repository
								</Button>
							</div>
						</CardContent>
					</Card>
				</section>

				<section id="axis-packages" aria-labelledby="axis-packages-title">
					<Card variant="outlined" className="h-full">
						<CardHeader>
							<h2
								id="axis-packages-title"
								className="text-(length:--sys-typescale-title-large-font-size) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface)"
							>
								Packages
							</h2>
							<p className="mt-1 text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
								Tracked in the project registry; none published yet:
							</p>
						</CardHeader>
						<CardContent>
							<ul className="grid grid-cols-1 gap-2">
								{project.packages.map((pkg) => (
									<li
										key={pkg.name}
										className="flex flex-wrap items-center gap-2 rounded-(--sys-shape-corner-medium) bg-(--sys-color-surface-container-high) px-3 py-2 text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)"
									>
										<code className="text-(--sys-color-on-surface)">
											{pkg.name}
										</code>
										<span>
											{pkg.private ? "(private)" : ""} —{" "}
											{pkg.published ? "published" : "unpublished"}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</section>
			</div>

			<section
				id="axis-facts"
				aria-labelledby="axis-facts-title"
				className="mt-4"
			>
				<Card variant="outlined">
					<CardHeader>
						<h2
							id="axis-facts-title"
							className="text-(length:--sys-typescale-title-large-font-size) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface)"
						>
							Facts
						</h2>
					</CardHeader>
					<CardContent>
						<dl className="hub-prose grid gap-4 sm:grid-cols-2">
							<div>
								<dt className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) text-(--sys-color-on-surface)">
									Repository
								</dt>
								<dd>
									<a href={project.canonical_repo}>{project.canonical_repo}</a>{" "}
									(default branch <code>{project.default_branch}</code>)
								</dd>
							</div>
							<div>
								<dt className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) text-(--sys-color-on-surface)">
									Docs
								</dt>
								<dd>
									the{" "}
									<a href="https://github.com/xoroh/axis/tree/main/docs">
										axis repo docs tree
									</a>{" "}
									— there is no axis.xoroh.org in v1.
								</dd>
							</div>
							<div>
								<dt className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) text-(--sys-color-on-surface)">
									Support
								</dt>
								<dd>
									<a href={project.support_url}>{project.support_url}</a>
								</dd>
							</div>
							<div>
								<dt className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) text-(--sys-color-on-surface)">
									Runtimes
								</dt>
								<dd>{project.runtimes.join(", ")}</dd>
							</div>
							<div>
								<dt className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) text-(--sys-color-on-surface)">
									Platforms
								</dt>
								<dd>{project.platforms.join(", ")}</dd>
							</div>
							<div>
								<dt className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) text-(--sys-color-on-surface)">
									Release policy
								</dt>
								<dd>{project.release_policy}</dd>
							</div>
							<div>
								<dt className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) text-(--sys-color-on-surface)">
									Security reporting
								</dt>
								<dd>
									<a href={project.security_reporting}>
										{project.security_reporting}
									</a>
								</dd>
							</div>
							<div>
								<dt className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) text-(--sys-color-on-surface)">
									Ecosystem
								</dt>
								<dd>{project.ecosystem_relations.join("; ")}</dd>
							</div>
						</dl>
					</CardContent>
				</Card>
			</section>

			<p className="hub-prose mt-10">
				Target maturity at 0.1.0: {targetMaturity.axis}.{" "}
				<Link to="/projects">All projects</Link> ·{" "}
				<Link to="/maturity">How maturity works</Link> ·{" "}
				<Link to="/docs">Where the docs live</Link>
			</p>
		</div>
	);
}
