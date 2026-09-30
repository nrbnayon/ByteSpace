"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useCart } from "@/components/cart/cart-store";
import { mainNav, siteConfig } from "@/config/site";
import { MdOutlineShoppingBag } from "react-icons/md";

import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count, openDrawer } = useCart();
  // Hide-on-scroll-down / show-on-scroll-up, with a solid band once scrolled
  // so the white nav text stays readable over page content.
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > lastY + 4 && y > 120) setHidden(true);
      else if (y < lastY - 4) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[transform,background-color,box-shadow] duration-300 ease-out",
        "motion-reduce:transition-none",
        hidden ? "-translate-y-full" : "translate-y-0",
        scrolled
          ? "border-b border-white/15 bg-[#003be2]/70 shadow-lg shadow-black/5 backdrop-blur-xl dark:bg-[#0034c4]/70"
          : "bg-transparent border-b border-transparent"
      )
      }
    >
      <Container className="relative flex h-20 items-center justify-between py-0 lg:h-24">
        <Link
          href="/"
          className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          aria-label={`${siteConfig.name} — home`}
        >
          <Logo className="text-surface-brand-foreground [&_span]:text-surface-brand-foreground" />
        </Link>

        {/* Primary navigation — accurately centered across the header */}
        <nav
          aria-label="Main"
          className="hidden lg:absolute lg:left-1/2 lg:top-1/2 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <ul className="flex items-center gap-6 xl:gap-8">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full py-2 text-base text-surface-brand-foreground/90 transition-colors hover:text-surface-brand-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle variant="brand" type="dropdown" />
          <Button
            asChild
            variant="ghost"
            className="h-10 px-3.5 text-surface-brand-foreground hover:bg-surface-brand-foreground/10 hover:text-surface-brand-foreground"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild variant="secondary" size="sm" className="h-10 px-5">
            <Link href="/sign-up">Join Us</Link>
          </Button>
          <button
            type="button"
            onClick={openDrawer}
            aria-label={count > 0 ? `Open cart, ${count} item${count === 1 ? "" : "s"}` : "Open cart"}
            className="relative inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-surface-brand-foreground transition-colors hover:bg-surface-brand-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <MdOutlineShoppingBag className="size-5" aria-hidden="true" />
            {count > 0 ? (
              <span
                aria-hidden="true"
                className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-secondary-foreground"
              >
                {count}
              </span>
            ) : null}
          </button>
        </div>

        {/* Compact controls — below lg the nav lives in the disclosure panel */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle variant="brand" type="dropdown" />
          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              setHidden(false);
            }}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full text-surface-brand-foreground transition-colors hover:bg-surface-brand-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {/* Mobile navigation panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className={cn(
          "mx-5 rounded-3xl border border-border bg-card p-6 shadow-xl lg:hidden",
          "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95"
        )}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-lg font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
          <Button asChild variant="outline" className="flex-1 cursor-pointer">
            <Link href="/sign-in" onClick={() => setOpen(false)}>
              Sign In
            </Link>
          </Button>
          <Button asChild variant="secondary" className="flex-1 cursor-pointer">
            <Link href="/sign-up" onClick={() => setOpen(false)}>
              Join Us
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
