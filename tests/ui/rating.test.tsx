import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Rating, StarRow } from "@/components/ui/rating";

describe("Rating", () => {
  it("announces the score to assistive technology", () => {
    render(<Rating value={4.5} />);
    expect(screen.getByRole("img", { name: "Rated 4.5 out of 5" })).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("can hide the numeric value", () => {
    render(<Rating value={4.5} showValue={false} />);
    expect(screen.queryByText("4.5")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Rating value={4.5} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("StarRow", () => {
  it("announces the star count", () => {
    render(<StarRow count={5} />);
    expect(
      screen.getByRole("img", { name: "Rated 5 out of 5 stars" })
    ).toBeInTheDocument();
  });
});
