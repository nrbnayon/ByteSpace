import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarStackProps = {
  images: readonly {
    src: string;
    width: number;
    height: number;
  }[];
  /** Extra count shown in the trailing "+N" circle. */
  extraLabel?: string;
  size?: number;
  className?: string;
  /** Accessible description of the group, e.g. "students enrolled". */
  label: string;
};

/**
 * Overlapping circular avatars ending in a "+N" badge.
 * Images are decorative; the group carries one accessible label.
 */
export function AvatarStack({
  images,
  extraLabel,
  size = 32,
  className,
  label,
}: AvatarStackProps) {
  return (
    <ul
      className={cn("flex items-center", className)}
      aria-label={label}
      style={{ ["--avatar-size" as string]: `${size}px` }}
    >
      {images.map((image, i) => (
        <li
          key={image.src + i}
          className="relative -mr-2 rounded-full ring-2 ring-card last:mr-0"
          style={{ width: size, height: size }}
        >
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            sizes={`${size}px`}
            className="rounded-full object-cover"
          />
        </li>
      ))}
      {extraLabel ? (
        <li
          className="relative z-10 -ml-2 inline-flex items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground ring-2 ring-card"
          style={{ width: size, height: size }}
        >
          {extraLabel}
        </li>
      ) : null}
    </ul>
  );
}
