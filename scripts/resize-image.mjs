/**
 * BOI Single Image Resize Utility
 *
 * Resize a single image (from Freepik or other source) before placing into project.
 * Ensures images stay under 5MB base64 API limit and are web-optimized.
 *
 * Usage:
 *   npm run resize <input-path> [output-path]
 *   npm run resize freepik-download.jpg public/images/hero/new-image.jpg
 *   npm run resize freepik-download.jpg                  # overwrites original
 *
 * Options:
 *   --max-width=N    Max width in px (default: auto by output folder)
 *   --quality=N      JPEG quality 1-100 (default: 85)
 *   --no-grade       Skip EEC color grading
 *
 * Auto-sizing rules (same as optimize-images.mjs):
 *   hero/, stats/, cta/ folders → max 1920px width
 *   others                      → max 1200px width
 *
 * Target: output file < 500KB (safe for base64 < 700KB)
 */

import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve, extname, dirname, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const IMAGES_ROOT = resolve(PROJECT_ROOT, "public", "images");

/* ── Parse CLI args ── */
const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("--"));
const positional = args.filter((a) => !a.startsWith("--"));

const inputPath = positional[0] ? resolve(positional[0]) : null;
const outputPath = positional[1] ? resolve(positional[1]) : inputPath;

const getFlag = (name) => {
  const f = flags.find((a) => a.startsWith(`--${name}=`));
  return f ? f.split("=")[1] : null;
};

const SKIP_GRADE = flags.includes("--no-grade");
const CUSTOM_MAX_W = getFlag("max-width") ? parseInt(getFlag("max-width")) : null;
const QUALITY = getFlag("quality") ? parseInt(getFlag("quality")) : 85;

/* ── Sizing rules ── */
function getMaxWidth(filePath) {
  const rel = relative(IMAGES_ROOT, filePath);
  if (
    rel.startsWith("hero/") ||
    rel.startsWith("stats/") ||
    rel.startsWith("cta/")
  )
    return 1920;
  return 1200;
}

/* ── EEC-Style Color Grading (same as optimize-images.mjs) ── */
function applyColorGrade(pipeline) {
  return pipeline
    .modulate({ brightness: 1.03, saturation: 1.2 })
    .linear(1.15, -15)
    .gamma(2.2, 2.0)
    .sharpen({ sigma: 1.0, m1: 1.5, m2: 0.7, x1: 2.0, y2: 10, y3: 20 });
}

/* ── Format bytes ── */
function fmt(bytes) {
  if (bytes >= 1_048_576) return (bytes / 1_048_576).toFixed(1) + " MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(0) + " KB";
  return bytes + " B";
}

/* ── Main ── */
async function main() {
  if (!inputPath) {
    console.log(`
  Usage: npm run resize <input> [output]

  Examples:
    npm run resize ~/Downloads/freepik-image.jpg public/images/hero/new.jpg
    npm run resize public/images/hero/big-image.jpg
    npm run resize photo.jpg public/images/news/article.jpg --quality=80
    `);
    process.exit(1);
  }

  if (!existsSync(inputPath)) {
    console.error(`  Error: File not found: ${inputPath}`);
    process.exit(1);
  }

  const ext = extname(inputPath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp", ".tiff", ".avif"].includes(ext)) {
    console.error(`  Error: Unsupported format: ${ext}`);
    process.exit(1);
  }

  // Ensure output directory exists
  const outDir = dirname(outputPath);
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  const beforeStat = await stat(inputPath);
  const beforeSize = beforeStat.size;
  const meta = await sharp(inputPath).metadata();

  console.log(`\n  BOI Image Resize Utility`);
  console.log(`  Input:  ${inputPath}`);
  console.log(`  Output: ${outputPath}`);
  console.log(`  Original: ${meta.width}x${meta.height} — ${fmt(beforeSize)}`);
  console.log(
    `  Base64 estimate: ~${fmt(Math.ceil(beforeSize * 1.37))} ${beforeSize * 1.37 > 5_000_000 ? "(EXCEEDS 5MB LIMIT)" : "(OK)"}`
  );
  console.log(
    `  Color Grade: ${SKIP_GRADE ? "OFF" : "ON (EEC cinematic)"}`
  );

  // Determine max width
  const maxW = CUSTOM_MAX_W || getMaxWidth(outputPath);
  const needsResize = meta.width && meta.width > maxW;

  console.log(
    `  Resize: ${needsResize ? `${meta.width}px → ${maxW}px` : `${meta.width}px (already within ${maxW}px)`}`
  );

  // Build pipeline
  let pipeline = sharp(inputPath).rotate(); // auto-rotate EXIF

  if (needsResize) {
    pipeline = pipeline.resize({ width: maxW, withoutEnlargement: true });
  }

  // Apply color grading
  if (!SKIP_GRADE) {
    pipeline = applyColorGrade(pipeline);
  }

  // Output format
  const outExt = extname(outputPath).toLowerCase();
  if (outExt === ".png") {
    pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  }

  // Process
  const outputBuffer = await pipeline.toBuffer();
  const afterSize = outputBuffer.length;

  // Write
  await sharp(outputBuffer).toFile(outputPath);

  const saved = beforeSize - afterSize;
  const pct = ((saved / beforeSize) * 100).toFixed(0);
  const newMeta = await sharp(outputPath).metadata();

  console.log(`\n  Result: ${newMeta.width}x${newMeta.height} — ${fmt(afterSize)}`);
  console.log(
    `  Base64 estimate: ~${fmt(Math.ceil(afterSize * 1.37))} ${afterSize * 1.37 > 5_000_000 ? "(STILL EXCEEDS 5MB!)" : "(OK, under 5MB)"}`
  );
  console.log(
    `  Saved: ${fmt(saved)} (${saved > 0 ? "-" + pct + "%" : "increased"})`
  );
  console.log(`\n  Done!\n`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
