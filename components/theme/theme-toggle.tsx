"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

type ThemeToggleProps = {
  /** "brand" = white-on-blue for brand bands; "default" = for regular surfaces. */
  variant?: "brand" | "default";
  className?: string;
};

export function ThemeToggle({ variant = "default", className }: ThemeToggleProps) {
  const { mode, setMode } = useTheme();

  // The store's server/hydration snapshot is always "system", so the first
  // client render matches the server HTML; the real mode appears right after.
  const active = mode;

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-0.5 backdrop-blur-sm",
        variant === "brand"
          ? "border-surface-brand-foreground/25 bg-surface-brand-foreground/5"
          : "border-border bg-background/60",
        className
      )}
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${label} theme`}
            onClick={() => setMode(value)}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-full transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              isActive
                ? variant === "brand"
                  ? "bg-surface-brand-foreground text-primary"
                  : "bg-primary text-primary-foreground"
                : variant === "brand"
                  ? "text-surface-brand-foreground/80 hover:text-surface-brand-foreground"
                  : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
          </button>
        );
      })}
      {/* Screen-reader announcement when the theme changes */}
      <span aria-live="polite" className="sr-only">
        {active === "system" ? "Following system theme" : `${active} theme enabled`}
      </span>
    </div>
  );
}
