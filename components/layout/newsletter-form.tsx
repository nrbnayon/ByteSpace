"use client";

import { useId, useState, type FormEvent } from "react";
import { footerNote } from "@/config/site";

/**
 * Newsletter signup island. Client-side only so it can own submit state;
 * the result is announced through an aria-live region.
 * Design: 14px tagline → 45px → [52px pill input 376px · 24px · 104px lime button]
 *         → 24px → 12px note (wraps inside 504px).
 */
export function NewsletterForm() {
  const emailId = useId();
  const [status, setStatus] = useState<"idle" | "subscribed">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("subscribed");
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Newsletter subscription"
      className="w-full max-w-[504px]"
    >
      <label
        htmlFor={emailId}
        className="block text-sm leading-[1.6] text-[#242528] dark:text-[#f5f5f6]"
      >
        Stay Up to date with our latest features and releases by joining our newsletter.
      </label>

      {/* Fixed min-height so the layout doesn't jump after subscribing */}
      <div aria-live="polite" className="mt-7 flex min-h-[52px] items-center lg:mt-[45px]">
        {status === "subscribed" ? (
          <p className="text-base font-medium text-[#003be2] dark:text-[#d4fb20]">
            You&apos;re in! Watch your inbox for new courses.
          </p>
        ) : (
          <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:gap-6">
            <input
              id={emailId}
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              className="h-[52px] min-w-0 rounded-full border border-[#d0d2d6] bg-white px-6 text-base leading-[1.6] text-[#242528] outline-none transition-[border-color,box-shadow] placeholder:text-[#242528]/70 focus-visible:border-[#003be2] focus-visible:ring-2 focus-visible:ring-[#003be2]/20 dark:border-white/25 dark:bg-transparent dark:text-white dark:placeholder:text-white/60"
            />
            <button
              type="submit"
              className="shrink-0 cursor-pointer rounded-3xl bg-[#d4fb20] px-6 py-3 text-lg font-medium leading-[1.2] text-[#242528] transition duration-200 hover:-translate-y-0.5 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#003be2] active:translate-y-0 active:scale-95"
            >
              Search
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs leading-[1.6] text-[#242528] dark:text-[#f5f5f6]/80">
        {footerNote}
      </p>
    </form>
  );
}