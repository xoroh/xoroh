import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/page-header";
import { pageHead } from "../components/seo";
import { projectByName, projects } from "../data/projects";

export const Route = createFileRoute("/security")({
	head: () =>
		pageHead({
			title: "Security — Xoroh open-source hub",
			description:
				"How to report a security vulnerability in Xoroh open source: private advisories, per-project channels, and the security policy.",
			path: "/security",
		}),
	component: Security,
});

function Security() {
	const hub = projectByName("xoroh");
	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
			<PageHeader
				kicker="Project"
				title="Security"
				lede={
					<>
						The repository has not published a versioned release. Until then,
						report issues against the current <code>main</code> branch.
					</>
				}
			/>

			<div className="hub-prose mt-8 max-w-3xl">
				<section id="reporting" aria-labelledby="reporting-title">
					<h2 id="reporting-title">Reporting a vulnerability</h2>
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

				<section id="per-project" aria-labelledby="per-project-title">
					<h2 id="per-project-title">Per-project reporting</h2>
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
			</div>
		</div>
	);
}
