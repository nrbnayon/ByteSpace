import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseDetail } from "@/lib/types";

/**
 * Course preview player — native controls, poster from the course cover,
 * decorative play affordance centered like the design mock.
 */
export function CourseVideo({
  course,
  className,
}: {
  course: CourseDetail;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl", className)}>
      <video
        controls
        preload="none"
        poster={course.image.src}
        aria-label={`Course preview: ${course.title}`}
        className="aspect-[16/10] w-full bg-[#e8e8e8] object-cover"
      >
        <track kind="captions" />
      </video>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-[#c9a795]/70"
      >
        <Play className="size-8 fill-white text-white" />
      </span>
    </div>
  );
}
