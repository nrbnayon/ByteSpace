import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureCheck } from "@/components/ui/feature-check";
import { creatorBenefits } from "@/data/stats";

export function CreatorSection() {
  return (
    <section id="creators" aria-labelledby="creators-title" className="scroll-mt-24 py-20 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Gallery collage */}
        <div className="relative mx-auto aspect-square w-full max-w-lg">
          <Image
            src="/images/growth/gallery-1.png"
            alt="Creator recording a design tutorial"
            width={432}
            height={432}
            sizes="(max-width: 1024px) 90vw, 430px"
            className="absolute left-0 top-0 w-[58%] rounded-3xl object-cover shadow-lg shadow-black/10"
          />
          <Image
            src="/images/growth/gallery-2.png"
            alt="Creator presenting to camera"
            width={500}
            height={500}
            sizes="(max-width: 1024px) 70vw, 320px"
            className="absolute right-0 top-[6%] w-[46%] rounded-3xl object-cover shadow-xl shadow-black/10"
          />
          <Image
            src="/images/growth/gallery-3.png"
            alt="Creator editing course material on a laptop"
            width={432}
            height={432}
            sizes="(max-width: 1024px) 80vw, 350px"
            className="absolute bottom-0 left-[12%] w-[52%] rounded-3xl object-cover shadow-lg shadow-black/10"
          />
          <Image
            src="/images/growth/cone.png"
            alt=""
            width={2500}
            height={2500}
            sizes="90px"
            className="absolute -left-3 bottom-14 w-16 lg:w-24"
          />
        </div>

        {/* Copy + benefits */}
        <div className="flex flex-col items-start gap-8">
          <h2
            id="creators-title"
            className="max-w-xl text-balance text-4xl leading-[1.2] lg:text-[2.75rem]"
          >
            Create &amp; Manage Courses Easily.
          </h2>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
            Bytespace supports individuals and entities in the creation, publication, and
            administration of educational courses. Join thousands of creators building
            their audience on our platform.
          </p>
          <ul className="flex flex-col gap-4">
            {creatorBenefits.map((benefit) => (
              <FeatureCheck key={benefit}>{benefit}</FeatureCheck>
            ))}
          </ul>
          <Button size="lg">Get Started as Creator</Button>
        </div>
      </Container>
    </section>
  );
}
