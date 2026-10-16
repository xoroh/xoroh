// Hub project data, driven by the repo-root project registry.
// Every project fact rendered by /projects and its detail pages comes from
// projects.json. Two overlays stay explicit (never silent defaults):
// - Target maturity at 0.1.0 comes from docs/VISION.md + docs/decisions
//   o-3-maturity-ladder.md. The registry still records "tbd-owner-input",
//   so the hub shows decided targets as targets, never as earned stages.
// - Docs links for Kern/Axis: the registry docs_url fields are still
//   "tbd-owner-input", so the hub uses the decided links (Kern site;
//   Axis repo docs tree; no axis.xoroh.org in v1 per the hub plan).
import registry from "../../../../projects.json";

export interface RegistryPackage {
	name: string;
	private: boolean;
	published: boolean;
}

export interface RegistryProject {
	name: string;
	purpose: string;
	canonical_repo: string;
	default_branch: string;
	status: string;
	maturity: string;
	maintainers: string;
	license: string;
	runtimes: string[];
	platforms: string[];
	packages: RegistryPackage[];
	docs_url: string;
	support_url: string;
	release_policy: string;
	security_reporting: string;
	ecosystem_relations: string[];
}

export const projects: RegistryProject[] = (
	registry as { projects: RegistryProject[] }
).projects;

export function projectByName(name: string): RegistryProject {
	const found = projects.find((p) => p.name === name);
	if (!found) throw new Error(`unknown project: ${name}`);
	return found;
}

// Decided target maturity at 0.1.0 (VISION.md + O-3). Shown as a target
// badge until the launch gate clears — never as an earned stage.
export const targetMaturity: Record<string, string> = {
	kern: "Incubating",
	axis: "Sandbox",
};

// Decided docs homes (hub plan corrections): Kern docs live on
// kern.xoroh.org; Axis docs live in the axis repo docs tree.
export function docsLinkFor(project: RegistryProject): string {
	if (project.name === "kern") return "https://kern.xoroh.org";
	if (project.name === "axis")
		return "https://github.com/xoroh/axis/tree/development/docs";
	return project.docs_url;
}

// Launch-track projects with full hub detail pages. The remaining registry
// entries are listed on /projects as compact rows.
export const featuredProjects = ["kern", "axis"];
