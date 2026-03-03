# BOI Web — Page Template Standard
## มาตรฐานจากหน้า Home สำหรับใช้ซ้ำทุกหน้า

---

## 1. Design Tokens (ค่าคงที่ที่ใช้ทุกหน้า)

```tsx
// ── Easing มาตรฐาน ──
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Brand Shape (มุมตัด chamfered) ──
const BRAND_SHAPE = "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)";
const BRAND_SHAPE_SM = "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)";
```

### สี (Tailwind tokens จาก globals.css)
| Token | Value | ใช้กับ |
|---|---|---|
| `navy-600` | `#1B2A4A` | Heading บน light BG |
| `navy-900` | `#0c1226` | Dark section BG |
| `navy-950` | `#070b17` | Deep dark panels |
| `gold-400` | `#cfac63` | Icons, accents |
| `gold-500` | `#C5A572` | Brand gold, CTA, lines |
| `gold-600` | `#b08f5c` | Gold บน light BG |
| `surface` | `#F8FAFC` | Light section BG |
| `text-secondary` | `#475f8f` | Body text on light |
| `text-muted` | `#94a3b8` | Meta text, dates |

---

## 2. Section Shell (โครงสร้างทุก section)

```tsx
<section className="relative py-24 sm:py-32 [bg-class] overflow-hidden">
  {/* Background layer */}
  {/* Overlay layers */}

  <div className="relative z-10 mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-20">
    {/* Section header */}
    {/* Content */}
  </div>

  {/* Bottom diagonal transition (optional) */}
  <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
    <svg viewBox="0 0 1600 100" preserveAspectRatio="none"
         className="block w-full h-[60px] sm:h-[80px] lg:h-[100px]" aria-hidden="true">
      <polygon points="0,100 1600,100 0,0" className="fill-[next-section-bg]" />
    </svg>
  </div>
</section>
```

---

## 3. Section Header (ส่วนหัวมาตรฐาน)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: EASE_OUT }}
>
  {/* Eyebrow label */}
  <p className="text-gold-[400|600] font-medium text-sm tracking-[0.25em] uppercase mb-4">
    {t("subtitle")}
  </p>

  {/* Main heading */}
  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[white|navy-600] tracking-tight">
    {t("title")}
  </h2>

  {/* Gold underline */}
  <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-gold-500 to-transparent" />
</motion.div>
```

---

## 4. Animation Patterns

### Scroll-triggered entrance (ใช้ทุก element)
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
>
```

### Stagger children
```tsx
transition={{ duration: 0.7, delay: 0.1 * index, ease: EASE_OUT }}
```

### Gold line draw
```tsx
initial={{ scaleX: 0 }}
whileInView={{ scaleX: 1 }}
transition={{ duration: 1.2, delay: 0.3, ease: EASE_OUT }}
```

### Eyebrow letter spacing
```tsx
initial={{ opacity: 0, letterSpacing: "0.5em" }}
whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
```

### Parallax background
```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
```

---

## 5. Section Background Variants

| ประเภท | Classes |
|---|---|
| **Dark** | `bg-navy-950/[60-85]` + gradient + `NoiseGrain opacity={0.025}` |
| **Light** | `bg-surface` + gold wash: `bg-gradient-to-bl from-gold-100/40 via-gold-50/20 to-transparent` |
| **White** | `bg-white` |
| **Dark + Image** | `Image fill` + `bg-navy-950/80` + `FloatingOrbs` + `NoiseGrain` |

### Glass panel
```tsx
className="p-8 sm:p-10 lg:p-14 bg-navy-950/60 backdrop-blur-2xl border border-white/[0.07] shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
style={{ clipPath: BRAND_SHAPE }}
```

---

## 6. Component Patterns

### Icon badge
```tsx
<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/20 border border-gold-400/30 backdrop-blur-sm">
  <Icon className="h-5 w-5 text-gold-400" aria-hidden="true" />
</div>
```

### Card hover (image zoom)
```tsx
className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
```

### Learn more link (hover reveal)
```tsx
className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
```

---

## 7. Image Pipeline (ทุกรูปต้องผ่าน)

### ก่อนใส่รูปใหม่เข้า project:
```bash
npm run resize <input-path> public/images/[folder]/[name].jpg
```

### Batch optimize ทั้ง project:
```bash
npm run optimize
```

### EEC Color Grading (ใส่อัตโนมัติ):
- Brightness +3%
- Saturation +20%
- Contrast +15%
- Warm gamma tint
- Sharpening (sigma: 1.0)

### ขนาดรูป:
- `hero/`, `stats/`, `cta/` → max 1920px
- อื่นๆ → max 1200px
- Target: < 500KB per image

### ใช้ใน component:
```tsx
<Image
  src="/images/[folder]/[name].jpg"
  alt={t("alt_text")}  // ห้าม hardcode
  fill
  className="object-cover"
  sizes="100vw"  // ปรับตาม context
  aria-hidden="true"  // ถ้าเป็น decorative
/>
```

---

## 8. i18n Rules

- ทุก text ต้องผ่าน `useTranslations()` — ห้าม hardcode
- Translation key structure: `[page].[section].[key]`
- ต้องเพิ่มใน **ทุก 7 locale files**: th, en, ja, zh, ko, de, fr
- ใช้ ICU Message Format สำหรับ variables: `{year}`, `{count}`

---

## 9. Page Template (สำหรับสร้างหน้าใหม่)

```tsx
// src/app/[locale]/[section]/[page]/page.tsx
import SectionA from "@/components/sections/[section]/SectionA";
import SectionB from "@/components/sections/[section]/SectionB";

export default function PageName() {
  return (
    <div className="flex flex-col">
      <SectionA />
      <SectionB />
      {/* ... */}
    </div>
  );
}
```

### Checklist ก่อนส่งงาน:
- [ ] ทุก text ผ่าน i18n
- [ ] รูปผ่าน `npm run resize` + `npm run optimize`
- [ ] `aria-hidden="true"` บน decorative images
- [ ] BRAND_SHAPE ใช้กับ cards/panels
- [ ] EASE_OUT ใช้กับทุก animation
- [ ] Responsive: mobile → tablet → desktop
- [ ] เปิดดูหน้าจริงแล้วใช้งานได้

---

*สร้างจากมาตรฐานหน้า Home — BOI Web Main POC Demo*
*Last updated: 2026-03-03*
