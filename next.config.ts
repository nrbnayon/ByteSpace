import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";

// withSerwist marks esbuild/esbuild-wasm as server-external packages so the
// route handler at app/serwist/[path]/route.ts can bundle the service worker
// with the native binary. The SW itself is emitted via that route handler —
// fetched by <SerwistProvider swUrl="/serwist/sw.js"> in app/layout.tsx.
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withSerwist(nextConfig);
