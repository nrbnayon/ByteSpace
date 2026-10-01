import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { CourseDetail } from "@/components/courses/course-detail";
import { getCourseDetail } from "@/data/course-details";
import { searchCatalog } from "@/data/search-catalog";
import { siteConfig } from "@/config/site";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return searchCatalog.map((course) => ({ id: course.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseDetail(id);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.subtitle,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const course = getCourseDetail(id);
  if (!course) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.subtitle,
          provider: { "@type": "Organization", name: siteConfig.name },
          offers: {
            "@type": "Offer",
            price: course.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: course.rating.score,
            reviewCount: course.rating.count,
          },
        }}
      />
      <CourseDetail course={course} />
    </>
  );
}
