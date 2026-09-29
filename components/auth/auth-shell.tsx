import Image from "next/image";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/brand/logo";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { courses } from "@/data/courses";
import { heroStudentAvatars } from "@/data/stats";

export type AuthMode = "sign-in" | "sign-up";

type AuthShellProps = {
  mode: AuthMode;
};

const featuredCourse = courses[2];

export function AuthShell({ mode }: AuthShellProps) {
  const isSignUp = mode === "sign-up";

  return (
    <div className="auth-grid min-h-screen bg-primary text-primary-foreground">
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] lg:grid-cols-[minmax(0,1fr)_minmax(480px,560px)] lg:gap-14 lg:px-12 xl:gap-20 xl:px-20">
        <section className="hidden min-h-screen flex-col px-8 pb-12 pt-7 lg:flex xl:px-0" aria-labelledby="auth-intro-title">
          <Link href="/" aria-label="ByteSpace home" className="w-fit rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
            <Logo withWordmark={false} className="text-secondary" />
          </Link>
          <div className="mt-9 max-w-md">
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
          <div className="w-full max-w-[540px] rounded-[1.5rem] bg-card px-7 py-10 text-foreground shadow-2xl shadow-black/10 sm:px-12 sm:py-12 lg:px-12 xl:px-16">
            <AuthForm mode={mode} />
          </div>
        </section>
      </div>
    </div>
  );
}

function AuthCollage() {
  return (
    <div className="relative mt-auto h-[480px] w-full max-w-[560px] self-center xl:h-[540px]">
      <div className="absolute left-[8%] top-[20%] w-[48%] max-w-[280px] -rotate-2 overflow-hidden rounded-2xl border border-white/20 bg-card shadow-xl">
        <div className="relative aspect-[341/195] overflow-hidden rounded-t-2xl p-2.5 pb-0">
          <Image src="/images/courses/learn-figma-from-basic.jpg" alt="" fill sizes="280px" className="object-cover p-2.5 pb-0" />
        </div>
        <div className="space-y-2 p-4">
          <p className="truncate text-lg font-semibold text-foreground">Build Digital Assets</p>
          <p className="text-xs text-muted-foreground">by <span className="text-primary">purepearl studio</span></p>
          <p className="font-heading text-lg font-semibold text-primary">$25<span className="ml-1 text-xs font-normal text-muted-foreground">/lifetime</span></p>
        </div>
      </div>

      <article className="absolute left-[24%] top-[5%] z-10 w-[54%] max-w-[320px] overflow-hidden rounded-2xl border border-white/20 bg-card shadow-2xl">
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

      <Image src="/images/hero/left-side-shape.svg" alt="" aria-hidden="true" width={160} height={160} className="absolute bottom-[9%] left-0 z-20 w-[100px] xl:w-[130px]" />
      <Image src="/images/hero/white-coil-big.svg" alt="" aria-hidden="true" width={150} height={150} className="absolute bottom-[18%] right-[12%] z-20 w-[86px] rotate-12" />
      <div className="absolute bottom-[2%] right-[3%] z-30 w-[48%] max-w-[240px] rounded-2xl bg-secondary p-4 text-secondary-foreground shadow-xl">
        <p className="text-sm font-medium">Happy Students</p>
        <p className="mt-0.5 text-[10px]">4.5 (240) <span className="font-bold">★</span></p>
        <AvatarStack label="Happy students" images={heroStudentAvatars.slice(0, 6).map((src) => ({ src, width: 64, height: 64 }))} extraLabel="2K+" size={26} className="mt-2" />
      </div>
    </div>
  );
}
