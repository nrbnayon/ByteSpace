"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProgressCard } from "@/components/ui/progress-ring";
import { courses } from "@/data/courses";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const featured = courses[0];

/** Eight-layer Figma drop-shadow for the student cutout. */
const STUDENT_SHADOWS: [number, number, number, number][] = [
  [0.52, 0.74, 3.04, 10 / 255],
  [2.23, 3.19, 5.72, 15 / 255],
  [5.38, 7.69, 9.57, 18 / 255],
  [10.21, 14.58, 16.09, 20 / 255],
  [16.95, 24.21, 24, 23 / 255],
  [25.84, 36.91, 36, 26 / 255],
  [37.12, 53.03, 56, 27 / 255],
  [51.04, 72.91, 72, 33 / 255],
];

/**
 * Right-hand collage of the "Professional Growth" section — the course card,
 * the student cutout leaning out of it, the Learning Progress float and the
 * lime coil. Entrance + idle float are GSAP-driven; scroll parallax lifts the
 * layers at different depths.
 */
export function GrowthCollage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia(root);

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-anim]", { opacity: 1, y: 0, scale: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo("[data-anim='card']", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, 0.1)
          .fromTo("[data-anim='student']", { opacity: 0, y: 90 }, { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" }, 0.25)
          .fromTo("[data-anim='coil']", { opacity: 0, scale: 0.4, rotate: -40 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" }, 0.55)
          .fromTo("[data-anim='progress']", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8 }, 0.7);

        // Idle float — cards bob gently, forever.
        gsap.to("[data-float='1']", { y: 8, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to("[data-float='2']", { y: -10, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // Scroll parallax: deeper layers move slower.
        gsap.utils.toArray<HTMLElement>("[data-depth]", root).forEach((el) => {
          gsap.to(el, {
            yPercent: -Number(el.dataset.depth) * 16,
            ease: "none",
            scrollTrigger: { trigger: root.closest("section"), start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[560px]">
      {/* SVG filter defs for the silhouette drop-shadow */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <filter id="growth-student-shadow" x="-50%" y="-50%" width="220%" height="250%" colorInterpolationFilters="sRGB">
            {STUDENT_SHADOWS.map(([dx, dy, blur, alpha], i) => (
              <g key={i}>
                <feGaussianBlur in="SourceAlpha" stdDeviation={blur / 2} result={`b${i}`} />
                <feOffset in={`b${i}`} dx={dx} dy={dy} result={`o${i}`} />
                <feFlood floodColor="#000000" floodOpacity={alpha} result={`f${i}`} />
                <feComposite in={`f${i}`} in2={`o${i}`} operator="in" result={`s${i}`} />
              </g>
            ))}
            <feMerge>
              {STUDENT_SHADOWS.map((_, i) => (
                <feMergeNode key={i} in={`s${i}`} />
              ))}
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Course card (back layer) */}
      <div data-depth="0.15" className="relative z-10 ml-0 sm:ml-2">
        <article
          data-anim="card"
          data-float="1"
          className="w-full max-w-[300px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/10 sm:ml-0 lg:max-w-[340px]"
        >
          <div className="relative m-2.5 mb-0 aspect-[341/195] overflow-hidden rounded-xl">
            <Image
              src={featured.image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 340px, 80vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 p-4 pt-3">
            <h3 className="truncate text-lg font-semibold tracking-tight">{featured.title}</h3>
            <p className="text-xs text-muted-foreground">
              by <span className="font-medium text-primary">{featured.instructor}</span>
            </p>
            <p className="flex items-baseline gap-1">
              <span className="font-heading text-lg font-semibold text-primary">${featured.price}</span>
              <span className="text-xs text-muted-foreground">{featured.period}</span>
            </p>
          </div>
        </article>
      </div>

      {/* Student cutout (front layer, leans out of the card) */}
      <div data-depth="0.3" className="absolute inset-x-0 bottom-0 z-20 flex justify-center sm:justify-end sm:pr-6">
        <div data-anim="student" className="w-[62%] max-w-[320px] translate-y-[6%] sm:w-[58%]">
          <Image
            src="/images/growth/right-boy-full-section.png"
            alt="Student with headphones and a laptop"
            width={2812}
            height={2788}
            sizes="(min-width: 1024px) 420px, 70vw"
            className="h-auto w-full [filter:url(#growth-student-shadow)]"
          />
        </div>
      </div>

      {/* Lime coil */}
      <div data-depth="0.55" className="absolute -top-8 right-0 z-30 w-[72px] sm:-right-4 sm:w-[88px]">
        <div data-anim="coil" data-float="2">
          <Image
            src="/images/hero/white-coil-big.svg"
            alt=""
            width={330}
            height={330}
            sizes="88px"
            className="h-auto w-full"
          />
        </div>
      </div>

      {/* Learning Progress float */}
      <div data-depth="0.5" className="absolute -bottom-6 right-0 z-30 sm:-right-6 sm:top-[38%] sm:bottom-auto">
        <div data-anim="progress" data-float="1">
          <ProgressCard value={55} className="w-[200px] sm:w-[224px]" />
        </div>
      </div>
    </div>
  );
}
