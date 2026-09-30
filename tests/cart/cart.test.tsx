import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { CartProvider, useCart } from "@/components/cart/cart-store";
import { CartDrawer } from "@/components/cart/cart-drawer";

function Probe() {
  const { count, ids, add, remove, openDrawer } = useCart();
  return (
    <div>
      <span data-testid="count">{count}</span>
      <span data-testid="ids">{ids.join(",")}</span>
      <button onClick={() => add("learn-figma-from-basic")}>add</button>
      <button onClick={() => remove("learn-figma-from-basic")}>remove</button>
      <button onClick={openDrawer}>open cart</button>
    </div>
  );
}

describe("CartProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts empty and persists additions to localStorage", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <Probe />
      </CartProvider>
    );
    expect(screen.getByTestId("count")).toHaveTextContent("0");

    await user.click(screen.getByRole("button", { name: "add" }));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(JSON.parse(window.localStorage.getItem("bytespace-cart")!)).toEqual([
      "learn-figma-from-basic",
    ]);

    // Adding the same course twice does not duplicate it.
    await user.click(screen.getByRole("button", { name: "add" }));
    expect(screen.getByTestId("count")).toHaveTextContent("1");

    await user.click(screen.getByRole("button", { name: "remove" }));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });
});

describe("CartDrawer", () => {
  it("shows the empty state with a browse CTA once opened", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartDrawer />
        <Probe />
      </CartProvider>
    );
    // Closed drawer is hidden from the accessibility tree on purpose.
    await user.click(screen.getByRole("button", { name: "open cart" }));

    expect(screen.getByRole("dialog", { name: "Shopping cart" })).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse courses" })).toHaveAttribute(
      "href",
      "/search"
    );
  });

  it("lists line items with remove buttons and a total", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartDrawer />
        <Probe />
      </CartProvider>
    );
    await user.click(screen.getByRole("button", { name: "add" }));
    await user.click(screen.getByRole("button", { name: "open cart" }));

    expect(screen.getByText("Your Cart (1)")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Learn Figma from Basic" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Remove Learn Figma from Basic/ })).toBeInTheDocument();
    // Total row pairs the label with the price.
    const total = screen.getByText("Total").closest("p");
    expect(total).toHaveTextContent("$25");

    await user.click(screen.getByRole("button", { name: /Remove/ }));
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CartProvider>
        <CartDrawer />
      </CartProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
