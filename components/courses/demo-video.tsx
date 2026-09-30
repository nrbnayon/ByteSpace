"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseDetail } from "@/lib/types";

/**
 * Course preview player — a YouTube lite-embed facade. Shows the course
 * poster with a play button; clicking swaps in the real YouTube iframe
 * (autoplay). YouTube embeds play everywhere, unlike direct MP4 URLs that
 * can be blocked or unreachable. Swap the video id per course when real
 * lesson videos exist (ideally via a `videoUrl` field on CourseDetail).
 */
const DEMO_YOUTUBE_ID = "aqz-KE-bpKQ"; // Big Buck Bunny — official Blender upload

export function CourseVideo({
  course,
  className,
}: {
  course: CourseDetail;
  className?: string;
}) {
  const [activated, setActivated] = useState(false);

  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-[#e8e8e8]", className)}>
      {activated ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${DEMO_YOUTUBE_ID}?autoplay=1&rel=0`}
          title={`Course preview: ${course.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-[16/10] w-full border-0"
        />
      ) : (
        <>
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label={`Play course preview: ${course.title}`}
            className="group relative block w-full cursor-pointer"
          >
            {/* Poster via img (next/image would need remotePatterns; keep it simple) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={course.image.src}
              alt=""
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
              <span className="flex size-20 items-center justify-center rounded-3xl bg-[#c9a795]/80 shadow-xl transition duration-300 group-hover:scale-110 group-hover:bg-[#c9a795] lg:size-24">
                <Play className="size-9 fill-white text-white" aria-hidden="true" />
              </span>
            </span>
          </button>
        </>
      )}
    </div>
  );
}
