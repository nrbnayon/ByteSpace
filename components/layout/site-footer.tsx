import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { footerColumns, footerLegal, siteConfig } from "@/config/site";

const satoshi = "font-[family-name:var(--font-satoshi)]";

// 16px / 24px links (Figma Body M)
const navLink =
  "inline-block text-base leading-6 text-[#242528] transition-colors hover:text-[#003be2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#003be2] dark:text-[#f5f5f6] dark:hover:text-[#d4fb20]";

// 12px bottom-bar links (Figma Body XS)
const legalLink =
  "text-xs leading-[1.6] text-[#242528] transition-colors hover:text-[#003be2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#003be2] dark:text-[#f5f5f6] dark:hover:text-[#d4fb20]";

/**
 * Design (1440 frame): content 1200px wide (120px margins).
 *  - left column 504px: logo → tagline → email form → note
 *  - right: 3 link columns (166px each, 41px gap) starting at x740, 38px row pitch
 *  - divider at y435, copyright + legal links 22px under it
 * Below `lg` everything stacks; the content still respects the same rhythm.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`${satoshi} border-t border-[#e5e6e8] bg-white text-[#242528] dark:border-white/10 dark:bg-[#0f0f0f] dark:text-[#f5f5f6]`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 pb-8 pt-12 sm:px-8 sm:pt-16 lg:pb-[54px] lg:pt-[71px] xl:px-0">
        {/* Main block: brand + newsletter | link columns */}
        <div className="grid gap-12 lg:min-h-[364px] lg:grid-cols-[minmax(0,504fr)_minmax(0,580fr)] lg:gap-x-[clamp(48px,8vw,116px)]">
          {/* Logo first, then newsletter */}
          <div className="flex flex-col">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              className="mb-4 flex w-fit rounded-full text-[#242528] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#003be2] lg:mb-[18px] dark:text-white"
            >
              <Logo />
            </Link>
            <NewsletterForm />
          </div>

          {/* Link columns (no headings, as in the design) */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-x-[clamp(16px,3.4vw,41px)] lg:pt-[47px]"
          >
            {footerColumns.map((column, i) => (
              <ul
                key={i}
                className="flex flex-col gap-[14px] max-sm:last:col-span-2"
              >
                {column.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={navLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        {/* Bottom bar: copyright left, Privacy / Terms / Cookies Settings right */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#d9dadd] pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-0 lg:pt-[22px] dark:border-white/15">
          <p className="text-xs leading-[1.6]">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLegal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={legalLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}