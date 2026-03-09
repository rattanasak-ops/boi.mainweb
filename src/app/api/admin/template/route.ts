import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SITE_TEMPLATES,
  DEFAULT_SITE_TEMPLATE,
  SITE_TEMPLATE_STORAGE_KEY,
} from "@/config/site-templates";

// GET — return active template id + all templates
export async function GET() {
  const cookieStore = await cookies();
  const active =
    cookieStore.get(SITE_TEMPLATE_STORAGE_KEY)?.value ||
    DEFAULT_SITE_TEMPLATE;

  return NextResponse.json({
    active,
    templates: SITE_TEMPLATES,
  });
}

// PUT — set active template
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { templateId } = body as { templateId: string };

  const exists = SITE_TEMPLATES.some((t) => t.id === templateId);
  if (!exists) {
    return NextResponse.json(
      { error: "Template not found" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(SITE_TEMPLATE_STORAGE_KEY, templateId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });

  return NextResponse.json({ active: templateId, success: true });
}
