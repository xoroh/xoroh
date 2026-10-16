import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Mirrors the Kern site recipe (kern/apps/site/vite.config.ts): TanStack
// Start + Tailwind v4 on Cloudflare Workers via wrangler. The hub needs no
// react-native-web alias — unlike Kern it renders no native previews.
const config = defineConfig({
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
});

export default config;
