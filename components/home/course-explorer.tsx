"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CourseCard } from "@/components/home/course-card";
import { Reveal } from "@/components/ui/reveal";
import { categoryTabs } from "@/data/categories";
import { courses } from "@/data/courses";

/** Chips shown before the "+ More" expander — the reference's full 18; Design & Business hide behind it. */
const COLLAPSED_COUNT = 18;

export function CourseExplorer() {
  const [active, setActive] = useState<string>("featured");
  const [showAll, setShowAll] = useState(false);

  const visibleTabs = showAll ? categoryTabs : categoryTabs.slice(0, COLLAPSED_COUNT);

  const filtered =
    active === "featured"
      ? courses
      : courses.filter((course) => course.categories.includes(active));

  /** Collapsing must not strand an active category that is no longer visible. */
  function toggleExpanded() {
    const next = !showAll;
    if (
      !next &&
      active !== "featured" &&
      !categoryTabs.slice(0, COLLAPSED_COUNT).some((tab) => tab.id === active)
    ) {
      setActive("featured");
    }
    setShowAll(next);
  }

  return (
    <section id="courses" aria-labelledby="courses-title" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="courses-title"
          title="Discover Your Passion, Build Your Skills"
          subtitle="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
        />

        {/* Category filter */}
        <div
          role="group"
          aria-label="Filter courses by category"
          className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3"
        >
          {visibleTabs.map((tab) => (
            <Chip
              key={tab.id}
              selected={active === tab.id}
              onClick={() => setActive(tab.id)}
              className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:fill-mode-both duration-300"
            >
              {tab.label}
            </Chip>
          ))}
          <button
            type="button"
            onClick={toggleExpanded}
            aria-expanded={showAll}
            className="inline-flex h-11 cursor-pointer items-center gap-1 rounded-full px-2 text-base font-medium text-primary outline-none transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {showAll ? (
              <>
                <Minus className="size-4" aria-hidden="true" /> Less
              </>
            ) : (
              <>
                <Plus className="size-4" aria-hidden="true" /> More
              </>
            )}
          </button>
        </div>

        {/* Results */}
        <div aria-live="polite" className="sr-only">
          {filtered.length} course{filtered.length === 1 ? "" : "s"} in this category
        </div>

        {/* Re-keying on the active filter replays the staggered entrance. */}
        <div
          key={active}
          className="mt-12 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((course, i) => (
            <Reveal key={course.id} delay={Math.min(i, 8) * 70} className="w-full">
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-lg text-muted-foreground">
            No courses in this category yet — check back soon!
          </p>
        ) : null}
      </Container>
    </section>
  );
}
