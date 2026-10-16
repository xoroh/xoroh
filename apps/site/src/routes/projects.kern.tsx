import { createFileRoute, Link } from "@tanstack/react-router";
import { projectByName, targetMaturity } from "#/data/projects";

export const Route = createFileRoute("/projects/kern")({
	head: () => ({
		meta: [{ title: "Kern — Xoroh open-source hub" }],
		links: [{ rel: "canonical", href: "https://xoroh.org/projects/kern" }],
	}),
	component: Kern,
});

function Kern() {
	const project = projectByName("kern");
	return (
		<main>
			<h1>Kern</h1>
			<p>One foundation. Every design system.</p>
			<p>{project.purpose} Material Design 3 is its first system.</p>
			<p>
				<strong>Target maturity at 0.1.0: {targetMaturity.kern}.</strong>{" "}
				Status: {project.status}. License: {project.license}.
			</p>

			<section id="install">
				<h2>Install</h2>
				<pre>
					<code>bun add @xoroh/kern @xoroh/kern-tokens @xoroh/kern-m3</code>
				</pre>
				<p>
					Available at release (0.1.0). Per-system preset plus per-platform
					widgets: <code>@xoroh/kern-m3</code> carries the M3 preset data.
				</p>
			</section>

			<section id="kern-packages">
				<h2>Packages</h2>
				<p>Tracked in the project registry; none published yet:</p>
				<ul>
					{project.packages.map((pkg) => (
						<li key={pkg.name}>
							<code>{pkg.name}</code>
							{pkg.private ? " (private)" : ""} —{" "}
							{pkg.published ? "published" : "unpublished"}
						</li>
					))}
				</ul>
			</section>

			<section id="kern-facts">
				<h2>Facts</h2>
				<ul>
					<li>
						Repository:{" "}
						<a href={project.canonical_repo}>{project.canonical_repo}</a>{" "}
						(default branch <code>{project.default_branch}</code>)
					</li>
					<li>
						Docs: <a href="https://kern.xoroh.org">https://kern.xoroh.org</a>
					</li>
					<li>
						Support: <a href={project.support_url}>{project.support_url}</a>
					</li>
					<li>Runtimes: {project.runtimes.join(", ")}</li>
					<li>Platforms: {project.platforms.join(", ")}</li>
					<li>Release policy: {project.release_policy}</li>
					<li>
						Security reporting:{" "}
						<a href={project.security_reporting}>
							{project.security_reporting}
						</a>
					</li>
					<li>Ecosystem: {project.ecosystem_relations.join("; ")}</li>
				</ul>
			</section>

			<p>
				<Link to="/projects">All projects</Link> ·{" "}
				<Link to="/maturity">How maturity works</Link> ·{" "}
				<Link to="/docs">Where the docs live</Link>
			</p>
		</main>
	);
}
