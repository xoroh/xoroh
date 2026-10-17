// kern-pending: marketing hero.
//
// WHAT: full-width hero band — eyebrow kicker, display headline, lede,
// action row, and an optional art slot — for marketing pages.
// WHY NEEDED: Kern has no hero. Every Kern property ships a hand-rolled
// one (kern's own site builds `.home-hero` per page), which is exactly the
// drift a shared pattern should prevent. This version is pure M3
// foundations: tonal-container surface, display/headline type slots,
// full-shape actions, level1 art cards, standard motion — no bespoke scale.
// M3 SPEC: no hero component exists; built from foundations — color roles
// https://m3.material.io/styles/color/roles, type scale
// https://m3.material.io/styles/typography/type-scale, elevation
// https://m3.material.io/styles/elevation/overview, motion
// https://m3.material.io/styles/motion/overview. Action buttons are the
// vendored Kern `Button` (filled + outlined), so the CTA row is spec by
// construction.
// TO PORT INTO KERN: move into a new `packages/kern/src/marketing/`
// (or the site kit) with the art slot generalized, add responsive tests
// (stack at <600px, art hidden or stacked per host), and record the
// no-hero-spec-foundation-only rationale in the component docs.
import type { ReactNode } from "react";
import { cn } from "../../kern/cn";

export function Hero({
	eyebrow,
	title,
	lede,
	actions,
	art,
	id,
}: {
	eyebrow: string;
	title: ReactNode;
	lede: ReactNode;
	actions?: ReactNode;
	art?: ReactNode;
	id?: string;
}) {
	return (
		<section
			aria-labelledby={id ? `${id}-title` : undefined}
			className="overflow-hidden rounded-[28px] bg-(--sys-color-secondary-container) text-(--sys-color-on-secondary-container)"
		>
			<div className="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:p-14">
				<div className="min-w-0">
					<p className="inline-flex items-center rounded-full border border-(--sys-color-outline) px-3 py-1 text-(length:--sys-typescale-label-large-font-size) leading-(--sys-typescale-label-large-line-height) font-(--sys-typescale-label-large-font-weight) tracking-(--sys-typescale-label-large-letter-spacing)">
						{eyebrow}
					</p>
					<h1
						id={id ? `${id}-title` : undefined}
						className={cn(
							"mt-4 text-[clamp(2.25rem,5vw,3.5625rem)] leading-[1.1] font-normal tracking-[-0.25px]",
							"[font-family:var(--sys-typescale-display-large-font-family)]",
						)}
					>
						{title}
					</h1>
					<div className="mt-4 max-w-prose text-(length:--sys-typescale-body-large-font-size) leading-(--sys-typescale-body-large-line-height) text-(--sys-color-on-secondary-container)/90">
						{lede}
					</div>
					{actions ? (
						<div className="mt-8 flex flex-wrap items-center gap-3">
							{actions}
						</div>
					) : null}
				</div>
				{art ? <div className="min-w-0">{art}</div> : null}
			</div>
		</section>
	);
}
