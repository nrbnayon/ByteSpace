import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRow } from "@/components/ui/rating";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="py-20 lg:py-28">
      <Container className="grid items-start gap-14 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
        <SectionHeading
          id="testimonials-title"
          align="left"
          title="Discover What Our Community is Saying"
          subtitle="At Bytespace, our community of learners and creators are making real strides in their careers and lives. Here's what they have to say."
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <figure className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-6">
                <figcaption className="flex items-center gap-3">
                  <Image
                    src={testimonial.avatar.src}
                    alt=""
                    width={testimonial.avatar.width}
                    height={testimonial.avatar.height}
                    className="size-12 rounded-full object-cover"
                  />
                  <span>
                    <span className="block font-medium">{testimonial.name}</span>
                    <span className="block text-sm text-muted-foreground">
                      {testimonial.role}
                    </span>
                  </span>
                </figcaption>
                <StarRow count={testimonial.rating} />
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  <p>{testimonial.quote}</p>
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
