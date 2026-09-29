import type { CategoryTab, LearningPath } from "@/lib/types";

/** Filter chips in "Discover Your Passion" (reference order, wrapped in rows). */
export const categoryTabs: readonly CategoryTab[] = [
  { id: "featured", label: "Featured" },
  { id: "music", label: "Music" },
  { id: "drawing-painting", label: "Drawing & Painting" },
  { id: "marketing", label: "Marketing" },
  { id: "animation", label: "Animation" },
  { id: "social-media", label: "Social Media" },
  { id: "ui-ux-design", label: "UI/UX Design" },
  { id: "creative-marketing", label: "Creative Marketing" },
  { id: "digital-illustration", label: "Digital Illustration" },
  { id: "film-video", label: "Film & Video" },
  { id: "crafts", label: "Crafts" },
  { id: "freelance-entrepreneurship", label: "Freelance & Entrepreneurship" },
  { id: "graphic-design", label: "Graphic Design" },
  { id: "photography", label: "Photography" },
  { id: "productivity", label: "Productivity" },
  { id: "web-development", label: "Web Development" },
  { id: "data-science", label: "Data Science" },
  { id: "cooking", label: "Cooking" },
];

/** Six big cards in "Explore Diverse Learning Paths". */
export const learningPaths: readonly LearningPath[] = [
  { id: "design", label: "Design", icon: "design" },
  { id: "development", label: "Development", icon: "development" },
  { id: "it-software", label: "IT & Software", icon: "it-software" },
  { id: "business", label: "Business", icon: "business" },
  { id: "marketing", label: "Marketing", icon: "marketing" },
  { id: "photography", label: "Photography", icon: "photography" },
];

export const categoryIconSrc: Record<LearningPath["icon"], string> = {
  design: "/images/categories/design.svg",
  development: "/images/categories/development.svg",
  "it-software": "/images/categories/it-software.svg",
  business: "/images/categories/business.svg",
  marketing: "/images/categories/marketing.svg",
  photography: "/images/categories/photography.svg",
};
