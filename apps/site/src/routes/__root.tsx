import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { SiteFooter } from "../kern-pending/site-footer";
import { TopBar } from "../kern-pending/top-bar";
import { COLOR_SCHEME_INIT } from "../kern-pending/use-color-scheme";
import appCss from "../styles.css?url";

const SITE_DESCRIPTION =
	"The open-source hub of Xoroh: Kern and Axis projects, maturity, governance, contributing, security, brand, docs, and news.";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				name: "description",
				content: SITE_DESCRIPTION,
			},
			{
				name: "theme-color",
				content: "#6750a4",
			},
			{
				property: "og:site_name",
				content: "Xoroh open-source hub",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				name: "twitter:card",
				content: "summary",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg",
			},
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function NotFound() {
	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
			<h1 className="text-[clamp(2rem,4.5vw,2.75rem)] [font-family:var(--sys-typescale-headline-large-font-family)] text-(--sys-color-on-surface)">
				No such page
			</h1>
			<p className="hub-prose mt-4">
				This hub keeps a small page set on purpose. Start from{" "}
				<Link to="/">home</Link> or pick a section:{" "}
				<Link to="/projects">projects</Link>,{" "}
				<Link to="/maturity">maturity</Link>,{" "}
				<Link to="/governance">governance</Link>,{" "}
				<Link to="/contributing">contributing</Link>,{" "}
				<Link to="/security">security</Link>, <Link to="/brand">brand</Link>,{" "}
				<Link to="/docs">docs</Link>, and <Link to="/news">news</Link>.
			</p>
		</div>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static first-paint theme init string, no interpolation */}
				<script dangerouslySetInnerHTML={{ __html: COLOR_SCHEME_INIT }} />
				<HeadContent />
			</head>
			<body>
				<a href="#main-content" className="skip-link">
					Skip to main content
				</a>
				<TopBar />
				<main id="main-content" tabIndex={-1} className="outline-none">
					{children}
				</main>
				<SiteFooter />
				<Scripts />
			</body>
		</html>
	);
}
