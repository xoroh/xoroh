// Vendored from kern@937e87301ed6b617c08b512a66edd7e9c6b0a75d:packages/kern/src/utils/assignRef.ts.
// Byte-identical except import rewrites noted below; do not edit — re-vendor to update.
// Rewrites: @xoroh/kern-material-3 -> ./m3-feedback; ../utils/cn -> ./cn; ../utils/assignRef -> ./assign-ref.
import type { Ref } from "react";

/**
 * Assign a possibly-union ref without casting.
 *
 * `Button` takes `Ref<HTMLButtonElement> | Ref<HTMLAnchorElement>` (split by
 * the `href` discriminant), so neither render branch can name the ref's
 * element type without asserting. The generic infers `T` from the union and
 * both assignments stay well-typed — a mismatched consumer ref is a type
 * error at their call site, never a cast here.
 *
 * Internal to `@xoroh/kern` (not exported from `./utils`): ref plumbing, not
 * public surface. Deliberately NOT shared with `@xoroh/axis` (no such export
 * on its public entry) or `libs/kern-primitives` (frozen pending deletion).
 */
export function assignRef<T>(ref: Ref<T> | undefined, node: T | null): void {
	if (ref === null || ref === undefined) return;
	if (typeof ref === "function") {
		ref(node);
		return;
	}
	ref.current = node;
}
