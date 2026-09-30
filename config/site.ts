export const siteConfig = {
  name: "ByteSpace",
  tagline: "Get Access to Hundreds Courses Available",
  description:
    "Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.",
  url: "https://bytespace-bice.vercel.app",
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
  { label: "Courses", href: "/search" },
  { label: "Creators", href: "/#creators" },
];

/** Footer link columns – exactly as in the design (3 columns × 5 links, no headings). */
export const footerColumns: readonly (readonly NavLink[])[] = [
  [
    { label: "Featured Courses", href: "/#courses" },
    { label: "Featured Categories", href: "/#courses" },
    { label: "Business", href: "/#courses" },
    { label: "IT", href: "/#courses" },
    { label: "Design", href: "/#courses" },
  ],
  [
    { label: "Development", href: "/#courses" },
    { label: "Marketing", href: "/#courses" },
    { label: "Photography", href: "/#courses" },
    { label: "Finance", href: "/#courses" },
    { label: "Sport", href: "/#courses" },
  ],
  [
    { label: "Become a Creator", href: "/#creators" },
    { label: "Affiliate Program", href: "/#creators" },
    { label: "Contact", href: "/#creators" },
    { label: "Help", href: "/#creators" },
    { label: "About", href: "/" },
  ],
];

/** Bottom-bar links (right side of the divider). */
export const footerLegal: readonly NavLink[] = [
  { label: "Privacy Policy", href: "/" },
  { label: "Terms of Service", href: "/" },
  { label: "Cookies Settings", href: "/" },
];

export const footerNote =
  "By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.";