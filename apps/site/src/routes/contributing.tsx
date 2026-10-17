import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/page-header";
import { pageHead } from "../components/seo";

export const Route = createFileRoute("/contributing")({
	head: () =>
		pageHead({
			title: "Contributing — Xoroh open-source hub",
			description:
				"How to contribute to Xoroh open source: development setup, required checks, and pull-request rules.",
			path: "/contributing",
		}),
	component: Contributing,
});

function Contributing() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
			<PageHeader
				kicker="Project"
				title="Contributing"
				lede={
					<>
						Contributions are welcome. For a substantial change, open an issue
						first so its scope can be discussed.
					</>
				}
			/>

			<div className="hub-prose mt-8 max-w-3xl">
				<section id="development" aria-labelledby="development-title">
					<h2 id="development-title">Development</h2>
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

				<section id="pull-requests" aria-labelledby="pull-requests-title">
					<h2 id="pull-requests-title">Pull requests</h2>
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
			</div>
		</div>
	);
}
