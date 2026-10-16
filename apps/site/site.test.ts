// Site data tests: search-index.json shape and anchor resolution.
// Run: bun test
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const site = join(import.meta.dir);

function readIndex() {
	return JSON.parse(readFileSync(join(site, "search-index.json"), "utf8"));
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

	test("every url resolves to a page and anchor", () => {
		for (const entry of readIndex().entries) {
			const [file, fragment] = String(entry.url).split("#");
			const page = join(site, file.replace(/^\.\//, ""));
			expect(existsSync(page)).toBe(true);
			if (fragment) {
				const html = readFileSync(page, "utf8");
				expect(html.includes(`id="${fragment}"`)).toBe(true);
			}
		}
	});
});

describe("hub copy rules", () => {
	test("no stale links or product noun", () => {
		for (const name of ["index.html", "news.html"]) {
			const html = readFileSync(join(site, name), "utf8");
			expect(html.includes("ui.xoroh.org")).toBe(false);
			expect(html.includes('href="/docs"')).toBe(false);
			expect(html.includes('href="/projects"')).toBe(false);
			expect(html.includes("Xoroh OSS")).toBe(false);
		}
	});

	test("install snippets carry availability marks", () => {
		const html = readFileSync(join(site, "index.html"), "utf8");
		expect(html.includes("Available at release")).toBe(true);
		expect(html.includes("@xoroh/kern-material-3")).toBe(true);
		expect(html.includes("@xoroh/axis")).toBe(true);
	});
});
