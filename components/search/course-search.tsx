"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Chip } from "@/components/ui/chip";
import { CourseCard } from "@/components/home/course-card";
import { Reveal } from "@/components/ui/reveal";
import { categoryTabs } from "@/data/categories";
import { searchCatalog } from "@/data/search-catalog";
import { cn } from "@/lib/utils";

/** Results grid — 18 cards per page (3 columns × 6 rows on desktop). */
const PAGE_SIZE = 18;

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

/**
 * Learning-path labels (from the home page cards) that have no matching
 * category id — aliased to the closest real category so links like
 * /search?q=IT%20%26%20Software land on actual courses.
 */
const QUERY_CATEGORY_ALIASES: Record<string, string> = {
  development: "web-development",
  "it & software": "web-development",
  it: "web-development",
};

const SORTS = [
  { value: "relevance", label: "Most relevant" },
  { value: "rating-desc", label: "Top rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

type Sort = (typeof SORTS)[number]["value"];

const chipRow = "h-9 rounded-full border border-[#ced0d3] bg-card px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/15";

export function CourseSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL params are the source of truth; local inputs are controlled drafts.
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "featured";
  const level = searchParams.get("level") ?? "";
  const sort = (searchParams.get("sort") ?? "relevance") as Sort;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const [query, setQuery] = useState(q);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Keep the input draft in sync with back/forward navigation — reset
  // during render (React's recommended alternative to setState-in-effect).
  const [prevQ, setPrevQ] = useState(q);
  if (prevQ !== q) {
    setPrevQ(q);
    setQuery(q);
  }

  // Close any open dropdown when clicking outside of it.
  useEffect(() => {
    if (!categoryOpen && !levelOpen && !sortOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest("[data-dropdown]")) {
        setCategoryOpen(false);
        setLevelOpen(false);
        setSortOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [categoryOpen, levelOpen, sortOpen]);

  function push(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    }
    if (!("page" in next)) params.delete("page");
    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : "/search", { scroll: false });
  }

  /** Any non-default state lights the Filter pill and offers a reset. */
  const hasFilters = q !== "" || category !== "featured" || level !== "" || sort !== "relevance";

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const aliasCategory = QUERY_CATEGORY_ALIASES[needle];
    let list = searchCatalog.filter((course) => {
      const matchesQuery =
        needle === "" ||
        course.title.toLowerCase().includes(needle) ||
        course.instructor.toLowerCase().includes(needle) ||
        course.categories.some((c) => c.replace(/-/g, " ").includes(needle)) ||
        (aliasCategory ? course.categories.includes(aliasCategory) : false);
      const matchesCategory = category === "featured" || course.categories.includes(category);
      const matchesLevel = level === "" || course.level === level;
      return matchesQuery && matchesCategory && matchesLevel;
    });
    if (sort === "rating-desc") list = [...list].sort((a, b) => b.rating.score - a.rating.score);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [q, category, level, sort]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageItems = results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const windowStart = Math.max(1, Math.min(safePage - 2, pageCount - 4));
  const pages = Array.from({ length: Math.min(5, pageCount) }, (_, i) => windowStart + i);

  return (
    <>
      {/* ── Blue search band ── */}
      <section
        aria-labelledby="search-title"
        className="relative isolate overflow-hidden bg-[#003be2] pb-14 pt-28 text-white lg:pb-16 lg:pt-36 dark:bg-[#0034c4]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 auth-grid [--g:64px] lg:[--g:120px]"
        />
        <Container className="flex flex-col items-center gap-8">
          <h1
            id="search-title"
            className="text-balance text-4xl font-semibold leading-[1.2] tracking-[-0.01em] sm:text-5xl lg:text-[2.75rem]"
          >
            Find Your Next Course
          </h1>
          <form
            role="search"
            aria-label="Course search"
            onSubmit={(event) => {
              event.preventDefault();
              push({ q: query.trim() || null });
            }}
            className="flex w-full max-w-[520px] items-center gap-3"
          >
            <label className="flex h-[52px] min-w-0 flex-1 items-center gap-2 rounded-3xl bg-white px-5 py-3 focus-within:ring-2 focus-within:ring-[#d4fb20]">
              <Search className="size-5 shrink-0 text-[#82868e]" aria-hidden="true" />
              <input
                type="search"
                name="q"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search courses, topics, or creators"
                placeholder="Search"
                className="min-w-0 flex-1 bg-transparent text-lg leading-[1.6] text-[#242528] outline-none placeholder:text-[#82868e]"
              />
            </label>
            <div className="relative shrink-0">
              <button
                type="submit"
                className="hidden items-center gap-1.5 rounded-3xl bg-[#d4fb20] px-5 py-3 text-lg font-medium leading-[1.2] text-[#242528] transition duration-200 hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:scale-95 sm:inline-flex"
              >
                Courses
                <ChevronDown className="size-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </Container>
      </section>

      {/* ── Results ── */}
      <section aria-labelledby="search-results-title" className="py-10 lg:py-14">
        <Container>
          {/* Visually hidden h2 keeps the document outline h1 → h2 → h3 intact. */}
          <h2 id="search-results-title" className="sr-only">
            Search results
          </h2>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                aria-pressed={hasFilters}
                onClick={() => {
                  setQuery("");
                  push({ q: null, category: null, level: null, sort: null });
                }}
                className={cn(chipRow, "inline-flex items-center gap-2", hasFilters && "border-primary text-primary")}
              >
                <ListFilter className="size-4" aria-hidden="true" />
                Filter
                {hasFilters ? (
                  <span className="sr-only">active — press to reset all</span>
                ) : null}
              </button>

              {/* Level dropdown */}
              <div className="relative" data-dropdown>
                <button
                  type="button"
                  aria-expanded={levelOpen}
                  onClick={() => setLevelOpen((v) => !v)}
                  className={cn(chipRow, "inline-flex items-center gap-2", level && "border-primary text-primary")}
                >
                  <SlidersHorizontal className="size-4" aria-hidden="true" />
                  {level || "Level"}
                </button>
                {levelOpen ? (
                  <ul
                    role="group"
                    aria-label="Filter by level"
                    className="absolute left-0 top-full z-20 mt-2 w-44 rounded-2xl border border-border bg-card p-1.5 shadow-xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95"
                  >
                    {["", ...LEVELS].map((lv) => (
                      <li key={lv || "all"}>
                        <button
                          type="button"
                          
                          aria-pressed={level === lv}
                          onClick={() => {
                            setLevelOpen(false);
                            push({ level: lv || null });
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-accent"
                        >
                          {lv || "All levels"}
                          {level === lv ? <Check className="size-3.5" aria-hidden="true" /> : null}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              {/* Category dropdown */}
              <div className="relative" data-dropdown>
                <button
                  type="button"
                  aria-expanded={categoryOpen}
                  onClick={() => setCategoryOpen((v) => !v)}
                  className={cn(chipRow, "inline-flex items-center gap-2", category !== "featured" && "border-primary text-primary")}
                >
                  <ListFilter className="size-4" aria-hidden="true" />
                  Category
                </button>
                {categoryOpen ? (
                  <ul
                    role="group"
                    aria-label="Filter by category"
                    className="absolute left-0 top-full z-20 mt-2 max-h-72 w-52 overflow-auto rounded-2xl border border-border bg-card p-1.5 shadow-xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95"
                  >
                    {categoryTabs.map((tab) => (
                      <li key={tab.id}>
                        <button
                          type="button"
                          
                          aria-pressed={category === tab.id}
                          onClick={() => {
                            setCategoryOpen(false);
                            push({ category: tab.id === "featured" ? null : tab.id });
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-accent"
                        >
                          {tab.label}
                          {category === tab.id ? <Check className="size-3.5" aria-hidden="true" /> : null}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            {/* Sort dropdown */}
            <div className="relative" data-dropdown>
              <button
                type="button"
                aria-expanded={sortOpen}
                onClick={() => setSortOpen((v) => !v)}
                className={cn(chipRow, "inline-flex items-center gap-2")}
              >
                <SlidersHorizontal className="size-4" aria-hidden="true" />
                {SORTS.find((s) => s.value === sort)?.label}
              </button>
              {sortOpen ? (
                <ul
                  role="group"
                  aria-label="Sort results"
                  className="absolute right-0 top-full z-20 mt-2 w-48 rounded-2xl border border-border bg-card p-1.5 shadow-xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95"
                >
                  {SORTS.map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        
                        aria-pressed={sort === option.value}
                        onClick={() => {
                          setSortOpen(false);
                          push({ sort: option.value === "relevance" ? null : option.value });
                        }}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-accent"
                      >
                        {option.label}
                        {sort === option.value ? <Check className="size-3.5" aria-hidden="true" /> : null}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          {/* Category chips */}
          <div
            role="group"
            aria-label="Filter courses by category"
            className="mt-6 flex flex-wrap gap-3"
          >
            {categoryTabs.slice(0, 9).map((tab) => (
              <Chip
                key={tab.id}
                selected={category === tab.id}
                onClick={() => push({ category: tab.id === "featured" ? null : tab.id })}
              >
                {tab.label}
              </Chip>
            ))}
          </div>

          {/* Live result count */}
          <div aria-live="polite" className="sr-only">
            {results.length} course{results.length === 1 ? "" : "s"} found
          </div>

          {/* Cards */}
          <div
            key={`${q}|${category}|${level}|${sort}|${safePage}`}
            className="mt-10 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {pageItems.map((course, i) => (
              <Reveal key={course.id} delay={Math.min(i, 8) * 70} className="w-full">
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>

          {results.length === 0 ? (
            <p className="mt-16 text-center text-lg text-muted-foreground">
              No courses match your search — try different keywords or filters.
            </p>
          ) : null}

          {/* Pagination */}
          {pageCount > 1 ? (
            <nav aria-label="Search result pages" className="mt-14 flex items-center justify-center gap-2">
              <button
                type="button"
                aria-label="Previous page"
                disabled={safePage === 1}
                onClick={() => push({ page: String(safePage - 1) })}
                className="inline-flex size-11 items-center justify-center rounded-full border border-[#ced0d3] bg-card transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/15"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <ul className="mx-2 flex items-center gap-1.5">
                {pages.map((p) => (
                  <li key={p}>
                    <button
                      type="button"
                      aria-current={p === safePage ? "page" : undefined}
                      aria-label={`Page ${p}`}
                      onClick={() => push({ page: String(p) })}
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-full text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        p === safePage
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {p}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                aria-label="Next page"
                disabled={safePage === pageCount}
                onClick={() => push({ page: String(safePage + 1) })}
                className="inline-flex size-11 items-center justify-center rounded-full border border-[#ced0d3] bg-card transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/15"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </nav>
          ) : null}
        </Container>
      </section>
    </>
  );
}
