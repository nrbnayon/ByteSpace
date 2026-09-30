import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared grid style — identical across Hero, Course Detail, Creator Profile,
 * Search, Become a Creator, 404, and Auth pages.
 *
 * 2px lines with rgba(255,255,255,.1) opacity, responsive cell sizing
 * (64px mobile, 120px desktop), perfectly centered horizontally.
 */
export const gridStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,.1) 2px, transparent 2px), linear-gradient(to bottom, rgba(255,255,255,.1) 2px, transparent 2px)",
  backgroundSize: "var(--g) var(--g)",
  backgroundPosition: "calc(50% + var(--g) / 2) var(--g)",
};

interface GridLinesProps {
  className?: string;
  style?: CSSProperties;
}

export function GridLines({ className, style }: GridLinesProps) {
  return (
    <div
      aria-hidden="true"
      style={{ ...gridStyle, ...style }}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 [--g:64px] lg:[--g:120px]",
        className
      )}
    />
  );
}
