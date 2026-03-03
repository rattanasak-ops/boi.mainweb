"use client";

import { useRef, useEffect, useCallback } from "react";

// ===================================================================
// FooterCanvas — "The Open Gateway" Interactive Golden Network
// ===================================================================
// Big Idea: "Gate Keeper → Gate Opener — Thailand Opens for You"
//
// Visual Metaphor:
//   - Golden particles = โอกาสการลงทุน (investment opportunities)
//   - Connection lines = เครือข่ายที่ BOI เชื่อมให้ (BOI network)
//   - Mouse = "คุณ" (นักลงทุน) — เมื่อเข้ามา เครือข่ายจะเปิดต้อนรับ
//   - Bloom effect = "ประตูเปิด" ทุกที่ที่คุณไป
//
// Act As: P3 (UI Designer) + P4 (Motion Designer) + P5 (Architect)
// ===================================================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  opacity: number;
  baseOpacity: number;
}

// Design tokens — Gold #C5A572
const GOLD = { r: 197, g: 165, b: 114 };

// Interaction parameters
const CONNECTION_DIST = 150;
const MOUSE_BLOOM_RADIUS = 200;
const MOUSE_GLOW_RADIUS = 150;

// Performance: particles count
const PARTICLE_COUNT_DESKTOP = 60;
const PARTICLE_COUNT_MOBILE = 28;

export default function FooterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);
  const dimsRef = useRef({ w: 0, h: 0 });

  // --------------------------------------------------
  // P4 (Motion Designer): สร้าง particles ด้วย randomness ที่ควบคุมได้
  // --------------------------------------------------
  const createParticles = useCallback((w: number, h: number) => {
    const count = w < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const baseRadius = Math.random() * 1.5 + 0.5;
      const baseOpacity = Math.random() * 0.25 + 0.1;

      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        radius: baseRadius,
        baseRadius,
        opacity: baseOpacity,
        baseOpacity,
      });
    }

    particlesRef.current = particles;
  }, []);

  // --------------------------------------------------
  // P5 (Architect): Main effect — resize, mouse, observer, animation loop
  // --------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // WCAG: respect reduced motion
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- Resize ---
    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dimsRef.current = { w, h };
      createParticles(w, h);
    };

    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 250);
    };
    window.addEventListener("resize", onResize);

    // --- Mouse tracking on parent (footer) ---
    // Canvas is pointer-events:none → links still work
    const onMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseleave", onMouseLeave);

    // --- IntersectionObserver: animate only when visible ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // --------------------------------------------------
    // P4 (Motion Designer): Animation loop — 60fps, GPU-friendly
    // --------------------------------------------------
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      if (!visibleRef.current) return;

      const { w, h } = dimsRef.current;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // --- Update particle positions + bloom ---
      for (const p of particles) {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

        // Mouse bloom — "ประตูเปิดเมื่อคุณเข้ามา"
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_BLOOM_RADIUS) {
            const t = 1 - dist / MOUSE_BLOOM_RADIUS;
            // Ease: cubic for smoother bloom
            const ease = t * t * (3 - 2 * t);
            const targetR = p.baseRadius * (1 + ease * 2);
            const targetO = Math.min(p.baseOpacity + ease * 0.55, 0.9);
            p.radius += (targetR - p.radius) * 0.08;
            p.opacity += (targetO - p.opacity) * 0.08;
          } else {
            p.radius += (p.baseRadius - p.radius) * 0.04;
            p.opacity += (p.baseOpacity - p.opacity) * 0.04;
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.04;
          p.opacity += (p.baseOpacity - p.opacity) * 0.04;
        }
      }

      // --- Mouse glow — "แสงสว่างที่ BOI ส่องให้" ---
      if (mouse.active) {
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          MOUSE_GLOW_RADIUS
        );
        glow.addColorStop(
          0,
          `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.07)`
        );
        glow.addColorStop(
          0.5,
          `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.03)`
        );
        glow.addColorStop(
          1,
          `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`
        );
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_GLOW_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      // --- Connection lines — "เครือข่ายที่ BOI เชื่อมให้" ---
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DIST * CONNECTION_DIST) {
            const dist = Math.sqrt(distSq);
            let alpha = (1 - dist / CONNECTION_DIST) * 0.1;

            // Brighten connections near mouse
            if (mouse.active) {
              const mx = (particles[i].x + particles[j].x) / 2;
              const my = (particles[i].y + particles[j].y) / 2;
              const md = Math.sqrt(
                (mx - mouse.x) ** 2 + (my - mouse.y) ** 2
              );
              if (md < MOUSE_BLOOM_RADIUS) {
                const influence = 1 - md / MOUSE_BLOOM_RADIUS;
                alpha += influence * influence * 0.2;
              }
            }

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha})`;
            ctx.stroke();
          }
        }
      }

      // --- Mouse → particle connections — "BOI เชื่อมคุณกับโอกาส" ---
      if (mouse.active) {
        ctx.lineWidth = 0.6;
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_BLOOM_RADIUS * 0.7) {
            const t = 1 - dist / (MOUSE_BLOOM_RADIUS * 0.7);
            const alpha = t * t * 0.25;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha})`;
            ctx.stroke();
          }
        }
      }

      // --- Draw particles — "จุดแต่ละจุดคือโอกาส" ---
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${p.opacity})`;
        ctx.fill();
      }
    };

    // --------------------------------------------------
    // Reduced motion: static render only (WCAG)
    // --------------------------------------------------
    if (reducedMotion) {
      const ps = particlesRef.current;

      // Static particles
      for (const p of ps) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${p.baseOpacity})`;
        ctx.fill();
      }

      // Static connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DIST * CONNECTION_DIST) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / CONNECTION_DIST) * 0.08;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha})`;
            ctx.stroke();
          }
        }
      }
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    // --- Cleanup (P5: ป้องกัน memory leak) ---
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      parent.removeEventListener("mousemove", onMouseMove);
      parent.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
