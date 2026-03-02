# BOI Website - New Sitemap Design
## เว็บไซต์ใหม่: https://www.boi.go.th
## Next.js Framework | Headless CMS Architecture

---

## Design Principles (หลักการออกแบบ Sitemap)

1. **Maximum 3 levels deep** - ไม่เกิน 3 ระดับ ลด cognitive load
2. **Task-oriented navigation** - จัดเมนูตาม "สิ่งที่ผู้ใช้ต้องการทำ" ไม่ใช่โครงสร้างองค์กร
3. **No Killer Pages** - ทุกหน้ามี Related Content, CTA, Breadcrumb
4. **Cross-linking everywhere** - เนื้อหาเชื่อมโยงกันข้ามหมวด
5. **Unified portal** - รวม sub-sites ภายใต้ UX เดียวกัน
6. **Mobile-first IA** - โครงสร้างที่ทำงานดีบน mobile

---

## 1. Global Navigation (เมนูหลัก)

```
┌─────────────────────────────────────────────────────────────┐
│  LOGO  │ Discover │ Invest │ Services │ Resources │ About  │
│        │ Thailand │  Now   │          │           │  BOI   │
├────────┴──────────┴────────┴──────────┴───────────┴────────┤
│  [Search] [Language: TH|EN|JP|CN|KR|DE|FR] [Subscribe]     │
└─────────────────────────────────────────────────────────────┘
```

**เหตุผล**: ลดจาก 5 เมนูเดิมที่ซับซ้อน → 5 เมนูใหม่ที่ชัดเจน task-oriented

---

## 2. Detailed Sitemap Structure

### 2.1 HOME (หน้าแรก)
```
/ (Homepage)
├── Hero Section
│   ├── Key Message: "Your Gateway to Investment in Thailand"
│   ├── Quick Action Buttons
│   │   ├── [Check Eligibility] → /invest/eligibility-checker
│   │   ├── [Apply Now] → /services/apply
│   │   └── [Book Consultation] → /services/consultation
│   └── Search Bar (prominent)
│
├── Investment Highlights
│   ├── Key Statistics (animated counters)
│   │   ├── Total Investment Value
│   │   ├── Number of Promoted Projects
│   │   ├── Countries Investing
│   │   └── Jobs Created
│   └── [View Full Data] → /resources/data
│
├── Why Thailand Section
│   ├── 4-6 Key Advantages (cards)
│   └── [Learn More] → /discover
│
├── Latest Updates
│   ├── News Carousel (3-5 items)
│   ├── Upcoming Events (2-3 items)
│   └── New Announcements (2-3 items)
│
├── Success Stories Spotlight
│   ├── Featured Story (large card)
│   ├── 2-3 Thumbnail Stories
│   └── [View All Stories] → /discover/success-stories
│
├── Quick Services
│   ├── [e-Investment] → /services/e-investment
│   ├── [Visa & Work Permit] → /services/visa
│   ├── [Smart Visa] → /services/smart-visa
│   └── [OSOS] → /services/osos
│
└── Partners & Networks
    ├── Partner Logos
    └── Regional Offices Map
```

**Related Content Strategy**:
- Homepage → ทุก section, cross-link ไปทุกส่วนของเว็บ
- ไม่มีทางเป็น Killer Page

---

### 2.2 DISCOVER THAILAND (ทำความรู้จักไทย)
```
/discover
├── /discover/thailand-overview
│   ├── Country Profile (Economy, Infrastructure, Workforce)
│   ├── Key Economic Indicators (Interactive Dashboard)
│   ├── Thailand's Competitive Advantages
│   └── Related: → /invest/incentives, /resources/data
│
├── /discover/industries
│   ├── /discover/industries/agriculture-food-biotech
│   ├── /discover/industries/medical
│   ├── /discover/industries/machinery-vehicles
│   ├── /discover/industries/electrical-electronics
│   ├── /discover/industries/metals-materials
│   ├── /discover/industries/chemicals-petrochemicals
│   ├── /discover/industries/public-utilities
│   ├── /discover/industries/digital
│   ├── /discover/industries/creative-industries
│   └── /discover/industries/high-value-services
│   [แต่ละ industry page มี: Overview, Incentives Link, Success Stories, Related Companies]
│
├── /discover/special-zones
│   ├── Eastern Economic Corridor (EEC)
│   ├── Special Economic Zones (SEZ)
│   └── Industrial Estates
│   Related: → /invest/incentives (zone-based)
│
├── /discover/success-stories
│   ├── Filter by: Industry | Country | Company Size
│   ├── Featured Stories
│   └── All Stories (Listing with pagination)
│   Related: → /discover/industries, /invest/eligible-activities
│
└── /discover/advertorials
    ├── Latest Articles
    └── Archive
    Related: → /resources/news, /discover/success-stories
```

**Description**: "Discover Thailand" เป็นเมนูสำหรับ **AWARENESS stage** - ผู้ใช้ที่กำลังหาข้อมูลว่าทำไมต้องลงทุนในไทย

**Anti-Killer Page**:
- ทุก industry page ลิงก์ไป incentives + success stories + related companies
- ทุก success story ลิงก์กลับไป industry + eligible activities
- มี "Next Step" CTA ทุกหน้า: "Ready to invest? → Check your eligibility"

---

### 2.3 INVEST NOW (ลงทุนเลย)
```
/invest
├── /invest/getting-started
│   ├── Investment Journey Overview (Step-by-step Visual)
│   ├── "Am I eligible?" Quick Guide
│   ├── Preparing Your Application Checklist
│   └── Timeline: How Long Does It Take?
│   Related: → /invest/eligibility-checker, /services/consultation
│
├── /invest/eligibility-checker ⭐ [Interactive Tool - NEW]
│   ├── Industry Selector
│   ├── Activity Matcher
│   ├── Eligibility Result
│   └── Next Steps Recommendation
│   Related: → /invest/eligible-activities, /invest/incentives
│
├── /invest/eligible-activities
│   ├── Full List of Eligible Activities (Searchable/Filterable)
│   ├── 10 Industry Categories
│   ├── BCG Industries
│   └── Additional Measures
│   Related: → /invest/eligibility-checker, /invest/incentives
│
├── /invest/incentives
│   ├── Tax Incentives (CIT exemption, import duty)
│   ├── Non-Tax Incentives (Foreign ownership, land, visa)
│   ├── Zone-Based Incentives (Map visualization)
│   └── Special Measures
│   Related: → /invest/eligible-activities, /discover/special-zones
│
├── /invest/procedures
│   ├── Application Process (Step-by-step with diagrams)
│   ├── Required Documents Checklist
│   ├── After Approval: What's Next?
│   └── Operating Permit Procedures
│   Related: → /services/apply, /invest/forms
│
├── /invest/forms
│   ├── Application Forms (with online fill option)
│   ├── Operating Forms
│   ├── Report Forms
│   └── Other Forms
│   Related: → /services/e-investment, /invest/procedures
│
├── /invest/announcements
│   ├── Board Announcements
│   ├── Secretary General Announcements
│   ├── Office Announcements
│   └── Archive (Searchable)
│   Related: → /resources/news
│
├── /invest/guide
│   ├── Investment Promotion Guide (Interactive Web Version)
│   ├── PDF Download
│   └── Previous Editions
│   Related: → /invest/getting-started
│
└── /invest/non-boi
    ├── Company Registration
    ├── Foreign Business Act
    └── Business Licensing
    Related: → /invest/getting-started
```

**Description**: "Invest Now" เป็นเมนูสำหรับ **EVALUATION + DECISION stage** - ผู้ใช้ที่ตัดสินใจจะลงทุนแล้ว ต้องการรายละเอียด

**Anti-Killer Page**:
- Eligibility Checker → ผลลัพธ์ลิงก์ไป incentives + procedures + apply
- ทุก form page มี "How to fill" guide + "Submit online" CTA
- ทุก announcement มี related announcements + relevant forms

---

### 2.4 SERVICES (บริการ)
```
/services
├── /services/apply ⭐ [Unified Entry Point]
│   ├── Online Application (e-Investment Portal)
│   ├── Application Status Tracking
│   └── Required Documents
│   Related: → /invest/procedures, /invest/forms
│
├── /services/e-investment
│   ├── e-Investment Promotion System
│   ├── User Guide
│   └── FAQ
│   Related: → /services/apply
│
├── /services/visa
│   ├── Visa & Work Permit for BOI Companies
│   ├── Single Window Service
│   ├── Online Application
│   └── Required Documents
│   Related: → /services/smart-visa, /services/ltr-visa
│
├── /services/smart-visa
│   ├── About Smart Visa
│   ├── Eligibility & Categories
│   ├── Application Process
│   └── Apply Online
│   Related: → /services/visa, /services/ltr-visa
│
├── /services/ltr-visa
│   ├── About LTR Visa
│   ├── Eligibility & Categories
│   ├── Application Process
│   └── Apply Online
│   Related: → /services/visa, /services/smart-visa
│
├── /services/osos
│   ├── One Start One Stop Service
│   ├── Available Services
│   └── Online Access
│   Related: → /services/apply, /services/visa
│
├── /services/hq-portal
│   ├── HQ Business Portal
│   ├── Services Available
│   └── Access Portal
│   Related: → /services/e-investment
│
├── /services/consultation
│   ├── Book a Consultation (Online Booking)
│   ├── Available Time Slots
│   ├── Consultation Topics
│   └── BOI Offices (Map + Contact)
│   Related: → /about/offices, /invest/getting-started
│
└── /services/after-promotion
    ├── Operating Permits
    ├── Reporting Requirements
    ├── Machine Import Procedures
    └── Expert/Technician Visa
    Related: → /services/visa, /invest/forms
```

**Description**: "Services" เป็นเมนูสำหรับ **ACTION stage** - ผู้ใช้ที่ต้องการใช้บริการจริง

**Key Design Decision**: รวม 8+ sub-sites เดิม (e-Investment, VISA, Smart Visa, LTR, HQ Portal, OSOS, Booking) ภายใต้เมนู Services เดียว → ลดความสับสน

**Anti-Killer Page**:
- ทุก service page มี "Related Services" section
- Apply page มี step-by-step guide + required docs
- Consultation page ลิงก์ไป getting-started + offices

---

### 2.5 RESOURCES (ศูนย์ข้อมูล)
```
/resources
├── /resources/news
│   ├── BOI Press Releases
│   ├── BOI Updates
│   ├── Industry News
│   ├── International News
│   └── Filter by: Date | Category | Tag
│   Related: → /invest/announcements, /resources/events
│
├── /resources/events
│   ├── Upcoming Events (Calendar View + List View)
│   ├── Seminars & Webinars
│   ├── Exhibitions & Roadshows
│   ├── Event Registration
│   └── Past Events (Archive)
│   Related: → /resources/news, /resources/presentations
│
├── /resources/data ⭐ [Interactive Dashboard - NEW]
│   ├── Investment Statistics Dashboard
│   │   ├── By Year / Quarter
│   │   ├── By Industry
│   │   ├── By Country
│   │   └── By Region/Zone
│   ├── Investment Applications Data
│   ├── Export Data (CSV/PDF)
│   └── Infographics
│   Related: → /discover/thailand-overview, /discover/industries
│
├── /resources/company-database
│   ├── Search Promoted Companies
│   ├── Filter by: Industry | Country | Location | Year
│   └── Company Profile Pages
│   Related: → /discover/success-stories, /resources/data
│
├── /resources/publications
│   ├── Annual Reports
│   ├── Investment Reviews
│   ├── Brochures
│   ├── Research Papers
│   └── Filter by: Type | Year | Language
│   Related: → /invest/guide, /resources/data
│
├── /resources/multimedia
│   ├── Video Gallery
│   ├── Presentations
│   ├── Photo Gallery
│   └── Infographics
│   Related: → /resources/events, /resources/news
│
├── /resources/library
│   ├── Journal / Newsletters
│   ├── BOI Library Collection
│   └── Digital Archives
│   Related: → /resources/publications
│
└── /resources/faq
    ├── General FAQ (Accordion style)
    ├── Investment FAQ
    ├── Services FAQ
    ├── Visa & Work Permit FAQ
    └── Searchable
    Related: → /services/consultation, /invest/getting-started
```

**Description**: "Resources" เป็นเมนูสำหรับ **RESEARCH + RETENTION stage** - ข้อมูล สถิติ เอกสาร สำหรับทุกกลุ่มเป้าหมาย

**Anti-Killer Page**:
- Data Dashboard ลิงก์ไป industries + success stories
- News articles มี related news + related services
- Publications มี related data + related industries
- FAQ ทุกข้อมี link ไปยังหน้าที่เกี่ยวข้อง

---

### 2.6 ABOUT BOI (เกี่ยวกับ BOI)
```
/about
├── /about/overview
│   ├── Vision & Mission
│   ├── Strategic Plan (2023-2027)
│   ├── Organization Chart
│   ├── Board Members
│   └── History
│   Related: → /discover/thailand-overview
│
├── /about/offices
│   ├── Head Office (Map + Contact)
│   ├── Regional Offices (Interactive Map)
│   │   ├── Zone 1-8 offices
│   │   └── Contact details per office
│   └── Overseas Offices (World Map)
│       ├── Asia offices
│       ├── Europe offices
│       ├── Americas offices
│       └── Other offices
│   Related: → /services/consultation
│
├── /about/careers
│   ├── Current Openings
│   ├── How to Apply
│   └── Benefits
│   Related: → /about/overview
│
├── /about/procurement
│   ├── Procurement Announcements (ข่าวจัดซื้อจัดจ้าง)
│   ├── Price References (ประกาศราคากลาง)
│   └── Archive
│
├── /about/anti-corruption
│   ├── Anti-Corruption Center
│   ├── Whistleblower Channel
│   └── Reports
│
└── /about/press-center ⭐ [NEW]
    ├── Press Kit (Logo, Photos, Brand Guidelines)
    ├── Media Contact
    ├── Press Releases
    └── Spokesperson Info
    Related: → /resources/news, /resources/multimedia
```

**Description**: "About BOI" เป็นเมนูองค์กร สำหรับข้อมูลเกี่ยวกับ BOI โดยตรง

---

## 3. Utility Navigation (เมนูยูทิลิตี้)

```
Top Bar:
├── Language Selector [TH | EN | JP | CN | KR | DE | FR]
├── Subscribe to Newsletter
├── Font Size [A- A A+]
├── High Contrast Mode Toggle
└── Accessibility Statement

Footer:
├── Quick Links
│   ├── Sitemap
│   ├── Privacy Policy (PDPA)
│   ├── Terms of Use
│   ├── Cookie Policy
│   ├── Accessibility Statement
│   └── RSS Feed
├── Contact
│   ├── BOI Call Center: 0 2553 8111
│   ├── Email: head@boi.go.th
│   └── Address
├── Social Media
│   ├── Facebook
│   ├── YouTube
│   ├── X (Twitter)
│   ├── LINE Official
│   └── Instagram
├── Related Government Sites
│   ├── Digital Government (DGA)
│   ├── Ministry of Industry
│   └── Other agencies
└── Copyright Notice
```

---

## 4. Cross-Linking Map (แผนที่เชื่อมโยงเนื้อหา)

```
                        ┌─────────────┐
                        │  HOMEPAGE   │
                        └──────┬──────┘
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
     ┌────────────┐   ┌──────────────┐   ┌───────────┐
     │ DISCOVER   │◄─►│  INVEST NOW  │◄─►│ SERVICES  │
     │ THAILAND   │   │              │   │           │
     └─────┬──────┘   └──────┬───────┘   └─────┬─────┘
           │                 │                   │
     ┌─────▼──────┐   ┌──────▼───────┐   ┌─────▼─────┐
     │ Industries │──►│ Eligible     │──►│ Apply     │
     │            │   │ Activities   │   │ Online    │
     └─────┬──────┘   └──────┬───────┘   └───────────┘
           │                 │
     ┌─────▼──────┐   ┌──────▼───────┐
     │ Success    │──►│ Incentives   │
     │ Stories    │   │              │
     └────────────┘   └──────────────┘
           │                 │
           ▼                 ▼
     ┌──────────────────────────┐
     │      RESOURCES           │
     │  (Data, News, Events)    │
     └──────────────────────────┘
```

### Cross-Link Rules:
| Source Page | Must Link To |
|---|---|
| Industry Page | → Eligible Activities, Incentives, Success Stories, Related Companies |
| Eligible Activity | → Incentives, Procedures, Forms, Apply Online |
| Success Story | → Industry, Eligible Activity, Getting Started |
| Incentive Page | → Eligible Activities, Procedures, Zone Map |
| News Article | → Related News, Related Services, Related Industry |
| Event Page | → Registration, Related Topics, Past Events |
| Form Page | → How-To Guide, Procedures, e-Investment |
| Data/Statistics | → Related Industries, Reports, Publications |
| FAQ Answer | → Relevant Service/Procedure Page, Contact |

---

## 5. Related Content System (ระบบเนื้อหาที่เกี่ยวข้อง)

### 5.1 Every Page Must Have:

```
┌─────────────────────────────────────────────┐
│  BREADCRUMB: Home > Section > Subsection    │
├─────────────────────────────────────────────┤
│                                             │
│              MAIN CONTENT                   │
│                                             │
├─────────────────────────────────────────────┤
│  📌 CALL TO ACTION                          │
│  "Ready to invest? Check your eligibility"  │
│  [Check Now]  [Book Consultation]           │
├─────────────────────────────────────────────┤
│  🔗 RELATED CONTENT (min 3 items)           │
│  ├── Related Article/Page 1                 │
│  ├── Related Article/Page 2                 │
│  └── Related Article/Page 3                 │
├─────────────────────────────────────────────┤
│  🏷️ TAGS                                    │
│  [Investment] [Tax Incentive] [EEC] [Auto]  │
├─────────────────────────────────────────────┤
│  📢 SHARE                                   │
│  [Facebook] [X] [LINE] [Copy Link] [Print]  │
└─────────────────────────────────────────────┘
```

### 5.2 Tag Taxonomy (ระบบ Tag)

```
Tags by Category:
├── Industry Tags
│   ├── Agriculture, Medical, Digital, Creative, etc.
│
├── Service Tags
│   ├── BOI Application, Visa, Smart Visa, Tax, etc.
│
├── Location Tags
│   ├── EEC, SEZ, Bangkok, Regional, etc.
│
├── Content Type Tags
│   ├── News, Guide, Form, Statistics, Event, etc.
│
└── Audience Tags
    ├── Foreign Investor, Thai Investor, Consultant, etc.
```

---

## 6. Search Architecture (สถาปัตยกรรมการค้นหา)

### 6.1 Global Search
```
┌─────────────────────────────────────────────┐
│  🔍 Search: [________________________] [Go] │
│                                             │
│  Suggestions: (auto-complete)               │
│  ├── "Tax incentives" (Popular)             │
│  ├── "Eligible activities" (Popular)        │
│  └── "Smart visa application" (Popular)     │
│                                             │
│  Quick Filters:                             │
│  [All] [Services] [News] [Forms] [Data]     │
└─────────────────────────────────────────────┘
```

### 6.2 Search Results Page
```
/search?q=tax+incentives
├── Featured Result (if exact match)
├── Results (relevance-sorted)
│   ├── Title + Excerpt + Section + Date
│   ├── Highlighted search terms
│   └── Pagination
├── Filters Sidebar
│   ├── Content Type
│   ├── Section
│   ├── Date Range
│   └── Language
└── "No results?" suggestions
```

---

## 7. URL Structure Convention (โครงสร้าง URL)

### Naming Convention:
- **Lowercase**: ใช้ตัวพิมพ์เล็กเท่านั้น
- **Hyphens**: ใช้ `-` คั่นคำ (ไม่ใช้ `_`)
- **Descriptive**: URL บอกเนื้อหาได้
- **Short**: ไม่เกิน 3 levels จาก root
- **No parameters**: ไม่มี `?page=xxx`

### Examples:

| Old URL | New URL | Improvement |
|---|---|---|
| `/index.php?page=intro` | `/discover/thailand-overview` | SEO-friendly, descriptive |
| `/index.php?page=form_app1` | `/invest/forms/application` | Clear path |
| `/index.php?page=news_detail&id=123` | `/resources/news/boi-announces-new-incentives` | Slug-based |
| `/index.php?page=eligible_activities` | `/invest/eligible-activities` | Clean, short |

### Language URLs:
```
Thai:    /th/discover/thailand-overview
English: /en/discover/thailand-overview
Japanese: /ja/discover/thailand-overview
Chinese:  /zh/discover/thailand-overview
Korean:   /ko/discover/thailand-overview
German:   /de/discover/thailand-overview
French:   /fr/discover/thailand-overview
```

---

## 8. Page Templates (แม่แบบหน้า)

### Template 1: Landing Page
```
Use: Section landing pages (/discover, /invest, /services, /resources, /about)
Components:
├── Hero Banner (full-width image + title + subtitle)
├── Quick Navigation Cards (sub-sections)
├── Featured Content
├── Statistics/Highlights
├── CTA Section
├── Related Content
└── Footer
```

### Template 2: Content Page
```
Use: Standard information pages
Components:
├── Breadcrumb
├── Page Title + Last Updated
├── Table of Contents (sidebar)
├── Content Body (rich text)
├── Download Section (if PDFs)
├── CTA
├── Related Content (3 items)
├── Tags
└── Share Buttons
```

### Template 3: Listing Page
```
Use: News, Events, Publications, Database
Components:
├── Breadcrumb
├── Page Title
├── Search + Filters Bar
├── Results Grid/List Toggle
├── Cards (image + title + date + excerpt)
├── Pagination
└── Related Sections
```

### Template 4: Interactive Tool
```
Use: Eligibility Checker, Data Dashboard
Components:
├── Breadcrumb
├── Tool Title + Description
├── Interactive Interface
├── Results Display
├── Next Steps / CTA
├── Help / FAQ
└── Related Content
```

### Template 5: Form Page
```
Use: Download forms, Online applications
Components:
├── Breadcrumb
├── Form Title + Description
├── How to Fill Guide
├── Download Button / Online Form
├── Required Documents Checklist
├── CTA (Submit / e-Investment)
└── Related Forms
```

---

## 9. New Features (ฟีเจอร์ใหม่)

### 9.1 Eligibility Checker Tool
```
/invest/eligibility-checker

Step 1: เลือกอุตสาหกรรม
Step 2: เลือกกิจกรรม
Step 3: ระบุรายละเอียดเพิ่มเติม
Step 4: ดูผลลัพธ์
├── Eligible? Yes/No/Maybe
├── Potential Incentives
├── Required Documents
├── Next Steps
└── [Apply Now] [Book Consultation]
```

### 9.2 Investment Data Dashboard
```
/resources/data

Features:
├── Interactive Charts (Chart.js / D3.js)
├── Filter by: Year, Quarter, Industry, Country, Zone
├── Compare Mode (Year-over-Year)
├── Export: CSV, PDF, Image
├── Embed Code (for media/researchers)
└── Auto-update from BOI database
```

### 9.3 Personalization (Optional Phase 2)
```
First Visit:
"I am a..." selector
├── Foreign Investor → Customized dashboard
├── Thai Investor → Thai-focused content
├── Consultant → Professional tools
└── General Visitor → Standard view
```

### 9.4 Chatbot / AI Assistant (Optional Phase 2)
```
Floating chat widget:
├── Common Questions (auto-suggest)
├── Navigation Help ("Where can I find...")
├── Appointment Booking
└── Transfer to Human Agent
```

---

## 10. Sitemap Comparison (เปรียบเทียบเก่า vs ใหม่)

| Aspect | Old Site | New Site |
|---|---|---|
| **Navigation Levels** | 4-5 levels | 3 levels max |
| **Menu Items (Top)** | 5 menus, complex dropdowns | 5 menus, clear task-oriented |
| **Sub-Sites** | 8+ separate portals | Unified under /services |
| **URL Structure** | index.php?page=xxx | /section/sub-section (SEO-friendly) |
| **Related Content** | None | 3+ items per page |
| **Cross-Linking** | Minimal | Systematic (tag-based) |
| **Search** | Basic, poor results | Advanced with filters & suggestions |
| **Interactive Tools** | None | Eligibility Checker, Data Dashboard |
| **Killer Pages** | Many | Zero (by design) |
| **Mobile Navigation** | Desktop-adapted | Mobile-first hamburger |
| **Language** | 7 languages (incomplete) | 7 languages (complete) |
| **Breadcrumbs** | Inconsistent | Every page |
| **CTA** | Rare | Every page |
| **Tags** | None | Full taxonomy system |
| **FAQ** | None/Hidden | Dedicated section + contextual |

---

## 11. Technical Routing (Next.js)

```javascript
// Next.js App Router Structure
app/
├── [lang]/                          // Language prefix
│   ├── page.tsx                     // Homepage
│   ├── discover/
│   │   ├── page.tsx                 // Discover landing
│   │   ├── thailand-overview/
│   │   ├── industries/
│   │   │   ├── page.tsx             // Industries listing
│   │   │   └── [slug]/page.tsx      // Industry detail
│   │   ├── special-zones/
│   │   ├── success-stories/
│   │   │   ├── page.tsx             // Stories listing
│   │   │   └── [slug]/page.tsx      // Story detail
│   │   └── advertorials/
│   ├── invest/
│   │   ├── page.tsx                 // Invest landing
│   │   ├── getting-started/
│   │   ├── eligibility-checker/     // Interactive tool
│   │   ├── eligible-activities/
│   │   ├── incentives/
│   │   ├── procedures/
│   │   ├── forms/
│   │   ├── announcements/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── guide/
│   │   └── non-boi/
│   ├── services/
│   │   ├── page.tsx                 // Services landing
│   │   ├── apply/
│   │   ├── e-investment/
│   │   ├── visa/
│   │   ├── smart-visa/
│   │   ├── ltr-visa/
│   │   ├── osos/
│   │   ├── hq-portal/
│   │   ├── consultation/
│   │   └── after-promotion/
│   ├── resources/
│   │   ├── page.tsx                 // Resources landing
│   │   ├── news/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── events/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── data/                    // Dashboard
│   │   ├── company-database/
│   │   ├── publications/
│   │   ├── multimedia/
│   │   ├── library/
│   │   └── faq/
│   ├── about/
│   │   ├── page.tsx
│   │   ├── overview/
│   │   ├── offices/
│   │   ├── careers/
│   │   ├── procurement/
│   │   ├── anti-corruption/
│   │   └── press-center/
│   ├── search/page.tsx              // Search results
│   ├── sitemap/page.tsx             // HTML sitemap
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── api/                             // API Routes
│   ├── search/
│   ├── newsletter/
│   └── contact/
├── sitemap.xml/route.ts             // Auto-generated XML sitemap
└── robots.txt/route.ts
```

---

## 12. Migration Plan (แผนการย้ายข้อมูล)

### URL Redirect Map (301 Redirects)
```
OLD → NEW (ตัวอย่าง)
/index.php?page=intro → /en/discover/thailand-overview
/index.php?page=form_app1 → /en/invest/forms
/index.php?page=eligible_activities → /en/invest/eligible-activities
/index.php?page=news → /en/resources/news
/index.php?page=statistics → /en/resources/data
```

### Content Migration Priority
1. **P0 (Must)**: ประกาศ BOI, แบบฟอร์ม, Eligible Activities, Incentives
2. **P1 (High)**: ข่าว, Events, Success Stories, Publications
3. **P2 (Medium)**: Library, Video, Presentations
4. **P3 (Low)**: Archive content, old advertorials

---

*New Sitemap Design สำหรับโครงการออกแบบและพัฒนาเว็บไซต์ BOI*
*จัดทำเมื่อ: มีนาคม 2569*
*Technology: Next.js App Router + Headless CMS*
*Design Principle: Task-Oriented, Anti-Killer Page, Cross-Linked, Mobile-First*
