// Vendored from kern@937e87301ed6b617c08b512a66edd7e9c6b0a75d:packages/kern/src/components/text.tsx.
// Byte-identical except import rewrites noted below; do not edit — re-vendor to update.
// Rewrites: @xoroh/kern-material-3 -> ./m3-feedback; ../utils/cn -> ./cn; ../utils/assignRef -> ./assign-ref.
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ElementType } from "react";
import { cn } from "./cn";

const textVariants = cva("kern-text", {
	variants: {
		variant: {
			body: "text-(length:--sys-typescale-body-medium-font-size) leading-(--sys-typescale-body-medium-line-height) tracking-(--sys-typescale-body-medium-letter-spacing) font-(--sys-typescale-body-medium-font-weight)",
			label:
				"text-(length:--sys-typescale-label-large-font-size) leading-(--sys-typescale-label-large-line-height) tracking-(--sys-typescale-label-large-letter-spacing) font-(--sys-typescale-label-large-font-weight)",
			title:
				"text-(length:--sys-typescale-title-large-font-size) leading-(--sys-typescale-title-large-line-height) tracking-(--sys-typescale-title-large-letter-spacing) font-(--sys-typescale-title-large-font-weight)",
			headline:
				"text-(length:--sys-typescale-headline-small-font-size) leading-(--sys-typescale-headline-small-line-height) tracking-(--sys-typescale-headline-small-letter-spacing) font-(--sys-typescale-headline-small-font-weight)",
		},
	},
	defaultVariants: { variant: "body" },
});

export type TextProps<T extends ElementType = "p"> = {
	as?: T;
} & Omit<ComponentPropsWithRef<T>, "as" | "className"> &
	VariantProps<typeof textVariants> & { className?: string };

export function Text<T extends ElementType = "p">({
	as,
	variant,
	className,
	...props
}: TextProps<T>) {
	const Component = as ?? "p";
	return (
		<Component
			data-slot="text"
			className={cn(
				"text-(--sys-color-on-surface)",
				textVariants({ variant }),
				className,
			)}
			{...props}
		/>
	);
}

export { textVariants };
