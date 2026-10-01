# ByteSpace

> **A modern online course marketplace — from Figma design to production-ready Next.js app.**

## About

ByteSpace is a fully featured **online learning platform** built as a pixel-faithful implementation of a professional Figma design. It brings together a complete course marketplace experience — from browsing and searching thousands of courses, to enrolling, reviewing instructor profiles, and managing a persistent shopping cart.

The project serves as a real-world reference for building scalable, accessible, and visually polished Next.js applications. Every part of the design — typography, color tokens, spacing, motion, and component structure — has been faithfully translated from Figma into code.

### Highlights

- 🎨 **Design-accurate UI** — 1440 px canvas scaled with a CSS `--s` factor to match Figma 1:1 at any screen width
- 🌙 **Auto theme system** — light / dark / system modes with zero FOUC, cross-tab sync, and a live OS-preference watcher
- 🔍 **URL-driven search** — full-text filtering, category & level chips, four sort modes, 5-window pagination — all shareable via the URL
- 🛒 **Persistent cart** — `localStorage`-backed via `useSyncExternalStore`, syncs across tabs, hydration-safe
- 📴 **Installable PWA with offline support** — Serwist service worker precaches the app shell, caches visited pages at runtime, and serves a branded offline page when there's no connection
- ♿ **Accessibility-first** — skip link, WAI-ARIA tabs, live regions, focus management, `jest-axe` assertions on every component
- 🚀 **Static-first delivery** — SSG for 90 course pages and all creator profiles; Turbopack in development
- 🧪 **83 tests** — Vitest + Testing Library + jest-axe covering UI primitives, interactions, a11y, and the PWA surface

Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, **GSAP**, **Serwist**, and **TypeScript** (strict mode).

## Routes

| Route | Type | Description |
| --- | --- | --- |
| `/` | Static | Landing page — hero, partners, course explorer, learning paths, growth, testimonials |
| `/search` | Static + client | Course search: query, category/level filters, sorting, pagination (18/page), skeleton loading state |
| `/courses/[id]` | SSG ×90 | Course detail: video preview, sticky enroll card, About/Lessons/Reviews tabs, ratings summary, related courses |
| `/creators/[id]` | SSG | Creator profile: stats, follow, filterable product grid |
| `/become-a-creator` | Static | Creator pitch + validated application form |
| `/legal/[slug]` | SSG ×3 | Privacy Policy, Terms of Service, Cookies Settings |
| `/sign-in`, `/sign-up` | Static | Auth pages (no header/footer chrome) |
| `/robots.txt`, `/sitemap.xml` | — | SEO routes (all course/creator URLs included) |
| `/manifest.webmanifest` | Static | PWA web app manifest — name, standalone display, brand colors, icon sets |
| `/serwist/sw.js` | Static | Service worker (Serwist build, esbuild-bundled and prerendered) |
| `/~offline` | Static | Branded offline fallback, precached by the service worker |

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, static prerender/SSG) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) + `tw-animate-css` |
| Typography | Poppins (headings) · Satoshi (body) · Clash Display (wordmark) — self-hosted via `next/font` |
| Animation | GSAP + ScrollTrigger (hero, growth section) · CSS/tw-animate entrances · IntersectionObserver `Reveal` scroll animations |
| Icons | lucide-react · react-icons |
| Testing | Vitest + Testing Library + jest-axe (a11y assertions) — **77 tests** |
| Quality | TypeScript strict · ESLint (core-web-vitals + react-hooks v7) |
| PWA / offline | Serwist (`@serwist/turbopack`) — Workbox-based precache + runtime caching |

## Design tokens

Extracted from the reference design ([`app/globals.css`](app/globals.css)):

- **Primary** — `#003BE2` electric blue (CTAs, links, brand bands) → lightened for AA contrast in dark mode
- **Secondary** — `#D4FB20` lime (highlights, progress, active chips) — works on both themes
- **`--surface-brand`** — full-width brand bands (hero / CTA / 404)
- Full shadcn-compatible token set (`background`, `card`, `muted`, `ring`, …) in light + dark

Fonts are wired as Tailwind utilities: `font-sans` (Satoshi), `font-heading` (Poppins), `font-brand` (Clash Display wordmark).

## Theme system (auto / dynamic)

- `ThemeProvider` reads theme state from an **external store** ([`components/theme/theme-store.ts`](components/theme/theme-store.ts)) via `useSyncExternalStore` — no setState-in-effect cascades, hydration-safe, cross-tab sync, and live OS-preference tracking.
- Modes: **light / dark / system** (light is the default; `system` follows `prefers-color-scheme`).
- A tiny inline script in `<head>` applies the resolved class **before first paint** — zero FOUC.
- The toggle ([`components/theme/theme-toggle.tsx`](components/theme/theme-toggle.tsx)) is a labelled `radiogroup` with an `aria-live` announcement; it renders in `brand` variant on blue bands and `default` variant elsewhere.

## Key features

### Search & discovery
- URL-driven state (`?q=&category=&level=&sort=&page=`) — shareable, back/forward-safe
- Full-text matching over titles, instructors, and categories, with aliasing so learning-path links (e.g. `?q=IT & Software` from the home cards) resolve to real courses
- Filter dropdowns (check-marked selections, outside-click close), lime category chips, four sort modes
- 5-window pagination, `aria-live` result counts, empty states, and a card-grid skeleton mirroring the real layout (no layout shift when content arrives)

### Course pages
- Blue grid band with the white enroll card overlapping the band edge, exactly as the design
- Video preview as a **lite-embed facade** (poster + accessible play button → `youtube-nocookie` iframe with autoplay; swap `DEMO_YOUTUBE_ID` for real lesson videos)
- WAI-ARIA tabs (roving tabindex, arrow keys) for About / Lessons / Reviews
- Reviews: ratings summary card, star-filter chips, live region announcements
- **Enroll Now** adds the course to the cart (toggle), opens the drawer, and announces the action

### Cart
- localStorage-persisted via `useSyncExternalStore` ([`components/cart/cart-store.tsx`](components/cart/cart-store.tsx)) — survives reloads, syncs across tabs, hydration-safe
- Slide-over drawer ([`components/cart/cart-drawer.tsx`](components/cart/cart-drawer.tsx)): line items, remove, total, checkout CTA (sign-in gated), empty state; `role="dialog"` with focus management and Escape to close
- Header bag button shows a live count badge with an updated accessible name

### Motion & scroll UX
- Fixed header hides on scroll-down, returns on scroll-up, and gains a frosted-glass band (`bg/70` + `backdrop-blur-xl`) when scrolled
- `ScrollReset` ([`components/layout/scroll-reset.tsx`](components/layout/scroll-reset.tsx)) lands every route change at the top instantly (no smooth-scroll racing)
- `Reveal` ([`components/ui/reveal.tsx`](components/ui/reveal.tsx)) — once-only scroll reveals with stagger, used on card grids, bios, and media
- Course cards lift with a cover-image zoom on hover; all motion respects `prefers-reduced-motion`

## PWA & offline support

ByteSpace is an installable Progressive Web App powered by [Serwist](https://serwist.pages.dev) — the actively maintained successor to `next-pwa` — using its Turbopack-native integration, so no webpack fallback is needed.

- **Web app manifest** — [`app/manifest.ts`](app/manifest.ts): standalone display, brand `#003BE2` theme color, and any + maskable icon sets generated from the brand mark ([`scripts/generate-pwa-icons.mjs`](scripts/generate-pwa-icons.mjs))
- **App shell precache** — the build prerenders the service worker via [`app/serwist/[path]/route.ts`](app/serwist/[path]/route.ts), precaching ~105 entries (every static asset + the offline page) so repeat loads are instant and network-free
- **Runtime caching** — Next.js-tuned Workbox strategies: cache-first for immutable `/_next/static` JS, stale-while-revalidate for images/fonts/CSS, network-first for pages and RSC payloads — visited pages (and client-side navigation between them) keep working offline
- **Offline fallback** — a branded [`/~offline`](app/~offline/page.tsx) page is precached and served for navigations that can't be served from cache, such as cold-starting the installed app without a connection
- **Dev-safe** — registration is disabled during `next dev` so the cache never interferes with HMR; the SW is built and registered only in production
- Oversized media (>2 MB, Workbox's default limit) is skipped by the precache to keep installs lean

## Folder structure

```
app/                  # App Router routes (incl. search/, courses/[id]/, creators/[id]/, become-a-creator/, legal/[slug]/, serwist/[path]/, ~offline/, manifest.ts, sw.ts)
  fonts/              # Self-hosted font binaries + OFL licenses
components/
  ui/                 # Generic primitives (Button, Chip, Tabs, Rating, RatingSummary,
  │                   #   ReviewCard, MetaPill, ShareButton, Reveal, AvatarStack, …)
  layout/             # SiteHeader (hide-on-scroll), SiteFooter, SkipLink, ScrollReset
  home/               # Feature sections (Hero, CourseExplorer, LearningPaths, Testimonials, …)
  search/             # CourseSearch + skeleton components
  courses/            # CourseDetail, EnrollCard, video facade, About/Lessons/Reviews panels
  creators/           # CreatorProfile, FollowButton, application form
  cart/               # CartProvider store + CartDrawer
  theme/              # ThemeProvider, ThemeToggle, theme-store
  brand/              # Logo lockup
  seo/                # JsonLd structured-data component
config/site.ts        # Single source of truth: brand info + navigation + footer links
data/                 # Typed datasets (courses, search-catalog, course-details, creators,
                      #   categories, testimonials, legal, stats)
lib/                  # fonts.ts, theme.ts, seo.ts, types.ts, utils.ts
public/images/        # Semantic asset tree: brand/ hero/ courses/ avatars/ categories/ partners/ patterns/ growth/
public/icons/         # PWA icons — any + maskable + apple-touch PNGs rasterized from the brand mark
scripts/              # generate-pwa-icons.mjs (one-off PWA icon rasterizer)
tests/                # Vitest suites (unit + interaction + jest-axe a11y, pwa) — 83 tests
```

## Accessibility

- Skip link, semantic landmarks, labelled regions, correct heading outline (including visually-hidden section headings where grids follow an `h1`)
- WAI-ARIA tabs with full keyboard support; `aria-pressed` toggles for chips, filters, follow, and enroll
- Live regions for filter results, review counts, cart/share/follow confirmations, and form status
- Forms: labelled fields, `aria-invalid` + `aria-describedby` error wiring, success announcements
- Dialogs: `aria-modal`, focus trap-in/focus-restore, Escape to close
- Decorative imagery is `alt=""`; avatar stacks use one group label; off-canvas drawer is hidden from the tree when closed
- `prefers-reduced-motion` disables all animation (GSAP entrances, reveals, marquee, smooth scroll, header transition)
- `jest-axe` assertions on primitives, sections, pages, and interactive flows

## SEO

- Metadata API with `metadataBase`, Open Graph, Twitter cards, per-route titles/descriptions
- `noindex` on auth, search, and application pages; indexable course/creator pages
- `app/robots.ts` + `app/sitemap.ts` (home, search, all course and creator URLs)
- JSON-LD: `Organization`, `WebSite` (+ `SearchAction`), `ItemList` of courses, per-course `Course` schema with `AggregateRating` and `Offer`, creator `ProfilePage` ([`lib/seo.ts`](lib/seo.ts))
- Responsive `viewport` + light/dark `theme-color`

## Commands

```bash
npm run dev          # develop at localhost:3000
npm run build        # production build (static + SSG prerender)
npm run test         # vitest run (83 tests)
npm run test:watch   # vitest watch mode
npm run test:coverage
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
node scripts/generate-pwa-icons.mjs   # regenerate PWA icons from the brand mark (rarely needed)
```

## Responsive behavior

- **Hero** — below `lg` the stage is fluid (natural stacking); from `lg` it renders the exact 1440×1024 Figma canvas, scaled proportionally via a CSS `--s` factor, so desktop matches the design 1:1 at any width.
- **Partners** — infinite marquee with mask fade (paused under reduced motion).
- **Course grids** — 1 → 2 → 3 columns on search, explorer, creator, and related-course sections; learning paths 2 → 3 → 6.
- **Course detail** — enroll card is sticky beside the tabs on `lg`, stacks below the video on mobile; blue band height adapts per breakpoint.
- **Header** — desktop nav/actions collapse into an accessible disclosure menu below `lg`; the bag badge, glass band, and hide/show behavior work at every width.

## Content architecture

All page content is typed data, never hardcoded in components:

- `data/courses.ts` — the six real courses (source of truth for course cards site-wide)
- `data/search-catalog.ts` — the catalog expanded to 90 items for the paginated search demo (single swap point for a real API)
- `data/course-details.ts` — one bespoke detail record matching the design + a generator that layers consistent defaults onto every catalog course
- `data/creators.ts` — creator profiles whose `productIds` reference real course ids
- `data/legal.ts` — structured legal document content

## License notes

- Satoshi & Clash Display: SIL Open Font License 1.1 (see `app/fonts/**/OFL.txt`)
- Course/gallery photography: Unsplash (via the reference design)
- Demo preview video: "Big Buck Bunny" © Blender Foundation (youtube-nocookie embed)
