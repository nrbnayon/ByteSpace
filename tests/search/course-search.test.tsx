import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { CourseSearch } from "@/components/search/course-search";
import { CourseSearchSkeleton } from "@/components/search/course-card-skeleton";
import { searchCatalog } from "@/data/search-catalog";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams(window.location.search),
}));

/** Drive the URL the way Next would after router.push. */
function navigateTo(query: string) {
  window.history.replaceState(null, "", query ? `/search?${query}` : "/search");
}

describe("CourseSearch", () => {
  beforeEach(() => {
    push.mockClear();
    navigateTo("");
  });

  it("renders the blue band with heading and search form", () => {
    render(<CourseSearch />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Find Your Next Course/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("search", { name: "Course search" })).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("renders the first page of eighteen cards with staggered entrances", () => {
    render(<CourseSearch />);
    const cards = screen.getAllByRole("heading", { level: 3 });
    expect(cards).toHaveLength(18);
    // Page one of the catalog starts with the six base courses.
    expect(cards[0]).toHaveTextContent("Learn Figma from Basic");
  });

  it("submits the query into the URL", async () => {
    const user = userEvent.setup();
    render(<CourseSearch />);
    await user.type(screen.getByRole("searchbox"), "figma{enter}");
    expect(push).toHaveBeenCalledWith("/search?q=figma", { scroll: false });
  });

  it("paginates through the catalog five pages deep", () => {
    navigateTo("page=3");
    render(<CourseSearch />);
    const nav = screen.getByRole("navigation", { name: "Search result pages" });
    expect(within(nav).getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(within(nav).getByRole("button", { name: /Previous page/i })).toBeEnabled();
  });

  it("applies level and category filters via the URL", () => {
    navigateTo("level=Beginner&category=design");
    render(<CourseSearch />);
    // 30 catalog matches (2 design courses × 15 copies), first page of 18 rendered.
    const cards = screen.getAllByRole("heading", { level: 3 });
    expect(cards.length).toBe(18);
    expect(screen.getByText(/^30 courses found$/)).toBeInTheDocument();
  });

  it("shows the empty state when nothing matches", () => {
    navigateTo("q=zzzz-no-match");
    render(<CourseSearch />);
    expect(
      screen.getByText(/No courses match your search/i)
    ).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Search result pages" })).not.toBeInTheDocument();
  });

  it("keeps every rendered card inside the results grid", () => {
    render(<CourseSearch />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    for (const heading of headings) {
      expect(heading.closest("div.grid")).not.toBeNull();
    }
    expect(headings.length).toBeLessThanOrEqual(searchCatalog.length);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CourseSearch />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 20000);
});

describe("CourseSearchSkeleton", () => {
  it("mirrors the loaded grid — one skeleton card per page slot", () => {
    render(<CourseSearchSkeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Loading courses…")).toHaveClass("sr-only");
    const cards = document.querySelectorAll("article");
    expect(cards).toHaveLength(18);
  });

  it("hides the decorative skeleton from assistive tech and passes axe", async () => {
    const { container } = render(<CourseSearchSkeleton />);
    expect(container.querySelector("div[aria-hidden='true']")).not.toBeNull();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
