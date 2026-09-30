import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { courses } from "@/data/courses";
import { creators } from "@/data/creators";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...courses.map((course) => ({
      url: `${base}/courses/${course.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...creators.map((creator) => ({
      url: `${base}/creators/${creator.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
