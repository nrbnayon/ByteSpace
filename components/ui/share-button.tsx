"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

type ShareButtonProps = {
  title: string;
  text?: string;
  className?: string;
};

/**
 * Lime "Share" pill from the design. Uses the Web Share API when available
 * (mobile), otherwise copies the URL and confirms via a polite live region.
 */
export function ShareButton({ title, text, className }: ShareButtonProps) {
  const [announced, setAnnounced] = useState("");

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        setAnnounced("Shared successfully");
        return;
      }
      await navigator.clipboard.writeText(url);
      setAnnounced("Link copied to clipboard");
    } catch {
      // User dismissed the share sheet or clipboard is blocked — stay quiet.
      setAnnounced("");
    }
    window.setTimeout(() => setAnnounced(""), 2500);
  }

  return (
    <>
      <button
        type="button"
        onClick={share}
        className={
          className ??
          "inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-secondary px-6 text-base font-medium text-secondary-foreground transition duration-200 hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        }
      >
        <Share2 className="size-4" aria-hidden="true" />
        Share
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {announced}
      </span>
    </>
  );
}
