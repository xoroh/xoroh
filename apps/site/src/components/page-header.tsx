// Page header band: kicker, title, and lede shared by every hub page so
// detail and prose pages read as one site. Type slots and color roles are
// Kern tokens; geometry is local (site composition, not a Kern pattern).
import type { ReactNode } from "react";

export function PageHeader({
	kicker,
	title,
	lede,
	actions,
}: {
	kicker: string;
	title: string;
	lede: ReactNode;
	actions?: ReactNode;
}) {
	return (
		<div className="max-w-3xl">
			<p className="text-(length:--sys-typescale-label-large-font-size) leading-(--sys-typescale-label-large-line-height) font-(--sys-typescale-label-large-font-weight) tracking-[0.1px] text-(--sys-color-primary)">
				{kicker}
			</p>
			<h1 className="mt-3 text-[clamp(2.25rem,4.45vw,3.5625rem)] leading-[1.05] font-(--sys-typescale-display-small-font-weight) tracking-[-0.045em] [font-family:var(--sys-typescale-display-small-font-family)] text-(--sys-color-on-surface)">
				{title}
			</h1>
			<div className="mt-3 max-w-prose text-(length:--sys-typescale-body-large-font-size) leading-(--sys-typescale-body-large-line-height) text-(--sys-color-on-surface-variant)">
				{lede}
			</div>
			{actions ? (
				<div className="mt-6 flex flex-wrap items-center gap-3">{actions}</div>
			) : null}
		</div>
	);
}
