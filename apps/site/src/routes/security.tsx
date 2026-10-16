import { createFileRoute, Link } from "@tanstack/react-router";
import { projectByName, projects } from "#/data/projects";

export const Route = createFileRoute("/security")({
	head: () => ({
		meta: [{ title: "Security — Xoroh open-source hub" }],
		links: [{ rel: "canonical", href: "https://xoroh.org/security" }],
	}),
	component: Security,
});

function Security() {
	const hub = projectByName("xoroh");
	return (
		<main>
			<h1>Security</h1>
			<p>
				The repository has not published a versioned release. Until then, report
				issues against the current <code>main</code> branch.
			</p>

			<section id="reporting">
				<h2>Reporting a vulnerability</h2>
				<p>
					Report vulnerabilities privately through{" "}
					<a href={hub.security_reporting}>GitHub Security Advisories</a>. Do
					not open a public issue for an unpatched vulnerability.
				</p>
				<p>
					Include the affected commit, impact, and reproduction steps. The
					maintainers will acknowledge and coordinate reports as promptly as
					possible; please allow time to investigate and prepare a fix before
					public disclosure.
				</p>
			</section>

			<section id="per-project">
				<h2>Per-project reporting</h2>
				<p>
					Each tracked project reports through its own advisory channel,
					straight from the project registry:
				</p>
				<ul>
					{projects.map((project) => (
						<li key={project.name}>
							<strong>{project.name}</strong>:{" "}
							<a href={project.security_reporting}>
								{project.security_reporting}
							</a>
						</li>
					))}
				</ul>
				<p>
					Full policy:{" "}
					<a href="https://github.com/xoroh/xoroh/blob/main/SECURITY.md">
						SECURITY.md
					</a>
					.
				</p>
			</section>

			<p>
				<Link to="/">Back to the hub</Link> ·{" "}
				<Link to="/news">Security notes in the news stream</Link>
			</p>
		</main>
	);
}
