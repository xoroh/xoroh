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

	test("routes centralize heads in pageHead (one call, no own canonical)", () => {
		for (const [, file] of Object.entries(routeForPath)) {
			const source = read(file);
			expect(source.split("pageHead({").length - 1).toBe(1);
			expect(source.includes('rel: "canonical"')).toBe(false);
		}
	});

	test("titles and descriptions are unique and non-empty", () => {
		const titles = new Set<string>();
		for (const [path, file] of Object.entries(routeForPath)) {
			const source = read(file);
			const title = /title: "([^"]+)"/.exec(source)?.[1];
			const desc = /description: "([^"]+)"/.exec(source)?.[1];
			expect(title && title.length > 10).toBe(true);
			expect(desc && desc.length > 20).toBe(true);
			expect(titles.has(title as string)).toBe(false);
			titles.add(title as string);
			expect(source.includes(`path: "${path}"`)).toBe(true);
		}
	});
});

describe("home showcase", () => {
	test("keeps one focused card per project and interactive Kern controls", () => {
		const source = read(routeForPath["/"]);
		expect(source.includes("This panel is the showcase")).toBe(false);
		expect(source.includes('id="hub-pages"')).toBe(false);
		expect(source.includes("Where things live")).toBe(false);
		expect(source.includes("ProjectFeature key={name}")).toBe(true);
		expect(source.includes("<Switch")).toBe(true);
		expect(source.includes("<Slider")).toBe(true);
		expect(source.includes("<Chip")).toBe(true);
		expect(source.includes("setDarkPreview")).toBe(true);
		expect(source.includes('setTone("rose")')).toBe(true);
	});

	test("hub grid links every hub page and fills the contact card", () => {
		const source = read(routeForPath["/"]);
		for (const to of [
			"/maturity",
			"/governance",
			"/security",
			"/contributing",
			"/brand",
			"/docs",
			"/news",
		]) {
			expect(source.includes(`to: "${to}"`)).toBe(true);
		}
		expect(source.includes("hub-grid")).toBe(true);
		expect(source.includes("hub-contact")).toBe(true);
		// Contact must offer all three real paths, not a lone line of copy.
		expect(source.includes("https://github.com/xoroh/xoroh/issues")).toBe(true);
		expect(source.includes("mailto:conduct@xoroh.org")).toBe(true);
		expect(source.includes('href="https://github.com/xoroh"')).toBe(true);
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

	test("Axis docs and default branch use main", () => {
		const registry = readRegistry();
		const axis = registry.projects.find(
			(project: { name: string }) => project.name === "axis",
		);
		expect(axis.default_branch).toBe("main");
		expect(
			read(join(site, "src", "data", "projects.ts")).includes(
				"https://github.com/xoroh/axis/tree/main/docs",
			),
		).toBe(true);
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

describe("seo head helper", () => {
	test("emits one canonical plus OG and Twitter tags", () => {
		const seo = read(join(site, "src", "components", "seo.ts"));
		for (const tag of [
			'rel: "canonical"',
			"og:title",
			"og:description",
			"og:url",
			"og:type",
			"og:site_name",
			"twitter:card",
			"twitter:title",
			"twitter:description",
		]) {
			expect(seo.includes(tag)).toBe(true);
		}
		expect(seo.split('rel: "canonical"').length - 1).toBe(1);
	});

	test("pathless projects layout carries no head", () => {
		const layout = read(join(routes, "projects.route.tsx"));
		expect(layout.includes("pageHead")).toBe(false);
		expect(layout.includes('rel: "canonical"')).toBe(false);
	});
});

describe("shell landmarks and feed files", () => {
	test("root shell has skip link, main landmark, header, nav, and footer", () => {
		const shell = read(join(routes, "__root.tsx"));
		for (const s of [
			'href="#main-content"',
			"skip-link",
			'main id="main-content"',
			"<TopBar",
			"<SiteFooter",
			"COLOR_SCHEME_INIT",
		]) {
			expect(shell.includes(s)).toBe(true);
		}
		const topbar = read(
			join(site, "src", "kern-pending", "TopBar", "top-bar.tsx"),
		);
		expect(topbar.includes("<header")).toBe(true);
		expect(topbar.includes("<nav")).toBe(true);
		const footer = read(
			join(site, "src", "kern-pending", "SiteFooter", "site-footer.tsx"),
		);
		expect(footer.includes("<footer")).toBe(true);
	});

	test("robots.txt and sitemap.xml cover the full IA", () => {
		expect(existsSync(join(site, "public", "robots.txt"))).toBe(true);
		expect(existsSync(join(site, "public", "sitemap.xml"))).toBe(true);
		const robots = read(join(site, "public", "robots.txt"));
		expect(robots.includes("Allow: /")).toBe(true);
		expect(robots.includes("https://xoroh.org/sitemap.xml")).toBe(true);
		const sitemap = read(join(site, "public", "sitemap.xml"));
		for (const path of Object.keys(routeForPath)) {
			expect(sitemap.includes(`<loc>https://xoroh.org${path}</loc>`)).toBe(
				true,
			);
		}
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
