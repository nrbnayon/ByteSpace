import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GridLines } from "@/components/ui/grid-lines";

const satoshi = "font-[family-name:var(--font-satoshi)]";
const poppins = "font-[family-name:var(--font-poppins)]";

export default function NotFound() {
  return (
    <section
      className={`${satoshi} relative isolate flex min-h-[510px] items-center justify-center overflow-hidden bg-[#003be2] px-5 pb-16 pt-28 text-white sm:min-h-screen sm:px-8`}
    >
      {/* Grid (120px cells on desktop, 64px on mobile) - matches Hero exactly */}
      <GridLines />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <p
          aria-hidden="true"
          className={`${poppins} not-found-number select-none text-[12rem] font-bold leading-[0.82] sm:text-[15rem] lg:text-[18rem]`}
        >
          404
        </p>
        <div className="relative z-10 -mt-5 max-w-3xl sm:-mt-8">
          <h1 className={`${poppins} text-balance text-3xl font-semibold text-white sm:text-4xl lg:text-5xl`}>
            The page you are looking for doesn’t exist
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
            Try using a correct URL or go back to the homepage to start again.
          </p>
          <Button asChild variant="secondary" size="sm" className="mt-7">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
