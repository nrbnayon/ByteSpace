"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/brand/logo";
import { heroStudentAvatars } from "@/data/stats";

gsap.registerPlugin(useGSAP);

export type AuthMode = "sign-in" | "sign-up";

type AuthShellProps = {
  mode: AuthMode;
};

const satoshi = "font-[family-name:var(--font-satoshi)]";

/**
 * Canvas = 1440 × 1024, same formula as Hero so all content aligns
 * identically with the hero section and every other page section.
 */
// Width-only scale: canvas always fills the full viewport width.
// Height never constrains --s, so there are no side gaps on short screens.
const rootStyle = {
  "--s": "min(1, tan(atan2(100vw, 1440px)))",
} as CSSProperties;

// Identical grid style to hero (2px lines, rgba(255,255,255,0.1))
const gridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,.1) 2px, transparent 2px), linear-gradient(to bottom, rgba(255,255,255,.1) 2px, transparent 2px)",
  backgroundSize: "var(--g) var(--g)",
  backgroundPosition: "calc(50% + var(--g) / 2) var(--g)",
};

export function AuthShell({ mode }: AuthShellProps) {
  const isSignUp = mode === "sign-up";
  const rootRef = useRef<HTMLDivElement>(null);

  // Exact fit-to-screen scale, matching the hero's useLayoutEffect
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const update = () => {
      const cw = el.clientWidth;
      // Width-only: canvas always fills 100 vw (no height constraint)
      const s = Math.min(1, cw / 1440);
      el.style.setProperty("--s", String(s));
    };
    update();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    ro?.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia(root);

      // Reduced motion: show everything
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-anim]", { opacity: 1 });
      });

      // Entrance + idle float
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const startFloat = () => {
          gsap.utils.toArray<HTMLElement>("[data-float]", root).forEach((el, i) => {
            const dir = i % 2 ? -1 : 1;
            gsap.to(el, {
              y: dir * gsap.utils.random(8, 14),
              ...(el.hasAttribute("data-spin")
                ? { rotate: -dir * gsap.utils.random(2, 4) }
                : {}),
              duration: gsap.utils.random(3, 4.6),
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          });
        };

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo("[data-anim='logo']", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
          .fromTo("[data-anim='intro']", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.1)
          .fromTo("[data-anim='form']", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, 0.3)
          .fromTo("[data-anim='field']", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.6)
          .fromTo("[data-anim='card-back']", { opacity: 0, x: -60, rotate: -4 }, { opacity: 1, x: 0, rotate: 0, duration: 0.9 }, 0.25)
          .fromTo("[data-anim='card-front']", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9 }, 0.4)
          .fromTo("[data-anim='donut']", { opacity: 0, scale: 0.4, rotate: -60 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" }, 0.7)
          .fromTo("[data-anim='triangle']", { opacity: 0, y: 40, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, 0.8)
          .fromTo("[data-anim='students']", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.85)
          .fromTo("[data-anim='coil']", { opacity: 0, scale: 0.5, rotate: -30 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.6)" }, 0.95)
          .add(startFloat);
      });

      // Gentle mouse parallax (desktop pointer devices only)
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (hover: hover)",
        () => {
          const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", root).map((el) => ({
            d: Number(el.dataset.depth),
            x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
            y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
          }));
          const onMove = (e: PointerEvent) => {
            const r = root.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            layers.forEach((l) => { l.x(-nx * l.d * 30); l.y(-ny * l.d * 30); });
          };
          const onLeave = () => layers.forEach((l) => { l.x(0); l.y(0); });
          root.addEventListener("pointermove", onMove);
          root.addEventListener("pointerleave", onLeave);
          return () => {
            root.removeEventListener("pointermove", onMove);
            root.removeEventListener("pointerleave", onLeave);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      style={rootStyle}
      className={`${satoshi} relative isolate overflow-x-hidden bg-[#003be2] text-white min-h-svh lg:min-h-[max(100svh,calc(1024px*var(--s)))]`}
    >
      {/* Grid — [--g:64px] mobile, calc(120px*--s) desktop */}
      <div
        aria-hidden="true"
        style={gridStyle}
        className="pointer-events-none absolute inset-0 -z-10 [--g:64px] lg:[--g:calc(120px*var(--s))]"
      />

      {/*
       * Canvas:
       * Below lg → fluid centred column.
       * From lg → 1440×1024 canvas, width-scaled to fill viewport, centred from top.
       * --s is width-only so canvas always spans 100vw — no side gaps.
       */}
      <div className="relative flex min-h-svh w-full flex-col items-center justify-center px-5 py-24 sm:px-8 lg:absolute lg:left-1/2 lg:top-0 lg:block lg:h-[1024px] lg:min-h-0 lg:w-[1440px] lg:origin-top lg:p-0 lg:[translate:-50%_0] lg:[scale:var(--s)]">

        {/* Logo (Figma: x122 y35) */}
        <div className="absolute left-5 top-6 z-20 lg:left-[122px] lg:top-[35px]">
          <div data-anim="logo" className="opacity-0">
            <Link
              href="/"
              aria-label="ByteSpace home"
              className="inline-flex w-fit rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4fb20]"
            >
              <Logo withWordmark={false} className="text-secondary" />
            </Link>
          </div>
        </div>

        {/* Intro text (Figma: x122 y120, 480px wide) — desktop only */}
        <section
          aria-labelledby="auth-intro-title"
          className="hidden lg:absolute lg:left-[122px] lg:top-[120px] lg:z-10 lg:block lg:w-[480px]"
        >
          <h2
            id="auth-intro-title"
            data-anim="intro"
            className="text-xl font-semibold leading-[1.2] text-white opacity-0"
          >
            {isSignUp ? "Sign up and come in" : "Sign in with ease"}
          </h2>
          <p
            data-anim="intro"
            className="mt-4 text-lg leading-[1.6] text-[#e5e6e8] opacity-0"
          >
            {isSignUp
              ? "The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost."
              : "Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."}
          </p>
        </section>

        {/* Decorative collage — desktop only, Figma coordinates */}
        <AuthCollage />

        {/* Form card (Figma: x741 y120, 579×784) */}
        <div
          data-anim="form"
          className="relative w-full max-w-[579px] rounded-[24px] bg-white p-6 text-[#242528] opacity-0 shadow-xs shadow-black/20 sm:p-10 lg:absolute lg:left-[741px] lg:top-[120px] lg:h-[784px] lg:max-w-none lg:w-[579px] lg:overflow-hidden lg:p-16"
          aria-label={isSignUp ? "Create your ByteSpace account" : "Sign in to ByteSpace"}
        >
          <AuthForm mode={mode} />
        </div>
      </div>
    </div>
  );
}

/** Positioned wrapper: parallax depth outer → entrance/float inner. */
function Piece({
  depth,
  className,
  anim,
  float = true,
  spin = false,
  children,
}: {
  depth: number;
  className: string;
  anim: string;
  float?: boolean;
  spin?: boolean;
  children: ReactNode;
}) {
  return (
    <div data-depth={depth} className={`absolute ${className}`}>
      <div
        data-anim={anim}
        {...(float ? { "data-float": "" } : {})}
        {...(spin ? { "data-spin": "" } : {})}
        className="opacity-0"
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Left collage — exact Figma coordinates on the 1440×1024 canvas.
 * Hidden below lg (desktop only).
 */
function AuthCollage() {
  return (
    <div className="hidden lg:contents">
      {/* Back card – "Build Digital Asset" (373×384 at x122 y394) */}
      <Piece depth={0.3} anim="card-back" float={false} className="left-[122px] top-[394px] z-[1] w-[373px]">
        <Image
          src="/images/auth/auth-left-bg-card-2.png"
          alt="Build Digital Asset course card, beginner level, $25 lifetime"
          width={373}
          height={384}
          sizes="373px"
          className="h-auto w-full select-none rounded-2xl overflow-hidden shadow-2xl shadow-black/25"
        />
      </Piece>

      {/* Front card – "the Power of Big Data" (373×384 at x233 y305) */}
      <Piece depth={0.45} anim="card-front" className="left-[233px] top-[305px] z-[2] w-[373px]">
        <Image
          src="/images/auth/auth-left-bg-card-1.png"
          alt="The Power of Big Data course card, beginner level, 4.5 rating, $25 lifetime"
          width={373}
          height={384}
          sizes="373px"
          priority
          className="h-auto w-full select-none rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
        />
      </Piece>

      {/* Lime "Happy Students" card (257×122 at x348 y740) */}
      <Piece depth={0.6} anim="students" className="left-[348px] top-[740px] z-[3] w-[257px]">
        <div className="flex w-[257px] select-none flex-col justify-center gap-2 rounded-2xl bg-[#d4fb20] p-4 text-[#242528] shadow-xl">
          <div className="flex flex-col">
            <p className="text-base font-medium leading-[1.2]">Happy Students</p>
            <p className="flex items-center text-xs leading-[1.6]">
              <span className="font-bold">4.5&nbsp;</span>
              <span className="text-[#242528]/55">(240)</span>
              <Star className="size-4 fill-[#003be2] text-[#003be2]" aria-hidden="true" />
            </p>
          </div>
          <div className="flex" role="img" aria-label="Over 2,000 happy students">
            {heroStudentAvatars.slice(0, 7).map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={86}
                height={86}
                className="-mr-4 size-[43px] shrink-0 rounded-full object-cover"
              />
            ))}
            <span className="grid size-[43px] shrink-0 place-items-center rounded-full bg-[#242528] text-xs font-bold leading-[1.5] text-white">
              2K+
            </span>
          </div>
        </div>
      </Piece>

      {/* Lime triangle (~126×137 at x122 y724) */}
      <Piece depth={0.9} anim="triangle" spin className="left-[122px] top-[724px] z-[4] w-[126px]">
        <Image
          src="/images/auth/yellow-triangle.svg"
          alt="" aria-hidden="true"
          width={126} height={137}
          className="pointer-events-none h-auto w-full select-none"
        />
      </Piece>

      {/* Lime donut (~101×94 at x172 y345) — on top of both cards */}
      <Piece depth={1} anim="donut" spin className="left-[172px] top-[345px] z-[5] w-[101px]">
        <Image
          src="/images/auth/yellow-circle.svg"
          alt="" aria-hidden="true"
          width={101} height={94}
          className="pointer-events-none h-auto w-full select-none"
        />
      </Piece>

      {/* White coil (~116×122 at x502 y655) — topmost */}
      <Piece depth={1} anim="coil" spin className="left-[502px] top-[655px] z-[6] w-[116px]">
        <Image
          src="/images/auth/white-coil-big.svg"
          alt="" aria-hidden="true"
          width={116} height={122}
          className="pointer-events-none h-auto w-full select-none"
        />
      </Piece>
    </div>
  );
}