import { createFileRoute, Link } from "@tanstack/react-router";
import { InstallBlock } from "../components/install-block";
import { MaturityBadge, ProjectCard } from "../components/project-card";
import { pageHead } from "../components/seo";
import { featuredProjects, projectByName } from "../data/projects";
import { Button } from "../kern/button";
import { Card, CardActions, CardContent, CardHeader } from "../kern/card";
import { Chip } from "../kern/chip";
import { Hero } from "../kern-pending/hero";

export const Route = createFileRoute("/")({
	head: () =>
		pageHead({
			title: "Xoroh — Open-source hub",
			description:
				"The open-source hub of Xoroh: Kern, the Material 3 design-system platform, and Axis, unstyled native primitives — plus maturity, governance, and docs.",
			path: "/",
		}),
	component: Home,
});

function HeroArt() {
	return (
		<Card variant="elevated" className="shadow-(--sys-elevation-level2)">
			<CardHeader>
				<p className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) tracking-[0.1px] text-(--sys-color-primary)">
					LIVE KERN COMPONENTS
				</p>
				<p className="text-(length:--sys-typescale-title-large-font-size) leading-(--sys-typescale-title-large-line-height) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface)">
					This panel is the showcase
				</p>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap items-center gap-2">
					<Button variant="primary" size="sm" href="/projects/kern">
						Kern details
					</Button>
					<Button variant="outlined" size="sm" href="https://kern.xoroh.org">
						Kern docs
					</Button>
				</div>
				<div className="mt-4 flex flex-wrap items-center gap-2">
					<Chip variant="assist">Material 3</Chip>
					<Chip variant="filter" defaultValue>
						Expressive
					</Chip>
				</div>
			</CardContent>
			<CardActions>
				<Button variant="ghost" href="/maturity">
					How maturity works
				</Button>
			</CardActions>
		</Card>
	);
}

const HUB_PAGES = [
	{
		to: "/governance",
		title: "Governance",
		body: "How decisions get made — ADRs, acceptance, and cadence.",
	},
	{
		to: "/contributing",
		title: "Contributing",
		body: "How to contribute — checks, pull requests, and scope.",
	},
	{
		to: "/security",
		title: "Security",
		body: "How to report a vulnerability — advisories, per project.",
	},
	{
		to: "/brand",
		title: "Brand",
		body: "Provisional wordmark, naming rules, and where things live.",
	},
	{
		to: "/docs",
		title: "Docs",
		body: "Where the docs live — product docs stay with their projects.",
	},
] as const;

function Home() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
			<Hero
				id="hub-hero"
				eyebrow="Open-source hub · 0.1.0 track"
				title="Open source, built on Kern."
				lede={
					<>
						The open-source hub of Xoroh. Commercial SaaS lives at{" "}
						<a
							href="https://xoroh.com"
							className="text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
						>
							xoroh.com
						</a>
						; this site covers community open source only.
					</>
				}
				actions={
					<>
						<Button variant="primary" href="/projects">
							Explore projects
						</Button>
						<Button variant="outlined" href="/maturity">
							How maturity works
						</Button>
					</>
				}
				art={<HeroArt />}
			/>

			<section aria-labelledby="projects-title" className="mt-14">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) tracking-[0.1px] text-(--sys-color-primary)">
							PROJECTS
						</p>
						<h2
							id="projects-title"
							className="mt-1 text-[clamp(1.75rem,3.5vw,2.25rem)] [font-family:var(--sys-typescale-headline-medium-font-family)] text-(--sys-color-on-surface)"
						>
							Two foundations, one hub
						</h2>
					</div>
					<Button variant="ghost" href="/projects">
						Browse the project directory
					</Button>
				</div>
				<div className="mt-6 grid gap-4 md:grid-cols-2">
					{featuredProjects.map((name) => (
						<article key={name} className="h-full">
							<ProjectCard project={projectByName(name)} />
						</article>
					))}
				</div>
				<div className="mt-6">
					<InstallBlock command="bun add @xoroh/kern @xoroh/kern-tokens @xoroh/kern-m3" />
					<p className="mt-2 text-(length:--sys-typescale-body-small-font-size) text-(--sys-color-on-surface-variant)">
						Available at release (0.1.0). Per-system preset plus per-platform
						widgets: <code>@xoroh/kern-m3</code> carries the M3 preset data.
						"Xoroh" is a provisional plain-text wordmark. Maturity badges are
						targets at 0.1.0 — see{" "}
						<Link
							to="/maturity"
							className="text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
						>
							how maturity works
						</Link>
						.
					</p>
				</div>
			</section>

			<section aria-labelledby="kern-axis-title" className="mt-14">
				<h2 id="kern-axis-title" className="sr-only">
					Kern and Axis
				</h2>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<Card variant="filled" id="kern" className="h-full">
						<CardHeader>
							<div className="flex flex-wrap items-center gap-3">
								<h3 className="text-(length:--sys-typescale-title-large-font-size) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface)">
									Kern
								</h3>
								<MaturityBadge stage="Incubating" />
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
								One foundation. Every design system. Material Design 3 is its
								first system. Target maturity at 0.1.0: Incubating.
							</p>
						</CardContent>
						<CardActions>
							<Button variant="ghost" href="/projects/kern">
								Kern details
							</Button>
							<Button variant="ghost" href="https://kern.xoroh.org">
								Kern docs
							</Button>
							<Button variant="ghost" href="https://github.com/xoroh/kern">
								Kern repo
							</Button>
						</CardActions>
					</Card>
					<Card variant="filled" id="axis" className="h-full">
						<CardHeader>
							<div className="flex flex-wrap items-center gap-3">
								<h3 className="text-(length:--sys-typescale-title-large-font-size) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface)">
									Axis
								</h3>
								<MaturityBadge stage="Sandbox" />
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
								Unstyled, accessible behavior primitives for native — the
								counterpart of Base UI for React Native. Usable with or without
								Kern: Axis never depends on Kern. Target maturity at 0.1.0:
								Sandbox.
							</p>
							<div className="mt-3">
								<InstallBlock command="bun add @xoroh/axis" />
								<p className="mt-2 text-(length:--sys-typescale-body-small-font-size) text-(--sys-color-on-surface-variant)">
									Available at release (0.1.0). Peers:{" "}
									<code>react &gt;= 18</code>,{" "}
									<code>react-native &gt;= 0.86 &lt; 0.89</code>.
								</p>
							</div>
						</CardContent>
						<CardActions>
							<Button variant="ghost" href="/projects/axis">
								Axis details
							</Button>
							<Button
								variant="ghost"
								href="https://github.com/xoroh/axis/tree/main/docs"
							>
								Axis docs
							</Button>
							<Button variant="ghost" href="https://github.com/xoroh/axis">
								Axis repo
							</Button>
						</CardActions>
					</Card>
				</div>
			</section>

			<section id="news" aria-labelledby="news-title" className="mt-14">
				<Card variant="outlined">
					<CardHeader>
						<h2
							id="news-title"
							className="text-(length:--sys-typescale-title-large-font-size) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface)"
						>
							News
						</h2>
					</CardHeader>
					<CardContent>
						<p className="text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
							One stream for releases, governance notes, and security notes.{" "}
							<Link
								to="/news"
								className="text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
							>
								Read the news stream
							</Link>
							.
						</p>
					</CardContent>
				</Card>
			</section>

			<section
				id="hub-pages"
				aria-labelledby="hub-pages-title"
				className="mt-14"
			>
				<h2
					id="hub-pages-title"
					className="text-[clamp(1.75rem,3.5vw,2.25rem)] [font-family:var(--sys-typescale-headline-medium-font-family)] text-(--sys-color-on-surface)"
				>
					Hub pages
				</h2>
				<ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{HUB_PAGES.map((page) => (
						<li key={page.to} className="h-full">
							<Card variant="outlined" className="h-full">
								<CardHeader>
									<h3 className="text-(length:--sys-typescale-title-medium-font-size) font-(--sys-typescale-title-medium-font-weight) text-(--sys-color-on-surface)">
										{page.title}
									</h3>
								</CardHeader>
								<CardContent>
									<p className="text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
										{page.body}
									</p>
								</CardContent>
								<CardActions>
									<Button variant="ghost" href={page.to}>
										Open {page.title.toLowerCase()}
									</Button>
								</CardActions>
							</Card>
						</li>
					))}
					<li className="h-full">
						<Card variant="filled" className="h-full">
							<CardHeader>
								<h3 className="text-(length:--sys-typescale-title-medium-font-size) font-(--sys-typescale-title-medium-font-weight) text-(--sys-color-on-surface)">
									Contact
								</h3>
							</CardHeader>
							<CardContent>
								<p className="text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
									Questions and conduct reports reach the hub owners directly.
								</p>
							</CardContent>
							<CardActions>
								<Button
									variant="ghost"
									href="https://github.com/xoroh/xoroh/issues"
								>
									Issues
								</Button>
								<Button variant="ghost" href="mailto:conduct@xoroh.org">
									conduct@xoroh.org
								</Button>
							</CardActions>
						</Card>
					</li>
				</ul>
			</section>

			<section id="domains" aria-labelledby="domains-title" className="mt-14">
				<h2
					id="domains-title"
					className="text-[clamp(1.75rem,3.5vw,2.25rem)] [font-family:var(--sys-typescale-headline-medium-font-family)] text-(--sys-color-on-surface)"
				>
					Where things live
				</h2>
				<Card variant="outlined" className="mt-6">
					<CardContent>
						<ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
							<li className="flex min-h-11 items-center gap-2 text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
								<a
									href="https://xoroh.com"
									className="text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
								>
									xoroh.com
								</a>
								— commercial SaaS
							</li>
							<li className="flex min-h-11 items-center gap-2 text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
								<a
									href="https://xoroh.org"
									className="text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
								>
									xoroh.org
								</a>
								— this open-source hub
							</li>
							<li className="flex min-h-11 items-center gap-2 text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
								<a
									href="https://kern.xoroh.org"
									className="text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
								>
									kern.xoroh.org
								</a>
								— Kern site
							</li>
							<li className="flex min-h-11 items-center text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
								xoroh.app — apps · xoroh.dev — on hold
							</li>
						</ul>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
