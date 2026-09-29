"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CourseCard } from "@/components/home/course-card";
import { categoryTabs } from "@/data/categories";
import { courses } from "@/data/courses";

export function CourseExplorer() {
  const [active, setActive] = useState<string>("featured");

  const filtered =
    active === "featured"
      ? courses
      : courses.filter((course) => course.categories.includes(active));

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
          className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3"
        >
          {categoryTabs.map((tab) => (
            <Chip
              key={tab.id}
              selected={active === tab.id}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </Chip>
          ))}
        </div>

        {/* Results */}
        <div aria-live="polite" className="sr-only">
          {filtered.length} course{filtered.length === 1 ? "" : "s"} in this category
        </div>

        <div className="mt-12 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
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
