"use client";

import { Button } from "@/components/ui/button";

/** Reloads the page so the failed navigation is retried. */
export function RetryButton() {
  return (
    <Button size="md" onClick={() => window.location.reload()}>
      Try again
    </Button>
  );
}
