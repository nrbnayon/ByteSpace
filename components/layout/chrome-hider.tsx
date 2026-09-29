"use client";

import { useEffect } from "react";

/**
 * While mounted, hides the site header / footer / skip link so auth pages
 * render distraction-free (no chrome). On unmount everything is restored.
 */
export function ChromeHider() {
  useEffect(() => {
    // The root layout wraps the skip link, header, main and footer in
    // a `display: contents` #site-chrome div — hide everything except main.
    const chrome = document.getElementById("site-chrome");
    if (!chrome) return;

    const elements = Array.from(chrome.children).filter(
      (el) => el.tagName !== "MAIN"
    ) as HTMLElement[];
    const previous = elements.map((el) => el.style.display);

    elements.forEach((el) => {
      el.style.display = "none";
    });

    return () => {
      elements.forEach((el, i) => {
        el.style.display = previous[i];
      });
    };
  }, []);

  return null;
}
