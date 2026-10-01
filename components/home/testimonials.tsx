import { Container } from "@/components/ui/container";
import { TestimonialCards } from "@/components/home/testimonial-cards";
import { TESTIMONIALS_INTRO, testimonials } from "@/data/testimonials";

/**
 * Testimonials — matches the redesigned Figma frame: split header (title
 * left, intro right), three borderless white cards with a stacked layout
 * (large avatar, name, blue role, quote), over a soft lime/blue glow
 * background. Glow paints on one layer (same seam-free approach as the
 * growth section) with dark-mode dimming on the wrapper. On desktop the
 * cards auto-cycle one position left in a loop (see testimonial-cards.tsx);
 * below lg or with reduced motion they render as a static grid.
 */
const GLOWS = [
  // Lime bloom, top-center-left behind the intro column
  "radial-gradient(30% 38% at 42% 8%, rgba(203, 252, 1, 0.35) 0%, rgba(203, 252, 1, 0.08) 53%, rgba(203, 252, 1, 0.02) 75%, rgba(203, 252, 1, 0) 100%)",
  // Lime wash, right edge toward the third card
  "radial-gradient(22% 30% at 100% 55%, rgba(203, 252, 1, 0.28) 0%, rgba(203, 252, 1, 0.064) 53%, rgba(203, 252, 1, 0.017) 75%, rgba(203, 252, 1, 0) 100%)",
  // Blue wash, bottom-left corner
  "radial-gradient(26% 32% at 0% 100%, rgba(0, 59, 226, 0.14) 0%, rgba(0, 59, 226, 0.032) 53%, rgba(0, 59, 226, 0.008) 75%, rgba(0, 59, 226, 0) 100%)",
] as const;

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative isolate overflow-hidden bg-[#FAFAFA] py-20 lg:py-28 dark:bg-[#101322]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 dark:opacity-60"
      >
        <div
          className="absolute inset-0 blur-[40px]"
          style={{ background: GLOWS.join(", ") }}
        />
      </div>

      <Container>
        {/* Split header — title left, intro right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-20">
          <h2
            id="testimonials-title"
            className="max-w-[40rem] text-balance text-4xl leading-[1.2] tracking-[-0.02em] lg:text-[3.25rem]"
          >
            Discover What Our Community Is Saying
          </h2>
          <p className="max-w-[38rem] text-pretty text-base leading-relaxed text-muted-foreground lg:pt-2 lg:text-lg">
            {TESTIMONIALS_INTRO}
          </p>
        </div>

        {/* Cards — auto-cycling carousel on desktop, static grid below lg */}
        <TestimonialCards items={testimonials} />
      </Container>
    </section>
  );
}
