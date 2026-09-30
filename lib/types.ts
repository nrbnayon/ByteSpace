export type Course = {
  id: string;
  title: string;
  instructor: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  /** e.g. "Beginner" */
  level: string;
  rating: {
    score: number;
    count: number;
  };
  /** Meta pills shown over the cover image */
  highlights: readonly string[];
  /** Number of extra enrolled students behind the avatar stack */
  studentsExtra: number;
  price: number;
  period: string;
  /** Category ids from data/categories.ts this course belongs to */
  categories: readonly string[];
};

/** A single lesson row on the course detail page. */
export type CourseLesson = {
  title: string;
  duration: string;
};

/** A learner review shown in the course Reviews tab. */
export type CourseReview = {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  avatar: { src: string; width: number; height: number };
};

/** Everything the /courses/[id] page renders, layered over the base course. */
export type CourseDetail = Course & {
  subtitle: string;
  description: readonly string[];
  keyPoints: readonly string[];
  sneakPeek: readonly { src: string; width: number; height: number }[];
  lessons: readonly CourseLesson[];
  totalLessons: number;
  totalHours: number;
  /** Literal string from the design, e.g. "99 more videos" */
  moreVideosLabel: string;
  students: number;
  includes: readonly { icon: string; label: string }[];
  ratingBreakdown: readonly { stars: number; count: number }[];
  reviews: readonly CourseReview[];
  /** Creator slug for the "See Full Profile" link. */
  creatorSlug: string;
};

/** A creator profile powering /creators/[id]. */
export type Creator = {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  bio: readonly string[];
  avatar: { src: string; width: number; height: number };
  followers: number;
  /** Course ids (from data/courses.ts) this creator publishes. */
  productIds: readonly string[];
};

export type CategoryTab = {
  id: string;
  label: string;
};

export type LearningPath = {
  id: string;
  label: string;
  icon: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  /** Optional — the redesigned testimonial cards drop star ratings. */
  rating?: number;
  avatar: {
    src: string;
    width: number;
    height: number;
  };
};

export type Partner = {
  id: string;
  name: string;
  logo: string;
  width: number;
  height: number;
};

export type Stat = {
  value: string;
  label: string;
};
