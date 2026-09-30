import type { Partner, Testimonial } from "@/lib/types";

/** Intro paragraph shown right of the section title. */
export const TESTIMONIALS_INTRO =
  "At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly from those who have experienced the transformative journey of learning and creating on our platform. Explore testimonials that reflect the diverse perspectives of enthusiastic learners and accomplished creators.";

export const testimonials: readonly Testimonial[] = [
  {
    id: "sarah-m",
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
    avatar: { src: "/images/avatars/testimonial-1.png", width: 160, height: 160 },
  },
  {
    id: "james-l",
    name: "James L.",
    role: "Lifelong Learner",
    quote:
      "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
    avatar: { src: "/images/avatars/testimonial-2.png", width: 160, height: 160 },
  },
  {
    id: "alex-b",
    name: "Alex B.",
    role: "Inspired Creator",
    quote:
      "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.",
    avatar: { src: "/images/avatars/testimonial-3.png", width: 160, height: 160 },
  },
];

export const partners: readonly Partner[] = [
  { id: "logoipsum-1", name: "Logoipsum One", logo: "/images/partners/logoipsum-1.svg", width: 167, height: 41 },
  { id: "logoipsum-2", name: "Logoipsum Two", logo: "/images/partners/logoipsum-2.svg", width: 168, height: 41 },
  { id: "logoipsum-3", name: "Logoipsum Three", logo: "/images/partners/logoipsum-3.svg", width: 170, height: 41 },
  { id: "logoipsum-4", name: "Logoipsum Four", logo: "/images/partners/logoipsum-4.svg", width: 170, height: 41 },
  { id: "logoipsum-5", name: "Logoipsum Five", logo: "/images/partners/logoipsum-5.svg", width: 169, height: 42 },
];
