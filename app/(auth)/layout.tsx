import type { ReactNode } from "react";
import { ChromeHider } from "@/components/layout/chrome-hider";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ChromeHider />
      <div className="min-h-svh w-full">{children}</div>
    </>
  );
}
