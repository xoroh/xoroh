import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";

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
		<main>
			<h1>No such page</h1>
			<p>
				This hub keeps a small page set on purpose: <Link to="/">home</Link>,{" "}
				<Link to="/projects">projects</Link>,{" "}
				<Link to="/maturity">maturity</Link>,{" "}
				<Link to="/governance">governance</Link>,{" "}
				<Link to="/contributing">contributing</Link>,{" "}
				<Link to="/security">security</Link>, <Link to="/brand">brand</Link>,{" "}
				<Link to="/docs">docs</Link>, and <Link to="/news">news</Link>.
			</p>
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
				<header>
					<nav aria-label="Hub">
						<Link to="/">Xoroh</Link> · <Link to="/projects">Projects</Link> ·{" "}
						<Link to="/maturity">Maturity</Link> ·{" "}
						<Link to="/governance">Governance</Link> ·{" "}
						<Link to="/contributing">Contributing</Link> ·{" "}
						<Link to="/security">Security</Link> ·{" "}
						<Link to="/brand">Brand</Link> · <Link to="/docs">Docs</Link> ·{" "}
						<Link to="/news">News</Link>
					</nav>
				</header>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
