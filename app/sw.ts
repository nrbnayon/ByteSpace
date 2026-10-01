/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { defaultCache } from "@serwist/turbopack/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest (injected when Next prerenders
// app/serwist/[path]/route.ts). By default it is "self.__SW_MANIFEST".
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  // Next.js-recommended runtime strategies: cache-first for immutable
  // /_next/static JS, stale-while-revalidate for images/fonts/css,
  // network-first for pages and RSC payloads.
  runtimeCaching: defaultCache,
  // When a navigation can't be served from network or cache (e.g. the
  // user cold-starts the installed app while offline), show the
  // precached offline page instead of the browser's dinosaur.
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
