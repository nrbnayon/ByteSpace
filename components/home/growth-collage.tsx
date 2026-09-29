"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Right-hand collage of the "Professional Growth" section.
 *
 * The artwork (`right-boy-full-section.png`) is the design's own composite —
 * course card, student cutout, Learning Progress float and lime coil baked
 * into one transparent PNG — so it is rendered as a single layer and animated
 * as a whole: entrance fade-up, gentle idle float, and scroll parallax.
 */
export function GrowthCollage() {
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

        // Idle bob — the whole collage breathes.
        gsap.to("[data-float]", {
          y: 10,
          duration: 3.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Scroll parallax — the collage lifts slightly slower than the page.
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
            src="/images/growth/right-boy-full-section.png"
            alt="Course preview card with a smiling student holding a laptop, a 55% learning progress badge and a lime coil"
            width={2812}
            height={2788}
            sizes="(min-width: 1024px) 560px, 88vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
