import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — a real person never fills this in. Pretend success.
  if (asString(payload.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(payload.name);
  const email = asString(payload.email);
  const phone = asString(payload.phone);
  const topic = asString(payload.topic) || "General enquiry";
  const message = asString(payload.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email address and message." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please check your email address." }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    // No form provider configured yet — tell the user rather than pretending.
    return NextResponse.json(
      { error: "Our online form is not available at the moment. Please call us on 01909 318059 instead." },
      { status: 503 },
    );
  }

  const body = new URLSearchParams({
    access_key: accessKey,
    subject: `Website enquiry: ${topic}`,
    from_name: name,
    name,
    email,
    phone: phone || "Not provided",
    topic,
    message,
  });

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Something went wrong sending your message. Please try again, or call us." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again, or call us." },
      { status: 502 },
    );
  }
}
