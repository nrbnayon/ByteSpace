import type { ReactNode } from "react";
import { ChromeHider } from "@/components/layout/chrome-hider";

/**
 * Auth routes render WITHOUT the site header/footer — a distraction-free
 * shell. <ChromeHider/> temporarily hides the root layout's landmarks while
 * any (auth) page is mounted and restores them on unmount.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ChromeHider />
      <main className="min-h-screen">{children}</main>
    </>
  );
}
