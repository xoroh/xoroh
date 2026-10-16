import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contributing")({
	head: () => ({
		meta: [
			{ title: "Contributing — Xoroh open-source hub" },
			{
				name: "description",
				content:
					"How to contribute to the Xoroh open-source hub: Bun 1.4.2 setup, the checks every PR runs, and pull-request rules.",
			},
			{ property: "og:title", content: "Contributing — Xoroh open-source hub" },
			{
				property: "og:description",
				content:
					"How to contribute to the Xoroh open-source hub: Bun 1.4.2 setup, the checks every PR runs, and pull-request rules.",
			},
			{ property: "og:url", content: "https://xoroh.org/contributing" },
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:title", content: "Contributing — Xoroh open-source hub" },
			{
				name: "twitter:description",
				content:
					"How to contribute to the Xoroh open-source hub: Bun 1.4.2 setup, the checks every PR runs, and pull-request rules.",
			},
		],
		links: [{ rel: "canonical", href: "https://xoroh.org/contributing" }],
	}),
	component: Contributing,
});

function Contributing() {
	return (
		<main id="main-content" tabIndex={-1}>
			<h1>Contributing</h1>
			<p>
				Contributions are welcome. For a substantial change, open an issue first
				so its scope can be discussed.
			</p>

			<section id="development">
				<h2>Development</h2>
				<p>Requirements: Bun 1.4.2 or newer.</p>
				<pre>
					<code>bun install --frozen-lockfile</code>
				</pre>
				<p>Checks every hub PR runs:</p>
				<pre>
					<code>
						bun run check:index{"\n"}bun run check:site{"\n"}bun test{"\n"}
						bun run lint{"\n"}bun run typecheck{"\n"}bun run build:site
					</code>
				</pre>
			</section>

			<section id="pull-requests">
				<h2>Pull requests</h2>
				<ul>
					<li>Keep changes focused and describe their impact.</li>
					<li>Update documentation when behavior or setup changes.</li>
					<li>Do not include secrets, credentials, or private user data.</li>
					<li>
						Preserve the repository's MIT license and any third-party notices.
					</li>
				</ul>
				<p>
					Full guide:{" "}
					<a href="https://github.com/xoroh/xoroh/blob/main/CONTRIBUTING.md">
						CONTRIBUTING.md
					</a>
					.
				</p>
			</section>

			<p>
				<Link to="/">Back to the hub</Link> ·{" "}
				<Link to="/governance">How decisions get made</Link> ·{" "}
				<Link to="/security">How to report a vulnerability</Link>
			</p>
		</main>
	);
}
