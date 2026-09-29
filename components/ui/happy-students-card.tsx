import { AvatarStack } from "@/components/ui/avatar-stack";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroStudentAvatars } from "@/data/stats";

type HappyStudentsCardProps = {
  className?: string;
};

/**
 * White "Happy Students 4.5 (240) ★ + avatar row" card used in the
 * Create & Manage collage.
 */
export function HappyStudentsCard({ className }: HappyStudentsCardProps) {
  return (
    <div
      className={cn(
        "w-[276px] rounded-2xl bg-card p-4 shadow-xl shadow-black/10",
        className
      )}
    >
      <p className="text-base font-medium text-foreground">Happy Students</p>
      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="text-sm font-semibold text-foreground">4.5</span>
        <span className="line-through opacity-70">(240)</span>
        <Star className="size-3.5 fill-secondary text-secondary" aria-hidden="true" />
      </p>
      <AvatarStack
        label="Over 2,000 happy students"
        images={heroStudentAvatars
          .slice(0, 7)
          .map((src) => ({ src, width: 86, height: 86 }))}
        extraLabel="2K+"
        size={32}
        className="mt-3"
      />
    </div>
  );
}
