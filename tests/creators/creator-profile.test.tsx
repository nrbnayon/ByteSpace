import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { CreatorProfile } from "@/components/creators/creator-profile";
import { getCreator } from "@/data/creators";

const creator = getCreator("purepearl-studio")!;

describe("CreatorProfile", () => {
  it("renders the header with name, badge, tagline, and stats", () => {
    render(<CreatorProfile creator={creator} />);
    expect(
      screen.getByRole("heading", { level: 1, name: /PurePearl Studio/ })
    ).toBeInTheDocument();
    expect(screen.getByText("Creator")).toBeInTheDocument();
    expect(screen.getByText(/Passionate UI\/UX/)).toBeInTheDocument();
    const stats = screen.getByRole("list", { name: "Creator stats" });
    expect(within(stats).getByText("6")).toBeInTheDocument();
    expect(within(stats).getByText("Followers")).toBeInTheDocument();
  });

  it("toggles follow state accessibly", async () => {
    const user = userEvent.setup();
    render(<CreatorProfile creator={creator} />);
    const follow = screen.getByRole("button", { name: "Follow" });
    expect(follow).toHaveAttribute("aria-pressed", "false");

    await user.click(follow);
    expect(screen.getByRole("button", { name: "Following" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByText(/You are now following/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Following" }));
    expect(screen.getByRole("button", { name: "Follow" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("renders every product of the creator", () => {
    render(<CreatorProfile creator={creator} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
      creator.productIds.length
    );
  });

  it("filters products by level and shows live count", async () => {
    const user = userEvent.setup();
    render(<CreatorProfile creator={creator} />);

    await user.click(screen.getByRole("button", { name: "Level" }));
    await user.click(screen.getByRole("button", { name: "Beginner" }));

    expect(screen.getByText(/products shown/)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CreatorProfile creator={creator} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
