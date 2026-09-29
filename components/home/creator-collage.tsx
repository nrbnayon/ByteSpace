"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Left-hand collage of the "Create & Manage Courses" section.
 *
 * The artwork (`left-girl-full-section.png`) is the design's own composite —
 * revenue cards, the creator cutout with a tablet, the Happy Students float
 * and the lime coil baked into one transparent PNG — animated as a single
 * layer: entrance fade-up, idle float, scroll parallax.
 */
export function CreatorCollage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia(root);

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-anim]", { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            "[data-anim='collage']",
            { opacity: 0, y: 90 },
            { opacity: 1, y: 0, duration: 1.15, ease: "power4.out" },
            0.15
          );

        gsap.to("[data-float]", {
          y: -10,
          duration: 3.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to("[data-depth]", {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: root.closest("section"),
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[620px]">
      <div data-depth="0.25" data-float className="relative z-10">
        <div data-anim="collage" className="opacity-0">
          <Image
            src="/images/growth/left-girl-full-section.png"
            alt="Creator with a headset holding a tablet, surrounded by Total Revenue and Year to Date earnings cards and a Happy Students badge"
            width={2345}
            height={2876}
            sizes="(min-width: 1024px) 560px, 88vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
