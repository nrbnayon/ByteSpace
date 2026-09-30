"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Route-change scroll reset. `scroll-behavior: smooth` on <html> also animates
 * Next's own scrollTo(0,0) on navigation, which races browser scroll
 * restoration and leaves you mid-page — so on every pathname change we jump
 * to the top instantly, then restore smooth scrolling for in-page anchors.
 * `history.scrollRestoration = "manual"` keeps the browser from re-scrolling
 * to the previous position after the reset.
 */
export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    // Let the layout settle (images/fonts can shift scroll height) then
    // confirm we are still at the top before handing smooth back.
    const raf = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      html.style.scrollBehavior = previous;
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
