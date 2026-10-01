"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/types";

type Phase = "idle" | "exiting" | "shifting" | "entering";

/**
 * Auto-cycling testimonial carousel (desktop only).
 *
 * Every 4.5s the three cards rotate one position left:
 *   slot 0 (left) exits further left and fades →
 *   slots 1/2 shift into slots 0/1 →
 *   the exited card snaps to just off-screen right and slides into slot 2.
 *
 * The 32px in the offsets mirrors the grid `gap-8` so cards land exactly on
 * the neighbouring column. Below `lg` (stacked/2-col layouts) or with
 * `prefers-reduced-motion` the carousel disengages and cards render as a
 * plain static grid. Hovering the row pauses the cycle for reading.
 */

const CYCLE_MS = 4500;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export function TestimonialCards({ items }: { items: readonly Testimonial[] }) {
  const [order, setOrder] = useState([0, 1, 2]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [engaged, setEngaged] = useState(false);
  const hoveredRef = useRef(false);
  const runningRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  // Engage only on 3-column desktops with motion allowed; initial server and
  // first client render are the static grid (no hydration mismatch).
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEngaged(desktop.matches && !motion.matches);
    update();
    desktop.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  }, []);

  const advance = useCallback(() => {
    // Re-entrancy guard: a thawing background tab can fire queued interval
    // ticks in a burst — never start a second cycle mid-flight.
    if (runningRef.current || document.hidden || hoveredRef.current) return;
    runningRef.current = true;
    setPhase("exiting");
    timersRef.current.push(
      window.setTimeout(() => {
        // Rotate: left card wraps to the end; the others shift forward.
        setOrder((prev) => [prev[1] ?? 1, prev[2] ?? 2, prev[0] ?? 0]);
        setPhase("shifting");
        timersRef.current.push(window.setTimeout(() => setPhase("entering"), 60));
        timersRef.current.push(
          window.setTimeout(() => {
            setPhase("idle");
            runningRef.current = false;
          }, 540)
        );
      }, 480)
    );
  }, []);

  useEffect(() => {
    if (!engaged) return;
    const id = window.setInterval(advance, CYCLE_MS);
    return () => {
      window.clearInterval(id);
      clearTimers();
      runningRef.current = false;
      setPhase("idle");
      setOrder([0, 1, 2]);
    };
  }, [engaged, advance, clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  function cardStyle(i: number): React.CSSProperties | undefined {
    if (!engaged) return undefined;
    const slot = order.indexOf(i);
    // Cards live in fixed grid cells (i === cell index, DOM order). A card
    // assigned slot S must shift (S - cell) column-pitches from its own
    // cell, where one pitch = card width + the grid gap (32px, `gap-8`).
    const shift = slot - i;
    const at = (slots: number) => `translateX(calc(${slots} * (100% + 32px)))`;
    const transition = `transform 480ms ${EASE}, opacity 480ms ease`;
    if (phase === "exiting" && slot === 0) {
      return { transform: at(shift - 1), opacity: 0, transition, willChange: "transform" };
    }
    if (phase === "shifting" && slot === 2) {
      // The wrapped card teleports one pitch past the right column with no
      // transition, then slides in during the next phase.
      return { transform: at(shift + 1), opacity: 0, transition: "none", willChange: "transform" };
    }
    return { transform: at(shift), opacity: 1, transition, willChange: "transform" };
  }

  return (
    <ul
      className="mt-14 grid gap-8 md:grid-cols-2 lg:mt-20 lg:grid-cols-3"
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
    >
      {items.map((testimonial, i) => (
        <li key={testimonial.id}>
          <figure
            style={cardStyle(i)}
            className="flex h-full flex-col gap-4 rounded-3xl bg-card p-7 shadow-[0_24px_60px_-32px_rgba(16,19,34,0.18)] lg:gap-5 lg:p-8"
          >
            <Image
              src={testimonial.avatar.src}
              alt=""
              width={testimonial.avatar.width}
              height={testimonial.avatar.height}
              className="size-16 rounded-full object-cover lg:size-[5.5rem]"
            />
            <figcaption className="flex flex-col">
              <span className="font-heading text-xl font-semibold text-foreground">
                {testimonial.name}
              </span>
              <span className="mt-0.5 text-lg text-primary">{testimonial.role}</span>
            </figcaption>
            <blockquote className="mt-2 text-pretty text-base leading-relaxed text-muted-foreground">
              <p>&quot;{testimonial.quote}&quot;</p>
            </blockquote>
          </figure>
        </li>
      ))}
    </ul>
  );
}
