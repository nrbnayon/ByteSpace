/**
 * One-off generator for the PWA icon set, derived from the brand mark
 * (public/images/brand/logo-mark.svg — the lime "signal" glyph).
 *
 * Output (public/icons/):
 *   icon-192x192.png           — manifest, any purpose
 *   icon-512x512.png           — manifest, any purpose
 *   maskable-192x192.png       — manifest, "maskable" (glyph padded into the safe zone)
 *   maskable-512x512.png       — manifest, "maskable"
 *   apple-touch-icon.png       — 180x180, iOS home screen (opaque bg, no transparency)
 *
 * The glyph is drawn in the brand blue for contrast (the source mark is lime on
 * dark backgrounds). Re-run with `node scripts/generate-pwa-icons.mjs` if the
 * brand mark ever changes.
 */
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outDir = path.join(root, "public", "icons");
const glyphPath = path.join(root, "public", "images", "brand", "logo-mark.svg");

await mkdir(outDir, { recursive: true });
const glyph = await readFile(glyphPath);

const BLUE = { r: 0x00, g: 0x3b, b: 0xe2 };
const LIME = { r: 0xd4, g: 0xfb, b: 0x20 };
const MASKABLE_SAFE_ZONE = 0.68; // glyph fits within the inner 80% (0.68 * sqrt(2) ≈ 0.96)

async function iconPng(size, name) {
  const markSize = Math.round(size * 0.6);
  const mark = await sharp(glyph, { density: 1200 })
    .resize(markSize, markSize, { fit: "fill" })
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { ...BLUE, alpha: 1 },
    },
  })
    .composite([{ input: mark, left: Math.round((size - markSize) / 2), top: Math.round((size - markSize) / 2) }])
    .png()
    .toFile(path.join(outDir, name));
  console.log(`✓ public/icons/${name}`);
}

async function maskablePng(size, name) {
  const markSize = Math.round(size * MASKABLE_SAFE_ZONE);
  const mark = await sharp(glyph, { density: 1200 })
    .resize(markSize, markSize, { fit: "fill" })
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { ...BLUE, alpha: 1 },
    },
  })
    .composite([{ input: mark, left: Math.round((size - markSize) / 2), top: Math.round((size - markSize) / 2) }])
    .png()
    .toFile(path.join(outDir, name));
  console.log(`✓ public/icons/${name}`);
}

// Standalone square icons — glyph tinted lime-on-blue square.
await iconPng(192, "icon-192x192.png");
await iconPng(512, "icon-512x512.png");

// Maskable variants — glyph shrunk into the safe zone so Android's
// circular masks can't clip it.
await maskablePng(192, "maskable-192x192.png");
await maskablePng(512, "maskable-512x512.png");

// Apple touch icon — iOS ignores manifest icons; must be opaque 180x180.
await maskablePng(180, "apple-touch-icon.png");

// Tiny favicon-quality check: dump a color probe so the script self-verifies
// that the glyph actually rendered (center pixel must be lime, not blue).
const probe = await sharp(path.join(outDir, "icon-512x512.png"))
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height, channels } = probe.info;
const center = probe.data.slice(
  Math.floor((width * Math.floor(height / 2) + Math.floor(width / 2)) * channels),
  Math.floor((width * Math.floor(height / 2) + Math.floor(width / 2)) * channels) + channels
);
const isGlyph = Math.abs(center[0] - LIME.r) < 40 && Math.abs(center[1] - LIME.g) < 40 && Math.abs(center[2] - LIME.b) < 40;
console.log(center, isGlyph ? "→ glyph rendered ✓" : "→ WARNING: center pixel is not lime");
if (!isGlyph) process.exitCode = 1;
