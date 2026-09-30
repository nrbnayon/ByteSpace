import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProgressCard } from "@/components/ui/progress-ring";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { SectionHeading } from "@/components/ui/section-heading";

describe("SkipLink", () => {
  it("points at the main content landmark", () => {
    render(
      <>
        <SkipLink />
        <main id="main-content" />
      </>
    );
    const link = screen.getByRole("link", { name: "Skip to content" });
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <SkipLink />
        <main id="main-content" />
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("SiteFooter", () => {
  it("renders a contentinfo landmark with labelled nav columns", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    const footerNav = screen.getByRole("navigation", { name: "Footer" });
    // Heading-less columns per the current design; column titles are links.
    expect(
      within(footerNav).getByRole("link", { name: "Become a Creator" })
    ).toBeInTheDocument();
  });

  it("newsletter email input is programmatically labelled", () => {
    render(<SiteFooter />);
    const input = screen.getByLabelText(
      "Stay Up to date with our latest features and releases by joining our newsletter."
    );
    expect(input).toHaveAttribute("type", "email");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SiteFooter />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("ProgressCard", () => {
  it("exposes an accessible progressbar with bounds", () => {
    render(<ProgressCard value={55} />);
    const bar = screen.getByRole("progressbar", { name: "Learning Progress" });
    expect(bar).toHaveAttribute("aria-valuenow", "55");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("clamps values into 0–100", () => {
    render(<ProgressCard value={140} label="Clamped" />);
    expect(screen.getByRole("progressbar", { name: "Clamped" })).toHaveAttribute(
      "aria-valuenow",
      "100"
    );
  });
});

describe("AvatarStack", () => {
  const images = [
    { src: "/images/avatars/avatar-1.png", width: 64, height: 64 },
    { src: "/images/avatars/avatar-2.png", width: 64, height: 64 },
  ];

  it("carries one accessible group label instead of noisy alt text", () => {
    render(<AvatarStack images={images} extraLabel="26+" label="students enrolled" />);
    expect(screen.getByLabelText("students enrolled")).toBeInTheDocument();
    expect(screen.getByText("26+")).toBeInTheDocument();
  });
});

describe("SectionHeading", () => {
  it("renders the requested heading level with subtitle", () => {
    render(<SectionHeading as="h3" title="Small section" subtitle="With subtitle" />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Small section" })
    ).toBeInTheDocument();
    expect(screen.getByText("With subtitle")).toBeInTheDocument();
  });
});
