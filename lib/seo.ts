import { siteConfig } from "@/config/site";
import { courses } from "@/data/courses";

/**
 * JSON-LD structured data for search-engine rich results:
 * - Organization: brand entity
 * - WebSite + SearchAction: sitelinks search box
 * - ItemList of Courses: course rich results
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/brand/logo-mark.svg`,
    description: siteConfig.description,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function coursesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} Courses`,
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: course.title,
        description: `${course.title} — ${course.level} course by ${course.instructor} on ${siteConfig.name}.`,
        provider: {
          "@type": "Organization",
          name: course.instructor,
          sameAs: siteConfig.url,
        },
        offers: {
          "@type": "Offer",
          price: course.price,
          priceCurrency: "USD",
          category: "Paid",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: course.rating.score,
          reviewCount: course.rating.count,
          bestRating: 5,
          worstRating: 1,
        },
      },
    })),
  };
}
