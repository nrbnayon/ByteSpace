"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevenueCard } from "@/components/ui/revenue-card";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Left-hand collage of the "Create & Manage Courses" section — blue revenue
 * cards, the creator cutout holding a tablet (with the Happy Students card
 * baked into the artwork) and the lime coil. Same motion system as
 * GrowthCollage.
 */
export function CreatorCollage() {
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
        tl.fromTo("[data-anim='student']", { opacity: 0, y: 90 }, { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" }, 0.15)
          .fromTo("[data-anim='revenue']", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8 }, 0.4)
          .fromTo("[data-anim='revenue-2']", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8 }, 0.55)
          .fromTo("[data-anim='coil']", { opacity: 0, scale: 0.4, rotate: -40 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" }, 0.65);

        gsap.to("[data-float='1']", { y: 8, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to("[data-float='2']", { y: -9, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 });

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
      {/* Creator cutout */}
      <div data-depth="0.3" className="relative z-20 flex justify-center">
        <div data-anim="student" className="w-[74%] max-w-[360px] sm:w-[70%]">
          <Image
            src="/images/growth/left-girl-full-section.png"
            alt="Course creator with a headset holding a tablet"
            width={2345}
            height={2876}
            sizes="(min-width: 1024px) 400px, 70vw"
            className="h-auto w-full drop-shadow-[0_28px_48px_rgba(0,0,0,0.18)]"
          />
        </div>
      </div>

      {/* Total Revenue card */}
      <div data-depth="0.45" className="absolute left-0 top-[6%] z-30 sm:top-[8%]">
        <div data-anim="revenue" data-float="1">
          <RevenueCard label="Total Revenue" meta="July 1-28" value="$120.29" progress={62} />
        </div>
      </div>

      {/* Year to Date card */}
      <div data-depth="0.4" className="absolute left-0 top-[38%] z-30 sm:top-[42%]">
        <div data-anim="revenue-2" data-float="2">
          <RevenueCard label="Year to Date" meta="2023" value="$1,200.38" badge="+12$" />
        </div>
      </div>

      {/* Lime coil */}
      <div data-depth="0.55" className="absolute right-[4%] top-[30%] z-30 w-[64px] sm:w-[84px]">
        <div data-anim="coil" data-float="1">
          <Image
            src="/images/hero/white-coil-big.svg"
            alt=""
            width={330}
            height={330}
            sizes="84px"
            className="h-auto w-full"
          />
        </div>
      </div>

      {/* Happy Students card is baked into the cutout PNG — no overlay needed. */}
    </div>
  );
}
