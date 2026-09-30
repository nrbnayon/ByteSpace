import Image from "next/image";
import { FeatureCheck } from "@/components/ui/feature-check";
import type { CourseDetail } from "@/lib/types";

/**
 * About tab — description paragraphs, the four-image "Sneak Peak" gallery
 * and the "Key Points" checklist (reuses the brand FeatureCheck badge).
 */
export function CourseAboutPanel({ course }: { course: CourseDetail }) {
  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="course-description-title">
        <h3
          id="course-description-title"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Description
        </h3>
        <div className="mt-4 flex max-w-3xl flex-col gap-4">
          {course.description.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-pretty leading-[1.7] text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section aria-labelledby="sneak-peek-title">
        <h3
          id="sneak-peek-title"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Sneak Peak
        </h3>
        <ul className="mt-5 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {course.sneakPeek.map((image) => (
            <li key={image.src} className="overflow-hidden rounded-2xl">
              <Image
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 45vw, 220px"
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="key-points-title">
        <h3
          id="key-points-title"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Key Points
        </h3>
        <ul className="mt-5 flex flex-col gap-4">
          {course.keyPoints.map((point) => (
            <FeatureCheck key={point}>{point}</FeatureCheck>
          ))}
        </ul>
      </section>
    </div>
  );
}
