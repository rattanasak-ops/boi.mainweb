"use client";

import { useEffect, useRef } from "react";

/**
 * AnimatedFavicon — BOI Shield with Gold Shimmer
 *
 * Draws the BOI shield on a canvas and animates a gold light sweep
 * across it every 3 seconds, creating a premium "Gate Opener" feel.
 *
 * Falls back to static icon.svg if canvas is not supported.
 */

const SIZE = 64; // canvas resolution (retina-friendly)
const NAVY = "#1B2A4A";
const GOLD = "#C5A572";
const GOLD_LIGHT = "#E8D5A8";

function drawShield(ctx: CanvasRenderingContext2D) {
  const cx = SIZE / 2;

  // Background circle
  ctx.beginPath();
  ctx.arc(cx, cx, cx, 0, Math.PI * 2);
  ctx.fillStyle = NAVY;
  ctx.fill();

  // Shield outline
  ctx.beginPath();
  ctx.moveTo(cx, 8);
  ctx.lineTo(52, 16);
  ctx.lineTo(52, 34);
  ctx.quadraticCurveTo(52, 50, cx, 58);
  ctx.quadraticCurveTo(12, 50, 12, 34);
  ctx.lineTo(12, 16);
  ctx.closePath();
  ctx.fillStyle = NAVY;
  ctx.fill();
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Inner border
  ctx.beginPath();
  ctx.moveTo(cx, 12);
  ctx.lineTo(48, 18);
  ctx.lineTo(48, 34);
  ctx.quadraticCurveTo(48, 47, cx, 54);
  ctx.quadraticCurveTo(16, 47, 16, 34);
  ctx.lineTo(16, 18);
  ctx.closePath();
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 0.6;
  ctx.globalAlpha = 0.4;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Garuda star
  const starCx = cx;
  const starCy = 30;
  const outerR = 11;
  const innerR = 5;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI / 2) * -1 + (Math.PI / 5) * i;
    const x = starCx + r * Math.cos(angle);
    const y = starCy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = GOLD;
  ctx.fill();

  // Wing left
  ctx.beginPath();
  ctx.moveTo(14, 28);
  ctx.quadraticCurveTo(22, 20, 26, 23);
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Wing right
  ctx.beginPath();
  ctx.moveTo(50, 28);
  ctx.quadraticCurveTo(42, 20, 38, 23);
  ctx.stroke();

  // Base lines
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(20, 45);
  ctx.lineTo(44, 45);
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.moveTo(24, 48);
  ctx.lineTo(40, 48);
  ctx.lineWidth = 0.6;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawShimmer(
  ctx: CanvasRenderingContext2D,
  shimmerX: number,
  opacity: number,
) {
  // Create a vertical gradient band that sweeps left → right
  const grad = ctx.createLinearGradient(
    shimmerX - 12,
    0,
    shimmerX + 12,
    0,
  );
  grad.addColorStop(0, `rgba(232, 213, 168, 0)`);
  grad.addColorStop(0.5, `rgba(232, 213, 168, ${opacity})`);
  grad.addColorStop(1, `rgba(232, 213, 168, 0)`);

  // Only draw shimmer inside the shield area (clip)
  ctx.save();
  ctx.beginPath();
  const cx = SIZE / 2;
  ctx.moveTo(cx, 8);
  ctx.lineTo(52, 16);
  ctx.lineTo(52, 34);
  ctx.quadraticCurveTo(52, 50, cx, 58);
  ctx.quadraticCurveTo(12, 50, 12, 34);
  ctx.lineTo(12, 16);
  ctx.closePath();
  ctx.clip();

  ctx.fillStyle = grad;
  ctx.fillRect(shimmerX - 12, 0, 24, SIZE);
  ctx.restore();
}

export default function AnimatedFavicon() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const linkRef = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Find or create favicon link
    let link = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"][type="image/svg+xml"]',
    );
    if (!link) {
      link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    }
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    linkRef.current = link;

    const CYCLE = 3000;
    const SWEEP_DURATION = 600;
    const THROTTLE_MS = 100;
    let animId: number;
    let startTime: number | null = null;
    let lastFrameTime = 0;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;

      if (timestamp - lastFrameTime >= THROTTLE_MS) {
        lastFrameTime = timestamp;
        const elapsed = (timestamp - startTime) % CYCLE;

        ctx!.clearRect(0, 0, SIZE, SIZE);
        drawShield(ctx!);

        if (elapsed < SWEEP_DURATION) {
          const progress = elapsed / SWEEP_DURATION;
          const shimmerX = -12 + progress * (SIZE + 24);
          const opacity = 0.35 * Math.sin(progress * Math.PI);
          drawShimmer(ctx!, shimmerX, opacity);
        }

        if (linkRef.current) {
          linkRef.current.type = "image/png";
          linkRef.current.href = canvas.toDataURL("image/png");
        }
      }

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return null; // renders nothing visible — only updates <link> in <head>
}
