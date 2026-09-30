import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { CourseDetail } from "@/components/courses/course-detail";
import { getCourseDetail } from "@/data/course-details";

const course = getCourseDetail("build-digital-asset")!;

describe("CourseDetail", () => {
  it("renders the hero with title, instructor, and summary pills", () => {
    render(<CourseDetail course={course} />);
    expect(
      screen.getByRole("heading", { level: 1, name: course.title })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: course.instructor })).toHaveAttribute(
      "href",
      `/creators/${course.creatorSlug}`
    );
    expect(screen.getByText(/199 Students/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /share/i })).toBeInTheDocument();
  });

  it("renders the enroll card with lessons, price, CTA, and profile link", () => {
    render(<CourseDetail course={course} />);
    const aside = screen.getByRole("complementary", { name: "Enrollment options" });
    expect(
      within(aside).getByRole("heading", { name: /112 Lessons \(24 hours\)/i })
    ).toBeInTheDocument();
    expect(within(aside).getByText("$25")).toBeInTheDocument();
    expect(within(aside).getByRole("button", { name: "Enroll Now" })).toBeInTheDocument();
    expect(
      within(aside).getByRole("link", { name: "See Full Profile" })
    ).toHaveAttribute("href", `/creators/${course.creatorSlug}`);
    expect(within(aside).getByText("Certificate of Completion")).toBeInTheDocument();
  });

  it("exposes an accessible tablist with panels wired by id", () => {
    render(<CourseDetail course={course} />);
    const tablist = screen.getByRole("tablist", { name: "Course information" });
    const tabs = within(tablist).getAllByRole("tab");
    expect(tabs.map((tab) => tab.textContent)).toEqual(["About", "Lessons", "Reviews"]);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("aria-labelledby", tabs[0].id);
    expect(within(panel).getByRole("heading", { name: "Description" })).toBeInTheDocument();
  });

  it("switches panels on click and supports arrow-key navigation", async () => {
    const user = userEvent.setup();
    render(<CourseDetail course={course} />);
    const tabs = screen.getAllByRole("tab");

    await user.click(tabs[2]!);
    expect(tabs[2]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      tabs[2]!.id
    );
    expect(
      screen.getByRole("heading", { name: "What Learners Are Saying" })
    ).toBeInTheDocument();

    // Roving tabindex: focused tab responds to ArrowLeft.
    tabs[2]!.focus();
    await user.keyboard("{ArrowLeft}");
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveFocus();
  });

  it("filters individual reviews by star rating", async () => {
    const user = userEvent.setup();
    render(<CourseDetail course={course} />);
    await user.click(screen.getAllByRole("tab").at(-1)!);

    const group = screen.getByRole("group", { name: "Filter reviews by rating" });
    await user.click(within(group).getByRole("button", { name: "5" }));
    expect(screen.getByText("4 reviews shown")).toBeInTheDocument();

    await user.click(within(group).getByRole("button", { name: "All rating" }));
    expect(screen.getAllByText(/UI\/UX Designer/).length).toBeGreaterThan(0);
  });

  it("shows related courses by the same creator", () => {
    render(<CourseDetail course={course} />);
    expect(
      screen.getByRole("heading", { name: /More by purepearl studio/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View creator profile" })
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CourseDetail course={course} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
