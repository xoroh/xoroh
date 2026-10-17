// Shared <head> builder: every route gets a unique title + description,
// OG + Twitter tags, and exactly one apex canonical. Detail routes render
// under a pathless layout (projects.route.tsx) so no parent canonical is
// inherited — one canonical per page, enforced by check-site + site.test.
export function pageHead({
	title,
	description,
	path,
}: {
	title: string;
	description: string;
	path: string;
}) {
	const url = `https://xoroh.org${path}`;
	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: "Xoroh open-source hub" },
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
		],
		links: [{ rel: "canonical", href: url }],
	};
}
