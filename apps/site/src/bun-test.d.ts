/**
 * Minimal `bun:test` declarations.
 *
 * Mirrors kern/apps/site/src/bun-test.d.ts: the site's tests run under
 * `bun test`, but `bun-types` is not a workspace dependency, so this file
 * declares exactly the surface the site's tests use — nothing more, so a
 * test reaching past it fails to compile and grows this file deliberately.
 */
declare module "bun:test" {
	export function describe(name: string, fn: () => void): void;
	export function test(name: string, fn: () => void | Promise<void>): void;
	export function expect(value: unknown): {
		toBe(expected: unknown): void;
		toEqual(expected: unknown): void;
		toBeGreaterThan(expected: number): void;
		toBeDefined(): void;
	};
}

interface ImportMeta {
	dir: string;
}
