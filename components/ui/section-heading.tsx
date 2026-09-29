import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Anchors the heading for aria-labelledby references. */
  id?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  /** Heading level for document outline correctness. */
  as?: "h1" | "h2" | "h3";
  size?: "md" | "lg";
  className?: string;
};

/**
 * Title (Poppins) + subtitle (Satoshi) pair used by every section —
 * keeps type scale and font roles consistent across the site.
 */
export function SectionHeading({
  id,
  title,
  subtitle,
  align = "center",
  as: Tag = "h2",
  size = "lg",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <Tag
        id={id}
        className={cn(
          "max-w-[46rem] text-balance",
          size === "lg" ? "text-4xl lg:text-[2.75rem] lg:leading-[1.2]" : "text-3xl lg:text-4xl lg:leading-[1.2]"
        )}
      >
        {title}
      </Tag>
      {subtitle ? (
        <p className="max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
