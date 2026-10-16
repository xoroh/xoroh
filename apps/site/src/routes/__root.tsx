import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";

const SITE_DESCRIPTION =
	"The open-source hub of Xoroh: Kern and Axis projects, maturity, governance, contributing, security, brand, docs, and news.";

const NAV_ITEMS = [
	{ to: "/projects", label: "Projects" },
	{ to: "/maturity", label: "Maturity" },
	{ to: "/governance", label: "Governance" },
	{ to: "/contributing", label: "Contributing" },
	{ to: "/security", label: "Security" },
	{ to: "/brand", label: "Brand" },
	{ to: "/docs", label: "Docs" },
	{ to: "/news", label: "News" },
] as const;

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
				content: "#0b0b0c",
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
		<main id="main-content" tabIndex={-1}>
			<h1>No such page</h1>
			<p>
				This hub keeps a small page set on purpose. Start from{" "}
				<Link to="/">home</Link> or pick a section:
			</p>
			<ul>
				<li>
					<Link to="/projects">Projects</Link>
				</li>
				<li>
					<Link to="/maturity">Maturity</Link>
				</li>
				<li>
					<Link to="/governance">Governance</Link>
				</li>
				<li>
					<Link to="/contributing">Contributing</Link>
				</li>
				<li>
					<Link to="/security">Security</Link>
				</li>
				<li>
					<Link to="/brand">Brand</Link>
				</li>
				<li>
					<Link to="/docs">Docs</Link>
				</li>
				<li>
					<Link to="/news">News</Link>
				</li>
			</ul>
		</main>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<a href="#main-content" className="skip-link">
					Skip to main content
				</a>
				<header className="site-header">
					<nav aria-label="Primary" className="site-nav">
						<ul>
							<li>
								<Link
									to="/"
									className="site-brand"
									activeProps={{ "aria-current": "page" }}
								>
									Xoroh
								</Link>
							</li>
							{NAV_ITEMS.map((item) => (
								<li key={item.to}>
									<Link to={item.to} activeProps={{ "aria-current": "page" }}>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</header>
				{children}
				<footer className="site-footer">
					<div className="site-footer-inner">
						<nav aria-label="Footer">
							<ul>
								<li>
									<Link to="/projects">Projects</Link>
								</li>
								<li>
									<Link to="/governance">Governance</Link>
								</li>
								<li>
									<Link to="/contributing">Contributing</Link>
								</li>
								<li>
									<Link to="/security">Security</Link>
								</li>
								<li>
									<Link to="/docs">Docs</Link>
								</li>
								<li>
									<Link to="/news">News</Link>
								</li>
							</ul>
						</nav>
						<p>
							MIT licensed. "Xoroh" is a provisional plain-text wordmark — legal
							name and mark are not final.
						</p>
						<p>
							Contact:{" "}
							<a href="https://github.com/xoroh/xoroh/issues">issues</a> ·{" "}
							<a href="mailto:conduct@xoroh.org">conduct@xoroh.org</a>
						</p>
					</div>
				</footer>
				<Scripts />
			</body>
		</html>
	);
}
