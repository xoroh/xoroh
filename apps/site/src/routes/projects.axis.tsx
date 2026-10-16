import { createFileRoute, Link } from "@tanstack/react-router";
import { projectByName, targetMaturity } from "#/data/projects";

export const Route = createFileRoute("/projects/axis")({
	head: () => ({
		meta: [{ title: "Axis — Xoroh open-source hub" }],
		links: [{ rel: "canonical", href: "https://xoroh.org/projects/axis" }],
	}),
	component: Axis,
});

function Axis() {
	const project = projectByName("axis");
	return (
		<main>
			<h1>Axis</h1>
			<p>
				Unstyled, accessible behavior primitives for native — the counterpart of
				Base UI for React Native. Usable with or without Kern: Axis never
				depends on Kern.
			</p>
			<p>
				<strong>Target maturity at 0.1.0: {targetMaturity.axis}.</strong>{" "}
				Status: {project.status}. License: {project.license}.
			</p>

			<section id="install">
				<h2>Install</h2>
				<pre>
					<code>bun add @xoroh/axis</code>
				</pre>
				<p>
					Available at release (0.1.0). Peers: <code>react &gt;= 18</code>,{" "}
					<code>react-native &gt;= 0.86 &lt; 0.89</code>.
				</p>
			</section>

			<section id="axis-packages">
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

			<section id="axis-facts">
				<h2>Facts</h2>
				<ul>
					<li>
						Repository:{" "}
						<a href={project.canonical_repo}>{project.canonical_repo}</a>{" "}
						(default branch <code>{project.default_branch}</code>)
					</li>
					<li>
						Docs: the{" "}
						<a href="https://github.com/xoroh/axis/tree/development/docs">
							axis repo docs tree
						</a>{" "}
						— there is no axis.xoroh.org in v1.
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
