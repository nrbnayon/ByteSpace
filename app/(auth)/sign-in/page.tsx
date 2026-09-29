import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your ByteSpace learning account.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return <AuthShell mode="sign-in" />;
}
