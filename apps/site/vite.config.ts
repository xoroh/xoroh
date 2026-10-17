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

// Mirrors the Kern site recipe (kern/apps/site/vite.config.ts): TanStack
// Start + Tailwind v4 on Cloudflare Workers via wrangler. The hub needs no
// react-native-web alias — unlike Kern it renders no native previews.
const config = defineConfig({
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
		copySearchIndex(),
	],
});

export default config;
