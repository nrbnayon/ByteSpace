import { cn } from "@/lib/utils";

/**
 * Shared page container — matches the reference's 120px side padding on
 * desktop, collapsing to fluid gutters on smaller screens.
 */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-30", className)}
      {...props}
    />
  );
}
