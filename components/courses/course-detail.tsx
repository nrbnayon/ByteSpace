import Link from "next/link";
import { BarChart3, Star, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MetaPill } from "@/components/ui/meta-pill";
import { ShareButton } from "@/components/ui/share-button";
import { Reveal } from "@/components/ui/reveal";
import { Tabs } from "@/components/ui/tabs";
import { CourseVideo } from "@/components/courses/demo-video";
import { EnrollCard } from "@/components/courses/enroll-card";
import { CourseAboutPanel } from "@/components/courses/course-about-panel";
import { CourseLessonsPanel } from "@/components/courses/course-lessons-panel";
import { CourseReviewsPanel } from "@/components/courses/course-reviews-panel";
import { GridLines } from "@/components/ui/grid-lines";
import { CourseCard } from "@/components/home/course-card";
import { searchCatalog } from "@/data/search-catalog";
import type { CourseDetail } from "@/lib/types";

/**
 * Course detail page — mirrors the design's geometry:
 *  - Blue grid band ends mid-page; the white enroll card overlaps that edge.
 *  - Page-level 2-col grid: video row, then tabs; enroll card spans both
 *    rows and sticks while the tabs scroll.
 *  - Related courses close the page.
 */
export function CourseDetail({ course }: { course: CourseDetail }) {
  const related = searchCatalog
    .filter(
      (candidate) =>
        candidate.id !== course.id && candidate.instructor === course.instructor
    )
    .slice(0, 3);

  return (
    <>
      {/* Blue band behind header + header block only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] overflow-hidden bg-[#003be2] lg:h-[660px]"
      >
        <GridLines />
      </div>

      <Container className="relative pt-28 lg:pt-32">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0 max-w-3xl">
            <h1
              id="course-title"
              className="text-balance font-heading text-4xl font-semibold leading-[1.2] tracking-[-0.01em] text-white lg:text-[2.75rem]"
            >
              {course.title}
            </h1>
            <p className="mt-2 text-lg font-medium text-white/90 lg:text-xl">{course.subtitle}</p>
            <p className="mt-4 text-base text-white/90">
              by{" "}
              <Link
                href={`/creators/${course.creatorSlug}`}
                className="font-medium text-[#D4FB20] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4FB20]"
              >
                {course.instructor}
              </Link>
            </p>
            <ul className="mt-6 flex flex-wrap gap-3" aria-label="Course summary">
              <li>
                <MetaPill icon={<BarChart3 className="size-4" aria-hidden="true" />}>
                  {course.level}
                </MetaPill>
              </li>
              <li>
                <MetaPill icon={<Star className="size-4 fill-[#003BE2]" aria-hidden="true" />}>
                  {course.rating.score} ({course.rating.count} reviews)
                </MetaPill>
              </li>
              <li>
                <MetaPill icon={<Users className="size-4" aria-hidden="true" />}>
                  {course.students} Students
                </MetaPill>
              </li>
            </ul>
          </div>
          <ShareButton
            title={course.title}
            className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-secondary px-6 text-base font-medium text-secondary-foreground transition duration-200 hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          />
        </div>

        {/* Main grid: video + tabs in column 1, enroll card spanning both rows */}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-12">
          <div className="min-w-0">
            <CourseVideo course={course} className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-700" />
          </div>
          <div className="lg:row-span-2">
            <EnrollCard course={course} />
          </div>

          <div className="min-w-0">
            <Tabs
              label="Course information"
              tabs={[
                { id: "about", label: "About", content: <CourseAboutPanel course={course} /> },
                { id: "lessons", label: "Lessons", content: <CourseLessonsPanel course={course} /> },
                { id: "reviews", label: "Reviews", content: <CourseReviewsPanel course={course} /> },
              ]}
            />
          </div>
        </div>
      </Container>

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="py-20 lg:py-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                id="related-title"
                className="font-heading text-3xl font-semibold tracking-tight text-foreground lg:text-4xl"
              >
                More by {course.instructor}
              </h2>
              <Link
                href={`/creators/${course.creatorSlug}`}
                className="text-base font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                View creator profile
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.id} delay={i * 70} className="w-full">
                  <CourseCard course={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
