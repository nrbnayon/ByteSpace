"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type AuthMode = "sign-in" | "sign-up";

type AuthFormProps = {
  mode: AuthMode;
};

const poppins = "font-[family-name:var(--font-poppins)]";

// 52px tall, 16px radius, 24px side padding, 18px text (Figma)
const fieldClassName =
  "h-[52px] w-full rounded-2xl border border-[#e5e6e8] bg-white px-6 text-lg leading-[1.6] text-[#242528] outline-none transition-[border-color,box-shadow] placeholder:text-[#82868e] focus-visible:border-[#003be2] focus-visible:ring-2 focus-visible:ring-[#003be2]/20";

// 14px label, 8px above the input
const labelClassName = "mb-2 block text-sm font-medium leading-[1.2] text-[#242528]";

const socialButton =
  "grid size-[72px] cursor-pointer place-items-center rounded-3xl border border-[#e5e6e8] bg-white text-[#242528] transition-colors hover:bg-[#f5f5f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003be2]";

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="w-full">
      {/* Eyebrow (18px, regular, blue) + heading (Poppins 44px) */}
      <p className="text-lg leading-[1.6] text-[#003be2]">
        {isSignUp ? "Create an Account" : "Sign In"}
      </p>
      <h1
        className={`${poppins} -mt-[1.6px] text-3xl font-semibold leading-[1.2] tracking-[-0.01em] text-[#242528] sm:text-4xl lg:text-[44px]`}
      >
        {isSignUp ? "Welcome to ByteSpace" : "Welcome Back"}
      </h1>

      {/* Fields 24px apart, form starts 40px under the heading */}
      <form className="mt-8 flex flex-col gap-6 lg:mt-10" onSubmit={handleSubmit}>
        {isSignUp ? (
          <div data-anim="field" className="opacity-0">
            <label htmlFor="full-name" className={labelClassName}>
              Full Name
            </label>
            <input
              id="full-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jamie Davis"
              className={fieldClassName}
              required
            />
          </div>
        ) : null}

        <div data-anim="field" className="opacity-0">
          <label htmlFor="email" className={labelClassName}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="designer@example.com"
            className={fieldClassName}
            required
          />
        </div>

        <div data-anim="field" className="opacity-0">
          <label htmlFor="password" className={labelClassName}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            placeholder="********"
            className={fieldClassName}
            minLength={8}
            required
          />
        </div>

        {/* Lime pill button, right-aligned */}
        <div data-anim="field" className="relative flex justify-end opacity-0">
          <button
            type="submit"
            className="cursor-pointer rounded-3xl bg-[#d4fb20] px-6 py-3 text-lg font-medium leading-[1.2] text-[#242528] transition duration-200 hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0 active:scale-95"
          >
            {isSignUp ? "Continue" : "Sign In"}
          </button>
          <p
            aria-live="polite"
            role="status"
            className="absolute right-0 top-full mt-3 whitespace-nowrap text-xs text-[#82868e]"
          >
            {submitted ? "This demo form is ready to connect to your auth service." : ""}
          </p>
        </div>
      </form>

      {/* Sign-in only: divider + social buttons */}
      {!isSignUp ? (
        <>
          <div
            data-anim="field"
            className="mt-10 flex w-full items-center gap-3 text-base leading-[1.6] text-[#82868e] opacity-0 lg:mt-[75px] lg:max-w-[440px]"
          >
            <span className="h-px flex-1 bg-[#cfd1d5]" />
            <span>or</span>
            <span className="h-px flex-1 bg-[#cfd1d5]" />
          </div>

          <div data-anim="field" className="mt-6 flex justify-center gap-4 opacity-0 lg:mt-[43px]">
            <button type="button" aria-label="Continue with Facebook" className={socialButton}>
              <svg viewBox="0 0 24 24" className="size-8 fill-current" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button type="button" aria-label="Continue with Google" className={socialButton}>
              <svg viewBox="0 0 24 24" className="size-8 fill-current" aria-hidden="true">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </button>
          </div>
        </>
      ) : null}

      {/* Footer link – pinned inside the card on desktop (Figma offsets differ per mode) */}
      <p
        data-anim="field"
        className={`mt-10 text-center text-base leading-[1.6] text-[#82868e] opacity-0 lg:absolute lg:inset-x-0 lg:mt-0 ${isSignUp ? "lg:bottom-[51px]" : "lg:bottom-[39px]"
          }`}
      >
        {isSignUp ? "Already have an account?" : "New user?"}{" "}
        <Link
          href={isSignUp ? "/sign-in" : "/sign-up"}
          className="text-[#003be2] hover:underline"
        >
          {isSignUp ? "Login" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}