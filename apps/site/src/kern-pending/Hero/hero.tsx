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
			className="hero-surface relative isolate overflow-hidden rounded-[2rem] text-(--sys-color-on-secondary-container)"
		>
			<div aria-hidden="true" className="hero-orbit hero-orbit-one" />
			<div aria-hidden="true" className="hero-orbit hero-orbit-two" />
			<div className="relative grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14 lg:p-16">
				<div className="min-w-0 py-2">
					<p className="inline-flex items-center rounded-full border border-(--sys-color-outline) px-3 py-1 text-(length:--sys-typescale-label-large-font-size) leading-(--sys-typescale-label-large-line-height) font-(--sys-typescale-label-large-font-weight) tracking-(--sys-typescale-label-large-letter-spacing)">
						{eyebrow}
					</p>
					<h1
						id={id ? `${id}-title` : undefined}
						className={cn(
							"mt-6 max-w-[15ch] text-[clamp(2.75rem,4.45vw,4rem)] leading-[0.98] font-semibold tracking-[-0.055em]",
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
