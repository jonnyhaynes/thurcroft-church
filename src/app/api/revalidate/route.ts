import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Webhook target for Sanity (or any CMS) to refresh the site after an edit.
 * Configure the CMS to POST here with the shared secret, then published
 * changes appear without a redeploy.
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ error: "Revalidation is not configured." }, { status: 503 });
  }

  const url = new URL(request.url);
  const provided =
    request.headers.get("x-webhook-secret") ?? url.searchParams.get("secret");

  if (provided !== secret) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
