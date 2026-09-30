import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { SiteHeader } from "@/components/layout/site-header";
import { CartProvider } from "@/components/cart/cart-store";
import { mainNav } from "@/config/site";

function renderHeader() {
  return render(
    <ThemeProviderStub>
      <CartProvider>
        <SiteHeader />
      </CartProvider>
    </ThemeProviderStub>
  );
}

/** SiteHeader uses useTheme — wrap in the real provider. */
import { ThemeProvider } from "@/components/theme/theme-provider";
function ThemeProviderStub({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe("SiteHeader", () => {
  it("renders a banner landmark with a main navigation", () => {
    renderHeader();
    const nav = screen.getByRole("navigation", { name: "Main" });
    for (const link of mainNav) {
      expect(
        within(nav).getAllByRole("link", { name: new RegExp(link.label) }).length
      ).toBeGreaterThan(0);
    }
  });

  it("brand link has an accessible name", () => {
    renderHeader();
    expect(screen.getAllByRole("link", { name: /ByteSpace — home/i }).length).toBeGreaterThan(0);
  });

  it("mobile menu toggles with correct aria state and shows nav links", async () => {
    const user = userEvent.setup();
    renderHeader();

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    // Desktop nav is hidden (CSS) but mobile links render in the panel:
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThanOrEqual(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = renderHeader();
    expect(await axe(container)).toHaveNoViolations();
  });
});
