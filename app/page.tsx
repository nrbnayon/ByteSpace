import { Hero } from "@/components/home/hero";
import { Partners } from "@/components/home/partners";
import { CourseExplorer } from "@/components/home/course-explorer";
import { LearningPaths } from "@/components/home/learning-paths";
import { ProfessionalGrowth } from "@/components/home/professional-growth";
import { CreatorSection } from "@/components/home/creator-section";
import { CreatorCta } from "@/components/home/creator-cta";
import { Testimonials } from "@/components/home/testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { coursesJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={coursesJsonLd()} />
      <Hero />
      <Partners />
      <CourseExplorer />
      <LearningPaths />
      <ProfessionalGrowth />
      <CreatorSection />
      <CreatorCta />
      <Testimonials />
    </>
  );
}
