import type { Metadata, Viewport } from "next";
import { poppins, satoshi, clashDisplay } from "@/lib/fonts";
import { themeInitScript } from "@/lib/theme";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollReset } from "@/components/layout/scroll-reset";
import { CartProvider } from "@/components/cart/cart-store";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SkipLink } from "@/components/layout/skip-link";
import { SerwistProvider } from "@serwist/turbopack/react";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "online courses",
    "e-learning platform",
    "UI/UX design course",
    "web development course",
    "business courses",
    "course creator",
  ],
  authors: [{ name: siteConfig.creator.name }],
  creator: siteConfig.creator.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero/student.png",
        width: 516,
        height: 483,
        alt: `Student learning on ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/hero/student.png"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#003be2" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e1c" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${poppins.variable} ${clashDisplay.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies the stored/system theme before first paint — no FOUC */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Structured data for search-engine rich results */}
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <CartProvider>
          <SerwistProvider
            swUrl="/serwist/sw.js"
            // Never cache in development — stale chunks break HMR.
            disable={process.env.NODE_ENV === "development"}
          >
          <div id="site-chrome" className="contents">
            <SkipLink />
            <ScrollReset />
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
            <CartDrawer />
          </div>
          </SerwistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
