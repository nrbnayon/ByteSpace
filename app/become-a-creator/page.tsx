import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  CircleDollarSign,
  Globe2,
  Users,
  BarChart3,
  FolderOpen,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GridLines } from "@/components/ui/grid-lines";
import { CreatorApplicationForm } from "@/components/creators/creator-application-form";

export const metadata: Metadata = {
  title: "Become a Creator",
  description:
    "Share your expertise on ByteSpace. Publish courses, reach learners worldwide, and get paid for what you know.",
  robots: { index: false, follow: true },
};

const perks = [
  { icon: CircleDollarSign, label: "Earn from every enrollment with transparent revenue share" },
  { icon: Globe2, label: "Reach learners in every timezone" },
  { icon: Users, label: "A community that reviews, shares, and lifts your work" },
  { icon: BarChart3, label: "Dashboards for enrollments, ratings, and payouts" },
  { icon: FolderOpen, label: "Course Editor with lessons, resources, and certificates" },
  { icon: BadgeCheck, label: "Creator badge and homepage featuring for top courses" },
];

const steps = [
  {
    title: "Apply in minutes",
    body: "Tell us what you teach and share links to your work. No resume needed.",
  },
  {
    title: "Get a quick review",
    body: "Our team reviews applications within a few days and replies to everyone.",
  },
  {
    title: "Publish and earn",
    body: "Build your course in the Editor, publish, and start earning from day one.",
  },
] as const;

export default function BecomeACreatorPage() {
  return (
    <>
      {/* ── Hero band — same blue grid design as hero / not-found ── */}
      <section
        aria-labelledby="creator-cta-title"
        className="relative isolate overflow-hidden bg-[#003be2] pb-16 pt-32 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40"
      >
        <GridLines />

        <Container>
          <SectionHeading
            id="creator-cta-title"
            align="left"
            title="Teach what you know. Earn while you sleep."
            subtitle="ByteSpace supports individuals and entities in creating, publishing, and administering educational courses. Apply to join our creator community and turn your expertise into a course learners love."
            className="[&_h2]:text-white [&_p]:text-white/80"
          />
        </Container>
      </section>

      {/* ── Body — perks, steps, and application form ── */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-20">
            <div className="flex flex-col gap-12">
              <section aria-labelledby="perks-title">
                <h2
                  id="perks-title"
                  className="font-heading text-2xl font-semibold tracking-tight text-foreground"
                >
                  Why create on ByteSpace
                </h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {perks.map((perk) => (
                    <li key={perk.label} className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                        <perk.icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-medium text-foreground">{perk.label}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="steps-title">
                <h2
                  id="steps-title"
                  className="font-heading text-2xl font-semibold tracking-tight text-foreground"
                >
                  How it works
                </h2>
                <ol className="mt-6 flex flex-col gap-6">
                  {steps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-base font-semibold text-primary-foreground">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block font-medium text-foreground">{step.title}</span>
                        <span className="mt-1 block text-pretty leading-relaxed text-muted-foreground">
                          {step.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <div className="lg:sticky lg:top-28">
              <CreatorApplicationForm />
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already a creator?{" "}
                <Link
                  href="/creators/purepearl-studio"
                  className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  See a creator profile
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

