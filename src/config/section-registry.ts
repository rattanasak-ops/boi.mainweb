// ===== BOI Section Variant Registry =====
// 6 homepage sections × 4 visual variants = 24 component variants
// Hero & CTA are position-locked but can change visual variant

export type SectionId =
  | "hero"
  | "stats"
  | "why-thailand"
  | "services"
  | "news"
  | "cta";

export type VariantId = "v1" | "v2" | "v3" | "v4";

export interface SectionVariantMeta {
  id: VariantId;
  name: { th: string; en: string };
  description: { th: string; en: string };
}

export interface SectionDefinition {
  id: SectionId;
  name: { th: string; en: string };
  /** Position-locked sections (hero/cta) can't be reordered but can change variant */
  locked: boolean;
  variants: SectionVariantMeta[];
}

// All 6 homepage sections with 4 variants each
export const SECTION_REGISTRY: SectionDefinition[] = [
  {
    id: "hero",
    name: { th: "Hero Banner", en: "Hero Banner" },
    locked: true,
    variants: [
      {
        id: "v1",
        name: { th: "Fullscreen Cinematic", en: "Fullscreen Cinematic" },
        description: {
          th: "เต็มจอ วิดีโอพื้นหลัง ข้อความซ้อนทับ",
          en: "Fullscreen video background with overlay text",
        },
      },
      {
        id: "v2",
        name: { th: "Split Layout", en: "Split Layout" },
        description: {
          th: "แบ่ง 2 ฝั่ง — ข้อความซ้าย รูปขวา",
          en: "Two-column — text left, image right",
        },
      },
      {
        id: "v3",
        name: { th: "Card Carousel", en: "Card Carousel" },
        description: {
          th: "การ์ดสไลด์แนวนอน พร้อม CTA เด่นชัด",
          en: "Horizontal card carousel with prominent CTA",
        },
      },
      {
        id: "v4",
        name: { th: "Minimal Gradient", en: "Minimal Gradient" },
        description: {
          th: "พื้นหลังไล่สี มินิมอล ข้อความกลาง",
          en: "Gradient background, minimal centered text",
        },
      },
    ],
  },
  {
    id: "stats",
    name: { th: "สถิติ/ตัวเลข", en: "Statistics" },
    locked: false,
    variants: [
      {
        id: "v1",
        name: { th: "Counter Cards", en: "Counter Cards" },
        description: {
          th: "การ์ดตัวเลขวิ่ง 4 ช่อง แถวเดียว",
          en: "Animated counter cards in single row",
        },
      },
      {
        id: "v2",
        name: { th: "Infographic Strip", en: "Infographic Strip" },
        description: {
          th: "แถบยาวพร้อมกราฟเส้น + ตัวเลขเด่น",
          en: "Wide strip with line chart + key numbers",
        },
      },
      {
        id: "v3",
        name: { th: "Map + Numbers", en: "Map + Numbers" },
        description: {
          th: "แผนที่ประเทศไทยพร้อมตัวเลขซ้อน",
          en: "Thailand map with overlaid statistics",
        },
      },
      {
        id: "v4",
        name: { th: "Ticker Scroll", en: "Ticker Scroll" },
        description: {
          th: "ตัวเลขวิ่งแนวนอนสไตล์ตลาดหุ้น",
          en: "Horizontal scrolling ticker, stock-market style",
        },
      },
    ],
  },
  {
    id: "why-thailand",
    name: { th: "ทำไมต้องไทย", en: "Why Thailand" },
    locked: false,
    variants: [
      {
        id: "v1",
        name: { th: "Icon Grid", en: "Icon Grid" },
        description: {
          th: "ตาราง 3 คอลัมน์ พร้อมไอคอนและรายละเอียด",
          en: "3-column grid with icons and descriptions",
        },
      },
      {
        id: "v2",
        name: { th: "Timeline Flow", en: "Timeline Flow" },
        description: {
          th: "ไทม์ไลน์แนวตั้ง จุดเด่นต่อเนื่อง",
          en: "Vertical timeline with sequential highlights",
        },
      },
      {
        id: "v3",
        name: { th: "Tab + Image", en: "Tab + Image" },
        description: {
          th: "แท็บสลับเนื้อหา พร้อมภาพใหญ่ด้านข้าง",
          en: "Tabbed content with large side image",
        },
      },
      {
        id: "v4",
        name: { th: "Accordion Cards", en: "Accordion Cards" },
        description: {
          th: "การ์ดขยายเมื่อคลิก สไตล์ FAQ",
          en: "Expandable cards, FAQ-style interaction",
        },
      },
    ],
  },
  {
    id: "services",
    name: { th: "บริการ", en: "Quick Services" },
    locked: false,
    variants: [
      {
        id: "v1",
        name: { th: "Service Cards", en: "Service Cards" },
        description: {
          th: "การ์ดบริการแบบ hover effect 6 ช่อง",
          en: "6 service cards with hover effects",
        },
      },
      {
        id: "v2",
        name: { th: "Icon List", en: "Icon List" },
        description: {
          th: "รายการพร้อมไอคอน ลิงก์ด้านข้าง",
          en: "Icon list with side links, compact layout",
        },
      },
      {
        id: "v3",
        name: { th: "Mega Grid", en: "Mega Grid" },
        description: {
          th: "ตารางใหญ่ 2×3 พร้อมภาพพื้นหลัง",
          en: "Large 2×3 grid with background images",
        },
      },
      {
        id: "v4",
        name: { th: "Slider Showcase", en: "Slider Showcase" },
        description: {
          th: "สไลด์โชว์บริการแนวนอน",
          en: "Horizontal service slider showcase",
        },
      },
    ],
  },
  {
    id: "news",
    name: { th: "ข่าวสาร", en: "Latest News" },
    locked: false,
    variants: [
      {
        id: "v1",
        name: { th: "Card Grid", en: "Card Grid" },
        description: {
          th: "ตารางข่าว 3 คอลัมน์ + ข่าวเด่น",
          en: "3-column news cards + featured article",
        },
      },
      {
        id: "v2",
        name: { th: "Magazine Layout", en: "Magazine Layout" },
        description: {
          th: "เลย์เอาต์นิตยสาร ข่าวใหญ่ + ข่าวย่อย",
          en: "Magazine layout — large feature + small articles",
        },
      },
      {
        id: "v3",
        name: { th: "Timeline Feed", en: "Timeline Feed" },
        description: {
          th: "ข่าวเรียงตามเวลา สไตล์ Social Feed",
          en: "Chronological feed, social media style",
        },
      },
      {
        id: "v4",
        name: { th: "Minimal List", en: "Minimal List" },
        description: {
          th: "รายการข่าวมินิมอล พร้อมวันที่",
          en: "Clean minimal list with dates",
        },
      },
    ],
  },
  {
    id: "cta",
    name: { th: "Call to Action", en: "Call to Action" },
    locked: true,
    variants: [
      {
        id: "v1",
        name: { th: "Full Banner", en: "Full Banner" },
        description: {
          th: "แบนเนอร์เต็มจอ พื้นหลังไล่สี + ปุ่มเด่น",
          en: "Fullwidth banner with gradient + prominent button",
        },
      },
      {
        id: "v2",
        name: { th: "Split Cards", en: "Split Cards" },
        description: {
          th: "การ์ด 2 ฝั่ง — ลงทะเบียน + ติดต่อ",
          en: "Two side-by-side cards — register + contact",
        },
      },
      {
        id: "v3",
        name: { th: "Floating Action", en: "Floating Action" },
        description: {
          th: "กล่อง CTA ลอย พร้อมเงาและ animation",
          en: "Floating CTA box with shadow & animation",
        },
      },
      {
        id: "v4",
        name: { th: "Inline Minimal", en: "Inline Minimal" },
        description: {
          th: "CTA แถวเดียวมินิมอล ข้อความ + ปุ่ม",
          en: "Single-line minimal — text + button inline",
        },
      },
    ],
  },
];

// Helper: get section definition by ID
export function getSectionDef(id: SectionId): SectionDefinition | undefined {
  return SECTION_REGISTRY.find((s) => s.id === id);
}

// Helper: get variant meta
export function getVariantMeta(
  sectionId: SectionId,
  variantId: VariantId
): SectionVariantMeta | undefined {
  return getSectionDef(sectionId)?.variants.find((v) => v.id === variantId);
}

// All section IDs
export const ALL_SECTION_IDS: SectionId[] = SECTION_REGISTRY.map((s) => s.id);

// Reorderable section IDs (non-locked)
export const REORDERABLE_SECTION_IDS: SectionId[] = SECTION_REGISTRY.filter(
  (s) => !s.locked
).map((s) => s.id);

// Default variant for all sections
export const DEFAULT_VARIANT: VariantId = "v1";
