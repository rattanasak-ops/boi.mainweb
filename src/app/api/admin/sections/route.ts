import { NextRequest, NextResponse } from "next/server";
import { ALL_SECTION_IDS, type SectionId } from "@/config/section-registry";
import { REORDERABLE_SECTION_IDS } from "@/config/section-registry";

/**
 * Section config API — validates config payloads.
 * Actual persistence is localStorage (client-side).
 * This API is used for validation only.
 */

const VALID_VARIANTS = new Set(["v1", "v2", "v3", "v4"]);

// POST: validate a section config payload (does NOT persist — client uses localStorage)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { variants, order } = body as {
      variants?: Record<string, string>;
      order?: string[];
    };

    // Validate variants
    if (variants) {
      for (const [sectionId, variantId] of Object.entries(variants)) {
        if (!ALL_SECTION_IDS.includes(sectionId as SectionId)) {
          return NextResponse.json(
            { error: `Invalid section: ${sectionId}` },
            { status: 400 }
          );
        }
        if (!VALID_VARIANTS.has(variantId)) {
          return NextResponse.json(
            { error: `Invalid variant: ${variantId}` },
            { status: 400 }
          );
        }
      }
    }

    // Validate order
    if (order) {
      const validOrder = order.every((id) =>
        REORDERABLE_SECTION_IDS.includes(id as SectionId)
      );
      if (!validOrder || order.length !== REORDERABLE_SECTION_IDS.length) {
        return NextResponse.json(
          { error: "Invalid section order" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      valid: true,
      variants: variants ?? {},
      order: order ?? [...REORDERABLE_SECTION_IDS],
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
