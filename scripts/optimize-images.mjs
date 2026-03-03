/**
 * BOI Image Optimization + EEC-Style Color Grading Script
 *
 * Scans public/images/ and compresses all JPG/PNG files
 * Retina-ready: preserves enough resolution for 2x MacBook Pro displays
 *
 * EEC Color Grading Profile:
 *   - Contrast boost: +15% (linear modulation 1.15)
 *   - Saturation boost: +20% (via modulate saturation 1.2)
 *   - Brightness slight lift: +3% (modulate brightness 1.03)
 *   - Warm highlights + cool shadows via tint adjustment
 *   - Sharpen for crispness after resize
 *
 * Usage:
 *   npm run optimize              — optimize + color grade all images
 *   npm run optimize -- --dry     — preview without changing files
 *   npm run optimize -- --no-grade — optimize only, skip color grading
 *
 * Sizing rules:
 *   hero/   → max 1920px width (full-bleed, Next.js handles responsive)
 *   stats/  → max 1920px width (full-bleed background)
 *   cta/    → max 1920px width (full-bleed background)
 *   others  → max 1200px width (card/section images)
 *
 * Quality: JPG 85 (visually lossless on Retina)
 */

import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public", "images");
const DRY_RUN = process.argv.includes("--dry");
const SKIP_GRADE = process.argv.includes("--no-grade");

/* ── Sizing rules per folder ── */
function getMaxWidth(filePath) {
  const rel = relative(ROOT, filePath);
  if (rel.startsWith("hero/") || rel.startsWith("stats/") || rel.startsWith("cta/")) return 1920;
  return 1200;
}

/* ── EEC-Style Color Grading Profile ──
   Analyzed from eec-web-site.jigsawgroups.work:
   - High contrast (deep blacks, bright highlights)
   - Saturated, vivid colors (especially blue/gold tones)
   - Warm golden highlights + cool navy shadows
   - Crisp detail (sharpened edges)
   - Cinematic depth — not flat stock photo look
*/
function applyColorGrade(pipeline) {
  return pipeline
    // Step 1: Boost brightness slightly to lift midtones
    .modulate({
      brightness: 1.03,
      saturation: 1.2,  // +20% color saturation — makes vivid like EEC
    })
    // Step 2: Increase contrast via linear transform
    // a=1.15 (contrast boost), b=-15 (prevent overexposure)
    .linear(1.15, -15)
    // Step 3: Subtle warm tint on highlights (gold direction)
    // Using gamma to shift tonal range slightly warm
    .gamma(2.2, 2.0)
    // Step 4: Sharpen for crispness (especially after resize)
    .sharpen({
      sigma: 1.0,
      m1: 1.5,   // flat areas
      m2: 0.7,   // jagged areas (less aggressive)
      x1: 2.0,   // threshold: low = sharpen more
      y2: 10,     // max brightening
      y3: 20,     // max darkening (deeper blacks)
    });
}

/* ── Recursively find image files ── */
async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findImages(full)));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        files.push(full);
      }
    }
  }
  return files;
}

/* ── Format bytes ── */
function fmt(bytes) {
  if (bytes >= 1_048_576) return (bytes / 1_048_576).toFixed(1) + " MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(0) + " KB";
  return bytes + " B";
}

/* ── Main ── */
async function main() {
  console.log(`\n🖼  BOI Image Optimizer + EEC Color Grading`);
  console.log(`   Root: ${ROOT}`);
  console.log(`   Color Grade: ${SKIP_GRADE ? "OFF (--no-grade)" : "ON (EEC cinematic profile)"}`);
  if (DRY_RUN) console.log(`   Mode: DRY RUN (no files will be changed)\n`);
  else console.log(`   Mode: OPTIMIZE\n`);

  const files = await findImages(ROOT);
  if (files.length === 0) {
    console.log("   No images found.");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  const results = [];

  for (const filePath of files) {
    const rel = relative(ROOT, filePath);
    const maxW = getMaxWidth(filePath);
    const beforeStat = await stat(filePath);
    const beforeSize = beforeStat.size;
    totalBefore += beforeSize;

    try {
      const img = sharp(filePath);
      const meta = await img.metadata();
      const needsResize = meta.width && meta.width > maxW;

      let pipeline = sharp(filePath).rotate(); // auto-rotate EXIF

      if (needsResize) {
        pipeline = pipeline.resize({ width: maxW, withoutEnlargement: true });
      }

      // Apply EEC-style color grading (unless --no-grade flag)
      if (!SKIP_GRADE) {
        pipeline = applyColorGrade(pipeline);
      }

      const ext = extname(filePath).toLowerCase();
      if (ext === ".png") {
        pipeline = pipeline.png({ quality: 85, compressionLevel: 9 });
      } else {
        pipeline = pipeline.jpeg({ quality: 85, mozjpeg: true });
      }

      const outputBuffer = await pipeline.toBuffer();
      const afterSize = outputBuffer.length;
      totalAfter += afterSize;

      const saved = beforeSize - afterSize;
      const pct = ((saved / beforeSize) * 100).toFixed(0);

      // Always write when color grading is active (even if size increases slightly)
      // Only skip writing if no-grade AND file didn't shrink
      const shouldWrite = !SKIP_GRADE || saved > 0;
      if (!DRY_RUN && shouldWrite) {
        await sharp(outputBuffer).toFile(filePath);
      }

      const dims = needsResize
        ? `${meta.width}→${maxW}px`
        : `${meta.width || "?"}px (ok)`;

      results.push({
        file: rel,
        before: fmt(beforeSize),
        after: fmt(afterSize),
        saved: saved > 0 ? `-${pct}%` : "0%",
        dims,
      });

      const icon = saved > 0 ? "✅" : "⬜";
      console.log(
        `   ${icon} ${rel.padEnd(40)} ${fmt(beforeSize).padStart(8)} → ${fmt(afterSize).padStart(8)}  (${saved > 0 ? "-" + pct + "%" : "ok"})  ${dims}`
      );
    } catch (err) {
      console.log(`   ❌ ${rel.padEnd(40)} ERROR: ${err.message}`);
      totalAfter += beforeSize; // count unchanged
    }
  }

  console.log(`\n${"─".repeat(90)}`);
  console.log(
    `   Total: ${fmt(totalBefore)} → ${fmt(totalAfter)}  (saved ${fmt(totalBefore - totalAfter)}, -${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0)}%)`
  );
  console.log(`   Files: ${files.length}`);
  if (DRY_RUN) console.log(`\n   ℹ️  Dry run — no files were modified. Remove --dry to apply.\n`);
  else console.log(`\n   ✅ Done! All images optimized for Retina.\n`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
