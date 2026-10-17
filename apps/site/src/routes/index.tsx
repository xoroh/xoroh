import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { InstallBlock } from "../components/install-block";
import { MaturityBadge } from "../components/project-card";
import { pageHead } from "../components/seo";
import { docsLinkFor, featuredProjects, projectByName } from "../data/projects";
import { Button } from "../kern/button";
import { Card, CardActions, CardContent, CardHeader } from "../kern/card";
import { Chip } from "../kern/chip";
import { Hero } from "../kern-pending/Hero/hero";
import { Slider } from "../kern-pending/Slider/slider";
import { Switch } from "../kern-pending/Switch/switch";

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
	const [tone, setTone] = useState<"violet" | "rose">("violet");
	const [darkPreview, setDarkPreview] = useState(false);
	const [enabled, setEnabled] = useState(true);
	const [elevation, setElevation] = useState(2);
	const [added, setAdded] = useState(false);
	const shadows = [
		"shadow-(--sys-elevation-level0)",
		"shadow-(--sys-elevation-level1)",
		"shadow-(--sys-elevation-level2)",
		"shadow-(--sys-elevation-level3)",
		"shadow-(--sys-elevation-level4)",
		"shadow-(--sys-elevation-level5)",
	];

	return (
		<div className="showcase-wrap">
			<div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
				<p className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) tracking-[0.08em] text-(--sys-color-on-surface-variant)">
					A SMALL TASTE OF KERN
				</p>
				<div className="flex items-center gap-1 rounded-full bg-(--sys-color-surface-container) p-1">
					<Chip
						variant="filter"
						value={tone === "violet"}
						onValueChange={(selected) => selected && setTone("violet")}
						className="h-8 px-3"
					>
						Violet
					</Chip>
					<Chip
						variant="filter"
						value={tone === "rose"}
						onValueChange={(selected) => selected && setTone("rose")}
						className="h-8 px-3"
					>
						Rose
					</Chip>
				</div>
			</div>
			<Card
				variant="elevated"
				data-tone={tone}
				className={`showcase-card ${darkPreview ? "dark" : ""} ${shadows[elevation]}`}
			>
				<CardHeader className="gap-3 p-5 pb-0 sm:p-6 sm:pb-0">
					<div className="flex items-center justify-between gap-3">
						<p className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) text-(--sys-color-on-surface-variant)">
							COMPONENT PLAYGROUND
						</p>
						<div className="flex items-center gap-2 text-(length:--sys-typescale-label-large-font-size) text-(--sys-color-on-surface-variant)">
							<span>Dark</span>
							<Switch
								label="Dark preview theme"
								checked={darkPreview}
								onCheckedChange={setDarkPreview}
							/>
						</div>
					</div>
					<h2 className="font-(--sys-typescale-title-large-font-weight) text-(length:--sys-typescale-title-large-font-size) text-(--sys-color-on-surface)">
						Material, made adaptable.
					</h2>
				</CardHeader>
				<CardContent className="space-y-5 p-5 sm:p-6">
					<div className="showcase-stage rounded-[1.5rem] bg-(--sys-color-surface-container) p-4 sm:p-5">
						<div className="flex flex-wrap items-center justify-between gap-4">
							<div>
								<p className="text-(length:--sys-typescale-title-medium-font-size) font-(--sys-typescale-title-medium-font-weight) text-(--sys-color-on-surface)">
									{enabled ? "Your system, in motion" : "A canvas for ideas"}
								</p>
								<p className="mt-1 text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
									Change a control. Feel the system respond.
								</p>
							</div>
							<Switch
								label="Enable live preview"
								checked={enabled}
								onCheckedChange={setEnabled}
							/>
						</div>
						<div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
							<label className="block min-w-0">
								<span className="mb-1 block text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) text-(--sys-color-on-surface)">
									Surface elevation <output>{elevation}</output>
								</span>
								<Slider
									label="Surface elevation"
									min={1}
									max={5}
									value={elevation}
									onValueChange={setElevation}
								/>
							</label>
							<Button
								variant="primary"
								size="lg"
								shape="rounded"
								className="size-14 px-0 shadow-(--sys-elevation-level3)"
								aria-label={added ? "Component added" : "Add component"}
								onClick={() => setAdded((value) => !value)}
							>
								<span aria-hidden="true">{added ? "✓" : "+"}</span>
							</Button>
						</div>
						<div className="mt-4 flex flex-wrap items-center gap-2">
							<Chip variant="assist" elevated>
								Material 3
							</Chip>
							<Chip variant="suggestion">Responsive</Chip>
							<Chip variant="suggestion">Token-led</Chip>
						</div>
						<p aria-live="polite" className="sr-only">
							{added ? "Component added to your preview." : "Preview ready."}
						</p>
					</div>
					<pre className="showcase-code whitespace-pre-wrap break-words rounded-2xl bg-(--sys-color-inverse-surface) p-4 text-(length:--sys-typescale-body-medium-font-size) leading-relaxed text-(--sys-color-inverse-on-surface)">
						<code>
							<span className="text-(--sys-color-inverse-primary)">
								&lt;Button
							</span>{" "}
							<span className="text-(--sys-color-inverse-primary)">
								variant
							</span>
							=
							<span className="text-(--sys-color-inverse-primary)">
								"primary"
							</span>
							&gt;Build with Kern&lt;/Button&gt;
						</code>
					</pre>
				</CardContent>
			</Card>
		</div>
	);
}

function ProjectFeature({ name, index }: { name: string; index: number }) {
	const project = projectByName(name);
	const kern = name === "kern";
	const install = kern
		? "bun add @xoroh/kern @xoroh/kern-tokens @xoroh/kern-m3"
		: "bun add @xoroh/axis";
	return (
		<Card variant="elevated" className="project-feature-card group">
			<div className={`project-art project-art-${index}`} aria-hidden="true">
				<span className="project-art-mark">{kern ? "K" : "A"}</span>
				<span className="project-art-caption">
					{kern ? "DESIGN SYSTEM" : "NATIVE PRIMITIVES"}
				</span>
			</div>
			<CardHeader className="gap-3 px-6 pt-6">
				<div className="flex flex-wrap items-center gap-3">
					<h3 className="font-(--sys-typescale-headline-small-font-weight) text-(length:--sys-typescale-headline-small-font-size) text-(--sys-color-on-surface)">
						{kern ? "Kern" : "Axis"}
					</h3>
					<MaturityBadge stage={kern ? "Incubating" : "Sandbox"} />
				</div>
				<p className="text-(length:--sys-typescale-title-medium-font-size) font-(--sys-typescale-title-medium-font-weight) text-(--sys-color-on-surface)">
					{kern
						? "A foundation for every design system."
						: "Accessible behavior, without visual opinion."}
				</p>
			</CardHeader>
			<CardContent className="space-y-4 px-6">
				<p className="text-(length:--sys-typescale-body-large-font-size) leading-(--sys-typescale-body-large-line-height) text-(--sys-color-on-surface-variant)">
					{project.purpose}
				</p>
				<InstallBlock command={install} />
				<p className="text-(length:--sys-typescale-body-medium-font-size) text-(--sys-color-on-surface-variant)">
					Available at release (0.1.0) · {project.license} · Target maturity
				</p>
			</CardContent>
			<CardActions className="justify-start px-5 pb-5">
				<Button variant="tonal" href={`/projects/${name}`}>
					{kern ? "Kern overview" : "Axis overview"}
				</Button>
				<Button variant="ghost" href={project.canonical_repo}>
					Repository
				</Button>
				<Button variant="ghost" href={docsLinkFor(project)}>
					Docs
				</Button>
			</CardActions>
		</Card>
	);
}

// Hub pages beyond the two projects: the governance surface of the hub.
// Facts mirror VISION.md and decisions O-3..O-8 — check-site.mjs enforces
// the copy that must not drift.
const HUB_CARDS = [
	{
		kicker: "THE LADDER",
		title: "Maturity",
		body: "A CNCF-style ladder — Sandbox, Incubating, Graduated, Archived — so adoption risk is legible at a glance.",
		to: "/maturity",
		link: "See the ladder",
	},
	{
		kicker: "DECISIONS",
		title: "Governance",
		body: "How decisions get made: architecture decision records for the ecosystem and dated records for the hub itself.",
		to: "/governance",
		link: "How decisions work",
	},
	{
		kicker: "TRUST",
		title: "Security",
		body: "Private reporting through GitHub Security Advisories, per project, with the policy that coordinates a fix.",
		to: "/security",
		link: "Report securely",
	},
	{
		kicker: "CONTRIBUTE",
		title: "Contributing",
		body: "The checks every hub pull request runs, what belongs here, and what stays out of scope.",
		to: "/contributing",
		link: "Start contributing",
	},
	{
		kicker: "IDENTITY",
		title: "Brand",
		body: "The provisional plain-text wordmark, naming rules, and where every xoroh domain points.",
		to: "/brand",
		link: "Brand and domains",
	},
	{
		kicker: "REFERENCE",
		title: "Docs",
		body: "Product docs stay with their projects: Kern on kern.xoroh.org, Axis in its repository.",
		to: "/docs",
		link: "Find the docs",
	},
	{
		kicker: "SINGLE STREAM",
		title: "News",
		body: "One stream for releases, governance notes, and security notes — nothing is announced twice.",
		to: "/news",
		link: "Read the stream",
	},
] as const;

function Home() {
	return (
		<div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
			<Hero
				id="hub-hero"
				eyebrow="Kern · Material Design 3 · Open source"
				title="One foundation. Every design system."
				lede={
					<>
						Kern gives teams a durable, token-led foundation for building
						products that feel unmistakably their own. Start with Material 3;
						carry the system across platforms.
						<br />
						<br />
						The Xoroh open-source hub is separate from commercial SaaS at{" "}
						<a
							href="https://xoroh.com"
							className="text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
						>
							xoroh.com
						</a>
						.
					</>
				}
				actions={
					<>
						<Button variant="primary" href="/projects/kern">
							Get started with Kern
						</Button>
						<Button variant="outlined" href="/projects/axis">
							Explore Axis
						</Button>
					</>
				}
				art={<HeroArt />}
			/>

			<section
				aria-labelledby="projects-title"
				className="home-section mt-24 sm:mt-32"
			>
				<div className="section-heading flex flex-wrap items-end justify-between gap-5">
					<div>
						<p className="section-kicker">THE OPEN-SOURCE TOOLKIT</p>
						<h2 id="projects-title" className="section-title">
							Two foundations. One ecosystem.
						</h2>
						<p className="mt-3 max-w-2xl text-(length:--sys-typescale-body-large-font-size) leading-(--sys-typescale-body-large-line-height) text-(--sys-color-on-surface-variant)">
							Start with the design system. Add unstyled native behavior when
							you need it.
						</p>
					</div>
					<Button variant="ghost" href="/projects">
						All projects
					</Button>
				</div>
				<div className="mt-9 grid gap-6 lg:grid-cols-2">
					{featuredProjects.map((name, index) => (
						<ProjectFeature key={name} name={name} index={index} />
					))}
				</div>
			</section>

			<section
				aria-labelledby="hub-title"
				className="home-section mt-24 sm:mt-32"
			>
				<div className="section-heading">
					<p className="section-kicker">BEYOND THE PROJECTS</p>
					<h2 id="hub-title" className="section-title">
						The hub is a project too.
					</h2>
					<p className="mt-3 max-w-2xl text-(length:--sys-typescale-body-large-font-size) leading-(--sys-typescale-body-large-line-height) text-(--sys-color-on-surface-variant)">
						Governance, maturity, security, and identity are published the same
						way the code is: in the open, versioned, and reviewable.
					</p>
				</div>
				<ul className="hub-grid mt-9">
					{HUB_CARDS.map((card) => (
						<li key={card.to} className="h-full">
							<Card variant="outlined" className="hub-card h-full">
								<CardHeader className="gap-2 p-5 pb-0 sm:p-6 sm:pb-0">
									<p className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) tracking-[0.12em] text-(--sys-color-primary)">
										{card.kicker}
									</p>
									<h3 className="font-(--sys-typescale-title-large-font-weight) text-(length:--sys-typescale-title-large-font-size) text-(--sys-color-on-surface)">
										{card.title}
									</h3>
								</CardHeader>
								<CardContent className="p-5 pt-3 sm:p-6 sm:pt-3">
									<p className="text-(length:--sys-typescale-body-medium-font-size) leading-(--sys-typescale-body-medium-line-height) text-(--sys-color-on-surface-variant)">
										{card.body}
									</p>
								</CardContent>
								<CardActions className="mt-auto justify-start px-5 pb-5 sm:px-6">
									<Button variant="ghost" href={card.to}>
										{card.link}
									</Button>
								</CardActions>
							</Card>
						</li>
					))}
					<li className="h-full sm:col-span-2 lg:col-span-2">
						<Card variant="filled" className="hub-card hub-contact h-full">
							<CardHeader className="gap-2 p-5 pb-0 sm:p-6 sm:pb-0">
								<p className="text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) tracking-[0.12em] text-(--sys-color-primary)">
									TALK TO THE OWNERS
								</p>
								<h3 className="font-(--sys-typescale-title-large-font-weight) text-(length:--sys-typescale-title-large-font-size) text-(--sys-color-on-surface)">
									Contact
								</h3>
								<p className="max-w-prose text-(length:--sys-typescale-body-medium-font-size) leading-(--sys-typescale-body-medium-line-height) text-(--sys-color-on-surface-variant)">
									Questions, proposals, and conduct reports reach the hub owners
									directly. Bugs and ideas are public work; conduct matters are
									not.
								</p>
							</CardHeader>
							<CardContent className="grid gap-3 p-5 pt-4 sm:grid-cols-3 sm:p-6 sm:pt-4">
								<a
									href="https://github.com/xoroh/xoroh/issues"
									className="hub-contact-link"
								>
									<span className="hub-contact-label">Bugs and ideas</span>
									<span className="hub-contact-detail">
										GitHub issues, in the open
									</span>
								</a>
								<a href="mailto:conduct@xoroh.org" className="hub-contact-link">
									<span className="hub-contact-label">Code of conduct</span>
									<span className="hub-contact-detail">
										conduct@xoroh.org, private
									</span>
								</a>
								<a href="https://github.com/xoroh" className="hub-contact-link">
									<span className="hub-contact-label">The organization</span>
									<span className="hub-contact-detail">github.com/xoroh</span>
								</a>
							</CardContent>
						</Card>
					</li>
				</ul>
			</section>
		</div>
	);
}
