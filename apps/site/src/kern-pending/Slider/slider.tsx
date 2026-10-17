import { cn } from "../../kern/cn";

export function Slider({
	label,
	value,
	min = 1,
	max = 5,
	onValueChange,
}: {
	label: string;
	value: number;
	min?: number;
	max?: number;
	onValueChange: (value: number) => void;
}) {
	return (
		<input
			aria-label={label}
			className={cn(
				"m3-slider h-11 w-full cursor-pointer accent-(--sys-color-primary)",
			)}
			type="range"
			min={min}
			max={max}
			value={value}
			onChange={(event) => onValueChange(Number(event.currentTarget.value))}
		/>
	);
}
