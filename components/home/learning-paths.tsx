import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { categoryIconSrc, learningPaths } from "@/data/categories";

export function LearningPaths() {
  return (
    <section aria-labelledby="paths-title" className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="paths-title"
          title="Explore Diverse Learning Paths at Bytespace"
          subtitle="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
        />

        <ul className="mt-14 grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-10">
          {learningPaths.map((path) => (
            <li key={path.id} className="w-full max-w-[167px]">
              <Link
                href="/#courses"
                className="group flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={categoryIconSrc[path.icon as keyof typeof categoryIconSrc]}
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 dark:invert"
                  />
                </span>
                <span className="px-2 text-center text-lg font-medium">{path.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
