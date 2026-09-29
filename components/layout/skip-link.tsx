import { cn } from "@/lib/utils";

/**
 * Keyboard-accessible skip link — first focusable element on the page,
 * becomes visible when focused (WCAG 2.4.1 Bypass Blocks).
 */
export function SkipLink({ className }: { className?: string }) {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only z-50 rounded-full bg-primary px-5 py-3 text-base font-medium text-primary-foreground",
        "focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-2 focus:outline-offset-2 focus:outline-ring",
        className
      )}
    >
      Skip to content
    </a>
  );
}
