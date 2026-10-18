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

// Move the shared React runtime into its own stable client chunk. Vite 8
// uses Rolldown's `output.codeSplitting.groups`; the legacy Rollup
// `manualChunks` option is ignored. The matcher handles Bun's store and
// flat node_modules paths.
const REACT_DEP =
	/node_modules\/(?:\.bun\/)?(?:react-dom|react|scheduler|use-sync-external-store)(?:@[^/]*|\/)/;

function vendorGroup(id: string): string | null {
	const path = id.replace(/\\/g, "/");
	return path.includes("node_modules") && REACT_DEP.test(path)
		? "vendor-react"
		: null;
}

const CLIENT_VENDOR_CHUNKS = [
	{
		name: vendorGroup,
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
