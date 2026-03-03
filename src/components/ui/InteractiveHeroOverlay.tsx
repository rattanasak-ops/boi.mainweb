"use client";

import { useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════════════
   InteractiveHeroOverlay — Canvas-based mouse-reactive effects
   ──────────────────────────────────────────────────────────────
   5 themes, one per Hero slide:
     gateway       → Golden dust particles, mouse = wind
     manufacturing → Spark bursts near cursor
     digital       → Radial pulse rings + cursor glow trail
     lifestyle     → Floating golden bokeh circles
     growth        → Horizontal light trails (expressway)
   ══════════════════════════════════════════════════════════════ */

type Theme = "gateway" | "manufacturing" | "digital" | "lifestyle" | "growth";

interface Props {
  theme: Theme;
}

/* ── Shared constants ── */
const GOLD = { r: 197, g: 165, b: 114 };
const GOLD_LIGHT = { r: 232, g: 211, b: 162 };
const MAX_PARTICLES = 70;
const BASE_OPACITY = 0.55; // Visible but not dominant

/* ── Particle type ── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: number;
}

/* ── Pulse ring (digital theme) ── */
interface PulseRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
}

function createParticle(): Particle {
  return { x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 1, size: 2, type: 0 };
}

export default function InteractiveHeroOverlay({ theme }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999, active: false });
  const prevMouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef<Particle[]>([]);
  const pulsesRef = useRef<PulseRing[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = parent.clientWidth + "px";
      canvas.style.height = parent.clientHeight + "px";
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };
    resize();

    particlesRef.current = Array.from({ length: MAX_PARTICLES }, createParticle);
    pulsesRef.current = [];

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = () => parent.clientWidth;
    const h = () => parent.clientHeight;

    const loop = (time: number) => {
      const dt = Math.min((time - lastTimeRef.current) / 16.67, 3);
      lastTimeRef.current = time;
      frameRef.current++;

      ctx.clearRect(0, 0, w(), h());
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const active = mouseRef.current.active;

      switch (theme) {
        case "gateway":
          updateGateway(ctx, w(), h(), mx, my, active, dt);
          break;
        case "manufacturing":
          updateManufacturing(ctx, w(), h(), mx, my, active, dt);
          break;
        case "digital":
          updateDigital(ctx, w(), h(), mx, my, active, dt);
          break;
        case "lifestyle":
          updateLifestyle(ctx, w(), h(), mx, my, active, dt);
          break;
        case "growth":
          updateGrowth(ctx, w(), h(), mx, my, active, dt);
          break;
      }

      prevMouseRef.current = { x: mx, y: my };
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, [theme, handleMouseMove, handleMouseLeave]);

  /* ════════════════════════════════════════════════════════════
     GATEWAY — Golden dust particles rising, mouse = wind push
     ════════════════════════════════════════════════════════════ */
  function updateGateway(
    ctx: CanvasRenderingContext2D,
    w: number, h: number,
    mx: number, my: number, active: boolean, dt: number
  ) {
    const particles = particlesRef.current;
    if (frameRef.current % 3 === 0) {
      const p = particles.find((p) => p.life <= 0);
      if (p) {
        p.x = Math.random() * w;
        p.y = h + 10;
        p.vx = (Math.random() - 0.5) * 0.3;
        p.vy = -(0.3 + Math.random() * 0.6);
        p.life = 1;
        p.maxLife = 120 + Math.random() * 180;
        p.size = 1.5 + Math.random() * 3;
        p.type = Math.random() > 0.6 ? 1 : 0;
      }
    }

    for (const p of particles) {
      if (p.life <= 0) continue;
      if (active) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220 && dist > 1) {
          const force = (1 - dist / 220) * 0.2;
          p.vx += (dx / dist) * force * dt;
          p.vy += (dy / dist) * force * dt;
        }
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.99;
      p.life -= 1 / p.maxLife;

      const alpha = Math.sin(p.life * Math.PI) * BASE_OPACITY * (p.type === 1 ? 1.4 : 0.9);
      const c = p.type === 1 ? GOLD_LIGHT : GOLD;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
      ctx.fill();
    }
  }

  /* ════════════════════════════════════════════════════════════
     MANUFACTURING — Spark bursts from cursor + ambient sparks
     ════════════════════════════════════════════════════════════ */
  function updateManufacturing(
    ctx: CanvasRenderingContext2D,
    w: number, h: number,
    mx: number, my: number, active: boolean, dt: number
  ) {
    const particles = particlesRef.current;
    if (active && frameRef.current % 2 === 0) {
      const p = particles.find((p) => p.life <= 0);
      if (p) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3;
        p.x = mx + (Math.random() - 0.5) * 20;
        p.y = my + (Math.random() - 0.5) * 20;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
        p.life = 1;
        p.maxLife = 25 + Math.random() * 35;
        p.size = 0.8 + Math.random() * 2;
        p.type = 0;
      }
    }
    if (frameRef.current % 6 === 0) {
      const p = particles.find((p) => p.life <= 0);
      if (p) {
        p.x = Math.random() * w;
        p.y = Math.random() * h;
        p.vx = (Math.random() - 0.5) * 1;
        p.vy = (Math.random() - 0.5) * 1;
        p.life = 1;
        p.maxLife = 40 + Math.random() * 50;
        p.size = 0.5 + Math.random() * 1.5;
        p.type = 1;
      }
    }

    for (const p of particles) {
      if (p.life <= 0) continue;
      p.vy += 0.025 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.98;
      p.life -= 1 / p.maxLife;

      const alpha = p.life * BASE_OPACITY * 1.3;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
      grad.addColorStop(0, `rgba(255,245,210,${alpha})`);
      grad.addColorStop(0.3, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha * 0.5})`);
      grad.addColorStop(1, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  /* ════════════════════════════════════════════════════════════
     DIGITAL — Radial pulse rings + soft cursor glow trail
     Clean, elegant, not cluttered
     ════════════════════════════════════════════════════════════ */
  function updateDigital(
    ctx: CanvasRenderingContext2D,
    w: number, h: number,
    mx: number, my: number, active: boolean, dt: number
  ) {
    const pulses = pulsesRef.current;

    // ── Spawn pulse ring every ~40 frames when mouse moves ──
    if (active && frameRef.current % 40 === 0) {
      pulses.push({
        x: mx,
        y: my,
        radius: 0,
        maxRadius: 250 + Math.random() * 150,
        life: 1,
      });
      // Keep pool small
      if (pulses.length > 8) pulses.shift();
    }

    // ── Update + draw pulse rings ──
    for (let i = pulses.length - 1; i >= 0; i--) {
      const ring = pulses[i];
      ring.radius += 2.5 * dt;
      ring.life = 1 - ring.radius / ring.maxRadius;
      if (ring.life <= 0) {
        pulses.splice(i, 1);
        continue;
      }

      const alpha = ring.life * BASE_OPACITY * 0.7;
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha})`;
      ctx.lineWidth = 1.5 * ring.life;
      ctx.stroke();

      // Inner thinner ring (double ring effect)
      if (ring.radius > 20) {
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${GOLD_LIGHT.r},${GOLD_LIGHT.g},${GOLD_LIGHT.b},${alpha * 0.4})`;
        ctx.lineWidth = 0.8 * ring.life;
        ctx.stroke();
      }
    }

    // ── Cursor glow (soft radial) ──
    if (active) {
      const glowGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
      glowGrad.addColorStop(0, `rgba(${GOLD_LIGHT.r},${GOLD_LIGHT.g},${GOLD_LIGHT.b},${BASE_OPACITY * 0.35})`);
      glowGrad.addColorStop(0.4, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${BASE_OPACITY * 0.12})`);
      glowGrad.addColorStop(1, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`);
      ctx.beginPath();
      ctx.arc(mx, my, 120, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();
    }

    // ── Small floating data dots (ambient) ──
    const particles = particlesRef.current;
    if (frameRef.current % 8 === 0) {
      const p = particles.find((p) => p.life <= 0);
      if (p) {
        p.x = Math.random() * w;
        p.y = Math.random() * h;
        p.vx = (Math.random() - 0.5) * 0.2;
        p.vy = -(0.15 + Math.random() * 0.25);
        p.life = 1;
        p.maxLife = 100 + Math.random() * 120;
        p.size = 1.5 + Math.random() * 2;
        p.type = 0;
      }
    }

    for (const p of particles) {
      if (p.life <= 0) continue;
      if (active) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 1) {
          // Repel gently near cursor
          const force = (1 - dist / 180) * 0.1;
          p.vx += (dx / dist) * force * dt;
          p.vy += (dy / dist) * force * dt;
        }
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.99;
      p.life -= 1 / p.maxLife;

      const alpha = Math.sin(p.life * Math.PI) * BASE_OPACITY * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${GOLD_LIGHT.r},${GOLD_LIGHT.g},${GOLD_LIGHT.b},${alpha})`;
      ctx.fill();
    }
  }

  /* ════════════════════════════════════════════════════════════
     LIFESTYLE — Floating golden bokeh circles, mouse = orbit
     ════════════════════════════════════════════════════════════ */
  function updateLifestyle(
    ctx: CanvasRenderingContext2D,
    w: number, h: number,
    mx: number, my: number, active: boolean, dt: number
  ) {
    const particles = particlesRef.current;
    if (frameRef.current % 5 === 0) {
      const p = particles.find((p) => p.life <= 0);
      if (p) {
        p.x = Math.random() * w;
        p.y = Math.random() * h;
        p.vx = (Math.random() - 0.5) * 0.15;
        p.vy = -(0.1 + Math.random() * 0.2);
        p.life = 1;
        p.maxLife = 180 + Math.random() * 180;
        p.size = 10 + Math.random() * 25;
        p.type = Math.floor(Math.random() * 3);
      }
    }

    for (const p of particles) {
      if (p.life <= 0) continue;
      if (active) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250 && dist > 1) {
          const force = (1 - dist / 250) * 0.04;
          p.vx += (dx / dist * force - dy / dist * force * 0.3) * dt;
          p.vy += (dy / dist * force + dx / dist * force * 0.3) * dt;
        }
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.995;
      p.vy *= 0.995;
      p.life -= 1 / p.maxLife;
      if (p.y < -p.size) p.y = h + p.size;
      if (p.x < -p.size) p.x = w + p.size;
      if (p.x > w + p.size) p.x = -p.size;

      const alpha = Math.sin(p.life * Math.PI) * BASE_OPACITY * 0.6;
      const c = p.type === 0 ? GOLD : p.type === 1 ? GOLD_LIGHT : { r: 255, g: 240, b: 200 };
      // Outer ring
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${alpha * 0.8})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // Inner glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${alpha * 0.35})`);
      grad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  /* ════════════════════════════════════════════════════════════
     GROWTH — Horizontal light trails (expressway headlights)
     ════════════════════════════════════════════════════════════ */
  function updateGrowth(
    ctx: CanvasRenderingContext2D,
    w: number, h: number,
    mx: number, my: number, active: boolean, dt: number
  ) {
    const particles = particlesRef.current;
    if (frameRef.current % 3 === 0) {
      const p = particles.find((p) => p.life <= 0);
      if (p) {
        const goRight = Math.random() > 0.4;
        p.x = goRight ? -50 : w + 50;
        p.y = h * 0.3 + Math.random() * h * 0.5;
        p.vx = goRight ? (1.5 + Math.random() * 3) : -(1.5 + Math.random() * 3);
        p.vy = (Math.random() - 0.5) * 0.3;
        p.life = 1;
        p.maxLife = 70 + Math.random() * 60;
        p.size = 40 + Math.random() * 80;
        p.type = goRight ? 0 : 1;
      }
    }

    for (const p of particles) {
      if (p.life <= 0) continue;
      if (active) {
        const dy = my - p.y;
        const dist = Math.abs(dy);
        if (dist < 200) {
          p.vy += (dy > 0 ? 0.025 : -0.025) * (1 - dist / 200) * dt;
        }
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy *= 0.98;
      p.life -= 1 / p.maxLife;

      const alpha = Math.sin(p.life * Math.PI) * BASE_OPACITY * 0.7;
      const tailX = p.x - p.vx * p.size * 0.3;
      const gradient = ctx.createLinearGradient(tailX, p.y, p.x, p.y);
      gradient.addColorStop(0, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`);
      gradient.addColorStop(0.6, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha * 0.5})`);
      gradient.addColorStop(1, `rgba(255,240,220,${alpha})`);
      ctx.beginPath();
      ctx.moveTo(tailX, p.y - 0.8);
      ctx.lineTo(p.x, p.y - 0.8);
      ctx.lineTo(p.x, p.y + 0.8);
      ctx.lineTo(tailX, p.y + 0.8);
      ctx.fillStyle = gradient;
      ctx.fill();
      // Bright head glow
      const headGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 4);
      headGrad.addColorStop(0, `rgba(255,250,230,${alpha * 1.5})`);
      headGrad.addColorStop(1, `rgba(255,250,230,0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = headGrad;
      ctx.fill();
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] pointer-events-none"
      aria-hidden="true"
    />
  );
}
