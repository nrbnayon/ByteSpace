import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureCheckProps = {
  children: React.ReactNode;
  className?: string;
};

/** Lime check badge + medium label row ("Share Your Expertise", …). */
export function FeatureCheck({ children, className }: FeatureCheckProps) {
  return (
    <li className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
      >
        <Check className="size-4" strokeWidth={3} />
      </span>
      <span className="font-medium text-foreground">{children}</span>
    </li>
  );
}
