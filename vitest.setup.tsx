import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";
import { toHaveNoViolations } from "jest-axe";
import type React from "react";

// jsdom lacks matchMedia — required by the theme system.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-unused-vars --
   intentional inside the test mock: plain <img> + stripped Next-only props */
// Mock next/image: render a plain img so tests assert on real alt/size attrs.
vi.mock("next/image", () => ({
  default: ({
    priority: _priority,
    fill: _fill,
    alt = "",
    ...rest
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    priority?: boolean;
    fill?: boolean;
  }) => {
    return <img alt={alt} {...rest} />;
  },
}));
/* eslint-enable @next/next/no-img-element, @typescript-eslint/no-unused-vars */

expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
});
