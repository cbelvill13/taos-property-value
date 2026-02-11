/**
 * Internal "new lead" notification email. Does not block lead creation on failure.
 * Requires:
 * - RESEND_API_KEY
 * - RESEND_FROM_EMAIL (verified sender)
 * - LEAD_NOTIFY_EMAIL (recipient)
 */

export type LeadNotifyArgs = {
  leadId: string; // correlation id (no local DB id in this app)
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  source?: string;
  criteria?: Record<string, unknown>;
  message?: string;
};

type Criteria = {
  areas?: string[];
  beds?: string[];
  baths?: string[];
  acreage?: string[];
  price?: string[];
  guestHouse?: string;
  garage?: string;
  otherText?: string;
};

function asStringArray(v: unknown): string[] | undefined {
  return Array.isArray(v) && v.every((x) => typeof x === "string") ? (v as string[]) : undefined;
}

function asNonEmptyString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;
}

function normalizeCriteria(criteria: Record<string, unknown> | undefined): Criteria | undefined {
  if (!criteria || typeof criteria !== "object") return undefined;

  return {
    areas: asStringArray(criteria.areas),
    beds: asStringArray(criteria.beds),
    baths: asStringArray(criteria.baths),
    acreage: asStringArray(criteria.acreage),
    price: asStringArray(criteria.price),
    guestHouse: asNonEmptyString(criteria.guestHouse),
    garage: asNonEmptyString(criteria.garage),
    otherText: asNonEmptyString(criteria.otherText),
  };
}

function formatSpecs(criteria: Record<string, unknown> | undefined): string {
  const c = normalizeCriteria(criteria);
  if (!c) return "—";

  const parts: string[] = [];
  if (c.areas?.length) parts.push(`Areas: ${c.areas.join(", ")}`);
  if (c.beds?.length) parts.push(`Beds: ${c.beds.join(", ")}`);
  if (c.baths?.length) parts.push(`Baths: ${c.baths.join(", ")}`);
  if (c.acreage?.length) parts.push(`Acreage: ${c.acreage.join(", ")}`);
  if (c.price?.length) parts.push(`Price: ${c.price.join(", ")}`);
  if (c.guestHouse) parts.push(`Guest House: ${c.guestHouse}`);
  if (c.garage) parts.push(`Garage: ${c.garage}`);
  if (c.otherText) parts.push(`Other notes: ${c.otherText}`);

  return parts.length > 0 ? parts.join(" | ") : "—";
}

export async function sendLeadNotifyEmail(args: LeadNotifyArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const to = process.env.LEAD_NOTIFY_EMAIL?.trim();

  if (!to) return;
  if (!args.name && !args.email && !args.phone) return;

  if (!apiKey || !from) {
    console.warn("[lead-notify] Resend not configured; skipping");
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const contact = args.phone || args.email || "no contact";
  const subject = `New lead (TaosHomeValue): ${args.name || "Unknown"} (${contact})`;

  const lines: string[] = [
    `Name: ${args.name || "—"}`,
    `Email: ${args.email || "—"}`,
    `Phone: ${args.phone || "—"}`,
    `Correlation ID: ${args.leadId}`,
    `Time: ${args.createdAt}`,
    `Source: ${args.source ?? "—"}`,
    "",
    `Specs: ${formatSpecs(args.criteria)}`,
  ];

  if (args.message) {
    lines.push("", `Message: ${args.message}`);
  }

  await resend.emails.send({
    from,
    to,
    subject,
    text: lines.join("\n"),
  });
}
