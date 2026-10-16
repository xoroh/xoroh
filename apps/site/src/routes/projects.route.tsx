import { createFileRoute, Outlet } from "@tanstack/react-router";

// Pathless layout for the /projects branch: detail pages
// (/projects/kern, /projects/axis) render only their own component.
// Rendered heads never inherit a parent canonical, so each page emits
// exactly one rel=canonical.
export const Route = createFileRoute("/projects")({
	component: ProjectsLayout,
});

function ProjectsLayout() {
	return <Outlet />;
}
