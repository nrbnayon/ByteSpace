"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  /** Accessible name for the tablist, e.g. "Course information". */
  label: string;
  tabs: readonly Tab[];
  className?: string;
};

/**
 * WAI-ARIA tabs: roving tabindex, Arrow/Home/End navigation, automatic
 * activation, and labelled-by/controls wiring between tab and panel.
 */
export function Tabs({ label, tabs, className }: TabsProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const listRef = useRef<HTMLDivElement>(null);

  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = tabs.findIndex((tab) => tab.id === activeId);
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === null) return;
    event.preventDefault();
    const id = tabs[next].id;
    setActiveId(id);
    listRef.current
      ?.querySelector<HTMLButtonElement>(`#${baseId}-tab-${id}`)
      ?.focus();
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        ref={listRef}
        className="flex flex-wrap gap-3"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active.id;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={onKeyDown}
              className={cn(
                "inline-flex h-11 cursor-pointer items-center rounded-full px-6 text-base font-medium transition-colors outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                selected
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        key={active.id}
        id={`${baseId}-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.id}`}
        tabIndex={0}
        className="mt-10 focus-visible:outline-none"
      >
        {active.content}
      </div>
    </div>
  );
}
