import { cn } from "../../kern/cn";

export function Switch({
	checked,
	onCheckedChange,
	label,
}: {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	label: string;
}) {
	return (
		<button
			type="button"
			role="switch"
			aria-label={label}
			aria-checked={checked}
			onClick={() => onCheckedChange(!checked)}
			className={cn(
				"relative inline-flex h-8 w-[3.25rem] shrink-0 items-center rounded-full border-2 p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--sys-color-secondary)",
				checked
					? "border-(--sys-color-primary) bg-(--sys-color-primary)"
					: "border-(--sys-color-outline) bg-(--sys-color-surface-container-highest)",
			)}
		>
			<span
				aria-hidden="true"
				className={cn(
					"size-5 rounded-full transition-[transform,background-color] duration-200",
					checked
						? "translate-x-5 bg-(--sys-color-on-primary)"
						: "translate-x-0 bg-(--sys-color-outline)",
				)}
			/>
		</button>
	);
}
