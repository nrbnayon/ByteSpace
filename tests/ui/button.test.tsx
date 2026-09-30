import { describe, expect, it, vi } from "vitest";
import Link from "next/link";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with accessible name from its label", () => {
    render(<Button>Get Started</Button>);
    expect(screen.getByRole("button", { name: "Get Started" })).toBeInTheDocument();
  });

  it("fires onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Join Us</Button>);
    await user.click(screen.getByRole("button", { name: "Join Us" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("respects disabled state", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Locked
      </Button>
    );
    expect(screen.getByRole("button", { name: "Locked" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Locked" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as a link when asChild is used", () => {
    render(
      <Button asChild>
        <Link href="/courses">Browse courses</Link>
      </Button>
    );
    expect(
      screen.getByRole("link", { name: "Browse courses" })
    ).toHaveAttribute("href", "/courses");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Button variant="secondary">Search</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
