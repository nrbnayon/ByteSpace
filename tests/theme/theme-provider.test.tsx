import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { ThemeProvider, useTheme } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DEFAULT_THEME_MODE, THEME_STORAGE_KEY } from "@/lib/theme";

function Probe() {
  const { mode, resolvedTheme } = useTheme();
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
    </div>
  );
}

function renderWithProvider(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("defaults to light mode even when the OS prefers dark", async () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("dark"),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    renderWithProvider(<Probe />);
    await vi.waitFor(() => {
      expect(screen.getByTestId("mode")).toHaveTextContent(DEFAULT_THEME_MODE);
      expect(screen.getByTestId("resolved")).toHaveTextContent("light");
    });
  });

  it("follows the OS preference only while system mode is selected", async () => {
    const user = userEvent.setup();
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("dark"),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    renderWithProvider(
      <ThemeProvider>
        <ThemeToggle />
        <Probe />
      </ThemeProvider>
    );
    await vi.waitFor(() => {
      expect(screen.getByTestId("resolved")).toHaveTextContent("light");
    });

    await user.click(screen.getByRole("radio", { name: "System theme" }));
    await vi.waitFor(() => {
      expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    });
  });

  it("restores a stored explicit mode", async () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    renderWithProvider(<Probe />);
    await vi.waitFor(() => {
      expect(screen.getByTestId("mode")).toHaveTextContent("dark");
      expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    });
  });

  it("persists an explicit choice and clears it on system", async () => {
    const user = userEvent.setup();
    renderWithProvider(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    await user.click(screen.getByRole("radio", { name: "Dark theme" }));
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");

    await user.click(screen.getByRole("radio", { name: "System theme" }));
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it("toggle group is a labelled radiogroup with no a11y violations", async () => {
    const { container } = renderWithProvider(<ThemeToggle />);
    await vi.waitFor(() => {
      expect(screen.getByRole("radiogroup", { name: "Color theme" })).toBeInTheDocument();
    });
    expect(await axe(container)).toHaveNoViolations();
  });
});
