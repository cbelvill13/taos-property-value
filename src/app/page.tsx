"use client";

import { useState } from "react";

const MESSAGE_MAX = 150;
const GARAGE_OPTIONS = ["none", "1", "2", "3+"];
const REMODELED_OPTIONS = [
  { value: "", label: "" },
  { value: "YES", label: "Yes" },
  { value: "NO", label: "No" },
  { value: "UNKNOWN", label: "Unknown" },
];
const ELECTRIC_OPTIONS = [
  "Grid – Connected",
  "Grid – Nearby",
  "Grid – At Lot",
  "Off Grid",
  "Combo",
];
const GAS_OPTIONS = [
  "Natural Gas",
  "Propane",
];
const WATER_SOURCE_OPTIONS = [
  { value: "", label: "" },
  { value: "Well - Private", label: "Well - Private" },
  { value: "Well - Shared", label: "Well - Shared" },
  { value: "Community", label: "Community" },
  { value: "Municipal", label: "Municipal" },
  { value: "Cistern", label: "Cistern" },
  { value: "Must Drill", label: "Must Drill" },
];
const WASTEWATER_OPTIONS = [
  { value: "", label: "" },
  { value: "Septic", label: "Septic" },
  { value: "Sewer", label: "Sewer" },
  { value: "Must Install", label: "Must Install" },
];
const VIEWS_OPTIONS = [
  { value: "mountain", label: "Mountain" },
  { value: "valley", label: "Valley" },
  { value: "sunset", label: "Sunset" },
  { value: "river/creek", label: "River / Creek" },
  { value: "golf", label: "Golf" },
  { value: "none", label: "None" },
];
const ADJACENCY_OPTIONS = [
  "pavedRoad",
  "privateRoad",
  "adjacentBLM",
  "adjacentForest",
  "adjacentOpenSpace",
  "adjacentNeighborhood",
  "other",
];
const ADJACENCY_LABELS: Record<string, string> = {
  pavedRoad: "Paved Road",
  privateRoad: "Private Road",
  adjacentBLM: "Adjacent to BLM Land",
  adjacentForest: "Adjacent to National Forest",
  adjacentOpenSpace: "Adjacent Open Space",
  adjacentNeighborhood: "Adjacent Neighborhood",
  other: "Other",
};
const TIMELINE_OPTIONS = [
  { value: "", label: "" },
  { value: "just-curious", label: "Just curious" },
  { value: "within-3-months", label: "Within 3 months" },
  { value: "within-6-months", label: "Within 6 months" },
  { value: "within-12-months", label: "Within 12 months" },
  { value: "flexible", label: "Flexible" },
];
const HOA_OPTIONS = [
  { value: "", label: "—" },
  { value: "YES", label: "Yes" },
  { value: "NO", label: "No" },
  { value: "UNKNOWN", label: "Unknown" },
];
const RESTRICTIONS_OPTIONS = [
  { value: "", label: "—" },
  { value: "noneKnown", label: "None Known" },
  { value: "hoa", label: "HOA" },
  { value: "deed", label: "Deed Restrictions" },
  { value: "conservation", label: "Conservation" },
  { value: "easement", label: "Easement" },
  { value: "landGrant", label: "Land Grant" },
  { value: "other", label: "Other" },
  { value: "unknown", label: "Unknown" },
];
const WATER_RIGHTS_OPTIONS = [
  { value: "", label: "—" },
  { value: "unknown", label: "Unknown" },
  { value: "none", label: "None" },
  { value: "surface", label: "Surface" },
  { value: "wellDomestic", label: "Domestic Well" },
  { value: "wellShared", label: "Shared Well" },
  { value: "acequia", label: "Acequia / Ditch Rights" },
  { value: "adjudicated", label: "Adjudicated / Documented" },
  { value: "other", label: "Other" },
];

const inputSelectClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500";

function toggleMulti(current: string[], value: string): string[] {
  return current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
}

function parseNum(s: string): number | undefined {
  const n = parseFloat(s.trim());
  return Number.isFinite(n) ? n : undefined;
}

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [garage, setGarage] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [acreage, setAcreage] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [remodeled, setRemodeled] = useState("");
  const [electric, setElectric] = useState("");
  const [gas, setGas] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [wastewater, setWastewater] = useState("");
  const [waterRights, setWaterRights] = useState("");
  const [irrigatedAcres, setIrrigatedAcres] = useState("");
  const [hoa, setHoa] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [restrictionsNotes, setRestrictionsNotes] = useState("");
  const [views, setViews] = useState<string[]>([]);
  const [adjacency, setAdjacency] = useState<string[]>([]);
  const [guestHouse, setGuestHouse] = useState<"yes" | "no" | "">("");
  const [guestHouseBeds, setGuestHouseBeds] = useState("");
  const [guestHouseBaths, setGuestHouseBaths] = useState("");
  const [guestHouseSqft, setGuestHouseSqft] = useState("");
  const [hasTriedToSellRecently, setHasTriedToSellRecently] = useState<"yes" | "no" | "">("");
  const [priorListPrice, setPriorListPrice] = useState("");
  const [priorListStartDate, setPriorListStartDate] = useState("");
  const [priorListEndDate, setPriorListEndDate] = useState("");
  const [priorNotes, setPriorNotes] = useState("");
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const canSubmit =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.replace(/\D/g, "").length >= 10 &&
    address.trim().length > 0 &&
    consent &&
    notes.length <= MESSAGE_MAX;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!fullName.trim()) err.fullName = "Full name is required.";
    if (!email.trim()) err.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) err.email = "Please enter a valid email address.";
    if (!phone.trim()) err.phone = "Phone is required.";
    else if (phone.replace(/\D/g, "").length < 10) err.phone = "Please enter a valid phone number (at least 10 digits).";
    if (!address.trim()) err.address = "Property address is required.";
    if (notes.length > MESSAGE_MAX) err.notes = `Notes must be at most ${MESSAGE_MAX} characters.`;
    if (!consent) err.consent = "You must agree to be contacted.";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setLoading(true);
    setErrors({});
    try {
      const criteria: Record<string, unknown> = {
        leadKind: "HOME_VALUE_SNAPSHOT",
        propertyAddress: address.trim(),
      };
      const bedsNum = parseNum(beds);
      if (bedsNum !== undefined) criteria.beds = bedsNum;
      const bathsNum = parseNum(baths);
      if (bathsNum !== undefined) criteria.baths = bathsNum;
      if (garage.trim()) criteria.garage = garage.trim();
      const sqftNum = parseNum(squareFootage);
      if (sqftNum !== undefined) criteria.squareFootage = sqftNum;
      const acreageNum = parseNum(acreage);
      if (acreageNum !== undefined) criteria.acreage = acreageNum;
      const yearNum = parseNum(yearBuilt);
      if (yearNum !== undefined) criteria.yearBuilt = yearNum;
      if (remodeled === "YES" || remodeled === "NO" || remodeled === "UNKNOWN") criteria.remodeled = remodeled;
      if (electric.trim()) criteria.electric = electric.trim();
      if (gas.trim()) criteria.gas = gas.trim();
      if (waterSource.trim()) criteria.waterSource = waterSource.trim();
      if (wastewater.trim()) criteria.wastewater = wastewater.trim();
      if (waterRights.trim()) criteria.waterRights = waterRights.trim();
      const irrigatedNum = parseNum(irrigatedAcres);
      if (irrigatedNum !== undefined) criteria.irrigatedAcres = irrigatedNum;
      if (hoa === "YES" || hoa === "NO" || hoa === "UNKNOWN") criteria.hoa = hoa;
      if (restrictions.trim()) criteria.restrictions = restrictions.trim();
      if (restrictionsNotes.trim()) criteria.restrictionsNotes = restrictionsNotes.trim().slice(0, 120);
      if (views.length > 0) criteria.views = views;
      if (adjacency.length > 0) criteria.adjacency = adjacency;
      if (guestHouse === "yes") {
        criteria.guestHouse = {
          has: true,
          ...(parseNum(guestHouseBeds) !== undefined && { beds: parseNum(guestHouseBeds) }),
          ...(parseNum(guestHouseBaths) !== undefined && { baths: parseNum(guestHouseBaths) }),
          ...(parseNum(guestHouseSqft) !== undefined && { sqft: parseNum(guestHouseSqft) }),
        };
      } else if (guestHouse === "no") {
        criteria.guestHouse = { has: false };
      }
      if (hasTriedToSellRecently === "yes") {
        criteria.triedToSellRecently = {
          has: true,
          ...(parseNum(priorListPrice) !== undefined && { priorListPrice: parseNum(priorListPrice) }),
          ...(priorListStartDate.trim() && { startDate: priorListStartDate.trim() }),
          ...(priorListEndDate.trim() && { endDate: priorListEndDate.trim() }),
          ...(priorNotes.trim() && { notes: priorNotes.trim() }),
        };
      } else if (hasTriedToSellRecently === "no") {
        criteria.triedToSellRecently = { has: false };
      }
      if (timeline.trim()) criteria.timeline = timeline.trim();

      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          criteria,
          message: notes.trim().slice(0, MESSAGE_MAX) || undefined,
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
      setAddress("");
      setBeds("");
      setBaths("");
      setGarage("");
      setSquareFootage("");
      setAcreage("");
      setYearBuilt("");
      setRemodeled("");
      setElectric("");
      setGas("");
      setWaterSource("");
      setWastewater("");
      setWaterRights("");
      setIrrigatedAcres("");
      setHoa("");
      setRestrictions("");
      setRestrictionsNotes("");
      setViews([]);
      setAdjacency([]);
      setGuestHouse("");
      setGuestHouseBeds("");
      setGuestHouseBaths("");
      setGuestHouseSqft("");
      setHasTriedToSellRecently("");
      setPriorListPrice("");
      setPriorListStartDate("");
      setPriorListEndDate("");
      setPriorNotes("");
      setTimeline("");
      setNotes("");
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
    name: "Taos Home Value",
    url: "https://taoshomevalue.com/",
    description:
      "Get a local, comps-based pricing snapshot for your Taos-area property. No call centers. No lead resale. Just a clear range and the data behind it.",
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
                      TaosHomeValue.com
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
          Get a local pricing snapshot for your Taos-area property.
        </h1>
        <p className="mt-2 text-base leading-relaxed text-neutral-600 sm:text-lg">
          A real valuation is more than three recent comps.
          <br />
          This is a market-based pricing range built from how properties are actually moving right now.
        </p>

        <p className="mt-6 text-base leading-relaxed text-neutral-700">
          Comps are the starting point — not the answer.
        </p>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          A credible value range accounts for more than what sold most recently. It looks at what’s active, what’s pending, what’s sitting, how pricing has shifted, and how buyers are responding in today’s market.
        </p>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          That broader context is what turns raw data into a number that holds up once buyers start comparing, inspecting, and negotiating.
        </p>

        <h2 className="mt-8 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
          What I’m actually looking at
        </h2>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          When I evaluate a property, I’m not just pulling recent sales. I’m weighing:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-base leading-relaxed text-neutral-700">
          <li>Current inventory pressure in your price range</li>
          <li>How long similar homes are taking to sell</li>
          <li>Where listings started vs. where they actually closed</li>
          <li>Price reductions, expirations, and quiet withdrawals</li>
          <li>Property-specific factors buyers price in immediately</li>
          <li>Location details that matter in this market — and the ones that don’t</li>
        </ul>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          The goal isn’t a flattering number. It’s a range that reflects how buyers are behaving right now.
        </p>

        <h2 className="mt-8 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
          Why this isn’t an instant estimate
        </h2>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          This isn’t an automated guess and it isn’t a one-size-fits-all number.
        </p>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          Pricing works when it’s based on patterns across many local outcomes — not just a handful of recent sales. Seeing what sold is important. Seeing what didn’t, how long it took, and why buyers hesitated is just as important.
        </p>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          That wider lens is what produces a pricing range you can actually use.
        </p>

        <h2 className="mt-8 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
          Request a pricing snapshot
        </h2>
        <p className="mt-2 text-base leading-relaxed text-neutral-700">
          Share a few details about the property and your timing. I’ll follow up with a value range and the reasoning behind it.
        </p>

        {success ? (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
            <p className="font-medium">Got it — I’ll send your pricing snapshot.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border bg-white p-4">
            {errors.submit && (
              <p className="mb-3 text-sm text-red-600" role="alert">
                {errors.submit}
              </p>
            )}

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
              <div>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  placeholder="Property address *"
                />
                {errors.address && <p className="mt-0.5 text-xs text-red-600">{errors.address}</p>}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="beds" className="block text-xs font-medium text-neutral-600">Beds</label>
                <input
                  id="beds"
                  type="number"
                  min={0}
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                  placeholder="e.g. 3"
                />
              </div>
              <div>
                <label htmlFor="baths" className="block text-xs font-medium text-neutral-600">Baths (halves ok)</label>
                <input
                  id="baths"
                  type="number"
                  min={0}
                  step={0.5}
                  value={baths}
                  onChange={(e) => setBaths(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                  placeholder="e.g. 2.5"
                />
              </div>
              <div>
                <label htmlFor="garage" className="block text-xs font-medium text-neutral-600">Garage</label>
                <select id="garage" value={garage} onChange={(e) => setGarage(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  <option value="">—</option>
                  {GARAGE_OPTIONS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="squareFootage" className="block text-xs font-medium text-neutral-600">Square footage</label>
                <input
                  id="squareFootage"
                  type="number"
                  min={0}
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                  placeholder="e.g. 1850"
                />
              </div>
              <div>
                <label htmlFor="acreage" className="block text-xs font-medium text-neutral-600">Acreage</label>
                <input
                  id="acreage"
                  type="number"
                  min={0}
                  step={0.1}
                  value={acreage}
                  onChange={(e) => setAcreage(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                  placeholder="e.g. 1.5"
                />
              </div>
              <div>
                <label htmlFor="yearBuilt" className="block text-xs font-medium text-neutral-600">Year built</label>
                <input
                  id="yearBuilt"
                  type="number"
                  min={1800}
                  max={new Date().getFullYear() + 1}
                  value={yearBuilt}
                  onChange={(e) => setYearBuilt(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                  placeholder="e.g. 1995"
                />
              </div>
              <div>
                <label htmlFor="remodeled" className="block text-xs font-medium text-neutral-600">Remodeled</label>
                <select id="remodeled" value={remodeled} onChange={(e) => setRemodeled(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {REMODELED_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label || "—"}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-xs font-medium text-neutral-600">Timeline</label>
                <select id="timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {TIMELINE_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label || "—"}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="electric" className="block text-xs font-medium text-neutral-600">Electric</label>
                <select id="electric" value={electric} onChange={(e) => setElectric(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  <option value="">—</option>
                  {ELECTRIC_OPTIONS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="gas" className="block text-xs font-medium text-neutral-600">Gas</label>
                <select id="gas" value={gas} onChange={(e) => setGas(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  <option value="">—</option>
                  {GAS_OPTIONS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="waterSource" className="block text-xs font-medium text-neutral-600">Water source</label>
                <select id="waterSource" value={waterSource} onChange={(e) => setWaterSource(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {WATER_SOURCE_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label || "—"}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="wastewater" className="block text-xs font-medium text-neutral-600">Wastewater</label>
                <select id="wastewater" value={wastewater} onChange={(e) => setWastewater(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {WASTEWATER_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label || "—"}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="waterRights" className="block text-xs font-medium text-neutral-600">
                  Water Rights
                </label>
                <select
                  id="waterRights"
                  value={waterRights}
                  onChange={(e) => setWaterRights(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                >
                  {WATER_RIGHTS_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="irrigatedAcres" className="block text-xs font-medium text-neutral-600">
                  Irrigated Acres
                </label>
                <input
                  id="irrigatedAcres"
                  type="number"
                  min={0}
                  step={0.01}
                  value={irrigatedAcres}
                  onChange={(e) => setIrrigatedAcres(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                  placeholder="—"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="hoa" className="block text-xs font-medium text-neutral-600">HOA</label>
              <select id="hoa" value={hoa} onChange={(e) => setHoa(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                {HOA_OPTIONS.map((o) => (
                  <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="restrictions" className="block text-xs font-medium text-neutral-600">Restrictions</label>
              <select
                id="restrictions"
                value={restrictions}
                onChange={(e) => setRestrictions(e.target.value)}
                className={`mt-1 ${inputSelectClass}`}
              >
                {RESTRICTIONS_OPTIONS.map((o) => (
                  <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                ))}
              </select>
              <div className="mt-2">
                <input
                  id="restrictionsNotes"
                  type="text"
                  value={restrictionsNotes}
                  onChange={(e) => setRestrictionsNotes(e.target.value.slice(0, 120))}
                  maxLength={120}
                  className={`mt-1 ${inputSelectClass}`}
                  placeholder="Restrictions notes"
                />
              </div>
            </div>

            <div className="mt-4">
              <span className="block text-xs font-medium text-neutral-600">Views</span>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                {VIEWS_OPTIONS.map((o) => (
                  <label key={o.value} className="inline-flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={views.includes(o.value)}
                      onChange={() => setViews((prev) => toggleMulti(prev, o.value))}
                      className="rounded border-neutral-300 text-neutral-700 focus:ring-neutral-500"
                    />
                    {o.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <span className="block text-xs font-medium text-neutral-600">Adjacency</span>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                {ADJACENCY_OPTIONS.map((v) => (
                  <label key={v} className="inline-flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={adjacency.includes(v)}
                      onChange={() => setAdjacency((prev) => toggleMulti(prev, v))}
                      className="rounded border-neutral-300 text-neutral-700 focus:ring-neutral-500"
                    />
                    {ADJACENCY_LABELS[v] ?? v}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <span className="block text-xs font-medium text-neutral-600">Guest house</span>
              <div className="mt-2 flex gap-4">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" name="guestHouse" checked={guestHouse === "yes"} onChange={() => setGuestHouse("yes")} className="border-neutral-300 text-neutral-700 focus:ring-neutral-500" />
                  Yes
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" name="guestHouse" checked={guestHouse === "no"} onChange={() => setGuestHouse("no")} className="border-neutral-300 text-neutral-700 focus:ring-neutral-500" />
                  No
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" name="guestHouse" checked={guestHouse === ""} onChange={() => setGuestHouse("")} className="border-neutral-300 text-neutral-700 focus:ring-neutral-500" />
                  —
                </label>
              </div>
              {guestHouse === "yes" && (
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div>
                    <label htmlFor="guestHouseBeds" className="block text-xs text-neutral-500">Guest house beds</label>
                    <input id="guestHouseBeds" type="number" min={0} value={guestHouseBeds} onChange={(e) => setGuestHouseBeds(e.target.value)} className={`mt-1 ${inputSelectClass}`} placeholder="—" />
                  </div>
                  <div>
                    <label htmlFor="guestHouseBaths" className="block text-xs text-neutral-500">Guest house baths</label>
                    <input id="guestHouseBaths" type="number" min={0} step={0.5} value={guestHouseBaths} onChange={(e) => setGuestHouseBaths(e.target.value)} className={`mt-1 ${inputSelectClass}`} placeholder="—" />
                  </div>
                  <div>
                    <label htmlFor="guestHouseSqft" className="block text-xs text-neutral-500">Guest house sq ft</label>
                    <input id="guestHouseSqft" type="number" min={0} value={guestHouseSqft} onChange={(e) => setGuestHouseSqft(e.target.value)} className={`mt-1 ${inputSelectClass}`} placeholder="—" />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <span className="block text-xs font-medium text-neutral-600">Tried to sell recently?</span>
              <div className="mt-2 flex gap-4">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" name="triedToSell" checked={hasTriedToSellRecently === "yes"} onChange={() => setHasTriedToSellRecently("yes")} className="border-neutral-300 text-neutral-700 focus:ring-neutral-500" />
                  Yes
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" name="triedToSell" checked={hasTriedToSellRecently === "no"} onChange={() => setHasTriedToSellRecently("no")} className="border-neutral-300 text-neutral-700 focus:ring-neutral-500" />
                  No
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" name="triedToSell" checked={hasTriedToSellRecently === ""} onChange={() => setHasTriedToSellRecently("")} className="border-neutral-300 text-neutral-700 focus:ring-neutral-500" />
                  —
                </label>
              </div>
              {hasTriedToSellRecently === "yes" && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label htmlFor="priorListPrice" className="block text-xs text-neutral-500">Prior list price</label>
                    <input id="priorListPrice" type="number" min={0} value={priorListPrice} onChange={(e) => setPriorListPrice(e.target.value)} className={`mt-1 ${inputSelectClass}`} placeholder="—" />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="priorListStartDate" className="block text-xs text-neutral-500">List start date</label>
                      <input id="priorListStartDate" type="date" value={priorListStartDate} onChange={(e) => setPriorListStartDate(e.target.value)} className={`mt-1 ${inputSelectClass}`} />
                    </div>
                    <div>
                      <label htmlFor="priorListEndDate" className="block text-xs text-neutral-500">List end date</label>
                      <input id="priorListEndDate" type="date" value={priorListEndDate} onChange={(e) => setPriorListEndDate(e.target.value)} className={`mt-1 ${inputSelectClass}`} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="priorNotes" className="block text-xs text-neutral-500">Notes</label>
                    <input id="priorNotes" type="text" value={priorNotes} onChange={(e) => setPriorNotes(e.target.value)} className={`mt-1 ${inputSelectClass}`} placeholder="Brief notes" />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label htmlFor="notes" className="block text-xs font-medium text-neutral-600">Notes <span className="font-normal text-neutral-400">(max {MESSAGE_MAX})</span></label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.slice(0, MESSAGE_MAX))}
                  maxLength={MESSAGE_MAX}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  placeholder="Anything else you’d like me to know."
                />
                <p className="mt-0.5 text-right text-xs text-neutral-500">{notes.length} / {MESSAGE_MAX}</p>
                {errors.notes && <p className="mt-0.5 text-xs text-red-600">{errors.notes}</p>}
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

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="mt-4 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending…" : "Request pricing snapshot"}
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
