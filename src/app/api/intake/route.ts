import { NextResponse } from "next/server";

const MESSAGE_MAX = 150;

function validateBody(body: unknown): { ok: true; payload: Record<string, unknown> } | { ok: false; error: string } {
  const raw = body as Record<string, unknown>;
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid JSON body." };
  }
  const fullName = raw.fullName;
  const email = raw.email;
  const phone = raw.phone;
  if (typeof fullName !== "string" || !fullName.trim()) {
    return { ok: false, error: "fullName is required." };
  }
  if (typeof email !== "string" || !email.trim()) {
    return { ok: false, error: "email is required." };
  }
  if (typeof phone !== "string" || !phone.trim()) {
    return { ok: false, error: "phone is required." };
  }
  let message: string | undefined;
  if (raw.message != null) {
    if (typeof raw.message !== "string") {
      return { ok: false, error: "message must be a string." };
    }
    message = raw.message.slice(0, MESSAGE_MAX);
  }
  const criteria =
    raw.criteria != null && typeof raw.criteria === "object" && !Array.isArray(raw.criteria)
      ? (raw.criteria as Record<string, unknown>)
      : undefined;
  const payload: Record<string, unknown> = {
    fullName: (fullName as string).trim(),
    email: (email as string).trim(),
    phone: (phone as string).trim(),
    source: "taoshomevalue.com",
  };
  if (criteria !== undefined) payload.criteria = criteria;
  if (message !== undefined) payload.message = message;
  return { ok: true, payload };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = validateBody(body);
    if (!validated.ok) {
      return NextResponse.json({ ok: false, error: validated.error }, { status: 400 });
    }

    const ingestUrl = process.env.EXCLUSIVE_INGEST_URL;
    const ingestKey = process.env.HH_INGEST_SHARED_SECRET;
    if (!ingestUrl) {
      console.error("[api/intake] EXCLUSIVE_INGEST_URL is not set.");
      return NextResponse.json(
        { ok: false, error: "Ingest service is not configured." },
        { status: 500 }
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(ingestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ingestKey ? { "X-HH-INGEST-KEY": ingestKey } : {}),
      },
      body: JSON.stringify(validated.payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return NextResponse.json({ ok: true });
    }

    console.error("[api/intake] Ingest responded with", response.status, await response.text());
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your request right now. Please try again later." },
      { status: 500 }
    );
  } catch (e) {
    const isAbort = e instanceof Error && e.name === "AbortError";
    console.error("[api/intake]", isAbort ? "Request timed out" : e);
    return NextResponse.json(
      {
        ok: false,
        error: isAbort
          ? "The request took too long. Please try again."
          : "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
