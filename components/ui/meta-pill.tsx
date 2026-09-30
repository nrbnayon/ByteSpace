import { cn } from "@/lib/utils";

type MetaPillProps = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/**
 * White rounded pill used across the course detail hero (level, rating,
 * students) and the enroll card stats. On brand bands it carries a blue
 * icon + ink text; readable in both themes since the surface is fixed white.
 */
export function MetaPill({ icon, children, className }: MetaPillProps) {
  return (
    <span
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-base font-medium text-[#242528]",
        className
      )}
    >
      {icon ? <span className="text-[#003BE2] dark:text-[#0034c4]">{icon}</span> : null}
      {children}
    </span>
  );
}
