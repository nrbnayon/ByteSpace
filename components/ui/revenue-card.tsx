import { cn } from "@/lib/utils";

type RevenueCardProps = {
  /** Card headline, e.g. "Total Revenue". */
  label: string;
  /** Small meta line under the label, e.g. "July 1-28". */
  meta?: string;
  /** The money value, e.g. "$120.29". */
  value: string;
  /** Optional progress bar 0–100 (Total Revenue card only). */
  progress?: number;
  /** Optional lime pill under the value (Year to Date card). */
  badge?: string;
  className?: string;
};

/**
 * Electric-blue stat card from the "Create & Manage" collage
 * (Total Revenue $120.29 / Year to Date $1,200.38).
 */
export function RevenueCard({
  label,
  meta,
  value,
  progress,
  badge,
  className,
}: RevenueCardProps) {
  const clamped = progress === undefined ? undefined : Math.min(100, Math.max(0, progress));
  return (
    <div
      className={cn(
        // Brand-blue in both themes: these cards sit on the light #FAFAFA
        // canvas / dark navy canvas, and #003BE2 keeps AA contrast on both.
        "w-[176px] rounded-2xl bg-[#003BE2] px-4 py-3.5 text-white shadow-lg shadow-black/10 sm:w-[196px]",
        className
      )}
    >
      <p className="text-sm font-medium leading-tight">{label}</p>
      {meta ? <p className="mt-0.5 text-[11px] opacity-75">{meta}</p> : null}
      <p className="mt-1.5 font-heading text-2xl font-semibold tracking-tight">{value}</p>
      {clamped !== undefined ? (
        <div
          role="progressbar"
          aria-label={`${label} progress`}
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-foreground/25"
        >
          <div className="h-full rounded-full bg-secondary" style={{ width: `${clamped}%` }} />
        </div>
      ) : null}
      {badge ? (
        <span className="mt-2 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
