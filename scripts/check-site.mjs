// Hub site checks: copy rules, dead-link rules, and search-index freshness.
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

// TanStack Start sources (O-1 port): routes carry the hub copy that the
// static scaffold kept in index.html / news.html.
const index = readFileSync(join(routes, "index.tsx"), "utf8");
const news = readFileSync(join(routes, "news.tsx"), "utf8");
const searchIndex = JSON.parse(
	readFileSync(join(site, "search-index.json"), "utf8"),
);

// Route file backing each search-index URL path.
const routeForPath = {
	"/": join(routes, "index.tsx"),
	"/news": join(routes, "news.tsx"),
};

// Banned: stale domain, dead routes, wrong product noun.
for (const [name, text] of [
	["index.tsx", index],
	["news.tsx", news],
]) {
	check(!text.includes("ui.xoroh.org"), `${name}: must not link ui.xoroh.org`);
	check(!text.includes('href="/docs"'), `${name}: must not link dead /docs`);
	check(
		!text.includes('href="/projects"'),
		`${name}: must not link dead /projects`,
	);
	check(!text.includes("Xoroh OSS"), `${name}: no product called "Xoroh OSS"`);
	check(
		!text.includes("kern-material-3"),
		`${name}: renamed to kern-m3, no compat name (kern 010/020)`,
	);
}

// Required: canonical copy, links, availability marks, brand table.
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
check(
	index.includes("https://xoroh.org/"),
	"index.tsx: missing canonical link",
);
check(
	news.includes("https://xoroh.org/news"),
	"news.tsx: missing canonical link",
);

// Search index: entries resolve to real routes and in-page anchors.
check(
	Array.isArray(searchIndex.entries) && searchIndex.entries.length > 0,
	"search-index.json: needs at least one entry",
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
		const source = readFileSync(page, "utf8");
		check(
			source.includes(`id="${fragment}"`),
			`search-index.json: anchor #${fragment} missing for ${entry.url}`,
		);
	}
}

if (errors.length > 0) {
	for (const e of errors) console.error(`check:site: ${e}`);
	process.exit(1);
}
console.log("check:site: ok");
