// Site data tests: search-index.json shape and anchor resolution.
// Run: bun test
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const site = join(import.meta.dir);
const routes = join(site, "src", "routes");

// TanStack Start routes backing each search-index URL path.
const routeForPath: Record<string, string> = {
	"/": join(routes, "index.tsx"),
	"/news": join(routes, "news.tsx"),
};

function readIndex() {
	return JSON.parse(readFileSync(join(site, "search-index.json"), "utf8"));
}

function sourceFor(url: string): {
	file: string;
	fragment: string | undefined;
} {
	const [path, fragment] = String(url).split("#");
	const file = routeForPath[path];
	return { file, fragment };
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
				const source = readFileSync(file, "utf8");
				expect(source.includes(`id="${fragment}"`)).toBe(true);
			}
		}
	});
});

describe("hub copy rules", () => {
	test("no stale links or product noun", () => {
		for (const name of ["index.tsx", "news.tsx"]) {
			const source = readFileSync(join(routes, name), "utf8");
			expect(source.includes("ui.xoroh.org")).toBe(false);
			expect(source.includes('href="/docs"')).toBe(false);
			expect(source.includes('href="/projects"')).toBe(false);
			expect(source.includes("Xoroh OSS")).toBe(false);
		}
	});

	test("install snippets carry availability marks", () => {
		const source = readFileSync(join(routes, "index.tsx"), "utf8");
		expect(source.includes("Available at release")).toBe(true);
		expect(source.includes("@xoroh/kern-m3")).toBe(true);
		expect(source.includes("kern-material-3")).toBe(false);
		expect(source.includes("@xoroh/axis")).toBe(true);
	});
});
