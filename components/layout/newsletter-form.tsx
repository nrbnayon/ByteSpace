"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { footerNote } from "@/config/site";

/**
 * Newsletter signup island. Client-side only so it can own submit state;
 * announces success via aria-live for screen readers.
 */
export function NewsletterForm() {
  const emailId = useId();
  const [status, setStatus] = useState<"idle" | "subscribed">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("subscribed");
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} aria-label="Newsletter subscription">
      <label htmlFor={emailId} className="text-sm font-medium text-foreground">
        Subscribe to our newsletter
      </label>
      {status === "subscribed" ? (
        <p role="status" className="text-sm font-medium text-primary">
          You&apos;re in! Watch your inbox for new courses.
        </p>
      ) : (
        <div className="flex gap-2">
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            className="h-11 w-full min-w-0 rounded-full border border-input bg-background px-5 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/70"
          />
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </div>
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">{footerNote}</p>
    </form>
  );
}
