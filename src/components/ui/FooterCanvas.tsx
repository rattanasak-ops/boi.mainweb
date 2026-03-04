"use client";

import { useRef, useEffect } from "react";

// ===================================================================
// FooterCanvas — "Thailand: The Investment Hub"
// ===================================================================
// ประเทศไทย = จุดศูนย์กลาง  |  จุดรอบข้าง = นักลงทุนทั่วโลก
// แสง/พลังงานไหลเข้าหาไทยตลอดเวลา = เงินทุนไหลเข้า
//
// Idle: จางๆ พอมองเห็น flow
// Mouse in: ทุกอย่างสว่างขึ้น + center ตามเมาส์ + flow เร็วขึ้น
// Click center: Pulse wave + flash ทุกเส้น
//
// Technique: Pre-rendered glow textures + multi-pass lines (NO shadowBlur)
// ===================================================================

// --- Colors ---
const GOLD = [197, 165, 114] as const;
const GOLD_WARM = [235, 215, 175] as const;
const GOLD_HOT = [255, 230, 180] as const;

const rgba = (c: readonly number[], a: number) =>
  `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a))})`;

// --- Node positions (% of canvas) — 10 per side ---
const LEFT_POS: [number, number][] = [
  [0.04, 0.10], [0.15, 0.07],
  [0.06, 0.27], [0.19, 0.25],
  [0.03, 0.43], [0.17, 0.41],
  [0.07, 0.60], [0.21, 0.58],
  [0.04, 0.77], [0.16, 0.82],
];
const RIGHT_POS: [number, number][] = [
  [0.96, 0.10], [0.85, 0.07],
  [0.94, 0.27], [0.81, 0.25],
  [0.97, 0.43], [0.83, 0.41],
  [0.93, 0.60], [0.79, 0.58],
  [0.96, 0.77], [0.84, 0.82],
];
const NODE_SIZES = [5, 7, 6, 8, 5, 7, 6, 9, 5, 7];

// --- Types ---
interface OuterNode {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
  brightness: number;
  flashTimer: number;
}
interface Pulse {
  nodeIdx: number;
  t: number;
  speed: number;
  size: number;
}
interface Wave {
  radius: number;
  max: number;
  opacity: number;
}

// --- Bezier point ---
const bezPt = (
  t: number,
  ax: number, ay: number,
  cx: number, cy: number,
  bx: number, by: number
) => {
  const u = 1 - t;
  return {
    x: u * u * ax + 2 * u * t * cx + t * t * bx,
    y: u * u * ay + 2 * u * t * cy + t * t * by,
  };
};

export default function FooterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, in: false });
  const state = useRef({
    bright: 0.25,
    flow: 0.8,
    cX: 0, cY: 0,
    cBaseX: 0, cBaseY: 0,
    cVx: 0, cVy: 0,
    cBright: 0.3,
  });
  const nodes = useRef<OuterNode[]>([]);
  const cps = useRef<{ cx: number; cy: number }[]>([]);
  const pulses = useRef<Pulse[]>([]);
  const wave = useRef<Wave | null>(null);
  const raf = useRef(0);
  const vis = useRef(false);
  const dim = useRef({ w: 0, h: 0 });
  const glowCache = useRef<Map<string, HTMLCanvasElement>>(new Map());

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const par = cvs.parentElement;
    if (!par) return;
    const c = cvs.getContext("2d", { alpha: true });
    if (!c) return;

    const noMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- Glow texture factory ---
    const glow = (r: number, col: readonly number[], key: string) => {
      if (glowCache.current.has(key)) return glowCache.current.get(key)!;
      const sz = Math.ceil(r * 4);
      const oc = document.createElement("canvas");
      oc.width = sz;
      oc.height = sz;
      const g = oc.getContext("2d")!;
      const gr = g.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, sz / 2);
      gr.addColorStop(0, rgba(col, 1));
      gr.addColorStop(0.12, rgba(col, 0.7));
      gr.addColorStop(0.35, rgba(col, 0.25));
      gr.addColorStop(0.65, rgba(col, 0.06));
      gr.addColorStop(1, rgba(col, 0));
      g.fillStyle = gr;
      g.fillRect(0, 0, sz, sz);
      glowCache.current.set(key, oc);
      return oc;
    };

    // --- Resize ---
    const fit = () => {
      const r = par.getBoundingClientRect();
      const d = Math.min(devicePixelRatio || 1, 2);
      cvs.width = r.width * d;
      cvs.height = r.height * d;
      cvs.style.width = r.width + "px";
      cvs.style.height = r.height + "px";
      c.setTransform(d, 0, 0, d, 0, 0);

      const w = r.width, h = r.height;
      dim.current = { w, h };
      glowCache.current.clear();

      // Center
      const s = state.current;
      s.cBaseX = w * 0.5;
      s.cBaseY = h * 0.45;
      s.cX = s.cBaseX;
      s.cY = s.cBaseY;

      // Nodes
      const mob = w < 768;
      const lc = mob ? 5 : 10;
      const rc = mob ? 5 : 10;
      const ns: OuterNode[] = [];

      for (let i = 0; i < lc; i++) {
        const idx = mob ? i * 2 : i;
        ns.push({
          baseX: LEFT_POS[idx][0] * w,
          baseY: LEFT_POS[idx][1] * h,
          x: LEFT_POS[idx][0] * w,
          y: LEFT_POS[idx][1] * h,
          radius: NODE_SIZES[idx] || 6,
          brightness: 0.25,
          flashTimer: 0,
        });
      }
      for (let i = 0; i < rc; i++) {
        const idx = mob ? i * 2 : i;
        ns.push({
          baseX: RIGHT_POS[idx][0] * w,
          baseY: RIGHT_POS[idx][1] * h,
          x: RIGHT_POS[idx][0] * w,
          y: RIGHT_POS[idx][1] * h,
          radius: NODE_SIZES[idx] || 6,
          brightness: 0.25,
          flashTimer: 0,
        });
      }
      nodes.current = ns;

      // Bezier control points
      const cp: { cx: number; cy: number }[] = [];
      for (let i = 0; i < ns.length; i++) {
        const n = ns[i];
        const dx = s.cBaseX - n.baseX;
        const dy = s.cBaseY - n.baseY;
        const mx = (n.baseX + s.cBaseX) / 2;
        const my = (n.baseY + s.cBaseY) / 2;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const perpX = (-dy / len) * len * 0.18;
        const perpY = (dx / len) * len * 0.18;
        const dir = i % 2 === 0 ? 1 : -1;
        cp.push({ cx: mx + perpX * dir, cy: my + perpY * dir });
      }
      cps.current = cp;

      // Flow pulses
      const ps: Pulse[] = [];
      for (let i = 0; i < ns.length; i++) {
        const count = 2 + (i % 2);
        for (let j = 0; j < count; j++) {
          ps.push({
            nodeIdx: i,
            t: j / count + (i * 0.037) % 0.3,
            speed: 0.0018 + (i % 3) * 0.0005,
            size: 3 + (i % 3),
          });
        }
      }
      pulses.current = ps;
    };
    fit();

    let rt: ReturnType<typeof setTimeout>;
    const onR = () => { clearTimeout(rt); rt = setTimeout(fit, 200); };
    window.addEventListener("resize", onR);

    // --- Mouse ---
    const onM = (e: MouseEvent) => {
      const r = par.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top, in: true };
    };
    const onL = () => { mouse.current.in = false; };
    par.addEventListener("mousemove", onM);
    par.addEventListener("mouseleave", onL);

    // --- Click ---
    const onC = (e: MouseEvent) => {
      const r = par.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      const s = state.current;
      const dx = cx - s.cX, dy = cy - s.cY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        wave.current = {
          radius: 0,
          max: Math.max(dim.current.w, dim.current.h) * 0.85,
          opacity: 1,
        };
      }
    };
    par.addEventListener("click", onC);

    // --- Visibility ---
    const obs = new IntersectionObserver(
      ([e]) => { vis.current = e.isIntersecting; },
      { threshold: 0.05 }
    );
    obs.observe(cvs);

    // ========================
    // DRAW HELPERS
    // ========================

    // Multi-pass glowing bezier (no shadowBlur)
    const drawCurve = (
      x0: number, y0: number,
      cpx: number, cpy: number,
      x1: number, y1: number,
      alpha: number
    ) => {
      c.lineCap = "round";

      // Outer soft glow
      c.beginPath();
      c.moveTo(x0, y0);
      c.quadraticCurveTo(cpx, cpy, x1, y1);
      c.strokeStyle = rgba(GOLD, alpha * 0.25);
      c.lineWidth = 7;
      c.stroke();

      // Mid glow
      c.beginPath();
      c.moveTo(x0, y0);
      c.quadraticCurveTo(cpx, cpy, x1, y1);
      c.strokeStyle = rgba(GOLD, alpha * 0.5);
      c.lineWidth = 3.5;
      c.stroke();

      // Core
      c.beginPath();
      c.moveTo(x0, y0);
      c.quadraticCurveTo(cpx, cpy, x1, y1);
      c.strokeStyle = rgba(GOLD_WARM, alpha * 0.8);
      c.lineWidth = 1.2;
      c.stroke();
    };

    // ========================
    // ANIMATION LOOP
    // ========================
    const tick = () => {
      raf.current = requestAnimationFrame(tick);
      if (!vis.current) return;

      const { w, h } = dim.current;
      if (!w || !h) return;

      c.clearRect(0, 0, w, h);

      const s = state.current;
      const m = mouse.current;
      const ns = nodes.current;
      const cp = cps.current;
      const ps = pulses.current;
      const wv = wave.current;
      const time = Date.now() * 0.001;

      // --- Update state ---
      const tBright = m.in ? 1.0 : 0.25;
      const tFlow = m.in ? 2.5 : 0.8;
      const tCBright = m.in ? 1.0 : 0.3;

      s.bright += (tBright - s.bright) * 0.03;
      s.flow += (tFlow - s.flow) * 0.03;
      s.cBright += (tCBright - s.cBright) * 0.03;

      // Spring physics for center follow
      const spring = 0.012;
      const damp = 0.88;

      if (m.in) {
        const tx = s.cBaseX + (m.x - s.cBaseX) * 0.2;
        const ty = s.cBaseY + (m.y - s.cBaseY) * 0.2;
        s.cVx += (tx - s.cX) * spring;
        s.cVy += (ty - s.cY) * spring;
      } else {
        s.cVx += (s.cBaseX - s.cX) * spring;
        s.cVy += (s.cBaseY - s.cY) * spring;
      }
      s.cVx *= damp;
      s.cVy *= damp;
      s.cX += s.cVx;
      s.cY += s.cVy;

      // Wave boost
      const waveBoost = wv && wv.opacity > 0.01 ? wv.opacity : 0;

      // --- 1. Connection curves ---
      for (let i = 0; i < ns.length; i++) {
        const n = ns[i];
        const p = cp[i];
        // Per-connection breathing
        const breath = 0.015 * Math.sin(time * 0.8 + i * 0.6);
        const alpha = (0.05 + breath) * s.bright + waveBoost * 0.12;
        drawCurve(n.x, n.y, p.cx, p.cy, s.cX, s.cY, alpha);
      }

      // --- 2. Flow pulses ---
      for (const p of ps) {
        p.t += p.speed * (s.flow + waveBoost * 4);
        if (p.t >= 1) p.t -= 1;

        const n = ns[p.nodeIdx];
        const ctrl = cp[p.nodeIdx];

        // Head
        const pos = bezPt(p.t, n.x, n.y, ctrl.cx, ctrl.cy, s.cX, s.cY);
        const tex = glow(p.size * 2.5, GOLD_WARM, `p${Math.round(p.size)}`);
        c.globalAlpha = s.bright * 0.55;
        c.drawImage(tex, pos.x - tex.width / 2, pos.y - tex.height / 2);

        // Trail (4 positions behind)
        for (let k = 1; k <= 4; k++) {
          const tt = p.t - k * 0.025;
          if (tt < 0) continue;
          const tp = bezPt(tt, n.x, n.y, ctrl.cx, ctrl.cy, s.cX, s.cY);
          c.globalAlpha = s.bright * 0.55 * (1 - k * 0.22);
          const trailTex = glow(
            p.size * (2.5 - k * 0.3),
            GOLD,
            `t${Math.round((p.size - k * 0.3) * 10)}`
          );
          c.drawImage(trailTex, tp.x - trailTex.width / 2, tp.y - trailTex.height / 2);
        }
        c.globalAlpha = 1;
      }

      // --- 3. Outer nodes ---
      for (let i = 0; i < ns.length; i++) {
        const n = ns[i];
        const breath = 0.08 * Math.sin(time * 1.5 + i * 0.7);
        const targetB = s.bright * 0.55 + breath;
        n.brightness += (targetB - n.brightness) * 0.05;

        // Flash from wave
        if (n.flashTimer > 0) {
          n.flashTimer -= 0.015;
          n.brightness = Math.min(1, n.brightness + n.flashTimer * 0.8);
        }

        // Outer glow
        const outerTex = glow(n.radius * 3, GOLD, `no${n.radius}`);
        c.globalAlpha = n.brightness * 0.7;
        c.drawImage(outerTex, n.x - outerTex.width / 2, n.y - outerTex.height / 2);

        // Core dot
        c.globalAlpha = n.brightness;
        c.beginPath();
        c.arc(n.x, n.y, n.radius * 0.35, 0, Math.PI * 2);
        c.fillStyle = rgba(GOLD_WARM, 0.9);
        c.fill();
        c.globalAlpha = 1;
      }

      // --- 4. Center node (Thailand) ---
      const cBreath = 0.06 * Math.sin(time * 1.2);
      const cb = s.cBright + cBreath;

      // Layer 1: Large outer glow
      const g1 = glow(70, GOLD, "c1");
      c.globalAlpha = cb * 0.4;
      c.drawImage(g1, s.cX - g1.width / 2, s.cY - g1.height / 2);

      // Layer 2: Mid glow
      const g2 = glow(40, GOLD_WARM, "c2");
      c.globalAlpha = cb * 0.6;
      c.drawImage(g2, s.cX - g2.width / 2, s.cY - g2.height / 2);

      // Layer 3: Inner glow
      const g3 = glow(20, GOLD_HOT, "c3");
      c.globalAlpha = cb * 0.85;
      c.drawImage(g3, s.cX - g3.width / 2, s.cY - g3.height / 2);

      // Core dot
      c.globalAlpha = cb;
      c.beginPath();
      c.arc(s.cX, s.cY, 5, 0, Math.PI * 2);
      c.fillStyle = rgba(GOLD_HOT, 0.95);
      c.fill();

      // Subtle ring
      c.beginPath();
      c.arc(s.cX, s.cY, 22 + cBreath * 30, 0, Math.PI * 2);
      c.strokeStyle = rgba(GOLD, cb * 0.12);
      c.lineWidth = 1;
      c.stroke();
      c.globalAlpha = 1;

      // --- 5. Pulse wave (click) ---
      if (wv && wv.opacity > 0.01) {
        wv.radius += 5;
        wv.opacity = Math.max(0, 1 - wv.radius / wv.max);

        if (wv.opacity > 0.01) {
          // Multi-ring glow wave
          for (let r = 0; r < 3; r++) {
            c.beginPath();
            c.arc(s.cX, s.cY, wv.radius + r * 4, 0, Math.PI * 2);
            c.strokeStyle = rgba(GOLD_WARM, wv.opacity * (0.4 - r * 0.12));
            c.lineWidth = 4 - r * 1.2;
            c.stroke();
          }

          // Flash outer nodes when wave reaches them
          for (const n of ns) {
            const dist = Math.sqrt((n.x - s.cX) ** 2 + (n.y - s.cY) ** 2);
            if (Math.abs(dist - wv.radius) < 20) {
              n.flashTimer = 0.9;
            }
          }
        } else {
          wave.current = null;
        }
      }
    };

    // ========================
    // START / STATIC
    // ========================
    if (!noMotion) {
      raf.current = requestAnimationFrame(tick);
    } else {
      // Static render (WCAG reduced motion)
      const s = state.current;
      const ns = nodes.current;
      const cp = cps.current;

      for (let i = 0; i < ns.length; i++) {
        c.beginPath();
        c.moveTo(ns[i].x, ns[i].y);
        c.quadraticCurveTo(cp[i].cx, cp[i].cy, s.cBaseX, s.cBaseY);
        c.strokeStyle = rgba(GOLD, 0.05);
        c.lineWidth = 2;
        c.stroke();
      }
      for (const n of ns) {
        c.beginPath();
        c.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        c.fillStyle = rgba(GOLD, 0.25);
        c.fill();
      }
      c.beginPath();
      c.arc(s.cBaseX, s.cBaseY, 12, 0, Math.PI * 2);
      c.fillStyle = rgba(GOLD_WARM, 0.4);
      c.fill();
    }

    // ========================
    // CLEANUP
    // ========================
    return () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(rt);
      window.removeEventListener("resize", onR);
      par.removeEventListener("mousemove", onM);
      par.removeEventListener("mouseleave", onL);
      par.removeEventListener("click", onC);
      obs.disconnect();
      glowCache.current.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
