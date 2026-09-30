export type LegalSection = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: readonly LegalSection[];
};

/**
 * Legal documents rendered at /legal/[slug]. Real copy should come from the
 * company's counsel — this is standard, honest placeholder structure.
 */
export const legalDocs: readonly LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "How ByteSpace collects, uses, and protects your personal information.",
    updated: "September 2026",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "We collect the information you give us directly — like your name, email address, and payment details — when you create an account, enroll in a course, or apply to become a creator.",
          "We also collect limited technical data automatically, such as your browser type, device, and pages you visit, to keep the platform working and improve it.",
        ],
      },
      {
        heading: "How we use your information",
        bullets: [
          "Operating your account and delivering the courses you enroll in",
          "Processing payments and enrollments through our payment providers",
          "Sending you service updates and (only with consent) marketing emails",
          "Understanding usage so we can improve courses and features",
        ],
      },
      {
        heading: "Sharing",
        paragraphs: [
          "We never sell your personal data. We share it only with providers that help us run ByteSpace — payment processing, email delivery, and hosting — each bound to process it solely on our instructions.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You can access, correct, or delete your personal information at any time from your account settings, or by contacting us. If you are in the EEA or UK, you have additional rights under GDPR, including data portability and the right to object to processing.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about this policy? Email privacy@bytespace.example and we will respond promptly.",
        ],
      },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    description: "The agreement between you and ByteSpace when you use the platform.",
    updated: "September 2026",
    sections: [
      {
        heading: "Using ByteSpace",
        paragraphs: [
          "By creating an account you agree to these terms. You must provide accurate information, keep your credentials secure, and use the platform only for lawful learning and teaching.",
        ],
      },
      {
        heading: "Courses and enrollment",
        bullets: [
          "Courses are licensed to you personally for lifetime access unless stated otherwise",
          "Content may not be redistributed, resold, or systematically downloaded",
          "Purchases are one-time payments as shown at checkout",
          "Refunds are handled case by case within 14 days of purchase",
        ],
      },
      {
        heading: "Creator content",
        paragraphs: [
          "Creators keep ownership of the courses they upload and grant ByteSpace a license to host, market, and sell them. Creators are responsible for holding the rights to everything they publish.",
        ],
      },
      {
        heading: "Changes and termination",
        paragraphs: [
          "We may update these terms as the platform evolves; material changes will be announced in advance. You can stop using ByteSpace and delete your account at any time.",
        ],
      },
    ],
  },
  {
    slug: "cookies-settings",
    title: "Cookies Settings",
    description: "What cookies ByteSpace uses and how to control them.",
    updated: "September 2026",
    sections: [
      {
        heading: "Essential cookies",
        paragraphs: [
          "These keep you signed in, remember your cart, and store your theme preference (light or dark). They are always on — the site cannot function without them.",
        ],
        bullets: [
          "bytespace-theme — your light/dark preference",
          "bytespace-cart — the courses saved in your cart",
          "Session cookies — keeping you signed in securely",
        ],
      },
      {
        heading: "Analytics cookies",
        paragraphs: [
          "With your consent, we use privacy-respecting analytics to understand which courses and pages are useful. This data is aggregated and never identifies you personally.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "You can clear or block cookies in your browser settings at any time. Blocking essential cookies will break sign-in and cart functionality; blocking analytics cookies will not affect your experience.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((doc) => doc.slug === slug);
}
