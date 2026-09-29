import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingProps = {
  /** Rating value, e.g. 4.5 */
  value: number;
  /** Show the numeric score next to the star icon. */
  showValue?: boolean;
  className?: string;
};

/**
 * Star rating. The score is exposed as text (with an accessible label) —
 * decorative star icons are hidden from assistive tech.
 */
export function Rating({ value, showValue = true, className }: RatingProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      role="img"
      aria-label={`Rated ${value} out of 5`}
    >
      {showValue ? (
        <span className="text-lg text-muted-foreground">{value}</span>
      ) : null}
      <Star className="size-5 fill-secondary text-secondary" aria-hidden="true" />
    </span>
  );
}

/** Row of filled stars used on testimonial cards. */
export function StarRow({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      role="img"
      aria-label={`Rated ${count} out of 5 stars`}
    >
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} className="size-4 fill-secondary text-secondary" aria-hidden="true" />
      ))}
    </span>
  );
}
