import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

describe("AuthForm", () => {
  it("sign-up mode shows full name, email, password and Continue", () => {
    render(<AuthForm mode="sign-up" />);
    expect(screen.getByRole("heading", { level: 1, name: "Welcome to ByteSpace" })).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toHaveAttribute("autocomplete", "name");
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Password")).toHaveAttribute("autocomplete", "new-password");
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute("href", "/sign-in");
  });

  it("sign-in mode hides full name and offers account creation", () => {
    render(<AuthForm mode="sign-in" />);
    expect(screen.getByRole("heading", { level: 1, name: "Welcome Back" })).toBeInTheDocument();
    expect(screen.queryByLabelText("Full Name")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create an account" })).toHaveAttribute("href", "/sign-up");
  });

  it("submits and announces the demo state politely", async () => {
    const user = userEvent.setup();
    render(<AuthForm mode="sign-up" />);
    await user.type(screen.getByLabelText("Full Name"), "Jamie Davis");
    await user.type(screen.getByLabelText("Email"), "jamie@example.com");
    await user.type(screen.getByLabelText("Password"), "super-secret-1");
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByRole("status")).toHaveTextContent(/demo form/i);
  });

  it("has no accessibility violations (sign-up)", async () => {
    const { container } = render(<AuthForm mode="sign-up" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations (sign-in)", async () => {
    const { container } = render(<AuthForm mode="sign-in" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("AuthShell", () => {
  it("renders the brand intro with course collage and the form card", () => {
    render(<AuthShell mode="sign-up" />);
    expect(screen.getByRole("heading", { name: "Sign up and come in" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ByteSpace home" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Welcome to ByteSpace" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: /the power of big data/i })[0]).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AuthShell mode="sign-up" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
