import type { Course } from "@/lib/types";
import { courses } from "@/data/courses";

/**
 * Search catalog — the base six real courses repeated with unique ids to
 * populate the paginated grid (90 items / 5 pages at 18 per page).
 * Swap `searchCatalog` for a real fetch when a backend exists.
 */
export const searchCatalog: readonly Course[] = Array.from(
  { length: 15 },
  (_, copy) =>
    courses.map((course) => ({
      ...course,
      id: copy === 0 ? course.id : `${course.id}-c${copy + 1}`,
      title: copy === 0 ? course.title : `${course.title} — Vol. ${copy + 1}`,
    }))
).flat();
