/** Lead intake payload and validation. No external libs. */

/** Home value snapshot intake criteria (taoshomevalue.com). */
export type HomeValueCriteria = {
  leadKind: "HOME_VALUE_SNAPSHOT";
  propertyAddress: string;
  beds?: number;
  baths?: number;
  garage?: string;
  squareFootage?: number;
  acreage?: number;
  yearBuilt?: number;
  remodeled?: "YES" | "NO" | "UNKNOWN";
  buildingStyle?: "FRAME" | "ADOBE" | "PUMICE" | "POST_AND_BEAM" | "STRAWBALE" | "EARTHSHIP" | "MANUFACTURED" | "MODULAR";
  utilities?: string[];
  view?: "MOUNTAIN" | "VALLEY" | "SUNSET" | "RIVER_CREEK" | "GOLF" | "NONE";
  adjacency?: "ADJACENT_BLM" | "ADJACENT_NATIONAL_FOREST" | "ADJACENT_OPEN_SPACE" | "OTHER";
  access?: "PAVED_ROAD" | "PRIVATE_ROAD" | "OTHER";
  guestHouse?: { has: boolean; beds?: number; baths?: number; sqft?: number };
  triedToSellRecently?: {
    has: boolean;
    priorListPrice?: number;
    startDate?: string;
    endDate?: string;
    notes?: string;
  };
  timeline?: string;
};

export type LeadCriteria = {
  beds: string[];
  baths: string[];
  acreage: string[];
  areas: string[];
  areasOther?: string | null;
};

export type LeadMeta = {
  source: "taoshomevalue";
  createdAt: string; // ISO
  userAgent?: string;
  referrer?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
};

export type LeadPayload = {
  fullName: string;
  email: string;
  phone: string;
  criteria: LeadCriteria;
  message?: string;
  consent: boolean;
  meta: LeadMeta;
};

const MESSAGE_MAX = 150;

export function isNonEmptyString(s: unknown): s is string {
  return typeof s === "string" && s.trim().length > 0;
}

export function isEmailBasic(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export function isPhoneBasic(s: string): boolean {
  const digits = s.replace(/\D/g, "");
  return digits.length >= 10;
}

export function clampMessage(s: string | undefined): string {
  if (s == null || typeof s !== "string") return "";
  return s.slice(0, MESSAGE_MAX);
}

export function validateLead(payload: unknown): {
  ok: boolean;
  errors?: Record<string, string>;
  value?: LeadPayload;
} {
  const errors: Record<string, string> = {};
  const raw = payload as Record<string, unknown>;

  // Required fields
  if (!isNonEmptyString(raw?.fullName)) {
    errors.fullName = "Full name is required.";
  }
  if (!isNonEmptyString(raw?.email)) {
    errors.email = "Email is required.";
  } else if (!isEmailBasic(raw.email as string)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!isNonEmptyString(raw?.phone)) {
    errors.phone = "Phone is required.";
  } else if (!isPhoneBasic(raw.phone as string)) {
    errors.phone = "Please enter a valid phone number (at least 10 digits).";
  }

  // Consent must be true
  if (raw?.consent !== true) {
    errors.consent = "You must agree to be contacted.";
  }

  // Message optional but max 150
  let message = "";
  if (raw?.message != null && typeof raw.message === "string") {
    message = clampMessage(raw.message);
    if ((raw.message as string).length > MESSAGE_MAX) {
      errors.message = `Message must be at most ${MESSAGE_MAX} characters.`;
    }
  }

  // Criteria: arrays of strings (default empty) + areasOther (max 20)
  const criteriaRaw = raw?.criteria as Record<string, unknown> | undefined;
  const AREAS_OTHER_MAX = 20;
  let areasOther: string | null = null;
  if (criteriaRaw?.areasOther != null && typeof criteriaRaw.areasOther === "string") {
    const s = criteriaRaw.areasOther.trim().slice(0, AREAS_OTHER_MAX);
    areasOther = s || null;
  }
  const criteria: LeadCriteria = {
    beds: Array.isArray(criteriaRaw?.beds) ? (criteriaRaw.beds as string[]).filter((v) => typeof v === "string") : [],
    baths: Array.isArray(criteriaRaw?.baths) ? (criteriaRaw.baths as string[]).filter((v) => typeof v === "string") : [],
    acreage: Array.isArray(criteriaRaw?.acreage) ? (criteriaRaw.acreage as string[]).filter((v) => typeof v === "string") : [],
    areas: Array.isArray(criteriaRaw?.areas) ? (criteriaRaw.areas as string[]).filter((v) => typeof v === "string") : [],
    areasOther,
  };

  // Meta
  const metaRaw = raw?.meta as Record<string, unknown> | undefined;
  const meta: LeadMeta = {
    source: "taoshomevalue",
    createdAt: typeof metaRaw?.createdAt === "string" ? metaRaw.createdAt : new Date().toISOString(),
    userAgent: typeof metaRaw?.userAgent === "string" ? metaRaw.userAgent : undefined,
    referrer: typeof metaRaw?.referrer === "string" ? metaRaw.referrer : undefined,
    utm:
      metaRaw?.utm && typeof metaRaw.utm === "object" && !Array.isArray(metaRaw.utm)
        ? {
            source: typeof (metaRaw.utm as Record<string, unknown>).source === "string" ? (metaRaw.utm as Record<string, string>).source : undefined,
            medium: typeof (metaRaw.utm as Record<string, unknown>).medium === "string" ? (metaRaw.utm as Record<string, string>).medium : undefined,
            campaign: typeof (metaRaw.utm as Record<string, unknown>).campaign === "string" ? (metaRaw.utm as Record<string, string>).campaign : undefined,
            content: typeof (metaRaw.utm as Record<string, unknown>).content === "string" ? (metaRaw.utm as Record<string, string>).content : undefined,
            term: typeof (metaRaw.utm as Record<string, unknown>).term === "string" ? (metaRaw.utm as Record<string, string>).term : undefined,
          }
        : undefined,
  };

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const value: LeadPayload = {
    fullName: (raw?.fullName as string).trim(),
    email: (raw?.email as string).trim(),
    phone: (raw?.phone as string).trim(),
    criteria,
    ...(message ? { message } : {}),
    consent: true,
    meta,
  };
  return { ok: true, value };
}
