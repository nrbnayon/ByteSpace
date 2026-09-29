import type { Stat } from "@/lib/types";

/** "Your Path to Professional Growth" stats band. */
export const growthStats: readonly Stat[] = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
];

/** Checklist in "Create & Manage Courses Easily". */
export const creatorBenefits: readonly string[] = [
  "Share Your Expertise",
  "Monetize Your Content",
  "Flexibility and Autonomy",
  "Build a Community",
];

/** Avatar stack shown on the hero "Happy Students" card (row of +2K+). */
export const heroStudentAvatars = [
  "/images/avatars/avatar-8.png",
  "/images/avatars/avatar-9.png",
  "/images/avatars/avatar-10.png",
  "/images/avatars/avatar-11.png",
  "/images/avatars/avatar-5.png",
  "/images/avatars/avatar-6.png",
  "/images/avatars/avatar-7.png",
] as const;

/** Smaller avatar stack used inside course cards (…+26). */
export const courseStudentAvatars = [
  "/images/avatars/avatar-1.png",
  "/images/avatars/avatar-2.png",
  "/images/avatars/avatar-3.png",
  "/images/avatars/avatar-4.png",
] as const;
