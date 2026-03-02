# UX/UI Redesign Strategy
## BTED Platform — BOI กองพัฒนาผู้ประกอบการไทย
### "คนโง่ๆ ก็ใช้ได้ — เห็นแล้วเข้าใจ WOW ง่าย"

---

## สารบัญ

1. [Roles & Act As — ทีมเสมือนที่ทำงานจริง](#1-roles--act-as)
2. [ทฤษฎี UX/UI ที่อ้างอิง (7 Laws)](#2-ทฤษฎี-uxui-ที่อ้างอิง)
3. [วิเคราะห์ปัญหา UX ระบบเก่า (จากคู่มือ 13 หน้า)](#3-วิเคราะห์ปัญหา-ux-ระบบเก่า)
4. [Design Philosophy: One Click / 3 Click Buy](#4-design-philosophy)
5. [UX Redesign — ทุก Flow ใหม่](#5-ux-redesign-ทุก-flow-ใหม่)
6. [Design System & Visual Direction](#6-design-system)
7. [WCAG 2.1 AA & Accessibility](#7-wcag-21-aa)
8. [Best Practice References](#8-best-practice-references)
9. [Implementation Priority](#9-implementation-priority)

---

## 1. Roles & Act As

### ทำไมต้องกำหนด Roles?

งานนี้ซับซ้อนเกินกว่าจะทำด้วยมุมมองเดียว ผมจะ **Act As** หลายตำแหน่งพร้อมกัน โดยแต่ละตำแหน่งจะรับผิดชอบมุมมองเฉพาะทาง:

---

### Role 1: UX Lead / UX Strategist

**JD:** กำหนดทิศทาง UX ทั้งระบบ วิเคราะห์ User Journey, Pain Points, สร้าง Information Architecture

**JS (Job Specification):**
- ประสบการณ์ 8+ ปี ด้าน UX Design สำหรับ B2B/Enterprise Platform
- เชี่ยวชาญ User Research, Persona Creation, Journey Mapping
- เข้าใจ Cognitive Psychology (Hick's Law, Miller's Law, Fitts's Law)
- มีผลงาน B2B Marketplace หรือ Government Digital Platform

**Skills:** User Research, Information Architecture, Wireframing, Usability Testing, A/B Testing

**หน้าที่ในโปรเจกต์นี้:**
- วิเคราะห์ปัญหา UX จากระบบเก่า (คู่มือ 13 หน้า)
- ออกแบบ User Flow ใหม่ทั้ง 7 flows ตาม "One Click / 3 Click" principle
- กำหนด Information Architecture (IA) ของทั้งเว็บ
- Validate ทุก design decision ด้วยทฤษฎี UX ที่อ้างอิงได้

---

### Role 2: UI Designer / Visual Designer

**JD:** ออกแบบ Visual Design, Component Library, สร้าง Design System ที่สอดคล้องกับ BOI Brand

**JS:**
- ประสบการณ์ 5+ ปี ด้าน UI Design สำหรับ Web Application
- เชี่ยวชาญ Tailwind CSS, Design Tokens, Responsive Design
- มีความรู้ Typography (Thai + English bilingual), Color Theory
- เข้าใจ Aesthetic-Usability Effect และ Visual Hierarchy

**Skills:** Figma/Sketch, Design System, Tailwind CSS, Motion Design, Responsive Patterns

**หน้าที่ในโปรเจกต์นี้:**
- กำหนด Design System (สี, ฟอนต์, spacing, components)
- ออกแบบ UI Components ที่ re-usable (buttons, cards, forms, modals)
- สร้าง Visual Hierarchy ที่ชัดเจนในทุกหน้า
- ควบคุม Brand Consistency (BOI Navy #1B2A4A + Gold #C5A572)

---

### Role 3: Interaction Designer / Motion Designer

**JD:** ออกแบบ Micro-interactions, Transitions, Animation ที่สร้างความรู้สึก "WOW" และ "Responsive"

**JS:**
- ประสบการณ์ 3+ ปี ด้าน Interaction Design / Motion Design
- เชี่ยวชาญ Framer Motion, CSS Animations, Lottie
- เข้าใจ Doherty Threshold (< 400ms response)
- มีความรู้ด้าน Perceived Performance และ Skeleton Loading

**Skills:** Framer Motion, GSAP, Lottie, Skeleton Screens, Optimistic UI

**หน้าที่ในโปรเจกต์นี้:**
- ออกแบบ transition ระหว่าง steps (form wizard animations)
- สร้าง micro-interactions สำหรับปุ่ม, cards, notifications
- ออกแบบ loading states (skeleton screens, shimmer effects)
- ใช้ optimistic updates สำหรับ "One Click" actions

---

### Role 4: Frontend Architect / Senior Developer

**JD:** ตัดสินใจด้าน Technical Architecture, Component Structure, State Management, Performance

**JS:**
- ประสบการณ์ 7+ ปี ด้าน Frontend Development
- เชี่ยวชาญ Next.js 15+, React 19, TypeScript, Tailwind CSS 4
- เข้าใจ SSR/SSG/ISR strategies, Code Splitting, Bundle Optimization
- มีความรู้ด้าน Web Vitals (LCP, FID, CLS) และ Lighthouse Optimization

**Skills:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Performance Optimization

**หน้าที่ในโปรเจกต์นี้:**
- กำหนด Component Architecture ที่ scalable
- เลือก State Management pattern ที่เหมาะสม
- Optimize Lighthouse score ≥ 80 ตาม TOR
- Implement Responsive Patterns (Mobile-First)

---

### Role 5: Accessibility Specialist (a11y)

**JD:** ตรวจสอบและรับรองว่าทุก component ผ่าน WCAG 2.1 AA

**JS:**
- ประสบการณ์ 3+ ปี ด้าน Web Accessibility
- เข้าใจ WCAG 2.1, ARIA, Screen Reader Compatibility
- มีความรู้ TWCAG 2010 (Thai Web Content Accessibility Guidelines)
- เคยทำ accessibility audit สำหรับ Government Website

**Skills:** WCAG 2.1, ARIA, axe-core, Lighthouse Accessibility, Screen Reader Testing

**หน้าที่ในโปรเจกต์นี้:**
- ตรวจสอบ Color Contrast Ratio (≥ 4.5:1)
- เพิ่ม ARIA labels, roles, semantic HTML
- ทดสอบ Keyboard Navigation ทุก flow
- รับรอง Touch Target Size ≥ 44x44px

---

### Role 6: B2B Product Strategist

**JD:** มองภาพรวมจากมุม Business — ว่า UX ที่ออกแบบจะตอบโจทย์ธุรกิจจริงหรือไม่

**JS:**
- ประสบการณ์ 5+ ปี ใน B2B Marketplace / Trade Platform
- เข้าใจ Buyer-Supplier dynamics, Lead Generation, Conversion Funnel
- รู้จักคู่แข่ง (Alibaba, IndiaMART, ThomasNet, Global Sources)
- มีความรู้ด้าน BOI, Thai Manufacturing Sector, Global Supply Chain

**Skills:** Product Strategy, Competitive Analysis, Conversion Optimization, B2B Sales Funnel

**หน้าที่ในโปรเจกต์นี้:**
- Validate ว่าทุก UX flow สนับสนุน business goal (Matching, Leads, Registration)
- เปรียบเทียบกับคู่แข่งระดับโลก
- กำหนด KPIs สำหรับวัดผลความสำเร็จของ UX ใหม่
- ตรวจสอบว่า "One Click" concept ตอบโจทย์ทั้ง Buyer และ Supplier

---

## 2. ทฤษฎี UX/UI ที่อ้างอิง

### "7 Laws of UX" ที่ใช้ในโปรเจกต์นี้

> อ้างอิงจาก: [Laws of UX](https://lawsofux.com/) โดย Jon Yablonski

---

### Law 1: Hick's Law (กฎของฮิก)

> "ยิ่งมีตัวเลือกมาก ยิ่งตัดสินใจนาน"

**ทฤษฎี:** เวลาในการตัดสินใจเพิ่มขึ้นแบบ logarithmic ตามจำนวนตัวเลือก

**การใช้งานจริง:**

| จุดที่ใช้ | เก่า (ปัญหา) | ใหม่ (แก้ไข) |
|-----------|-------------|-------------|
| Navigation | 8+ เมนูหลัก + submenu ซ้อน 3 ชั้น | 5-6 เมนูหลัก, Mega Menu ที่จัดกลุ่มชัด |
| Registration | เลือกประเภทสมาชิก + กรอกทุกฟิลด์พร้อมกัน | Step-by-step wizard, 3-5 fields/step |
| Supplier Search | แสดงทุก filter พร้อมกัน | Smart filters: แสดง 5 filters หลัก + "More" |
| Homepage | หลาย sections, ไม่รู้จะทำอะไรก่อน | Search Bar ใหญ่ ๆ เป็นจุดเด่น = 1 action ชัดเจน |

---

### Law 2: Fitts's Law (กฎของฟิตส์)

> "ปุ่มยิ่งใหญ่ ยิ่งอยู่ใกล้ = ยิ่งกดง่าย"

**ทฤษฎี:** เวลาในการเคลื่อนไปยังเป้าหมายขึ้นกับ ระยะทาง/ขนาดของเป้าหมาย

**การใช้งานจริง:**
- CTA Buttons: ขนาด minimum 48x48px (mobile), สี Gold #C5A572 โดดเด่น
- "Contact Supplier" ปุ่ม sticky อยู่ด้านล่าง mobile screen ตลอด
- Form Submit: ปุ่ม "Next" อยู่ thumb zone (มุมขวาล่าง)
- Floating Action Button: สำหรับ "Request Quote" / "Chat"

---

### Law 3: Jakob's Law (กฎของจาคอบ)

> "ผู้ใช้คาดหวังว่าเว็บคุณจะทำงานเหมือนเว็บอื่นที่คุ้นเคย"

**ทฤษฎี:** ใช้เวลาส่วนใหญ่อยู่บนเว็บอื่น → คาดหวัง pattern เดียวกัน

**การใช้งานจริง:**
- Layout: Search bar บน + Categories ซ้าย + Cards กลาง (แบบ Alibaba)
- Login: Email/Password + Social Login (Google, LinkedIn) ตาม pattern สากล
- Profile: Company Overview → Products → Certifications → Contact (แบบ Alibaba Storefront)
- Inquiry Basket: ใช้ icon ตะกร้า มุมขวาบน ตาม mental model ทั่วไป

---

### Law 4: Miller's Law (กฎของมิลเลอร์)

> "จำได้ทีละ 7 ± 2 อย่าง"

**ทฤษฎี:** Working Memory จำกัดที่ ~7 chunks ในเวลาเดียวกัน

**การใช้งานจริง:**
- Navigation: ไม่เกิน 7 items ในเมนูหลัก
- Form Steps: แต่ละ step มี 3-5 fields (ไม่เกิน 7)
- Product Card: แสดงข้อมูล 5-6 ชิ้น (รูป, ชื่อ, อุตสาหกรรม, จังหวัด, Readiness Score, CTA)
- Filter Groups: แต่ละกลุ่มแสดง 5-7 options + "Show More"

---

### Law 5: Tesler's Law (กฎของเทสเลอร์)

> "ความซับซ้อนลดไม่ได้ — แต่ระบบต้องรับภาระแทนผู้ใช้"

**ทฤษฎี:** Law of Conservation of Complexity — ความซับซ้อนจะอยู่ที่ระบบหรือผู้ใช้ ไม่มีทางหายไป

**นี่คือหัวใจของ "คนโง่ๆ ก็ใช้ได้"**

**การใช้งานจริง:**
- Auto-fill: กรอกเลขทะเบียนนิติบุคคล → ระบบดึงข้อมูลบริษัทจาก DBD อัตโนมัติ
- Smart Defaults: Country = "Thailand", Currency = "THB" สำหรับ Thai Supplier
- Auto-detect: ระบบแนะนำ Industry จากชื่อสินค้าที่กรอก
- Pre-populated Forms: เมื่อ login แล้ว ทุก form จะ auto-fill ข้อมูลจาก profile
- 1-Click Actions: กด "ลงทะเบียนกิจกรรม" ครั้งเดียว ระบบใช้ข้อมูลจาก profile ทันที

---

### Law 6: Doherty Threshold (เกณฑ์โดเฮอร์ตี้)

> "ตอบสนองภายใน 400ms = ผู้ใช้อยู่ใน flow"

**ทฤษฎี:** Productivity เพิ่มขึ้นอย่างมากเมื่อระบบตอบสนอง < 400ms (IBM, 1982)

**การใช้งานจริง:**
- Skeleton Screens: แสดงโครง UI สีเทาทันทีก่อนโหลดข้อมูลจริง
- Optimistic Updates: กด "Bookmark" / "Like" → UI เปลี่ยนทันที ก่อน server confirm
- Real-time Validation: เช็ค email ซ้ำ/password strength ขณะพิมพ์
- Instant Search: แสดง suggestions ทันทีขณะพิมพ์ในช่อง search
- Page Transitions: ใช้ Framer Motion fade/slide 300ms ระหว่างหน้า

**เป้าหมาย:**
- TTI (Time to Interactive): < 3s บน 3G
- FCP (First Contentful Paint): < 1.5s
- API Response: < 400ms ทุก critical path

---

### Law 7: Aesthetic-Usability Effect

> "สวยกว่า = ผู้ใช้รู้สึกว่าง่ายกว่า"

**ทฤษฎี:** Design ที่สวยงามทำให้ผู้ใช้ "ให้อภัย" ปัญหาเล็กน้อยได้มากกว่า

**การใช้งานจริง:**
- Government ≠ น่าเบื่อ: ต้องดู **premium** ระดับ Stripe/Linear
- Clean & Spacious: ใช้ whitespace เยอะ ไม่แน่นจนอึดอัด
- Trust through Design: design ที่ดีสร้างความน่าเชื่อถือให้ Global Buyers
- Photography: ใช้ high-quality images, modern icons, consistent style
- Typography: Inter (EN) + Noto Sans Thai (TH) — clean, professional

---

## 3. วิเคราะห์ปัญหา UX ระบบเก่า

### จากคู่มือ 13 หน้า (MemberManual_website.pdf)

---

### 3.1 สมัครสมาชิก (Register) — หน้า 2

**ปัญหาที่พบ:**

| # | ปัญหา | ทฤษฎีที่ละเมิด | ระดับ |
|---|--------|---------------|------|
| 1 | ต้องเลือก "ประเภทสมาชิก" ก่อน (บริษัทผู้ผลิต vs บุคคลทั่วไป) | Hick's Law — สร้าง decision point ตั้งแต่ต้น | วิกฤต |
| 2 | ฟอร์มแสดงทุก field ในหน้าเดียว (Username, Password, Email, ชื่อบริษัท) | Miller's Law — เกิน 7 chunks | สูง |
| 3 | ใช้ CAPTCHA ภาพ (กรอกรหัสภาพ) — UX แย่มาก | Tesler's Law — ผู้ใช้รับภาระที่ระบบควรจัดการ | วิกฤต |
| 4 | ต้อง "คลิก checkbox ยอมรับเงื่อนไข" แต่ไม่ชัดว่าเงื่อนไขคืออะไร | Unclear Terms — ขาด Progressive Disclosure | ปานกลาง |
| 5 | หลังสมัครต้องไปเปิดเมลคลิกยืนยัน ก่อนใช้งานได้ | Friction — ขั้นตอนเยอะเกินไป | สูง |
| 6 | ไม่มี Social Login (Google/LinkedIn) | Jakob's Law — ไม่ตรง pattern สมัยใหม่ | สูง |

---

### 3.2 ลืมรหัสผ่าน (Forget Password) — หน้า 3

**ปัญหาที่พบ:**

| # | ปัญหา | ทฤษฎีที่ละเมิด |
|---|--------|---------------|
| 1 | ต้องเลือกประเภทสมาชิกก่อนกดลืมรหัสผ่าน | Hick's Law — unnecessary decision |
| 2 | ใช้ CAPTCHA ภาพอีก | Tesler's Law — ภาระไม่จำเป็น |
| 3 | กรอกอีเมล → ส่งข้อมูล → เปิดเมล → คลิกลิงก์ → กรอกรหัสใหม่ = 5 steps | Hick's Law + Doherty Threshold |

---

### 3.3 เข้าใช้งานระบบ (Login) — หน้า 4

**ปัญหาที่พบ:**

| # | ปัญหา | ทฤษฎีที่ละเมิด |
|---|--------|---------------|
| 1 | ต้องเลือกประเภทสมาชิก **ทุกครั้ง** ก่อน login | Hick's Law — decision ที่ไม่จำเป็น |
| 2 | ใช้ CAPTCHA ภาพ **ทุกครั้ง** | Tesler's Law — friction สูงสุด |
| 3 | ไม่มี "Remember Me" | Jakob's Law — ทุก platform มี |
| 4 | ไม่มี Social Login | Jakob's Law — B2B ใช้ LinkedIn Login |

---

### 3.4 อัพเดตข้อมูลสมาชิก (Company Profile) — หน้า 5-6

**ปัญหาที่พบ:**

| # | ปัญหา | ทฤษฎีที่ละเมิด |
|---|--------|---------------|
| 1 | **บังคับ** อัพเดตข้อมูลทันทีหลัง login ครั้งแรก | Friction — ผู้ใช้ยังไม่พร้อม |
| 2 | ฟอร์มยาว ~30 fields ในหน้าเดียว | Miller's Law — cognitive overload |
| 3 | ข้อมูลทั้ง 5 ส่วน (ประเภท, บริษัท, ผู้ติดต่อ, ข่าวสาร, รหัสผ่าน) อยู่รวมกัน | Hick's Law — ไม่แยก section |
| 4 | ช่อง Share Holding (ไทย >51% / ไทย <51% / ต่างชาติ) สับสน | Unclear labeling |
| 5 | อัพโหลดรูป/วิดีโอ อยู่ปนกับข้อมูลพื้นฐาน | Progressive Disclosure — ควรแยก step |
| 6 | ยังมี CAPTCHA อีก ท้ายฟอร์ม + checkbox ยอมรับเงื่อนไข | Double friction |

---

### 3.5 เพิ่มข้อมูลผลิตภัณฑ์ (Add Product) — หน้า 7

**ปัญหาที่พบ:**

| # | ปัญหา | ทฤษฎีที่ละเมิด |
|---|--------|---------------|
| 1 | ซ่อนอยู่ใน **dropdown menu** ของ user avatar | Fitts's Law — เป้าหมายอยู่ไกลและเล็ก |
| 2 | Main Industry เป็น checkbox list 11 รายการ ไม่ค้นหาได้ | Hick's Law + Miller's Law |
| 3 | Quality Standard เป็น checkbox list อีก | ไม่มี search/auto-suggest |
| 4 | ไม่มี drag-and-drop สำหรับรูปภาพ | Jakob's Law — pattern สมัยใหม่คือ drag & drop |

---

### 3.6 โพสประกาศ Sourcing / JV — หน้า 8-9

**ปัญหาที่พบ:**

| # | ปัญหา | ทฤษฎีที่ละเมิด |
|---|--------|---------------|
| 1 | เมนูซ่อนอยู่ 3 ชั้น: กิจกรรม → จัดหาผู้ผลิต/ผู้ร่วมทุน → แบบฟอร์ม | Fitts's Law — เป้าหมายอยู่ไกลมาก |
| 2 | ฟอร์มยาวมาก: Product Details + Company Info + Purpose = ~20 fields | Miller's Law |
| 3 | Business Type เป็น checkbox list 20 รายการ | Hick's Law — ตัวเลือกเยอะเกิน |
| 4 | ต้อง login ก่อนถึงจะเห็นว่าต้องกรอกอะไร | Unclear path — ผู้ใช้ไม่รู้ล่วงหน้า |

---

### 3.7 ลงทะเบียนกิจกรรม (Event Registration) — หน้า 10-12

**ปัญหาที่พบ:**

| # | ปัญหา | ทฤษฎีที่ละเมิด |
|---|--------|---------------|
| 1 | ต้อง browse → เลือกกิจกรรม → เข้าดูรายละเอียด → กดสมัคร → กรอกข้อมูล → ยืนยัน = **6 steps** | "3 Click Buy" ละเมิด |
| 2 | ต้อง login ก่อนถึงจะลงทะเบียนได้ | Friction — ไม่ให้ guest register |
| 3 | กรอก First Name, Last Name, Email, Phone **ทุกครั้ง** แม้เป็นสมาชิกอยู่แล้ว | Tesler's Law — ระบบควร auto-fill |
| 4 | ข้อมูล "เปิดรับ/ที่ว่าง/สิทธิ์บริษัท" แสดงแบบตาราง ทำความเข้าใจยาก | Aesthetic-Usability — ดูซับซ้อน |

---

### สรุป: CAPTCHA ภาพ = ผู้ร้ายหมายเลข 1

ระบบเก่าใช้ CAPTCHA ภาพ (กรอกตัวเลข/ตัวอักษรจากรูป) ใน **ทุก flow** — Register, Login, Forgot Password, Update Profile
→ นี่คือ friction ที่ใหญ่ที่สุด ต้องกำจัดทันที
→ **แก้:** ใช้ reCAPTCHA v3 (invisible) หรือ Turnstile (Cloudflare) ที่ทำงานเบื้องหลัง ผู้ใช้ไม่ต้องทำอะไร

---

## 4. Design Philosophy

### หลักที่ 1: "One Click to Order"

> แรงบันดาลใจ: Amazon 1-Click Patent (มูลค่า $2.4B/ปี)

**หลักการ:** เก็บข้อมูลไว้ล่วงหน้า → ให้ผู้ใช้ execute action ด้วยการกดครั้งเดียว

| Action | One Click ทำงานยังไง |
|--------|---------------------|
| Contact Supplier | กด 1 ปุ่ม → ระบบส่ง inquiry + ข้อมูลบริษัท buyer ไปให้ supplier ทันที |
| ลงทะเบียนกิจกรรม | กด "ลงทะเบียน" → ระบบใช้ข้อมูลจาก profile auto-fill ทั้งหมด → ลงทะเบียนสำเร็จ |
| Bookmark Supplier | กด icon หัวใจ → เพิ่มเข้า "My Suppliers" ทันที |
| Share Profile | กด icon share → copy link ทันที |

---

### หลักที่ 2: "3 Click Buy"

> สำหรับ process ที่ซับซ้อนกว่า — ต้องจบใน 3 clicks

```
╔══════════════╗    ╔═══════════════╗    ╔══════════════╗
║  Click 1:    ║ →  ║  Click 2:     ║ →  ║  Click 3:    ║
║  เลือก/ดู    ║    ║  ยืนยันข้อมูล  ║    ║  Submit      ║
║              ║    ║  (pre-filled)  ║    ║  สำเร็จ!     ║
╚══════════════╝    ╚═══════════════╝    ╚══════════════╝
```

| Process | Click 1 | Click 2 | Click 3 |
|---------|---------|---------|---------|
| Business Matching | เลือก Supplier | ยืนยันวัน/เวลา (pre-filled info) | Confirm & Submit |
| Sourcing/JV | กด "Post Request" | Review pre-filled form | Submit |
| Event Registration | กด "Register" | ยืนยันข้อมูลผู้เข้าร่วม | Confirm |
| Add Product | กด "+ Add Product" | กรอก info (smart suggestions) | Save |

---

### หลักที่ 3: "Progressive Profile Building"

> แทนที่จะบังคับกรอกทุกอย่างตั้งแต่แรก → ค่อยๆ ขอข้อมูลเพิ่ม

```
สมัครสมาชิก (30 วินาที)
   ↓ Email + Password เท่านั้น
เข้า Browse Platform ได้เลย
   ↓ ระบบแสดง "Complete Your Profile" bar
กรอกข้อมูลบริษัท (เมื่อพร้อม)
   ↓ Unlock: Business Matching, Sourcing
เพิ่มสินค้า (เมื่อพร้อม)
   ↓ Unlock: Product Listing ปรากฏใน Database
   ↓ Profile Completeness: 100% → Badge "Verified Supplier"
```

**Gamification Elements:**
- Progress Bar: "Profile Completeness: 40%"
- Unlock Messages: "Complete your profile to unlock Business Matching"
- Verified Badge: เมื่อ profile ครบ + documents verified

---

## 5. UX Redesign — ทุก Flow ใหม่

---

### Flow 1: Registration (สมัครสมาชิก) — "30 วินาทีก็สมัครได้"

#### เก่า: 5+ steps, CAPTCHA, Email Verification
#### ใหม่: 3 steps, Zero Friction

```
┌─────────────────────────────────────────────┐
│         สมัครสมาชิก BTED                      │
│                                               │
│  ┌─────────────────────────────────┐          │
│  │  [G] Continue with Google       │ ← 1 Click│
│  └─────────────────────────────────┘          │
│  ┌─────────────────────────────────┐          │
│  │  [in] Continue with LinkedIn    │ ← 1 Click│
│  └─────────────────────────────────┘          │
│                                               │
│  ─────────── or ───────────                   │
│                                               │
│  Email:    [________________________]         │
│  Password: [________________________]         │
│  ☑ ยอมรับ PDPA (คลิกดูรายละเอียด)             │
│                                               │
│  [████████ สมัครสมาชิก ████████]               │
│                                               │
│  มีบัญชีอยู่แล้ว? เข้าสู่ระบบ                   │
└─────────────────────────────────────────────┘
```

**หลังสมัคร → เข้า Platform ได้ทันที (ไม่ต้องรอ verify email)**

**Step 2: เลือกประเภทสมาชิก (แสดงหลัง login ครั้งแรก)**
```
┌─────────────────────────────────────────────┐
│    คุณเป็นใคร?                                │
│                                               │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│    │ 🏭       │  │ 🛒       │  │ 🤝       │ │
│    │ ผู้ผลิต   │  │ ผู้ซื้อ    │  │ ทั้งสอง   │ │
│    │ Supplier │  │ Buyer    │  │ Both     │ │
│    └──────────┘  └──────────┘  └──────────┘ │
│                                               │
│    [ข้ามไปก่อน →]     ← สามารถข้ามได้!        │
└─────────────────────────────────────────────┘
```

**Step 3: ข้อมูลบริษัท (Optional — Complete later)**
```
┌─────────────────────────────────────────────┐
│    บอกเราเกี่ยวกับบริษัทของคุณ                 │
│    [Profile: ██░░░░░░░░ 30%]                 │
│                                               │
│    ชื่อบริษัท (ไทย): [________________]        │
│    ชื่อบริษัท (EN):  [________________]        │
│    อุตสาหกรรม:      [🔍 ค้นหา...      ▾]     │
│    จังหวัด:          [🔍 ค้นหา...      ▾]     │
│                                               │
│    [████ บันทึก ████]  [ข้ามไปก่อน →]         │
└─────────────────────────────────────────────┘
```

**Design Decisions (อ้างอิงทฤษฎี):**
- ✅ **Hick's Law:** Social Login ลดตัวเลือกเหลือ 1 click
- ✅ **Tesler's Law:** ไม่มี CAPTCHA → ใช้ reCAPTCHA v3 invisible
- ✅ **Miller's Law:** แต่ละ step มี 2-4 fields เท่านั้น
- ✅ **Jakob's Law:** Social Login pattern เหมือน Alibaba, LinkedIn
- ✅ **Progressive Disclosure:** ข้อมูลบริษัทเป็น optional step

---

### Flow 2: Login (เข้าสู่ระบบ) — "1 Click กลับมาใช้"

#### เก่า: เลือกประเภท + Username + Password + CAPTCHA = 4 ขั้นตอน
#### ใหม่: 1-2 clicks

```
┌─────────────────────────────────────────────┐
│        เข้าสู่ระบบ BTED                       │
│                                               │
│  ┌─────────────────────────────────┐          │
│  │  [G] Continue with Google       │          │
│  └─────────────────────────────────┘          │
│  ┌─────────────────────────────────┐          │
│  │  [in] Continue with LinkedIn    │          │
│  └─────────────────────────────────┘          │
│                                               │
│  ─────────── or ───────────                   │
│                                               │
│  Email:    [________________________]         │
│  Password: [________________________] 👁      │
│                                               │
│  ☑ Remember me          ลืมรหัสผ่าน?          │
│                                               │
│  [████████ เข้าสู่ระบบ ████████]               │
│                                               │
│  ยังไม่มีบัญชี? สมัครสมาชิกฟรี                  │
└─────────────────────────────────────────────┘
```

**Key Changes:**
- ❌ ไม่ต้องเลือกประเภทสมาชิก → ระบบรู้เองจากข้อมูลใน database
- ❌ ไม่มี CAPTCHA → ใช้ invisible bot detection
- ✅ "Remember me" default ON → session 30 วัน
- ✅ Password visibility toggle (👁)
- ✅ Social Login 1-click

---

### Flow 3: Forgot Password — "Magic Link ง่ายกว่า"

#### เก่า: เลือกประเภท + Email + CAPTCHA + เปิดเมล + กรอกรหัสใหม่ = 5 steps
#### ใหม่: 2 steps

```
Step 1: กรอกอีเมล
┌─────────────────────────────────────────────┐
│    ลืมรหัสผ่าน?                               │
│                                               │
│    กรอกอีเมลที่ใช้สมัครสมาชิก                   │
│    เราจะส่งลิงก์เข้าสู่ระบบให้ทันที               │
│                                               │
│    Email: [________________________]          │
│                                               │
│    [████ ส่งลิงก์เข้าสู่ระบบ ████]               │
│                                               │
│    กลับไปหน้า Login                            │
└─────────────────────────────────────────────┘

Step 2: เปิดเมลแล้วคลิกลิงก์ → เข้าสู่ระบบทันที
(ไม่ต้องกรอกรหัสผ่านใหม่ — ค่อยเปลี่ยนใน Settings)
```

**Magic Link Pattern:** ส่งลิงก์ 1-time login ไปทางอีเมล → คลิกเข้าได้เลย → เปลี่ยนรหัสผ่านภายหลังใน Settings

---

### Flow 4: Company Profile (อัพเดตข้อมูลสมาชิก) — "Section-based, ทำทีละส่วน"

#### เก่า: ฟอร์มยาว ~30 fields หน้าเดียว + CAPTCHA
#### ใหม่: Card-based sections, แก้ไขทีละส่วน

```
┌─────────────────────────────────────────────┐
│  โปรไฟล์บริษัท          [Profile: ██████░░ 75%] │
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │ 📋 ข้อมูลบริษัท              [แก้ไข ✏️]  │ │
│  │ บริษัท ABC จำกัด | Automotive | กรุงเทพฯ │ │
│  │ ✅ ครบถ้วน                               │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │ 👤 ข้อมูลผู้ติดต่อ            [แก้ไข ✏️]  │ │
│  │ คุณสมชาย | MD | 081-xxx-xxxx             │ │
│  │ ✅ ครบถ้วน                               │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │ 📦 ผลิตภัณฑ์                  [เพิ่ม ➕]  │ │
│  │ 3 สินค้า | Plastic & Rubber              │ │
│  │ ✅ ครบถ้วน                               │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │ 🏆 Certifications             [เพิ่ม ➕]  │ │
│  │ ⚠️ ยังไม่มีข้อมูล — เพิ่มเพื่อ Verify     │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │ 🖼️ รูปภาพ & วิดีโอ           [อัพโหลด 📁] │ │
│  │ ⚠️ ยังไม่มี — เพิ่มเพื่อดึงดูด Buyers    │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**กดแก้ไข → เปิด Bottom Sheet/Modal เฉพาะ section นั้น:**

```
┌─────────────────────────────────────────────┐
│  แก้ไขข้อมูลบริษัท                   [✕ ปิด] │
│                                               │
│  ชื่อบริษัท (ไทย):  [บริษัท ABC จำกัด    ]    │
│  ชื่อบริษัท (EN):   [ABC Co., Ltd.       ]    │
│  ทะเบียนนิติบุคคล:  [0105548_______     ]    │
│                  → Auto-fill จาก DBD ✨       │
│  อุตสาหกรรม:       [🔍 Automotive     ▾]     │
│  จังหวัด:           [🔍 กรุงเทพฯ       ▾]     │
│  เว็บไซต์:          [www.abc.co.th       ]    │
│                                               │
│  [████████ บันทึก ████████]                   │
└─────────────────────────────────────────────┘
```

**Design Decisions:**
- ✅ **Progressive Disclosure:** แบ่งเป็น sections, แก้ไขทีละส่วน
- ✅ **Tesler's Law:** Auto-fill จากเลขทะเบียนนิติบุคคล
- ✅ **Miller's Law:** แต่ละ section มี 4-6 fields
- ✅ **Gamification:** Profile Completeness bar กระตุ้นให้กรอกข้อมูลเพิ่ม
- ❌ ไม่มี CAPTCHA
- ❌ ไม่บังคับกรอกทันทีหลัง login

---

### Flow 5: Add Product — "Drag & Drop ง่ายๆ"

#### เก่า: ซ่อนใน dropdown menu, checkbox list ยาว
#### ใหม่: Prominent button, Smart form

```
┌─────────────────────────────────────────────┐
│  เพิ่มผลิตภัณฑ์ใหม่                            │
│                                               │
│  ┌───────────────────────────────┐            │
│  │                               │            │
│  │    📁 Drag & Drop             │            │
│  │    รูปสินค้าที่นี่               │            │
│  │    หรือ คลิกเพื่อเลือกไฟล์      │            │
│  │                               │            │
│  └───────────────────────────────┘            │
│                                               │
│  ชื่อสินค้า:    [________________________]    │
│                → AI Suggest: "Plastic Mold..."│
│                                               │
│  อุตสาหกรรม:   [🔍 พิมพ์ค้นหา...        ▾]   │
│                ✓ Auto-detect จากชื่อสินค้า     │
│                                               │
│  มาตรฐาน:     [🔍 เช่น ISO 9001...     ▾]   │
│                Multi-select with search       │
│                                               │
│  กำลังผลิต:    [________] [units/month  ▾]   │
│                                               │
│  [████████ บันทึกสินค้า ████████]              │
└─────────────────────────────────────────────┘
```

**Key Changes:**
- ✅ ปุ่ม "+ เพิ่มสินค้า" อยู่ใน Profile page อย่างชัดเจน (ไม่ซ่อนใน dropdown)
- ✅ Drag & Drop image upload
- ✅ Searchable dropdowns แทน checkbox list
- ✅ AI suggestion สำหรับ industry จากชื่อสินค้า
- ✅ ฟอร์มสั้น 5 fields เท่านั้น

---

### Flow 6: Sourcing/JV Request — "3 Click Post"

#### เก่า: เมนูซ้อน 3 ชั้น + ฟอร์มยาว ~20 fields
#### ใหม่: 3 Click Wizard

```
Click 1: กดปุ่ม "โพสประกาศ" (FAB button ลอยมุมขวาล่าง)
         หรือ กดจากหน้า Sourcing

Click 2: Quick Form (pre-filled)
┌─────────────────────────────────────────────┐
│  โพสประกาศ                                    │
│                                               │
│  คุณต้องการ:                                   │
│  ┌────────┐ ┌────────┐ ┌──────────┐          │
│  │ หาผู้ซื้อ │ │ หาผู้ผลิต │ │ หาผู้ร่วมทุน │          │
│  └────────┘ └────────┘ └──────────┘          │
│                                               │
│  สินค้า/บริการ: [________________________]    │
│  รายละเอียด:   [________________________]    │
│                [________________________]    │
│  จำนวน:        [________] [units      ▾]    │
│                                               │
│  📎 แนบไฟล์ (optional)                        │
│                                               │
│  ── ข้อมูลผู้ประกาศ (จาก Profile) ──           │
│  บริษัท: ABC Co., Ltd.  ✓ Auto-filled         │
│  ผู้ติดต่อ: คุณสมชาย     ✓ Auto-filled         │
│  อีเมล: somchai@abc.co.th  ✓ Auto-filled     │
│  โทร: 081-xxx-xxxx     ✓ Auto-filled         │
│                                               │
│  [████████ ตรวจสอบ & โพส ████████]            │
└─────────────────────────────────────────────┘

Click 3: Review & Confirm
┌─────────────────────────────────────────────┐
│  ตรวจสอบประกาศ                                │
│                                               │
│  ┌─ Preview Card ────────────────────────┐   │
│  │ [หาผู้ผลิต] Plastic Mold for Auto Parts │   │
│  │ จำนวน: 10,000 units                   │   │
│  │ ABC Co., Ltd. | กรุงเทพฯ               │   │
│  │ โพสเมื่อ: วันนี้                         │   │
│  └───────────────────────────────────────┘   │
│                                               │
│  ⚠️ ประกาศจะแสดงเป็นเวลา 30 วัน              │
│                                               │
│  [แก้ไข]  [████ ยืนยัน & โพส ████]            │
└─────────────────────────────────────────────┘
```

**Design Decisions:**
- ✅ **3 Click Buy:** เลือกประเภท → กรอก (pre-filled) → Confirm
- ✅ **Tesler's Law:** ข้อมูลผู้ประกาศ auto-fill จาก profile ทั้งหมด
- ✅ **Miller's Law:** ฟอร์มมี 4 fields เท่านั้น (ประเภท, สินค้า, รายละเอียด, จำนวน)
- ✅ **Preview:** ให้ผู้ใช้เห็น preview ก่อนโพส → ลดข้อผิดพลาด

---

### Flow 7: Event Registration — "1 Click Register"

#### เก่า: Browse → เลือก → ดูรายละเอียด → สมัคร → กรอกข้อมูล → ยืนยัน = 6 steps
#### ใหม่: 1-2 Clicks

**สำหรับสมาชิกที่ login แล้ว:**
```
┌─────────────────────────────────────────────┐
│  SUBCON Thailand 2026                        │
│  📅 8-11 พ.ค. 2569 | 📍 BITEC บางนา          │
│  🎫 เหลือ 1,800 จาก 5,000 ที่นั่ง             │
│                                               │
│  ████████████████░░░░░ 64% เต็ม              │
│                                               │
│  [████ ลงทะเบียนทันที ████] ← 1 Click!       │
│                                               │
│  ✓ ข้อมูลจาก Profile จะถูกใช้อัตโนมัติ         │
└─────────────────────────────────────────────┘

→ กดปุ่ม "ลงทะเบียนทันที"

┌─────────────────────────────────────────────┐
│  ✅ ลงทะเบียนสำเร็จ!                          │
│                                               │
│  SUBCON Thailand 2026                        │
│  📅 8-11 พ.ค. 2569 | 📍 BITEC บางนา          │
│                                               │
│  ผู้เข้าร่วม: คุณสมชาย (จาก Profile)            │
│                                               │
│  📥 เพิ่มลงปฏิทิน (.ics)                       │
│  📧 ส่งรายละเอียดทางอีเมล                      │
│                                               │
│  ต้องการเพิ่มผู้เข้าร่วมอีกไหม?                 │
│  [+ เพิ่มผู้เข้าร่วม]   [เสร็จสิ้น]              │
└─────────────────────────────────────────────┘
```

**Key Changes:**
- ✅ **1 Click Register:** กดปุ่มเดียว ระบบใช้ข้อมูลจาก profile
- ✅ **Auto-fill:** ไม่ต้องกรอก First Name, Last Name, Email, Phone ซ้ำ
- ✅ **Instant Feedback:** แสดง success ทันที (Doherty Threshold)
- ✅ **Post-action Options:** เพิ่มลงปฏิทิน, ส่งอีเมล, เพิ่มผู้เข้าร่วม
- ✅ **Capacity Visual:** Progress bar แสดง % เต็ม แทนตาราง

---

## 6. Design System

### 6.1 Color Palette

```
Primary:
  Navy:     #1B2A4A  → Header, Text, Buttons
  Gold:     #C5A572  → CTA, Accents, Highlights

Neutral:
  White:    #FFFFFF  → Background
  Gray-50:  #F8FAFC  → Section Background
  Gray-100: #F1F5F9  → Card Background
  Gray-400: #94A3B8  → Muted Text
  Gray-900: #0F172A  → Body Text

Semantic:
  Success:  #10B981  → ✅ Verified, Completed
  Warning:  #F59E0B  → ⚠️ Incomplete, Pending
  Error:    #EF4444  → ❌ Error, Failed
  Info:     #3B82F6  → ℹ️ Information

Event Types:
  Seminar:     #3B82F6 (Blue)
  Exhibition:  #F59E0B (Orange)
  VMC:         #10B981 (Green)
  Training:    #8B5CF6 (Purple)
```

### 6.2 Typography

```
English:   Inter (Google Fonts) — Clean, Professional
Thai:      Noto Sans Thai (Google Fonts) — Unicode-complete, Modern

Heading 1: 36px/40px, Bold (700)
Heading 2: 28px/32px, Bold (700)
Heading 3: 22px/28px, Semi-bold (600)
Body:      16px/24px, Regular (400)
Small:     14px/20px, Regular (400)
Caption:   12px/16px, Medium (500)
```

### 6.3 Spacing System (8px grid)

```
xs:  4px   → icon padding, tiny gaps
sm:  8px   → between inline elements
md:  16px  → between form fields, card padding
lg:  24px  → between sections
xl:  32px  → between major blocks
2xl: 48px  → page section gaps
3xl: 64px  → hero section padding
```

### 6.4 Component Standards

**Buttons:**
```
Primary (Gold):   bg-[#C5A572] text-white, min-h-12 (48px), rounded-xl
Secondary (Navy): bg-[#1B2A4A] text-white, min-h-12, rounded-xl
Ghost:            border-2 border-gray-200 text-gray-700, min-h-12, rounded-xl
Icon Button:      w-12 h-12 (48x48px), rounded-full

All buttons: hover scale-[1.02], active scale-[0.98], transition 200ms
```

**Form Inputs:**
```
Height:       48px (mobile), 44px (desktop)
Border:       border-gray-200, focus:ring-2 ring-[#C5A572]/40
Border Radius: rounded-xl (12px)
Label:        Floating label (ลอยขึ้นเมื่อ focus)
Error:        border-red-500 + error message below
Icon:         Leading icon inside input (gray-400)
```

**Cards:**
```
Background:   white
Border:       border border-gray-100
Shadow:       shadow-sm, hover:shadow-md
Border Radius: rounded-2xl (16px)
Padding:      p-6 (24px)
Transition:   hover:translate-y-[-2px] transition 300ms
```

### 6.5 Responsive Breakpoints

```
Mobile:       < 768px   → Single column, bottom nav, full-width forms
Tablet:       768-1024px → 2-column grid, sidebar navigation
Desktop:      1024-1440px → Full layout, sidebar + main + right panel
Large:        > 1440px   → max-w-7xl centered, extra whitespace
```

### 6.6 Motion / Animation Standards

```
Micro-interaction:  duration 200ms, ease-out
Page Transition:    duration 300ms, ease-in-out
Modal Open:         duration 300ms, spring(stiffness: 300, damping: 30)
List Stagger:       delay 50ms per item
Success Animation:  scale 0→1, duration 500ms, spring
Loading Skeleton:   pulse animation, 1.5s infinite
```

---

## 7. WCAG 2.1 AA

### 7.1 Checklist สำหรับ BOI Platform

| Category | Requirement | Implementation |
|----------|------------|----------------|
| Color Contrast | ≥ 4.5:1 normal text, ≥ 3:1 large text | Navy #1B2A4A on White = 12.1:1 ✅ |
| Touch Targets | ≥ 44x44px | All buttons min-h-12 (48px) ✅ |
| Alt Text | ทุกรูปภาพ | `alt="[company] [product] image"` |
| Keyboard Nav | ทุก function ใช้ keyboard ได้ | Tab order, focus indicators |
| Skip Nav | "Skip to main content" link | Hidden link ด้านบนสุด |
| Form Labels | ทุก input มี label | Floating labels + `for` attribute |
| Error Messages | Specific, helpful | "กรุณากรอกอีเมลให้ถูกต้อง (เช่น name@company.com)" |
| Language | `lang` attribute | `<html lang="th">`, `lang="en"` per block |
| Focus Visible | Focus indicator ชัดเจน | ring-2 ring-[#C5A572] ring-offset-2 |
| ARIA | Labels สำหรับ custom components | `aria-label`, `role`, `aria-live` |
| Semantic HTML | Proper hierarchy | `nav`, `main`, `article`, `aside`, `header`, `footer` |
| Text Resize | ถึง 200% ไม่เสีย layout | rem-based font sizes, fluid layout |

### 7.2 BOI-Specific Considerations

- **Bilingual:** ทุก content มีทั้ง TH/EN → ใช้ `lang` attribute แยกภาษา
- **PDF Downloads:** เอกสาร PDF ต้องเป็น Tagged PDF with reading order
- **Data Tables:** Supplier comparison table ต้องมี `<th scope>` ที่ถูกต้อง
- **Dynamic Updates:** ใช้ `aria-live="polite"` สำหรับ search results, notifications

---

## 8. Best Practice References

### 8.1 Platform References

| Platform | สิ่งที่อ้างอิง | ลำดับสำคัญ |
|----------|--------------|-----------|
| **Alibaba.com** | Search-First Homepage, Supplier Verification Tiers, Inquiry Basket, Multi-step Registration | สูงมาก |
| **Stripe.com** | Visual Aesthetic, Typography, Whitespace, Micro-interactions | สูงมาก |
| **Linear.app** | Clean UI, Motion Design, Responsive Patterns | สูง |
| **IndiaMART** | Mobile-First Patterns, Chat Integration, Lead Dashboard | สูง |
| **Global Sources** | Event + Digital Integration, Sourcing Workflow | สูง |
| **ThomasNet** | Company Profile Depth, Side-by-side Comparison | ปานกลาง |

### 8.2 Theory References

| ทฤษฎี | แหล่งอ้างอิง |
|--------|------------|
| Hick's Law | Hick, W.E. (1952). On the Rate of Gain of Information |
| Fitts's Law | Fitts, P.M. (1954). The Information Capacity of the Human Motor System |
| Jakob's Law | Nielsen, J. (2000). End of Web Design |
| Miller's Law | Miller, G.A. (1956). The Magical Number Seven, Plus or Minus Two |
| Tesler's Law | Tesler, L. (2000). The Laws of Interaction Design |
| Doherty Threshold | Doherty, W.J. & Thadani, A.J. (1982). The Economic Value of Rapid Response Time |
| Aesthetic-Usability | Kurosu, M. & Kashimura, K. (1995). Apparent Usability vs. Inherent Usability |
| Progressive Disclosure | Nielsen Norman Group (nngroup.com) |
| Amazon 1-Click | US Patent No. 5,960,411 (1999) |

### 8.3 Thai Government Standards

| มาตรฐาน | รายละเอียด |
|---------|-----------|
| TWCAG 2010 | Thai Web Content Accessibility Guidelines |
| มาตรฐานเว็บไซต์ภาครัฐ | Thailand Government Web Site Standard |
| PDPA | พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 |
| WCAG 2.1 AA | W3C Web Content Accessibility Guidelines |

---

## 9. Implementation Priority

### Phase 1: Core UX Overhaul (สัปดาห์ 1-2)

| # | Task | Flow | Impact |
|---|------|------|--------|
| 1 | Redesign Registration → 3-step wizard + Social Login | Flow 1 | วิกฤต |
| 2 | Redesign Login → ลบ CAPTCHA + ลบเลือกประเภท + Remember Me | Flow 2 | วิกฤต |
| 3 | Redesign Company Profile → Card-based sections | Flow 4 | สูง |
| 4 | Event Registration → 1-Click Register | Flow 7 | สูง |

### Phase 2: Business Flows (สัปดาห์ 3-4)

| # | Task | Flow | Impact |
|---|------|------|--------|
| 5 | Sourcing/JV → 3-Click Post Wizard | Flow 6 | สูง |
| 6 | Add Product → Smart form + Drag & Drop | Flow 5 | ปานกลาง |
| 7 | Forgot Password → Magic Link | Flow 3 | ปานกลาง |

### Phase 3: Polish & Accessibility (สัปดาห์ 5-6)

| # | Task | Impact |
|---|------|--------|
| 8 | WCAG 2.1 AA audit + fixes | สูง (TOR requirement) |
| 9 | Skeleton loading + Optimistic updates | ปานกลาง |
| 10 | Profile Completeness gamification | ปานกลาง |
| 11 | Lighthouse optimization ≥ 80 | สูง (TOR requirement) |

---

## สรุป: "Before vs After" ที่เห็นภาพชัด

| Metric | ระบบเก่า | ระบบใหม่ | ทฤษฎีที่ใช้ |
|--------|---------|---------|-----------|
| สมัครสมาชิก | 5+ steps, CAPTCHA | 1-3 clicks, Social Login | Hick's, Tesler's |
| Login | 4 steps, CAPTCHA ทุกครั้ง | 1-2 clicks, Remember Me | Hick's, Jakob's |
| ลืมรหัส | 5 steps | 2 steps (Magic Link) | Tesler's |
| อัพเดต Profile | 30 fields หน้าเดียว | Card sections, 4-6 fields/section | Miller's, Progressive Disclosure |
| เพิ่มสินค้า | ซ่อนใน menu, checkbox lists | Prominent button, searchable dropdowns | Fitts's, Hick's |
| Sourcing/JV | เมนู 3 ชั้น + 20 fields | 3 clicks, pre-filled form | "3 Click Buy", Tesler's |
| ลงทะเบียนงาน | 6 steps, กรอกข้อมูลซ้ำ | 1 click, auto-fill from profile | "One Click", Tesler's |
| CAPTCHA | ทุก flow | ไม่มี (invisible reCAPTCHA v3) | Tesler's |
| Response Time | ไม่ระบุ | < 400ms ทุก critical path | Doherty Threshold |
| Design | ดู "ราชการ" | Premium ระดับ Stripe/Linear | Aesthetic-Usability |

---

*เอกสารนี้จัดทำโดย Act As 6 Roles: UX Lead, UI Designer, Interaction Designer, Frontend Architect, Accessibility Specialist, B2B Product Strategist*

*อ้างอิงจาก: Laws of UX (lawsofux.com), Nielsen Norman Group, W3C WCAG 2.1, Amazon 1-Click Patent, Alibaba/IndiaMART/Global Sources/ThomasNet Best Practices*
