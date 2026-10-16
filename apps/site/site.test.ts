// Site data tests: search-index.json shape and anchor resolution,
// registry-driven project pages, copy rules, and llms.txt coverage.
// Run: bun test
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const site = join(import.meta.dir);
const routes = join(site, "src", "routes");

// Normalize whitespace: Biome reflows JSX text, so copy assertions match
// on words rather than line breaks.
function read(file: string): string {
	return readFileSync(file, "utf8").replace(/\s+/g, " ");
}

// TanStack Start routes backing each search-index URL path.
const routeForPath: Record<string, string> = {
	"/": join(routes, "index.tsx"),
	"/projects": join(routes, "projects.index.tsx"),
	"/projects/kern": join(routes, "projects.kern.tsx"),
	"/projects/axis": join(routes, "projects.axis.tsx"),
	"/maturity": join(routes, "maturity.tsx"),
	"/governance": join(routes, "governance.tsx"),
	"/contributing": join(routes, "contributing.tsx"),
	"/security": join(routes, "security.tsx"),
	"/brand": join(routes, "brand.tsx"),
	"/docs": join(routes, "docs.tsx"),
	"/news": join(routes, "news.tsx"),
};

function readIndex() {
	return JSON.parse(readFileSync(join(site, "search-index.json"), "utf8"));
}

function readRegistry() {
	return JSON.parse(
		readFileSync(join(site, "..", "..", "projects.json"), "utf8"),
	);
}

function sourceFor(url: string): {
	file: string;
	fragment: string | undefined;
} {
	const [path, fragment] = String(url).split("#");
	const file = routeForPath[path];
	return { file, fragment };
}

function allSources(): [string, string][] {
	return Object.values(routeForPath).map((file) => [
		file.split("/").pop() ?? file,
		read(file),
	]);
}

describe("search-index.json", () => {
	test("parses and has entries", () => {
		const data = readIndex();
		expect(Array.isArray(data.entries)).toBe(true);
		expect(data.entries.length).toBeGreaterThan(0);
	});

	test("entries have title, url, and keywords", () => {
		for (const entry of readIndex().entries) {
			expect(typeof entry.title).toBe("string");
			expect(entry.title.length).toBeGreaterThan(0);
			expect(typeof entry.url).toBe("string");
			expect(entry.url.length).toBeGreaterThan(0);
			expect(Array.isArray(entry.keywords)).toBe(true);
			expect(entry.keywords.length).toBeGreaterThan(0);
		}
	});

	test("urls have no duplicates", () => {
		const urls = readIndex().entries.map((e: { url: string }) => e.url);
		expect(new Set(urls).size).toBe(urls.length);
	});

	test("every url resolves to a route and anchor", () => {
		for (const entry of readIndex().entries) {
			const { file, fragment } = sourceFor(entry.url);
			expect(file).toBeDefined();
			expect(existsSync(file)).toBe(true);
			if (fragment) {
				const source = read(file);
				expect(source.includes(`id="${fragment}"`)).toBe(true);
			}
		}
	});

	test("every route path is indexed", () => {
		const paths = new Set(
			readIndex().entries.map(
				(e: { url: string }) => String(e.url).split("#")[0],
			),
		);
		for (const path of Object.keys(routeForPath)) {
			expect(paths.has(path)).toBe(true);
		}
	});
});

describe("shell accessibility", () => {
	test("skip link, labelled nav, and footer landmark", () => {
		const shell = read(join(routes, "__root.tsx"));
		for (const s of [
			'href="#main-content"',
			"Skip to main content",
			'aria-label="Primary"',
			"<footer",
			'aria-label="Footer"',
			'id="main-content"',
		]) {
			expect(shell.includes(s)).toBe(true);
		}
	});

	test("every route renders the skip-link target", () => {
		for (const file of Object.values(routeForPath)) {
			expect(read(file).includes('id="main-content"')).toBe(true);
		}
	});
});

describe("route metadata", () => {
	const canonicalFor = (path: string) =>
		`https://xoroh.org${path === "/" ? "/" : path}`;

	test("titles are unique and non-empty", () => {
		const titles = new Set<string>();
		for (const file of Object.values(routeForPath)) {
			const title = /title: "([^"]+)"/.exec(read(file))?.[1] ?? "";
			expect(title.length).toBeGreaterThan(0);
			expect(titles.has(title)).toBe(false);
			titles.add(title);
		}
	});

	test("every route declares description, OG, Twitter, and canonical", () => {
		for (const [path, file] of Object.entries(routeForPath)) {
			const source = read(file);
			const canonical = canonicalFor(path);
			for (const s of [
				'name: "description"',
				'property: "og:title"',
				'property: "og:description"',
				`property: "og:url", content: "${canonical}"`,
				'name: "twitter:card"',
				'name: "twitter:title"',
				'name: "twitter:description"',
				canonical,
			]) {
				expect(source.includes(s)).toBe(true);
			}
		}
	});
});

describe("sitemap and robots", () => {
	test("robots.txt allows crawling and points at the apex sitemap", () => {
		const robots = readFileSync(join(site, "public", "robots.txt"), "utf8");
		for (const s of [
			"User-agent: *",
			"Allow: /",
			"Sitemap: https://xoroh.org/sitemap.xml",
		]) {
			expect(robots.includes(s)).toBe(true);
		}
	});

	test("sitemap.xml lists every route on the apex host", () => {
		const sitemap = readFileSync(join(site, "public", "sitemap.xml"), "utf8");
		for (const path of Object.keys(routeForPath)) {
			expect(
				sitemap.includes(
					`<loc>https://xoroh.org${path === "/" ? "/" : path}</loc>`,
				),
			).toBe(true);
		}
	});
});

describe("hub copy rules", () => {
	test("no stale links, compat names, product noun, or trademark symbols", () => {
		for (const [, source] of allSources()) {
			expect(source.includes("ui.xoroh.org")).toBe(false);
			expect(source.includes("Xoroh OSS")).toBe(false);
			expect(source.includes("kern-material-3")).toBe(false);
			expect(source.includes("™")).toBe(false);
			expect(source.includes("®")).toBe(false);
		}
	});

	test("install snippets carry availability marks", () => {
		for (const file of [
			routeForPath["/projects/kern"],
			routeForPath["/projects/axis"],
		]) {
			const source = read(file);
			expect(source.includes("Available at release")).toBe(true);
		}
		const kern = read(routeForPath["/projects/kern"]);
		expect(kern.includes("@xoroh/kern-m3")).toBe(true);
		expect(kern.includes("kern-material-3")).toBe(false);
		const axis = read(routeForPath["/projects/axis"]);
		expect(axis.includes("@xoroh/axis")).toBe(true);
		expect(axis.includes("Axis never depends on Kern")).toBe(true);
	});

	test("every route declares its canonical link", () => {
		for (const [path, file] of Object.entries(routeForPath)) {
			const source = read(file);
			expect(source.includes(`https://xoroh.org${path}`)).toBe(true);
		}
	});
});

describe("registry-driven project pages", () => {
	test("registry has kern and axis entries with packages", () => {
		const registry = readRegistry();
		for (const name of ["kern", "axis"]) {
			const project = registry.projects.find(
				(p: { name: string }) => p.name === name,
			);
			expect(project).toBeDefined();
			expect(project.packages.length).toBeGreaterThan(0);
		}
	});

	test("registry uses the decided kern-m3 name", () => {
		const raw = readFileSync(join(site, "..", "..", "projects.json"), "utf8");
		expect(raw.includes("@xoroh/kern-m3")).toBe(true);
		expect(raw.includes("kern-material-3")).toBe(false);
	});

	test("project routes render from the registry data module", () => {
		for (const file of [
			routeForPath["/projects"],
			routeForPath["/projects/kern"],
			routeForPath["/projects/axis"],
		]) {
			expect(read(file).includes("#/data/projects")).toBe(true);
		}
	});

	test("project pages iterate registry packages (no hardcoded lists)", () => {
		for (const file of [
			routeForPath["/projects/kern"],
			routeForPath["/projects/axis"],
		]) {
			expect(read(file).includes("project.packages.map")).toBe(true);
		}
		const full = read(routeForPath["/projects"]);
		expect(full.includes("projects.map")).toBe(true);
	});
});

describe("llms.txt", () => {
	test("maps the full IA and availability marks", () => {
		const llms = read(join(site, "public", "llms.txt"));
		for (const path of Object.keys(routeForPath).filter((p) => p !== "/")) {
			expect(llms.includes(`https://xoroh.org${path}`)).toBe(true);
		}
		expect(llms.includes("projects.json")).toBe(true);
		expect(llms.includes("Available at release (0.1.0)")).toBe(true);
	});
});
