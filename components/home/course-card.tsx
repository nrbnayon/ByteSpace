import Image from "next/image";
import Link from "next/link";
import { Clock, MessageSquare, PlaySquare } from "lucide-react";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { Rating } from "@/components/ui/rating";
import { courseStudentAvatars } from "@/data/stats";
import type { Course } from "@/lib/types";
import { cn } from "@/lib/utils";

const highlightIcons = [PlaySquare, Clock, MessageSquare] as const;

type CourseCardProps = {
  course: Course;
  className?: string;
};

export function CourseCard({ course, className }: CourseCardProps) {
  return (
    <article
      className={cn(
        "relative flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5",
        className
      )}
    >
      {/* Cover image + meta pills */}
      <div className="relative m-4 mb-0 aspect-[341/195] overflow-hidden rounded-2xl">
        <Image
          src={course.image.src}
          alt=""
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 373px"
          className="object-cover"
        />
        <ul className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {course.highlights.map((highlight, i) => {
            const Icon = highlightIcons[i % highlightIcons.length];
            return (
              <li
                key={highlight}
                className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-md"
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {highlight}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-xl font-semibold tracking-tight">
              <Link
                href={`/courses/${course.id}`}
                className="rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring after:absolute after:inset-0"
              >
                {course.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              by <span className="font-medium text-primary">{course.instructor}</span>
            </p>
          </div>
          <Rating value={course.rating.score} />
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">
            {course.level}
          </span>
          <AvatarStack
            label={`${course.studentsExtra}+ students enrolled this month`}
            images={courseStudentAvatars.map((src) => ({ src, width: 64, height: 64 }))}
            extraLabel={`${course.studentsExtra}+`}
            size={32}
          />
        </div>

        <p className="flex items-baseline gap-1">
          <span className="font-heading text-xl font-semibold text-primary">
            ${course.price}
          </span>
          <span className="text-sm text-muted-foreground">{course.period}</span>
        </p>
      </div>
    </article>
  );
}
