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
  rating: number;
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
