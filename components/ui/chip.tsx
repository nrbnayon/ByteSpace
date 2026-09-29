import { cn } from "@/lib/utils";

type ChipProps = Omit<React.ComponentProps<"button">, "aria-pressed"> & {
  selected?: boolean;
};

/**
 * Pill-shaped filter chip. Announced as a toggle button so screen readers
 * hear the selected state when categories are filtered.
 */
export function Chip({ selected = false, className, type, ...props }: ChipProps) {
  return (
    <button
      type={type ?? "button"}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-11 cursor-pointer items-center justify-center rounded-full px-4",
        "text-base font-medium transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected
          ? "bg-secondary text-secondary-foreground"
          : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
}
