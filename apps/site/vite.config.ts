import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The hand-maintained search index lives at apps/site/search-index.json
// (per the JSON-index decision), but only public/ files are copied to dist.
// Copy it into the client output so the /search-index.json links in the
// docs page and llms.txt resolve in the built site.
function copySearchIndex() {
	return {
		name: "xoroh-search-index",
		writeBundle() {
			mkdirSync(join("dist", "client"), { recursive: true });
			copyFileSync(
				"search-index.json",
				join("dist", "client", "search-index.json"),
			);
		},
	};
}

// Split the framework out of the app entry. React + TanStack Start/Router
// are ~95% of the initial payload and change only when the lockfile does;
// keeping them out of `index` makes the entry a few kB of app shell, lets
// both chunks cache independently, and lets the browser parse them in
// parallel instead of one long task on a mobile CPU.
// Vite 8 bundles with rolldown, so this uses `output.codeSplitting.groups`.
// The legacy rollup `manualChunks` option is ignored by rolldown, and the
// regex form of `test` did not match bun's store layout here, so `test` is
// a plain predicate over the module id. Both id shapes are handled: bun's
// store (`node_modules/.bun/<pkg>@<version>/node_modules/<pkg>/…`) and the
// flat shape (`node_modules/<pkg>/…`).
const TANSTACK_DEP = /node_modules\/(?:\.bun\/)?@tanstack[+/][^/]+/;
const REACT_DEP =
	/node_modules\/(?:\.bun\/)?(?:react-dom|react|scheduler|use-sync-external-store)(?:@[^/]*|\/)/;

function vendorGroup(id: string): string | null {
	const path = id.replace(/\\/g, "/");
	if (!path.includes("node_modules")) return null;
	if (TANSTACK_DEP.test(path)) return "vendor-tanstack";
	if (REACT_DEP.test(path)) return "vendor-react";
	return null;
}

const CLIENT_VENDOR_CHUNKS = [
	{
		name: vendorGroup,
		debugName: "vendor-chunks",
		test: (id: string) => vendorGroup(id) !== null,
		priority: 10,
	},
];

// Mirrors the Kern site recipe (kern/apps/site/vite.config.ts): TanStack
// Start + Tailwind v4 on Cloudflare Workers via wrangler. The hub needs no
// react-native-web alias — unlike Kern it renders no native previews.
const config = defineConfig({
	build: {
		manifest: true,
		sourcemap: process.env.BUNDLE_MAP === "1",
		rollupOptions: {
			output: { codeSplitting: { groups: CLIENT_VENDOR_CHUNKS } },
		},
	},
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				crawlLinks: true,
				failOnError: true,
			},
		}),
		viteReact(),
		copySearchIndex(),
	],
});

export default config;
