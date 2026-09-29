export const siteConfig = {
  name: "ByteSpace",
  tagline: "Get Access to Hundreds Courses Available",
  description:
    "Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.",
  url: "https://bytespace.example.com",
  creator: {
    name: "purepearl studio",
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const mainNav: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/#courses" },
  { label: "Creators", href: "/#creators" },
];

export const footerNav: readonly { heading: string; links: readonly NavLink[] }[] = [
  {
    heading: "Featured Courses",
    links: [
      { label: "Digital Illustration", href: "/#courses" },
      { label: "Animation", href: "/#courses" },
      { label: "Business", href: "/#courses" },
      { label: "UI/UX Design", href: "/#courses" },
    ],
  },
  {
    heading: "Development",
    links: [
      { label: "Web Development", href: "/#courses" },
      { label: "Data Science", href: "/#courses" },
      { label: "IT & Software", href: "/#courses" },
      { label: "Photography", href: "/#courses" },
    ],
  },
  {
    heading: "Become a Creator",
    links: [
      { label: "Welcome, Creators", href: "/#creators" },
      { label: "Course Creator Blog", href: "/#creators" },
      { label: "Creator Help", href: "/#creators" },
      { label: "Contact", href: "/#creators" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Privacy Policy", href: "/" },
    ],
  },
] as const;

export const footerNote =
  "By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.";
