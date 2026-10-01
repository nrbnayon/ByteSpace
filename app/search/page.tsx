import type { Metadata } from "next";
import { Suspense } from "react";
import { CourseSearch } from "@/components/search/course-search";
import { CourseSearchSkeleton } from "@/components/search/course-card-skeleton";

export const metadata: Metadata = {
  title: "Find Your Next Course",
  description:
    "Search hundreds of courses across design, development, marketing, and more. Filter by category and level to find the right course for your goals.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={<CourseSearchSkeleton />}
    >
      <CourseSearch />
    </Suspense>
  );
}
