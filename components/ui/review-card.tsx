import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseReview } from "@/lib/types";

type ReviewCardProps = {
  review: CourseReview;
  className?: string;
};

/**
 * Individual learner review — bordered card with avatar, name, role,
 * relative date, star row and quoted comment (matches the design).
 */
export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <figure
      className={cn(
        "flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 lg:p-8",
        className
      )}
    >
      <figcaption className="flex items-start justify-between gap-4">
        <span className="flex items-center gap-3">
          <Image
            src={review.avatar.src}
            alt=""
            width={review.avatar.width}
            height={review.avatar.height}
            className="size-12 rounded-full object-cover"
          />
          <span>
            <span className="block font-medium text-foreground">{review.author}</span>
            <span className="block text-sm text-muted-foreground">{review.role}</span>
          </span>
        </span>
        <span className="text-sm text-muted-foreground">{review.date}</span>
      </figcaption>

      <span
        role="img"
        aria-label={`Rated ${review.rating} out of 5 stars`}
        className="flex items-center gap-1.5"
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              "size-5",
              i < review.rating
                ? "fill-[#3a3b3f] text-[#3a3b3f]"
                : "fill-transparent text-[#3a3b3f]/30"
            )}
            aria-hidden="true"
          />
        ))}
      </span>

      <blockquote className="text-pretty leading-relaxed text-muted-foreground">
        <p>&ldquo;{review.comment}&rdquo;</p>
      </blockquote>
    </figure>
  );
}
