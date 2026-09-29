import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type LogoProps = {
  className?: string;
  /** Show the wordmark next to the mark. */
  withWordmark?: boolean;
};

/**
 * Brand lockup — mark + wordmark set in Clash Display.
 * The accessible name comes from the linked text in the header/footer,
 * so the visuals here are decorative.
 */
export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/images/brand/logo-mark.svg"
        alt=""
        width={29}
        height={32}
        aria-hidden="true"
      />
      {withWordmark ? (
        // Optical correction: Clash Display's ink (cap-height + the "y"
        // descender) reads ~1px low when the em box is centered, so the
        // wordmark is nudged up to align with the mark's visual center.
        <span className="-translate-y-[0.045em] font-brand text-2xl font-bold leading-none tracking-tight">
          {siteConfig.name}
        </span>
      ) : null}
    </span>
  );
}
