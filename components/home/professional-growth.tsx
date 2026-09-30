"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureCheck } from "@/components/ui/feature-check";
import { GrowthCollage } from "@/components/home/growth-collage";
import { CreatorCollage } from "@/components/home/creator-collage";
import { creatorBenefits, growthStats } from "@/data/stats";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Radial glow palette from the Figma spec (node 22-321), kept as CSS
 * gradients — resolution-independent, themeable via CSS vars, and cheaper
 * than shipping raster/SVG glow files.
 *
 * Geometry was pixel-probed from the original design render: each entry is
 * `radial-gradient(<rx> <ry> at <cx> <cy>, …)` with radii/center as % of the
 * section box, so glows can center off-canvas and bleed past the edges.
 * They all paint on ONE layer (joined in `style.background`) — per-element
 * backdrop-filter ellipses produced a visible seam arc where they crossed
 * the section's overflow clip, which this single-layer approach removes.
 */
const GLOW_LAYERS = [
  // Lime core, bottom-left — small & intense; FIRST layer paints on TOP so
  // the blue washes beneath can't muddy it (matches the original's paint
  // order), with a raised peak to compensate for the shared 40px blur
  "radial-gradient(18% 18% at 2.5% 88.5%, rgba(203, 252, 1, 0.82) 0%, rgba(203, 252, 1, 0.188) 53%, rgba(203, 252, 1, 0.049) 75%, rgba(203, 252, 1, 0) 100%)",
  // Blue wash, bottom-right corner — strongest blue, hugging the corner
  "radial-gradient(42% 42.5% at 96% 106.5%, rgba(0, 59, 226, 0.24) 0%, rgba(0, 59, 226, 0.0552) 53%, rgba(0, 59, 226, 0.0144) 75%, rgba(0, 59, 226, 0) 100%)",
  // Blue wash, top-right edge (center off-canvas)
  "radial-gradient(30% 30% at 98% 8%, rgba(0, 59, 226, 0.08) 0%, rgba(0, 59, 226, 0.0184) 53%, rgba(0, 59, 226, 0.0048) 75%, rgba(0, 59, 226, 0) 100%)",
  // Blue wash, mid-left edge (center off-canvas)
  "radial-gradient(30% 30% at -5% 48%, rgba(0, 59, 226, 0.16) 0%, rgba(0, 59, 226, 0.0368) 53%, rgba(0, 59, 226, 0.0096) 75%, rgba(0, 59, 226, 0) 100%)",
  // Lime bloom, top-left — the section's dominant glow, center just above the top edge
  "radial-gradient(21.5% 44% at 28.5% 2%, rgba(203, 252, 1, 0.4) 0%, rgba(203, 252, 1, 0.092) 53%, rgba(203, 252, 1, 0.024) 75%, rgba(203, 252, 1, 0) 100%)",
] as const;

export function ProfessionalGrowth() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia(root);

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-anim]", { opacity: 1, y: 0 });
        gsap.set("[data-glow]", { opacity: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo("[data-glow]", { opacity: 0 }, { opacity: 1, duration: 1.4, stagger: 0.08 }, 0)
          .fromTo("[data-anim='title']", { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.9 }, 0.15)
          .fromTo("[data-anim='body']", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.35)
          .fromTo("[data-anim='stats']", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5);

        // Counters count up when the stats scroll into view.
        gsap.utils.toArray<HTMLElement>("[data-count]", root).forEach((el) => {
          const target = Number(el.dataset.count);
          const suffix = el.dataset.suffix ?? "";
          const state = { v: 0 };
          gsap.to(state, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent = `${Math.round(state.v)}${suffix}`;
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="growth-title"
      className="relative isolate overflow-hidden bg-[#FAFAFA] py-20 lg:py-28 dark:bg-[#101322]"
    >
      {/* Radial glow layer (decorative) — single painted layer, no element
          seams; plain filter blur ≈ Figma's feGaussianBlur, avoiding the
          backdrop-filter clip artifact. Layer bleeds 40px past the clip so
          the blur samples gradient, not transparency, at the section edges.
          Dark-mode dimming lives on the wrapper so GSAP's inline opacity on
          the layer itself can never override it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 dark:opacity-60"
      >
        <div
          data-glow
          style={{ background: GLOW_LAYERS.join(", "), opacity: 0 }}
          className="absolute inset-0 blur-[40px]"
        />
      </div>

      <Container>
        {/* Row 1 — copy + stats left, collage right */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col items-start gap-10">
            <SectionHeading
              id="growth-title"
              align="left"
              title="Your Path to Professional Growth Starts Here!"
              subtitle="Explore our curated selection of courses tailored to enhance your capabilities and accelerate your career journey. Whether you are looking to sharpen specific skills, gain industry expertise, or embark on a new career path entirely, we have the resources you need."
              className="[&_h2]:max-w-[30rem] [&_p]:max-w-[30rem]"
            />
            <dl className="flex gap-12 lg:gap-16">
              {growthStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="order-2 text-base text-muted-foreground">{stat.label}</dt>
                  <dd
                    data-anim="stats"
                    data-count={parseInt(stat.value, 10)}
                    data-suffix={stat.value.replace(/[0-9]/g, "")}
                    className="order-1 font-heading text-4xl font-medium tracking-tight text-primary opacity-100 lg:text-5xl"
                  >
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <GrowthCollage />
        </div>

        {/* Row 2 — creator collage left, copy right (mirrored) */}
        <div className="mt-24 grid items-center gap-14 lg:mt-32 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <CreatorCollage />
          </div>
          <div className="order-1 flex flex-col items-start gap-8 lg:order-2">
            <h2
              data-anim="title"
              className="max-w-xl text-balance text-4xl leading-[1.2] opacity-0 lg:text-[2.75rem]"
            >
              Create &amp; Manage Courses Easily.
            </h2>
            <p data-anim="body" className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground opacity-0 lg:text-lg">
              <strong className="font-semibold text-foreground">ByteSpace</strong> supports
              individuals or entities in the creation, publication, and administration of
              educational courses.
            </p>
            <ul data-anim="stats" className="flex flex-col gap-4 opacity-0">
              {creatorBenefits.map((benefit) => (
                <FeatureCheck key={benefit}>{benefit}</FeatureCheck>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
