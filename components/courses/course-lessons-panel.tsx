import { Video } from "lucide-react";
import type { CourseDetail } from "@/lib/types";

/** Advertised progress shown in the design's "Learning Progress" card. */
const PROGRESS_PERCENT = 55;

/**
 * Lessons tab — mirrors the design's Lesson page:
 * "Explore the Modules" intro, the lime video-icon module list,
 * a "Lesson Content" explainer, and the "Learning Progress" card.
 */
export function CourseLessonsPanel({ course }: { course: CourseDetail }) {
  const rows = [...course.lessons];
  // Flesh the outline out toward the advertised total for generated courses.
  while (rows.length < Math.min(course.totalLessons, 7)) {
    const n = rows.length + 1;
    rows.push({
      title: `Module ${n}: Applying What You've Learned`,
      duration: ["14 mins", "18 mins", "22 mins"][n % 3],
      description:
        "Work through guided exercises that turn the concepts from the previous modules into practical, portfolio-ready output.",
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="curriculum-title">
        <h3
          id="curriculum-title"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Explore the Modules
        </h3>
        <p className="mt-3 max-w-3xl text-pretty leading-[1.7] text-muted-foreground">
          Immerse yourself in the course content as we break down each module into
          comprehensive lessons, providing practical insights and hands-on experiences.
        </p>

        <h4 className="mt-8 font-heading text-xl font-semibold tracking-tight text-foreground">
          Lesson List
        </h4>
        <ol className="mt-5 flex max-w-3xl flex-col gap-4">
          {rows.map((lesson, i) => (
            <li
              key={`${lesson.title}-${i}`}
              style={{ animationDelay: `${Math.min(i, 5) * 60}ms` }}
              className="flex items-start gap-4 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both duration-500"
            >
              <span
                aria-hidden="true"
                className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground shadow-xs"
              >
                <Video className="size-6" />
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="font-medium leading-snug text-foreground">
                  {lesson.title}
                </span>
                {lesson.description ? (
                  <span className="text-pretty text-sm leading-[1.7] text-muted-foreground">
                    {lesson.description}
                  </span>
                ) : null}
              </span>
              <span className="sr-only"> — {lesson.duration}</span>
            </li>
          ))}
        </ol>
        {course.totalLessons > rows.length ? (
          <p className="mt-5 max-w-3xl text-base text-muted-foreground">
            + {course.totalLessons - rows.length} more lessons inside the course
          </p>
        ) : null}
      </section>

      <section aria-labelledby="lesson-content-title">
        <h3
          id="lesson-content-title"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Lesson Content
        </h3>
        <p className="mt-3 max-w-3xl text-pretty leading-[1.7] text-muted-foreground">
          Engage with each lesson through captivating video content, detailed textual
          explanations, and interactive elements. Download resources, complete
          assignments, and test your understanding with quizzes.
        </p>
      </section>

      <section aria-labelledby="lesson-progress-title">
        <h3
          id="lesson-progress-title"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Lesson Progress Tracking
        </h3>
        <p className="mt-3 max-w-3xl text-pretty leading-[1.7] text-muted-foreground">
          Witness your growth as you complete lessons, with an intuitive progress
          tracking feature guiding you through your learning journey.
        </p>
        <div className="mt-6 max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-[0_24px_60px_-40px_rgba(16,19,34,0.35)]">
          <p className="text-sm font-medium text-muted-foreground">Learning Progress</p>
          <p className="mt-1 font-heading text-4xl font-semibold tracking-tight text-foreground">
            {PROGRESS_PERCENT}%
          </p>
          <div
            role="progressbar"
            aria-label="Learning Progress"
            aria-valuenow={PROGRESS_PERCENT}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-secondary motion-safe:transition-[width] motion-safe:duration-1000 motion-safe:ease-out"
              style={{ width: `${PROGRESS_PERCENT}%` }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
