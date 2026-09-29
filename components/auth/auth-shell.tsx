"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/brand/logo";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { heroStudentAvatars } from "@/data/stats";

gsap.registerPlugin(useGSAP);

export type AuthMode = "sign-in" | "sign-up";

type AuthShellProps = {
  mode: AuthMode;
};

export function AuthShell({ mode }: AuthShellProps) {
  const isSignUp = mode === "sign-up";
  const rootRef = useRef<HTMLDivElement>(null);

  // Entrance animations for the collage + form (skipped for reduced motion).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-anim]", { opacity: 1, y: 0, x: 0, scale: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo("[data-anim='logo']", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
          .fromTo("[data-anim='intro']", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
          .fromTo("[data-anim='card-back']", { opacity: 0, x: -60, rotate: -5 }, { opacity: 1, x: 0, rotate: 0, duration: 0.9 }, 0.25)
          .fromTo("[data-anim='card-front']", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9 }, 0.4)
          .fromTo("[data-anim='donut']", { opacity: 0, scale: 0.4, rotate: -60 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" }, 0.55)
          .fromTo("[data-anim='coil']", { opacity: 0, scale: 0.5, rotate: -30 }, { opacity: 1, scale: 1, rotate: 8, duration: 0.8, ease: "back.out(1.6)" }, 0.65)
          .fromTo("[data-anim='triangle']", { opacity: 0, y: 40, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, 0.75)
          .fromTo("[data-anim='students']", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.85)
          .fromTo("[data-anim='form']", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.3);

        // Idle float on the decorative pieces.
        gsap.to("[data-float='1']", { y: 10, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to("[data-float='2']", { y: -9, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="auth-grid min-h-screen bg-[#003BE2] text-white">
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] lg:grid-cols-[minmax(0,1fr)_minmax(480px,600px)] lg:gap-14 lg:px-12 xl:gap-20 xl:px-20">
        <section className="hidden min-h-screen flex-col px-8 pb-12 pt-7 lg:flex xl:px-0" aria-labelledby="auth-intro-title">
          <div data-anim="logo">
            <Link href="/" aria-label="ByteSpace home" className="w-fit rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
              <Logo withWordmark={false} className="text-secondary" />
            </Link>
          </div>
          <div data-anim="intro" className="mt-9 max-w-md opacity-0">
            <h2 id="auth-intro-title" className="text-xl font-semibold text-white">
              {isSignUp ? "Sign up and come in" : "Sign in with ease"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/80">
              {isSignUp
                ? "The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost."
                : "Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."}
            </p>
          </div>
          <AuthCollage />
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-0" aria-label={isSignUp ? "Create your ByteSpace account" : "Sign in to ByteSpace"}>
          <div data-anim="form" className="w-full max-w-[560px] rounded-[1.5rem] bg-card px-7 py-10 text-foreground opacity-0 shadow-2xl shadow-black/10 sm:px-12 sm:py-12 lg:px-12 xl:px-16">
            <AuthForm mode={mode} />
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * Left-panel collage, layered exactly like the Figma reference:
 * the two finished course-card artworks overlap diagonally, the lime donut
 * sits behind the front card's top-left corner, the white coil hugs the
 * front card's right edge, and the lime cone + Happy Students float anchor
 * the bottom.
 */
function AuthCollage() {
  return (
    <div className="relative mt-auto aspect-[683/683] w-full max-w-[600px] self-center">
      {/* Lime donut — peeks out behind the cards' junction, like the design */}
      <Image
        src="/images/auth/yellow-circle.svg"
        alt=""
        aria-hidden="true"
        data-anim="donut"
        data-float="2"
        width={580}
        height={580}
        className="absolute left-[13%] top-[2%] z-0 w-[32%] opacity-0"
      />

      {/* Back card — "Build Digital Asset" (finished artwork) */}
      <div
        data-anim="card-back"
        className="absolute left-0 top-[10%] z-10 w-[47%] overflow-hidden rounded-2xl shadow-2xl shadow-black/25 sm:w-[44%]"
      >
        <Image
          src="/images/auth/auth-left-bg-card-2.png"
          alt="Build Digital Asset course card — beginner level, 26+ students, $25 lifetime"
          width={373}
          height={384}
          sizes="(min-width: 1024px) 280px, 45vw"
          className="h-auto w-full"
        />
      </div>

      {/* Front card — "the Power of Big Data" (finished artwork) */}
      <div
        data-anim="card-front"
        data-float="1"
        className="absolute left-[30%] top-0 z-20 w-[58%] overflow-hidden rounded-2xl shadow-2xl shadow-black/30 sm:w-[54%]"
      >
        <Image
          src="/images/auth/auth-left-bg-card-1.png"
          alt="The Power of Big Data course card — beginner level, 4.5 rating, 26+ students, $25 lifetime"
          width={373}
          height={384}
          sizes="(min-width: 1024px) 330px, 55vw"
          className="h-auto w-full"
          priority
        />
      </div>

      {/* White coil — hugging the front card's right edge */}
      <Image
        src="/images/auth/white-coil-big.svg"
        alt=""
        aria-hidden="true"
        data-anim="coil"
        data-float="2"
        width={660}
        height={660}
        className="absolute right-[2%] top-[38%] z-10 w-[24%] opacity-0"
      />

      {/* Lime cone — bottom-left */}
      <Image
        src="/images/auth/yellow-triangle.svg"
        alt=""
        aria-hidden="true"
        data-anim="triangle"
        data-float="1"
        width={580}
        height={580}
        className="absolute bottom-[0%] left-[8%] z-10 w-[26%] opacity-0"
      />

      {/* Happy Students lime float — bottom-right, overlapping the cards */}
      <div
        data-anim="students"
        data-float="2"
        className="absolute bottom-[4%] left-[36%] z-30 w-[52%] max-w-[300px] rounded-2xl bg-secondary p-4 text-secondary-foreground opacity-0 shadow-xl sm:p-5"
      >
        <p className="text-base font-medium sm:text-lg">Happy Students</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs sm:text-sm">
          <span className="font-semibold">4.5</span>
          <span className="text-secondary-foreground/60 line-through">(240)</span>
          <svg viewBox="0 0 24 24" className="size-4 fill-[#003BE2]" aria-hidden="true">
            <path d="M12 2l2.9 6.26 6.87.8-5.09 4.62 1.36 6.77L12 16.9l-6.04 3.55 1.36-6.77L2.23 9.06l6.87-.8L12 2z" />
          </svg>
        </p>
        <AvatarStack
          label="Happy students"
          images={heroStudentAvatars.slice(0, 6).map((src) => ({ src, width: 86, height: 86 }))}
          extraLabel="2K+"
          size={28}
          className="mt-3"
        />
      </div>
    </div>
  );
}
