// Hub site checks: copy rules, dead-link rules, registry wiring, and
// search-index freshness.
// Dependency-free, following the scripts/check-*.mjs convention.
// Run: bun run check:site
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "apps", "site");
const routes = join(site, "src", "routes");
const errors = [];
const check = (cond, msg) => {
	if (!cond) errors.push(msg);
};
// Normalize whitespace: Biome reflows JSX text, so copy assertions match
// on words rather than line breaks.
const norm = (s) => String(s).replace(/\s+/g, " ");

const routeFiles = {
	"/": "index.tsx",
	"/projects": "projects.tsx",
	"/projects/kern": "projects.kern.tsx",
	"/projects/axis": "projects.axis.tsx",
	"/maturity": "maturity.tsx",
	"/governance": "governance.tsx",
	"/contributing": "contributing.tsx",
	"/security": "security.tsx",
	"/brand": "brand.tsx",
	"/docs": "docs.tsx",
	"/news": "news.tsx",
};

const sources = {};
for (const [path, name] of Object.entries(routeFiles)) {
	const file = join(routes, name);
	check(existsSync(file), `route missing for ${path}: ${name}`);
	if (existsSync(file)) sources[name] = norm(readFileSync(file, "utf8"));
}
const index = sources["index.tsx"] ?? "";

const searchIndex = JSON.parse(
	readFileSync(join(site, "search-index.json"), "utf8"),
);
const registry = JSON.parse(readFileSync(join(root, "projects.json"), "utf8"));
const llms = norm(readFileSync(join(site, "public", "llms.txt"), "utf8"));

// Banned everywhere: stale domain, wrong product noun, renamed package
// (kern-material-3 -> kern-m3 is a decided hard cut, no compat name), and
// trademark symbols (provisional plain-text wordmark only, O-8).
for (const [name, text] of Object.entries(sources)) {
	check(!text.includes("ui.xoroh.org"), `${name}: must not link ui.xoroh.org`);
	check(!text.includes("Xoroh OSS"), `${name}: no product called "Xoroh OSS"`);
	check(
		!text.includes("kern-material-3"),
		`${name}: renamed to kern-m3, no compat name (kern 010/020)`,
	);
	check(!text.includes("™"), `${name}: no trademark symbols (O-8)`);
	check(!text.includes("®"), `${name}: no trademark symbols (O-8)`);
}

// Required home copy (VISION + O-1..O-8).
for (const s of [
	"One foundation. Every design system.",
	"https://kern.xoroh.org",
	"https://github.com/xoroh/axis",
	"Available at release",
	"@xoroh/kern-m3",
	"Axis never depends on Kern",
	"Target maturity at 0.1.0: Incubating",
	"Target maturity at 0.1.0: Sandbox",
	"conduct@xoroh.org",
	"https://xoroh.com",
	"xoroh.app",
	"xoroh.dev",
	"provisional plain-text wordmark",
	'to="/news"',
]) {
	check(index.includes(s), `index.tsx: missing required copy: ${s}`);
}

// New IA pages carry their decided copy.
const requiredByRoute = {
	"projects.tsx": ["projects.json", '"/projects/kern"', '"/projects/axis"'],
	"projects.kern.tsx": [
		"One foundation. Every design system.",
		"Available at release",
		"@xoroh/kern-m3",
		"https://kern.xoroh.org",
	],
	"projects.axis.tsx": [
		"Axis never depends on Kern",
		"Available at release",
		"@xoroh/axis",
		"axis repo docs tree",
	],
	"maturity.tsx": ["Sandbox", "Incubating", "Graduated", "Archived"],
	"governance.tsx": ["docs/adr", "conduct@xoroh.org"],
	"contributing.tsx": ["Bun 1.4.2", "CONTRIBUTING.md"],
	"security.tsx": ["GitHub Security Advisories", "SECURITY.md"],
	"brand.tsx": ["provisional plain-text wordmark", "kern.xoroh.org"],
	"docs.tsx": ["kern.xoroh.org", "axis repo docs tree", "search-index.json"],
};
for (const [name, snippets] of Object.entries(requiredByRoute)) {
	for (const s of snippets) {
		check(
			(sources[name] ?? "").includes(s),
			`${name}: missing required copy: ${s}`,
		);
	}
}

// Every route declares its canonical link.
for (const [path, name] of Object.entries(routeFiles)) {
	const canonical = `https://xoroh.org${path === "/" ? "/" : path}`;
	check(
		(sources[name] ?? "").includes(canonical),
		`${name}: missing canonical link ${canonical}`,
	);
}

// Project pages are driven by the registry: detail routes import the data
// module, and the registry uses the decided kern-m3 name.
for (const name of ["projects.tsx", "projects.kern.tsx", "projects.axis.tsx"]) {
	check(
		(sources[name] ?? "").includes("#/data/projects"),
		`${name}: must render from the registry data module`,
	);
}
check(
	!JSON.stringify(registry).includes("kern-material-3"),
	"projects.json: renamed to kern-m3, no compat name (kern 010/020)",
);
for (const name of ["kern", "axis"]) {
	check(
		registry.projects.some((p) => p.name === name),
		`projects.json: missing project entry: ${name}`,
	);
}

// llms.txt maps the full IA.
for (const s of [
	"https://xoroh.org/projects",
	"https://xoroh.org/projects/kern",
	"https://xoroh.org/projects/axis",
	"https://xoroh.org/maturity",
	"https://xoroh.org/governance",
	"https://xoroh.org/contributing",
	"https://xoroh.org/security",
	"https://xoroh.org/brand",
	"https://xoroh.org/docs",
	"https://xoroh.org/news",
	"projects.json",
	"Available at release (0.1.0)",
]) {
	check(llms.includes(s), `llms.txt: missing required entry: ${s}`);
}

// Search index: entries resolve to real routes and in-page anchors.
check(
	Array.isArray(searchIndex.entries) && searchIndex.entries.length > 0,
	"search-index.json: needs at least one entry",
);
const routeForPath = Object.fromEntries(
	Object.entries(routeFiles).map(([path, name]) => [path, join(routes, name)]),
);
for (const entry of searchIndex.entries ?? []) {
	check(
		typeof entry.title === "string" && entry.title.length > 0,
		`search-index.json: entry missing title (${entry.url})`,
	);
	check(
		typeof entry.url === "string" && entry.url.length > 0,
		"search-index.json: entry missing url",
	);
	check(
		Array.isArray(entry.keywords) && entry.keywords.length > 0,
		`search-index.json: entry missing keywords (${entry.url})`,
	);
	const [path, fragment] = String(entry.url).split("#");
	const page = routeForPath[path];
	check(
		typeof page === "string" && existsSync(page),
		`search-index.json: route missing for ${entry.url}`,
	);
	if (fragment && page && existsSync(page)) {
		const source = norm(readFileSync(page, "utf8"));
		check(
			source.includes(`id="${fragment}"`),
			`search-index.json: anchor #${fragment} missing for ${entry.url}`,
		);
	}
}
// The full IA is indexed: one entry per route path.
for (const path of Object.keys(routeForPath)) {
	check(
		(searchIndex.entries ?? []).some(
			(e) => String(e.url).split("#")[0] === path,
		),
		`search-index.json: no entry for route ${path}`,
	);
}

if (errors.length > 0) {
	for (const e of errors) console.error(`check:site: ${e}`);
	process.exit(1);
}
console.log("check:site: ok");
