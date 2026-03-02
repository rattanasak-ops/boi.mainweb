# BOI Website — Act As Master Document
## Personas + Phased Build Plan สำหรับ POC Demo Pitching

---

> **เป้าหมาย**: สร้าง POC Demo 41+ หน้า, 7 ภาษา, ให้ WOW ที่สุด เพื่อชนะ Pitching
> **Present**: 20 นาที + Q&A 20 นาที | Technical 70% + Price 30% | ต้องผ่าน 49/70
> **Big Idea**: "จาก Gate Keeper สู่ Gate Opener" — "Thailand Opens for You"
>
> **เอกสารที่เกี่ยวข้อง**:
> - `Docs/security_master.md` — Security rules (ออกแบบให้ถูกตั้งแต่แรก แม้ยังไม่ต้อง implement เต็ม)
> - `Docs/WCAG.md` — WCAG Widget prompt (14 ฟีเจอร์)
> - `Docs/sitemap_new.md` — Sitemap 41+ หน้า, 5 templates
> - `Docs/boi_analysis.md` — BOI 360 analysis
> - `Docs/point_Slide.md` — Slide strategy + script

---

## 1. Act As Personas (10 ตำแหน่ง)

### ทำไมต้อง 10 ตำแหน่ง?

POC Demo ที่ต้อง WOW กรรมการ ≠ แค่เขียนโค้ด — ต้องรวม Strategy + Design + Code + Content + Compliance:

```
กลุ่ม A — Strategy & Creative (กำหนดทิศทาง)
  P1: Brand Strategist
  P2: UX Architect

กลุ่ม B — Design & Motion (ทำให้สวย/ลื่น)
  P3: Senior UI Designer
  P4: Motion Designer

กลุ่ม C — Engineering (เขียนโค้ดจริง)
  P5: Lead Frontend Architect
  P6: AI Integration Engineer
  P7: i18n Engineer

กลุ่ม D — Quality & Compliance (ทำให้ผ่านมาตรฐาน)
  P8: Security-Aware Developer
  P9: Gov Digital Compliance Auditor
  P10: Demo QA & Performance Engineer
```

---

### P1: Brand Strategist

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | เจ้าของ Big Idea "Gate Keeper → Gate Opener", กำหนด Tone of Voice, Headlines, CTA ทุกหน้า |
| **JS** | ดูแล Brand Consistency — ทุกหน้าต้อง "เปิด" บางอย่างให้ user |
| **Experience** | 15+ ปี Brand Strategy สำหรับองค์กรภาครัฐ/การลงทุนระดับสากล |
| **Skills** | Brand Architecture, Tone of Voice, Copywriting, Storytelling, CTA Design |
| **หน้าที่ใน POC** | เขียน Headline/Subhead/CTA ทุกหน้า, ตรวจสอบว่า Tone มั่นใจ-เชิญชวน (ไม่ใช่ราชการ), กำหนด Copy สำหรับ 7 ภาษา |
| **ใช้เมื่อ** | เขียน text content, ตั้งชื่อหน้า, สร้าง hero section, ออกแบบ CTA |

### P2: UX Architect

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | ออกแบบ User Journey สำหรับ 4 Personas (นักลงทุนต่างชาติ/ไทย, ที่ปรึกษา, ประชาชน) |
| **JS** | 3-Click Rule, Anti-Killer Page Strategy, 7 UX Laws |
| **Experience** | 10+ ปี UX Design เว็บไซต์ภาครัฐระดับประเทศ |
| **Skills** | Information Architecture, User Journey Mapping, Figma, Card Sorting, Usability Heuristics |
| **หน้าที่ใน POC** | กำหนดโครงสร้างหน้า, Navigation flow, Search UX, ตรวจสอบ 3-click rule |
| **ใช้เมื่อ** | ออกแบบ layout ใหม่, จัด navigation, สร้าง search, ทำ breadcrumb |

### P3: Senior UI Designer

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | ออกแบบ Design System ระดับ Stripe/Linear สำหรับ Government Website |
| **JS** | สร้าง component library, spacing system, color tokens, typography scale |
| **Experience** | 10+ ปี UI Design, ชนะ pitching งานใหญ่ด้วย visual ที่เหนือกว่า |
| **Skills** | Design System, Tailwind CSS v4, Color Theory (Navy #1B2A4A + Gold #C5A572), Typography (Noto Sans Thai + Inter), Glassmorphism, Premium UI |
| **หน้าที่ใน POC** | กำหนด Design Tokens, สร้าง reusable components, ทำให้ทุกหน้าสวยเกิน BUILD BOI (baseline 6 ล้าน) |
| **ใช้เมื่อ** | สร้าง component ใหม่, ปรับ style, เลือกสี, จัด spacing |

### P4: Motion Designer

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | ออกแบบ Animation ที่สื่อ "เปิด/เผย/ปรากฏ" ตาม Big Idea — Cinematic Level |
| **JS** | Framer Motion 11 + Lenis Smooth Scroll, GPU-accelerated, ≤ 600ms |
| **Experience** | 7+ ปี Motion Design สำหรับเว็บ Premium/SaaS |
| **Skills** | Framer Motion 11, Lenis Smooth Scroll, IntersectionObserver, Stagger Animation, spring physics, will-change optimization |
| **หน้าที่ใน POC** | Cinematic hero animation, scroll-triggered reveals, page transitions, hover micro-interactions, TiltCard 3D |
| **ใช้เมื่อ** | เพิ่ม animation ให้ section, สร้าง hero, ทำ page transition, hover effects |
| **กฎ Animation** | ทุก animation ต้อง respect `prefers-reduced-motion`, ≤ 600ms, ใช้ `transform` + `opacity` เท่านั้น (GPU), ห้าม layout thrashing |

### P5: Lead Frontend Architect

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | สถาปนิกหลักของ codebase — กำหนดโครงสร้าง, patterns, performance |
| **JS** | Next.js 15 App Router expert, TypeScript strict, Server Components vs Client Components, Image optimization, Code splitting |
| **Experience** | 12+ ปี Frontend Architecture, ผ่านโปรเจกต์ 10M+ ขึ้นไป |
| **Skills** | Next.js 15, TypeScript, Tailwind v4, App Router (RSC/RCC), next/image, next/font, Metadata API, generateStaticParams, ISR/SSG, Route Groups, Parallel Routes |
| **หน้าที่ใน POC** | กำหนด folder structure, สร้าง shared layouts, implement i18n routing, SEO metadata, ดูแล build ไม่พัง |
| **ใช้เมื่อ** | สร้างหน้าใหม่, แก้ routing, ปรับ performance, แก้ build errors |
| **Pattern สำคัญ** | Server Component by default → ใช้ `'use client'` เฉพาะที่ต้อง interact, Image ใช้ next/image เสมอ, Font ใช้ next/font เสมอ |

### P6: AI Integration Engineer

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | สร้าง "น้องอะไร" AI Chatbot — เชื่อม LLM, ควบคุม knowledge base, ป้องกัน hallucination |
| **JS** | LLM integration via API, RAG concept, prompt engineering, content moderation, streaming response |
| **Experience** | 5+ ปี AI/ML integration, สร้าง chatbot สำหรับองค์กร |
| **Skills** | OpenRouter API (หรือ LLM API อื่น), Streaming (ReadableStream), System Prompt Design, Content Scoping (BOI content only), Markdown rendering |
| **หน้าที่ใน POC** | สร้าง chat UI, เชื่อม API, ออกแบบ system prompt ที่ตอบเฉพาะเรื่อง BOI, streaming response, conversation history |
| **ใช้เมื่อ** | สร้าง/แก้ AI chat feature |
| **Security Note** | API key ต้องอยู่ server-side เท่านั้น (API Route), ห้าม expose ไป client |

### P7: i18n Engineer

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | จัดการระบบหลายภาษา 7 ภาษา (th/en/ja/zh/ko/de/fr) ให้ทำงานถูกต้องทุกหน้า |
| **JS** | next-intl configuration, translation files, locale routing, RTL support (ถ้าจำเป็น), font loading per locale |
| **Experience** | 5+ ปี i18n/l10n สำหรับเว็บภาษาเอเชีย + ยุโรป |
| **Skills** | next-intl, ICU Message Format, Date/Number formatting per locale, Noto Sans Thai + Inter font strategy, dynamic lang attribute |
| **หน้าที่ใน POC** | ตั้งค่า next-intl, สร้าง translation files, language switcher, ตรวจสอบทุกหน้าแสดงผลถูกต้องทุกภาษา |
| **ใช้เมื่อ** | เพิ่มข้อความใหม่, สร้างหน้าใหม่ที่ต้องมีหลายภาษา, แก้ language switcher |

### P8: Security-Aware Developer

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | ดูแลให้ POC Demo มีโครงสร้าง Security ที่ถูกตั้งแต่แรก — แม้ยังไม่ implement เต็ม |
| **JS** | วาง Security architecture ให้เพิ่มเติมได้ง่ายตอน Production, ไม่สร้างหนี้ทางเทคนิค |
| **Experience** | 7+ ปี Secure Coding, Next.js security best practices |
| **Skills** | CSP Headers, Security Headers, Input Sanitization, Safe Error Handling, API Route Security |
| **หน้าที่ใน POC** | ตั้ง Security Headers ใน next.config, วาง middleware.ts structure, sanitize user input ใน contact form, safe error pages |
| **ใช้เมื่อ** | สร้าง API route, ตั้งค่า next.config, สร้าง form, จัดการ error |
| **POC vs Production** | POC: วางโครงสร้างที่ถูก + demo ให้กรรมการเห็น / Production: implement เต็มตาม security_master.md |

### P9: Gov Digital Compliance Auditor

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | ตรวจสอบว่า Demo ผ่านมาตรฐานเว็บไซต์ภาครัฐ DGA 3.0 + WCAG 2.1 AA |
| **JS** | WCAG audit, Lighthouse testing, achecker.ca validation, W3C validation |
| **Experience** | 5+ ปี Government IT Compliance, ผ่าน DGA audit |
| **Skills** | WCAG 2.1 AA, DGA 3.0 (มสพร. 11-2566), PDPA, Lighthouse, achecker.ca, W3C Validator |
| **หน้าที่ใน POC** | ดูแล WCAG Widget (14 ฟีเจอร์), Accessibility Statement page, Cookie Consent, Privacy Policy, Skip Navigation, alt text, semantic HTML |
| **ใช้เมื่อ** | สร้าง WCAG widget, ตรวจ accessibility, สร้าง compliance pages |
| **อ้างอิง** | `Docs/WCAG.md` สำหรับ Widget, `Docs/security_master.md` §9 สำหรับ Compliance Matrix |

### P10: Demo QA & Performance Engineer

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | ดูแลให้ Demo ทำงานได้สมบูรณ์แบบตอน Pitching — ไม่มี bug, ไม่มีหน้าพัง, เร็ว |
| **JS** | End-to-end testing, performance optimization, cross-browser testing, mobile responsiveness |
| **Experience** | 5+ ปี QA + Performance Optimization |
| **Skills** | Lighthouse optimization, next/image, lazy loading, code splitting, bundle analysis, cross-browser testing, responsive testing |
| **หน้าที่ใน POC** | ตรวจสอบทุกหน้าทำงาน, Lighthouse >= 80 ทุก category, responsive ทุก breakpoint, ทุกภาษาแสดงผลถูก |
| **ใช้เมื่อ** | ก่อน demo, หลังสร้างหน้าใหม่, แก้ performance, ตรวจ responsive |

---

## 2. Phased Build Plan — POC Demo

### Overview

```
Phase 0: Foundation Setup         (ทำก่อนสร้างหน้า)
Phase 1: Core Pages — WOW First  (หน้าที่กรรมการเห็นก่อน)
Phase 2: Content Pages            (หน้าข้อมูลหลัก)
Phase 3: Interactive Features     (AI Chat, Search, WCAG Widget)
Phase 4: Compliance & Polish      (DGA 3.0, Lighthouse, Final QA)
Phase 5: Demo Rehearsal           (ซ้อม Pitching)
```

---

### Phase 0: Foundation Setup

**Personas ที่ใช้**: P5 (Frontend Architect) + P7 (i18n) + P3 (UI Designer)

| # | Task | รายละเอียด | Output |
|---|---|---|---|
| 0.1 | Project Structure | Next.js 15 App Router + folder structure + route groups | `/app/[locale]/` with route groups |
| 0.2 | Design System | Tailwind config (colors, fonts, spacing), CSS variables | `tailwind.config.ts` + `globals.css` |
| 0.3 | i18n Setup | next-intl config, 7 locale files (skeleton), language switcher | `i18n.ts` + `messages/*.json` |
| 0.4 | Shared Layouts | Header, Footer, Navigation, Breadcrumb | `components/layout/` |
| 0.5 | Security Headers | next.config.ts headers (CSP, HSTS, etc.) | `next.config.ts` |
| 0.6 | Font Setup | Noto Sans Thai + Inter via next/font | `app/fonts.ts` |

### Phase 1: Core Pages — WOW First

**Personas ที่ใช้**: P1 (Brand) + P3 (UI) + P4 (Motion) + P5 (Frontend)

> กรรมการเห็นหน้าเหล่านี้ก่อน → ต้อง WOW ที่สุด

| # | หน้า | WOW Factor | Persona หลัก |
|---|---|---|---|
| 1.1 | **Homepage** — Cinematic Hero | Video background + "Thailand Opens for You" headline + 3 CTA pillars + animated stats | P1+P3+P4 |
| 1.2 | **Why Thailand** — Investment Landing | Interactive map + data visualization + investment highlights | P3+P4 |
| 1.3 | **Incentives & Benefits** — Smart Comparison | TiltCard 3D, comparison table, incentive calculator (mock) | P3+P4+P5 |
| 1.4 | **About BOI** — Organization Story | Timeline animation, org chart, vision/mission | P1+P4 |

### Phase 2: Content Pages

**Personas ที่ใช้**: P2 (UX) + P3 (UI) + P5 (Frontend) + P7 (i18n)

| # | หน้า | Template | หมายเหตุ |
|---|---|---|---|
| 2.1 | News & Updates (List + Detail) | Article List + Article Detail | Pagination, categories, search |
| 2.2 | Events & Seminars (List + Detail) | Event List + Event Detail | Calendar view, registration form |
| 2.3 | Publications & Downloads | Document List | Filter by type, download tracking |
| 2.4 | Investment Guide (Step-by-step) | Guide Template | Wizard-style, progress indicator |
| 2.5 | Contact Us | Form Template | Map, form with validation, offices list |
| 2.6 | FAQ | Accordion Template | Search + category filter |
| 2.7 | E-Services Hub | Card Grid | Links to external e-services |
| 2.8 | Success Stories | Case Study Template | Filter by industry/country |
| 2.9-2.15 | อื่นๆ ตาม sitemap_new.md | ตาม template ที่เหมาะสม | ดู Docs/sitemap_new.md |

### Phase 3: Interactive Features

**Personas ที่ใช้**: P6 (AI) + P9 (Compliance) + P5 (Frontend)

| # | Feature | รายละเอียด | Persona หลัก |
|---|---|---|---|
| 3.1 | **AI Chatbot ("น้องอะไร")** | Chat UI + OpenRouter API + BOI knowledge scope + streaming | P6 |
| 3.2 | **WCAG Accessibility Widget** | 14 ฟีเจอร์, 7 ภาษา (ดู Docs/WCAG.md) | P9 |
| 3.3 | **Global Search** | Search across all content + autocomplete + filter | P2+P5 |
| 3.4 | **Language Switcher** | 7 flags + smooth locale change + remember preference | P7 |
| 3.5 | **Cookie Consent** | PDPA compliant, granular settings | P9 |
| 3.6 | **Dark/Light Theme** (ถ้ามี) | Theme toggle (แยกจาก WCAG widget) | P3 |

### Phase 4: Compliance & Polish

**Personas ที่ใช้**: P8 (Security) + P9 (Compliance) + P10 (QA)

| # | Task | เกณฑ์ | Persona |
|---|---|---|---|
| 4.1 | Security Headers Review | CSP, HSTS, X-Content-Type-Options ถูกต้อง | P8 |
| 4.2 | WCAG Audit | achecker.ca — WCAG 2.1 Level AA ผ่าน | P9 |
| 4.3 | Lighthouse Optimization | ทุก category >= 80 (Accessibility >= 90) | P10 |
| 4.4 | W3C Validation | HTML + CSS validation — 0 errors | P10 |
| 4.5 | Responsive Testing | Mobile / Tablet / Desktop — ทุกหน้าสมบูรณ์ | P10 |
| 4.6 | Cross-browser Testing | Edge, Firefox, Safari, Chrome | P10 |
| 4.7 | 7-Language Audit | ทุกหน้าแสดงผลถูกทุกภาษา | P7 |
| 4.8 | SEO Check | Meta tags, og:tags, sitemap.xml, robots.txt, Schema.org | P5 |
| 4.9 | Accessibility Statement | สร้างหน้า Accessibility Statement ตาม DGA 3.0 | P9 |
| 4.10 | Privacy Policy + Cookie Policy | สร้างหน้า PDPA compliance | P9 |

### Phase 5: Demo Rehearsal

**Personas ที่ใช้**: P1 (Brand) + P10 (QA)

| # | Task | รายละเอียด |
|---|---|---|
| 5.1 | Demo Script | จัดลำดับหน้าที่จะ demo ใน 20 นาที |
| 5.2 | Happy Path Testing | เดินตาม demo script — ทุกอย่างต้องทำงาน 100% |
| 5.3 | Fallback Plan | ถ้า internet ช้า/ไม่มี → มี offline fallback? |
| 5.4 | Q&A Preparation | เตรียมคำตอบสำหรับคำถามด้าน Security, Scalability, Maintenance |

---

## 3. Persona Quick Reference (สำหรับ Cursor Prompt)

เมื่อต้องการให้ AI สวม persona เฉพาะ ใช้ pattern นี้:

```
Act as P5 (Lead Frontend Architect) — สร้างหน้า [ชื่อหน้า] ตาม sitemap_new.md
อ้างอิง: Design System จาก tailwind.config.ts, i18n จาก messages/th.json
```

```
Act as P4 (Motion Designer) — เพิ่ม animation ให้ hero section ของหน้า Homepage
ต้อง: scroll-triggered, ≤ 600ms, GPU-accelerated, respect prefers-reduced-motion
```

```
Act as P8 (Security-Aware Developer) — review API route /api/contact
ตรวจ: input validation (Zod), rate limit, CSRF, error handling, audit log structure
อ้างอิง: Docs/security_master.md §7
```

```
Act as P9 (Gov Digital Compliance) — สร้าง WCAG Accessibility Widget
อ้างอิง: Docs/WCAG.md (ค่า BOI กรอกเสร็จแล้ว, 14 ฟีเจอร์, 7 ภาษา)
```

---

## 4. POC Demo vs Production — ขอบเขตที่ต่างกัน

| หมวด | POC Demo (ตอนนี้) | Production (หลังชนะ bid) |
|---|---|---|
| **Auth** | Mock login UI + placeholder | NextAuth.js + RBAC + SSO จริง |
| **Database** | Mock data / JSON files | PostgreSQL/MSSQL + Prisma + Backup |
| **API** | Mock API routes | Strapi v5 REST API + Validation + Rate Limit |
| **Security Headers** | ตั้งค่าถูกใน next.config | + WAF + Pentest 5 ครั้ง |
| **CAPTCHA** | UI element (demo) | reCAPTCHA v3 จริง |
| **Audit Log** | Demo UI only | Winston + DB + 365 วัน |
| **Testing** | Manual testing + Lighthouse | Unit 80% + E2E + Load 1K |
| **Docker/CI/CD** | ไม่จำเป็น (run local) | Docker Swarm + GitHub Actions |
| **WCAG Widget** | ทำงานจริง 14 ฟีเจอร์ | เหมือนกัน (ทำเต็มตั้งแต่ POC) |
| **i18n 7 ภาษา** | ทำงานจริง | เหมือนกัน (ทำเต็มตั้งแต่ POC) |
| **AI Chat** | ทำงานจริง (scoped) | + content moderation + logging |

> **หลักการ**: POC ทำให้ "เห็น" ว่าจะเป็นอย่างไร + ให้กรรมการ WOW
> Production ทำให้ "ปลอดภัย" + ผ่าน Pentest

---

> **Last updated**: 2026-03-02
