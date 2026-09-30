"use client";

import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { RatingSummary } from "@/components/ui/rating-summary";
import { ReviewCard } from "@/components/ui/review-card";
import { cn } from "@/lib/utils";
import type { CourseDetail } from "@/lib/types";

/**
 * Reviews tab — intro copy, the ratings summary card, star-filter chips
 * ("All rating" + 5..1) and the filtered list of individual reviews.
 * Selection state is announced via a polite live region.
 */
export function CourseReviewsPanel({ course }: { course: CourseDetail }) {
  const [minRating, setMinRating] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      minRating === null
        ? course.reviews
        : course.reviews.filter((review) => review.rating === minRating),
    [course.reviews, minRating]
  );

  const average =
    Math.round(
      (course.reviews.reduce((sum, review) => sum + review.rating, 0) /
        Math.max(course.reviews.length, 1)) *
        10
    ) / 10;

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="reviews-intro-title">
        <h3
          id="reviews-intro-title"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          What Learners Are Saying
        </h3>
        <p className="mt-3 max-w-2xl text-pretty leading-[1.7] text-muted-foreground">
          Discover what our learners have to say about their experience with &apos;{course.title}&apos;.
          Read reviews and ratings from individuals who have embarked on the transformative
          journey of mastering digital asset creation.
        </p>
      </section>

      <RatingSummary average={average} breakdown={course.ratingBreakdown} />

      <section aria-labelledby="individual-reviews-title">
        <h3
          id="individual-reviews-title"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Individual Reviews:
        </h3>

        <div
          role="group"
          aria-label="Filter reviews by rating"
          className="mt-5 flex flex-wrap gap-3"
        >
          <button
            type="button"
            aria-pressed={minRating === null}
            onClick={() => setMinRating(null)}
            className={cn(
              "inline-flex h-11 cursor-pointer items-center rounded-full px-5 text-base font-medium transition-colors outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              minRating === null
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            All rating
          </button>
          {[5, 4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              type="button"
              aria-pressed={minRating === stars}
              onClick={() => setMinRating(stars)}
              className={cn(
                "inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-full px-5 text-base font-medium transition-colors outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                minRating === stars
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Star
                className={cn("size-4", minRating === stars ? "fill-secondary-foreground" : "fill-current")}
                aria-hidden="true"
              />
              {stars}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="sr-only">
          {filtered.length} review{filtered.length === 1 ? "" : "s"} shown
        </div>

        <ul className="mt-6 flex max-w-3xl flex-col gap-6">
          {filtered.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
          {filtered.length === 0 ? (
            <li className="rounded-3xl border border-dashed border-border p-8 text-center text-muted-foreground">
              No {minRating}-star reviews yet.
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );
}
