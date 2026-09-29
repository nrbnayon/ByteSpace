import { cn } from "@/lib/utils";

type ProgressCardProps = {
  label?: string;
  /** Progress percentage 0–100. */
  value: number;
  className?: string;
};

/**
 * "Learning Progress 55%" glass card from the hero.
 * Exposed as a proper progressbar for assistive technology.
 */
export function ProgressCard({
  label = "Learning Progress",
  value,
  className,
}: ProgressCardProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/40 bg-card/90 p-4 shadow-lg shadow-black/10 backdrop-blur-xl",
        className
      )}
    >
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="font-heading text-5xl font-semibold tracking-tight text-foreground">
        {clamped}%
      </p>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-secondary"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
