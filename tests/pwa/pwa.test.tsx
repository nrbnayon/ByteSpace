import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import manifestRoute from "@/app/manifest";
import OfflinePage from "@/app/~offline/page";
import { siteConfig } from "@/config/site";

describe("PWA manifest", () => {
  const manifest = manifestRoute();

  it("exposes ByteSpace identity, standalone display, and brand colors", () => {
    expect(manifest.name).toBe(`${siteConfig.name} — ${siteConfig.tagline}`);
    expect(manifest.short_name).toBe(siteConfig.name);
    expect(manifest.start_url).toBe("/");
    expect(manifest.scope).toBe("/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.theme_color).toBe("#003be2");
    expect(manifest.background_color).toBe("#003be2");
  });

  it("references real PNG icons, including maskable variants", () => {
    const icons = manifest.icons ?? [];
    expect(icons.length).toBeGreaterThanOrEqual(4);

    for (const icon of icons) {
      const file = path.join(process.cwd(), "public", icon.src);
      expect(existsSync(file), `missing icon file: ${icon.src}`).toBe(true);
      expect(icon.type).toBe("image/png");
      expect(statSync(file).size).toBeGreaterThan(1000);
    }

    const purposes = icons.map((icon) => icon.purpose ?? "any");
    expect(purposes).toContain("maskable");
    expect(icons.map((icon) => icon.sizes)).toContain("512x512");
  });
});

describe("~offline fallback page", () => {
  it("renders a branded offline message with recovery actions", () => {
    render(<OfflinePage />);

    expect(screen.getByRole("heading", { level: 1, name: /you.re offline/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /go to homepage/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("button", { name: /try again/i })).toBeVisible();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<OfflinePage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("service worker wiring", () => {
  it("declares a Serwist route handler at app/serwist/[path]/route.ts", () => {
    const route = readFileSync(
      path.join(process.cwd(), "app", "serwist", "[path]", "route.ts"),
      "utf8"
    );
    expect(route).toContain('createSerwistRoute');
    expect(route).toContain('swSrc: "app/sw.ts"');
    expect(route).toContain('"/~offline"');
  });

  it("registers the service worker with root scope in the root layout", () => {
    const layout = readFileSync(path.join(process.cwd(), "app", "layout.tsx"), "utf8");
    expect(layout).toContain("SerwistProvider");
    expect(layout).toContain('swUrl="/serwist/sw.js"');
    expect(layout).toContain('manifest: "/manifest.webmanifest"');
  });
});
