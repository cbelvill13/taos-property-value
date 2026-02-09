"use client";

import { useState, useRef, useEffect } from "react";

const BEDS = ["Any", "1+", "2+", "3+", "4+", "5+"];
const BATHS = ["Any", "1+", "2+", "3+"];
const ACREAGE = ["Any", "<1 acre", "1–5", "5–10", "10–20", "20+"];
const PRICE = ["Any", "<$300k", "$300–500k", "$500–750k", "$750k–$1M", "$1M+"];
const AREAS = [
  "Angel Fire",
  "Arroyo Seco",
  "Blueberry Hill",
  "El Prado",
  "High Road",
  "Questa",
  "Ranchos",
  "Red River",
  "Taos",
  "Taos Ski Valley",
];
const GUEST_HOUSE = ["Any", "Yes", "No"];
const GARAGE = ["Any", "Yes", "No"];
const MESSAGE_MAX = 150;
const AREAS_OTHER_MAX = 20;

const inputSelectClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500";

function getUtm(): { source?: string; medium?: string; campaign?: string; content?: string; term?: string } {
  if (typeof window === "undefined") return {};
  const u = new URL(window.location.href);
  const get = (k: string) => u.searchParams.get(k) ?? undefined;
  return {
    source: get("utm_source") ?? undefined,
    medium: get("utm_medium") ?? undefined,
    campaign: get("utm_campaign") ?? undefined,
    content: get("utm_content") ?? undefined,
    term: get("utm_term") ?? undefined,
  };
}

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [beds, setBeds] = useState("Any");
  const [baths, setBaths] = useState("Any");
  const [acreage, setAcreage] = useState("Any");
  const [price, setPrice] = useState("Any");
  const [guestHouse, setGuestHouse] = useState("Any");
  const [garage, setGarage] = useState("Any");
  const [areas, setAreas] = useState<string[]>([]);
  const [areasOther, setAreasOther] = useState("");
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  const areasDropdownRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const canSubmit =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.replace(/\D/g, "").length >= 10 &&
    consent &&
    message.length <= MESSAGE_MAX;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (areasDropdownRef.current && !areasDropdownRef.current.contains(event.target as Node)) {
        setAreasDropdownOpen(false);
      }
    }
    if (areasDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [areasDropdownOpen]);

  const toggleArea = (value: string) => {
    if (value === "Other" && areas.includes("Other")) setAreasOther("");
    setAreas((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!fullName.trim()) err.fullName = "Full name is required.";
    if (!email.trim()) err.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) err.email = "Please enter a valid email address.";
    if (!phone.trim()) err.phone = "Phone is required.";
    else if (phone.replace(/\D/g, "").length < 10) err.phone = "Please enter a valid phone number (at least 10 digits).";
    if (message.length > MESSAGE_MAX) err.message = `Message must be at most ${MESSAGE_MAX} characters.`;
    if (!consent) err.consent = "You must agree to be contacted.";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setLoading(true);
    setErrors({});
    try {
      const criteria: Record<string, unknown> = {
        beds: beds === "Any" ? [] : [beds],
        baths: baths === "Any" ? [] : [baths],
        acreage: acreage === "Any" ? [] : [acreage],
        price: price === "Any" ? [] : [price],
        guestHouse,
        garage,
        areas,
      };
      const otherText = areasOther.trim().slice(0, AREAS_OTHER_MAX) || undefined;
      if (otherText !== undefined) criteria.otherText = otherText;

      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          criteria,
          message: message.trim().slice(0, MESSAGE_MAX) || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors({ submit: data.error ?? "Something went wrong. Please try again." });
        return;
      }
      setSuccess(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setBeds("Any");
      setBaths("Any");
      setAcreage("Any");
      setPrice("Any");
      setGuestHouse("Any");
      setGarage("Any");
      setAreas([]);
      setAreasOther("");
      setMessage("");
      setConsent(false);
      setErrors({});
    } catch (e) {
      setErrors({
        submit: e instanceof Error ? e.message : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Taos Home Finder",
    url: "https://taoshomefinder.com/",
    description:
      "Get personalized alerts for Taos NM homes and properties. Local Taos brokerage. No lead sales, no paid placements — just accurate listings matched to your criteria.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white text-neutral-900">
      <header className="w-full border-b">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl sm:aspect-[3/1]">
            <img
              src="/images/136-3x1hero.jpg"
              alt="Taos landscape"
              className="h-full w-full object-cover"
            />

            {/* Left readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

            {/* Text overlay — masthead + full contact info on mobile and desktop */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-[85%] px-4 py-4 text-center sm:max-w-[70%] sm:px-7 sm:py-7">
                <div className="text-white">
                  {/* Site identity masthead — not a link */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-white sm:text-sm sm:tracking-widest">
                      TaosHomeFinder.com
                    </div>
                    <div className="mt-0.5 text-[10px] font-medium text-white/80 sm:text-xs">
                      Taos · NM
                    </div>
                  </div>
                  {/* Brought to You By + name + contact — pushed down for clear gap */}
                  <div className="mt-5">
                    <div className="text-[10px] font-medium uppercase tracking-wide text-white/85 sm:text-xs">
                      Brought to You By
                    </div>
                    <div className="mt-1 text-xs font-semibold leading-snug tracking-tight sm:text-sm sm:leading-normal">
                      Chad Belvill - Associate Broker
                    </div>
                    <div className="mt-1.5 space-y-0.5 text-xs leading-snug text-white/90 sm:mt-2 sm:space-y-1 sm:text-sm sm:leading-normal">
                      <div>Dreamcatcher Real Estate Co. Inc.</div>
                      <div>515 Gusdorf Rd Suite 6 Taos, NM 87571</div>
                      <div>
                        <a href="tel:5757793612" className="text-inherit no-underline hover:underline" aria-label="Call cell 575-779-3612">575-779-3612</a> cell /{" "}
                        <a href="tel:5757583606" className="text-inherit no-underline hover:underline" aria-label="Call office 575-758-3606">575-758-3606</a> office
                      </div>
                      <div>
                        <a href="mailto:chad@exclusivetaos.com" className="text-inherit no-underline hover:underline" aria-label="Email chad@exclusivetaos.com">chad@exclusivetaos.com</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Get personalized Taos-area property alerts — free.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          Tell us what you’re looking for in the Taos, New Mexico real estate market, and you’ll
          receive personalized property alerts whenever relevant homes, land, or listings become
          available — delivered directly by a local Taos brokerage, not a national lead platform.
        </p>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          Unlike syndicated real estate websites, your request is never sold, routed, or auctioned.
          There are no paid placements, no call-center agents, and no surprise follow-ups. Your
          search stays local, transparent, and focused on what’s actually available in Taos and
          surrounding areas.
        </p>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          This service is designed for buyers who want a clear, accurate view of Taos-area homes and
          properties, with alerts based on real criteria — not advertising budgets.
        </p>

        <p className="mt-4 text-sm text-neutral-600">
          <a
            href="https://taoslandfinder.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-800"
          >
            Looking for land instead? Try Taos Land Finder →
          </a>
        </p>

        {success ? (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
            <p className="font-medium">Got it — I’ll send matches.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border bg-white p-4">
            {errors.submit && (
              <p className="mb-3 text-sm text-red-600" role="alert">
                {errors.submit}
              </p>
            )}

            {/* Section 1 — Contact (side by side) */}
            <div className="space-y-3">
              <div>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  placeholder="Full name *"
                />
                {errors.fullName && <p className="mt-0.5 text-xs text-red-600">{errors.fullName}</p>}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    placeholder="Email *"
                  />
                  {errors.email && <p className="mt-0.5 text-xs text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    placeholder="Phone *"
                  />
                  {errors.phone && <p className="mt-0.5 text-xs text-red-600">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Section 2 — Criteria (dropdowns + areas multi-select) */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="beds" className="block text-xs font-medium text-neutral-600">
                  Beds
                </label>
                <select
                  id="beds"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                >
                  {BEDS.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="baths" className="block text-xs font-medium text-neutral-600">
                  Baths
                </label>
                <select
                  id="baths"
                  value={baths}
                  onChange={(e) => setBaths(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                >
                  {BATHS.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="acreage" className="block text-xs font-medium text-neutral-600">
                  Acreage
                </label>
                <select
                  id="acreage"
                  value={acreage}
                  onChange={(e) => setAcreage(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                >
                  {ACREAGE.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="price" className="block text-xs font-medium text-neutral-600">
                  Price
                </label>
                <select
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                >
                  {PRICE.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="guestHouse" className="block text-xs font-medium text-neutral-600">
                  Guest House
                </label>
                <select
                  id="guestHouse"
                  value={guestHouse}
                  onChange={(e) => setGuestHouse(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                >
                  {GUEST_HOUSE.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="garage" className="block text-xs font-medium text-neutral-600">
                  Garage
                </label>
                <select
                  id="garage"
                  value={garage}
                  onChange={(e) => setGarage(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                >
                  {GARAGE.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2" ref={areasDropdownRef}>
                <label className="block text-xs font-medium text-neutral-600">
                  Areas
                </label>
                <div className="relative mt-1">
                  <button
                    type="button"
                    onClick={() => setAreasDropdownOpen((o) => !o)}
                    className={`w-full rounded-lg border border-neutral-300 px-3 py-2 text-left text-sm text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 ${inputSelectClass}`}
                  >
                    {areas.length === 0 ? "Select areas" : areas.join(", ")}
                  </button>
                  {areasDropdownOpen && (
                    <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-neutral-300 bg-white py-1 shadow-lg">
                      {AREAS.map((v) => (
                        <label
                          key={v}
                          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-50"
                        >
                          <input
                            type="checkbox"
                            checked={areas.includes(v)}
                            onChange={() => toggleArea(v)}
                            className="rounded border-neutral-300 text-neutral-700 focus:ring-neutral-500"
                          />
                          {v}
                        </label>
                      ))}
                      <div className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-neutral-50">
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="checkbox"
                            checked={areas.includes("Other")}
                            onChange={() => toggleArea("Other")}
                            className="rounded border-neutral-300 text-neutral-700 focus:ring-neutral-500"
                          />
                          Other
                        </label>
                        {areas.includes("Other") && (
                          <input
                            type="text"
                            id="areasOther"
                            value={areasOther}
                            onChange={(e) => setAreasOther(e.target.value.slice(0, AREAS_OTHER_MAX))}
                            onMouseDown={(e) => e.stopPropagation()}
                            maxLength={20}
                            placeholder="Specify area"
                            className="w-56 max-w-full flex-none rounded border border-neutral-300 px-2 py-1.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3 — Message (150 chars) + consent (tight) */}
            <div className="mt-4 space-y-3">
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-neutral-600">
                  Message <span className="font-normal text-neutral-400">(optional, max 150)</span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_MAX))}
                  maxLength={150}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  placeholder="Anything you’d like Chad to know?"
                />
                <p className="mt-0.5 text-right text-xs text-neutral-500">
                  {message.length} / 150
                </p>
                {errors.message && <p className="mt-0.5 text-xs text-red-600">{errors.message}</p>}
              </div>
              <div>
                <label className="inline-flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-300 text-neutral-700 focus:ring-neutral-500"
                  />
                  <span className="text-xs text-neutral-700">
                    I agree to be contacted by phone, text, or email about my request. I can opt out anytime. *
                  </span>
                </label>
                {errors.consent && <p className="mt-0.5 text-xs text-red-600">{errors.consent}</p>}
              </div>
            </div>

            {/* Section 4 — Submit */}
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="mt-4 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send me matches"}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-neutral-500">
          By submitting, you agree you may be contacted by phone/text/email. Unsubscribe anytime.
        </p>

        {/* Compliance strip — bottom of page */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-neutral-200 bg-neutral-50 px-4 py-6 sm:gap-6">
          <img src="/compliance/equal-housing.svg" alt="Equal Housing Opportunity" className="h-6 w-auto sm:h-7" />
          <img src="/compliance/NAR.svg" alt="National Association of Realtors" className="h-6 w-auto sm:h-7" />
          <img src="/compliance/NMAR.svg" alt="New Mexico Realtors" className="h-6 w-auto sm:h-7" />
          <img src="/compliance/ECAR.svg" alt="Enchanted Circle Association of Realtors" className="h-6 w-auto sm:h-7" />
        </div>
      </section>
    </main>
    </>
  );
}
