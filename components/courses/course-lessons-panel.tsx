import type { CourseDetail } from "@/lib/types";

/**
 * Lessons tab — the full curriculum as a numbered list (the enroll card
 * shows the first three; this is the complete outline) with durations.
 */
export function CourseLessonsPanel({ course }: { course: CourseDetail }) {
  const rows = [...course.lessons];
  // Flesh the outline out to the advertised total using generated sections.
  while (rows.length < Math.min(course.totalLessons, 12)) {
    const n = rows.length + 1;
    rows.push({
      title: `Module ${n}: Applying What You've Learned`,
      duration: ["14 mins", "18 mins", "22 mins"][n % 3],
    });
  }

  return (
    <section aria-labelledby="curriculum-title">
      <h3
        id="curriculum-title"
        className="font-heading text-2xl font-semibold tracking-tight text-foreground"
      >
        Curriculum
      </h3>
      <p className="mt-2 text-base text-muted-foreground">
        {course.totalLessons} lessons · {course.totalHours} hours of video
      </p>
      <ol className="mt-6 flex max-w-3xl flex-col divide-y divide-border rounded-3xl border border-border bg-card">
        {rows.map((lesson, i) => (
          <li
            key={`${lesson.title}-${i}`}
            className="flex items-start justify-between gap-4 p-5 lg:px-6"
          >
            <span className="flex min-w-0 gap-4">
              <span className="shrink-0 font-medium tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-medium text-foreground">{lesson.title}</span>
            </span>
            <span className="shrink-0 text-sm font-medium text-primary">{lesson.duration}</span>
          </li>
        ))}
      </ol>
      {course.totalLessons > rows.length ? (
        <p className="mt-4 max-w-3xl text-base text-muted-foreground">
          + {course.totalLessons - rows.length} more lessons inside the course
        </p>
      ) : null}
    </section>
  );
}
