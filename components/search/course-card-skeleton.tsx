import { cn } from "@/lib/utils";

/**
 * Same responsive grid the results use — shared so the Suspense fallback
 * occupies exactly the space the loaded cards will.
 */
export const SEARCH_GRID_CLASS =
  "grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3";

/**
 * Skeleton mirroring the CourseCard layout (cover image + meta pills, title,
 * instructor, level + avatar row, price) so loading looks like the content
 * it becomes. Purely decorative — the wrapper announces the loading state.
 */
export function CourseCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-border bg-card"
    >
      {/* Cover image + meta pills */}
      <div className="relative m-4 mb-0 aspect-[341/195] overflow-hidden rounded-2xl">
        <div className="absolute inset-0 motion-safe:animate-pulse bg-muted" />
        <ul className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {[24, 32, 28].map((w, i) => (
            <li
              key={i}
              className="h-6 rounded-full bg-card/70 backdrop-blur-md"
              style={{ width: `${w * 4}px` }}
            />
          ))}
        </ul>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-6 w-3/4 motion-safe:animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/3 motion-safe:animate-pulse rounded bg-muted" />
          </div>
          <div className="h-5 w-8 shrink-0 motion-safe:animate-pulse rounded bg-muted" />
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <div className="h-8 w-20 motion-safe:animate-pulse rounded-full bg-muted" />
          <div className="flex -space-x-2.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="size-8 rounded-full border-2 border-card motion-safe:animate-pulse bg-muted"
              />
            ))}
          </div>
        </div>

        <div className="h-6 w-16 motion-safe:animate-pulse rounded bg-muted" />
      </div>
    </article>
  );
}

/**
 * Full-page loading state for /search — the card grid plus the section
 * scaffold, announced to screen readers via the live region.
 */
export function CourseSearchSkeleton({ count = 18 }: { count?: number }) {
  return (
    <div role="status" aria-live="polite">
      <p className="sr-only">Loading courses…</p>
      <div aria-hidden="true">
        {/* Toolbar scaffold */}
        <div className={cn("flex flex-wrap items-center justify-between gap-3")}>
          <div className="flex gap-2.5">
            {[96, 96, 120].map((w, i) => (
              <div
                key={i}
                className="h-9 motion-safe:animate-pulse rounded-full bg-muted"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
          <div className="h-9 w-32 motion-safe:animate-pulse rounded-full bg-muted" />
        </div>

        {/* Category chips row */}
        <div className="mt-6 flex flex-wrap gap-3">
          {[88, 72, 150, 96, 104, 128, 140, 90, 82].map((w, i) => (
            <div
              key={i}
              className="h-11 motion-safe:animate-pulse rounded-full bg-muted"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>

        {/* Card grid */}
        <div className={cn("mt-10", SEARCH_GRID_CLASS)}>
          {Array.from({ length: count }, (_, i) => (
            <div key={i} className="w-full">
              <CourseCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
