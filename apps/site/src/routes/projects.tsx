import { createFileRoute, Link } from "@tanstack/react-router";
import {
	docsLinkFor,
	featuredProjects,
	projectByName,
	projects,
	targetMaturity,
} from "#/data/projects";

export const Route = createFileRoute("/projects")({
	head: () => ({
		meta: [{ title: "Projects — Xoroh open-source hub" }],
		links: [{ rel: "canonical", href: "https://xoroh.org/projects" }],
	}),
	component: Projects,
});

function Projects() {
	return (
		<main>
			<h1>Projects</h1>
			<p>
				The project directory of the open-source hub of Xoroh, driven by the{" "}
				<a href="https://github.com/xoroh/xoroh/blob/main/projects.json">
					project registry
				</a>
				. Maturity badges below are targets at 0.1.0, not earned stages — the
				hub goes live only with Kern and Axis 0.1.0, never before.
			</p>

			{featuredProjects.map((name) => {
				const project = projectByName(name);
				return (
					<article key={name} id={name}>
						<h2>{name === "kern" ? "Kern" : "Axis"}</h2>
						<p>{project.purpose}</p>
						<p>
							<strong>Target maturity at 0.1.0: {targetMaturity[name]}.</strong>{" "}
							Status: {project.status}. License: {project.license}.
						</p>
						<p>
							<Link to={name === "kern" ? "/projects/kern" : "/projects/axis"}>
								{name === "kern" ? "Kern details" : "Axis details"}
							</Link>{" "}
							· <a href={project.canonical_repo}>Repository</a> ·{" "}
							<a href={docsLinkFor(project)}>Docs</a>
						</p>
					</article>
				);
			})}

			<section id="registry">
				<h2>Full registry</h2>
				<p>
					Every entry tracked in <code>projects.json</code>, including the
					standards home (this repository) and the docs platform:
				</p>
				<ul>
					{projects.map((project) => (
						<li key={project.name}>
							<strong>{project.name}</strong> — {project.purpose} Status:{" "}
							{project.status}. License: {project.license}.{" "}
							<a href={project.canonical_repo}>Repository</a>
						</li>
					))}
				</ul>
			</section>

			<p>
				<Link to="/">Back to the hub</Link> ·{" "}
				<Link to="/maturity">How maturity works</Link>
			</p>
		</main>
	);
}
