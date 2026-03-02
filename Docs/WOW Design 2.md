# God's EYE — WOW Design Master Plan v1.0

> **Blueprint สำหรับ Redesign God's EYE Trading Platform**
> **ให้ระดับ Linear / Stripe / TradingView / Bloomberg Terminal**
> Version 1.0 | February 2026

---

## 1. Current Problems Analysis (วิเคราะห์ปัญหาปัจจุบัน)

### จากภาพ Screenshot + Source Code Audit

| ปัญหา | ระดับ | สาเหตุใน Code | ผลกระทบ |
|--------|-------|---------------|---------|
| **Font น่าเบื่อ** | CRITICAL | ใช้ Inter ตัวเดียว (`next/font/google`) | ดู generic เหมือน template ฟรี ไม่มี personality |
| **สีจืด ไม่มี depth** | CRITICAL | ใช้ HSL color system พื้นฐานของ shadcn/ui ไม่มี gradient, glow | ดูแบน ไม่มี atmosphere ของ trading platform |
| **ไม่มี animation เลย** | CRITICAL | ไม่มี animation library ใดๆ (ไม่มี GSAP, Framer Motion, Lenis) | หน้าจอนิ่งสนิท ไม่มีชีวิตชีวา |
| **ไม่มีภาพ/illustration** | HIGH | ไม่มี SVG, icon set, visual assets ใดๆ นอกจาก Lucide icons | เว็บดูว่าง ไม่มี visual storytelling |
| **Hover effect กระจอก** | HIGH | มีแค่ `hover:bg-accent` และ `hover:-translate-y-0.5` | ไม่สร้าง delight, ไม่น่าจดจำ |
| **Logo ไม่มี identity** | HIGH | แค่ text "God's EYE" + Eye icon ธรรมดา | ไม่สื่อ brand, จำไม่ได้ |
| **Trading Style Cards ธรรมดา** | MEDIUM | ใช้ Button + outline variant ธรรมดา | ไม่สื่อถึง trading style แต่ละแบบ |
| **Data Table ไม่ premium** | HIGH | ใช้ standard table styling ไม่มี visual differentiation | ตัวเลขซ้อนทับ อ่านยาก ไม่ highlight สิ่งสำคัญ |
| **ดูไม่น่าจ่ายเงิน** | CRITICAL | รวมทุกปัญหาข้างบน | ผู้ใช้ไม่เชื่อถือ ไม่อยากสมัครสมาชิก |

### Component ที่ต้อง Redesign (Priority Order)

1. **Dashboard Header** (`dashboard-header.tsx`) — Logo + Navigation
2. **Trading Style Filter** (`trading-style-filter.tsx`) — Style cards
3. **Market Tabs** (`market-tabs.tsx`) — Market selector
4. **Score Table** (`score-table.tsx`, 1003 lines) — Main data table
5. **Score Cells** (`cells/score-cell.tsx`) — E/W/Q/F display
6. **Cycle Cell** (`cells/cycle-cell.tsx`) — Cycle state display
7. **Price Cell** (`cells/price-cell.tsx`) — Price change display
8. **Global Theme** (`globals.css`) — Color system + tokens

---

## 2. Benchmarks (ต้องเทียบเท่าหรือชนะ)

### Tier 1: Direct Competitors (Trading Platforms)

| # | Brand | URL | WOW Factor | เรียนรู้อะไร |
|---|-------|-----|-----------|------------|
| 1 | **TradingView** | tradingview.com | Dark theme mastery, real-time data animation, clean data density | Data-heavy UI ที่อ่านง่าย, color-coded signals, smooth price updates |
| 2 | **Bloomberg Terminal** | bloomberg.com/terminal | Information density + premium feel, professional-grade UI | สีที่แยก data category ชัดเจน, compact but readable layout |
| 3 | **Binance** | binance.com/en/trade | Real-time orderbook animation, neon glow on dark, responsive data grid | Price flash effects, gradient accents, dark atmosphere |
| 4 | **Coinglass** | coinglass.com | Heatmap visualization, clean dark dashboard, data cards | Visual data representation, color-coded market sentiment |

### Tier 2: SaaS/Tech — Best-in-Class Dark UI

| # | Brand | URL | WOW Factor | เรียนรู้อะไร |
|---|-------|-----|-----------|------------|
| 5 | **Linear** | linear.app | Bento grid, gradient mesh, buttery animations, dark perfection | Layout composition, motion design, glassmorphism |
| 6 | **Raycast** | raycast.com | Dark luxury, neon glow, keyboard-first, command palette | Dark mode glow effects, keyboard UI, developer-premium feel |
| 7 | **Vercel** | vercel.com | Dramatic gradients, code-meets-design | Animated grid backgrounds, gradient art, dark + neon |
| 8 | **Stripe Dashboard** | dashboard.stripe.com | Clean data visualization, premium SaaS feel | Chart design, data card layout, clean data density |

### Tier 3: Award-Winning Design References

| # | Brand | URL | WOW Factor | เรียนรู้อะไร |
|---|-------|-----|-----------|------------|
| 9 | **Apple** | apple.com | Scroll-driven animations, whitespace mastery | Sticky sections, zoom-on-scroll, typography scale |
| 10 | **Lazarev Agency** | lazarev.agency | 125+ Awwwards, 3D effects, immersive transitions | Page transitions, hover reveals, custom cursor |
| 11 | **Framer** | framer.com | Interactive demos, smooth motion, dark elegance | Component animation, scroll-triggered reveals |

---

## 3. Design System v2.0 — "God's EYE Aesthetic"

### Design Philosophy

> **"See Everything. Miss Nothing."**
>
> God's EYE ต้องรู้สึกเหมือน "ห้องบัญชาการ" ที่ล้ำสมัย —
> Dark, focused, powerful, แต่ไม่ overwhelming.
> ทุก pixel มีความหมาย ทุก animation มี purpose.
> เหมือน Bloomberg Terminal ผสม Linear.app

### สิ่งที่เปลี่ยนจากปัจจุบัน

| ก่อน (Current) | หลัง (v2.0) |
|----------------|-------------|
| Inter font ตัวเดียว | **Geist + Geist Mono** (Vercel aesthetic) + **Noto Sans Thai** |
| HSL solid colors | **Gradient System + Cyan/Gold Glow + Glassmorphism** |
| ไม่มี animation | **Framer Motion + CSS Transitions + Number Morphing** |
| ไม่มีภาพ | **Custom SVG icons + Animated data visualizations** |
| Hover แค่ opacity | **Glow borders + Lift shadows + Scale effects** |
| Layout ธรรมดา | **Layered depth + Glassmorphism panels + Gradient mesh BG** |
| ไม่มี texture | **Subtle noise grain + Dot grid pattern + Gradient mesh** |
| Price flash แค่ bg-color | **Number morphing + Directional arrows + Glow pulse** |

### 3.1 Color System (Trading-Optimized)

```css
/* ============================================================
   God's EYE Color System v2.0
   Designed for: Long trading sessions, data readability, premium feel
   ============================================================ */

/* === Base Dark Theme (Primary — traders ใช้ dark เป็นหลัก) === */

/* Background Layers (สร้าง depth ด้วยหลายชั้น) */
--ge-bg-deepest: #07080D;        /* Deepest background (body) */
--ge-bg-base: #0C0E16;           /* Base panels/cards */
--ge-bg-surface: #111318;        /* Elevated surfaces */
--ge-bg-raised: #181B25;         /* Raised elements (hover states) */
--ge-bg-overlay: #1E2130;        /* Overlays, dropdowns, popovers */

/* Text Hierarchy (4 levels for data-heavy UI) */
--ge-text-primary: #F0F2F5;      /* Primary text — high contrast */
--ge-text-secondary: #A0A8B8;    /* Secondary — labels, descriptions */
--ge-text-tertiary: #636B7E;     /* Tertiary — muted, timestamps */
--ge-text-disabled: #3A3F4E;     /* Disabled states */

/* === Trading Signal Colors (สำคัญที่สุด) === */

/* Buy/Bullish — Cyan-Green (ไม่ใช่ green ธรรมดา ต้องมี personality) */
--ge-buy: #00D4AA;               /* Primary buy color */
--ge-buy-bright: #00FFD0;        /* Bright variant — flash, highlights */
--ge-buy-dim: #00D4AA33;         /* Dimmed — backgrounds, fills */
--ge-buy-glow: 0 0 20px #00D4AA40, 0 0 60px #00D4AA15;  /* Glow effect */

/* Sell/Bearish — Warm Red-Orange (มี energy มากกว่า red ธรรมดา) */
--ge-sell: #FF4466;              /* Primary sell color */
--ge-sell-bright: #FF6080;       /* Bright variant */
--ge-sell-dim: #FF446633;        /* Dimmed */
--ge-sell-glow: 0 0 20px #FF446640, 0 0 60px #FF446615;

/* Neutral — Cool Grey-Blue */
--ge-neutral: #5A6178;           /* Neutral/sideways */

/* === Accent Colors === */

/* Cyan — Primary brand accent (สื่อถึง technology, surveillance, AI) */
--ge-accent-cyan: #00B8FF;
--ge-accent-cyan-dim: #00B8FF20;
--ge-accent-cyan-glow: 0 0 30px #00B8FF30;

/* Gold — Premium signals, important alerts */
--ge-accent-gold: #FFB800;
--ge-accent-gold-dim: #FFB80020;
--ge-accent-gold-glow: 0 0 30px #FFB80030;

/* Purple — AI/ML features, special indicators */
--ge-accent-purple: #8B5CF6;
--ge-accent-purple-dim: #8B5CF620;

/* === Timeframe Color Coding === */
--ge-tf-m1: #38BDF8;             /* M1 — Sky blue */
--ge-tf-m5: #38BDF8;             /* M5 — Sky blue */
--ge-tf-m15: #38BDF8;            /* M15 — Sky blue */
--ge-tf-m30: #818CF8;            /* M30 — Indigo */
--ge-tf-h1: #A78BFA;             /* H1 — Violet */
--ge-tf-h4: #A78BFA;             /* H4 — Violet */
--ge-tf-d1: #F59E0B;             /* D1 — Amber */
--ge-tf-w1: #F97316;             /* W1 — Orange */
--ge-tf-mn: #EF4444;             /* MN — Red */

/* === Gradient Definitions === */
--ge-gradient-hero: linear-gradient(135deg, #07080D 0%, #0C1628 50%, #0C0E16 100%);
--ge-gradient-surface: linear-gradient(180deg, #111318 0%, #0C0E16 100%);
--ge-gradient-accent: linear-gradient(135deg, #00B8FF 0%, #00D4AA 100%);
--ge-gradient-cta: linear-gradient(135deg, #00B8FF 0%, #8B5CF6 100%);
--ge-gradient-premium: linear-gradient(135deg, #FFB800 0%, #FF6B00 100%);
--ge-gradient-buy: linear-gradient(90deg, #00D4AA00 0%, #00D4AA33 100%);
--ge-gradient-sell: linear-gradient(90deg, #FF446600 0%, #FF446633 100%);

/* === Border Colors === */
--ge-border-subtle: #1E2130;     /* Subtle dividers */
--ge-border-default: #282D3E;    /* Default borders */
--ge-border-strong: #3A3F4E;     /* Strong/hover borders */
--ge-border-accent: #00B8FF40;   /* Accent border — glow hint */

/* === Glassmorphism === */
--ge-glass-bg: rgba(17, 19, 24, 0.7);
--ge-glass-border: rgba(255, 255, 255, 0.06);
--ge-glass-blur: blur(20px);
--ge-glass-hover: rgba(255, 255, 255, 0.03);

/* === Score Mode Colors (E/W/Q/A/F) === */
--ge-score-e: #38BDF8;           /* Equal — Sky blue */
--ge-score-w: #A78BFA;           /* Weighted — Violet */
--ge-score-q: #F59E0B;           /* Quality — Amber */
--ge-score-a: #00D4AA;           /* Average — Cyan-green */
--ge-score-f: #FF4466;           /* Final/Capacity — Red */

/* === Cycle State Colors === */
--ge-cycle-s1: #00D4AA;          /* Setup 1 — Bullish start */
--ge-cycle-s2: #00FFD0;          /* Setup 2 — Bullish mid */
--ge-cycle-s3: #38BDF8;          /* Setup 3 — Bullish strong */
--ge-cycle-sg: #FFB800;          /* Signal — Gold (attention!) */
--ge-cycle-r1: #FF4466;          /* Reversal 1 — Bearish start */
--ge-cycle-r2: #FF6080;          /* Reversal 2 — Bearish mid */
--ge-cycle-r3: #EF4444;          /* Reversal 3 — Bearish strong */
--ge-cycle-rt: #8B5CF6;          /* Retrace — Purple */
--ge-cycle-cf: #5A6178;          /* Confirm — Neutral */
```

### 3.2 Typography System

```css
/* ============================================================
   God's EYE Typography v2.0
   Design Principle: Data-first readability + Premium aesthetic
   ============================================================ */

/* Display / Hero — สำหรับ marketing pages, hero headlines */
--ge-font-display: 'Geist', system-ui, sans-serif;
/* Weight: 700-800 | Use: Hero text, page titles */
/* Why Geist: Vercel's own font, modern geometric, premium feel */

/* Heading — สำหรับ section titles, card headers */
--ge-font-heading: 'Geist', system-ui, sans-serif;
/* Weight: 600-700 | Use: Section titles, dialog headers */

/* Body — สำหรับ content, labels, descriptions */
--ge-font-body: 'Geist', system-ui, sans-serif;
/* Weight: 400-500 | Use: Body text, table labels */

/* Data / Mono — สำหรับ prices, scores, numbers ทั้งหมด */
--ge-font-data: 'Geist Mono', 'JetBrains Mono', monospace;
/* Weight: 400-600 | Use: ALL numeric data in tables */
/* สำคัญมาก: ตัวเลข trading ต้องใช้ monospace เสมอ เพื่อ alignment */

/* Thai — สำหรับ text ภาษาไทย */
--ge-font-thai: 'Noto Sans Thai', 'Sarabun', sans-serif;
/* Weight: 400-700 | Use: Thai locale text */

/* Typography Scale (modular scale: 1.25 ratio) */
--ge-text-xs: 0.6875rem;    /* 11px — micro labels, timestamps */
--ge-text-sm: 0.8125rem;    /* 13px — secondary text, badges */
--ge-text-base: 0.875rem;   /* 14px — body text (compact dashboard) */
--ge-text-md: 1rem;          /* 16px — large body, card titles */
--ge-text-lg: 1.25rem;       /* 20px — section titles */
--ge-text-xl: 1.5rem;        /* 24px — page titles */
--ge-text-2xl: 2rem;         /* 32px — hero text */
--ge-text-3xl: 2.5rem;       /* 40px — marketing hero */
--ge-text-4xl: 3.5rem;       /* 56px — landing page hero */

/* Line Heights (optimized for data readability) */
--ge-leading-tight: 1.2;    /* Headlines */
--ge-leading-normal: 1.5;   /* Body text */
--ge-leading-data: 1.0;     /* Table data (compact) */

/* Letter Spacing */
--ge-tracking-tight: -0.02em;   /* Headlines */
--ge-tracking-normal: 0;        /* Body */
--ge-tracking-wide: 0.05em;     /* Labels, badges */
--ge-tracking-widest: 0.1em;    /* All-caps labels */
```

### 3.3 Gradient & Glow Definitions

```css
/* ============================================================
   Glow & Effect System
   Purpose: สร้าง atmosphere ของ "command center" ที่ล้ำสมัย
   ============================================================ */

/* === Box Shadow Levels === */
--ge-shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
--ge-shadow-md: 0 4px 12px rgba(0,0,0,0.4);
--ge-shadow-lg: 0 8px 30px rgba(0,0,0,0.5);
--ge-shadow-xl: 0 16px 50px rgba(0,0,0,0.6);

/* === Glow Shadows (สำหรับ interactive elements) === */
--ge-glow-cyan: 0 0 15px #00B8FF25, 0 0 45px #00B8FF10;
--ge-glow-buy: 0 0 15px #00D4AA25, 0 0 45px #00D4AA10;
--ge-glow-sell: 0 0 15px #FF446625, 0 0 45px #FF446610;
--ge-glow-gold: 0 0 15px #FFB80025, 0 0 45px #FFB80010;
--ge-glow-purple: 0 0 15px #8B5CF625, 0 0 45px #8B5CF610;

/* === Ambient Glow (สำหรับ background atmosphere) === */
/* ใช้ radial-gradient วางทับ background เพื่อสร้าง depth */
--ge-ambient-glow: radial-gradient(
  ellipse 600px 400px at 50% 0%,
  rgba(0, 184, 255, 0.03) 0%,
  transparent 70%
);

/* === Noise Grain Overlay === */
/* CSS-based noise texture เพิ่ม premium feel ให้ dark backgrounds */
/* ใช้เป็น pseudo-element ::after บน dark sections */
.ge-noise::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.015;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px;
}

/* === Dot Grid Pattern (สำหรับ empty states / backgrounds) === */
.ge-dot-grid {
  background-image: radial-gradient(circle, #282D3E 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### 3.4 Spacing & Layout Tokens

```css
/* ============================================================
   Layout System — Optimized for Trading Dashboards
   ============================================================ */

/* Dashboard ต้อง compact กว่า marketing pages */
/* Trading = every pixel counts */

/* Table Row Heights */
--ge-row-compact: 32px;     /* Compact mode — more data visible */
--ge-row-normal: 40px;      /* Normal mode — balanced */
--ge-row-comfortable: 48px; /* Comfortable — easier to read */

/* Panel Spacing */
--ge-panel-gap: 1px;        /* Gap between panels (เหมือน terminal) */
--ge-panel-padding: 12px;   /* Internal padding */
--ge-panel-radius: 8px;     /* Border radius */

/* Header Height */
--ge-header-height: 52px;   /* Compact header for max data space */

/* Filter Bar Height */
--ge-filter-height: auto;   /* Flexible based on content */

/* z-index Scale */
--ge-z-base: 0;
--ge-z-dropdown: 50;
--ge-z-sticky: 40;
--ge-z-header: 50;
--ge-z-overlay: 60;
--ge-z-modal: 70;
--ge-z-toast: 80;
```

---

## 4. Animation & Interaction Spec

### Design Principle

> **Animation ใน Trading Platform ต้อง functional ก่อน decorative**
> - Price changes → instant visual feedback (< 100ms)
> - Score updates → smooth transition ไม่กระตุก
> - UI interactions → responsive, snappy, ไม่ขวางงาน
> - Marketing pages → dramatic, WOW, สร้าง impression

### 4.1 Tech Stack

```json
{
  "dependencies": {
    "framer-motion": "^12.0.0",
    "lenis": "^1.1.0"
  }
}
```

**ทำไมไม่ใช้ GSAP:**
- God's EYE ส่วนใหญ่เป็น dashboard (React components + data updates)
- Framer Motion integrate กับ React ดีกว่า GSAP สำหรับ component-level animations
- GSAP เหมาะกับ marketing pages ที่ scroll-heavy มากกว่า
- ลด bundle size — ใช้ library เดียวให้เชี่ยวชาญ
- Lenis สำหรับ smooth scroll เฉพาะ marketing pages

### 4.2 Real-time Data Animations (Dashboard — สำคัญที่สุด)

| Effect | Implementation | Duration | Priority |
|--------|---------------|----------|----------|
| **Number Morphing** | ตัวเลข price เปลี่ยนแบบ smooth (count up/down) ไม่กระโดด | 300ms | P0 |
| **Price Flash** | row flash สี buy/sell เมื่อราคาเปลี่ยน + fade out | 500ms flash → 300ms fade | P0 |
| **Score Bar Animation** | Buy/Sell percentage bar animate ไปยังค่าใหม่ | 400ms ease-out | P0 |
| **Cycle State Transition** | เปลี่ยนสี + icon แบบ smooth เมื่อ cycle state เปลี่ยน | 300ms | P1 |
| **Row Enter/Exit** | เมื่อ symbol เพิ่ม/ลบจาก list → slide in/out | 200ms | P1 |
| **Sort Animation** | เมื่อ sort column → rows reorder แบบ smooth (layout animation) | 300ms | P2 |
| **Connection Pulse** | "Connected" indicator pulse ทุก 2 วินาที | 2s loop | P1 |

#### Number Morphing Spec

```tsx
// Concept: ตัวเลข interpolate จากค่าเก่าไปค่าใหม่
// ใช้ Framer Motion's useMotionValue + useTransform + animate

// Example: Price 42,150.25 → 42,183.50
// Animation: ตัวเลขนับขึ้นจาก 42,150.25 → 42,183.50 ใน 300ms
// สี: flash green (ขึ้น) หรือ red (ลง) แล้ว fade กลับ normal

// ไม่ต้อง animate ทุกราคาเปลี่ยน — ใช้ requestAnimationFrame
// ถ้า update เร็วเกิน ให้ skip animation แสดงค่าล่าสุดเลย
```

### 4.3 Dashboard UI Interactions

| Element | Effect | Description | Duration |
|---------|--------|------------|----------|
| **Table Row Hover** | Subtle lift + glow border + bg brighten | Row ยกขึ้นเล็กน้อย + border ด้านซ้าย glow cyan | 150ms |
| **Column Header Hover** | Sort arrow reveal + text brighten | แสดง sort direction hint | 100ms |
| **Score Cell Hover** | Expand tooltip with details | แสดง buy/sell breakdown + mini bar chart | 200ms |
| **Trading Style Card** | Scale + glow ring + icon animate | Card ขยายเล็กน้อย + ring glow สี accent | 200ms |
| **Market Tab** | Underline slide + icon color change | Underline ไหลไปที่ tab ใหม่ (layout animation) | 250ms |
| **Favorite Star** | Scale bounce + particle burst | Star ขยาย + หดกลับ + tiny sparkle particles | 400ms |
| **Search Focus** | Expand width + glow border | Search bar ขยายความกว้าง + cyan glow border | 200ms |
| **Button Click** | Scale down → scale up (spring) | ปุ่มกดยุบ → เด้งกลับ | 150ms spring |

### 4.4 Marketing Page Animations

| Effect | Trigger | Description | Library |
|--------|---------|------------|---------|
| **Text Reveal** | Scroll into view | Headline text โผล่ทีละคำ (word-by-word stagger) | Framer Motion |
| **Card Stagger** | Scroll into view | Feature cards โผล่ทีละใบ ทำมุม fade+slide up | Framer Motion |
| **Counter Animate** | Scroll into view | ตัวเลข "500+ symbols" นับขึ้นจาก 0 | Framer Motion |
| **Parallax Background** | Scroll position | Background elements ขยับช้ากว่า foreground | CSS transform |
| **Gradient Shift** | Scroll position | Background gradient สีเปลี่ยนตาม scroll | CSS + Framer |
| **CTA Glow Pulse** | Idle (3s interval) | ปุ่ม CTA กระพริบ glow ดึงความสนใจ | CSS animation |
| **Smooth Scroll** | User scroll | เลื่อนหน้าแบบ smooth เหมือน Apple.com | Lenis |
| **Page Transition** | Route change | Fade + subtle slide เมื่อเปลี่ยนหน้า | Framer Motion |

### 4.5 Micro-interactions Spec

```
Hover States (ทุก interactive element):
├── Buttons
│   ├── Primary CTA: scale(1.02) + glow shadow increase + bg brighten
│   ├── Secondary: border glow + bg subtle fill
│   ├── Ghost: text brighten + underline slide
│   └── Icon: scale(1.1) + rotate(5deg) subtle
├── Cards
│   ├── Dashboard Card: bg-raised + border brighten + shadow lift
│   ├── Feature Card: translateY(-2px) + shadow deepen + accent bar grow
│   └── Pricing Card: scale(1.01) + glow ring + shadow increase
├── Table Rows
│   ├── Hover: bg brighten + left accent bar appear
│   └── Click: ripple effect (subtle) + row highlight persist
├── Links
│   └── Text Link: underline slide from left + color transition
└── Inputs
    ├── Focus: border glow cyan + shadow glow
    └── Hover: border brighten
```

---

## 5. Component Redesign Spec

### 5.1 Dashboard Header (Redesign)

**Current Problems:**
- Logo เป็นแค่ Eye icon + text ธรรมดา
- ไม่มี glassmorphism
- ไม่มี visual hierarchy

**New Design:**

```
┌──────────────────────────────────────────────────────────────┐
│ ◉ God's EYE          [Crypto|Forex|Stock|Fav] [🔍     ⌘K]  │
│                                        [🌐][🌙][⚙️][👤]   │
└──────────────────────────────────────────────────────────────┘
```

- **Background**: Glassmorphism (`bg-[#0C0E16]/80 backdrop-blur-xl`)
- **Logo**: Eye icon ที่มี cyan glow ring + "God's EYE" with letter-spacing
  - Hover: Eye icon pulse glow + letter-spacing expand เล็กน้อย
- **Market Tabs**: ย้ายมาอยู่ใน header (ประหยัดพื้นที่แนวตั้ง)
  - Active tab: cyan underline slide animation (layout animation)
  - Inactive tab: hover → text brighten + subtle underline hint
- **Search**: Collapsed by default → expand on ⌘K หรือ click
  - Focused: cyan glow border + width expand animation
- **Controls**: Icon buttons with hover glow
- **Border**: Bottom border ใช้ `border-[#1E2130]` + subtle gradient line

### 5.2 Trading Style Filter (Redesign)

**Current Problems:**
- ใช้ Button component ธรรมดา
- ไม่มี visual distinction ระหว่าง trading styles
- Timeframe badges ดูเหมือน tags ธรรมดา

**New Design:**

```
Trading     ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
Style:      │⚡Scalping│  │🕐Day    │  │📈Swing  │  │🎯Position│ ...
            │ M5 M15  │  │M15 M30  │  │ H4 D1   │  │ D1 W1   │
            │   M30   │  │  H1 H4  │  │   W1    │  │   MN    │
            └─────────┘  └─────────┘  └─────────┘  └─────────┘
```

- **Cards**: Glassmorphism cards แทน buttons
  - Default: `bg-[#111318]/60 border-[#1E2130] backdrop-blur`
  - Hover: `bg-[#181B25] border-[#282D3E]` + subtle glow
  - Active: Cyan ring glow + `bg-[#00B8FF08]` + `border-[#00B8FF40]`
  - Active glow: `box-shadow: 0 0 20px #00B8FF15`
- **Icons**: แต่ละ style มี animated icon
  - Scalping ⚡: pulse animation (speed feel)
  - Day Trading 🕐: rotating clock hand
  - Swing 📈: wave motion
  - Position 🎯: target lock
  - Long Term 🏛: stable/solid
  - All TF 📊: rotating layers
- **Timeframe Badges**: Color-coded dots + labels
  - ใช้ `--ge-tf-*` color system
  - Badges มี subtle glow ตาม timeframe color
- **Transition**: เมื่อเลือก style → active card expand เล็กน้อย + glow animate in

### 5.3 Score Table (Redesign — Main Focus)

**Current Problems:**
- ตารางแบน ไม่มี visual hierarchy
- Score columns (E/W/Q/F) แสดงแค่ตัวเลข
- Price changes ไม่ dramatic พอ
- Row hover ไม่มี feedback

**New Design Principles:**
1. **Monospace font สำหรับตัวเลขทั้งหมด** — alignment perfect
2. **Color-coded rows** — ถ้า overall signal buy → row tint green เบาๆ, sell → red เบาๆ
3. **Score cells เป็น mini bar charts** — ไม่ใช่แค่ตัวเลข
4. **Price cell มี sparkline** — mini chart 24h ข้างๆ ราคา
5. **Row hover = command center feel** — glow left border + bg brighten

**Score Cell (E/W/Q/F) Redesign:**

```
Before:  67.5 / 32.5
After:   ┌──────────────────────┐
         │ ████████████░░░░░░░░ │  67.5 B
         │ Buy ███████  Sell ██ │  32.5 S
         └──────────────────────┘
```

- แสดงเป็น horizontal stacked bar (buy = cyan-green, sell = red)
- ตัวเลข % อยู่ข้างๆ bar
- เมื่อค่าเปลี่ยน → bar animate ความยาว + number morphing
- Hover → expand เพื่อดู breakdown แต่ละ TF

**Cycle State Cell Redesign:**

```
Before:  S1 (text only)
After:   ◉ S1  (colored dot + text + subtle glow matching state)
```

- แต่ละ state มี unique color (จาก `--ge-cycle-*`)
- Dot indicator + glow shadow matching state color
- Transition animation เมื่อ state เปลี่ยน (color morph + icon transition)

**Price Cell Redesign:**

```
Before:  42,150.25  +2.45%
After:   42,150.25  ▲ +2.45%   (with number morphing + direction arrow)
         ═══════════            (mini sparkline under price)
```

- Price: monospace font, number morphing on update
- Arrow: animated direction indicator (▲/▼)
- Change %: color-coded (buy/sell) with glow text
- Flash: entire cell flashes subtle buy/sell color on update
- Optional: tiny 24h sparkline chart under price

**Row Interaction:**

```
Default:   bg-transparent, border-bottom subtle
Hover:     bg-[#181B25] + left border cyan 2px + shadow lift
Selected:  bg-[#00B8FF08] + left border cyan 3px + persistent
```

### 5.4 Market Tabs (Redesign)

**ย้ายเข้า Header** (ดู section 5.1)

- Tab switching: animated underline ที่ slide ตาม active tab (Framer layout animation)
- Each tab: icon + label
- Active: text-white + cyan underline
- Hover: text brighten + underline hint (opacity 30%)
- Badge count: แสดงจำนวน symbols ถ้ามี filter (e.g., "Crypto 23")

### 5.5 Connection Status (Redesign)

**Current:** "Connected" text + green dot
**New:** Status bar ด้านล่างของ header

```
23 symbols  ◉ Connected  ⚡ 441 active  ⟳ 0.3/s  Last: 9:15:54 PM
```

- Connected indicator: pulsing green dot (`animation: pulse 2s infinite`)
- Active count: ⚡ icon + number with subtle glow
- Update rate: animated counter
- Background: `bg-[#0C0E16]/90` subtle separation from table

---

## 6. Page-by-Page WOW Analysis

### 6.1 Dashboard `/dashboard` (Primary — 80% of user time)

| Area | WOW Factor | Emotion Target | Technique |
|------|-----------|---------------|-----------|
| **Header** | ✦✦✦✦ | "Professional tool" | Glassmorphism + animated logo + smooth tab transitions |
| **Trading Style Filter** | ✦✦✦✦ | "เข้าถึงง่าย เข้าใจทันที" | Glass cards + color-coded TF badges + animated icons |
| **Score Table** | ✦✦✦✦✦ | "Data ชัด อ่านง่าย ล้ำ" | Score bars + number morphing + price flash + monospace |
| **Status Bar** | ✦✦✦ | "ทุกอย่างทำงานอยู่" | Pulsing indicators + live counters |
| **Overall Atmosphere** | ✦✦✦✦✦ | "นี่คือ command center" | Dark depth layers + subtle glow + noise texture |

**WOW Moments ที่ต้องมี:**
1. เปิด dashboard ครั้งแรก → data fade in ทีละ row (stagger 50ms)
2. ราคาเปลี่ยน → number morphing + color flash
3. Sort column → rows rearrange smoothly (layout animation)
4. เปลี่ยน trading style → cards transition + table data update with fade
5. Command palette (⌘K) → Raycast-style overlay เลือก symbol

### 6.2 Marketing Landing `/` (Secondary — First impression)

| Section | WOW Factor | Emotion Target | Technique |
|---------|-----------|---------------|-----------|
| **Hero** | ✦✦✦✦✦ | "นี่มันของจริง!" | Dark gradient BG + Animated text reveal + Live dashboard mockup + Floating particles |
| **Features** | ✦✦✦✦ | "ได้อะไรบ้าง" | Bento grid cards + icon animations + staggered reveal |
| **Live Demo Preview** | ✦✦✦✦✦ | "ว้าว ทำงานจริง!" | Embedded mini-dashboard ที่มี real-time data จำลอง |
| **Score Modes Explainer** | ✦✦✦✦ | "เข้าใจแล้ว" | Interactive tab showing W/E/Q/F differences + animated comparison |
| **Pricing** | ✦✦✦✦ | "คุ้มมาก" | Glassmorphism cards + popular badge glow + hover 3D tilt |
| **CTA Final** | ✦✦✦✦✦ | "สมัครเลย!" | Gradient background + magnetic CTA button + glow pulse |

**Hero Section Spec:**

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   GOD'S EYE                                            │
│   ─────────                                            │
│   See Everything. Miss Nothing.                        │
│                                                         │
│   Multi-market trading signals                         │
│   powered by 22,735 lines of proven MQL5 logic         │
│                                                         │
│   [🚀 Start Free]  [📊 Live Demo]                     │
│                                                         │
│   ┌─────────────────────────────────┐                  │
│   │   ╔══════ LIVE DASHBOARD ══════╗│   ← floating     │
│   │   ║ BTC  42,150 ▲  +2.4%     ║│     with subtle   │
│   │   ║ ETH   2,380 ▼  -1.2%     ║│     parallax      │
│   │   ║ SOL     142 ▲  +5.7%     ║│     tilt effect   │
│   │   ╚═══════════════════════════╝│                   │
│   └─────────────────────────────────┘                  │
│                                                         │
│   500+ Symbols  •  3 Markets  •  9 Timeframes          │
│                    (animated counters)                   │
│                                                         │
│   Background: dark gradient + noise + floating          │
│   particles (dots moving slowly)                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 6.3 Pricing `/pricing`

| Element | WOW Factor | Technique |
|---------|-----------|-----------|
| **Tier Cards** | ✦✦✦✦ | Glassmorphism + hover glow ring + popular badge pulse |
| **Comparison** | ✦✦✦ | ✓/✗ with animation + hover row highlight |
| **Value Statement** | ✦✦✦✦ | "500+ symbols for 100฿/month" animated counter |
| **FAQ** | ✦✦✦ | Smooth accordion animation |

### 6.4 Login/Register `/login`, `/register`

| Element | WOW Factor | Technique |
|---------|-----------|-----------|
| **Layout** | ✦✦✦✦ | Split: Form left + Animated dashboard preview right |
| **Form** | ✦✦✦ | Floating labels + smooth validation + focus glow |
| **Background** | ✦✦✦✦ | Dark gradient + animated dot grid + subtle particles |
| **Social Login** | ✦✦✦ | ต้องทำงานจริง! ถ้ายังไม่พร้อม → ซ่อน |

---

## 7. Implementation Priority & Phases

### Phase 1: Foundation (Week 1) — ทำก่อน ส่งผลทันที

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 1.1 | **Install Fonts** (Geist + Geist Mono + Noto Sans Thai) | HIGH | LOW |
| 1.2 | **New Color System** — Replace globals.css with v2.0 colors | HIGH | MEDIUM |
| 1.3 | **Install Framer Motion** | HIGH | LOW |
| 1.4 | **Noise Grain Overlay** component | MEDIUM | LOW |
| 1.5 | **Glassmorphism Tokens** in CSS | HIGH | LOW |

### Phase 2: Core Dashboard WOW (Week 2-3)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 2.1 | **Dashboard Header** redesign (glassmorphism + logo) | HIGH | MEDIUM |
| 2.2 | **Trading Style Cards** redesign (glass + glow + animated icons) | HIGH | MEDIUM |
| 2.3 | **Score Cells** redesign (mini bar charts + color coding) | HIGH | HIGH |
| 2.4 | **Price Cell** redesign (number morphing + flash) | HIGH | HIGH |
| 2.5 | **Cycle Cell** redesign (colored dots + glow) | MEDIUM | LOW |
| 2.6 | **Table Row Hover** effects | MEDIUM | LOW |
| 2.7 | **Connection Status** redesign (pulsing indicators) | LOW | LOW |
| 2.8 | **Row Enter/Sort Animation** (Framer Motion layout) | MEDIUM | MEDIUM |

### Phase 3: Marketing Pages WOW (Week 4-5)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 3.1 | **Landing Page Hero** (text reveal + live demo mockup + particles) | HIGH | HIGH |
| 3.2 | **Feature Section** (bento grid + stagger reveal) | HIGH | MEDIUM |
| 3.3 | **Pricing Page** (glassmorphism cards + hover effects) | HIGH | MEDIUM |
| 3.4 | **CTA Sections** (magnetic buttons + glow pulse) | MEDIUM | LOW |
| 3.5 | **Smooth Scroll** (Lenis) for marketing pages only | MEDIUM | LOW |
| 3.6 | **Login/Register** redesign (split layout + animated bg) | MEDIUM | MEDIUM |

### Phase 4: Polish & Advanced (Week 6+)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 4.1 | **Command Palette** (⌘K) — Raycast-style symbol search | HIGH | HIGH |
| 4.2 | **Page Transitions** (Framer Motion) | MEDIUM | MEDIUM |
| 4.3 | **Score Cell Expanded Tooltip** (TF breakdown) | MEDIUM | MEDIUM |
| 4.4 | **Mini Sparkline Charts** in price cells | MEDIUM | HIGH |
| 4.5 | **Favorite Star Animation** (bounce + particles) | LOW | LOW |
| 4.6 | **Market Heatmap** visual (optional premium feature) | MEDIUM | HIGH |

---

## 8. WOW Checklist (Quality Gate)

### ทุกหน้าต้องผ่าน

| # | Check | Dashboard | Marketing | Auth |
|---|-------|-----------|-----------|------|
| 1 | **WOW Moment** — มีอย่างน้อย 1 จุดที่เห็นแล้ว "ว้าว" | ✅ Data animation | ✅ Hero + Live demo | ✅ Animated BG |
| 2 | **Depth & Atmosphere** — ไม่แบน มี layers, glow, shadow | ✅ Glass panels + noise | ✅ Gradient + particles | ✅ Split layout |
| 3 | **Hover Interaction** — ทุก interactive element มี feedback ที่ดี | ✅ Row glow + card scale | ✅ 3D tilt cards | ✅ Input focus glow |
| 4 | **Animation** — มี meaningful animation อย่างน้อย 3 จุด | ✅ Data morph + sort + enter | ✅ Scroll reveals + stagger | ✅ Form transitions |
| 5 | **Typography** — Font เหมาะสม อ่านง่าย มี hierarchy | ✅ Geist Mono for data | ✅ Geist Display for hero | ✅ Clean body text |
| 6 | **Color System** — สี meaningful, ไม่ใช่แค่สวย | ✅ Buy/Sell/Cycle coded | ✅ Brand cyan + gradients | ✅ Subtle accent |
| 7 | **Brand Identity** — จำได้ว่าเป็น God's EYE | ✅ Logo + cyan accent | ✅ "See Everything" brand | ✅ Consistent |
| 8 | **Function Check** — ทุกปุ่มทำงานจริง ไม่มี dead button | ✅ All interactive | ✅ CTA → register | ✅ ห้ามมี broken OAuth |
| 9 | **Performance** — Animation ไม่ทำให้ laggy | ✅ < 16ms frame budget | ✅ Lazy load animations | ✅ Minimal |
| 10 | **Dark Mode Excellence** — Dark theme ต้องเป็น first-class | ✅ Primary mode | ✅ ต้องสวยทั้ง dark | ✅ Dark default |

### Trading-Specific Quality Checks

| # | Check | Description |
|---|-------|------------|
| 11 | **Data Readability** | ตัวเลขอ่านง่าย ชัด ไม่ปวดตา แม้ดูนานๆ |
| 12 | **Monospace Alignment** | ตัวเลขทุกคอลัมน์เรียงตรงกัน (decimal alignment) |
| 13 | **Color Blind Safe** | Buy/Sell ไม่พึ่ง green/red อย่างเดียว — มี shape indicator (▲/▼) ด้วย |
| 14 | **High Refresh Rate** | Price update animation ไม่กิน CPU เกินไป (ใช้ requestAnimationFrame) |
| 15 | **Eye Comfort** | Dark theme ต้องไม่ brightness สูงเกิน — ผู้ใช้เปิดหน้าจอนานหลายชั่วโมง |

---

## 9. Brand Identity Guide

### Logo

**Current:** Eye icon (Lucide) + "God's EYE" text
**New Concept:** Custom eye symbol with scanning/radar effect

```
    ◉ God's EYE
    │
    └─ Eye icon: ที่มี:
       - Outer ring: cyan gradient (#00B8FF → #00D4AA)
       - Iris: animated scan line effect (CSS animation)
       - Pupil: glowing dot (cyan glow)
       - ดูเหมือน "all-seeing eye" ที่ tech + futuristic
```

- Hover: Eye scan animation + letter-spacing expand
- Loading: Eye blink animation

### Brand Voice (สำหรับ Copy)

| Attribute | Description | Example |
|-----------|------------|---------|
| **Authoritative** | รู้ลึก มั่นใจ | "22,735 lines of proven logic" |
| **Precise** | ตรงประเด็น ไม่อ้อมค้อม | "See Everything. Miss Nothing." |
| **Technical** | ใช้ศัพท์ trading ถูกต้อง | "Multi-timeframe scoring across 9 intervals" |
| **Premium** | สื่อคุณค่า | "Professional-grade signals at accessible pricing" |

### Tagline Options

| # | Tagline | Use Case |
|---|---------|----------|
| 1 | **"See Everything. Miss Nothing."** | Primary — Hero headline |
| 2 | **"Your Multi-Market Command Center"** | Secondary — Subheadline |
| 3 | **"22,735 Lines of Proven Logic, One Dashboard"** | Feature emphasis |
| 4 | **"เห็นทุกจังหวะ ไม่พลาดสักที"** | Thai primary tagline |
| 5 | **"ศูนย์บัญชาการเทรดครบทุกตลาด"** | Thai secondary |

---

## 10. Technical Notes

### Font Loading Strategy

```tsx
// app/layout.tsx — Next.js font optimization
import { Geist, Geist_Mono } from 'next/font/google'; // or local font
import { Noto_Sans_Thai } from 'next/font/google';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  variable: '--font-noto-thai',
  weight: ['400', '500', '600', '700'],
});
```

### Framer Motion Configuration

```tsx
// ใช้ LazyMotion เพื่อลด bundle size
import { LazyMotion, domAnimation } from 'framer-motion';

// Wrap ใน root layout:
// <LazyMotion features={domAnimation}>
//   {children}
// </LazyMotion>

// Animation Presets (สร้างเป็น shared constants):
const ANIMATION_PRESETS = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  stagger: {
    animate: { transition: { staggerChildren: 0.05 } },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3 },
  },
} as const;
```

### Performance Budget

| Metric | Target | Current | Priority |
|--------|--------|---------|----------|
| Dashboard Initial Load | < 2s | TBD | P0 |
| Dashboard Render (500 symbols) | < 100ms | TBD | P0 |
| Price Update → UI | < 500ms | TBD | P0 |
| Animation Frame Budget | < 16ms (60fps) | N/A | P0 |
| Framer Motion Bundle | < 30KB gzipped | N/A | P1 |
| Lighthouse Performance | 90+ | TBD | P1 |
| Total Initial JS | < 200KB | TBD | P1 |

### Accessibility Requirements

- **Color contrast**: WCAG AA (4.5:1 text, 3:1 large text) — ตรวจสอบ buy/sell colors บน dark bg
- **Motion**: Respect `prefers-reduced-motion` — disable animation ถ้าผู้ใช้ต้องการ
- **Keyboard**: ทุก interactive element ต้อง keyboard accessible
- **Screen reader**: aria-labels สำหรับ score bars, cycle states, price changes
- **Color blind**: ใช้ shape indicators (▲/▼) ร่วมกับ color เสมอ

---

## Appendix A: CSS Custom Properties Quick Reference

```css
/* Copy this block into globals.css @theme section */
/* Complete God's EYE v2.0 token set */

/* Background */
--ge-bg-deepest: #07080D;
--ge-bg-base: #0C0E16;
--ge-bg-surface: #111318;
--ge-bg-raised: #181B25;
--ge-bg-overlay: #1E2130;

/* Text */
--ge-text-primary: #F0F2F5;
--ge-text-secondary: #A0A8B8;
--ge-text-tertiary: #636B7E;

/* Trading */
--ge-buy: #00D4AA;
--ge-sell: #FF4466;
--ge-neutral: #5A6178;

/* Accent */
--ge-accent: #00B8FF;
--ge-gold: #FFB800;
--ge-purple: #8B5CF6;

/* Border */
--ge-border: #1E2130;
--ge-border-hover: #282D3E;
--ge-border-accent: #00B8FF40;
```

## Appendix B: Animation Duration Reference

```
Instant feedback:  100ms  (hover states, button press)
Quick transition:  200ms  (tab switch, toggle, focus)
Normal animation:  300ms  (data update, card transition)
Smooth animation:  400ms  (score bar, number morphing)
Dramatic effect:   500ms  (price flash, page transition)
Reveal animation:  600ms  (scroll reveal, stagger group)
```

## Appendix C: File Structure for New Components

```
apps/web/src/
├── components/
│   ├── motion/                    # NEW: Animation utilities
│   │   ├── animate-on-scroll.tsx  # Scroll-triggered animation wrapper
│   │   ├── number-morph.tsx       # Animated number display
│   │   ├── stagger-children.tsx   # Staggered children reveal
│   │   └── presets.ts             # Animation preset constants
│   ├── ui/                        # Enhanced shadcn components
│   │   ├── glass-card.tsx         # NEW: Glassmorphism card
│   │   ├── glow-button.tsx        # NEW: CTA button with glow
│   │   ├── animated-tabs.tsx      # NEW: Tabs with sliding indicator
│   │   └── noise-overlay.tsx      # NEW: Grain texture overlay
│   ├── dashboard/
│   │   ├── cells/
│   │   │   ├── score-bar.tsx      # NEW: Visual score bar (replaces score-cell)
│   │   │   ├── price-morph.tsx    # NEW: Animated price cell
│   │   │   └── cycle-dot.tsx      # NEW: Colored cycle indicator
│   │   └── ...existing files (to be updated)
│   └── marketing/                 # NEW: Marketing page components
│       ├── hero-section.tsx
│       ├── feature-grid.tsx
│       ├── live-demo-preview.tsx
│       └── pricing-cards.tsx
├── lib/
│   └── motion/                    # NEW: Motion utilities
│       ├── use-number-animation.ts
│       ├── use-price-flash.ts
│       └── constants.ts           # Shared animation values
└── app/
    └── globals.css                # Updated with v2.0 tokens
```

---

> **"See Everything. Miss Nothing."** — God's EYE Trading Platform
