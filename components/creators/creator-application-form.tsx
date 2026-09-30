"use client";

import { useId, useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "expertise" | "links", string>>;

/**
 * Creator application form — client-side validation with inline error
 * messages tied via aria-describedby, a polite live region for the summary,
 * and a success state (backend hookup replaces the simulated submit).
 */
export function CreatorApplicationForm() {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "error" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState("");

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const expertise = String(data.get("expertise") ?? "").trim();
    const links = String(data.get("links") ?? "").trim();

    if (name.length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email so we can reply.";
    }
    if (expertise.length < 10) {
      next.expertise = "Give us at least a sentence about what you teach.";
    }
    if (links && !/(\bhttps?:\/\/\S+|\S+\.\S+\/\S*)/.test(links)) {
      next.links = "Include full URLs (starting with http/https).";
    }
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setSummary(
        `${Object.keys(nextErrors).length} field${Object.keys(nextErrors).length === 1 ? "" : "s"} need attention before submitting.`
      );
      return;
    }

    // Simulated submission — replace with a real API call when available.
    setStatus("sent");
    setSummary("Application received — we'll be in touch soon.");
  }

  const fieldClass =
    "h-13 w-full rounded-xl border border-input bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/60 aria-[invalid=true]:border-destructive";

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-border bg-card p-8 text-center shadow-[0_24px_60px_-32px_rgba(16,19,34,0.25)]"
      >
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <Check className="size-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight text-foreground">
          Application received!
        </h2>
        <p className="mt-2 text-pretty text-muted-foreground">
          Thanks for applying to teach on ByteSpace. Our team reviews every
          application and will reply within a few days.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setSummary("");
          }}
          className="mt-6 cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-label="Creator application"
      className="rounded-3xl border border-border bg-card p-6 shadow-[0_24px_60px_-32px_rgba(16,19,34,0.25)] lg:p-8"
    >
      <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
        Apply to become a creator
      </h2>
      <p className="mt-2 text-base text-muted-foreground">
        Tell us about yourself and what you&rsquo;d love to teach.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-1.5 block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className={fieldClass}
            placeholder="Your full name"
          />
          {errors.name ? (
            <p id={`${uid}-name-error`} className="mt-1.5 text-sm text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            className={fieldClass}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id={`${uid}-email-error`} className="mt-1.5 text-sm text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${uid}-expertise`} className="mb-1.5 block text-sm font-medium text-foreground">
            What would you teach?
          </label>
          <textarea
            id={`${uid}-expertise`}
            name="expertise"
            required
            rows={4}
            aria-invalid={Boolean(errors.expertise)}
            aria-describedby={errors.expertise ? `${uid}-expertise-error` : undefined}
            className={cn(fieldClass, "h-auto resize-y py-3")}
            placeholder="e.g. I've been a product designer for 8 years and want to teach design systems…"
          />
          {errors.expertise ? (
            <p id={`${uid}-expertise-error`} className="mt-1.5 text-sm text-destructive">
              {errors.expertise}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${uid}-links`} className="mb-1.5 block text-sm font-medium text-foreground">
            Portfolio links <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id={`${uid}-links`}
            name="links"
            type="url"
            aria-invalid={Boolean(errors.links)}
            aria-describedby={errors.links ? `${uid}-links-error` : `${uid}-links-hint`}
            className={fieldClass}
            placeholder="https://your-portfolio.com"
          />
          {errors.links ? (
            <p id={`${uid}-links-error`} className="mt-1.5 text-sm text-destructive">
              {errors.links}
            </p>
          ) : (
            <p id={`${uid}-links-hint`} className="mt-1.5 text-sm text-muted-foreground">
              Dribbble, GitHub, YouTube — anything that shows your work.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-3xl bg-secondary text-lg font-medium text-secondary-foreground transition duration-200 hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Send className="size-4" aria-hidden="true" />
          Submit application
        </button>

        <span role="status" aria-live="polite" className="sr-only">
          {summary}
        </span>
      </div>
    </form>
  );
}
