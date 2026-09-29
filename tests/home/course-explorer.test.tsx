import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { CourseExplorer } from "@/components/home/course-explorer";
import { courses } from "@/data/courses";

describe("CourseExplorer", () => {
  it("renders the section with an accessible heading and filter group", () => {
    render(<CourseExplorer />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Discover Your Passion/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Filter courses by category" })
    ).toBeInTheDocument();
  });

  it("shows all featured courses by default", () => {
    render(<CourseExplorer />);
    for (const course of courses) {
      expect(screen.getByRole("heading", { name: course.title })).toBeInTheDocument();
    }
  });

  it("filters courses when a category chip is activated", async () => {
    const user = userEvent.setup();
    render(<CourseExplorer />);

    await user.click(screen.getByRole("button", { name: "Marketing" }));

    // Money-management is tagged marketing; the Figma course is not.
    expect(
      screen.getByRole("heading", { name: "Mastering Money Management" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Learn Figma from Basic" })
    ).not.toBeInTheDocument();
  });

  it("announces the filtered result count to screen readers", async () => {
    const user = userEvent.setup();
    render(<CourseExplorer />);
    await user.click(screen.getByRole("button", { name: "Marketing" }));
    const live = screen.getByText(/^1 course in this category$/);
    expect(live).toHaveClass("sr-only");
  });

  it("selected chip is announced as pressed", async () => {
    const user = userEvent.setup();
    render(<CourseExplorer />);
    const music = screen.getByRole("button", { name: "Music" });
    expect(music).toHaveAttribute("aria-pressed", "false");
    await user.click(music);
    expect(music).toHaveAttribute("aria-pressed", "true");
  });

  it("every rendered course heading is inside the results grid", () => {
    render(<CourseExplorer />);
    const grid = screen.getByRole("heading", { name: "Build Digital Asset" })
      .closest("div.grid");
    expect(grid).not.toBeNull();
    const headings = within(grid as HTMLElement).getAllByRole("heading", { level: 3 });
    expect(headings.length).toBe(courses.length);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CourseExplorer />);
    // axe on a large subtree — assert no critical violations.
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
