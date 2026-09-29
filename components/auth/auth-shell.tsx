"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/brand/logo";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { courses } from "@/data/courses";
import { heroStudentAvatars } from "@/data/stats";

gsap.registerPlugin(useGSAP);

export type AuthMode = "sign-in" | "sign-up";

type AuthShellProps = {
  mode: AuthMode;
};

const featuredCourse = courses[2];

export function AuthShell({ mode }: AuthShellProps) {
  const isSignUp = mode === "sign-up";
  const collageRef = useRef<HTMLDivElement>(null);

  // Entrance animations for the collage + form (skipped for reduced motion).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-anim]", { opacity: 1, y: 0, x: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo("[data-anim='logo']", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
          .fromTo("[data-anim='intro']", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
          .fromTo("[data-anim='card-back']", { opacity: 0, x: -50, rotate: -4 }, { opacity: 1, x: 0, rotate: -2, duration: 0.9 }, 0.25)
          .fromTo("[data-anim='card-front']", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9 }, 0.4)
          .fromTo("[data-anim='coil']", { opacity: 0, scale: 0.5, rotate: -30 }, { opacity: 1, scale: 1, rotate: 12, duration: 0.8, ease: "back.out(1.6)" }, 0.6)
          .fromTo("[data-anim='triangle']", { opacity: 0, y: 40, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, 0.7)
          .fromTo("[data-anim='students']", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.85)
          .fromTo("[data-anim='form']", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.3);

        // Idle float on the decorative pieces.
        gsap.to("[data-float='1']", { y: 10, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to("[data-float='2']", { y: -8, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });

      return () => mm.revert();
    },
    { scope: collageRef }
  );

  return (
    <div ref={collageRef} className="auth-grid min-h-screen bg-[#003BE2] text-white">
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

function AuthCollage() {
  return (
    <div className="relative mt-auto h-[440px] w-full max-w-[560px] self-center sm:h-[480px] xl:h-[560px]">
      {/* Back card — Build Digital Assets (static image + text baked, tilted) */}
      <div
        data-anim="card-back"
        className="absolute left-[4%] top-[16%] w-[52%] max-w-[300px] -rotate-2 overflow-hidden rounded-2xl bg-card shadow-xl sm:left-[8%] sm:top-[20%]"
      >
        <Image
          src="/images/hero/cbcolor-bg.png"
          alt="Course platform interface showing the Build Digital Assets course with analytics"
          width={1100}
          height={1100}
          sizes="(min-width: 1024px) 300px, 50vw"
          className="h-auto w-full"
        />
      </div>

      {/* Front card — the Power of Big Data */}
      <article
        data-anim="card-front"
        data-float="1"
        className="absolute left-[24%] top-[2%] z-10 w-[56%] max-w-[330px] overflow-hidden rounded-2xl bg-card shadow-2xl sm:left-[26%] sm:top-[5%]"
      >
        <div className="relative m-2.5 mb-0 aspect-[341/195] overflow-hidden rounded-xl">
          <Image src={featuredCourse.image.src} alt={featuredCourse.title} fill sizes="320px" className="object-cover" />
          <div className="absolute inset-x-3 bottom-3 flex gap-1.5 text-[10px] text-foreground">
            {featuredCourse.highlights.map((highlight) => <span key={highlight} className="rounded-full bg-card/75 px-2 py-1 backdrop-blur-sm">{highlight}</span>)}
          </div>
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <div><h3 className="text-base font-semibold text-foreground">{featuredCourse.title}</h3><p className="text-[10px] text-primary">by purepearl studio</p></div>
            <span className="text-sm text-muted-foreground">4.5 <span className="text-secondary">★</span></span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] text-muted-foreground">Beginner</span>
            <AvatarStack label="Course students" images={heroStudentAvatars.slice(0, 5).map((src) => ({ src, width: 64, height: 64 }))} extraLabel="26+" size={24} />
          </div>
          <p className="font-heading text-lg font-semibold text-primary">$25<span className="ml-1 text-xs font-normal text-muted-foreground">/lifetime</span></p>
        </div>
      </article>

      <Image
        src="/images/growth/yellow-coil.svg"
        alt=""
        aria-hidden="true"
        data-anim="triangle"
        data-float="1"
        width={160}
        height={160}
        className="absolute bottom-[4%] left-[2%] z-20 w-[90px] opacity-0 sm:w-[120px]"
      />
      <Image
        src="/images/hero/white-coil-big.svg"
        alt=""
        aria-hidden="true"
        width={150}
        height={150}
        data-anim="coil"
        data-float="2"
        className="absolute bottom-[14%] right-[8%] z-20 w-[86px] rotate-12 opacity-0 sm:w-[110px]"
      />
      <div
        data-anim="students"
        data-float="2"
        className="absolute bottom-[2%] right-[3%] z-30 w-[48%] max-w-[240px] rounded-2xl bg-secondary p-4 text-secondary-foreground opacity-0 shadow-xl"
      >
        <p className="text-sm font-medium">Happy Students</p>
        <p className="mt-0.5 text-[10px]">4.5 (240) <span className="font-bold">★</span></p>
        <AvatarStack label="Happy students" images={heroStudentAvatars.slice(0, 6).map((src) => ({ src, width: 64, height: 64 }))} extraLabel="2K+" size={26} className="mt-2" />
      </div>
    </div>
  );
}
