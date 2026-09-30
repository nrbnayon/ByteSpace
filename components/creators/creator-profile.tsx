"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BarChart3, ListFilter, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Chip } from "@/components/ui/chip";
import { CourseCard } from "@/components/home/course-card";
import { FollowButton } from "@/components/creators/follow-button";
import { Reveal } from "@/components/ui/reveal";
import { categoryTabs } from "@/data/categories";
import { courses } from "@/data/courses";
import type { Creator } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GridLines } from "@/components/ui/grid-lines";

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

const SORTS = [
  { value: "relevance", label: "Most relevant" },
  { value: "rating-desc", label: "Top rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

type Sort = (typeof SORTS)[number]["value"];

const toolbarChip =
  "h-9 rounded-full border border-[#ced0d3] bg-card px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/15";

const dropdownPanel =
  "absolute left-0 top-full z-20 mt-2 w-48 rounded-2xl border border-border bg-card p-1.5 shadow-xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95";

/**
 * Creator profile page — blue band header (avatar, name + lime Creator
 * badge, tagline, bio, Products/Followers counts, Follow) and the product
 * grid with the same Level/Category/sort toolbar as /search. Local filter
 * state (unlike /search, this grid is small enough not to need URLs).
 */
export function CreatorProfile({ creator }: { creator: Creator }) {
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("featured");
  const [sort, setSort] = useState<Sort>("relevance");
  const [openMenu, setOpenMenu] = useState<"level" | "category" | "sort" | null>(null);

  const products = useMemo(() => {
    const list = courses.filter((course) => creator.productIds.includes(course.id));
    const filtered = list.filter((course) => {
      const matchesLevel = level === "" || course.level === level;
      const matchesCategory = category === "featured" || course.categories.includes(category);
      return matchesLevel && matchesCategory;
    });
    if (sort === "rating-desc") return [...filtered].sort((a, b) => b.rating.score - a.rating.score);
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [creator.productIds, level, category, sort]);

  function toggleMenu(menu: "level" | "category" | "sort") {
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  // Close any open dropdown when clicking outside of it.
  useEffect(() => {
    if (!openMenu) return;
    function onPointerDown(event: PointerEvent) {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest("[data-dropdown]")) setOpenMenu(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  return (
    <>
      {/* Blue band header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] overflow-hidden bg-[#003be2]"
      >
        <GridLines />
      </div>

      <Container className="relative pt-28 lg:pt-32">
        <div className="flex flex-wrap items-center gap-5">
          <Image
            src={creator.avatar.src}
            alt=""
            width={creator.avatar.width}
            height={creator.avatar.height}
            className="size-20 rounded-lg object-cover lg:size-24"
          />
          <div className="min-w-0">
            <h1 className="flex flex-wrap items-center gap-3 font-heading text-3xl font-semibold tracking-tight text-white lg:text-5xl">
              {creator.name}
              <span className="inline-flex h-8 items-center rounded-full bg-secondary px-4 text-sm font-medium text-secondary-foreground">
                Creator
              </span>
            </h1>
            <p className="mt-1 text-lg text-white/90">{creator.tagline}</p>
          </div>
        </div>

        <div className="mt-8 max-w-4xl space-y-3">
          {creator.bio.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 32)} delay={i * 100}>
              <p className="text-pretty leading-[1.7] text-white/90">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pb-10">
          <ul className="flex flex-wrap gap-3" aria-label="Creator stats">
            <li className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-base font-medium text-[#242528]">
              <span className="font-heading text-xl font-semibold text-[#003BE2]">
                {creator.productIds.length}
              </span>
              Products
            </li>
            <li className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-base font-medium text-[#242528]">
              <span className="font-heading text-xl font-semibold text-[#003BE2]">
                {creator.followers}
              </span>
              Followers
            </li>
          </ul>
          <FollowButton creatorName={creator.name} />
        </div>
      </Container>

      {/* Products */}
      <section aria-labelledby="products-title" className="py-12 lg:py-16">
        <Container>
          <h2 id="products-title" className="sr-only">
            Courses by {creator.name}
          </h2>

          {/* Toolbar — mirrors /search's Filter/Level/Category + sort row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                aria-pressed={level !== "" || category !== "featured"}
                onClick={() => {
                  setLevel("");
                  setCategory("featured");
                }}
                className={cn(toolbarChip, "inline-flex items-center gap-2", (level !== "" || category !== "featured") && "border-primary text-primary")}
              >
                <ListFilter className="size-4" aria-hidden="true" />
                Filter
              </button>

              <div className="relative" data-dropdown>
                <button
                  type="button"
                  aria-expanded={openMenu === "level"}
                  onClick={() => toggleMenu("level")}
                  className={cn(toolbarChip, "inline-flex items-center gap-2", level !== "" && "border-primary text-primary")}
                >
                  <BarChart3 className="size-4" aria-hidden="true" />
                  {level || "Level"}
                </button>
                {openMenu === "level" ? (
                  <ul role="group" aria-label="Filter by level" className={dropdownPanel}>
                    {["", ...LEVELS].map((lv) => (
                      <li key={lv || "all"}>
                        <button
                          type="button"
                          aria-pressed={level === lv}
                          onClick={() => {
                            setLevel(lv);
                            setOpenMenu(null);
                          }}
                          className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm hover:bg-accent"
                        >
                          {lv || "All levels"}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="relative" data-dropdown>
                <button
                  type="button"
                  aria-expanded={openMenu === "category"}
                  onClick={() => toggleMenu("category")}
                  className={cn(toolbarChip, "inline-flex items-center gap-2", category !== "featured" && "border-primary text-primary")}
                >
                  <SlidersHorizontal className="size-4" aria-hidden="true" />
                  Category
                </button>
                {openMenu === "category" ? (
                  <ul role="group" aria-label="Filter by category" className={cn(dropdownPanel, "max-h-72 w-52 overflow-auto")}>
                    {categoryTabs.map((tab) => (
                      <li key={tab.id}>
                        <button
                          type="button"
                          aria-pressed={category === tab.id}
                          onClick={() => {
                            setCategory(tab.id);
                            setOpenMenu(null);
                          }}
                          className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm hover:bg-accent"
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            <div className="relative" data-dropdown>
              <button
                type="button"
                aria-expanded={openMenu === "sort"}
                onClick={() => toggleMenu("sort")}
                className={cn(toolbarChip, "inline-flex items-center gap-2")}
              >
                <SlidersHorizontal className="size-4" aria-hidden="true" />
                {SORTS.find((option) => option.value === sort)?.label}
              </button>
              {openMenu === "sort" ? (
                <ul role="group" aria-label="Sort products" className={cn(dropdownPanel, "right-0 left-auto w-52")}>
                  {SORTS.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        aria-pressed={sort === option.value}
                        onClick={() => {
                          setSort(option.value);
                          setOpenMenu(null);
                        }}
                        className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm hover:bg-accent"
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          {/* Category chips (first nine, as in the design) */}
          <div role="group" aria-label="Filter courses by category" className="mt-6 flex flex-wrap gap-3">
            {categoryTabs.slice(0, 9).map((tab) => (
              <Chip
                key={tab.id}
                selected={category === tab.id}
                onClick={() => setCategory(tab.id)}
              >
                {tab.label}
              </Chip>
            ))}
          </div>

          <div aria-live="polite" className="sr-only">
            {products.length} product{products.length === 1 ? "" : "s"} shown
          </div>

          <div className="mt-10 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((course, i) => (
              <Reveal key={course.id} delay={Math.min(i, 8) * 70} className="w-full">
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>

          {products.length === 0 ? (
            <p className="mt-16 text-center text-lg text-muted-foreground">
              No products match these filters yet.
            </p>
          ) : null}
        </Container>
      </section>
    </>
  );
}
