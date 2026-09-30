"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const poppins = "font-[family-name:var(--font-poppins)]";
const satoshi = "font-[family-name:var(--font-satoshi)]";

/**
 * Design canvas = 1440 × 488 (Figma). From `lg` up, every element uses its
 * exact Figma coordinate and the canvas is scaled with --s = min(1, width/1440).
 *  --cw   real container width (set by JS, CSS fallback = 100vw)
 *  --edge canvas-x of the real screen edge → shapes stay glued to the real
 *         left / right edge of the screen on wide monitors.
 */
const rootStyle = {
  "--s": "min(1, tan(atan2(100vw, 1440px)))",
  "--cw": "100vw",
  "--edge": "calc(720px - var(--cw) / (2 * var(--s)))",
} as CSSProperties;

// 120px grid, lines at canvas x = 720 ± 120k and y = 120k (matches Figma)
const gridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,.12) 2px, transparent 2px), linear-gradient(to bottom, rgba(255,255,255,.12) 2px, transparent 2px)",
  backgroundSize: "var(--g) var(--g)",
  backgroundPosition: "calc(50% + var(--g) / 2) var(--g)",
};

/**
 * Bounding boxes measured from the 1440 × 488 design.
 *  side "left"  → x = distance from the LEFT screen edge
 *  side "right" → x = distance from the RIGHT screen edge
 *  edge = true  → the piece is cut off by the frame, so it only "breathes"
 *                 (scale from its edge) instead of moving/rotating (no gaps).
 * `img` = extra class for the image itself if an export needs flipping/rotating.
 */
const SHAPES = [
  {
    id: "coil-top-left",
    src: "/images/creator/yellow-coil-top-left-corner.svg",
    side: "left", x: 0, y: 0, w: 165, h: 172,
    edge: true, origin: "0% 0%", fx: -160, fy: -100, rot: -25,
    fit: "object-left-top", img: "",
    cls: "left-0 top-0 w-[24vw] max-w-[120px] lg:left-[var(--x)] lg:top-0 lg:w-[165px] lg:max-w-none",
  },
  {
    id: "white-squiggle",
    src: "/images/creator/yellow-coil-top.svg", // the white squiggle in the design
    side: "left", x: 212, y: 34, w: 114, h: 121,
    edge: false, origin: "50% 50%", fx: -60, fy: -120, rot: -40,
    fit: "object-center", img: "", // e.g. "-scale-x-100" or "rotate-[28deg]" if the export orientation differs
    cls: "hidden lg:block lg:left-[var(--x)] lg:top-[34px] lg:w-[114px]",
  },
  {
    id: "white-cone",
    src: "/images/creator/left-white-triangle.svg",
    side: "left", x: 0, y: 242, w: 115, h: 125,
    edge: true, origin: "0% 50%", fx: -140, fy: 40, rot: -20,
    fit: "object-left", img: "",
    cls: "hidden lg:block lg:left-[var(--x)] lg:top-[242px] lg:w-[115px]",
  },
  {
    id: "lime-ring",
    src: "/images/creator/bottom-yellow-circle.svg",
    side: "left", x: 70, y: 358, w: 237, h: 130,
    edge: true, origin: "50% 100%", fx: -100, fy: 140, rot: -15,
    fit: "object-bottom", img: "",
    cls: "hidden sm:block bottom-0 left-[4%] w-[26vw] max-w-[150px] lg:bottom-auto lg:left-[var(--x)] lg:top-[358px] lg:w-[237px] lg:max-w-none",
  },
  {
    id: "lime-triangle",
    src: "/images/auth/yellow-triangle.svg", // reused from the auth artwork (same 126 × 137 render)
    side: "right", x: 210, y: 21, w: 125, h: 139,
    edge: false, origin: "50% 50%", fx: 80, fy: -120, rot: 35,
    fit: "object-center", img: "",
    cls: "hidden lg:block lg:right-[var(--x)] lg:top-[21px] lg:w-[125px]",
  },
  {
    id: "white-cylinder",
    src: "/images/creator/right-white-cylinder.svg",
    side: "right", x: 0, y: 40, w: 170, h: 300,
    edge: true, origin: "100% 50%", fx: 160, fy: -40, rot: 20,
    fit: "object-right", img: "",
    cls: "hidden lg:block lg:right-[var(--x)] lg:top-[40px] lg:w-[170px]",
  },
  {
    id: "coil-bottom-right",
    src: "/images/creator/yellow-coil-bottom-right.svg",
    side: "right", x: 70, y: 328, w: 192, h: 160,
    edge: true, origin: "50% 100%", fx: 120, fy: 140, rot: 20,
    fit: "object-bottom", img: "",
    cls: "bottom-0 right-[2%] w-[30vw] max-w-[140px] lg:bottom-auto lg:right-[var(--x)] lg:top-[328px] lg:w-[192px] lg:max-w-none",
  },
] as const;

export function CreatorCta() {
  const rootRef = useRef<HTMLElement>(null);

  // Exact container width + scale before first paint
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const update = () => {
      const cw = el.clientWidth;
      el.style.setProperty("--cw", `${cw}px`);
      el.style.setProperty("--s", String(Math.min(1, cw / 1440)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia(root);

      // Reduced motion: everything visible, nothing moves
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-anim]", { opacity: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const shapes = gsap.utils.toArray<HTMLElement>("[data-shape]", root);
        shapes.forEach((el) => gsap.set(el, { transformOrigin: el.dataset.origin }));

        // Idle motion. Pieces cut by the frame only breathe from their edge (never open a gap).
        const startIdle = () => {
          shapes.forEach((el, i) => {
            const dir = i % 2 ? -1 : 1;
            if (el.hasAttribute("data-edge")) {
              gsap.to(el, {
                scale: 1.05,
                duration: gsap.utils.random(3, 4.5),
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            } else {
              gsap.to(el, {
                y: dir * gsap.utils.random(10, 16),
                rotate: -dir * gsap.utils.random(3, 6),
                duration: gsap.utils.random(3, 4.5),
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            }
          });
        };

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: root, start: "top 75%", once: true },
          })
          .fromTo("[data-copy='title']", { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0)
          .fromTo("[data-copy='text']", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.12)
          .fromTo("[data-copy='cta']", { y: 24, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 }, 0.26)
          .fromTo(
            shapes,
            {
              opacity: 0,
              scale: 0.5,
              x: (_: number, el: HTMLElement) => Number(el.dataset.fx) || 0,
              y: (_: number, el: HTMLElement) => Number(el.dataset.fy) || 0,
              rotate: (_: number, el: HTMLElement) => Number(el.dataset.rot) || 0,
            },
            { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, duration: 1.2, ease: "back.out(1.4)", stagger: 0.08 },
            0.1,
          )
          .add(startIdle);
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      style={rootStyle}
      aria-labelledby="cta-title"
      className={`${satoshi} relative isolate overflow-hidden bg-[#003be2] text-[#f5f5f6] lg:h-[calc(488px*var(--s))]`}
    >
      {/* Grid (120px cells on desktop, 64px on mobile) */}
      <div
        aria-hidden="true"
        style={gridStyle}
        className="pointer-events-none absolute inset-0 -z-10 [--g:64px] lg:[--g:calc(120px*var(--s))]"
      />

      {/* Canvas: fluid below lg, 1440 × 488 scaled from lg */}
      <div className="relative flex min-h-[440px] w-full items-center justify-center px-6 py-24 sm:px-8 lg:absolute lg:left-1/2 lg:top-0 lg:block lg:h-[488px] lg:min-h-0 lg:w-[1440px] lg:origin-top lg:p-0 lg:[translate:-50%_0] lg:[scale:var(--s)]">
        {/* Decorative 3D shapes */}
        {SHAPES.map((s) => (
          <div
            key={s.id}
            aria-hidden="true"
            style={
              {
                aspectRatio: `${s.w} / ${s.h}`,
                "--x": `calc(var(--edge) + ${s.x}px)`,
              } as CSSProperties
            }
            className={`pointer-events-none absolute z-0 ${s.cls}`}
          >
            <div
              data-anim
              data-shape
              {...(s.edge ? { "data-edge": "" } : {})}
              data-origin={s.origin}
              data-fx={s.fx}
              data-fy={s.fy}
              data-rot={s.rot}
              className="relative size-full opacity-0"
            >
              <Image
                src={s.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 240px, 30vw"
                className={`select-none object-contain ${s.fit} ${s.img}`}
              />
            </div>
          </div>
        ))}

        {/* Copy: title 44px / paragraph 18px / button, 40px apart, centred in the 488px frame */}
        <div className="relative z-10 flex flex-col items-center gap-8 text-center lg:absolute lg:left-0 lg:top-[85px] lg:w-full lg:gap-10">
          <h2
            id="cta-title"
            data-anim
            data-copy="title"
            className={`${poppins} max-w-[680px] text-balance text-4xl font-semibold leading-[1.2] tracking-[-0.01em] text-[#f5f5f6] opacity-0 sm:text-[2.5rem] lg:w-[680px] lg:text-[44px] lg:[text-wrap:wrap]`}
          >
            Unlock Your Potential as a Creator with ByteSpace
          </h2>

          <p
            data-anim
            data-copy="text"
            className="max-w-[640px] text-pretty text-base leading-[1.6] text-[#e5e6e8] opacity-0 sm:text-lg lg:w-[966px] lg:max-w-none lg:[text-wrap:wrap]"
          >
            Experience the collaboration of numerous creators and an expanding selection of courses.
            Register now and become a part of a community comprising over 10,000 local and international
            creators. Utilize our Course Editor, and showcase your expertise by publishing your finest
            course on the ByteSpace Course Library.
          </p>

          <div data-anim data-copy="cta" className="opacity-0">
            <Link
              href="/become-a-creator"
              className="inline-block cursor-pointer rounded-3xl bg-[#d4fb20] px-6 py-3 text-lg font-medium leading-[1.2] text-[#242528] transition duration-200 hover:-translate-y-0.5 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:translate-y-0 active:scale-95"
            >
              Join as Creator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}