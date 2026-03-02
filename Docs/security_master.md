# BOI Website — Security Master Document
## Security Architecture, Risk Assessment & Implementation Guide
### TOR Compliance: ภาคผนวก ข. + ภาคผนวก ค.

---

> **วัตถุประสงค์**: เอกสารนี้เป็น "แหล่งความจริงเดียว" (Single Source of Truth) ด้าน Security ของโครงการเว็บไซต์ BOI
> AI และทีมพัฒนาต้องอ้างอิงเอกสารนี้ทุกครั้งที่เขียนโค้ดที่เกี่ยวกับ Security, Authentication, Authorization, Logging, API, Infrastructure
>
> **Tech Stack อ้างอิง**: Next.js 15 (App Router) + Strapi v5 + PostgreSQL + Redis + Docker Swarm
> **TOR Database Requirement**: Microsoft SQL Server (ต้อง justify การใช้ PostgreSQL หรือเปลี่ยนตาม TOR)

---

## สารบัญ

1. [Security Personas](#1-security-personas)
2. [TOR Security Requirements Mapping](#2-tor-security-requirements-mapping)
3. [Risk Assessment — ภาคผนวก ข.](#3-risk-assessment--ภาคผนวก-ข)
4. [Risk Assessment — ภาคผนวก ค.](#4-risk-assessment--ภาคผนวก-ค)
5. [OWASP Top 10 Analysis](#5-owasp-top-10-analysis)
6. [จุดอันตรายเร่งด่วน](#6-จุดอันตรายเร่งด่วน)
7. [Security Implementation Guide](#7-security-implementation-guide)
8. [Infrastructure Security](#8-infrastructure-security)
9. [Compliance Matrix](#9-compliance-matrix)
10. [Pentest Preparation Guide](#10-pentest-preparation-guide)
11. [Gap Summary & Roadmap](#11-gap-summary--roadmap)

---

## 1. Security Personas

งาน BOI มีความซับซ้อนด้าน Security สูงมาก เพราะ TOR กำหนดทั้ง Security, Pentest, System Hardening, Compliance — ต้องใช้ 5 บทบาทร่วมกัน:

### Persona 1: Lead Security Architect

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | ออกแบบสถาปัตยกรรมความปลอดภัยทั้งระบบ, กำหนด Security Policy, CSP, CORS, Auth Flow |
| **JS** | รับผิดชอบ Security Headers, TLS Config, WAF Rules, RBAC Design, Threat Modeling |
| **Experience** | 10+ ปี Application Security, ผ่านโครงการ Government/Banking |
| **Skills** | OWASP Top 10, CSP/HSTS Design, OAuth2/OIDC, JWT, TLS 1.3, WAF Configuration, NIST Framework |
| **หน้าที่ใน BOI** | กำหนด Security Policy ทั้งระบบ, ออกแบบ CSP ที่ไม่มี unsafe-inline/eval, ออกแบบ Auth Flow สำหรับ Admin/Member, กำหนด WAF Rules |

### Persona 2: Penetration Tester (OSCP/CEH)

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | ทดสอบเจาะระบบทั้ง White-box และ Black-box ตาม TOR ภาคผนวก ค. ข้อ 5.1-5.2 |
| **JS** | ค้นหาช่องโหว่, Path Traversal, Injection, Broken Auth, รายงานระดับความเสี่ยง |
| **Experience** | 5+ ปี Ethical Hacking, OSCP/CEH Certified, ผ่าน Pentest โครงการภาครัฐ 1+ โครงการ |
| **Skills** | Burp Suite, OWASP ZAP, Nmap, SQLMap, Metasploit, Manual Code Review, CVSS Scoring |
| **หน้าที่ใน BOI** | ทำ Pentest 5 ครั้ง (1 ตอนรับงาน + 4 ช่วงรับประกัน 2 ปี), White-box ไม่เกิน 1 IP + Black-box ไม่เกิน 1 URL |

### Persona 3: Senior Full-Stack Developer (Security-Focused)

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | แก้ไข code ให้ผ่าน Security Audit, Implement Auth/Rate Limit/Logging/Input Validation |
| **JS** | เขียน Middleware, API hardening, Server-side validation, Secure coding practices |
| **Experience** | 7+ ปี Next.js/Node.js, ผ่าน Security Review จาก Pentest team |
| **Skills** | Next.js 15, Strapi v5, Prisma ORM, Zod Validation, bcrypt, helmet.js, rate-limit |
| **หน้าที่ใน BOI** | แก้ไขช่องโหว่ทั้งหมด, สร้าง Auth system, API hardening, Audit logging |

### Persona 4: DevOps/Infrastructure Engineer

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | ออกแบบ CI/CD Pipeline, Docker, Monitoring, Log Management, Backup/Restore |
| **JS** | Containerization, Server Hardening, APM Setup, Log Aggregation, Patch Management |
| **Experience** | 5+ ปี Linux Administration, Docker/Docker Swarm, PM2, Nginx Security |
| **Skills** | Docker, docker-compose, Nginx hardening, PM2 ecosystem, Winston/ELK Stack, Fail2ban |
| **หน้าที่ใน BOI** | สร้าง Docker config, CI/CD pipeline, ทำ System Hardening ตาม TOR ข้อ 6, Backup/Restore policy |

### Persona 5: Compliance & QA Auditor

| หัวข้อ | รายละเอียด |
|---|---|
| **JD** | ตรวจสอบ Compliance ตาม PDPA, WCAG 2.1 AA, OWASP, Lighthouse >= 80 |
| **JS** | จัดทำรายงาน Compliance, Unit Test >= 80%, E2E Test, Load Test 1,000 concurrent |
| **Experience** | 5+ ปี QA/Security Compliance, ผ่านงาน Government IT Audit |
| **Skills** | PDPA, WCAG 2.1 AA, Lighthouse, Jest/Vitest, Playwright, k6/Artillery Load Testing |
| **หน้าที่ใน BOI** | จัดทำรายงาน Compliance ทั้งหมด, ออกแบบ test suite, ทำ Load test 1,000 concurrent |

---

## 2. TOR Security Requirements Mapping

### 2.1 ภาคผนวก ข. — คุณสมบัติขอบเขตทางเทคนิค

| TOR ข้อ | Requirement | Persona ที่รับผิดชอบ | หมายเหตุ |
|---|---|---|---|
| 1.1 | Frontend: HTML5/CSS3 + JS ES6+ + Framework (Next.js) + i18n สองภาษา | P3 | Next.js 15 + next-intl (th/en/ja/zh/ko/de/fr — 7 ภาษา) |
| 1.2 | Backend: Node.js LTS + REST/GraphQL + ORM | P3 | Strapi v5 (REST API) + Prisma ORM สำหรับ custom queries |
| 1.3 | Database: MS SQL Server + Unicode UTF-8 + Backup/Restore | P3+P4 | **TOR กำหนด MS SQL Server** — ต้อง justify หรือเปลี่ยน |
| 1.4 | Docker + Dev/UAT/Prod + CI/CD + Log/APM | P4 | Docker Swarm + GitHub Actions CI/CD + PM2/Prometheus APM |
| 1.5 | HTTPS/TLS 1.3 + CSP + reCAPTCHA + OWASP + WAF/Rate Limit | P1+P3 | ต้องแก้ CSP, เพิ่ม reCAPTCHA v3, Rate Limit, WAF |
| 2.1 | Unit Test >= 80% ในโมดูลหลัก | P5 | Jest/Vitest + React Testing Library |
| 2.2 | E2E Test: Login, Feed, ค้นหา/กรอง, ลงทะเบียนกิจกรรม | P5 | Playwright E2E tests |
| 2.3 | Load Test >= 1,000 concurrent, p95/p99, < 1% error, 60 นาที | P4+P5 | k6 หรือ Artillery load test |
| 2.4 | Abuse/Spam Test: Rate limit, WAF, Blacklist, ระงับบัญชี | P1+P2 | ทดสอบ bot spam, rate limit bypass, WAF rules |
| 2.5 | WCAG 2.1 AA + OWASP + Lighthouse >= 80 + PDPA | P5 | ต้องผ่านทุก category ของ Lighthouse |
| 3 | API Interoperability ตามรัฐบาลดิจิทัล 3.0 | P3 | API versioning + Schema documentation + OpenAPI spec |
| 4 | Audit Log >= 365 วัน (Login, สิทธิ์, ระงับ/ปลด, ลบ/ซ่อนเนื้อหา) | P3+P4 | Winston structured logging + DB storage |

### 2.2 ภาคผนวก ค. — ความมั่นคงปลอดภัยสารสนเทศ

| TOR ข้อ | Requirement | Persona | หมายเหตุ |
|---|---|---|---|
| ค.1 | รักษาความลับข้อมูล ห้ามเผยแพร่โดยไม่ได้รับอนุญาต | P1+P4 | Secret Manager, .env ไม่อยู่ใน repo, API key rotation |
| ค.2 | โปรแกรมที่ใช้ต้องมีสิทธิ์ตามกฎหมาย + รับผิดชอบลิขสิทธิ์ | P3 | ใช้ open source ทั้งหมด (Next.js MIT, Strapi MIT) |
| ค.3 | Log File การปรับปรุงเปลี่ยนแปลงข้อมูล เรียกดูได้ | P3+P4 | Audit log middleware + Admin UI สำหรับดู logs |
| ค.4 | ป้องกัน OWASP Top 10 (11 รายการตาม TOR) | P1+P2+P3 | ดูหัวข้อ 5 OWASP Analysis |
| ค.5 | Penetration Testing 5 ครั้ง (White-box + Black-box) | P2 | 1 ครั้งตอนรับงาน + 4 ครั้งช่วงรับประกัน 2 ปี |
| ค.6 | System Hardening: ปิดช่องโหว่ OS/Server | P4 | SSH hardening, firewall, disable unused services, patch |
| ค.7 | วิเคราะห์/แนะนำระบบ/อุปกรณ์เสริมด้าน Security | P1+P4 | ประเมิน WAF appliance, IDS/IPS ถ้าจำเป็น |

---

## 3. Risk Assessment — ภาคผนวก ข. (ปรับสำหรับ BOI)

| # | TOR Requirement | สิ่งที่ต้องมี (BOI) | ระดับเสี่ยง | แนวทางแก้ไข |
|---|---|---|---|---|
| 1.1 | Frontend: Next.js + i18n | Next.js 15 App Router + next-intl 7 ภาษา | LOW | ตรวจสอบ i18n ครบทุกหน้า + fallback ภาษา |
| 1.2 | Backend: Node.js + REST + ORM | Strapi v5 REST API + Prisma ORM | MEDIUM | ต้องมี API documentation + input validation ทุก endpoint |
| 1.3 | Database: MS SQL Server + Backup | PostgreSQL (ต้อง justify) + pg_dump backup | HIGH | **ตัดสินใจ**: ใช้ MSSQL ตาม TOR หรือ justify PostgreSQL |
| 1.4 | Docker + Dev/UAT/Prod + CI/CD | Docker Swarm + GitHub Actions | HIGH | สร้าง Dockerfile, docker-compose, CI/CD pipeline ทั้งหมด |
| 1.5 | Security Headers + CAPTCHA + WAF | CSP, HSTS, reCAPTCHA v3, Rate Limit | HIGH | แก้ CSP (ลบ unsafe-inline/eval), ใช้ reCAPTCHA จริง, เพิ่ม WAF |
| 2.1 | Unit Test >= 80% | Jest/Vitest tests | HIGH | สร้าง test suite ใหม่ทั้งหมด |
| 2.2 | E2E Test | Playwright tests | HIGH | สร้าง E2E tests สำหรับ critical paths |
| 2.3 | Load Test 1,000 concurrent | k6/Artillery | MEDIUM | เขียน load test script + run 60 นาที |
| 2.4 | Abuse/Spam Test | Rate limit + WAF + Blacklist | HIGH | ต้องสร้าง rate limit middleware + WAF rules ก่อน |
| 2.5 | Compliance (WCAG/PDPA/Lighthouse) | หลาย standard | MEDIUM | ตรวจทีละ standard + แก้ไข |
| 3 | API Interoperability | OpenAPI spec + versioning | MEDIUM | สร้าง API documentation ตามมาตรฐานรัฐ 3.0 |
| 4 | Audit Log >= 365 วัน | Structured logging system | CRITICAL | สร้าง audit log ที่บันทึกจริง + เก็บ >= 365 วัน |

---

## 4. Risk Assessment — ภาคผนวก ค. (ปรับสำหรับ BOI)

| # | TOR Security Requirement | สิ่งที่ต้องทำ (BOI) | ระดับเสี่ยง | แนวทางแก้ไข |
|---|---|---|---|---|
| ค.1 | รักษาความลับข้อมูล | Secret management + .env isolation | HIGH | ใช้ Docker secrets หรือ HashiCorp Vault, .env ไม่อยู่ใน repo |
| ค.2 | ลิขสิทธิ์ถูกต้อง | License audit ทุก dependency | LOW | `npx license-checker` ตรวจทุก package |
| ค.3 | Log File เรียกดูได้ | Structured audit logging | CRITICAL | Winston + PostgreSQL audit table + Admin UI |
| ค.4 | ป้องกัน Security Threats (11 รายการ) | ดูตาราง OWASP ด้านล่าง | CRITICAL | แก้ทีละข้อตาม priority |
| ค.5 | Pentest 5 ครั้ง | White-box 1 IP + Black-box 1 URL | HIGH | จ้างผู้เชี่ยวชาญที่มีผลงาน 1+ โครงการ |
| ค.6 | System Hardening | OS + Server + Network hardening | HIGH | SSH key-only, firewall, disable root login, auto-patch |
| ค.7 | วิเคราะห์/แนะนำอุปกรณ์เสริม | Security assessment report | MEDIUM | ประเมินความจำเป็น WAF/IDS/IPS |

---

## 5. OWASP Top 10 Analysis (เฉพาะ BOI Project)

### สิ่งที่ TOR ภาคผนวก ค. ข้อ 4 กำหนดให้ป้องกัน:

TOR ระบุ 11 รายการที่ต้องป้องกัน:
1. Injection (SQL, HTML, PHP)
2. Broken Authentication
3. Sensitive Data Exposure
4. XML External Entities
5. Broken Access Control
6. Security Misconfiguration
7. Cross Site Scripting (XSS)
8. Insecure Deserialization
9. HTTP Response Splitting
10. File Inclusion
11. Directory Traversal

### การวิเคราะห์และแนวทางป้องกันสำหรับ BOI:

| # | ภัยคุกคาม | ความเสี่ยงใน BOI | จุดที่ต้องระวัง | แนวทางป้องกัน |
|---|---|---|---|---|
| 1 | **SQL Injection** | MEDIUM | Strapi API queries, Custom API endpoints ที่รับ user input | ใช้ Prisma parameterized queries เสมอ, ห้าม raw SQL กับ user input, Strapi มี built-in protection |
| 2 | **HTML/Template Injection** | MEDIUM | CMS content rendering, User-generated content (ถ้ามี) | Sanitize HTML ด้วย DOMPurify ก่อน render, ใช้ React (auto-escape by default), ห้าม `dangerouslySetInnerHTML` กับ user input |
| 3 | **Broken Authentication** | CRITICAL | Admin panel, Member login, Strapi admin | NextAuth.js + bcrypt password hashing + session management + Strapi JWT + MFA สำหรับ admin |
| 4 | **Sensitive Data Exposure** | HIGH | API responses ที่อาจ leak ข้อมูลส่วนตัว, Error messages ที่ expose stack trace | Filter API responses (whitelist fields), Custom error handler (ไม่ expose internals), HTTPS everywhere |
| 5 | **XML External Entities (XXE)** | LOW | BOI ไม่ใช้ XML parsing มาก, แต่ถ้ามี file upload ต้องระวัง | Disable XML external entity processing, ถ้าใช้ XML parser ต้อง set `disableEntityExpansion: true` |
| 6 | **Broken Access Control** | CRITICAL | Admin routes (/admin/*), API endpoints ที่ต้อง authorize, Strapi admin panel | Auth middleware ที่ `middleware.ts`, RBAC (Role-Based Access Control), Strapi RBAC built-in |
| 7 | **Security Misconfiguration** | HIGH | CSP headers, CORS policy, Error handling, Default credentials | CSP without unsafe-inline/eval, Strict CORS, Custom error pages, Change all default passwords |
| 8 | **Cross Site Scripting (XSS)** | HIGH | Search results display, CMS content, URL parameters | CSP nonce-based, React auto-escape, DOMPurify สำหรับ rich content, Validate/sanitize all inputs |
| 9 | **Insecure Deserialization** | MEDIUM | Session data, JWT tokens, API request bodies | ใช้ signed cookies, JWT with RS256, Validate JSON schema with Zod |
| 10 | **HTTP Response Splitting** | LOW | HTTP headers ที่รับค่าจาก user input | Validate/sanitize all header values, ใช้ framework built-in header setting (Next.js headers config) |
| 11 | **File Inclusion (LFI/RFI)** | HIGH | File upload, Dynamic imports, Template rendering | Whitelist allowed file types, ห้าม dynamic require/import จาก user input, Validate file paths |
| 12 | **Directory Traversal** | CRITICAL | File upload/download endpoints, Static file serving | `path.basename()` ทุกครั้ง, Whitelist extensions, Validate paths ไม่มี `../`, Chroot file operations |

---

## 6. จุดอันตรายเร่งด่วน (ปรับสำหรับ BOI)

### Priority 1 — CRITICAL (ต้องแก้ก่อน Production/Pentest)

| # | จุดอันตราย | ผลกระทบ | แนวทางแก้ไข | Persona |
|---|---|---|---|---|
| C1 | **Admin Panel ไม่มี Authentication** | ใครก็เข้า admin ได้, แก้ไข/ลบข้อมูลได้ | สร้าง Auth middleware ที่ `middleware.ts` + NextAuth.js + RBAC | P1+P3 |
| C2 | **Path Traversal ใน API** | เขียน/อ่านไฟล์ที่ไหนก็ได้บน server | `path.basename()`, whitelist extensions, validate ทุก file path | P3 |
| C3 | **ไม่มี Audit Log จริง** | ไม่สามารถตรวจสอบ/อุทธรณ์ได้ (TOR บังคับ) | สร้าง Winston + audit_logs table + Admin UI | P3+P4 |
| C4 | **ไม่มี Database connection** | ข้อมูลไม่ถูกบันทึก, Backup ไม่ได้ | เชื่อม Database + ORM + Backup policy | P3+P4 |

### Priority 2 — HIGH (ต้องแก้ก่อน UAT)

| # | จุดอันตราย | ผลกระทบ | แนวทางแก้ไข | Persona |
|---|---|---|---|---|
| H1 | **CSP อ่อน (unsafe-inline/eval)** | XSS bypass ได้แม้มี CSP | ลบ unsafe-inline/eval, ใช้ nonce-based CSP | P1+P3 |
| H2 | **ไม่มี Rate Limiting** | Bot สแปม API, DDoS, API key abuse | เพิ่ม rate limit middleware ทุก API route | P1+P3 |
| H3 | **CAPTCHA เป็น Mock** | Form ถูก bot สแปมไม่จำกัด | ใช้ Google reCAPTCHA v3 จริง | P3 |
| H4 | **ไม่มี CSRF Protection** | Form hijacking, ส่ง request แทนผู้ใช้ | เพิ่ม CSRF token ทุก form | P3 |
| H5 | **API Key อาจหลุด** | ถ้า key หลุดถูก abuse | Rotate key, ใช้ Docker secrets/env isolation | P4 |
| H6 | **ไม่มี Test Suite** | ไม่ผ่าน QA/QC ตาม TOR | สร้าง Unit + E2E + Load test ทั้งหมด | P5 |

### Priority 3 — MEDIUM (แก้ก่อน Go-Live)

| # | จุดอันตราย | ผลกระทบ | แนวทางแก้ไข | Persona |
|---|---|---|---|---|
| M1 | **ไม่มี Docker/CI/CD** | Deploy manual, ไม่มี environment separation | สร้าง Dockerfile + docker-compose + CI/CD | P4 |
| M2 | **WCAG/PDPA ไม่ครบ** | อาจไม่ผ่าน compliance audit | ตรวจ WCAG 2.1 AA + PDPA compliance | P5 |
| M3 | **API ไม่มี documentation** | ไม่ผ่าน Interoperability ตามรัฐ 3.0 | สร้าง OpenAPI spec + versioning | P3 |
| M4 | **Server ยังไม่ harden** | OS อาจมีช่องโหว่ | SSH hardening, firewall, patch management | P4 |

---

## 7. Security Implementation Guide

### 7.1 Authentication & Authorization (สำหรับ BOI)

```
สถาปัตยกรรม Auth ที่ต้องสร้าง:

1. Admin Authentication (BOI เจ้าหน้าที่)
   - NextAuth.js credentials provider
   - bcrypt password hashing (cost factor 12+)
   - Session-based auth (HTTP-only cookies)
   - RBAC: Super Admin / Content Admin / Editor / Viewer
   - MFA (TOTP) สำหรับ Super Admin
   - Session timeout: 30 นาที inactive

2. Strapi Admin Authentication
   - Strapi built-in JWT auth
   - Custom RBAC roles ตามโครงสร้าง BOI
   - IP whitelist สำหรับ Strapi admin panel
   - Separate admin URL (ไม่ใช่ /admin)

3. Member Authentication (นักลงทุน — ถ้ามี)
   - NextAuth.js credentials + social login
   - Email verification
   - Password policy: 8+ chars, upper+lower+number+special
   - Account lockout: 5 failed attempts = lock 15 นาที
   - PDPA consent tracking

4. SSO Integration
   - เชื่อมกับ Single Sign On ของ BOI (ตาม TOR 4.2.6)
   - SAML 2.0 หรือ OIDC protocol
```

### 7.2 Input Validation (ทุก endpoint)

```
กฎเหล็ก: ทุก API endpoint ต้องมี input validation

วิธีการ:
1. ใช้ Zod schema สำหรับทุก request body
2. Validate query parameters ด้วย Zod
3. Validate path parameters
4. Sanitize HTML content ด้วย DOMPurify (server-side)
5. File upload: whitelist MIME types + extension + max size
6. ห้าม eval(), new Function(), dynamic import จาก user input

ตัวอย่าง Pattern:
- API Route: import { z } from 'zod' → define schema → parse request
- Middleware: validate before handler
- Error: return 400 + safe error message (ไม่ expose internals)
```

### 7.3 Content Security Policy (CSP)

```
กฎเหล็ก: ห้าม unsafe-inline และ unsafe-eval

CSP ที่ต้องใช้สำหรับ BOI:
- default-src 'self'
- script-src 'self' 'nonce-{random}' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/
- style-src 'self' 'nonce-{random}' https://fonts.googleapis.com
- img-src 'self' data: https: blob:
- font-src 'self' https://fonts.gstatic.com
- connect-src 'self' https://www.google-analytics.com https://api.boi.go.th
- frame-src 'self' https://www.google.com/recaptcha/
- object-src 'none'
- base-uri 'self'
- form-action 'self'
- frame-ancestors 'self'
- upgrade-insecure-requests

วิธี implement nonce:
- Next.js middleware สร้าง nonce ทุก request
- ส่ง nonce ผ่าน headers → ใช้ใน <script nonce={nonce}> และ <style nonce={nonce}>
```

### 7.4 Rate Limiting

```
กฎเหล็ก: ทุก API endpoint ต้องมี rate limit

Rate limit tiers สำหรับ BOI:
1. Public API: 100 requests/minute per IP
2. Auth endpoints (login/register): 10 requests/minute per IP
3. Contact form: 5 requests/minute per IP
4. Search API: 30 requests/minute per IP
5. File upload: 10 requests/hour per user
6. Admin API: 200 requests/minute per authenticated user
7. Strapi API: ใช้ Strapi rate-limit plugin

Implementation:
- Redis-based rate limiting (ใช้ Redis ที่มีอยู่แล้ว)
- Sliding window algorithm
- Return 429 Too Many Requests + Retry-After header
- Log rate limit violations สำหรับ monitoring
```

### 7.5 Audit Logging (TOR ข้อ 4 — >= 365 วัน)

```
กฎเหล็ก: ทุก action สำคัญต้องถูก log พร้อมข้อมูลประกอบ

Events ที่ต้อง log (ตาม TOR):
1. การเข้าสู่ระบบ (login success/failure)
2. การเปลี่ยนแปลงสิทธิ์ (role change)
3. การระงับบัญชี (account suspend)
4. การปลดระงับบัญชี (account unsuspend)
5. การลบเนื้อหา (content delete)
6. การซ่อนเนื้อหา (content hide)
7. การแก้ไขเนื้อหาสำคัญ (critical content edit)
8. การ export/download ข้อมูลสำคัญ

ข้อมูลประกอบแต่ละ log:
- ผู้ปฏิบัติ (user_id, username, role)
- วันเวลา (ISO 8601 timestamp)
- เหตุผล (reason — ถ้ามี)
- IP Address
- User Agent
- Action type
- Resource affected
- Before/After values (สำหรับ edit)

Storage:
- Primary: PostgreSQL audit_logs table
- Retention: >= 365 วัน (ตาม TOR)
- Backup: daily backup รวมกับ DB backup
- Index: timestamp + user_id + action_type

Admin UI:
- ตาราง audit log + filter + search + export
- แสดง timeline กิจกรรมของ user
- Permission: Super Admin เท่านั้นที่ดู audit log ได้
```

### 7.6 File Security

```
กฎเหล็ก: ทุก file operation ต้อง validate path

File Upload:
- Whitelist MIME types: image/jpeg, image/png, image/gif, image/webp, application/pdf, application/vnd.openxmlformats-officedocument.*
- Max file size: 10MB (images), 50MB (documents)
- ใช้ path.basename() ทุกครั้ง — ห้ามใช้ user input เป็น path โดยตรง
- Rename file เป็น UUID — ห้ามใช้ original filename
- Scan for malware (ClamAV หรือ similar) ถ้าเป็นไปได้
- Store นอก web root

File Download:
- Validate path ไม่มี ../ หรือ path traversal characters
- Whitelist allowed directories
- Set Content-Disposition header
- X-Content-Type-Options: nosniff
```

### 7.7 CSRF Protection

```
กฎเหล็ก: ทุก form ที่ทำ mutation ต้องมี CSRF token

Implementation:
- Server Action (Next.js 15): ใช้ built-in CSRF protection
- API Routes: ใช้ csrf token middleware
- Token: random 32-byte hex, เก็บใน HTTP-only cookie + ส่งใน form hidden field
- Validate: เปรียบเทียบ cookie value กับ form value
- SameSite=Strict cookies
```

---

## 8. Infrastructure Security

### 8.1 Docker Configuration (สำหรับ BOI)

```
Requirements:
- Docker Swarm (ไม่ใช่ K8s — ตามที่ตัดสินใจ)
- แยก environment: Dev / UAT / Prod
- Docker secrets สำหรับ sensitive data
- Non-root container user
- Read-only filesystem ถ้าเป็นไปได้
- Resource limits (CPU/Memory)
- Health checks

Services:
1. next-app (Next.js 15 frontend + API routes)
2. strapi (Strapi v5 CMS backend)
3. postgres (PostgreSQL database)
4. redis (Cache + Rate limiting + Session)
5. nginx (Reverse proxy + WAF + TLS termination)
```

### 8.2 Nginx Security

```
กฎเหล็ก Nginx:
- TLS 1.2+ (prefer 1.3)
- Strong cipher suites
- OCSP Stapling
- Hide server version (server_tokens off)
- Limit request body size (client_max_body_size 50m)
- Disable unnecessary HTTP methods (TRACE, DELETE on public)
- Rate limiting at Nginx level (backup for app-level)
- Deny access to hidden files (.env, .git, etc.)
- Block common attack patterns (ModSecurity/OWASP CRS ถ้ามี WAF)
```

### 8.3 Server Hardening (TOR ภาคผนวก ค. ข้อ 6)

```
Checklist:
[ ] SSH: Key-based auth only, disable root login, change default port
[ ] Firewall: UFW/iptables — allow only 80, 443, SSH port
[ ] Disable unused services
[ ] Auto security updates (unattended-upgrades)
[ ] Fail2ban สำหรับ SSH + Nginx
[ ] Log rotation (logrotate)
[ ] File permission audit
[ ] Kernel hardening (sysctl)
[ ] AppArmor/SELinux profiles
[ ] Regular vulnerability scanning
```

### 8.4 CI/CD Security

```
Pipeline:
1. Code Push → GitHub Actions
2. Lint + Type Check
3. Unit Tests (>= 80% coverage)
4. SAST (Static Application Security Testing) — semgrep/eslint-plugin-security
5. Dependency Audit (npm audit)
6. Docker Build
7. E2E Tests
8. Deploy to environment

Security in CI/CD:
- Secrets ไม่อยู่ใน code — ใช้ GitHub Secrets
- Docker image scanning (Trivy)
- Branch protection rules
- Code review required before merge to main
- Signed commits (ถ้าเป็นไปได้)
```

### 8.5 Backup & Restore (TOR ข้อ 1.3)

```
Policy:
- Database: Daily full backup + hourly WAL archive
- File uploads: Daily incremental backup
- Configuration: Version controlled (Git)
- Retention: 30 วัน daily + 12 เดือน monthly
- Storage: แยก server/location จาก production
- Encryption: AES-256 สำหรับ backup files
- Test restore: ทดสอบทุกเดือน
```

---

## 9. Compliance Matrix

### 9.1 WCAG 2.1 Level AA

> **เอกสารเพิ่มเติม**: ดู `Docs/WCAG.md` สำหรับ WCAG Accessibility Widget prompt (14 ฟีเจอร์ + implementation guide)
> Widget ต้อง comply กับ CSP nonce rules (ห้าม inject inline `<style>` — ใช้ CSS file แทน)

| Principle | Guideline | สิ่งที่ต้องทำ (BOI) |
|---|---|---|
| Perceivable | Text alternatives | alt text ทุกรูป, aria-label ทุก icon |
| Perceivable | Captions/Audio desc | วิดีโอต้องมี captions (th/en) |
| Perceivable | Adaptable | Semantic HTML, heading hierarchy, landmark regions |
| Perceivable | Distinguishable | Color contrast >= 4.5:1, resize text 200%, no content loss |
| Operable | Keyboard | ทุก interactive element ใช้ keyboard ได้, visible focus |
| Operable | Enough time | No auto-play, ขยายเวลา session ได้ |
| Operable | Seizures | ไม่มี flash > 3 ครั้ง/วินาที |
| Operable | Navigable | Skip to content, descriptive page titles, focus order |
| Understandable | Readable | ระบุ lang attribute, ขยายคำย่อ |
| Understandable | Predictable | Consistent navigation, consistent identification |
| Understandable | Input assistance | Error identification, labels, error prevention |
| Robust | Compatible | Valid HTML, name/role/value ถูกต้อง |

### 9.2 PDPA Compliance

| Requirement | สิ่งที่ต้องทำ (BOI) |
|---|---|
| Privacy Policy | หน้า Privacy Policy ภาษาไทย + อังกฤษ |
| Cookie Consent | Cookie consent banner + granular settings |
| Data Collection Notice | แจ้งวัตถุประสงค์ก่อนเก็บข้อมูล |
| Right to Access | User สามารถขอดูข้อมูลตัวเองได้ |
| Right to Delete | User สามารถขอลบข้อมูลได้ |
| Right to Correct | User สามารถแก้ไขข้อมูลได้ |
| Data Retention | กำหนดระยะเวลาเก็บข้อมูลชัดเจน |
| Security Measures | มาตรการรักษาความปลอดภัยข้อมูลส่วนบุคคล |
| DPO | แต่งตั้ง Data Protection Officer |

### 9.3 Lighthouse >= 80 ทุก Category (TOR กำหนด >= 80, เป้าหมายเรา Accessibility >= 90)

| Category | TOR ขั้นต่ำ | เป้าหมายเรา | สิ่งที่ต้องทำ |
|---|---|---|---|
| Performance | >= 80 | >= 80 | Image optimization, lazy loading, code splitting, caching |
| Accessibility | >= 80 | >= 90 | WCAG 2.1 AA compliance (ดูข้อ 9.1) + WCAG Widget (`Docs/WCAG.md`) |
| Best Practices | >= 80 | >= 80 | HTTPS, no deprecated APIs, no console errors |
| SEO | >= 80 | >= 80 | Meta tags, structured data, sitemap.xml, robots.txt |

---

## 10. Pentest Preparation Guide

### 10.1 ภาพรวม Pentest ตาม TOR

| ครั้งที่ | ช่วงเวลา | ประเภท | ขอบเขต |
|---|---|---|---|
| 1 | ตอนตรวจรับงาน | White-box + Black-box | 1 IP + 1 URL |
| 2 | ปีที่ 1 (Q1-Q2 รับประกัน) | White-box + Black-box | 1 IP + 1 URL |
| 3 | ปีที่ 1 (Q3-Q4 รับประกัน) | White-box + Black-box | 1 IP + 1 URL |
| 4 | ปีที่ 2 (Q1-Q2 รับประกัน) | White-box + Black-box | 1 IP + 1 URL |
| 5 | ปีที่ 2 (Q3-Q4 รับประกัน) | White-box + Black-box | 1 IP + 1 URL |

### 10.2 White-box Penetration Testing (TOR ค.5.1)

```
ขอบเขต:
- เจาะจากเครือข่ายภายใน BOI
- ไม่เกิน 1 IP Address
- ใช้วิธี Ethical Hacking
- ตามมาตรฐาน OWASP

ต้องทดสอบ:
1. Network scanning (Nmap)
2. Vulnerability scanning (Nessus/OpenVAS)
3. Web Application testing (Burp Suite/OWASP ZAP)
4. Database security testing
5. Authentication/Authorization bypass
6. Privilege escalation
7. Data exfiltration

Deliverables:
- รายงานจุดอ่อนของระบบ
- ระดับความเสี่ยง (CVSS scoring)
- ข้อเสนอแนะในการปรับปรุง
```

### 10.3 Black-box Penetration Testing (TOR ค.5.2)

```
ขอบเขต:
- เจาะจากเครือข่ายภายนอก (Internet)
- ไม่เกิน 1 URL
- ใช้วิธี Ethical Hacking
- ตามมาตรฐาน OWASP

ต้องทดสอบ:
1. External port scanning
2. Web application vulnerabilities
3. SSL/TLS configuration
4. DNS security
5. Information disclosure
6. Public-facing API security
7. Social engineering vectors (passive)

Deliverables:
- รายงานผลการเจาะระบบ
- จุดอ่อนและระดับความเสี่ยง
- ข้อเสนอแนะการปรับปรุง
```

### 10.4 Pre-Pentest Checklist

```
ก่อน Pentest ครั้งที่ 1 (ตอนรับงาน) ต้องแก้ไขให้ครบ:

CRITICAL — ต้องเสร็จ:
[ ] Authentication system ทำงานจริง
[ ] Admin panel มี auth + RBAC
[ ] Path traversal vulnerabilities แก้แล้ว
[ ] Audit logging ทำงานจริง >= 365 วัน
[ ] Database connection + backup policy

HIGH — ควรเสร็จ:
[ ] CSP ไม่มี unsafe-inline/eval
[ ] Rate limiting ทุก API
[ ] reCAPTCHA จริง (ไม่ใช่ mock)
[ ] CSRF protection ทุก form
[ ] Input validation ทุก endpoint
[ ] Error handling (ไม่ expose internals)

MEDIUM — ดีถ้าเสร็จ:
[ ] Docker + environment separation
[ ] CI/CD pipeline ทำงาน
[ ] Server hardening เสร็จ
[ ] WCAG 2.1 AA ผ่าน
[ ] Unit test >= 80%
[ ] E2E test ครอบคลุม critical paths
[ ] Load test ผ่าน 1,000 concurrent
```

---

## 11. Gap Summary & Roadmap

### สรุป Gap ระหว่าง TOR กับสิ่งที่ต้องสร้าง

| หมวด | TOR กำหนด | สิ่งที่ต้องสร้าง (BOI) | ระดับ GAP |
|---|---|---|---|
| **Authentication** | Login + Session + RBAC + SSO | NextAuth.js + RBAC + SSO integration | สร้างทั้งระบบ |
| **Database** | MS SQL Server + ORM + Backup | PostgreSQL/MSSQL + Prisma + pg_dump | ต้องตัดสินใจ DB + สร้าง |
| **API Security** | REST + Validation + Rate Limit | Strapi API + Zod validation + Redis rate limit | Hardening + เพิ่ม validation |
| **Testing** | Unit 80% + E2E + Load 1K + Abuse | Jest + Playwright + k6 | สร้าง test suite ทั้งหมด |
| **Security Headers** | HTTPS + CSP + WAF + CAPTCHA | Nginx TLS + nonce CSP + reCAPTCHA v3 | แก้ CSP + เพิ่ม WAF |
| **Logging** | Audit Log >= 365 วัน | Winston + DB audit table | สร้าง logging system |
| **Pentest** | White-box + Black-box 5 ครั้ง | จ้างผู้เชี่ยวชาญ + เตรียมระบบ | ต้องจ้าง/ทำ |
| **Docker/CI/CD** | Container + Dev/UAT/Prod + Pipeline | Docker Swarm + GitHub Actions | สร้างทั้งหมด |
| **Compliance** | WCAG 2.1 AA + PDPA + Lighthouse 80+ | ตรวจ + แก้ไข | ตรวจสอบ + แก้ไข |
| **Server Hardening** | ปิดช่องโหว่ OS + Server + Network | SSH, Firewall, Patching, Fail2ban | Harden ทั้งหมด |

### Roadmap แนะนำ

```
Phase 1 — Foundation (สัปดาห์ 1-2):
  - สร้าง Auth system (NextAuth.js + RBAC)
  - เชื่อม Database + ORM
  - แก้ Path Traversal + CSP
  - เพิ่ม Rate Limiting
  - เพิ่ม Input Validation (Zod)

Phase 2 — Hardening (สัปดาห์ 3-4):
  - สร้าง Audit Logging system
  - ใช้ reCAPTCHA จริง
  - เพิ่ม CSRF Protection
  - สร้าง Docker configuration
  - Server Hardening

Phase 3 — Testing (สัปดาห์ 5-6):
  - Unit Tests >= 80%
  - E2E Tests (Playwright)
  - Load Tests (k6 — 1,000 concurrent)
  - Abuse/Spam Tests
  - Lighthouse optimization

Phase 4 — Compliance & Pentest Prep (สัปดาห์ 7-8):
  - WCAG 2.1 AA audit + fixes
  - PDPA compliance check
  - CI/CD Pipeline
  - API documentation (OpenAPI)
  - Pre-Pentest Checklist ✓ ทุกข้อ

Phase 5 — Pentest ครั้งที่ 1:
  - White-box test (ภายใน BOI)
  - Black-box test (จากภายนอก)
  - รายงานผล + แก้ไขช่องโหว่ที่พบ
```

---

> **เอกสารนี้ต้อง update ทุกครั้งที่มีการเปลี่ยนแปลง Security requirements หรือพบช่องโหว่ใหม่**
> **Last updated: 2026-03-02**
