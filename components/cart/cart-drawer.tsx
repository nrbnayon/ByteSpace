"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-store";
import { courses } from "@/data/courses";
import { searchCatalog } from "@/data/search-catalog";
import { cn } from "@/lib/utils";

/**
 * Cart drawer — a labelled dialog that slides in from the right. Lists the
 * courses in the basket with remove buttons, shows the total and a checkout
 * CTA (sign-in gated like real enrollments). Focus moves into the panel on
 * open, Escape closes, and the logo/close restore focus context.
 */
export function CartDrawer() {
  const { ids, isDrawerOpen, closeDrawer, remove, clear } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  const items = useMemoItems(ids);
  const total = items.reduce((sum, course) => sum + course.price, 0);

  // Escape to close + simple focus handoff while open.
  useEffect(() => {
    if (!isDrawerOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [isDrawerOpen, closeDrawer]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!isDrawerOpen}
    >
      {/* Scrim */}
      <div
        onClick={closeDrawer}
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-300",
          isDrawerOpen ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal={isDrawerOpen}
        aria-label="Shopping cart"
        tabIndex={-1}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-2xl outline-none",
          "transition-transform duration-300 ease-out motion-reduce:transition-none",
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Your Cart {items.length > 0 ? `(${items.length})` : ""}
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-heading text-2xl font-semibold text-foreground">
              Your cart is empty
            </p>
            <p className="text-base text-muted-foreground">
              Browse the catalog and add the courses you want to enroll in.
            </p>
            <Button asChild onClick={closeDrawer}>
              <Link href="/search">Browse courses</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {items.map((course) => (
                <li key={course.id} className="flex gap-4 py-4">
                  <Image
                    src={course.image.src}
                    alt=""
                    width={96}
                    height={64}
                    className="h-16 w-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/courses/${course.id}`}
                      onClick={closeDrawer}
                      className="block truncate font-medium text-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {course.title}
                    </Link>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      by {course.instructor}
                    </p>
                    <p className="mt-1 font-heading text-lg font-semibold text-primary">
                      ${course.price}
                      <span className="ml-1 text-sm font-normal text-muted-foreground">
                        /{course.period.replace(/^\//, "")}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(course.id)}
                    aria-label={`Remove ${course.title} from cart`}
                    className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center self-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5">
              <p className="flex items-center justify-between text-lg">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-heading text-2xl font-semibold text-primary">
                  ${total}
                </span>
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href="/sign-in">Checkout — Sign in to enroll</Link>
              </Button>
              <button
                type="button"
                onClick={clear}
                className="mt-3 w-full cursor-pointer text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** Resolve cart ids to full course records (deduped, order-preserving). */
function useMemoItems(ids: readonly string[]) {
  return ids
    .map((id) => searchCatalog.find((course) => course.id === id))
    .filter((course): course is (typeof courses)[number] => Boolean(course));
}
