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
 * Chat mode (for sharing screenshots with AI):
 *   npm run resize <input-path> -- --for-chat
 *   npm run resize ~/Desktop/screenshot.png -- --for-chat
 *   → Auto outputs to /tmp/chat-ready.jpg (< 3.5MB, base64 < 5MB)
 *
 * Options:
 *   --for-chat       Resize for chat sharing (auto quality + max 3.5MB output)
 *   --max-width=N    Max width in px (default: auto by output folder)
 *   --quality=N      JPEG quality 1-100 (default: 85)
 *   --grade          Apply EEC color grading (off by default)
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

const getFlag = (name) => {
  const f = flags.find((a) => a.startsWith(`--${name}=`));
  return f ? f.split("=")[1] : null;
};

const FOR_CHAT = flags.includes("--for-chat");
const APPLY_GRADE = flags.includes("--grade");
const CUSTOM_MAX_W = getFlag("max-width") ? parseInt(getFlag("max-width")) : null;
const QUALITY = getFlag("quality") ? parseInt(getFlag("quality")) : (FOR_CHAT ? 70 : 85);
const CHAT_MAX_BYTES = 3_500_000; // 3.5MB → base64 ~4.8MB (under 5MB limit)

const inputPath = positional[0] ? resolve(positional[0]) : null;
const outputPath = FOR_CHAT
  ? resolve("/tmp/chat-ready.jpg")
  : positional[1]
    ? resolve(positional[1])
    : inputPath;

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

  Chat mode (resize screenshot for AI chat):
    npm run resize ~/Desktop/screenshot.png -- --for-chat
    → Output: /tmp/chat-ready.jpg (< 3.5MB, base64 < 5MB)
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
    `  Color Grade: ${APPLY_GRADE ? "ON (EEC cinematic)" : "OFF (use --grade to enable)"}`
  );
  if (FOR_CHAT) {
    console.log(`  Mode: CHAT (auto-fit under ${fmt(CHAT_MAX_BYTES)} for AI sharing)`);
  }

  // Determine max width
  let maxW = CUSTOM_MAX_W || (FOR_CHAT ? 1920 : getMaxWidth(outputPath));
  const needsResize = meta.width && meta.width > maxW;

  console.log(
    `  Resize: ${needsResize ? `${meta.width}px → ${maxW}px` : `${meta.width}px (already within ${maxW}px)`}`
  );

  // For chat mode: auto-reduce until under limit
  if (FOR_CHAT) {
    let quality = QUALITY;
    let width = Math.min(meta.width || 1920, maxW);
    let outputBuffer;
    let attempts = 0;

    while (attempts < 8) {
      attempts++;
      let pipeline = sharp(inputPath).rotate();
      pipeline = pipeline.resize({ width, withoutEnlargement: true });

      if (APPLY_GRADE) {
        pipeline = applyColorGrade(pipeline);
      }

      pipeline = pipeline.jpeg({ quality, mozjpeg: true });
      outputBuffer = await pipeline.toBuffer();

      console.log(
        `  Attempt ${attempts}: ${width}px, q${quality} → ${fmt(outputBuffer.length)} (base64 ~${fmt(Math.ceil(outputBuffer.length * 1.37))})`
      );

      if (outputBuffer.length <= CHAT_MAX_BYTES) break;

      // Reduce: first drop quality, then drop width
      if (quality > 50) {
        quality -= 10;
      } else {
        width = Math.floor(width * 0.75);
        quality = 70; // reset quality for smaller size
      }
    }

    await sharp(outputBuffer).toFile(outputPath);

    const afterSize = outputBuffer.length;
    const saved = beforeSize - afterSize;
    const pct = ((saved / beforeSize) * 100).toFixed(0);
    const newMeta = await sharp(outputPath).metadata();

    console.log(`\n  Result: ${newMeta.width}x${newMeta.height} — ${fmt(afterSize)}`);
    console.log(
      `  Base64: ~${fmt(Math.ceil(afterSize * 1.37))} ${afterSize * 1.37 > 5_000_000 ? "⚠️  STILL EXCEEDS 5MB!" : "✅ OK, under 5MB"}`
    );
    console.log(`  Saved: ${fmt(saved)} (-${pct}%)`);
    console.log(`\n  Output: ${outputPath}`);
    console.log(`  → Paste this file into the chat!\n`);
  } else {
    // Normal mode (existing behavior)
    let pipeline = sharp(inputPath).rotate();

    if (needsResize) {
      pipeline = pipeline.resize({ width: maxW, withoutEnlargement: true });
    }

    if (APPLY_GRADE) {
      pipeline = applyColorGrade(pipeline);
    }

    const outExt = extname(outputPath).toLowerCase();
    if (outExt === ".png") {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    }

    const outputBuffer = await pipeline.toBuffer();
    const afterSize = outputBuffer.length;

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
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
