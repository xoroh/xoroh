import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
	head: () => ({
		meta: [{ title: "News — Xoroh open-source hub" }],
		links: [{ rel: "canonical", href: "https://xoroh.org/news" }],
	}),
	component: News,
});

function News() {
	return (
		<main>
			<h1>News</h1>
			<p>
				One stream for releases, governance notes, and security notes.{" "}
				<Link to="/">Back to the hub</Link>.
			</p>
			<article id="stream-opens-at-launch">
				<h2>Stream opens at launch</h2>
				<p>
					<time dateTime="2026-10-16">2026-10-16</time> — This stream starts at
					launch and is not backfilled. First entries will be the Kern 0.1.0 and
					Axis 0.1.0 release notes, a governance note, and a security-policy
					note. The hub goes live only with Kern and Axis 0.1.0, never before.
				</p>
			</article>
		</main>
	);
}
