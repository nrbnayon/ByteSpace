import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingSummaryProps = {
  average: number;
  breakdown: readonly { stars: number; count: number }[];
  className?: string;
};

/**
 * "Ratings 4.7" summary card from the Reviews tab — lime average tile,
 * a bar per star level (longest = most reviews), star icons and counts.
 * Bars are decorative; each row exposes its label to assistive tech.
 */
export function RatingSummary({ average, breakdown, className }: RatingSummaryProps) {
  const max = Math.max(...breakdown.map((row) => row.count), 1);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-8 rounded-3xl border border-border bg-card p-6 lg:gap-12 lg:p-8",
        className
      )}
    >
      <div className="flex size-32 flex-col items-center justify-center rounded-2xl bg-secondary text-secondary-foreground lg:size-36">
        <span className="text-sm font-medium">Ratings</span>
        <span className="font-heading text-5xl font-semibold tracking-tight lg:text-6xl">
          {average}
        </span>
      </div>

      <ul className="flex min-w-64 flex-1 flex-col gap-3">
        {breakdown.map((row) => (
          <li key={row.stars} className="flex items-center gap-3">
            <span className="sr-only">
              {row.count} reviews rated {row.stars} out of 5
            </span>
            <span
              aria-hidden="true"
              className="h-2 flex-1 overflow-hidden rounded-full bg-muted"
            >
              <span
                className="block h-full rounded-full bg-secondary"
                style={{ width: `${Math.round((row.count / max) * 100)}%` }}
              />
            </span>
            <span className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={
                    i < row.stars
                      ? "size-4 fill-[#3a3b3f] text-[#3a3b3f]"
                      : "size-4 fill-transparent text-[#3a3b3f]/30"
                  }
                />
              ))}
            </span>
            <span className="w-12 text-right text-sm tabular-nums text-muted-foreground">
              {row.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
