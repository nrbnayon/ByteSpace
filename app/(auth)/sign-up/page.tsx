import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Create an Account",
  description: "Create a ByteSpace account and start learning today.",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return <AuthShell mode="sign-up" />;
}
