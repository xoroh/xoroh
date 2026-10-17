// Install command block: registry snippet in a tonal container with a
// copy action. Static <pre> keeps the command selectable without JS; the
// copy button is progressive enhancement (clipboard API with fallback).
import { useState } from "react";

export function InstallBlock({ command }: { command: string }) {
	const [copied, setCopied] = useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(command);
		} catch {
			const area = document.createElement("textarea");
			area.value = command;
			document.body.appendChild(area);
			area.select();
			document.execCommand("copy");
			area.remove();
		}
		setCopied(true);
		window.setTimeout(() => setCopied(false), 2000);
	}

	return (
		<div className="overflow-hidden rounded-(--sys-shape-corner-large) bg-(--sys-color-surface-container-high) ring-1 ring-(--sys-color-outline-variant)">
			<div className="flex items-center gap-2 overflow-x-auto p-4">
				<pre className="min-w-0 flex-1 overflow-x-auto text-(length:--sys-typescale-body-medium-font-size) leading-(--sys-typescale-body-medium-line-height) text-(--sys-color-on-surface)">
					<code>{command}</code>
				</pre>
				<button
					type="button"
					onClick={copy}
					aria-live="polite"
					className="inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-(length:--sys-typescale-label-large-font-size) font-(--sys-typescale-label-large-font-weight) text-(--sys-color-primary) outline-none transition-colors hover:bg-(--sys-color-primary)/10 focus-visible:ring-[3px] focus-visible:ring-(--sys-color-secondary)"
				>
					{copied ? "Copied" : "Copy"}
				</button>
			</div>
		</div>
	);
}
