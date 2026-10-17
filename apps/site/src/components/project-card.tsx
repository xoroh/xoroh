// Hub-specific compositions (NOT kern-pending): maturity badges and
// project cards carry hub semantics (target-vs-earned maturity, registry
// facts) that must never move into Kern. They are built strictly from
// Kern foundations — vendored `Card` + M3 color roles, shape, and the
// label-large type slot — so they look native without forking the system.

import type { RegistryProject } from "#/data/projects";
import { docsLinkFor, targetMaturity } from "#/data/projects";
import { Button } from "../kern/button";
import { Card, CardActions, CardContent, CardHeader } from "../kern/card";
import { cn } from "../kern/cn";

const maturityStyles: Record<string, string> = {
	Incubating:
		"bg-(--sys-color-primary-container) text-(--sys-color-on-primary-container)",
	Sandbox:
		"bg-(--sys-color-secondary-container) text-(--sys-color-on-secondary-container)",
	Graduated:
		"bg-(--sys-color-tertiary-container) text-(--sys-color-on-tertiary-container)",
	Archived: "border border-(--sys-color-outline) text-(--sys-color-on-surface)",
};

/** Target-maturity badge. Always qualified with "Target" until the launch
 * gate clears — never an earned stage. */
export function MaturityBadge({ stage }: { stage: string }) {
	return (
		<span
			className={cn(
				"inline-flex min-h-8 items-center rounded-(--sys-shape-corner-small) px-3",
				"text-(length:--sys-typescale-label-large-font-size) leading-(--sys-typescale-label-large-line-height) font-(--sys-typescale-label-large-font-weight)",
				maturityStyles[stage] ??
					"bg-(--sys-color-surface-container-high) text-(--sys-color-on-surface)",
			)}
		>
			Target · {stage}
		</span>
	);
}

export function ProjectCard({ project }: { project: RegistryProject }) {
	const detail =
		project.name === "kern" || project.name === "axis"
			? `/projects/${project.name}`
			: null;
	const title =
		project.name === "kern"
			? "Kern"
			: project.name === "axis"
				? "Axis"
				: project.name;
	return (
		<Card variant="outlined" className="flex h-full flex-col">
			<CardHeader>
				<div className="flex flex-wrap items-center gap-3">
					<h3 className="text-(length:--sys-typescale-title-large-font-size) leading-(--sys-typescale-title-large-line-height) font-(--sys-typescale-title-large-font-weight) text-(--sys-color-on-surface)">
						{title}
					</h3>
					{targetMaturity[project.name] ? (
						<MaturityBadge stage={targetMaturity[project.name]} />
					) : null}
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-(length:--sys-typescale-body-medium-font-size) leading-(--sys-typescale-body-medium-line-height) text-(--sys-color-on-surface-variant)">
					{project.purpose}
				</p>
				<p className="mt-3 text-(length:--sys-typescale-body-small-font-size) leading-(--sys-typescale-body-small-line-height) text-(--sys-color-on-surface-variant)">
					Status: {project.status}. License: {project.license}.
				</p>
			</CardContent>
			<CardActions>
				{detail ? (
					<Button variant="ghost" href={detail}>
						{title} details
					</Button>
				) : null}
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

/** Compact registry row for the full-index table on /projects. */
export function RegistryRow({ project }: { project: RegistryProject }) {
	return (
		<li className="border-b border-(--sys-color-outline-variant) py-4 last:border-b-0">
			<p className="text-(length:--sys-typescale-body-large-font-size) leading-(--sys-typescale-body-large-line-height) text-(--sys-color-on-surface)">
				<strong>{project.name}</strong>
			</p>
			<p className="mt-1 text-(length:--sys-typescale-body-medium-font-size) leading-(--sys-typescale-body-medium-line-height) text-(--sys-color-on-surface-variant)">
				{project.purpose} Status: {project.status}. License: {project.license}.{" "}
				<a
					href={project.canonical_repo}
					className="text-(--sys-color-primary) underline outline-none focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
				>
					Repository
				</a>
			</p>
		</li>
	);
}
