import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { Testimonials } from "@/components/home/testimonials";
import { testimonials } from "@/data/testimonials";

describe("Testimonials", () => {
  it("renders the split header with title and intro", () => {
    render(<Testimonials />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Discover What Our Community/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/At ByteSpace, our vibrant community/i)
    ).toBeInTheDocument();
  });

  it("renders every testimonial card with name, role, and quote", () => {
    render(<Testimonials />);
    for (const testimonial of testimonials) {
      expect(screen.getByText(testimonial.name)).toBeInTheDocument();
      expect(screen.getByText(testimonial.role)).toBeInTheDocument();
      expect(screen.getByText(`"${testimonial.quote}"`)).toBeInTheDocument();
    }
  });

  it("lays the cards out in a responsive grid", () => {
    render(<Testimonials />);
    const list = screen.getByRole("list");
    expect(list.className).toContain("md:grid-cols-2");
    expect(list.className).toContain("lg:grid-cols-3");
    expect(within(list).getAllByRole("listitem")).toHaveLength(testimonials.length);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Testimonials />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
