import localFont from "next/font/local";
import { Poppins } from "next/font/google";

/**
 * Typeface system (per brand spec):
 * - Titles / headings    → Poppins (Google Fonts, self-hosted by next/font)
 * - Body / subtitles     → Satoshi (Fontshare, self-hosted woff2, SIL OFL)
 * - Wordmark / branding  → Clash Display (Fontshare, self-hosted woff2, SIL OFL)
 *
 * All are exposed as CSS variables so Tailwind's `font-heading` /
 * `font-sans` / `font-brand` utilities pick them up from `globals.css`.
 */
export const satoshi = localFont({
  src: [
    { path: "../app/fonts/satoshi-latin-400.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/satoshi-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/satoshi-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const clashDisplay = localFont({
  src: [
    { path: "../app/fonts/clash-display/clash-display-400.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/clash-display/clash-display-500.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/clash-display/clash-display-600.woff2", weight: "600", style: "normal" },
    { path: "../app/fonts/clash-display/clash-display-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash-display",
  display: "swap",
});
