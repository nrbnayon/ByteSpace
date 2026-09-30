"use client";

import { useState } from "react";

/**
 * Lime "Follow" pill — optimistic local state with an aria-pressed toggle
 * and a polite announcement so the action is confirmed non-visually.
 * (Wire to a real API when auth exists; state is intentionally ephemeral.)
 */
export function FollowButton({ creatorName }: { creatorName: string }) {
  const [following, setFollowing] = useState(false);
  const [announced, setAnnounced] = useState("");

  function toggle() {
    const next = !following;
    setFollowing(next);
    setAnnounced(
      next ? `You are now following ${creatorName}` : `Unfollowed ${creatorName}`
    );
    window.setTimeout(() => setAnnounced(""), 2500);
  }

  return (
    <>
      <button
        type="button"
        aria-pressed={following}
        onClick={toggle}
        className="inline-flex h-11 cursor-pointer items-center rounded-full bg-secondary px-8 text-base font-medium text-secondary-foreground transition duration-200 hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {following ? "Following" : "Follow"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {announced}
      </span>
    </>
  );
}
