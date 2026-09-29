import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { footerNav, siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/60">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              className="w-fit rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <Logo />
            </Link>
            <NewsletterForm />
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.heading} className="flex flex-col gap-4">
                <h3 className="text-base font-semibold text-foreground">{group.heading}</h3>
                <ul className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
