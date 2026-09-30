import Link from "next/link";
import {
  FolderOpen,
  MessageCircleMore,
  PlaySquare,
  Video,
} from "lucide-react";
import { getCreator } from "@/data/creators";
import type { CourseDetail } from "@/lib/types";

const includeIcons = {
  folder: FolderOpen,
  video: Video,
  certificate: PlaySquare,
  chat: MessageCircleMore,
} as const;

/**
 * Right-hand enroll card: lesson list, pitch, price, Enroll CTA, the
 * "This course include" list and the creator block with profile link.
 * Sticks under the header on desktop; stacks below the video on mobile.
 */
export function EnrollCard({ course }: { course: CourseDetail }) {
  const creator = getCreator(course.creatorSlug);
  const creatorHref = `/creators/${course.creatorSlug}`;

  return (
    <aside
      aria-label="Enrollment options"
      className="h-fit rounded-3xl bg-card p-6 shadow-[0_24px_60px_-32px_rgba(16,19,34,0.25)] lg:sticky lg:top-28 lg:p-8"
    >
      <h2 className="text-balance font-heading text-2xl font-semibold tracking-tight text-foreground">
        {course.totalLessons} Lessons ({course.totalHours} hours)
      </h2>

      <ol className="mt-6 flex flex-col gap-4">
        {course.lessons.map((lesson, i) => (
          <li key={lesson.title} className="flex items-start justify-between gap-4">
            <span className="flex min-w-0 gap-3">
              <span className="shrink-0 text-base font-medium text-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base leading-[1.6] text-foreground">{lesson.title}</span>
            </span>
            <span className="shrink-0 text-sm font-medium text-primary">{lesson.duration}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-base text-muted-foreground">{course.moreVideosLabel}</p>

      <p className="mt-6 text-base leading-[1.6] text-muted-foreground">
        Ready to Dive In? Enroll Now and Start Building Your Digital Future!
      </p>

      <p className="mt-4 flex items-baseline gap-1.5">
        <span className="font-heading text-4xl font-semibold tracking-tight text-primary">
          ${course.price}
        </span>
        <span className="text-base text-muted-foreground">/{course.period.replace(/^\//, "")}</span>
      </p>

      <button
        type="button"
        className="mt-5 h-13 w-full cursor-pointer rounded-3xl bg-secondary text-lg font-medium text-secondary-foreground transition duration-200 hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Enroll Now
      </button>

      <h3 className="mt-8 font-heading text-xl font-semibold tracking-tight text-foreground">
        This course include
      </h3>
      <ul className="mt-4 flex flex-col gap-3.5">
        {course.includes.map((item) => {
          const Icon = includeIcons[item.icon as keyof typeof includeIcons] ?? FolderOpen;
          return (
            <li key={item.label} className="flex items-center gap-3 text-base text-foreground">
              <Icon className="size-5 shrink-0 text-[#003BE2] dark:text-primary" aria-hidden="true" />
              {item.label}
            </li>
          );
        })}
      </ul>

      <div className="mt-8 border-t border-border pt-6">
        <p className="flex items-center gap-3">
          <span className="font-medium text-foreground">{course.instructor}</span>
          <span className="text-sm text-muted-foreground">
            {creator?.role ?? "Professional Creator"}
          </span>
        </p>
        <p className="mt-3 text-base leading-[1.6] text-muted-foreground">
          Ready to Dive In? Enroll Now and Start Building Your Digital Future!
        </p>
        <Link
          href={creatorHref}
          className="mt-5 inline-flex h-11 items-center rounded-full border border-border bg-card px-5 text-base font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          See Full Profile
        </Link>
      </div>
    </aside>
  );
}
