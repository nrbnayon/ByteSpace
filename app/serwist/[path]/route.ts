import { createSerwistRoute } from "@serwist/turbopack";
import { spawnSync } from "node:child_process";

// A revision versions the extra precached entries (the offline page) so
// an updated build replaces stale precached responses instead of
// trusting their HTTP cache headers.
const revision =
  spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout?.trim() ||
  crypto.randomUUID();

// Route handler that serves the built service worker (and its map) as a
// static asset. The catch-all dynamic segment maps /serwist/sw.js —
// referenced by <SerwistProvider swUrl="/serwist/sw.js"> — to the file
// emitted by esbuild from app/sw.ts. Prerendered at build time by
// Turbopack, which is why Serwist needs this route-handler workaround.
export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    swSrc: "app/sw.ts",
    additionalPrecacheEntries: [{ url: "/~offline", revision }],
    useNativeEsbuild: true,
  });
