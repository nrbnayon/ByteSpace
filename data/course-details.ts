import type { CourseDetail, CourseReview } from "@/lib/types";
import { courses } from "@/data/courses";
import { searchCatalog } from "@/data/search-catalog";

const includes = [
  { icon: "folder", label: "Learning Resources" },
  { icon: "video", label: "Quality Lesson Videos" },
  { icon: "certificate", label: "Certificate of Completion" },
  { icon: "chat", label: "Private Consultation" },
] as const;

const sneakPeek = [
  { src: "/images/courses/learn-figma-from-basic.jpg", width: 698, height: 465 },
  { src: "/images/courses/build-digital-asset.jpg", width: 682, height: 454 },
  { src: "/images/courses/the-power-of-big-data.jpg", width: 682, height: 454 },
  { src: "/images/courses/balancing-productivity-and-self-care.jpg", width: 682, height: 454 },
] as const;

const reviews: readonly CourseReview[] = [
  {
    id: "r1",
    author: "PurePearl Studio",
    role: "UI/UX Designer",
    rating: 5,
    date: "a year ago",
    comment:
      "The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!",
    avatar: { src: "/images/avatars/avatar-1.png", width: 160, height: 160 },
  },
  {
    id: "r2",
    author: "Albert Flores",
    role: "UI/UX Designer",
    rating: 5,
    date: "a year ago",
    comment:
      "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
    avatar: { src: "/images/avatars/avatar-2.png", width: 160, height: 160 },
  },
  {
    id: "r3",
    author: "Cody Fisher",
    role: "UI/UX Designer",
    rating: 5,
    date: "a year ago",
    comment:
      "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
    avatar: { src: "/images/avatars/avatar-3.png", width: 160, height: 160 },
  },
  {
    id: "r4",
    author: "Brooklyn Simmons",
    role: "UI/UX Designer",
    rating: 5,
    date: "a year ago",
    comment:
      "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
    avatar: { src: "/images/avatars/avatar-4.png", width: 160, height: 160 },
  },
] as const;

/**
 * Bespoke record for the course shown in the design (copy matches
 * byte-for-byte); every other catalog course gets generated defaults.
 */
const buildDigitalAssetDetail: CourseDetail = {
  ...courses.find((course) => course.id === "build-digital-asset")!,
  subtitle: "Unlock the Power of Digital Creation with Expert Guidance",
  description: [
    'Embark on an enlightening exploration into the world of digital creation with our comprehensive course, "Build Digital Assets: A Comprehensive Guide." This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.',
    "In the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.",
    "As you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.",
  ],
  keyPoints: [
    "Foundational Concepts",
    "Design Principles Mastery",
    "Advanced Techniques in Digital Creation",
    "Project Showcase and Critique",
    "Optimizing for Various Platforms",
    "Digital Asset Management Best Practices",
    "Monetization Strategies",
    "Capstone Project: Building Your Portfolio",
  ],
  sneakPeek,
  lessons: [
    {
      title: "Module 1: Introduction to Digital Assets",
      duration: "12 mins",
      description:
        "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
    },
    {
      title: "Module 2: Design Principles for Impact",
      duration: "21 mins",
      description:
        "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
    },
    {
      title: "Module 3: User-Centric Design Strategies",
      duration: "16 mins",
      description:
        "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
    },
    {
      title: "Module 4: Interactive Media and Engagement",
      duration: "18 mins",
      description:
        "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
    },
    {
      title: "Module 5: Project Showcase and Critique",
      duration: "22 mins",
      description:
        "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
    },
    {
      title: "Module 6: Optimizing Digital Assets for Various Platforms",
      duration: "15 mins",
      description:
        "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
    },
    {
      title: "Module 7: Capstone — Building Your Portfolio",
      duration: "24 mins",
      description:
        "Bring every thread together in the capstone: assemble your strongest work into 'Portfolio Assembly,' write 'Case Studies' that sell your process, and leave with a launch-ready portfolio.",
    },
  ],
  totalLessons: 112,
  totalHours: 24,
  moreVideosLabel: "99 more videos",
  students: 199,
  includes,
  ratingBreakdown: [
    { stars: 5, count: 720 },
    { stars: 4, count: 120 },
    { stars: 3, count: 21 },
    { stars: 2, count: 12 },
    { stars: 1, count: 16 },
  ],
  reviews,
  creatorSlug: "purepearl-studio",
};

/** Slugify helper for generated detail records. */
function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/**
 * Real generic modules for generated course details. The base courses' card
 * meta pills ("17 Lessons", "2 hours 16 mins", "59 Comments") are display
 * strings, not lesson titles — never map them into the curriculum.
 */
function generateLessons(courseTitle: string): CourseDetail["lessons"] {
  const short = courseTitle.length > 28 ? courseTitle.split(/[:(]/)[0].trim() : courseTitle;
  return [
    {
      title: `Module 1: Welcome to ${short}`,
      duration: "12 mins",
      description: `Set your goals and get oriented: how ${short} is structured, the tools you'll use, and how to get the most from the course.`,
    },
    {
      title: "Module 2: Core Concepts & Fundamentals",
      duration: "21 mins",
      description:
        "Build a rock-solid foundation with the essential concepts, vocabulary, and mental models every practitioner relies on.",
    },
    {
      title: "Module 3: Tools & Workflow",
      duration: "16 mins",
      description:
        "Get hands-on with the tools of the trade and a professional workflow you can reuse on every project going forward.",
    },
    {
      title: "Module 4: Techniques in Practice",
      duration: "18 mins",
      description:
        "Work through guided exercises that turn theory into muscle memory, with checkpoints to confirm each technique sticks.",
    },
    {
      title: "Module 5: Real-World Application",
      duration: "22 mins",
      description:
        "Apply everything to a realistic scenario end-to-end — the messy constraints, decisions, and trade-offs of real work.",
    },
    {
      title: "Module 6: Refining & Polishing",
      duration: "15 mins",
      description:
        "Learn the review-and-refine pass that separates amateur output from professional, portfolio-ready work.",
    },
    {
      title: "Module 7: Capstone — Showcase Your Skills",
      duration: "24 mins",
      description:
        "Bring every module together in a final project you can present with confidence — and add straight to your portfolio.",
    },
  ];
}

/** Generated key points — professional, course-agnostic outcomes. */
const generatedKeyPoints = [
  "Foundations & Core Concepts",
  "Hands-On Guided Projects",
  "Real-World Case Studies",
  "Tools & Workflow Mastery",
  "Portfolio-Ready Output",
  "Progress Tracking & Quizzes",
  "Downloadable Resources",
  "Certificate of Completion",
] as const;

/** Generated defaults for courses without a bespoke record. */
function generateDetail(course: (typeof courses)[number]): CourseDetail {
  const level = course.level;
  return {
    ...course,
    subtitle: `Master ${course.title} with expert guidance and hands-on practice`,
    description: [
      `${course.title} is a ${level.toLowerCase()}-friendly learning experience that walks you through every concept with clarity and intention. Each module builds on the last, so you finish with practical, portfolio-ready skills.`,
      "You'll work through guided exercises, real-world examples, and review checkpoints designed to make the material stick. By the end, you'll be able to apply what you've learned immediately in your own projects.",
    ],
    keyPoints: generatedKeyPoints,
    sneakPeek,
    lessons: generateLessons(course.title),
    totalLessons: 48,
    totalHours: 12,
    moreVideosLabel: "45 more videos",
    students: course.studentsExtra * 7 + 17,
    includes,
    ratingBreakdown: [
      { stars: 5, count: 320 },
      { stars: 4, count: 64 },
      { stars: 3, count: 12 },
      { stars: 2, count: 4 },
      { stars: 1, count: 2 },
    ],
    reviews,
    creatorSlug: slugify(course.instructor),
  };
}

/** All course details keyed by course id — bespoke first, generated rest. */
export const courseDetails: Readonly<Record<string, CourseDetail>> = Object.fromEntries(
  searchCatalog.map((course) => [
    course.id,
    course.id === "build-digital-asset" ? buildDigitalAssetDetail : generateDetail(course),
  ])
);

export function getCourseDetail(id: string): CourseDetail | undefined {
  return courseDetails[id];
}
