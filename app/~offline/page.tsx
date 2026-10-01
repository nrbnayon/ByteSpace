import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { RetryButton } from "./retry-button";

export const metadata: Metadata = {
  // Root layout's template appends "— ByteSpace".
  title: "You're offline",
  description: "ByteSpace is unavailable right now because your device is offline.",
  robots: { index: false, follow: false },
};

/**
 * Offline fallback, precached by the service worker and served whenever a
 * navigation fails with no cache (e.g. cold-starting the installed app
 * offline). Deliberately dependency-light so it always renders.
 */
export default function OfflinePage() {
  return (
    <section
      aria-labelledby="offline-title"
      className="relative flex min-h-[calc(100svh-24rem)] items-center overflow-hidden py-16 lg:py-24"
    >
      <Container className="max-w-2xl">
        <div className="flex flex-col items-start gap-6">
          <p
            aria-hidden="true"
            className="inline-flex size-13 items-center justify-center rounded-xl bg-secondary text-2xl"
          >
            📡
          </p>
          <div>
            <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Error 404: connection lost
            </p>
            <h1
              id="offline-title"
              className="mt-2 font-heading text-4xl font-semibold tracking-tight text-foreground lg:text-5xl"
            >
              You&rsquo;re offline
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              ByteSpace needs an internet connection to load this page. Check
              your connection and try again — courses you&rsquo;ve already
              visited may still be available offline.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <RetryButton />
            <Button asChild variant="outline" size="md">
              <Link href="/">Go to homepage</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Tip: once you&rsquo;re back online, pages you visit are saved for
            offline reading.
          </p>
        </div>
      </Container>
    </section>
  );
}
