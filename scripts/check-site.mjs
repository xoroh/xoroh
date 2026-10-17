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
	"/projects": "projects.index.tsx",
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
for (const snippet of [
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
	check(
		index.includes(snippet),
		`index.tsx: missing required copy: ${snippet}`,
	);
}

// New IA pages carry their decided copy.
const requiredByRoute = {
	"projects.index.tsx": [
		"projects.json",
		'"/projects/kern"',
		'"/projects/axis"',
	],
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
	for (const snippet of snippets) {
		check(
			(sources[name] ?? "").includes(snippet),
			`${name}: missing required copy: ${snippet}`,
		);
	}
}

// Canonicals are centralized in seo.ts: routes must not hardcode their own.
for (const [, name] of Object.entries(routeFiles)) {
	check(
		!(sources[name] ?? "").includes('rel: "canonical"'),
		`${name}: canonicals come from pageHead, not the route`,
	);
}

// Project pages are driven by the registry: detail routes import the data
// module, and the registry uses the decided kern-m3 name.
for (const name of [
	"projects.index.tsx",
	"projects.kern.tsx",
	"projects.axis.tsx",
]) {
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
for (const snippet of [
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
	check(llms.includes(snippet), `llms.txt: missing required entry: ${snippet}`);
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

// Redesign: every route builds its head through the shared helper, so
// each page gets one title + description + OG/Twitter set + canonical.
for (const [, name] of Object.entries(routeFiles)) {
	const source = sources[name] ?? "";
	const uses = source.split("pageHead({").length - 1;
	check(uses === 1, `${name}: must call pageHead exactly once (has ${uses})`);
}
const titles = new Set();
for (const [path, name] of Object.entries(routeFiles)) {
	const source = sources[name] ?? "";
	const title = /title:\s*"([^"]+)"/.exec(source)?.[1];
	const desc = /description:\s*"([^"]+)"/.exec(source)?.[1];
	check(!!title && title.length > 10, `${name}: needs a unique title`);
	check(!!desc && desc.length > 20, `${name}: needs a unique description`);
	if (title) {
		check(!titles.has(title), `${name}: duplicate title ${title}`);
		titles.add(title);
	}
	check(
		source.includes(`path: "${path}"`) ||
			(path === "/" && source.includes('path: "/"')),
		`${name}: pageHead path must be ${path}`,
	);
}
const seo = norm(
	readFileSync(join(site, "src", "components", "seo.ts"), "utf8"),
);
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
	check(seo.includes(tag), `seo.ts: missing ${tag}`);
}
check(
	(seo.match(/rel: "canonical"/g) ?? []).length === 1,
	"seo.ts: must emit exactly one canonical",
);

// Redesign: the pathless projects layout carries no head, so detail pages
// cannot inherit a second canonical.
const layout = norm(readFileSync(join(routes, "projects.route.tsx"), "utf8"));
check(!layout.includes("pageHead"), "projects.route.tsx: must not set a head");
check(
	!layout.includes('rel: "canonical"'),
	"projects.route.tsx: must not set a canonical",
);

// Redesign: shell landmarks, skip link, and theme init live in __root__.
const shell = norm(readFileSync(join(routes, "__root.tsx"), "utf8"));
for (const snippet of [
	'href="#main-content"',
	"skip-link",
	'main id="main-content"',
	"<TopBar",
	"<SiteFooter",
	"COLOR_SCHEME_INIT",
]) {
	check(shell.includes(snippet), `__root__.tsx: missing ${snippet}`);
}
const topbar = norm(
	readFileSync(join(site, "src", "kern-pending", "top-bar.tsx"), "utf8"),
);
for (const snippet of ["<header", "<nav", 'aria-label="Primary"']) {
	check(topbar.includes(snippet), `top-bar.tsx: missing ${snippet}`);
}
const footer = norm(
	readFileSync(join(site, "src", "kern-pending", "site-footer.tsx"), "utf8"),
);
for (const snippet of ["<footer", "<nav"]) {
	check(footer.includes(snippet), `site-footer.tsx: missing ${snippet}`);
}

// Redesign: robots.txt + sitemap.xml cover the full IA.
check(
	existsSync(join(site, "public", "robots.txt")),
	"public/robots.txt missing",
);
check(
	existsSync(join(site, "public", "sitemap.xml")),
	"public/sitemap.xml missing",
);
const robots = norm(readFileSync(join(site, "public", "robots.txt"), "utf8"));
check(robots.includes("Allow: /"), "robots.txt: must allow /");
check(
	robots.includes("https://xoroh.org/sitemap.xml"),
	"robots.txt: must point at the apex sitemap",
);
const sitemap = norm(readFileSync(join(site, "public", "sitemap.xml"), "utf8"));
for (const path of Object.keys(routeFiles)) {
	check(
		sitemap.includes(
			`<loc>https://xoroh.org${path === "/" ? "/" : path}</loc>`,
		),
		`sitemap.xml: missing ${path}`,
	);
}

// Redesign: hermetic build — route, component, and pattern sources must not
// reach outside the repo (the sibling kern checkout is vendored, not linked).
import { readdirSync } from "node:fs";

const ownDirs = ["routes", "components", "kern-pending"].map((d) =>
	join(site, "src", d),
);
for (const dir of ownDirs) {
	for (const file of readdirSync(dir)) {
		if (!/\.(tsx?|css)$/.test(file)) continue;
		const text = readFileSync(join(dir, file), "utf8");
		check(!text.includes("/home/"), `${file}: must not reference host paths`);
		check(
			!text.includes("xoroh-monorepo/kern"),
			`${file}: import from the vendored kern copy, not the sibling checkout`,
		);
	}
}

if (errors.length > 0) {
	for (const e of errors) console.error(`check:site: ${e}`);
	process.exit(1);
}
console.log("check:site: ok");
