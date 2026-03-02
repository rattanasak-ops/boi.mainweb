# WOW Design Master Plan — BUILD BOI (BTED) Platform
> **Blueprint สำหรับ Demo เว็บไซต์ระบบฐานข้อมูลสมาชิก กองผู้ประกอบการไทย (กพก.)**
> **ระดับ Stripe / Linear / Notion — ปรับสำหรับหน่วยงานราชการระดับสากล**
> Version 1.0 | February 2026

---

## 1. Design Philosophy — หัวใจของการออกแบบ

> **"เชื่อมโยงธุรกิจไทยสู่โลก"**
>
> BTED ต้องรู้สึกเหมือน "Digital Hub ระดับสากล" —
> Modern, Trustworthy, Professional แต่ไม่แข็งทื่อ
> ทุก interaction มี purpose ทุก animation สร้าง credibility
> เหมือน Stripe ผสม Notion — สะอาด แต่มีชีวิตชีวา

### Target Impression (สิ่งที่กรรมการต้องรู้สึกใน 3 วินาทีแรก)

| ความรู้สึก | ทำอย่างไร |
|-----------|----------|
| **"ทันสมัยมาก"** | Premium animations, glassmorphism, micro-interactions |
| **"น่าเชื่อถือ"** | BOI branding ชัด, layout สะอาด, ข้อมูลครบ |
| **"ใช้งานง่าย"** | Navigation ชัด, flow สมเหตุผล, responsive ทุกหน้าจอ |
| **"ระดับสากล"** | สลับ TH/EN ได้ทันที, design เทียบเว็บต่างประเทศ |
| **"ครบทุกระบบ"** | กดได้ทุกปุ่ม ไม่มี dead-end ไม่มี "coming soon" |

### Context ของโครงการ

```
ผู้ว่าจ้าง:     กองพัฒนาผู้ประกอบการไทย (กพก.) ภายใต้ สกท. (BOI)
โดเมน:         https://bted.boi.go.th
งบประมาณ:      6,420,000 บาท
เกณฑ์ตัดสิน:    เทคนิค 70 คะแนน (ต้อง ≥49) + ราคา 30 คะแนน
Presentation:  25 นาทีนำเสนอ + 25 นาทีซักถาม
ระบบทั้งหมด:   24 ระบบตาม TOR
Demo ปัจจุบัน:  Mock data, ไม่ต้อง login จริง, แต่ UX/UI ต้องกดได้ทุกจุด
```

---

## 2. Benchmarks — ต้นแบบที่ต้องเทียบเท่า

### Tier 1: Government/Enterprise Platforms (เป้าหมายหลัก)

| # | Brand | WOW Factor | เรียนรู้อะไรสำหรับ BTED |
|---|-------|-----------|----------------------|
| 1 | **Stripe** | Gradient mastery, polished micro-interactions, clean layout | Gradient ที่สวยหรูบน light theme, card animations, data visualization |
| 2 | **Linear** | Bento grid, smooth motion, ultra-clean UI | Layout composition, motion design, section transitions |
| 3 | **Notion** | Clean + playful, illustration system, minimalist with character | Feature showcase ที่ไม่น่าเบื่อ, friendly tone สำหรับ government |
| 4 | **Singapore Gov (gov.sg)** | Modern government portal, clean, trustworthy | โทนสีที่ทั้ง modern และ official, i18n implementation |

### Tier 2: Design Excellence References

| # | Brand | WOW Factor | เรียนรู้อะไรสำหรับ BTED |
|---|-------|-----------|----------------------|
| 5 | **Apple** | Scroll-driven animations, whitespace mastery | Sticky sections, zoom-on-scroll, typography scale |
| 6 | **Vercel** | Dramatic gradients, developer aesthetic | Animated backgrounds, gradient art |
| 7 | **Loom** | Friendly + professional, warm palette | Balance ระหว่าง professional กับ approachable |

---

## 3. Roles — AI ต้องสวมบทบาท 6 ตำแหน่ง

### Role 1: Creative Director
| Item | Detail |
|------|--------|
| **หน้าที่** | กำหนด Visual Identity ทั้งหมด, Brand Consistency |
| **มุมมอง** | ต้องดู "official" แต่ไม่น่าเบื่อ — เหมือน BOI ยุคใหม่ |
| **ตัดสินใจ** | สี, layout, atmosphere ของทุกหน้า |

### Role 2: Senior UX Designer
| Item | Detail |
|------|--------|
| **หน้าที่** | User Flow, Information Architecture, Emotion Mapping |
| **มุมมอง** | กรรมการ BOI + ผู้ประกอบการไทย + นักลงทุนต่างชาติ |
| **ตัดสินใจ** | Flow การค้นหา Supplier, Business Matching, Event Registration |

### Role 3: Senior UI Designer
| Item | Detail |
|------|--------|
| **หน้าที่** | Visual Design ระดับ pixel-perfect, Component consistency |
| **มุมมอง** | ทุก component ต้อง premium แต่ readable สำหรับ data-heavy pages |
| **ตัดสินใจ** | Card styles, button variants, spacing, visual hierarchy |

### Role 4: Motion Designer
| Item | Detail |
|------|--------|
| **หน้าที่** | Animation, Micro-interaction, Scroll-driven effects |
| **มุมมอง** | Animation ต้อง purposeful ไม่ decorative — สื่อ professionalism |
| **ตัดสินใจ** | ทุก transition, hover effect, scroll reveal |

### Role 5: Frontend Architect
| Item | Detail |
|------|--------|
| **หน้าที่** | Code ที่ performant, accessible, SEO-optimized |
| **เครื่องมือ** | Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion |
| **ตัดสินใจ** | Component structure, animation performance, responsive breakpoints |

### Role 6: Bilingual Copywriter (TH/EN)
| Item | Detail |
|------|--------|
| **หน้าที่** | Copy ที่สื่อสารชัด ทั้งไทยและอังกฤษ |
| **มุมมอง** | ภาษาราชการที่ทันสมัย ไม่แข็งเกินไป — เข้าใจง่าย จริงใจ |
| **ตัดสินใจ** | Headlines, descriptions, CTA text, micro-copy ทุกหน้า |

---

## 4. Design System — BUILD BOI Aesthetic

### 4.1 Design Principles (ข้อแตกต่างจากเว็บทั่วไป)

| หลักการ | รายละเอียด |
|---------|-----------|
| **Light Theme First** | BTED เป็นเว็บราชการ — ใช้พื้นขาว/เทาอ่อน เป็นหลัก, dark sections เฉพาะ Hero/CTA/Footer |
| **Navy + Gold = Authority** | สี BOI navy (#1B2A4A) = ความน่าเชื่อถือ, gold (#C5A572) = ความเป็นพรีเมียม |
| **Data Clarity** | ข้อมูล Supplier, Statistics, Dashboard ต้องอ่านง่าย ชัดเจน ไม่รก |
| **Purposeful Animation** | ทุก animation ต้องมีเหตุผล — ช่วยนำสายตา ช่วยเข้าใจ hierarchy ไม่ใช่แค่สวย |
| **Government Credibility** | ต้องดู official พอที่จะเป็น boi.go.th แต่ modern พอที่จะ WOW กรรมการ |
| **Bilingual Native** | TH/EN ต้องสวยเท่ากัน layout ไม่แตก font ไม่ล้น |

### 4.2 Color System (ที่ใช้อยู่แล้ว — ห้ามเปลี่ยน)

```
Brand Colors:
  boi-navy:        #1B2A4A  — Primary, header, footer, CTA backgrounds
  boi-navy-light:  #2A3F6A  — Hover states, secondary elements
  boi-navy-dark:   #0F1B33  — Deep dark sections (hero, footer)
  boi-gold:        #C5A572  — Accent, CTA buttons, highlights, premium feel
  boi-gold-light:  #D4B88A  — Gradient partner
  boi-gold-dark:   #A8894D  — Gradient partner

Backgrounds:
  boi-bg:          #F8FAFC  — Page background (light gray)
  boi-card:        #FFFFFF  — Card backgrounds
  boi-border:      #E2E8F0  — Borders, dividers

Text:
  boi-text:        #1E293B  — Primary text (dark)
  boi-text-muted:  #64748B  — Secondary text (gray)

Feed/Category Colors:
  news:     #3B82F6 (blue)
  sourcing: #10B981 (green)
  event:    #F59E0B (amber)
  member:   #8B5CF6 (purple)

Status:
  success: #10B981, warning: #F59E0B, error: #EF4444, info: #3B82F6
```

### 4.3 Typography (ที่ใช้อยู่แล้ว)

```
Primary:     Noto Sans Thai (TH) + Inter (EN) — ผ่าน next/font
Display:     clamp(2rem, 5vw, 3.5rem) — Hero headlines
Heading:     clamp(1.5rem, 3vw, 2.25rem) — Section titles
Subheading:  clamp(1rem, 1.5vw, 1.25rem) — Card titles
Body:        0.875rem-1rem — Content text
```

### 4.4 Animation Tech Stack (ที่มีอยู่แล้ว)

```
Framer Motion 11    — Component animations, scroll reveals, page transitions
Lenis              — Smooth scroll
CSS Keyframes      — Lightweight animations (glow, pulse, float)

Motion Components ที่มีแล้ว:
├── AnimateOnScroll.tsx   — fadeUp, fadeDown, fadeLeft, fadeRight, scale, blur
├── TiltCard.tsx          — 3D perspective tilt + glare
├── CounterMorph.tsx      — Animated number counter
├── TextReveal.tsx        — Text animation on scroll
├── ParallaxLayer.tsx     — Parallax scroll effect
├── StaggerChildren.tsx   — Stagger animation for lists
├── SmoothScrollProvider  — Lenis smooth scroll
├── AnimatedLogo.tsx      — Animated BUILD logo
└── MagneticButton.tsx    — Button with magnetic mouse tracking
```

### 4.5 Premium CSS Utilities (ที่มีอยู่แล้ว)

```
.glass              — Glassmorphism header (blur + transparent)
.glass-card         — Glass effect cards
.glow-border        — Gradient glow border on hover
.card-premium       — Premium card with lift + glow hover
.card-shine         — Shine sweep on hover
.btn-gold-premium   — Gold CTA with sweep animation
.glow-pulse         — Pulsing glow for attention
.animated-border    — Rotating gradient border
.noise-grain        — Subtle texture overlay on dark sections
.dot-grid           — Dot pattern background
.orb / .orb-gold    — Floating orb decorations
.icon-ring          — Animated ring around icons on hover
.icon-bounce        — Icon bounce on card hover
```

---

## 5. Animation & Interaction Spec

### 5.1 Animation Duration Reference

```
ความเร็ว:
  Instant:   100ms  — hover states, button press, focus
  Quick:     200ms  — tab switch, toggle, dropdown
  Normal:    300ms  — card transition, filter change
  Smooth:    400ms  — number counting, progress bar
  Dramatic:  500ms  — hero reveal, page transition
  Reveal:    600ms  — scroll reveal, stagger group
```

### 5.2 Section Animations (ทุกหน้าต้องมี)

| Effect | Trigger | Description | ใช้ Component |
|--------|---------|------------|--------------|
| **Fade Up + Stagger** | Scroll into view | Cards/items โผล่ทีละชิ้น delay 0.1s | AnimateOnScroll + StaggerChildren |
| **Counter Animate** | Scroll into view | ตัวเลขสถิตินับขึ้นจาก 0 (สมาชิก, Supplier, กิจกรรม) | CounterMorph |
| **Text Reveal** | Scroll into view | Headline โผล่ทีละคำ | TextReveal |
| **Parallax Layers** | Scroll position | Background ขยับช้ากว่า foreground | ParallaxLayer |
| **Scale on Scroll** | Scroll position | Card/image scale จากเล็กไปใหญ่ | AnimateOnScroll variant="scale" |

### 5.3 Hover Interactions

```
Hover States (ทุก interactive element):
├── Cards
│   ├── Glass Card: translateY(-4px) + shadow deepen + bg brighten
│   ├── Premium Card: translateY(-6px) + gold glow border + shine sweep
│   └── Tilt Card: 3D perspective tilt + glare effect
├── Buttons
│   ├── Gold Premium: sweep animation + glow increase + scale(1.02)
│   ├── Navy: bg lighten + translateY(-1px)
│   └── Magnetic: button follows cursor slightly
├── Navigation
│   ├── Nav Link: underline slide from left + spring animation
│   └── Active: gradient underline indicator
├── Data Elements
│   ├── Supplier Card: lift + border accent + arrow slide
│   ├── Event Card: scale slightly + date badge pop
│   └── Feed Item: bg tint + action icons appear
└── Icons
    ├── Icon Ring: rotating gradient ring appears
    └── Icon Bounce: scale(1.2) + rotate(-5deg) + bounce back
```

### 5.4 Page Transitions

| Transition | Description |
|-----------|------------|
| **Route Change** | Content fade out 200ms → fade in 300ms with subtle slide up |
| **Language Switch** | Instant swap — ไม่ต้อง animation (ต้องเร็ว) |
| **Modal Open** | Scale from 0.95 + fade in 200ms + backdrop blur |
| **Tab/Filter Switch** | Content crossfade 250ms |

---

## 6. Page-by-Page WOW Spec

### กฎทุกหน้า (ห้ามลืม)

1. **Hero/Banner Section** — ทุกหน้าต้องมี hero ที่สื่อว่าหน้านี้คืออะไร
2. **Scroll Animation ≥3 จุด** — ไม่มีหน้าไหนที่ "นิ่ง" ทั้งหน้า
3. **CTA ชัดเจน** — ทุกหน้าต้องมีปุ่มกระทำหลัก
4. **i18n ครบ** — ทุก text ต้องอยู่ใน messages/th.json + en.json
5. **Responsive** — สวยทั้ง Desktop, Tablet, Mobile
6. **ไม่มี Dead Button** — ทุกปุ่มกดได้ แสดง mock result/modal/toast

---

### 6.1 Homepage `/` (มีแล้ว — ปรับปรุง)

**สถานะ:** ✅ มีแล้วส่วนใหญ่ ต้องปรับเล็กน้อย

| Section | WOW Factor | สิ่งที่ต้องมี |
|---------|-----------|-------------|
| **Hero** | ✦✦✦✦✦ | Slideshow 3 ภาพ + Text reveal + Search bar + 2 CTA + Floating orbs |
| **Stats Bar** | ✦✦✦✦ | 4 metrics animated counter (สมาชิก, Supplier, กิจกรรม/ปี, ประเทศคู่ค้า) |
| **Services Grid** | ✦✦✦✦✦ | Bento grid 6 services + 3D tilt cards + icon bounce + stat badges |
| **Featured Suppliers** | ✦✦✦✦ | 4 supplier cards + readiness score ring + ISO badges |
| **News Feed** | ✦✦✦✦ | Asymmetric grid (1 large + 2 small) + category badges + date |
| **CTA Section** | ✦✦✦✦✦ | Dark navy bg + floating orbs + stats + magnetic CTA button |

---

### 6.2 About / เกี่ยวกับ กพก. `/about` (ใหม่ — TOR 4.4.1)

**สถานะ:** ❌ ยังไม่มี — Priority สูงมาก (ข้อแรกของ TOR)

**Layout Blueprint:**
```
┌────────────────────────────────────────────────┐
│  HERO: Dark navy gradient                      │
│  "กองพัฒนาผู้ประกอบการไทย"                       │
│  subtitle + BOI logo                           │
├────────────────────────────────────────────────┤
│  VISION & MISSION                              │
│  2 glass cards side-by-side                    │
│  วิสัยทัศน์ (ซ้าย) + พันธกิจ (ขวา)              │
├────────────────────────────────────────────────┤
│  ORGANIZATION CHART                            │
│  Animated org tree/hierarchy                   │
│  กลุ่มงาน 4-5 กลุ่ม + ผอ.กพก.                   │
│  Hover → แสดงรายละเอียดแต่ละกลุ่ม              │
├────────────────────────────────────────────────┤
│  STATS / ACHIEVEMENTS                          │
│  4-6 counter cards (animated numbers)          │
│  สมาชิก / กิจกรรม / Business Matching / ปีดำเนิน │
├────────────────────────────────────────────────┤
│  KEY SERVICES                                  │
│  Cards showing services (link to actual pages) │
│  Stagger reveal on scroll                      │
├────────────────────────────────────────────────┤
│  TIMELINE / HISTORY (optional)                 │
│  Horizontal timeline with key milestones       │
├────────────────────────────────────────────────┤
│  CTA: "เข้าร่วมเป็นสมาชิก" → /member/register │
└────────────────────────────────────────────────┘
```

**WOW Elements:**
- Hero: Dark navy gradient + BOI emblem (ดู official แต่ modern)
- Org Chart: Animated connections, hover เห็นรายละเอียด
- Stats: CounterMorph animated numbers
- Stagger reveal ทุก section

---

### 6.3 Interactive Thailand Map `/invest-thailand` (ใหม่ — TOR 4.4.5)

**สถานะ:** ❌ ยังไม่มี — Unique WOW feature

**Layout Blueprint:**
```
┌────────────────────────────────────────────────┐
│  HERO: "ข้อมูลการลงทุนในประเทศไทย"              │
├────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────────────┐    │
│  │              │  │  จังหวัด: กรุงเทพฯ    │    │
│  │  SVG MAP     │  │  Supplier: 245 ราย   │    │
│  │  THAILAND    │  │  อุตสาหกรรม: ยานยนต์  │    │
│  │  77 จังหวัด   │  │  [ดูรายละเอียด →]    │    │
│  │              │  │                      │    │
│  │  Hover =     │  │  Top Industries:     │    │
│  │  highlight   │  │  ▓▓▓▓▓ ยานยนต์ 35%   │    │
│  │  province    │  │  ▓▓▓▓ อิเล็กฯ 28%    │    │
│  │              │  │  ▓▓▓ อาหาร 20%       │    │
│  └──────────────┘  └──────────────────────┘    │
├────────────────────────────────────────────────┤
│  STATS: Total Suppliers / Provinces / Industries│
│  Animated counters                             │
├────────────────────────────────────────────────┤
│  REGION CARDS (ภาคเหนือ/กลาง/อีสาน/ใต้/ตะวันออก)│
│  Quick filter by region                        │
└────────────────────────────────────────────────┘
```

**WOW Elements:**
- SVG Map Thailand: hover จังหวัด → highlight สี + tooltip ข้อมูล
- Click จังหวัด → แสดง detail panel ด้านขวา (supplier count, top industries)
- Color gradient ตามจำนวน supplier (เข้ม = มาก, อ่อน = น้อย)
- Animated transition เมื่อเปลี่ยนจังหวัด
- Region filter cards ด้านล่าง
- ใช้ SVG inline ที่เตรียมไว้ (ไม่ต้อง library แผนที่ external)

**Implementation:**
- SVG path สำหรับ 77 จังหวัด (หา open-source SVG map ไทย)
- Mock data: จำนวน supplier, อุตสาหกรรมหลัก, มูลค่าลงทุน ต่อจังหวัด
- State management: useState สำหรับ selected province
- Animation: Framer Motion สำหรับ panel transitions

---

### 6.4 Interactive World Map `/invest-world` (ใหม่ — TOR 4.4.6)

**สถานะ:** ❌ ยังไม่มี — Unique WOW feature

**Layout Blueprint:**
```
┌────────────────────────────────────────────────┐
│  HERO: "ข้อมูลการลงทุนจากต่างประเทศ"            │
├────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐      │
│  │          WORLD MAP (SVG)             │      │
│  │  ★ Japan  ★ China  ★ USA           │      │
│  │  ★ Germany  ★ Singapore             │      │
│  │  Hover country → highlight + tooltip │      │
│  └──────────────────────────────────────┘      │
│  ┌──────────────────────────────────────┐      │
│  │  Selected: Japan 🇯🇵                 │      │
│  │  Projects: 1,245 | Value: ฿45.2B    │      │
│  │  Top Sectors: Auto, Electronics, Food│      │
│  │  [ดู Supplier ญี่ปุ่น →]              │      │
│  └──────────────────────────────────────┘      │
├────────────────────────────────────────────────┤
│  TOP INVESTOR COUNTRIES                        │
│  Ranked cards with flags + stats               │
│  Stagger animation                             │
├────────────────────────────────────────────────┤
│  INDUSTRY BREAKDOWN                            │
│  Horizontal bar chart (animated)               │
└────────────────────────────────────────────────┘
```

**WOW Elements:**
- Simplified world map SVG (focus on investor countries)
- Hover country → glow highlight + tooltip
- Click → detail panel with investor data
- Country ranking cards with flag emojis + animated progress bars
- Industry breakdown with animated horizontal bars

---

### 6.5 FAQ / Q&A `/faq` (ใหม่ — TOR 4.4.2)

**สถานะ:** ❌ ยังไม่มี

**Layout:**
```
┌────────────────────────────────────────────────┐
│  HERO: "คำถามที่พบบ่อย"                         │
├────────────────────────────────────────────────┤
│  SEARCH BAR: ค้นหาคำถาม                        │
├────────────────────────────────────────────────┤
│  CATEGORY TABS: ทั่วไป | สมาชิก | Matching | Events│
├────────────────────────────────────────────────┤
│  ACCORDION FAQ ITEMS (10-15 ข้อ)               │
│  ▸ คำถาม 1: สมัครสมาชิกอย่างไร?               │
│  ▾ คำถาม 2: Business Matching ทำงานอย่างไร?    │
│    → คำตอบพร้อมลิงก์ไปหน้าที่เกี่ยวข้อง        │
│  ▸ คำถาม 3: ...                               │
├────────────────────────────────────────────────┤
│  "ไม่พบคำตอบ?" → ส่งคำถาม                      │
│  FORM: ชื่อ + Email + คำถาม + CAPTCHA mockup    │
│  [ส่งคำถาม] → success toast                    │
└────────────────────────────────────────────────┘
```

**WOW Elements:**
- Smooth accordion animation (height + opacity)
- Category filtering with animated tab switch
- Stagger reveal for FAQ items
- Form submit → success toast with animation

---

### 6.6 Contact Us `/contact` (ใหม่ — TOR 4.4.22)

**สถานะ:** ❌ ยังไม่มี

**Layout:**
```
┌────────────────────────────────────────────────┐
│  HERO: "ติดต่อเรา"                              │
├────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌──────────────────┐      │
│  │  CONTACT FORM  │  │  CONTACT INFO    │      │
│  │  ชื่อ-นามสกุล    │  │  📍 ที่อยู่ กพก.    │      │
│  │  อีเมล          │  │  📞 02-xxx-xxxx │      │
│  │  หัวข้อ         │  │  ✉ bted@boi.go.th│     │
│  │  ข้อความ        │  │  🕐 จ-ศ 8:30-16:30│    │
│  │  CAPTCHA mockup │  │                  │      │
│  │  [ส่งข้อความ]   │  │  GOOGLE MAP      │      │
│  └────────────────┘  │  (embedded/image) │      │
│                      └──────────────────┘      │
├────────────────────────────────────────────────┤
│  SOCIAL MEDIA LINKS                            │
│  Facebook, LINE OA, Website                    │
└────────────────────────────────────────────────┘
```

**WOW Elements:**
- Split layout: form ซ้าย + info ขวา
- Form validation with floating labels + smooth error states
- Submit → success modal with animation
- Map section (static image or embedded)
- Social links with hover glow

---

### 6.7 Online Survey `/survey` (ใหม่ — TOR 4.4.23)

**สถานะ:** ❌ ยังไม่มี

**Layout:**
```
┌────────────────────────────────────────────────┐
│  HERO: "แบบสำรวจความพึงพอใจ"                    │
├────────────────────────────────────────────────┤
│  SURVEY FORM (Step 1 of 3)                     │
│  Progress bar (animated)                        │
│                                                │
│  Q1: ท่านเป็นสมาชิกประเภทใด?                    │
│      ○ Supplier  ○ Buyer  ○ Both               │
│                                                │
│  Q2: ความพึงพอใจต่อระบบ Business Matching        │
│      ★★★★★ (clickable stars)                    │
│                                                │
│  Q3: ข้อเสนอแนะเพิ่มเติม                        │
│      [textarea]                                │
│                                                │
│  [ถัดไป →]                                      │
├────────────────────────────────────────────────┤
│  (After submit) THANK YOU + RESULTS PREVIEW    │
│  Pie chart / bar chart showing aggregated data  │
│  [Export PDF] [Export Excel] (mock buttons)     │
└────────────────────────────────────────────────┘
```

**WOW Elements:**
- Multi-step form with animated progress bar
- Interactive star rating with animation
- Radio/Checkbox with custom styling + selection animation
- After submit → animated thank you + mock chart results
- Export buttons (click → toast "Downloading...")

---

### 6.8 Supplier Database `/database` (ปรับปรุง)

**สถานะ:** ✅ มีแล้ว — เพิ่ม feature

**เพิ่มเติม:**
- ปุ่ม "ขอข้อมูลเพิ่มเติม" (Request Info) บน Supplier Profile
  - กด → Modal form (ชื่อ, บริษัท, email, ข้อมูลที่ต้องการ)
  - Submit → success toast "ส่งคำขอเรียบร้อย"
- เพิ่ม stats ด้านบน (จำนวน Supplier ทั้งหมด, อุตสาหกรรม, จังหวัด)
- Counter animation สำหรับ stats

---

### 6.9 Business Matching `/matching` (ปรับปรุง)

**สถานะ:** ✅ มีแล้ว — เพิ่ม feature

**เพิ่มเติม:**
- หลัง Step 3 (confirm) → แสดง **Email/SMS Preview Mock**
  - แสดง mock email template: "แจ้งเตือนการนัดหมาย Business Matching"
  - แสดง mock SMS: "คุณมีนัดหมาย Business Matching วันที่..."
  - ทำให้กรรมการเห็นว่า notification system ออกแบบไว้แล้ว
- เพิ่ม note "เจ้าหน้าที่สามารถทำนัดหมายแทนได้" (Admin feature badge)

---

### 6.10 Events Calendar `/events` (ปรับปรุง)

**สถานะ:** ✅ มีแล้ว — เพิ่ม feature

**เพิ่มเติม:**
- หลังกดลงทะเบียน → แสดง **QR Code Mock** (ใช้สำหรับลงทะเบียนหน้างาน)
- แสดง "เหลือ X/Y ที่นั่ง" พร้อม progress bar
- Email confirmation mock template

---

### 6.11 Sourcing & JV `/sourcing` (ปรับปรุง)

**สถานะ:** ✅ มีแล้ว — เพิ่ม feature

**เพิ่มเติม:**
- ปุ่ม "สร้างคำขอใหม่" → Modal form (ชื่อโครงการ, ประเภท, รายละเอียด, อุตสาหกรรม)
- Submit → เพิ่มเข้า list ด้านบน (client-side) + success toast
- ปุ่ม "แจ้งความสนใจ" บนแต่ละ request → modal confirm + toast

---

### 6.12 Feed `/feed` (ปรับปรุง)

**สถานะ:** ✅ มีแล้ว — เพิ่ม feature

**เพิ่มเติม:**
- Comment box: กด comment icon → expand input field + submit
- Share button: กด → dropdown (copy link, Facebook, LINE) + toast "คัดลอกลิงก์แล้ว"
- Like/Bookmark: animated feedback (heart bounce, bookmark fill)

---

### 6.13 Admin Dashboard `/admin` (ปรับปรุง)

**สถานะ:** ✅ มีแล้ว — เพิ่มให้ครบ TOR

**เพิ่มเติม:**
- **Tab: Audit Log** — ตาราง activity log (365 วัน)
  - Filter by: วันที่, ประเภท action, ผู้ใช้
  - Mock data: login, edit content, approve request, register, etc.
  - Pagination
- **Tab: Content Approval** — Draft → Review → Published workflow
  - ตาราง content items + status badge (Draft/Pending/Published)
  - ปุ่ม Approve/Reject (กดได้ → เปลี่ยน status + toast)
- **เพิ่ม KPI:**
  - Conversion funnel: Feed views → Event register → Matching
  - Member growth chart (line chart)
- **Export:** ปุ่ม Export CSV/Excel → toast "Downloading report..."
- **Member Management:** ปุ่ม Report/Block/Suspend (กด → confirm modal → toast)

---

### 6.14 PDPA & Privacy (เพิ่มใหม่)

- **Cookie Consent Banner** — แสดงด้านล่างเมื่อเข้าครั้งแรก
  - "เว็บไซต์นี้ใช้คุกกี้..." + ปุ่มยอมรับ/ตั้งค่า
  - กด "ยอมรับ" → banner slide down + หายไป (เก็บ state ใน localStorage)
- **Privacy Policy Page** `/privacy`
  - เนื้อหา PDPA compliance (mock content)
  - TH/EN bilingual

---

### 6.15 Newsletter Subscription (เพิ่มใหม่ — TOR 4.4.12)

- เพิ่ม email signup form ใน **CTA Section** หรือ **Footer**
- Input: email + ปุ่ม "สมัครรับข่าวสาร"
- Submit → toast "สมัครรับข่าวสารเรียบร้อย"

---

## 7. WOW Checklist — Quality Gate ทุกหน้า

### ทุกหน้าต้องผ่าน 10 ข้อนี้:

| # | Check | Description |
|---|-------|------------|
| 1 | **WOW Moment** | มีอย่างน้อย 1 จุดที่เห็นแล้ว "ว้าว ทันสมัยมาก" |
| 2 | **Scroll Animation** | มี animate-on-scroll อย่างน้อย 3 sections |
| 3 | **Hover Interaction** | ทุก interactive element มี hover feedback ที่ดี |
| 4 | **Visual Hierarchy** | ชัดเจนว่าอะไรสำคัญ — heading, subheading, body, caption |
| 5 | **Brand CI** | สี Navy + Gold ตรงตาม BOI CI 100% |
| 6 | **Bilingual** | ทุก text อยู่ใน i18n — สลับ TH/EN ได้ทันที ไม่แตก layout |
| 7 | **Responsive** | สวยทั้ง Desktop (1280px+), Tablet (768px), Mobile (375px) |
| 8 | **No Dead Buttons** | ทุกปุ่ม/link กดได้ → แสดง result (modal/toast/state change) |
| 9 | **CTA Clear** | มี Call-to-Action หลักที่ชัดเจนทุกหน้า |
| 10 | **Performance** | Animation ไม่ laggy, ไม่กระตุก, respects reduced-motion |

### Government-Specific Checks:

| # | Check | Description |
|---|-------|------------|
| 11 | **Official Tone** | ดูเป็นทางการพอสมควร — ไม่เล่นสนุกเกินไป |
| 12 | **Accessibility** | Focus states, semantic HTML, screen reader friendly |
| 13 | **PDPA Compliant** | มี consent banner, privacy policy link |
| 14 | **WCAG 2.1 AA** | Contrast ratio ≥4.5:1, focus visible, reduced motion |
| 15 | **Lighthouse ≥80** | Performance, Accessibility, Best Practices, SEO |

---

## 8. ห้ามทำ (Design Anti-patterns)

| # | ห้าม | เหตุผล |
|---|------|--------|
| 1 | ❌ ห้ามใช้ Dark Theme เป็นหลัก | เว็บราชการต้อง Light Theme — dark เฉพาะ Hero/CTA/Footer |
| 2 | ❌ ห้ามสร้าง button/feature ที่ไม่ทำงาน | ถ้ายังไม่พร้อม = mock ด้วย toast/modal ไม่ใช่ทิ้งเฉยๆ |
| 3 | ❌ ห้าม animation เยอะจน laggy | ต้องรักษา 60fps — animation ต้อง purposeful |
| 4 | ❌ ห้ามใช้สีนอก Brand CI | Navy + Gold + semantic colors เท่านั้น |
| 5 | ❌ ห้าม layout แตก เมื่อสลับภาษา | Thai text ยาวกว่า English — ต้อง test ทั้ง 2 ภาษา |
| 6 | ❌ ห้าม section ว่างๆ ไม่มี visual | ทุก section ต้องมี icon/image/illustration ประกอบ |
| 7 | ❌ ห้าม generic placeholder text | ใช้ mock data ที่เหมือนจริง (ชื่อบริษัทจริง, ตัวเลขสมจริง) |
| 8 | ❌ ห้าม scroll ยาวไม่มีจุดพัก | ต้องมี visual break ทุก 3-4 sections |
| 9 | ❌ ห้ามเพิ่ม library ใหม่โดยไม่จำเป็น | ใช้ Framer Motion + CSS ที่มีให้เต็มที่ก่อน |
| 10 | ❌ ห้าม hard-code text ใน component | ทุก text ต้องผ่าน next-intl translation |

---

## 9. ต้องทำ (Design Requirements)

| # | ต้องทำ | เหตุผล |
|---|-------|--------|
| 1 | ✅ ทุกหน้ามี scroll-driven animation ≥3 จุด | สร้างความรู้สึก "มีชีวิต" ไม่ใช่ static HTML |
| 2 | ✅ ทุก card มี hover effect ที่น่าจดจำ | Glassmorphism, tilt, glow, shine — เลือกที่เหมาะสม |
| 3 | ✅ ทุกหน้ามี Hero Section | สื่อว่าหน้านี้คืออะไร + visually engaging |
| 4 | ✅ ทุกตัวเลขสถิติมี counter animation | CounterMorph เมื่อ scroll เข้ามา |
| 5 | ✅ ทุก form submit → feedback ทันที | Success toast/modal, ไม่ใช่แค่ console.log |
| 6 | ✅ ทุกหน้ามี CTA ที่ชัดเจน | นำทาง user ไปทำ action ถัดไป |
| 7 | ✅ ใช้ motion components ที่มีอยู่แล้ว | AnimateOnScroll, StaggerChildren, CounterMorph, TiltCard |
| 8 | ✅ Noise grain overlay บน dark sections | สร้าง premium texture |
| 9 | ✅ ทุกหน้ามี breadcrumb หรือ navigation context | User ต้องรู้ตลอดว่าอยู่ตรงไหน |
| 10 | ✅ Mock data ต้องดูสมจริง | ชื่อบริษัทไทย, ตัวเลขที่เป็นไปได้, วันที่ในอนาคต |

---

## 10. Implementation Priority

### Phase 1: Missing Pages (ต้องมีก่อน Presentation)

| # | Task | Impact ต่อคะแนน | Effort |
|---|------|----------------|--------|
| 1 | **About กพก.** | สูงมาก — TOR ข้อแรก | Medium |
| 2 | **Thailand Map Interactive** | สูงมาก — WOW unique | High |
| 3 | **World Map Interactive** | สูงมาก — WOW unique | High |
| 4 | **FAQ / Q&A** | กลาง — ปิดจุดอ่อน | Low |
| 5 | **Contact Us** | กลาง — ปิดจุดอ่อน | Low |
| 6 | **Online Survey** | กลาง — ปิดจุดอ่อน | Medium |

### Phase 2: Feature Enhancements (ได้คะแนนเพิ่ม)

| # | Task | Impact ต่อคะแนน | Effort |
|---|------|----------------|--------|
| 7 | **Admin: Audit Log + Content Approval** | สูง — TOR ระบุชัด | Medium |
| 8 | **Matching: Notification Preview** | สูง — แสดงความครบถ้วน | Low |
| 9 | **Events: QR + Seat Limit** | กลาง — TOR ระบุ | Low |
| 10 | **Sourcing: Create Request Form** | กลาง — ครบ workflow | Low |
| 11 | **Supplier: Request Info** | กลาง — ครบ flow | Low |
| 12 | **Feed: Comment + Share** | ต่ำ — nice to have | Low |

### Phase 3: Polish (ปิดจุดอ่อน)

| # | Task | Impact ต่อคะแนน | Effort |
|---|------|----------------|--------|
| 13 | **PDPA Consent Banner** | กลาง — compliance | Low |
| 14 | **Privacy Policy Page** | กลาง — compliance | Low |
| 15 | **Newsletter Subscription** | ต่ำ — เสริม | Low |
| 16 | **Introduction/Splash Page** | ต่ำ — concept | Low |

---

## 11. Session Start Prompt (สำหรับ AI)

```
คุณคือทีมพัฒนาเว็บระดับ Stripe/Linear ที่ออกแบบเว็บให้หน่วยงานราชการ:
- Creative Director: ทิศทาง visual ที่ modern แต่ official
- Senior UX Designer: User Flow สำหรับ กรรมการ BOI + ผู้ประกอบการ + นักลงทุน
- Senior UI Designer: Premium UI ที่ใช้ boi-navy + boi-gold CI
- Motion Designer: Purposeful animation ด้วย Framer Motion
- Frontend Architect: Next.js 15 + React 19 + TypeScript + Tailwind CSS 4
- Bilingual Copywriter: ไทย/อังกฤษ ภาษาราชการที่ทันสมัย

อ่านไฟล์ก่อนเริ่ม:
1. Docs/wow_buildboi.md (ไฟล์นี้)
2. Docs/SummaryTOR.md (TOR requirements)
3. app/globals.css (design tokens)

กฎสำคัญ:
- นี่คือ Demo — ใช้ mock data ได้ ไม่ต้อง backend จริง
- ทุกปุ่มต้องกดได้ → แสดง mock result (toast/modal/state change)
- Light theme เป็นหลัก — dark เฉพาะ Hero/CTA/Footer
- สี BOI navy (#1B2A4A) + gold (#C5A572) เท่านั้น
- ทุก text ต้องอยู่ใน i18n (messages/th.json + en.json)
- ใช้ motion components ที่มีอยู่แล้ว (AnimateOnScroll, TiltCard, CounterMorph, etc.)
- ทุกหน้าต้อง responsive + สวยทั้ง TH/EN
- Animation ต้อง purposeful — สื่อ professionalism ไม่ใช่แค่สวย
- ห้ามเพิ่ม library ใหม่โดยไม่จำเป็น

Benchmark: ดีกว่า build.boi.go.th ปัจจุบัน
เทียบเท่า Stripe.com / Linear.app / Notion.so
แต่เหมาะสมกับหน่วยงานราชการ (BOI)
```

---

> **"เชื่อมโยงธุรกิจไทยสู่โลก"** — BUILD BOI / BTED Platform
