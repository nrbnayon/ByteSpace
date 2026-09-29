import type { Partner, Testimonial } from "@/lib/types";

export const testimonials: readonly Testimonial[] = [
  {
    id: "isabel-m",
    name: "Isabel M.",
    role: "UX Designer",
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content are unmatched. The flexibility and variety of courses on this platform truly makes a sense of community and shared learning.",
    rating: 5,
    avatar: { src: "/images/avatars/testimonial-1.png", width: 160, height: 160 },
  },
  {
    id: "alfredo-l",
    name: "Alfredo L.",
    role: "Developer",
    quote:
      "As a self-taught developer, this platform stands out for its vibrant community and support. The Course Editor is a standout feature, offering support from the team and a dedication to building connections.",
    rating: 5,
    avatar: { src: "/images/avatars/testimonial-2.png", width: 160, height: 160 },
  },
  {
    id: "alexa-b",
    name: "Alexa B.",
    role: "Course Creator",
    quote:
      "The community at ByteSpace has been a game-changer for me. The Course Editor is a standout feature, offering support from the team and a dedication to fostering connections in the business globally.",
    rating: 5,
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
