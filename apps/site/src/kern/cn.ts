// Vendored from kern@937e87301ed6b617c08b512a66edd7e9c6b0a75d:packages/kern/src/utils/cn.ts.
// Byte-identical except import rewrites noted below; do not edit — re-vendor to update.
// Rewrites: @xoroh/kern-material-3 -> ./m3-feedback; ../utils/cn -> ./cn; ../utils/assignRef -> ./assign-ref.
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
