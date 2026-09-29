# ByteSpace — Course Marketplace Landing Page

A pixel-faithful conversion of the Figma reference design into a modern **Next.js 16 (App Router)** application with Tailwind CSS v4, a full light/dark/auto theme system, and a component-driven architecture.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, static prerender) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Typography | Poppins (headings) · Satoshi (body) · Clash Display (wordmark) — all self-hosted via `next/font` |
| Icons | lucide-react |
| Testing | Vitest + Testing Library + jest-axe (a11y assertions) |
| Quality | TypeScript strict · ESLint (core-web-vitals + react-hooks v7) |

## Design tokens

Extracted from the reference design ([`app/globals.css`](app/globals.css)):

- **Primary** — `#003BE2` electric blue (CTAs, links, brand bands) → lightened for AA contrast in dark mode
- **Secondary** — `#D4FB20` lime (highlights, progress, active chips) — works on both themes
- **`--surface-brand`** — full-width brand bands (hero / CTA / 404)
- Full shadcn-compatible token set (`background`, `card`, `muted`, `ring`, …) in light + dark

Fonts are wired as Tailwind utilities: `font-sans` (Satoshi), `font-heading` (Poppins), `font-brand` (Clash Display wordmark).

## Theme system (auto / dynamic)

- `ThemeProvider` reads theme state from an **external store** ([`components/theme/theme-store.ts`](components/theme/theme-store.ts)) via `useSyncExternalStore` — no setState-in-effect cascades, hydration-safe, cross-tab sync, and live OS-preference tracking.
- Modes: **light / dark / system** (default follows `prefers-color-scheme`).
- A tiny inline script in `<head>` applies the resolved class **before first paint** — zero FOUC.
- The toggle ([`components/theme/theme-toggle.tsx`](components/theme/theme-toggle.tsx)) is a labelled `radiogroup` with an `aria-live` announcement; it renders in `brand` variant on blue bands and `default` variant elsewhere.

## Folder structure

```
app/                  # App Router routes (layout, page, not-found, robots.ts, sitemap.ts)
  fonts/              # Self-hosted font binaries + OFL licenses
components/
  ui/                 # Generic primitives (Button, Chip, Rating, AvatarStack, …)
  layout/             # SiteHeader, SiteFooter, SkipLink, NewsletterForm
  home/               # Feature sections (Hero, CourseExplorer, Testimonials, …)
  theme/              # ThemeProvider, ThemeToggle, theme-store
  brand/              # Logo lockup
  seo/                # JsonLd structured-data component
config/site.ts        # Single source of truth: brand info + navigation
data/                 # Typed content datasets (courses, categories, testimonials, stats)
lib/                  # fonts.ts, theme.ts, seo.ts, types.ts, utils.ts
public/images/        # Semantic asset tree: brand/ hero/ courses/ avatars/ categories/ partners/ patterns/ growth/
tests/                # Vitest suites (unit + interaction + jest-axe a11y)
```

## Accessibility

- Skip link, semantic landmarks, labelled regions, correct heading outline
- Course filtering is a `group` of `aria-pressed` toggle chips with an `aria-live` result announcement
- Decorative imagery is `alt=""`; meaningful images carry descriptive alt text; avatar stacks use one group label
- `prefers-reduced-motion` disables all animation (GSAP entrance/parallax, marquee, smooth scroll)
- `jest-axe` assertions on primitives, sections, and interactive flows

## SEO

- Metadata API with `metadataBase`, Open Graph, Twitter cards, robots directives
- `app/robots.ts` + `app/sitemap.ts` routes
- JSON-LD: `Organization`, `WebSite` (+ `SearchAction`), and `ItemList` of `Course` schema ([`lib/seo.ts`](lib/seo.ts))
- Responsive `viewport` + light/dark `theme-color`

## Commands

```bash
npm run dev          # develop at localhost:3000
npm run build        # production build (fully static)
npm run test         # vitest run (36 tests)
npm run test:watch   # vitest watch mode
npm run test:coverage
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
```

## Responsive behavior

- **Hero** — below `lg` the stage is fluid (natural stacking); from `lg` it renders the exact 1440×1024 Figma canvas, scaled proportionally via a CSS `--s` factor, so desktop matches the design 1:1 at any width.
- **Partners** — infinite marquee with mask fade (paused under reduced motion).
- **Course grid** — 1 → 2 → 3 columns; **learning paths** — 2 → 3 → 6 columns.
- **Header** — desktop nav/actions collapse into an accessible disclosure menu on mobile.

## License notes

- Satoshi & Clash Display: SIL Open Font License 1.1 (see `app/fonts/**/OFL.txt`)
- Course/gallery photography: Unsplash (via the reference design)
