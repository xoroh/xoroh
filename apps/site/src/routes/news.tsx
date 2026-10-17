import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/page-header";
import { pageHead } from "../components/seo";
import { Card, CardContent, CardHeader } from "../kern/card";

export const Route = createFileRoute("/news")({
	head: () =>
		pageHead({
			title: "News — Xoroh open-source hub",
			description:
				"The Xoroh news stream: releases, governance notes, and security notes — opening at launch with Kern and Axis 0.1.0.",
			path: "/news",
		}),
	component: News,
});

function News() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
			<PageHeader
				kicker="Stream"
				title="News"
				lede={
					<>
						One stream for releases, governance notes, and security notes.{" "}
						<Link
							to="/"
							className="text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
						>
							Back to the hub
						</Link>
						.
					</>
				}
			/>

			<div className="mt-8 max-w-3xl">
				<article id="stream-opens-at-launch">
					<Card variant="outlined">
						<CardHeader>
							<h2 className="text-(length:--sys-typescale-title-large-font-size) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface)">
								Stream opens at launch
							</h2>
							<p className="mt-1 text-(length:--sys-typescale-body-small-font-size) text-(--sys-color-on-surface-variant)">
								<time dateTime="2026-10-16">2026-10-16</time>
							</p>
						</CardHeader>
						<CardContent>
							<p className="text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
								This stream starts at launch and is not backfilled. First
								entries will be the Kern 0.1.0 and Axis 0.1.0 release notes, a
								governance note, and a security-policy note. The hub goes live
								only with Kern and Axis 0.1.0, never before.
							</p>
						</CardContent>
					</Card>
				</article>
			</div>
		</div>
	);
}
