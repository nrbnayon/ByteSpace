import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Chip } from "@/components/ui/chip";

describe("Chip", () => {
  it("exposes toggle state via aria-pressed", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(<Chip onClick={onClick}>Design</Chip>);

    const chip = screen.getByRole("button", { name: "Design" });
    expect(chip).toHaveAttribute("aria-pressed", "false");

    await user.click(chip);
    expect(onClick).toHaveBeenCalledOnce();

    rerender(<Chip selected onClick={() => {}}>Design</Chip>);
    expect(chip).toHaveAttribute("aria-pressed", "true");
  });

  it("has no accessibility violations (unselected and selected)", async () => {
    const { container: a } = render(<Chip>Music</Chip>);
    expect(await axe(a)).toHaveNoViolations();
    const { container: b } = render(<Chip selected>Music</Chip>);
    expect(await axe(b)).toHaveNoViolations();
  });
});
