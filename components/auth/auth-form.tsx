"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type AuthMode = "sign-in" | "sign-up";

type AuthFormProps = {
  mode: AuthMode;
};

const fieldClassName =
  "h-11 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-ring/50";

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="w-full">
      <p className="text-sm font-medium text-primary">
        {isSignUp ? "Create an Account" : "Sign In"}
      </p>
      <h1 className="mt-2 max-w-sm text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
        {isSignUp ? "Welcome to ByteSpace" : "Welcome Back"}
      </h1>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {isSignUp ? (
          <div className="space-y-2">
            <label htmlFor="full-name" className="text-sm font-medium text-foreground">
              Full Name
            </label>
            <input id="full-name" name="name" type="text" autoComplete="name" placeholder="Jamie Davis" className={fieldClassName} required />
          </div>
        ) : null}

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="designer@example.com" className={fieldClassName} required />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            {!isSignUp ? (
              <Link href="/" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            ) : null}
          </div>
          <input id="password" name="password" type="password" autoComplete={isSignUp ? "new-password" : "current-password"} placeholder="********" className={fieldClassName} minLength={8} required />
        </div>

        <Button type="submit" variant="secondary" size="md" className="ml-auto w-fit px-7">
          {isSignUp ? "Continue" : "Sign In"}
        </Button>
        <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
          {submitted ? "This demo form is ready to connect to your auth service." : ""}
        </p>
      </form>

      {!isSignUp ? (
        <>
          <div className="my-8 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            <span>or</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Continue with Facebook" className="inline-flex size-14 items-center justify-center rounded-2xl border border-border text-2xl font-bold text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring">f</button>
            <button type="button" aria-label="Continue with Google" className="inline-flex size-14 items-center justify-center rounded-2xl border border-border text-2xl font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring">G</button>
          </div>
        </>
      ) : null}

      <p className="mt-14 text-center text-sm text-muted-foreground">
        {isSignUp ? "Already have an account?" : "New user?"}{" "}
        <Link href={isSignUp ? "/sign-in" : "/sign-up"} className="font-medium text-primary hover:underline">
          {isSignUp ? "Login" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
