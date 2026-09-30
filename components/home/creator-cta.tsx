import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CreatorCta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-surface-brand py-20 text-surface-brand-foreground lg:py-24"
    >
      <Image
        src="/images/creator/grid-lines.svg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 object-cover opacity-60"
      />
      <Container className="flex max-w-3xl flex-col items-center gap-8 text-center">
        <h2 id="cta-title" className="text-balance text-4xl leading-[1.2] lg:text-[2.75rem]">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="text-pretty text-base leading-relaxed text-surface-brand-foreground/85 lg:text-lg">
          Transform your knowledge and passion into a thriving online course. Join our
          community of 5,000 creators who are already making an impact with their expertise.
        </p>
        <Button variant="secondary" size="lg">
          Start Creating Today
        </Button>
      </Container>
    </section>
  );
}
