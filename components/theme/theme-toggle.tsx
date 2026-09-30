"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
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
  /** "group" = 3 side-by-side radio buttons; "dropdown" = single button that opens expandable menu */
  type?: "group" | "dropdown";
  dropdown?: boolean;
  className?: string;
};

export function ThemeToggle({
  variant = "default",
  type = "group",
  dropdown = false,
  className,
}: ThemeToggleProps) {
  const { mode, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isDropdown = type === "dropdown" || dropdown;
  const active = mode;
  const currentOption = OPTIONS.find((o) => o.value === active) ?? OPTIONS[1];
  const ActiveIcon = currentOption.icon;

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (isDropdown) {
    return (
      <div ref={containerRef} className={cn("relative inline-block", className)}>
        <button
          type="button"
          aria-label={`Color theme (${currentOption.label})`}
          aria-expanded={open}
          aria-haspopup="true"
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            variant === "brand"
              ? "text-surface-brand-foreground hover:bg-surface-brand-foreground/10 focus-visible:outline-white"
              : "border border-border bg-background/80 text-foreground hover:bg-accent",
            open && (variant === "brand" ? "bg-surface-brand-foreground/15" : "bg-accent")
          )}
        >
          <ActiveIcon className="size-5" aria-hidden="true" />
        </button>

        {open && (
          <div
            role="radiogroup"
            aria-label="Color theme"
            className={cn(
              "absolute right-0 top-full mt-2.5 z-50 min-w-[140px] rounded-2xl p-1.5 shadow-2xl backdrop-blur-md",
              "animate-in fade-in-0 zoom-in-95",
              variant === "brand"
                ? "border border-white/20 bg-[#002bb3]/95 text-white shadow-black/30"
                : "border border-border bg-popover/95 text-popover-foreground shadow-lg"
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
                  onClick={() => {
                    setMode(value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    isActive
                      ? variant === "brand"
                        ? "bg-white text-[#003be2] font-semibold shadow-sm"
                        : "bg-primary text-primary-foreground font-semibold"
                      : variant === "brand"
                        ? "text-white/85 hover:bg-white/15 hover:text-white"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="flex-1 text-left">{label}</span>
                  {isActive && <Check className="size-3.5 shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        )}

        <span aria-live="polite" className="sr-only">
          {active === "system" ? "Following system theme" : `${active} theme enabled`}
        </span>
      </div>
    );
  }

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
