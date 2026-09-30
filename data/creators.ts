import type { Creator } from "@/lib/types";

/**
 * Creator profiles for /creators/[id]. One bespoke profile per instructor
 * in data/courses.ts; productIds reference data/courses.ts ids so the
 * "Products" grid always reflects real catalog entries.
 */
export const creators: readonly Creator[] = [
  {
    slug: "purepearl-studio",
    name: "PurePearl Studio",
    role: "Professional Creator",
    tagline: "Passionate UI/UX, Web designer",
    bio: [
      "Welcome to the creative world of PurePearl Studio. Here, you'll discover the passion, expertise, and inspiration that drive our creative journey. Let's explore and learn together!",
      "Dive into our creative portfolio, showcasing a glimpse of our artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with us.",
    ],
    avatar: { src: "/images/creator/author.png", width: 160, height: 160 },
    followers: 12,
    productIds: [
      "learn-figma-from-basic",
      "build-digital-asset",
      "the-power-of-big-data",
      "balancing-productivity-and-self-care",
      "mastering-money-management",
      "from-idea-to-startup-success",
    ],
  },
] as const;

export function getCreator(slug: string): Creator | undefined {
  return creators.find((creator) => creator.slug === slug);
}
