# Prompt: BOI Network Architecture — Interactive HTML Diagram
## สำหรับนำไปใช้กับ Claude.ai เพื่อสร้าง HTML file ที่มี animated network diagram

---

> **วิธีใช้**: Copy เนื้อหาตั้งแต่ `---START PROMPT---` ถึง `---END PROMPT---` แล้ววางใน Claude.ai (ใช้ claude.ai Projects จะดีที่สุด เพราะ context ยาวมาก)
> **Output**: Claude.ai จะสร้าง HTML file 1 ไฟล์ ที่เปิดใน browser ได้ทันที ไม่ต้อง install อะไร

---

## ---START PROMPT---

คุณคือทีมผู้เชี่ยวชาญ 6 คน ที่ทำงานร่วมกันเพื่อสร้าง **Interactive Network Architecture Diagram** สำหรับโครงการเว็บไซต์ BOI (สำนักงานคณะกรรมการส่งเสริมการลงทุน) มูลค่า 13.8 ล้านบาท

---

## SECTION 1: ACT AS — 6 Personas ที่ทำงานร่วมกัน

### Persona 1: Lead Solutions Architect
- **JD**: ออกแบบ End-to-End System Architecture ทั้งระบบ, ตัดสินใจ Technology Stack, กำหนด Data Flow
- **JS**: วาง Architecture ที่ตอบ TOR (ขอบเขตของงาน) ทุกข้อ, ออกแบบ High Availability, Disaster Recovery, Scalability
- **Experience**: 12+ ปี Enterprise Architecture, ผ่านโครงการภาครัฐมูลค่า 10+ ล้านบาท, Kubernetes Production 5+ ปี
- **Skills**: System Design, TOGAF, Microservices, Event-Driven Architecture, Cloud-Native Patterns, Capacity Planning
- **หน้าที่ในงานนี้**: กำหนด Layer ทั้ง 7 ของ architecture, ตัดสินใจ component ทุกตัว, วาง Data Flow path ทั้งหมด, ตรวจสอบว่า architecture ตอบ TOR ครบทุกข้อ

### Persona 2: Cloud Infrastructure Architect
- **JD**: ออกแบบ Kubernetes Cluster, Infrastructure as Code, Container Strategy, Auto-scaling Policies
- **JS**: K8s Deployment Design, HPA/VPA, Pod Affinity, Resource Limits, Storage Classes, Namespace Strategy
- **Experience**: 8+ ปี Cloud/Container, CKA/CKAD Certified, K8s Production 50+ clusters
- **Skills**: Kubernetes, Helm Charts, ArgoCD, Terraform, Docker, Container Registry, PV/PVC, Istio Service Mesh
- **หน้าที่ในงานนี้**: ออกแบบ K8s cluster topology, namespace strategy, resource allocation, rolling update strategy ที่ปรากฏใน diagram

### Persona 3: Network Security Architect
- **JD**: ออกแบบ Network Security Architecture, WAF Rules, Network Policies, Zero Trust Model
- **JS**: Firewall rules, WAF configuration, TLS/mTLS, Network segmentation, OWASP protection ทุกชั้น
- **Experience**: 10+ ปี Network Security, CISSP/CCSP Certified, ผ่าน Pentest ภาครัฐ 3+ โครงการ
- **Skills**: WAF (Cloudflare/ModSecurity), K8s Network Policies, Calico/Cilium CNI, OWASP CRS, TLS 1.3, mTLS, Falco
- **หน้าที่ในงานนี้**: กำหนด security perimeter ทุก layer ที่ปรากฏใน diagram, ระบุ encryption points, firewall boundaries, WAF rules, network policy boundaries

### Persona 4: DevOps/SRE Lead
- **JD**: ออกแบบ CI/CD Pipeline, Monitoring Stack, SLA/SLO Management, Incident Response
- **JS**: GitOps workflow, Observability stack (Metrics/Logs/Traces), Alert rules, Backup automation, DR drill
- **Experience**: 8+ ปี DevOps/SRE, ดูแลระบบ 99.9% uptime, ผ่าน Load Test 1,000+ concurrent users
- **Skills**: GitHub Actions, ArgoCD, Prometheus/Grafana, ELK Stack, Jaeger, k6/Artillery, PagerDuty
- **หน้าที่ในงานนี้**: ออกแบบ CI/CD pipeline flow, monitoring stack, alert flow ที่ปรากฏใน diagram

### Persona 5: Data Architect
- **JD**: ออกแบบ Database Architecture, Data Flow, Caching Strategy, Backup Policy
- **JS**: PostgreSQL HA (Primary+Replica), Redis Cluster, Data Migration Plan, Audit Log Schema, Retention >= 365 วัน
- **Experience**: 8+ ปี Database Architecture, PostgreSQL Production 100TB+, Data Migration 3+ โครงการ
- **Skills**: PostgreSQL, PgBouncer, Redis Sentinel/Cluster, MinIO/S3, pg_dump/WAL Archiving, ETL, PDPA Data Governance
- **หน้าที่ในงานนี้**: ออกแบบ data layer topology ที่ปรากฏใน diagram, กำหนด data flow paths ระหว่าง components

### Persona 6: Interactive Visualization Engineer
- **JD**: สร้าง Interactive Network Diagram ระดับ Presentation-grade ด้วย HTML/SVG/CSS/JS
- **JS**: SVG Animation, CSS Keyframes, JavaScript Interactivity, Responsive Design, Print-friendly Layout
- **Experience**: 7+ ปี Data Visualization, D3.js/SVG Animation, ทำ infographic สำหรับ Enterprise pitch 10+ โครงการ
- **Skills**: SVG, CSS Animation (@keyframes), JavaScript ES6+, D3.js, HTML5 Canvas, Color Theory, Typography, Responsive Design
- **หน้าที่ในงานนี้**: แปลง Architecture spec → Interactive HTML file ที่สวยระดับ Stripe/Linear, มี animated data flow, hover tooltips, เปิด present ให้กรรมการได้ทันที

---

## SECTION 2: Network Architecture Specification

### โครงการ BOI Website — ข้อมูลพื้นฐาน
- **ชื่อโครงการ**: จ้างออกแบบและพัฒนาเว็บไซต์สำนักงานคณะกรรมการส่งเสริมการลงทุน (BOI)
- **งบประมาณ**: ฿13,803,700
- **ผู้เสนอ**: SYNERRY — Government Website Specialist #1 ในไทย
- **Domain**: https://www.boi.go.th
- **Tech Stack**: Next.js 15 (App Router) + Strapi v5 CMS + PostgreSQL + Redis + Kubernetes
- **ภาษา**: 7 ภาษา (TH/EN/JP/CN/KR/DE/FR)
- **Big Idea**: "จาก Gate Keeper สู่ Gate Opener — Thailand Opens for You"

### Architecture ทั้ง 7 Layers (เรียงจากบนลงล่าง)

#### Layer 1: CDN & Edge Protection
```
Components:
├── Cloudflare CDN (Global Edge Network)
│   ├── 300+ PoP worldwide → ลด latency สำหรับนักลงทุนทั่วโลก
│   ├── Static asset caching (images, CSS, JS)
│   └── Brotli compression
│
├── Web Application Firewall (WAF)
│   ├── OWASP Core Rule Set (CRS)
│   ├── Bot detection & mitigation
│   ├── DDoS protection (L3/L4/L7)
│   └── Rate limiting (Layer 7)
│
├── DNS (boi.go.th)
│   ├── DNSSEC enabled
│   ├── GeoDNS → route นักลงทุนไปยัง edge ที่ใกล้ที่สุด
│   └── Failover DNS
│
└── SSL/TLS 1.3 Termination
    ├── Let's Encrypt auto-renewal (cert-manager)
    ├── HSTS with preload
    └── OCSP Stapling
```
**TOR ที่ตอบ**: 5.5 (OWASP), 5.7 (System Hardening), 5.8 (Network Security)

**Tooltip text**: "CDN & Edge Protection — ชั้นแรกที่ปกป้องเว็บไซต์จากการโจมตีทาง cyber ด้วย WAF + DDoS Protection พร้อม cache เนื้อหาไปยัง 300+ จุดทั่วโลก ทำให้นักลงทุนจากทุกประเทศเปิดเว็บได้เร็ว"

#### Layer 2: Ingress & API Gateway
```
Components:
├── Nginx Ingress Controller
│   ├── TLS termination (internal)
│   ├── URL routing & path-based routing
│   ├── WebSocket support (for AI Chat)
│   └── Connection limits & timeouts
│
├── Kong API Gateway
│   ├── API versioning (v1, v2...)
│   ├── Rate limiting per endpoint
│   │   ├── Public API: 100 req/min per IP
│   │   ├── Auth endpoints: 10 req/min per IP
│   │   ├── Search API: 30 req/min per IP
│   │   └── Admin API: 200 req/min per user
│   ├── API key management
│   ├── Request/Response transformation
│   ├── OAuth2/OIDC integration
│   ├── Request logging & analytics
│   └── OpenAPI documentation (ตาม API Interoperability 3.0)
│
└── Google reCAPTCHA v3
    ├── Bot protection สำหรับ forms
    └── Risk scoring
```
**TOR ที่ตอบ**: 4.11 (API เชื่อมโยง), 5.5 (Rate Limiting), TOR ภาคผนวก ข. ข้อ 3 (API Interoperability)

**Tooltip text**: "API Gateway — จุดเข้าเดียว (Single Entry Point) ของทุก API request ควบคุม rate limit, authentication, versioning ตามมาตรฐาน API Interoperability ของรัฐบาลดิจิทัล 3.0"

#### Layer 3: Kubernetes Cluster — Application Layer
```
Cluster: BOI Production Cluster (3 Master + 3 Worker Nodes)

Namespace: boi-frontend
├── Deployment: next-app (Next.js 15 SSR/SSG)
│   ├── Replicas: 3 (HPA: min 3, max 10)
│   ├── Resources: 1 CPU / 2Gi RAM per pod
│   ├── Health: liveness + readiness probes
│   ├── Features:
│   │   ├── Server-Side Rendering (SSR)
│   │   ├── Incremental Static Regeneration (ISR)
│   │   ├── next-intl (7 ภาษา: TH/EN/JP/CN/KR/DE/FR)
│   │   ├── Framer Motion 11 (Cinematic animations)
│   │   ├── Lenis Smooth Scroll
│   │   └── WCAG 2.1 AA Accessibility Widget
│   └── Anti-affinity: spread across nodes

Namespace: boi-cms
├── Deployment: strapi-cms (Strapi v5 Headless CMS)
│   ├── Replicas: 2 (HPA: min 2, max 5)
│   ├── Resources: 1 CPU / 2Gi RAM per pod
│   ├── Features:
│   │   ├── Content Management (41+ page types)
│   │   ├── Media Library (images, docs, videos)
│   │   ├── REST API for frontend
│   │   ├── RBAC (Super Admin / Content Admin / Editor / Viewer)
│   │   ├── Webhook integration
│   │   └── i18n plugin (7 ภาษา)
│   └── Persistent Volume: uploads storage

Namespace: boi-ai
├── Deployment: ai-chat-service
│   ├── Replicas: 2 (HPA: min 2, max 6)
│   ├── Features:
│   │   ├── BOI AI Assistant (OpenRouter API)
│   │   ├── Scoped to BOI content only
│   │   ├── Multi-language support
│   │   ├── RAG (Retrieval-Augmented Generation)
│   │   └── Conversation history (Redis-backed)
│   └── Rate limit: 20 req/min per user

Namespace: boi-search
├── Deployment: search-service (Meilisearch)
│   ├── Replicas: 2
│   ├── Features:
│   │   ├── Full-text search (7 ภาษา)
│   │   ├── Typo tolerance
│   │   ├── Faceted search (industry, year, type)
│   │   ├── Instant results (< 50ms)
│   │   └── Auto-indexing from Strapi webhook
│   └── Persistent Volume: search index
```
**TOR ที่ตอบ**: 4.2.5-4.2.18 (Web Development), 4.2.7 (Multi-language), 4.2.15 (Responsive), 4.8 (SEO), 4.12 (Frontend+Backend)

**Tooltip text**: "Kubernetes Application Cluster — หัวใจของระบบ! รัน 4 services หลัก (Frontend, CMS, AI Chat, Search) บน K8s ที่ Auto-scale ได้ตามโหลด รองรับ 1,000+ concurrent users ไม่ล่ม มี Self-healing — pod ตายก็สร้างใหม่อัตโนมัติ"

#### Layer 4: Security Layer (ภายใน K8s)
```
Namespace: boi-security
├── Cert-Manager
│   ├── Auto SSL certificate renewal
│   ├── Internal mTLS certificates
│   └── Let's Encrypt ClusterIssuer
│
├── HashiCorp Vault
│   ├── Secret management (DB passwords, API keys, encryption keys)
│   ├── Dynamic secrets (auto-rotation)
│   ├── Kubernetes auth method
│   └── Audit logging ทุก secret access
│
├── K8s Network Policies (Calico)
│   ├── Default deny all ingress/egress
│   ├── Whitelist only necessary pod-to-pod communication
│   ├── Isolate namespaces (frontend ⇄ CMS ⇄ DB only)
│   └── Block external access except through Ingress
│
├── Pod Security Standards
│   ├── Restricted profile (no root, no privilege escalation)
│   ├── Read-only root filesystem
│   ├── Drop all capabilities
│   └── Seccomp profile: RuntimeDefault
│
├── Falco (Runtime Security)
│   ├── Detect anomalous container behavior
│   ├── File system monitoring
│   ├── Network activity monitoring
│   └── Alert → Prometheus → PagerDuty
│
└── Trivy (Container Scanning)
    ├── Scan images in CI/CD pipeline
    ├── Scan running containers
    ├── CVE database auto-update
    └── Block deployment if CRITICAL CVE found
```
**TOR ที่ตอบ**: 5.1-5.10 (Security ทั้งหมด), 5.4 (Log File), 5.5 (OWASP), 5.6 (Pentest readiness), 5.7 (System Hardening), 5.9 (PDPA)

**Tooltip text**: "Security Layer — Zero Trust Architecture! ทุก pod ถูก isolate ด้วย Network Policy, secrets ถูกจัดการด้วย Vault (auto-rotate), container ถูก scan ก่อน deploy, runtime ถูก monitor ด้วย Falco ตอบ OWASP Top 10 + TOR ด้าน Security ครบทุกข้อ"

#### Layer 5: Data Layer
```
Components:
├── PostgreSQL 16 (Managed/StatefulSet)
│   ├── Primary (Read/Write)
│   │   ├── 4 CPU / 16Gi RAM
│   │   ├── 500GB SSD (PVC)
│   │   └── WAL archiving enabled
│   ├── Replica (Read-only)
│   │   ├── Streaming replication
│   │   ├── Auto failover (Patroni)
│   │   └── Read queries load balancing
│   ├── PgBouncer (Connection Pooling)
│   │   ├── Max 200 connections
│   │   └── Transaction-level pooling
│   ├── Databases:
│   │   ├── boi_main (Strapi CMS data)
│   │   ├── boi_audit (Audit logs >= 365 วัน)
│   │   └── boi_analytics (Usage statistics)
│   └── Backup:
│       ├── Daily full backup (pg_dump)
│       ├── Continuous WAL archiving (point-in-time recovery)
│       ├── Retention: 30 วัน daily + 12 เดือน monthly
│       ├── Encryption: AES-256
│       └── Cross-AZ storage
│
├── Redis Cluster (StatefulSet)
│   ├── 3 Master + 3 Replica (Redis Sentinel)
│   ├── Use cases:
│   │   ├── Session storage (HTTP-only cookies)
│   │   ├── Cache (Strapi API responses, ISR cache)
│   │   ├── Rate limiting counters
│   │   ├── AI Chat conversation history
│   │   └── Real-time pub/sub (WebSocket events)
│   ├── Memory: 4Gi per node
│   └── Persistence: AOF + RDB
│
└── MinIO (S3-compatible Object Storage)
    ├── Use cases:
    │   ├── File uploads (images, PDFs, documents)
    │   ├── Media library (Strapi)
    │   ├── Backup storage
    │   └── Static exports
    ├── Encryption at rest: AES-256
    ├── Versioning enabled
    └── Lifecycle rules (auto-archive old files)
```
**TOR ที่ตอบ**: 4.13 (Data Migration), 4.14 (File Download), 4.15 (DB Management + Backup), 5.4 (Log >= 365 วัน), 5.9 (PDPA), 5.10 (DR Plan)

**Tooltip text**: "Data Layer — PostgreSQL HA (Primary+Replica) พร้อม auto-failover ไม่มีวัน data loss! Redis Cluster สำหรับ cache/session ทำให้เว็บเร็ว MinIO เก็บไฟล์ทั้งหมด Backup อัตโนมัติทุกวัน + WAL archiving สำหรับ point-in-time recovery เก็บ audit log >= 365 วันตาม TOR"

#### Layer 6: Observability & Monitoring
```
Namespace: boi-monitoring
├── Prometheus
│   ├── Metrics collection (15s interval)
│   ├── ServiceMonitor for all deployments
│   ├── Custom metrics:
│   │   ├── API response time (p50/p95/p99)
│   │   ├── Error rate per endpoint
│   │   ├── Active users count
│   │   ├── Cache hit ratio
│   │   └── DB connection pool usage
│   └── Retention: 30 days
│
├── Grafana
│   ├── Pre-built dashboards:
│   │   ├── BOI Overview (real-time visitors, top pages)
│   │   ├── K8s Cluster Health
│   │   ├── API Performance
│   │   ├── Database Performance
│   │   ├── Security Events
│   │   └── SLA Compliance (3h/12h/24h response)
│   └── Alert panels
│
├── Alertmanager
│   ├── Alert rules:
│   │   ├── Pod restart > 3 times in 5 min → CRITICAL
│   │   ├── API error rate > 1% → WARNING
│   │   ├── DB connection > 80% → WARNING
│   │   ├── SSL cert expiry < 30 days → WARNING
│   │   ├── Disk usage > 85% → CRITICAL
│   │   └── WAF block spike → SECURITY ALERT
│   ├── Notification channels:
│   │   ├── LINE Notify (BOI team)
│   │   ├── Email (admin)
│   │   └── PagerDuty (on-call)
│   └── Escalation policy
│
├── ELK Stack (Elasticsearch + Logstash + Kibana)
│   ├── Fluent Bit (DaemonSet log collector)
│   ├── Centralized log aggregation
│   ├── Log retention: 365+ วัน (TOR requirement)
│   ├── Audit log dashboard
│   └── Security event correlation
│
├── Jaeger (Distributed Tracing)
│   ├── Request tracing across all services
│   ├── Latency breakdown per service
│   ├── Error tracking
│   └── Service dependency map
│
└── Google Analytics 4
    ├── User behavior tracking
    ├── Conversion funnels
    ├── Real-time visitors
    └── Custom events (TOR 4.16)
```
**TOR ที่ตอบ**: 4.16 (Google Analytics), 5.4 (Log File management >= 365 วัน), 4.2.3 (SLA monitoring: 3h/12h/24h)

**Tooltip text**: "Observability Stack — ระบบดูแลตัวเองอัจฉริยะ! Prometheus + Grafana แสดง real-time metrics, ELK Stack เก็บ log 365+ วันตาม TOR, Jaeger trace ทุก request, Alert อัตโนมัติผ่าน LINE/Email/PagerDuty เมื่อระบบมีปัญหา — ทีมแก้ไขได้ภายใน 3 ชั่วโมงตาม SLA"

#### Layer 7: CI/CD Pipeline
```
Pipeline Flow (Left to Right):

Developer → Git Push → GitHub (main branch)
    │
    ▼
GitHub Actions Pipeline:
    ├── 1. Code Quality
    │   ├── ESLint + Prettier
    │   ├── TypeScript type check
    │   └── SonarQube analysis
    │
    ├── 2. Security Scan
    │   ├── npm audit (dependency vulnerabilities)
    │   ├── Semgrep (SAST — static code analysis)
    │   ├── Trivy (container image scan)
    │   └── License compliance check
    │
    ├── 3. Testing
    │   ├── Unit Tests (Jest/Vitest >= 80% coverage)
    │   ├── Integration Tests
    │   ├── E2E Tests (Playwright)
    │   └── Accessibility Tests (axe-core)
    │
    ├── 4. Build & Push
    │   ├── Docker build (multi-stage)
    │   ├── Push to Container Registry (Harbor)
    │   └── Tag: git SHA + semantic version
    │
    └── 5. Deploy (ArgoCD — GitOps)
        ├── Dev → Auto deploy
        ├── UAT → Manual approval
        ├── Production → Manual approval + 2 approvers
        └── Rolling Update (zero downtime)

Post-Deploy:
    ├── Smoke tests
    ├── Lighthouse audit
    └── Synthetic monitoring
```
**TOR ที่ตอบ**: TOR ภาคผนวก ข. 1.4 (CI/CD), 2.1 (Unit Test >= 80%), 2.2 (E2E Test), 2.3 (Load Test), 2.5 (WCAG + Lighthouse >= 80)

**Tooltip text**: "CI/CD Pipeline — ทุกบรรทัดโค้ดถูก scan ความปลอดภัย, ทดสอบอัตโนมัติ >= 80% coverage, scan container image ก่อน deploy ผ่าน ArgoCD (GitOps) → Zero downtime deployment ทุกครั้ง ไม่มีเว็บล่มตอน deploy"

### External Integrations (แสดงเป็นจุดเชื่อมต่อภายนอก)
```
├── BOI Single Sign-On (SSO) — SAML 2.0 / OIDC
│   └── Tooltip: "เชื่อมระบบ SSO ของ BOI สำหรับเจ้าหน้าที่ login ครั้งเดียวใช้ได้ทุกระบบ"
│
├── BOI e-Service Applications
│   └── Tooltip: "เชื่อมต่อระบบ e-Investment, Visa & Work Permit, Smart Visa, OSOS ที่มีอยู่แล้ว"
│
├── OpenRouter AI API
│   └── Tooltip: "AI Chat Engine สำหรับ BOI AI Assistant ตอบคำถามนักลงทุนอัตโนมัติ 24/7"
│
├── Google reCAPTCHA v3
│   └── Tooltip: "ป้องกัน Bot spam ทุก form โดยไม่รบกวนผู้ใช้จริง (invisible CAPTCHA)"
│
├── Google Analytics 4
│   └── Tooltip: "ติดตามพฤติกรรมผู้ใช้เว็บไซต์ วิเคราะห์ข้อมูลเพื่อปรับปรุงในอนาคต ตาม TOR 4.16"
│
└── Freepik API (Image Service)
    └── Tooltip: "บริการรูปภาพคุณภาพสูงแบบ pay-per-use สำหรับเนื้อหาเว็บไซต์"
```

### Data Flow Paths (สำหรับ animation ไหลตามทิศทาง)

```
Flow 1: User Request (เส้นสีฟ้า — ไหลจากซ้ายไปขวา)
User → DNS → CDN/WAF → Ingress → Next.js Pod → (SSR/API) → Response

Flow 2: CMS Content (เส้นสีเขียว — ไหลจาก CMS ไป Frontend)
Strapi CMS → REST API → Next.js Pod → ISR Cache → CDN → User

Flow 3: AI Chat (เส้นสีม่วง — ไหลไปกลับ)
User ↔ WebSocket ↔ AI Chat Pod ↔ OpenRouter API ↔ Response

Flow 4: Search (เส้นสีส้ม — ไหลเร็ว)
User → Search API → Meilisearch Pod → Results (< 50ms)

Flow 5: Data Persistence (เส้นสีแดง — ไหลลงล่าง)
App Pods → PgBouncer → PostgreSQL Primary → WAL → Replica

Flow 6: Monitoring (เส้นประสีเทา — ไหลไปยัง monitoring stack)
All Pods ··→ Prometheus ··→ Grafana ··→ Alert ··→ Team

Flow 7: CI/CD Deploy (เส้นสีทอง — ไหลจากซ้ายไปขวา)
Git Push → GitHub Actions → Build → Scan → Test → Harbor → ArgoCD → K8s
```

---

## SECTION 3: HTML Output Requirements

### สิ่งที่ต้องสร้าง:
**1 ไฟล์ HTML ที่ standalone (ไม่ต้อง external dependency)** ที่ทำสิ่งต่อไปนี้:

### 3.1 Layout & Design
- **สี theme**: Navy #1B2A4A (พื้นหลักหลัก) + Gold #C5A572 (accent/highlights) + White #FFFFFF (text) + Light #F8FAFC (secondary bg)
- **Font**: ใช้ system font stack (ไม่ต้อง load external font)
- **Layout**: แนวตั้ง (vertical) — 7 layers เรียงจากบนลงล่าง, CI/CD Pipeline อยู่ด้านขวา
- **Header**: "BOI Website — Network Architecture" + subtitle "SYNERRY | Government Website Specialist" + โลโก้ BOI (ใช้ text แทนได้)
- **Footer**: "Powered by SYNERRY — Project Value: ฿13.8M | TOR Compliant Architecture"
- **ขนาด**: Full HD (1920x1080) สำหรับ present บนจอ projector

### 3.2 Components Rendering
- แต่ละ component (CDN, WAF, Ingress, Pods, DB, Redis...) ให้วาดเป็น **rounded rectangle** หรือ **icon + label**
- ใช้ **SVG** สำหรับวาด diagram ทั้งหมด
- แต่ละ Layer มี **background band** สีต่างกัน (subtle gradient) เพื่อแยก layer ชัดเจน
- Kubernetes cluster ให้วาดเป็น **dashed border** ล้อมรอบ pods ทั้งหมด
- External services ให้อยู่นอก cluster boundary

### 3.3 Animations (CSS @keyframes + SVG animate)
- **Data Flow Lines**: เส้นเชื่อมระหว่าง components มี **animated dots/dashes** ไหลตามทิศทางข้อมูลจริง
  - Flow 1 (User Request): สีฟ้า `#3B82F6` — dots ไหลจากบนลงล่าง (user → CDN → App)
  - Flow 2 (CMS Content): สีเขียว `#10B981` — dots ไหลจาก Strapi → Next.js
  - Flow 3 (AI Chat): สีม่วง `#8B5CF6` — dots ไหลไปกลับ (bidirectional)
  - Flow 4 (Search): สีส้ม `#F59E0B` — dots ไหลเร็ว (fast pulse)
  - Flow 5 (Data): สีแดง `#EF4444` — dots ไหลลงล่าง (App → DB)
  - Flow 6 (Monitoring): สีเทา `#9CA3AF` — dashed line ไหลช้า
  - Flow 7 (CI/CD): สีทอง `#C5A572` — dots ไหลจากซ้ายไปขวา
- **Pulse animation**: แต่ละ component node มี subtle pulse glow เพื่อแสดงว่า "มีชีวิต"
- **Speed**: animation ต้อง smooth, ไม่เร็วเกินไป, สบายตา (duration 3-5 วินาที per cycle)
- **Performance**: ใช้ CSS animation + SVG animate เท่านั้น (ไม่ใช้ JS animation loop เพื่อประหยัด CPU)

### 3.4 Hover Tooltips (JavaScript)
- เมื่อ **mouse hover** ที่ component ใดๆ:
  - Component นั้น **highlight** (เพิ่ม brightness/glow + scale 1.05)
  - แสดง **tooltip popup** ที่มี:
    - **ชื่อ component** (หัวข้อใหญ่)
    - **คำอธิบาย** ว่าคืออะไร ดียังไง (2-3 ประโยค ภาษาไทย)
    - **TOR ที่ตอบ** (เช่น "ตอบ TOR 5.5, 5.7")
    - **Badge**: "CRITICAL" หรือ "HIGH" หรือ "STANDARD" (ระดับความสำคัญ)
  - Tooltip ต้อง **สวย** — มี border-radius, shadow, arrow pointing to component
  - Tooltip position: อัตโนมัติ (ไม่ล้นจอ)
- เมื่อ hover ที่ **เส้น data flow**:
  - เส้นนั้น **highlight** สว่างขึ้น
  - แสดง tooltip: ชื่อ flow + คำอธิบายสั้นๆ

### 3.5 Interactive Features
- **Legend**: ด้านล่างซ้ายแสดง legend ของสี data flow ทั้ง 7 เส้น
- **Layer Labels**: ด้านซ้ายแสดงชื่อ Layer 1-7 ในแนวตั้ง
- **TOR Badge**: มุมบนขวาแสดง "TOR Compliance: 100%" พร้อม checkmark icon
- **Stats Bar**: ด้านบนแสดง key stats:
  - "7 Layers" | "4 Application Services" | "3 Database Systems" | "24/7 Monitoring" | "Zero Downtime Deploy"
- **Click to zoom** (optional): click ที่ layer ใดก็ได้เพื่อ zoom in ดู detail (ถ้าทำได้)

### 3.6 Responsive & Print
- ต้องแสดงผลได้ดีบน Desktop (1920x1080, 2560x1440)
- Print-friendly: `@media print` ให้ซ่อน animation, แสดง static version

### 3.7 Code Quality
- HTML5 semantic markup
- CSS ทั้งหมดอยู่ใน `<style>` tag (ไม่ใช้ external CSS)
- JavaScript ทั้งหมดอยู่ใน `<script>` tag (ไม่ใช้ external JS)
- **ห้าม** ใช้ CDN หรือ external library ใดๆ — ต้อง standalone 100%
- Comment code ให้ชัดเจน
- ขนาดไฟล์ไม่เกิน 200KB

---

## SECTION 4: Quality Checklist

ก่อนส่ง output ให้ตรวจสอบ:

- [ ] HTML ไฟล์เดียว standalone — เปิดใน Chrome/Safari/Edge ได้ทันที
- [ ] ทุก 7 layers แสดงครบ
- [ ] ทุก component มี tooltip เมื่อ hover
- [ ] มี animated data flow อย่างน้อย 5 เส้น ไหลตามทิศทางจริง
- [ ] สี Navy + Gold ตาม brand guideline
- [ ] มี Legend, Layer Labels, Stats Bar, TOR Badge
- [ ] ไม่มี external dependency (offline-ready)
- [ ] Tooltip ภาษาไทย + อธิบายว่า TOR ข้อไหนที่ตอบ
- [ ] Animation smooth ไม่กระตุก
- [ ] มี Header + Footer branding

---

## SECTION 5: Example Tooltip Content (อ้างอิง)

ใช้ข้อมูลนี้สำหรับ tooltip ของแต่ละ component หลัก:

| Component | Tooltip Title | Description (Thai) | TOR |
|---|---|---|---|
| Cloudflare CDN | CDN & Edge Network | กระจายเนื้อหาเว็บไซต์ไป 300+ จุดทั่วโลก ทำให้นักลงทุนจากทุกประเทศเปิดเว็บได้เร็วภายใน 1 วินาที | 5.8 |
| WAF | Web Application Firewall | ปกป้องเว็บไซต์จากการโจมตี OWASP Top 10, DDoS, SQL Injection, XSS ด้วย rule set มาตรฐานสากล | 5.5, 5.7 |
| Kong API Gateway | API Gateway | จุดเข้าเดียวของทุก API — ควบคุม rate limit, authentication, versioning ตามมาตรฐาน API Interoperability 3.0 ของรัฐบาลดิจิทัล | 4.11, ภาคผนวก ข.3 |
| Next.js 15 | Frontend Application | เว็บไซต์หลัก BOI — SSR/ISR สำหรับ SEO สูงสุด, รองรับ 7 ภาษา, Responsive Design, WCAG 2.1 AA | 4.2.5-4.2.18, 4.8 |
| Strapi v5 | Headless CMS | ระบบจัดการเนื้อหา — เจ้าหน้าที่ BOI แก้ไขเนื้อหาเว็บผ่าน UI ง่ายๆ ไม่ต้องเขียนโค้ด รองรับ RBAC 4 ระดับสิทธิ์ | 4.2, 4.12 |
| AI Chat | BOI AI Assistant | ผู้ช่วย AI อัจฉริยะ — ตอบคำถามนักลงทุน 24/7 ใน 7 ภาษา เข้าถึงข้อมูล BOI ทั้งหมดผ่าน RAG technology | เพิ่มเติม |
| Meilisearch | Smart Search | ค้นหาอัจฉริยะ — ผลลัพธ์ภายใน 50ms, รองรับ 7 ภาษา, ทนต่อ typo, กรองตามอุตสาหกรรม/ปี/ประเภท | 4.8 |
| PostgreSQL | Primary Database | ฐานข้อมูลหลัก — HA (Primary+Replica) ไม่มี single point of failure, auto-failover, backup ทุกวัน + WAL archiving, เก็บ audit log >= 365 วัน | 4.15, 5.4 |
| Redis | Cache & Session | ระบบ cache — ทำให้เว็บเร็ว 10x, จัดการ session ปลอดภัย, rate limiting ป้องกัน abuse | 5.5 |
| MinIO | Object Storage | เก็บไฟล์ทั้งหมด — รูปภาพ, PDF, เอกสาร เข้ารหัส AES-256 พร้อม versioning | 4.14 |
| Vault | Secret Manager | จัดการ secrets — รหัสผ่าน, API keys ถูกเก็บแยก auto-rotate ไม่มีวันหลุดใน source code | 5.1 |
| Prometheus | Metrics Collector | เก็บ metrics ทุก 15 วินาที — CPU, Memory, API response time, error rate สำหรับ real-time monitoring | 5.4 |
| Grafana | Dashboard | แดชบอร์ดแสดงผลแบบ real-time — ดูสุขภาพระบบทั้งหมดในหน้าเดียว พร้อม SLA tracking | 4.16 |
| ELK Stack | Log Management | เก็บ log ทั้งระบบ >= 365 วันตาม TOR — ค้นหาได้, วิเคราะห์ security events, ดู audit trail | 5.4 |
| ArgoCD | GitOps Deploy | Deploy อัตโนมัติแบบ Zero downtime — ทุกการเปลี่ยนแปลงผ่าน Git, rollback ได้ทันที | ภาคผนวก ข.1.4 |
| Network Policy | K8s Network Isolation | แยก pods ด้วย firewall ภายใน — frontend คุยกับ CMS ได้, แต่ CMS คุยกับ monitoring ไม่ได้ ลด blast radius | 5.7, 5.8 |
| Cert-Manager | TLS Certificate | จัดการ SSL อัตโนมัติ — auto-renew ไม่มีวัน cert หมดอายุ, HTTPS ทุก connection | 5.7 |

---

สร้างไฟล์ HTML ตามข้อกำหนดทั้งหมดข้างต้น

## ---END PROMPT---
