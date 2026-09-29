import Image from "next/image";
import { cn } from "@/lib/utils";

type FeatureCheckProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Check badge + medium label row ("Share Your Expertise", …).
 *
 * Light mode uses the brand asset `check.svg` (a #003BE2 filled circle-check
 * on transparent, straight from Figma); dark mode keeps the lime disc with a
 * dark tick so the badge still pops on navy surfaces.
 */
export function FeatureCheck({ children, className }: FeatureCheckProps) {
  return (
    <li className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/brand/check.svg"
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
        className="size-6 shrink-0 dark:hidden"
      />
      <span
        aria-hidden="true"
        className="hidden size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground dark:flex"
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
          <path
            d="M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="font-medium text-foreground">{children}</span>
    </li>
  );
}
