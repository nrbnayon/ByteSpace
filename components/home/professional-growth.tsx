import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProgressCard } from "@/components/ui/progress-ring";
import { growthStats } from "@/data/stats";

export function ProfessionalGrowth() {
  return (
    <section
      aria-labelledby="growth-title"
      className="relative isolate overflow-hidden bg-muted/50 py-20 lg:py-28"
    >
      {/* Decorative backdrop */}
      <Image
        src="/images/patterns/growth-bg.svg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 object-cover opacity-40"
      />

      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Copy + stats */}
        <div className="flex flex-col items-start gap-10">
          <SectionHeading
            id="growth-title"
            align="left"
            title="Your Path to Professional Growth Starts Here!"
            subtitle="Explore our curated selection of courses tailored to enhance your capabilities and accelerate your career journey. Whether you are looking to sharpen specific skills, gain industry expertise, or embark on a new career path entirely, we have the resources you need."
          />
          <dl className="flex gap-12 lg:gap-16">
            {growthStats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 text-base text-muted-foreground">{stat.label}</dt>
                <dd className="order-1 font-heading text-4xl font-medium tracking-tight text-primary lg:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Course card collage with floating progress */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[373/384] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/5">
            <Image
              src="/images/courses/learn-figma-from-basic.jpg"
              alt="Learn Figma from Basic course cover"
              fill
              sizes="(max-width: 1024px) 90vw, 440px"
              className="object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-card/90 p-4 backdrop-blur-xl">
              <p className="text-lg font-semibold">Learn Figma from Basic</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                by <span className="font-medium text-primary">purepearl studio</span>
              </p>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="font-heading text-lg font-semibold text-primary">$25</span>
                <span className="text-xs text-muted-foreground">/lifetime</span>
              </p>
            </div>
          </div>
          <ProgressCard
            value={55}
            className="absolute -right-4 -top-8 w-56 max-lg:right-2 lg:-right-10"
          />
        </div>
      </Container>
    </section>
  );
}
